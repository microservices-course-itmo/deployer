const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const { paths } = require('./utils');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        port: 8081,
        overlay: true,
        historyApiFallback: true,
        contentBase: paths.dist,
    }
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
});