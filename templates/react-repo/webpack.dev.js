const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    port: 3000,
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
    new CopyWebpackPlugin([
      { from: 'designs', to: 'designs' },
      { from: 'node_modules/fronthack-scripts/dev-assets', to: 'dev-assets' },
    ]),
  ],
})
