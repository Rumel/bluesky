defmodule BlueSky.AskedQuestion do
  use BlueSky.Web, :model

  schema "asked_questions" do
    belongs_to :room, BlueSky.Room, type: :binary_id
    belongs_to :question, BlueSky.Question

    has_many :guesses, BlueSky.Guess

    timestamps
  end
end
