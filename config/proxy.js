
// 接口代理配置
// 开发使用了Easy mock工具， 地址: https://easy-mock.com
const target = 'https://easy-mock.com/mock/5982e222a1d30433d8524731/test'
// const target = 'http://172.30.8.227:8080'
module.exports = {
  '/api': {
    target: target,
    changeOrigin: true,
    pathRewrite: {
      '/api': ''
    }
  }
}
