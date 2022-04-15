const { IgnorePlugin, EnvironmentPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const path = require("path");
const fs = require("fs");

const devConfig = require("./webpack.dev.config");
const testEnv = process.env.NODE_ENV === "test";

module.exports = (env, args) => {
    console.log(`Building for env='${process.env.NODE_ENV}' with mode='${args.mode}''`);

    const productionMode = args.mode === "production";

    const commonConfig = {
        context: __dirname,
        entry: {
            main: "./src/index.tsx",
        },
        output: {
            path: path.join(__dirname, "dist/"),
            publicPath: "/",
            filename: "[name].[contenthash].js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss", ".css"],
            // alias: aliases,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true, // type checking in ForkIsCheckerWebpackPlugin
                    },
                },
                {
                    test: /\.s?css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
                    loader: "url-loader",
                    options: {
                        esModule: false,
                        publicPath: "/",
                        limit: 10 * 1024,
                    },
                },
            ],
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({ typescript: { configFile: "./src/tsconfig.json" } }),
            new IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            new HtmlWebpackPlugin({
                title: "CRM 360",
                filename: "index.html",
                template: "./src/index.ejs",
                chunks: ["main"],
                inject: true,
                hash: true,
                meta: productionMode
                    ? {}
                    : {
                          region: { name: "accrm:region", content: "NA" },
                      },
            }),
            new HtmlWebpackPlugin({
                title: "MyQrCode",
                filename: "my-qr-code.html",
                template: "./src/index.ejs",
                chunks: ["myQrCode"],
                inject: true,
                meta: productionMode
                    ? {}
                    : {
                          region: { name: "accrm:region", content: "NA" },
                      },
            }),
            // new CopyPlugin({
            //     patterns: [
            //         { from: "assets/favicons", to: "favicons" },
            //         { from: "assets/images", to: "images" },
            //         { from: "assets/events-images", to: "events-images" },
            //     ],
            // }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash.css]",
                chunkFilename: "[name].[contenthash].css",
            }),
            new EnvironmentPlugin({ PROJECT_VERSION: "loal", ...env }),
        ],
        stats: {
            errors: true,
            errorDetails: true,
            moduleTrace: true,
        },
        optimization: {
            emitOnErrors: false,
            moduleIds: "deterministic",
            runtimeChunk: "single",
            splitChunks: {
                chunks: "all",
            },
        },
        performance: {
            hints: false,
        },
    };

    if (testEnv) return merge(cypressConfig, commonConfig, devConfig);
    return productionMode ? merge(commonConfig, prodConfig) : merge(commonConfig, devConfig);
};
