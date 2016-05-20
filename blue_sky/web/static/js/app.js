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
let usernameInput = $("#username")
let createRoomButton = $("#createRoom")
let createGuessButton = $("#createGuess")
let rooms = []
let roomId = 0
let playerId = 0
let questionId = 0

usernameInput.on("keypress", event => {
  if(event.keyCode === 13){
    channel.push("new_room", { name: usernameInput.val() })
    usernameInput.val("")
  }
})

createRoomButton.on("click", event => {
  channel.push("new_room", {name: usernameInput.val() })
  usernameInput.val("")
})

createGuessButton.on("click", event => {
  channel.push("new_guess", { player_id: playerId, question_id: questionId, room_id: roomId, guess: "a" })
  //usernameInput.val("")
})

channel.on("rooms_list", payload => {
  rooms = payload.rooms

  console.log("rooms", rooms)
})

channel.on("new_player", data => {
  rooms.push(data.room_id)

  playerId = data.player_id
  roomId = data.room_id

  console.log("rooms-new room", rooms)
})

channel.on("new_question", payload => {
  console.log("new question", payload)

  questionId = payload.question_id
})

channel.on("guessed", payload => {
  console.log("new guess", payload)
})

channel.join()
  .receive("ok", resp => { 
    console.log("Joined successfully", resp) 

    channel.push("get_rooms", {})
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

window.sendChannelMessage = function (messageType, data) {
  channel.push(messageType, data)
}
