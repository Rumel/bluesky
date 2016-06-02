defmodule BlueSky.RoomChannel do
  use Phoenix.Channel

  alias BlueSky.GameService
  alias BlueSky.Player
  alias BlueSky.Repo

  # Documentation
  # http://www.phoenixframework.org/docs/channels
  
  def join("room:lobby", _params, socket) do
     {:ok, socket}
  end

  def join("room:" <> room_id, %{"name" => name} = params, socket) do
    IO.puts "Name passed in was: #{name}"

    player = GameService.add_player(room_id, name)

    socket = assign(socket, :player_details, %{ player_id: player.id, room_id: room_id })

    {:ok, %{ player_id: player.id, room_id: room_id }, socket}
  end

  def handle_in("new_room", %{"name" => name, "player_name" => player_name} = params, socket) do
    room = GameService.new_room(name, player_name)
    player = List.first(room.players)

    socket = assign(socket, :player_details, %{ player_id: player.id, room_id: room.id })

    broadcast! socket, "new_room", %{ id: room.id, name: room.name }
    {:noreply, socket}
  end

  def handle_in("get_rooms", _params, socket) do
    rooms = GameService.get_rooms
            |> Enum.map(fn (x) ->  %{ id: x.id, name: x.name } end)

    IO.inspect rooms

    #How do I do custom encoders?
    #http://www.cultivatehq.com/posts/serialisation-of-ecto-models-in-phoenix-channels-and-views/

    #broadcast! socket, "rooms_list", %{ rooms: rooms }
    {:reply, {:ok, %{ rooms: rooms }}, socket}
  end

  def handle_in("new_guess", %{"question_id" => question_id, "guess" => guess} = params, socket) do
    player = socket.assigns[:player_details]

    IO.puts "Question ID"
    IO.inspect question_id

    guess = GameService.answer_question(player.room_id, question_id, player.player_id, guess)

    IO.inspect guess

    broadcast! socket, "guessed", %{ guess_id: guess.id, guess_guess: guess.guess, answer: guess.answer, correct: guess.correct }

    {:noreply, socket}
  end
end
