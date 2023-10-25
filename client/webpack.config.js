const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ["./src/index.js"],
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/'
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9000,
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: ["babel-loader"]

            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ],
};