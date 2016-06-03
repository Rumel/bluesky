defmodule BlueSky.Repo.Migrations.AddCorrectToGuesses do
  use Ecto.Migration

  def change do
    alter table(:guesses) do
      add :correct, :boolean
    end
  end
end
