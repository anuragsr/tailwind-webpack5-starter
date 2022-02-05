const { merge } = require('webpack-merge')

const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    watchFiles: ["src/*", "src/**/*"]
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // Replace with above
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})
