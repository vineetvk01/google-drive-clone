const { override, addBabelPlugin, addLessLoader } = require("customize-cra");

module.exports = (config, env) => {
  const plugins = [];

  if (env === "development") {
    plugins.push("@babel/plugin-syntax-dynamic-import");
  }

  return override(
    addLessLoader({}),
    ...plugins.map((plugin) => addBabelPlugin(plugin))
  )(config, env);
};
