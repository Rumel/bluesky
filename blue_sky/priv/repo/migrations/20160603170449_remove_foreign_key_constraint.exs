defmodule BlueSky.Repo.Migrations.RemoveForeignKeyConstraint do
  use Ecto.Migration

  def change do
    alter table(:guesses) do
      remove :question_id

      add :question_id, :integer
    end
  end
end
