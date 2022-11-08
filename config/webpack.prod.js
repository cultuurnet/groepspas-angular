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
const productionConfigOverrides = {
    devtool: 'source-map',

    mode: "production",

    output: {
        path: helpers.root("dist"),
        publicPath: config.publicPath,
        chunkFilename: "[id].[hash].chunk.js",
        assetModuleFilename: "assets/[name].[hash].[ext]",
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ terserOptions: { keep_fnames: true } })],
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                ENV: JSON.stringify(ENV),
                API_URL: JSON.stringify(API_URL),
            },
        }),
    ],
};

module.exports = webpackMerge(commonConfig, productionConfigOverrides);
