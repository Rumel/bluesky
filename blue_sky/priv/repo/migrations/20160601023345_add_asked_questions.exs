defmodule BlueSky.Repo.Migrations.AddAskedQuestions do
  use Ecto.Migration

  def change do
    create table(:asked_questions) do
      add :room_id, references(:rooms, on_delete: :delete_all, type: :uuid)
      add :question_id, references(:questions, on_delete: :nothing)

      timestamps
    end

    create index(:asked_questions, [:room_id])
    create index(:asked_questions, [:question_id])
  end
end
