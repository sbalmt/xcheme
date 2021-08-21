const ShebangPlugin = require('webpack-shebang-plugin');
const path = require('path');
const config = {
  target: 'node',
  mode: 'none',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'xcm.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'nosources-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  watchOptions: {
    aggregateTimeout: 30,
    ignored: /node_modules/
  },
  plugins: [new ShebangPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              projectReferences: true
            }
          }
        ]
      }
    ]
  }
};
module.exports = config;
