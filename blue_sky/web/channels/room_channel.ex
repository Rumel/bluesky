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

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end


  def handle_in("new_room", %{"body" => body}, socket) do
    room = GameService.new_room
    broadcast! socket, "new_room", %{body: room.id}
    {:noreply, socket}
  end

  def handle_in("get_rooms", %{"body" => body}, socket) do
    rooms = GameService.get_rooms
            |> Enum.map(fn (x) -> x.id end)

    IO.inspect rooms

    #How do I do custom encoders?
    #http://www.cultivatehq.com/posts/serialisation-of-ecto-models-in-phoenix-channels-and-views/

    broadcast! socket, "rooms_list", %{ rooms: rooms }
    {:noreply, socket}
  end


  def join("test:test", _params, socket) do
     {:ok, %{ data: "Connected", socket: socket }}
  end

  def join("test:" <> thing, _params, socket) do
    {:ok, %{data: thing, socket: socket}}
  end
end
