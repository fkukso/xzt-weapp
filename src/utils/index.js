const wxProxy = require('./wx-proxy.js')

const Http = require('./http/index.js')
module.exports = {
    wx: wxProxy,
    Http: Http
}