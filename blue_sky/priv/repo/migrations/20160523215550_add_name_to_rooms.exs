defmodule BlueSky.Repo.Migrations.AddNameToRooms do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      add :name, :string
    end
  end
end
