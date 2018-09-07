const util = require("../../utils/util");
//index.js
//获取应用实例
const app = getApp()
console.log("app",app)

Page({
  data: {
    headerImg:"",
    aaa:"hello world",
    starStyle:-1,
    value:9.4,
    currentAddr:"",
  },
  aaaa() {
    console.log('view tap')
  },
  //事件处理函数
  bindViewTap: function() {

  },
  // 只调用一次
  onLoad: function () {
    console.log("onLoad",this)
  },
  // 页面展示一次就调用一次
  onShow: function () {
    // console.log("onShow",this);
    this.data.starStyle = parseFloat(`${this.data.value / 4}em`);
    // 获取当前地理位置
    let latitude,longitude;
    let self = this;
    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log("获取当前地理位置",res)
        latitude = res.latitude
        longitude = res.longitude
        // 用经纬度获取准确地址名称
        wx.request({
          url: `http://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=IHMBZ-EDSKJ-CXOF4-FAIMN-B6IW6-IKFDZ`, //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log("地址",res.data)
            self.setData({
              currentAddr:res.data.result.address
            })
          }
        })
      }
    })
    // https://www.easy-mock.com/mock/5b76608a76a41b2c09dbf277/copymeituan/header
    util.get("/header","","mockMeituan").then((res) => {
      console.log("列表",res);
    })
  },
  // 只调用一次
  onReady: function () {
    console.log("onReady",this)
  },
  // 点击 tab 时触发
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 转发按钮
  onShareAppMessage: function (res) {
    console.log("onHide",this)
    if(res.from === 'button'){
      console.log(res.target);
    }
    return {
      title:"标题",
      path:"/page/index?id=123"
    }
  },
  toSearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  toAddress(){
    wx.navigateTo({
      url: '../address/address'
    })
  }
})
