const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  const temp = {
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  };
  config.module.rules.push(temp);
  return config;
};
