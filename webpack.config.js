const path = require("path");
const HtmlWebPackPligin = require('html-webpack-plugin')

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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
      template: './src/index.html',
      filename: './index.html'
    })
  ],
};
