defmodule BlueSky.QuestionTest do
  use BlueSky.ModelCase

  alias BlueSky.Question

  @valid_attrs %{a: "some content", answer: "some content", b: "some content", c: "some content", d: "some content", question: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Question.changeset(%Question{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Question.changeset(%Question{}, @invalid_attrs)
    refute changeset.valid?
  end
end
