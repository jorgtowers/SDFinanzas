// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Asegúrate de añadir 'cjs' a sourceExts, no a assetExts
defaultConfig.resolver.sourceExts.push('cjs'); 

module.exports = defaultConfig;