//index.js
const util = require("../../utils/util");
//获取应用实例
const app = getApp()

Page({
  data: {
    letterArr:[], //右边的A-Z
    addressArr:[],
    scrollTop:"",
  },
  onShow(){
    util.post("/ajax/v6/user/address/opencities","","meituan").then((res) => {
      console.log("++++++++++",res);
      this.setData( {
        letterArr: res.data.data.classify_nav,
        addressArr:res.data.data.city_nav
      })
      console.log("addressArr",this.data.addressArr)
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e){
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  selectCity(val){
    console.log("val",val.currentTarget.dataset.id);
        this.setData({
          scrollTop:val.currentTarget.dataset.id
          // 'addressArr[0].idx':val.currentTarget.dataset.id,

        })
        // console.log(this.data.addressArr[0].idx)
  }
})
