defmodule BlueSky.Repo.Migrations.DropAskedQuestions do
  use Ecto.Migration

  def change do
    drop index(:guesses, [:asked_question_id])

    alter table(:guesses) do
      remove :asked_question_id
    end

    drop table(:asked_questions)
  end
end
