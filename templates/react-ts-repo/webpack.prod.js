const { merge } = require('webpack-merge')
const { InjectManifest } = require('workbox-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    new OptimizeCssAssetsPlugin(),
    new InjectManifest({
      swSrc: './src/serviceWorker.js',
      swDest: 'service-worker.js',
      exclude: [
        /_redirects$/,
      ],
    }),
  ],
})
