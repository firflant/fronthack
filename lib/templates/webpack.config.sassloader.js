          // Sass files loader compiles scss and sass files to globals CSS,
          // not as a CSS modules.
          {
            test: /\.(scss|sass)$/,
            use: [
              require.resolve('style-loader'), // creates style nodes from JS strings
              {
                loader: require.resolve('css-loader'), // translates CSS into CommonJS
                options: {
                    import: true,
                    modules: false,
                    importLoaders: 1,
                }
              },
              {
                loader: require.resolve('sass-loader'), // compiles Sass to CSS
                options: {
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },