const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js',
        day01: './src/day01/index.js',
        day02: './src/day02/index.js',
        day03: './src/day03/index.js',
        day04: './src/day04/index.js',
        day05: './src/day05/index.js',
        day06: './src/day06/index.js',
        day07: './src/day07/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/favicon.ico',
                    to: 'favicon.ico',
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: "less-loader",
                    },
                   
                ],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
    },
}
