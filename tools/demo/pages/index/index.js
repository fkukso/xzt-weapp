var app = getApp();
// console.log("...............");
// console.log(app);


//Page Object
Page({
    data: {
        getPolicy: app.globalData.getPolicy
    },
    //options(Object)
    onLoad: function (options) {
        // let per = 0;
        // let timer = setInterval(() => {
        //     per++
        //     wx.showLoading({
        //         title: `上传进度${per}%`,
        //         mask: true,
        //         success: (result) => {

        //         },
        //         fail: () => { },
        //         complete: () => { }
        //     });
        //     if (per === 100) {
        //         clearInterval(timer)
        //         wx.hideLoading();
        //     }
        // }, 100);
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    onPageScroll: function () {

    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    },
    uploadImg () {
        let ossFileKey = "",
            tempFilePath = "";
        app.xzt.wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
        }).then(res => {
            console.log(this);
            console.log(res);

            tempFilePath = res.tempFilePaths[0]
            return app.globalData.getPolicy()
        }).then(po => {
            console.log(po);
            ossFileKey = po.fileKey
            return proxy.uploadFile({
                base: "",
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
    }
});