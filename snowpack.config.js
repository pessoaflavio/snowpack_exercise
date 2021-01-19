// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  plugins: [
    // [
    //   '@snowpack/plugin-webpack',
    //   {
    //     /* see "Plugin Options" below */
    //   },
    // ],
  ],
exclude: ['**/node_modules/**/*','**/.git/**/*','.gitignore','snowpack.config.js'],
  mount: {
    // Same behavior as the "src" example above:
    public: "/",
    // Mount "public" to the root URL path ("/*") and serve files with zero transformations:
    src: "/build"
  },
  // buildOptions: {
  //   out: "/build"
  // }
};
