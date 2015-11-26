export MIX_ENV=prod
export NODE_ENV=production

npm run gulpBuild
mix deps.get
mix compile
mix phoenix.digest

mix phoenix.server
