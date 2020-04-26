var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/MapCz.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'MapCz.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ]
    }
}