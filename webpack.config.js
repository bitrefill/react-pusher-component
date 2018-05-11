const path = require('path');

const srcPath = path.join(__dirname, './src');

module.exports = {
  mode: 'production',
  entry: [srcPath],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    library: 'react-pusher',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loaders: 'babel-loader',
        query: {
          presets: ['react-app'],
        },
      },
    ],
  },
  externals: {
    react: 'react',
    'pusher-js': 'pusher-js',
  },
};
