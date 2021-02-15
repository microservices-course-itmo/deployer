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
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                pathRewrite: {"^/api" : ""}
            }
        }
    }
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
});
