
const apiList = {
    login: '/wx/scan/login',
    logout: '/logout',
    accounts: '/admin/user/webQuery'
}

let proxies = {}
const proxyTarget = 'http://47.96.98.107'

for(let i in apiList){
  proxies[apiList[i]] = {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: {[`^${apiList[i]}`] : apiList[i]}
  }
}

module.exports = proxies