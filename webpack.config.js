// @ts-nocheck
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import { fileURLToPath } from "url";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
//const __dirname = path.dirname(fileURLToPath(process.cwd()));
const __dirname = process.cwd();

const outDir = "dist";

const baseConfig = {
    entry: "./src/oculus/index.js",
    output: {
        clean: true,
        filename: 'oculus.js',
        path: path.resolve(__dirname, outDir),
        assetModuleFilename: 'assets.bundle.[hash][ext][query]'
    },
    experiments: {
        outputModule: true
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: [
                    /node_modules/
                ],
                use: { loader: "babel-loader" },
            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "demo", to: "./" }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "./oculus.global.css"
        })
    ]
};

const devConfig = {
    mode: "development",
    devtool: "eval-source-map",
    output: {
        assetModuleFilename: 'assets.bundle[ext][query]',
        clean: true,
    },
    stats: {
        children: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        devMiddleware: {
            writeToDisk: true
        },
        // compress: true,
        hot: true,
        open: false,
        port: 3000
    },
};

const prodConfig = {
    mode: "production",
    module: {
        rules: [

        ]
    }
};

export default (env) => {
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