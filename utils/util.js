const port = require("./port")

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// get  请求
function get(url,data,type){
  return requestData('GET',url,data,type);
}

// post  请求
function post(url,data,type){
  return requestData('POST',url,data,type);
}
// 请求数据
function requestData(method,url,data,type){
  return new Promise((resolve,reject) => {
    if(type == 'meituan'){
      wx.request({
        method,
        url:port.host+url, //仅为示例，并非真实的接口地址
        data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log("util",res)
          resolve(res)
        },
        fail: function(err) {
          console.log("utilerr",err)
          reject(err)
        }
      })
    }else if(type == 'mockMeituan'){
      wx.request({
        method,
        url:port.myHost+url, //仅为示例，并非真实的接口地址
        data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log("util",res)
          resolve(res)
        },
        fail: function(err) {
          console.log("utilerr",err)
          reject(err)
        }
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  get,
  post
}
