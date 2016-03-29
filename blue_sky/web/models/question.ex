defmodule BlueSky.Question do
  use BlueSky.Web, :model

  schema "questions" do
    field :question, :string
    field :a, :string
    field :b, :string
    field :c, :string
    field :d, :string
    field :answer, :string

    has_many :guesses, BlueSky.Guess

    timestamps
  end

  @required_fields ~w(question a b c d answer)
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
