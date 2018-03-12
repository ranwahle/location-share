const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        index: './index.html',
        bundle: './location-client.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
               exclude: /node_modules/
            },
            { test: /\.html/, use: 'html-loader'}

        ]
    },
    devtool: "source-map",
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};