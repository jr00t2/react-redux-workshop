var webpack = require('webpack'),
path = require('path');
var srcPath  = path.join(__dirname, './src');
module.exports = {
  watch: true,
  context: srcPath,
  entry: {
    app: './index.js'
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-2'],
        plugins: ["transform-decorators-legacy"]
      }
    }]
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
