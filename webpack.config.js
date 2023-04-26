const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env) => {
  // Generate config functions for production and analyze env variables
  const { ifProduction, ifNotProduction, ifAnalyze } = getIfUtils(env, [
    'production',
    'analyze',
  ]);
  // Save the config into a variable so that we can wrap it with SpeedMeasurePlugin
  // below if env.analyze is true
  const config = {
    mode: ifProduction('production', 'development'),
    // watch: true,
    entry: './client/src/index.js',
    resolve: {
      alias: {
        // Provide an alias to the root source directory, so everything can be imported with
        // absolute paths, making it easier to move files around.
        '@': path.resolve(__dirname, 'client/src'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'client/public'),
      publicPath: '/',
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      // Port 3000 is baked into the configuration for the mapbox API, so the
      // dev-server needs to use it so that we can hit the API
      port: 3000,
      historyApiFallback: true,
      // static: './',
      static: {
        directory: path.join(__dirname, 'client/public'),
      },
      compress: true,
      hot: true,
      // will fall back to liveReload if hot fails
      liveReload: true,
    },
    devtool: ifProduction('source-map', 'eval-source-map'),
    // The MapboxLegendControl library triggers this warning when trying to load its source map,
    // which we can safely ignore.
    ignoreWarnings: [/Failed to parse source map/],
    stats: {
      // Log a build timestamp in the console.
      builtAt: true,
    },
    watchOptions: {
      poll: true,
      // Exclude big folders or files which don't need to be watched.
      ignored: [
        '**/node_modules',
        '**/vendor',
        '**/*.json',
        'client/src/data/dist',
        'data/json',
        'logs/*.log',
      ],
      aggregateTimeout: 300,
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'client/src'),
          use: ['babel-loader'],
        },
        ifNotProduction({
          test: /\.js$/,
          // These modules seem to cause errors with this loader.
          exclude: /mapbox-gl-legend|react-hook-form|react-router/,
          enforce: 'pre',
          use: ['source-map-loader'],
        }),
        ifNotProduction({
          test: /\.[jt]sx?$/,
          exclude: [
            '/client/src/data/dist/',
            '/data/json/',
            /logs/,
            /node_modules/,
          ],
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
          ],
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
          ],
        },
      ]),
    },
    plugins: removeEmpty([
      ifNotProduction(new ReactRefreshWebpackPlugin()),
      new HtmlWebPackPlugin({
        favicon:
          './client/src/assets/images/favicons/wtt-christmas-favicon.png',
        template: './client/src/index.html',
        filename: './index.html',
        minify: !ifNotProduction(),
        // add a timestamp that's injected into an HTML comment
        buildTime: new Date().toISOString(),
        title: 'Hot Module Replacement',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
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
  return ifAnalyze(
    new SpeedMeasurePlugin().wrap({ plugins: config.plugins, resolve: config.resolve }),
    config,
  );
};
