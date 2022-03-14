const webpack = require("webpack");

module.exports = (env, args) => {
    console.log(`Building for env='${process.env.NODE_ENV} with mode='${args.mode}''`);

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
            alias: aliases
        },
    }
}