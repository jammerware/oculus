// @ts-nocheck
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const outDir = "dist";
const cssPreservePaths = [
    /oculus\.css$/i
];

const baseConfig = {
    entry: "./src/oculus/index.js",
    output: {
        clean: true,
        filename: 'oculus.js',
        path: path.resolve(__dirname, outDir),
        assetModuleFilename: 'assets.bundle.[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: { loader: "babel-loader" },
            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: "html-loader",
            },
            {
                test: cssPreservePaths,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "oculus.css",
                            publicPath: "/dist"
                        }
                    },
                    { loader: "extract-loader" },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                exclude: cssPreservePaths,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.jpg/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
    ]
};

const devConfig = {
    mode: "development",
    watch: true,
    devtool: "eval-source-map",
    output: {
        // assetModuleFilename: 'assets.bundle[ext]'
    }
};

const prodConfig = {
    mode: "production",
    module: {
        rules: [

        ]
    }
};

module.exports = (env) => {
    switch (env.mode) {
        case "development":
            const thing = merge(baseConfig, devConfig);
            return merge(baseConfig, devConfig);
        case "production":
            return merge(baseConfig, prodConfig);
        default:
            throw new Error(`Couldn't match build mode "${env.mode}".`);
    }
}