const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const buildDevConfig = require('./dev');
const buildProdConfig = require('./prod');
const apiUrl = require('../environment').apiUrl;
const originUrl = require('../environment').originUrl;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 5000;
const prod = (process.env.NODE_ENV === 'production');
const baseConfig = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    historyApiFallback: true,
    port
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2']
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: !prod } },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !prod, modules: true, importLoaders: 1, localIdentName: '[local]__[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: !prod } }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/'

          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/'

          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: prod,
        collapseWhitespace: prod,
        removeRedundantAttributes: prod,
        useShortDoctype: prod,
        removeEmptyAttributes: prod,
        removeStyleLinkTypeAttributes: prod,
        keepClosingSlash: prod,
        minifyURLs: prod
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(apiUrl),
        ORIGIN_URL: JSON.stringify(originUrl)
      }
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};

module.exports = prod ? buildProdConfig(baseConfig) : buildDevConfig(baseConfig);
