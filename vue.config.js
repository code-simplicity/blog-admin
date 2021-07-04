module.exports = {
    devServer: {
        proxy: {
            '/user': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/admin': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    }
};