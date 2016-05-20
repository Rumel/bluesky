defmodule BlueSky.GameServiceTest do
  use ExUnit.Case, async: true

  alias BlueSky.GameService
  alias BlueSky.Player
  alias BlueSky.Repo

  import Ecto.Query

  test "empty test" do
    assert 2 == 2
  end

  test "creating a new room" do
    player = GameService.new_room("Lemur")
    assert player.room.id != nil
  end

  test "getting a room" do
    player = GameService.new_room("Lemur")
    other_room = GameService.get_room(player.room.id)
    assert player.room == other_room
  end

  test "getting all rooms" do
    player = GameService.new_room("Lemur One")
    player_two = GameService.new_room("Lemur Two")

    rooms = GameService.get_rooms

    assert Enum.any?(rooms, fn(x) -> x.id == player.room.id end)
    assert Enum.any?(rooms, fn(x) -> x.id == player_two.room.id end)
  end

  test "adding a player" do
    player = GameService.new_room("Lemur")
    player_two = GameService.add_player(player.room.id, "Lemur")

    assert player_two != nil
    assert player_two.room == player.room
    assert player_two.room_id == player.room.id
    assert player_two.name == "Lemur"
  end

  test "removing a player" do
    player = GameService.new_room("Lemur")
    player_two = GameService.add_player(player.room.id, "Lemur")

    query = from p in Player,
            where: p.id == ^player_two.id,
            select: p

    assert Repo.all(query) |> length == 1

    GameService.remove_player(player_two)

    assert Repo.all(query) |> length == 0
  end

  test "getting all players" do
    player = GameService.new_room("Lemur")
    player_two = GameService.add_player(player.room, "Lemur One")
    player_three = GameService.add_player(player.room, "Lemur Two")

    players = GameService.get_players(player.room)

    assert length(players) == 3
  end

  test "getting a random question" do
    question = GameService.get_random_question

    assert question != nil
  end

  test "guessing on a question" do
    question = GameService.get_random_question
    player = GameService.new_room("bigcakes")
    room = player.room

    guess = GameService.answer_question(room.id, question.id, player.id, "a")

    assert guess != nil
    assert guess.guess == "a"
  end
end
