'use strict'
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // gzip
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin').use(new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false // 不删除源文件
            }))
        }

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
