ExUnit.start

Mix.Task.run "ecto.create", ~w(-r BlueSky.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r BlueSky.Repo --quiet)
Code.require_file("priv/repo/seeds.exs")
Ecto.Adapters.SQL.begin_test_transaction(BlueSky.Repo)

