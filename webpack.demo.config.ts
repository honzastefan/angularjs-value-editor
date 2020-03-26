import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {babelLoader, tsLoaderFactory} from './webpack-loaders';

module.exports = {
    mode: 'development',

    entry: {
        'angularjs-value-editor-demo': ['./demo/app.ts']
    },

    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [/dist/],
                loader: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                include: [/demo/, /dist/],
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                include: [/demo/, /dist/, /src/],
                use: [
                    babelLoader,
                    tsLoaderFactory(__dirname)
                ]
            },
            {
                test: /(\.less$)|(\.css$)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.tpl.pug$/,
                loader: `ngtemplate-loader!html-loader!pug-html-loader`
            },
            {
                test: /\.(svg|png)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                jsVendors: {
                    test: isJsVendor,
                    name: 'vendors',
                    chunks: 'all'
                },
                cssVendors: {
                    test: isCssVendor,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    devtool: 'source-map',

    devServer: {
        port: 3000,
        contentBase: '.',
        historyApiFallback: true
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: 'html-loader!pug-html-loader!demo/index.pug'
        })
    ]
};

function isJsVendor({resource}) {
    return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/.js$/);
}

function isCssVendor({resource}) {
    return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/.css$/);
}
