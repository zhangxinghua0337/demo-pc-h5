module.exports = {
    entry:'./js/index.js',
    output:{
        path:'build',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel'
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=8192'
            }
        ]
    }
};
