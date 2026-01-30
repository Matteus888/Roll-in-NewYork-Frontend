module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // ⚡ reste, Reanimated 2.x le nécessite
  };
};
