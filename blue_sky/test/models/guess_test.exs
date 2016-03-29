defmodule BlueSky.GuessTest do
  use BlueSky.ModelCase

  alias BlueSky.Guess

  @valid_attrs %{guess: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Guess.changeset(%Guess{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Guess.changeset(%Guess{}, @invalid_attrs)
    refute changeset.valid?
  end
end
