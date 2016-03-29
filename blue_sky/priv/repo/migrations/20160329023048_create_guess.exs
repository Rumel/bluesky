defmodule BlueSky.Repo.Migrations.CreateGuess do
  use Ecto.Migration

  def change do
    create table(:guesses) do
      add :guess, :string
      add :room_id, references(:rooms, on_delete: :delete_all, type: :uuid)
      add :question_id, references(:questions, on_delete: :nothing)
      add :player_id, references(:players, on_delete: :nothing)

      timestamps
    end

    create index(:guesses, [:room_id])
    create index(:guesses, [:question_id])
    create index(:guesses, [:player_id])
  end
end
