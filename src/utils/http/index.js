const wxProxy = require('../wx-proxy.js')

/**
 * 
 * @param {obj} object 
 */
function setUrlQuery (obj) {
    let str = ""
    // 判断是否含有？，没有就添加？，否则添加&
    // str += (url.indexOf("?") > 0 ? "&" :　"?");
    // str += encodeURIComponent(name) + "=" +encodeURIComponent(value);

    Object.keys(obj).forEach(key => {
        str += `${key}=${obj[key]}`
    })
    return str
}

// console.log(setUrlQuery({ a: 1, b: 2 }));


class Http {
    constructor(params) {
        let defaultConfig = {
            baseUrl: "",
            method: "POST"
        }
        this.config = Object.assign({}, defaultConfig, params)

        this._promise = new Promise((resolve, reject) => {
            this.resolve = resolve
        })
    }


    /**
     * 
     * @param {*} params 
     * 参照微信小程序的wx.request官方api传参
     */
    static request (params) {
        return wxProxy.request(params);
    }


    request (params) {

        console.log(params);

        let options = Object.assign({}, this.config, params)

        options.url = this.config.baseUrl + options.url

        return this._promise.then(() => {
            return Http.request(options);
        })
    }
}


module.exports = Http
