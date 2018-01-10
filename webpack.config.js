const path = require('path');

const srcPath = path.join(__dirname, './src');

module.exports = {
  entry: [
    srcPath
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    library: 'react-pusher',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    "react": "React"
  }
};
