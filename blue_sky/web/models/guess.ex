defmodule BlueSky.Guess do
  use BlueSky.Web, :model

  schema "guesses" do
    field :guess, :string
    field :correct, :boolean
    belongs_to :room, BlueSky.Room, type: :binary_id
    belongs_to :question, BlueSky.Question
    belongs_to :player, BlueSky.Player

    timestamps
  end

  @required_fields ~w(guess)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
