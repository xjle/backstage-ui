/* eslint-disable @typescript-eslint/no-var-requires */
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const Version = new Date().getTime()

module.exports = {
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${Version}.js`,
      chunkFilename: `js/[name].${Version}.js`
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*'],
            exclue: ['node_modules'],
            exclude: /node_modules/i,
            unitPrecision: 2
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true, // 控制服务器收到的请求头host字段的值
        cookieDomainRewrite: 'localhost',
        pathRewrite: { '^/api': '' },
        secure: false,
        ws: true
      }
    }
  }
}
