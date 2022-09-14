const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 3000;

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        parser:{
          dataUrlCondition:{
            maxSize: 30 * 1024,
          }
        },
      }
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
