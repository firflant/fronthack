const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (
    config,
    { dev, isServer }
  ) => {
    // Webpack configuration for fronthack-scripts assets.
    if (dev && !isServer) {
      config.plugins.push(new CopyPlugin({
        patterns: [
          { from: 'designs', to: 'public/designs' },
          { from: 'node_modules/fronthack-scripts/dev-assets', to: 'public/dev-assets' },
        ],
      }))
    }
    // Further custom configuration here
    return config
  },
}
