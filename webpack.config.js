// webpack v4
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin'); // gzip
// const BrotliPlugin = require('brotli-webpack-plugin'); // brotli

module.exports = {
  watch: true,
  // publicPath: '/',
  // historyApiFallback: true,
  // mode: 'production',
  mode: 'development',
  // https://webpack.js.org/concepts/mode/
  entry: { main: './client/src/client.js' },
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js',
    publicPath: '/',
    // filename: 'bundle.production.min.js'
    sourceMapFilename: '[name].js.map',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /\.scss$/],

        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|md)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(scss|css)?$/,
        include: path.appSrc,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //     favicon: "./client/src/images/favicon.ico"
    // }),
    new HtmlWebPackPlugin({
      template: './client/src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].scss',
      chunkFilename: '[id].scss',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './client/src/assets'),
          to: path.resolve(__dirname, './client/public/assets'),
        },
      ],
    }),
    // new CompressionPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 8192,
    //   minRatio: 0.8,
    // }),
    // new BrotliPlugin({ // brotli plugin
    //   asset: '[path].br[query]',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],
};
