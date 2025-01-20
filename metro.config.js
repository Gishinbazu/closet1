// metro.config.js

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname); // __dirname으로 현재 디렉토리 경로를 가져옴

  const { transformer, resolver } = config;

  // babelTransformerPath에 react-native-svg-transformer 설정
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  // .svg 확장자를 처리하기 위한 설정
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"), // assetExts에서 svg 제거
    sourceExts: [...resolver.sourceExts, "svg"], // sourceExts에 svg 추가
  };

  return config;
})();
