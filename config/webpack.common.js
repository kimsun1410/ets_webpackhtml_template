'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const utility = require('./webpack.util.js');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        etoos_comm: './src/common.js',
        etoos_main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
        filename: 'common/js/[name]2020.js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../'), /* ROOT */
        },
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        /* 스프라이트 이미지 생성 */
        utility.createSprite('common'),
        utility.createSprite('main'),
    ],
};
