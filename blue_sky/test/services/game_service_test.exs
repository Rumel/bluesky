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
    room = GameService.new_room
    assert room.id != nil
  end

  test "getting a room" do
    room = GameService.new_room
    other_room = GameService.get_room(room.id)
    assert room == other_room
  end

  test "adding a player" do
    room = GameService.new_room
    player = GameService.add_player(room.id)

    assert player != nil
    assert player.room == room
    assert player.room_id == room.id
  end

  test "removing a player" do
    room = GameService.new_room
    player = GameService.add_player(room.id)

    query = from p in Player,
            where: p.id == ^player.id,
            select: p

    assert Repo.all(query) |> length == 1

    GameService.remove_player(player)

    assert Repo.all(query) |> length == 0
  end
end