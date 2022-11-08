const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const helpers = require("./helpers");
const loadConfig = require("./loadConfig");

const config = loadConfig("./config.json");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: "none",
    entry: ["./src/polyfills.ts", "./src/vendor.ts", "./src/main.ts"],
    resolve: {
        extensions: ["", ".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.html$/,
                use: "raw-loader",
                exclude: [helpers.root("src/index.html")],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.css$/,
                include: helpers.root("src", "app"),
                loader: "raw",
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico",
            title: config.title,
            baseUrl: config.baseUrl,
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
};
