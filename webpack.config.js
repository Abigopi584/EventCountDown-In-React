let webpack = require('webpack');
let path = require('path');
let jsonLoader = require('json-loader');
let UrlLoder = require('url-loader');

// enabling redux dev tools


let MY_APP_DIR = path.join(__dirname, 'src/client/app');
let MY_BUILD_DIR = path.join(__dirname, 'src/client/public');

console.log('MY_APP_DIR is '+MY_APP_DIR);
console.log('MY_BUILD_DIR is '+MY_BUILD_DIR);


module.exports={
    "entry": MY_APP_DIR + "/app.jsx",
    "output": {
        path: MY_BUILD_DIR,
        filename: 'app.js'
    },
    devServer:{
        inline: false,
        historyApiFallback: true,
        contentBase:'./',
        hot:true
    },
    module:{
        loaders: [
            {
                test: /.jsx?/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
             {
                 test: /\.(jpe?g|png|gif|svg)$/i,
                 loader: "url-loader?name=/[name].[ext]"
             },
                ]
    }
};
