use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :blue_sky, BlueSky.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :blue_sky, BlueSky.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "bluesky",
  password: "bluesky",
  database: "blue_sky_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
