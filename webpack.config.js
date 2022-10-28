// @ts-nocheck
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import { fileURLToPath } from "url";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outDir = "dist";
const cssPreservePaths = [
    /oculus\.css$/i,
    /index\.css$/i
];

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
                exclude: /node_modules/,
                use: { loader: "babel-loader" },
            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: "html-loader",
            },
            // {
            //     test: cssPreservePaths,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 name: "oculus.css",
            //                 publicPath: "/dist"
            //             }
            //         },
            //         { loader: MiniCssExtractPlugin.loader },
            //         { loader: "css-loader" }
            //     ]
            // },
            {
                test: /\.css$/i,
                // exclude: cssPreservePaths,
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
        new HtmlWebpackPlugin({ template: "src/index.html" }),
        new MiniCssExtractPlugin()
    ]
};

const devConfig = {
    mode: "development",
    devtool: "eval-source-map",
    watch: true,
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