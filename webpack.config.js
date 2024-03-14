const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Specify the entry point here
  config.entry = './src/index.js'; // Assuming your main entry point is here

  // Addressing the crypto module issue (already implemented)
  config.resolve.fallback = {
    crypto: false
  };

  return config;
};
