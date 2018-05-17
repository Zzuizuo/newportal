export const getQueryString = () => {
　  let url = window.location.href
　　var arrUrl = url.split("?")
　　var para = arrUrl[1]
　　return para;
}


