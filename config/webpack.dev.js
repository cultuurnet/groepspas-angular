const webpack = require("webpack");
const { merge: webpackMerge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const helpers = require("./helpers");
const loadConfig = require("./loadConfig");
const TerserPlugin = require("terser-webpack-plugin");

const config = loadConfig("./config.json");

const ENV = (process.env.NODE_ENV = process.env.ENV = "production");
const API_URL = (process.env.API_URL = config.apiUrl);

/**
 * @type {import('webpack').Configuration}
 */
const developmentConfigOverrides = {
    devtool: "eval-cheap-source-map",

    mode: "development",

    output: {
        path: helpers.root("dist"),
        publicPath: config.publicPath,
        chunkFilename: "[id].[hash].chunk.js",
        assetModuleFilename: "assets/[name].[hash].[ext]",
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                ENV: JSON.stringify(ENV),
                API_URL: JSON.stringify(API_URL),
            },
        }),
    ],

    devServer: {
        compress: true,
        port: 3000,
    },
};

module.exports = webpackMerge(commonConfig, developmentConfigOverrides);
