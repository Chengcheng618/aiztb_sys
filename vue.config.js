module.exports = {
    lintOnSave: false, //关闭lint服务
    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        }
    }
}