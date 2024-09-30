// Configuration file for Metro, the JavaScript bundler used by React Native

const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  // Fetch the default Metro configuration
  const defaultConfig = await getDefaultConfig();

  // Modify the default configuration as needed
  const modifiedConfig = {
    ...defaultConfig,
    // Add any custom configuration here
    // For example:
    // maxWorkers: 2,
    // resetCache: true,
  };

  return modifiedConfig;
})();

// Human tasks:
// TODO: Review and update Metro configuration as needed for project-specific requirements
// TODO: Ensure compatibility with the latest version of React Native and its dependencies