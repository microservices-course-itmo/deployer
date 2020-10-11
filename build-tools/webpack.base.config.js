const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { paths } = require('./utils');

module.exports = {
    entry: {
        app: paths.src
    },
    
    output: {
        filename: path.join('assets', 'js', '[name].[contenthash].js'),
        path: paths.dist,
        publicPath: '/'
    },
    
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ],
                    
                    plugins: [
                        'babel-plugin-styled-components',
                        [
                            'babel-plugin-import',
                            {
                                'libraryName': '@material-ui/core',
                                'libraryDirectory': 'esm',
                                'camel2DashComponentName': false
                            },
                            'core'
                        ],
                        [
                            'babel-plugin-import',
                            {
                                'libraryName': '@material-ui/icons',
                                'libraryDirectory': 'esm',
                                'camel2DashComponentName': false
                            },
                            'icons'
                        ]
                    ]
                },
                exclude: /node_modules/
            },
            
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }
                ],
                include: path.join(paths.res, 'css'),
            },
        ]
    },
    
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js']
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: path.join('assets', 'css', '[name].[hash].css')
        }),
        
        new HtmlWebpackPlugin({
            template: path.join(paths.public, 'index.html'),
            filename: path.join('.', 'index.html')
        })
    ]
};
