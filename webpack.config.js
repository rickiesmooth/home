const expoConfig = require("@expo/webpack-config");

module.exports = async function(env, argv) {
  console.log(process.env.NODE_ENV, env);
  return expoConfig(
    process.env.NODE_ENV === "development"
      ? env
      : {
          ...env,
          mode: "production",
          production: true,
          development: false
        },
    argv
  );
};
