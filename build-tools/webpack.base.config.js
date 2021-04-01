const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
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
                        ],
                        [
                            'inline-dotenv',
                            {
                                path: this.mode === 'production' ?
                                    path.join(paths.root, '.env') :
                                    path.join(paths.root, '.env.dev')
                            }
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
        new ESLintPlugin({
            extensions: ['ts', 'tsx']
        }),
        
        new MiniCssExtractPlugin({
            filename: path.join('assets', 'css', '[name].[hash].css')
        }),
        
        new HtmlWebpackPlugin({
            template: path.join(paths.public, 'index.html'),
            filename: path.join('.', 'index.html')
        })
    ]
};
