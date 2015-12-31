defmodule SamplePhoenixReactApp.Repo.Migrations.AlterUserAuthsAddType do
  use Ecto.Migration

  def change do
    alter table(:user_auths) do
      add :type, :string
    end
  end
end
