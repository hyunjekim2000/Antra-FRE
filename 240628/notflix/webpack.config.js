const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TMDB_API_KEY': JSON.stringify(process.env.TMDB_API_KEY)
    })
  ]
};
