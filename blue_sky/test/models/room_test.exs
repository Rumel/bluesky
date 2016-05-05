defmodule BlueSky.RoomTest do
  use BlueSky.ModelCase

  alias BlueSky.Room

  @valid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Room.changeset(%Room{}, @valid_attrs)
    assert changeset.valid?
  end
end
