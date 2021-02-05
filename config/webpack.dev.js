'use strict';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Handlebars = require('handlebars');
const common = require('./webpack.common.js');
const util = require('./webpack.util.js');

/* 리소스 경로 설정(개발시 참조경로) */
const imageRootPath = {
    css: '/assets/',
    html: '/assets/',
};
const cssRootPath = '/assets/';
const jsRootPath = '/assets/';
/* const fontRootPath = '/assets/'; */

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: './assets/common/js/[name]2020.js',
    },
    devServer: {
        contentBase: path.join(__dirname, '../'),
        inline: true,
        hot: true,
        host: 'localhost',
        port: 9000,
        public: 'localhost:9000',
        headers: {
            'Content-Type':'text/html; charset=euc-kr'
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            /* {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: fontRootPath + '[path][name].[ext]',
                    context: 'assets',
                    emitFile: false,
                },
            }, */
            {
                test: /\.(scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: imageRootPath.css + '[path][name].[ext]',
                        context: 'assets',
                        emitFile: false,
                        limit: 10 * 1024,
                        fallback: 'file-loader',
                    },
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: imageRootPath.css + '[path][name].[ext]',
                        context: 'assets',
                        emitFile: false,
                    },
                },
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    /* 'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            preprocessor: (content, loaderContext) => {
                                let result;
                                try {
                                    result = Handlebars.compile(content)({
                                        imageRootPath: imageRootPath.html,
                                        cssRootPath: cssRootPath,
                                        jsRootPath: jsRootPath,
                                    });
                                } catch (error) {
                                    loaderContext.emitError(error);
                                    return content;
                                }
                                return result;
                            },
                        },
                    }, */
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets/enp',
                    to: 'enp'
                },
            ],
        }),
        /* new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }), */
    ],
});

