const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = (env) => {
  // Generate config functions for production and analyze env variables
  const { ifProduction, ifNotProduction, ifAnalyze } = getIfUtils(env, ['production', 'analyze']);
  // Save the config into a variable so we can wrap it with SpeedMeasurePlugin
  // below if env.analyze is true
  const config = {
    mode: ifProduction() ? 'production' : 'development',
    watch: false,
    entry: './client/src/client.js',
    output: {
      path: path.resolve(__dirname, 'client/public'),
      publicPath: '/',
      clean: true,
    },
    devServer: {
      // Port 3000 is baked into the configuration for the mapbox API, so the
      // dev-server needs to use it so that we can hit the API
      port: 3000,
      historyApiFallback: true,
      static: './',
      hot: true,
    },
    devtool: ifProduction('source-map', 'eval-source-map'),
    // The MapboxLegendControl library triggers this warning when trying to load its source map,
    // which we can safely ignore.
    ignoreWarnings: [/Failed to parse source map/],
    module: {
      rules: removeEmpty([
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'client/src'),
          use: ['babel-loader'],
        },
        ifNotProduction({
          test: /\.js$/,
          exclude: /mapbox-gl-legend/,
          enforce: 'pre',
          use: ['source-map-loader'],
        }),
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|md)(\?[a-z0-9=.]+)?$/,
          type: 'asset/resource',
        },
        {
          test: /\.(scss|css)?$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ]
        },
      ]),
    },
    plugins: removeEmpty([
      new HtmlWebPackPlugin({
        template: './client/src/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
// TODO: commenting this out for now, as it doesn't extract anything and having 2 of these plugin
//  instances breaks SpeedMeasurePlugin in webpack 5
//      new MiniCssExtractPlugin({
//        filename: '[name].scss',
//        chunkFilename: '[id].scss',
//      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './client/src/assets'),
            to: path.resolve(__dirname, './client/public/assets'),
          },
        ],
      }),
      ifAnalyze(new BundleAnalyzerPlugin()),
    ]),
  };

  // To measure the plugin times, we need to return a wrapped config.  but wrap()
  // modifies the original object, so pass it a copy of config so we keep the
  // unmodified original.
  return ifAnalyze(new SpeedMeasurePlugin().wrap({ ...config }), config);
};
