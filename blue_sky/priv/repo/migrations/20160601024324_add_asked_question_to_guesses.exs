defmodule BlueSky.Repo.Migrations.AddAskedQuestionToGuesses do
  use Ecto.Migration

  def change do
    alter table(:guesses) do
      add :asked_question_id, references(:asked_questions, on_delete: :nothing)
    end

    create index(:guesses, [:asked_question_id])
  end
end
