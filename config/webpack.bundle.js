'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Handlebars = require('handlebars');
const common = require('./webpack.common.js');
const util = require('./webpack.util.js');

/* 리소스 경로 설정(GIT 페이지 참조경로) */
const imageRootPath = {
    css: '../../',
    html: '../../',
};
const cssRootPath = '../../../dist/';
const jsRootPath = '../../../dist/';
/* const fontRootPath = '../../../assets/'; */

module.exports = merge(common, {
    mode: 'development',
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: false,
                        }
                    },
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
                            context: 'assets',
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
                            attributes: {
                                urlFilter: (attribute, value, resourcePath) => {
                                  if (/ets_main\.css$/ || /ets_main.bundle\.js$/) {
                                    return false;
                                  }
                                  return true;
                                },
                            },
                        },
                    }, */
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'common/css/[name]2020.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets/enp',
                    to: 'enp',
                },
                /* {
                    from: path.resolve(__dirname, '../assets/common/css/*.css'),
                    to: 'common/css',
                    flatten: true,
                }, */
            ],
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
    ],
});
