const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
// The site's translations and team roster live outside this project. Metro only
// bundles files it watches, so the data folder has to be named explicitly.
const sharedData = path.resolve(projectRoot, "..", "src", "data");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [sharedData];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];

module.exports = config;
