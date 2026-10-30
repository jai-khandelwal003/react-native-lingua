const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const nativewindConfig = withNativewind(config);
const nativewindResolveRequest = nativewindConfig.resolver.resolveRequest;

// NativeWind redirects every `import "react-native"` to its own wrapper, and that wrapper
// (react-native-css 3.1.0-rc.0) does not export `AssetRegistry`. expo-asset needs it to load
// fonts and images, so let it import the real react-native.
nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  const isExpoAsset = context.originModulePath.includes(
    `${path.sep}expo-asset${path.sep}`,
  );

  if (isExpoAsset && moduleName === "react-native" && platform !== "web") {
    return context.resolveRequest(context, moduleName, platform);
  }

  return nativewindResolveRequest(context, moduleName, platform);
};

module.exports = nativewindConfig;
