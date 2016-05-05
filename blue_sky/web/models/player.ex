defmodule BlueSky.Player do
  use BlueSky.Web, :model

  schema "players" do
    field :name, :string

    has_many :guesses, BlueSky.Guess

    belongs_to :room, BlueSky.Room, type: :binary_id

    timestamps
  end

  @required_fields ~w(name)
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
