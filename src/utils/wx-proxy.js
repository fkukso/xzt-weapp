var wxProxy = new Proxy({}, {
    get: function (target, apiName) {
        return function (params = {}) {
            return new Promise((resolve, reject) => {
                if (apiName in wx) {
                    let cmpl = params.complete

                    params.complete = function (res) {
                        typeof cmpl === 'function' && cmpl(res)
                        // 如果返回的errMsg里包含下述字串，则认为是成功，否则认为是失败；
                        if (res.errMsg.indexOf(`${apiName}:ok`) === 0) {
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    }

                    wx[apiName](params)
                } else {
                    reject(`wx下没有${property}方法或属性...`)
                }
            })
        }
    }
});

module.exports = wxProxy;