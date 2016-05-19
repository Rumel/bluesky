// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("room:join", {})
let chatInput         = $("#chat-input")
let messagesContainer = $("#messages")
let newRoomButton = $("#newRoom")
let rooms = []

chatInput.on("keypress", event => {
  if(event.keyCode === 13){
    channel.push("new_msg", {body: chatInput.val()})
    chatInput.val("")
  }
})

newRoomButton.on("click", event => {
  channel.push("new_room", {body: "test"})
})

channel.on("new_msg", payload => {
  messagesContainer.append(`<br/>[${Date()}] ${payload.body}`)
})

channel.on("rooms_list", payload => {
  rooms = payload.rooms

  console.log("rooms", rooms)
})

channel.on("new_room", payload => {
  rooms.push(payload.body)

  console.log("rooms-new room", rooms)
})

channel.on("new_question", payload => {
  console.log("new question", payload)
})

channel.join()
  .receive("ok", resp => { 
    console.log("Joined successfully", resp) 

    channel.push("get_rooms", {body: "test"})
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

window.sendChannelMessage = function (messageType, data) {
  channel.push(messageType, data)
}
