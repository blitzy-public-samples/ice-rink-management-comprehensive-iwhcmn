module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};

// Human Tasks:
// 1. Regularly update Babel and its plugins to ensure compatibility with the latest React Native version
// 2. Review and update environment variable configuration in react-native-dotenv plugin as needed