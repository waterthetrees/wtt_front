// webpack v4
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  watch: true,
  mode: 'development',
  // mode: 'production',
  // https://webpack.js.org/concepts/mode/
  entry: { main: './client/src/client.js' },
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js'
    // filename: 'bundle.production.min.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/, /\.scss$/],
      
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
          }
        }
      },   
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|md)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      },
      { test: /\.(scss|css)?$/, 
        include: path.appSrc, 
        loaders: [ 'style-loader', 'css-loader', 'sass-loader'] 
      },
      
    ]
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //     favicon: "./client/src/images/favicon.ico"
    // }),
    new HtmlWebPackPlugin({
      template: "./client/src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].scss",
      chunkFilename: "[id].scss"
    }),
    new CopyPlugin([{ 
      from: path.resolve(__dirname, 'client/src/assets'),
      to: path.resolve(__dirname, 'client/public/assets') 
    }]),
  ]
};