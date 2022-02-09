const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      // Enable support for loading fronthack-scripts.
      {
        test: /\.exec\.js$/,
        use: ['script-loader'],
      },
    ],
  },

  plugins: [
    // Copy Fronthack scripts and designs.
    new CopyPlugin({
      patterns: [
        { from: 'designs', to: 'designs' },
        { from: 'node_modules/fronthack-scripts/dev-assets', to: 'dev-assets' },
      ],
    }),
  ],
})
