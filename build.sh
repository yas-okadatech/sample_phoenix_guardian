export MIX_ENV=prod
export NODE_ENV=production

# Initial setup
npm install
mix clean
mix deps.get --only prod
mix compile

# Compile assets
npm run gulpBuild
mix phoenix.digest

mix release