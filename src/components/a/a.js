// app01/components/xzt-m-input/xzt-m-input.js

const xzt = require('../../utils/index.js')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        },
        getPolicy: {
            type: null,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 这里是一些组件内部数据
        list: [{
            type: "image",
            url: `https://cdn01.xiaogj.com/uploads/mobile/xgj/static/img/banner001.e7e7969.jpg`
        }]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        uploadImg: function () {
            let ossFileKey = "",
                tempFilePath = "";
            xzt.wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
            }).then(res => {
                tempFilePath = res.tempFilePaths[0]
                console.log(this.data.getPolicy);
                console.log(typeof this.data.getPolicy);
                return this.data.getPolicy()
            }).then(po => {
                console.log(po);
                ossFileKey = po.fileKey
                return xzt.wx.uploadFile({
                    url: 'https://poly-show.oss-cn-hangzhou.aliyuncs.com',
                    filePath: tempFilePath,
                    name: 'file',
                    formData: {
                        name: tempFilePath,
                        key: po.fileKey,
                        policy: po.policy,
                        OSSAccessKeyId: po.accessId,
                        success_action_status: "200",
                        signature: po.signature
                    },
                })
            }).then(res => {
                console.log(res);
                this.setData({
                    [`list[${this.data.list.length}]`]: {
                        type: "image",
                        url: `https://poly-show.oss-cn-hangzhou.aliyuncs.com/${ossFileKey}`
                    }
                })
            }).catch(err => {
                console.log(err);
            }).finally(res => {
                console.log(res);
            })
        },
        uploadVideo: function () {
            let ossFileKey = "",
                tempFilePath = "";
            xzt.wx.chooseVideo({
                sourceType: ['album', 'camera'],
                compressed: false,
                maxDuration: 600,
                camera: 'back',
            }).then(res => {
                tempFilePath = res.tempFilePath
                return this.data.getPolicy()
            }).then(po => {
                console.log(po);
                ossFileKey = po.fileKey
                return xzt.wx.uploadFile({
                    url: 'https://poly-show.oss-cn-hangzhou.aliyuncs.com',
                    filePath: tempFilePath,
                    name: 'file',
                    formData: {
                        name: tempFilePath,
                        key: po.fileKey,
                        policy: po.policy,
                        OSSAccessKeyId: po.accessId,
                        success_action_status: "200",
                        signature: po.signature
                    },
                })
            }).then(res => {
                console.log(res);
                this.setData({
                    [`list[${this.data.list.length}]`]: {
                        type: "video",
                        url: `https://poly-show.oss-cn-hangzhou.aliyuncs.com/${ossFileKey}`
                    }
                })
            }).catch(err => {
                console.log(err);
            }).finally(res => {
                console.log(res);
            })
        }
    }
})
