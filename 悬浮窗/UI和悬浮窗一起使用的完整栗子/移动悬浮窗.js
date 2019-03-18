var 滑动效果=require('./滑动效果.js')


var 移动悬浮窗 = {}
var storage = storages.create("悬浮窗信息");

function 悬浮窗移动到屏幕之外(windowName, window) {
  var x = window.getX()
  var y = window.getY()
  var xy = [x, y]
  storage.put(windowName + "悬浮窗移动到屏幕之外before坐标信息", JSON.stringify(xy));
  var width = window.getWidth()
  var height = window.getHeight()
  var 滑动耗时 = 300
  if (x < device.width / 2) {
    // window.setPosition(0, y)
    滑动效果(window, [0 - width, y], 滑动耗时)
  } else {
    // window.setPosition(device.width-width, y)
    滑动效果(window, [device.width + width, y], 滑动耗时)
  }
}
function 悬浮窗移动到屏幕之内(windowName, window) {
  var x = window.getX()
  var y = window.getY()
  var xy = [x, y]
  var 之前的坐标=storage.get(windowName + "悬浮窗移动到屏幕之外before坐标信息");
  var 滑动耗时 = 300
  if(之前的坐标){
    之前的坐标=JSON.parse(之前的坐标)
    滑动效果(window, 之前的坐标, 滑动耗时)
    return
  }
  var width = window.getWidth()
  var height = window.getHeight()
  if (x < device.width / 2) {
    // window.setPosition(0, y)
    滑动效果(window, [0, y], 滑动耗时)
  } else {
    // window.setPosition(device.width-width, y)
    滑动效果(window, [device.width - width, y], 滑动耗时)
  }
}


function 悬浮窗移动到屏幕边缘(windowName, window) {
  var x = window.getX()
  var y = window.getY()
  var xy = [x, y]
  var 滑动耗时 = 300
  var width = window.getWidth()
  var height = window.getHeight()
  if (x < device.width / 2) {
    // window.setPosition(0, y)
    滑动效果(window, [0, y], 滑动耗时)
  } else {
    // window.setPosition(device.width-width, y)
    滑动效果(window, [device.width - width, y], 滑动耗时)
  }
}








移动悬浮窗.悬浮窗移动到屏幕之外 = 悬浮窗移动到屏幕之外
移动悬浮窗.悬浮窗移动到屏幕之内 = 悬浮窗移动到屏幕之内
移动悬浮窗.悬浮窗移动到屏幕边缘 = 悬浮窗移动到屏幕边缘
module.exports = 移动悬浮窗
