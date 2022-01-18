const path = require('path');
const dotenv = require('dotenv');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, 'src/server.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed)
    }),
  ],
  externals: [
    nodeExternals()
  ]
};
