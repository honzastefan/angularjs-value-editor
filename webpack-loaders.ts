import {resolve} from 'path';

export const babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
                '@babel/plugin-proposal-decorators',
                {
                    legacy: true
                }
            ],
            ['@babel/plugin-transform-runtime', {
                regenerator: false,
                useESModules: true
            }],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-for-of',
            'angularjs-annotate',
            '@babel/plugin-proposal-function-bind'
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: 'last 2 versions, not ie < 11',
                    modules: false
                }
            ]
        ]
    }
};

export const tsLoaderFactory = (dirname) => ({
    loader: 'ts-loader',
    options: {
        // compiler: 'ttypescript',
        experimentalFileCaching: true,
        allowTsInNodeModules: true,
        configFile: resolve(dirname, 'tsconfig.frontend.json')
    }
});
