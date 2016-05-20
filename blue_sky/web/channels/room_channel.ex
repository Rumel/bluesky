defmodule BlueSky.RoomChannel do
  use Phoenix.Channel

  alias BlueSky.GameService
  alias BlueSky.Player
  alias BlueSky.Repo

  # Documentation
  # http://www.phoenixframework.org/docs/channels
  
  def join("room:join", _params, socket) do
     {:ok, socket}
  end

  def handle_in("new_room", %{"name" => name} = params, socket) do
    IO.puts "Name passed in was: #{name}"

    player = GameService.new_room(name)

    socket = assign(socket, :player_details, %{ player_id: player.id, room_id: player.room.id })

    broadcast! socket, "new_player", %{ player_id: player.id, room_id: player.room.id, player_name: player.name }
    {:noreply, socket}
  end

  def handle_in("get_rooms", _params, socket) do
    rooms = GameService.get_rooms
            |> Enum.map(fn (x) -> x.id end)

    IO.inspect rooms

    #How do I do custom encoders?
    #http://www.cultivatehq.com/posts/serialisation-of-ecto-models-in-phoenix-channels-and-views/

    #broadcast! socket, "rooms_list", %{ rooms: rooms }
    {:reply, {:ok, %{ rooms: rooms }}, socket}
  end

  def handle_in("new_guess", %{"question_id" => question_id, "guess" => guess} = params, socket) do
    player = socket.assigns[:player_details]

    guess = GameService.answer_question(player.room_id, question_id, player.player_id, guess)

    IO.inspect guess

    broadcast! socket, "guessed", %{ guess_id: guess.id, guess_guess: guess.guess }

    {:noreply, socket}
  end
end
