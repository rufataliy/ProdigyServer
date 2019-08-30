const HtmlWebPackPlugin = require("html-webpack-plugin");

 const htmlWebpackPlugin = new HtmlWebPackPlugin({
   template: "./src/index.html",
   filename: "./index.html"
 });
 module.exports = {
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader"
          }

        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
};