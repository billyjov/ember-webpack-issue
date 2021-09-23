const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
    uniqueName: "mfe1",
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "mfe1",
      library: { type: "var", name: "mfe1" },
      filename: "remoteEntry.js",
      exposes: {
        "./web-components": "./src/bootstrap.ts", // bootstrap --> main --> AppModule --> WebComp
      },

      // For hosts (please adjust)
      /*
            remotes: {
                'mfe1': "mfe1@http://localhost:3000/remoteEntry.js"
            },
            */

      // remotes: {
      //     'mfe1': "mfe1@http://localhost:3000/remoteEntry.js"
      // },

      shared: [
        "@angular/core",
        "@angular/common",
        "@angular/router",
        "ember-fetch",
        "@glimmer/component",
        "@glimmer/tracking",
        "@ember/optional-features",
        "ember-bootstrap",
        "ember-data",
        "ember-export-application-global",
        "ember-fetch",
        "ember-resolver",
        "ember-source",
        "ember-svg-jar",
      ],
    }),
  ],
};
