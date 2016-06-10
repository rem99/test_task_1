var webpack = require("webpack");

var env = process.env.WEBPACK_ENV;

var plugins = [
    new webpack.ProvidePlugin({
        "_": "underscore",
        "Backbone": "backbone",
        "$": "jquery",
        "jQuery": "jquery"
    })
];

var loaders = [
    {
        test: /\.js$/,
        loader: 'babel',
        query: {
            presets: ['es2015'],
            cacheDirectory: true
        }
    }
];

if (env === 'build') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
} else {
    loaders.push({
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/
    });
}

var config = {
    entry: 'script.js',
    resolve: {
        modulesDirectories: [
            "./src",
            "./node_modules"
        ]
    },
    output: {
        publicPath: "./",
        path: './dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: loaders
    },
    plugins: plugins
};

if (env !== 'build') {
    config.devtool = "source-map";
}

module.exports = config;
