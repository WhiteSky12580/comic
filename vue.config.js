module.exports = {
    devServer: {
        //跨域
        proxy: {
            '/api': {
                //目标路径
                target: 'http://localhost:5000/',
                //允许跨域
                changeOrigin: true,
                //重写路径
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}