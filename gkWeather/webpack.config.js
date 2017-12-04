module.exports = {
    entry: ['./src/js/app.js'],
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dist/js',
        filename: 'app.js'
    }
};