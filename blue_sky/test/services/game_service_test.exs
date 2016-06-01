defmodule BlueSky.GameServiceTest do
  use ExUnit.Case, async: true

  alias BlueSky.GameService
  alias BlueSky.Player
  alias BlueSky.Repo

  import Ecto.Query

  def new_room(room_name \\ "Room", player_name \\ "Player One") do
    GameService.new_room(room_name, player_name)
  end

  test "empty test" do
    assert 2 == 2
  end

  test "creating a new room" do
    room = new_room 
    assert room.id != nil
  end

  test "getting a room" do
    room = new_room 
    other_room = GameService.get_room(room.id)
    assert room == other_room
  end

  test "getting all rooms" do
    room = new_room 
    room_two = new_room("Room Two", "Player Two")

    rooms = GameService.get_rooms

    assert Enum.any?(rooms, fn(x) -> x.id == room.id end)
    assert Enum.any?(rooms, fn(x) -> x.id == room_two.id end)
  end

  test "adding a player" do
    room = new_room 
    player_two = GameService.add_player(room.id, "Lemur")

    assert player_two != nil
    assert player_two.room.id == room.id
    assert player_two.name == "Lemur"
  end

  test "removing a player" do
    room = new_room 
    player_two = GameService.add_player(room.id, "Lemur")

    query = from p in Player,
            where: p.id == ^player_two.id,
            select: p

    assert Repo.all(query) |> length == 1

    GameService.remove_player(player_two)

    assert Repo.all(query) |> length == 0
  end

  test "getting all players" do
    room = new_room 
    player_one = GameService.add_player(room, "Lemur One")

    players = GameService.get_players(room)

    assert length(players) == 2
  end

  test "getting a random question" do
    room = new_room 
    question = GameService.get_random_question([1])

    assert question != nil
  end

  test "guessing on a question" do
    room = new_room 
    question = GameService.get_random_question([1])
    player = List.first(room.players)

    guess = GameService.answer_question(room.id, question.id, player.id, "a")

    assert guess != nil
    assert guess.guess == "a"
  end
end
