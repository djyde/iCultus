module.exports = {
  entry: './app/app.js',
  output: {
    publicPath: '/build/',
    path: './build',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.png$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      css: 'style!css!postcss'
    }
  },
  postcss: function(){
    return [
      require('postcss-nested')()
    ]
  }
}