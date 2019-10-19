const _ = require('./utils')

Component({
    properties: {
        prop: {
            type: String,
            value: 'index.properties'
        },
    },
    data: {
        flag: false,
    },
    lifetimes: {
        attached () {
            console.log(">>>>");

            wx.getSystemInfo({
                success: () => {
                    this.setData({
                        flag: _.getFlag(),
                    })
                }
            })
        }
    }
})
