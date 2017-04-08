
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: "./scripts/app.js",
  output: {
    path: __dirname + "/build",
    filename: "app.min.js"
  },
  module : {
    loaders: [
      {
        test   : /.js$/,
        loader : 'babel-loader',
        query: {
          presets: 'es2015',
        }
      }
    ]
  },
  plugins: [],
};
