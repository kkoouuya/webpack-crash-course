const path = require("path");
const HtmlWebPackPligin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const outputPath = path.resolve(__dirname, "dist");
console.log({ outputPath });
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "url-loader",
        options: {
          limit: 2048,
          name: "./images/[name].[ext]",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    contentBase: outputPath,
  },
  plugins: [
    new HtmlWebPackPligin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
