defmodule BlueSky.Repo.Migrations.CreatePlayer do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string
      add :room_id, references(:rooms, on_delete: :delete_all, type: :uuid)

      timestamps
    end

    create index(:players, [:room_id])
  end
end
