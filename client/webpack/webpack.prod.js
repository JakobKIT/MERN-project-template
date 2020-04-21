// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const common = require('./webpack.common');

const options = {

};

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new RobotstxtPlugin(options)],
});
