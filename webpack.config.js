var path = require('path');
var ExtractTextPlugin = require('extract-text')

module.exports = {
    entry: './assets/script/master.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: 
            }
        ]
    }
};