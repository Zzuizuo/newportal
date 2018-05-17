/**
 * 基于vue-resource的异步请求模块
 */
import Vue from 'vue'

const io = (type, that, url, data) => {
    return new Promise((resolve)=>{
        //get
        if(type == 'get'){
            //对象
            if(data){
                let dataArr = []
                for(let item in data){
                    dataArr.push(item + '=' + data[item])
                }
                url = url + '?' + dataArr.join('&')
            }

            that.$http.get(url).then((res)=>{
                if(res.body){
                    resolve(successResponse(res.body))
                }else if(typeof res.bodyText == 'string'){
                    resolve(successResponse(res.bodyText))
                }
                else{
                    res.bodyText.then((successData)=>{
                        resolve(successResponse(successData))
                    })
                }
            },(err)=>{
                if(err.status == 403){
                    that.$router.replace({name: 'login'})
                }else if(err.status == 502){
                    resolve(errorResponse('服务器累了需要休息下，稍等两分钟吧'))
                }else if(err.status == 302){
                    resolve(successResponse(err.body))
                }else{
                    if(err.body){
                        resolve(errorResponse(err.body))
                    }else if(err.bodyText){
                        err.bodyText.then((errData)=>{
                            resolve(errorResponse(errData))
                        }).catch(()=>{
                            resolve(errorResponse('服务器无法响应'))
                        })
                    }else{
                        resolve(errorResponse('服务器无法响应'))
                    }
                }
                
            })
        }



        //post
        if(type=='post'){
            that.$http.post(url, data).then((res)=>{

                if(res.body){
                    resolve(successResponse(res.body))
                }else if(typeof res.bodyText == 'string'){
                    resolve(successResponse(res.bodyText))
                }
                else{
                    res.bodyText.then((successData)=>{
                        resolve(successResponse(successData))
                    })
                }

            },(err)=>{
                if(err.status == 403){
                    that.$router.replace({name: 'login'})
                }else if(err.status == 502){
                    resolve(errorResponse('服务器累了需要休息下，稍等两分钟吧'))
                }else{
                    if(err.body){
                        resolve(errorResponse(err.body))
                    }else if(err.bodyText){
                        err.bodyText.then((errData)=>{
                            resolve(errorResponse(JSON.parse(errData)))
                        }).catch(()=>{
                            resolve(errorResponse('服务器无法响应'))
                        })
                    }else{
                        resolve(errorResponse('服务器无法响应'))
                    }
                }
                
            })
        }

        
    })
}

const successResponse = (data) => {
    return {
        code: 1,
        data: data
    }
}

const errorResponse = (data) => {
    return {
        code: 0,
        msg: data
    }
}

export default {
    post(...props){
        if(props.length === 3){
            return io('post', props[0], props[1], props[2])
        }
    },

    get(...props){
        return io('get', props[0], props[1],props[2])
    },
}