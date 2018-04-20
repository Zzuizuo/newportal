const dev = {
    host: 'http://dev.genwoshua.com',
    wxAppid: 'wx5226f655adeda0ab',
}

const prod = {
    host: 'http://app.genwoshua.com',
    wxAppid: 'wx537738a90f7970be',
}

const test = {
    host: 'http://test.genwoshua.com',
    wxAppid: 'wx86406abd3035f1ec',
}

let config = {}

switch (process.env.PACK_ENV){
    case 'dev':
        config = dev
        break
    case 'prod':
        config = prod
        break
    case 'test': 
        config = test
        break
}

export default config