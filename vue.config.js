module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://test.local.com:8080',
                pathRewrite: { 
                    '^/api': ''
                },
                secure: false,
                changeOrigin: true,
            },
        },
    },
};