'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const sass = require('sass');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
    'ember-bootstrap': {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
    },
    sassOptions: {
      implementation: sass,
    },
    fingerprint: {
      customHash: null,
    },
    svgJar: {
      sourceDirs: [
        'public', // default SVGJar lookup directory
        'node_modules/octicons/build/svg',
      ],
    },
    // emberCliConcat: {
    //   enabled: true,
    //   outputDir: 'assets',
    //   outputFileName: 'landscapes',
    //   js: {
    //     concat: true,
    //     contentFor: 'concat-js',
    //   },

    //   css: {
    //     concat: true,
    //     contentFor: 'concat-css',
    //   },
    // },

    autoImport: {
      // exclude: ['landscape/config/environment'],
      webpack: {
        resolve: {
          // https://stackoverflow.com/a/47665710/6432698
          symlinks: false,
          modules: ['node_modules'],
          alias: {
            landscape: path.resolve(__dirname, 'app/'),
          },
          fallback: {
            path: require.resolve('path-browserify'),
            os: false,
            fs: false,
            tls: false,
            net: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            process: require.resolve('process/browser'),
          },
        },
        // entry: './app/controllers/landscapes.ts',
        entry: './app/app.js',
        output: {
          filename: 'landscapes.js',
          publicPath: 'http://localhost:4500/assets/',
          uniqueName: 'landscapes',
        },
        optimization: {
          // Only needed to bypass a temporary bug
          // runtimeChunk: false,
        },
        // node: {
        //   global: true,
        // },
        plugins: [
          new ModuleFederationPlugin({
            name: 'bundle',
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
          // new HtmlWebpackPlugin({
          //   template: './app/index.html',
          // }),
          // //https://newbedev.com/webpack-bundle-js-uncaught-referenceerror-process-is-not-defined
          new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
        ],
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
