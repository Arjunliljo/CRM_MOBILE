// Default Expo Metro config (no SVG transformer; we render SVGs via SvgUri)
const { getDefaultConfig } = require("expo/metro-config");
module.exports = getDefaultConfig(__dirname);
