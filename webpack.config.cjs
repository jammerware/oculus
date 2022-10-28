const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = (env) => {
    console.log("env is", env);

    return {
        watch: env.mode == "development",
        devtool: env.mode == "development" ? "eval-source-map" : null,
        entry: "./src/oculus/index.js",
        output: {
            clean: true,
            filename: 'oculus.js',
            path: path.resolve(__dirname, 'dist'),
            assetModuleFilename: 'images/[hash][ext][query]'
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    exclude: /node_modules/,
                    loader: "html-loader",
                },
                {
                    test: /\.css/i,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                            }
                        }
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
            })
        ]
    }
};