const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRootPlugin = require("html-webpack-react-root-plugin")
const DefinePlugin = webpack.DefinePlugin

module.exports = {
    devtool: "source-map",
    entry: {
        "app": [
            "babel-polyfill",
            "react-hot-loader/patch",
            "./client"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "[name].js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|png|svg|eot|otf|ttf|woff(2)?)(\?[^]*)?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Password Generator",
            inject: "body"
        }),
        new ReactRootPlugin(),
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_URL: JSON.stringify(process.env.API_URL)
            }
        })
    ]
}
