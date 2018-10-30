const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = withSass(withCSS({
  webpack(config, { dev, isServer }) {
    // Webpack configuration for fronthack-scripts assets.
    if (dev && !isServer) {
      config.plugins.push(new CopyWebpackPlugin([
        { from: 'designs', to: 'static/designs' },
        { from: 'node_modules/fronthack-scripts/dev-assets', to: 'static/dev-assets' },
      ]))
    }
    // Further custom configuration here
    return config
  }
}))