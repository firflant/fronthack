      // Copy Fronthack scripts and designs
      isEnvDevelopment &&
        new CopyWebpackPlugin([
          { from: 'designs', to: 'designs' },
          { from: 'node_modules/fronthack-scripts/dev-assets', to: 'dev-assets' }
        ]),