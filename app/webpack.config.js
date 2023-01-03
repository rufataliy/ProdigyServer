const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin"); 
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/public/index.html",
  filename: "index.html",
  excludeChunks: ["server", "./src/build"],
});

module.exports = (env) => ({
  watch: false,
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: env.BASE_URL + "/app/",
    filename: "[name].js",
  },
  target: "web",
  devtool: "source-map",
  plugins: [htmlWebpackPlugin],
  module: {
    // Need this to avoid error when working with Express
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
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
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
});
