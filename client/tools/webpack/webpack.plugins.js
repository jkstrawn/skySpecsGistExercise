const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    // favicon: 'src/userInterface/assets/img/logo.png',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
  // new CopyWebpackPlugin({
  //   patterns: [
  //     { from: 'src/assets', to: 'assets' }
  //   ]
  // }),
];