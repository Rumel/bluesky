ExUnit.start

Mix.Task.run "ecto.create", ~w(-r BlueSky.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r BlueSky.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(BlueSky.Repo)

