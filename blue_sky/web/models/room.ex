defmodule BlueSky.Room do
  use BlueSky.Web, :model

  @primary_key {:id, :binary_id, autogenerate: true}

  schema "rooms" do
    field :name, :string

    has_many :players, BlueSky.Player
    has_many :guesses, BlueSky.Guess

    timestamps
  end

  @required_fields ~w()
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
