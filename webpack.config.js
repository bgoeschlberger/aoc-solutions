const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        day01: './src/day01/index.js',
        day02: './src/day02/index.js',
        day03: './src/day03/index.js',
        day04: './src/day04/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
    },
}
