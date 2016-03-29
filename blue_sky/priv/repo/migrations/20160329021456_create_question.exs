defmodule BlueSky.Repo.Migrations.CreateQuestion do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :question, :string
      add :a, :string
      add :b, :string
      add :c, :string
      add :d, :string
      add :answer, :string

      timestamps
    end

  end
end
