module.exports = {
  entry: "./slate.js",
  output: {
    library: 'slate-lib',
    libraryTarget: 'amd',
    filename: 'slate-lib.js'
  },
  resolve: {
    modules: [
      'node_modules',
      'packages'
    ]
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
