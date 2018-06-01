
const apiList = {
    //qiniu
    uploadimg: '/admin/qiniu/getUpToken',
    //account
    login: '/wx/scan/login',
    logout: '/logout',
    accounts: '/admin/user/webQuery',
    authList: '/admin/user/allAuthList',
    createAccount: '/admin/user/create',
    bindUser: '/admin/user/bind',
    queryUser: '/admin/user/',
    deleteUser: '/admin/user/del/',
    userUpdata: '/admin/user/update',

    //shop
    createShop: '/admin/shop',
    queryShop: '/admin/shop/webQuery',
    updataShop: '/admin/shop/update',

    //product
    queryProduct: '/admin/product/webQuery'
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