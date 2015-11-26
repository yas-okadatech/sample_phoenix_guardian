#!/bin/bash

export MIX_ENV="test"
export PATH="$HOME/dependencies/erlang/bin:$HOME/dependencies/elixir/bin:$PATH"

cd $HOME/$CIRCLE_PROJECT_REPONAME

# Initial setup
npm install
mix clean
mix deps.get
mix compile

# Compile assets
npm run gulpBuild

# run test
npm test
mix test
