# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the namespace used by Phoenix generators
config :sample_phoenix_react,
  app_namespace: SamplePhoenixReactApp

# Configures the endpoint
config :sample_phoenix_react, SamplePhoenixReactApp.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "t6yD9fHQXMAg2R9WARvQYxmxYIjnsE2zScMACHnTSTYRXH1bIDg1zd3ep3qiVFhJ",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: SamplePhoenixReactApp.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

config :guardian, Guardian,
  issuer: "SamplePhoenixReactApp",
  #ttl: { 1, :minutes },
  ttl: { 30, :days },
  verify_issuer: true,
  secret_key: "t5-s0EO:Km/k@>VH9)buk+<IM&A3qkM1NN6P^xjn`%mFq6i5~-3[1TRI180}6s,",
  serializer: SamplePhoenixReactApp.GuardianSerializer,
  permissions: %{
          default: [:create_user, :update_me],
          admin: [:read_userlist]
        }

config :ueberauth, Ueberauth,
  providers: [
    #facebook: { Ueberauth.Strategy.Facebook, [] },
    #github: { Ueberauth.Strategy.Github, [] },
    #google: { Ueberauth.Strategy.Google, [] },
    #slack: { Ueberauth.Strategy.Slack, [] },
    #twitter: { Ueberauth.Strategy.Twitter, []},
    identity: { Ueberauth.Strategy.Identity, [
        callback_methods: ["POST"],
        uid_field: :username,
        nickname_field: :username,
      ] }
  ]