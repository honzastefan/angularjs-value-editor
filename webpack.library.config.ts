import {babelLoader, tsLoaderFactory} from './webpack-loaders';

import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import UnminifiedWebpackPlugin from 'unminified-webpack-plugin';

module.exports = (env, {mode}) => ({
    mode: 'none',

    entry: mode === 'production' ? {
        'angularjs-value-editor.min': ['./src/value-editor/value-editor.module.ts']
    } : {
        'angularjs-value-editor': ['./src/value-editor/value-editor.module.ts']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'valueEditorModule',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    externals: {
        angular: 'angular',
        '@kpsys/angularjs-register': '@kpsys/angularjs-register',
        'angular-ui-ace': 'angular-ui-ace',
        'luxon': 'luxon',
        '@kpsys/angular-ui-bootstrap': '@kpsys/angular-ui-bootstrap',
        '@kpsys/angularjs-date-parser': '@kpsys/angularjs-date-parser',
        '@kpsys/angularjs-bootstrap-datetimepicker': '@kpsys/angularjs-bootstrap-datetimepicker',
        'angular-sanitize': 'angular-sanitize',
        'ui-select': 'ui-select'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                include: [/src/],
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                include: [/src/],
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
                test: /(\.sass$)|(\.scss$)/,
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
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.tpl.pug/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, 'src')
                        }
                    },
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader'
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
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

    plugins: (() => {
        const plugins = [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new CleanWebpackPlugin({
                verbose: true,
                cleanStaleWebpackAssets: false
            })];
        if (mode === 'production') {
            plugins.push(new UnminifiedWebpackPlugin());
        }

        return plugins;
    })()
});

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
