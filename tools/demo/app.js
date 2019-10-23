//app.js
var xzt = require('./utils/index.js')

// console.log(xzt);


var http = new xzt.Http({
    baseUrl: "https://qout.club/"
})


App({
    onLaunch: function () {
        xzt.wx.login().then(res => {
            // console.log(res);
            return xzt.Http.request({
                url: 'https://qout.club/api/show/wxa/login',
                data: {
                    jsCode: res.code
                },
                method: 'POST',
            })
        }).then(res => {
            // console.log(res);
            this.globalData.accessToken = res.data.accessToken

            http.resolve("用户登录完成")
        })
    },
    xzt: xzt,
    http: http,
    globalData: {
        accessToken: null,
        getPolicy: function () {
            return http.request({
                url: 'api/show/oss/policy',
                method: 'GET',
                header: {
                    'access_token': getApp().globalData.accessToken
                }
            }).then(res => {
                return res.data
            })
        }
    }
})


