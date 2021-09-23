const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (options) => {
  return {
    // entry: './index.js',
    output: {
      publicPath: 'http://localhost:4500/',
      uniqueName: 'landscapes',
    },
    optimization: {
      // Only needed to bypass a temporary bug
      runtimeChunk: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        // For remotes (please adjust)
        name: 'landscapes',
        library: { type: 'var', name: 'landscapes' },
        filename: 'remoteEntry.js',
        exposes: {
          './web-components': './app/app.js',
        },

        shared: [
          'ember-fetch',
          '@glimmer/component',
          '@glimmer/tracking',
          '@ember/optional-features',
          'ember-bootstrap',
          'ember-data',
          'ember-export-application-global',
          'ember-fetch',
          'ember-resolver',
          'ember-source',
          'ember-svg-jar',
        ],
      }),
    ],
    devServer: {
      port: 4500,
    },
  };
};
