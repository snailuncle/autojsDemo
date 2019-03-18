/**
 * 作者: 　家
 * QQ:  　203118908
 * 功能:　 悬浮窗demo
 */

//小红点负责控制台的隐藏和显示
// var storage = storages.create("悬浮窗信息");
storages.remove('悬浮窗信息')
var 移动悬浮窗 = require('./移动悬浮窗.js')
var 带属性的悬浮窗 = require('./带属性的悬浮窗.js')
var window在屏幕之内 = require('./window在屏幕之内.js')
var 小红点悬浮球 = floaty.rawWindow(
  <frame  bg="#00ff0000">
    <img id='circleImg' circle="true" borderWidth="5" borderColor="gray" scaleType='centerInside'  src="@drawable/ic_stars_black_48dp" />
  </frame>
)
小红点悬浮球.setPosition(device.width, device.height / 2)
setTimeout(
  () => {
    while (1) {
      var view = 小红点悬浮球
      log(view)
      if (view) {
        var x = view.getX()
        var y = view.getY()
        var width = view.getWidth()
        var height = view.getHeight()
        if (x && y && width && height) {
          // 调整小球位置
          var 合适的x = device.width - width
          var 合适的y = device.height / 2
          小红点悬浮球.setPosition(合适的x, 合适的y)
          break
        } else {
        }
      }
      sleep(100)
    }
  }, 300
)
var 带属性的悬浮窗小红点悬浮球 = new 带属性的悬浮窗('小红点悬浮球', 小红点悬浮球)
var 控制台悬浮窗;

function 闪一下五角星(view) {
  var 闪闪几次 = 10
  var 闪闪间隔时间 = 100
  var view = 小红点悬浮球.circleImg
  var borderColor = view.borderColor
  for (var i = 0; i < 闪闪几次; i++) {
    ui.run(
      function () {
        view.setBorderColor(rndColor())
      }
    )
    sleep(闪闪间隔时间)
  }
  ui.run(
    function () {
      view.setBorderColor(borderColor)
    }
  )
}

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function 隐藏或显示控制台() {
  log('激活-->隐藏或显示控制台')
  threads.start(
    function () {
      闪一下五角星()
    }
  )
  threads.start(
    function () {
      移动悬浮窗.悬浮窗移动到屏幕边缘('小红点悬浮球', 小红点悬浮球)
    }
  )
  if (!控制台悬浮窗) {
    // 控制台还没有加载,
    log('开始加载控制台悬浮窗')
    threads.start(
      function () {
        控制台悬浮窗 = require('./控制台.js')
      }
    )
    log('结束加载控制台悬浮窗')
  }
  threads.start(
    function () {
      sleep(100)
      var startTime = new Date().getMilliseconds()
      var endTime = undefined
      var spendTime = undefined
      while (1) {
        if (控制台悬浮窗 && 控制台悬浮窗.getX) {
          log('控制台悬浮窗111111111')

          sleep(200)
          if (window在屏幕之内(控制台悬浮窗)) {
            移动悬浮窗.悬浮窗移动到屏幕之外('控制台悬浮窗', 控制台悬浮窗)
          } else {
            移动悬浮窗.悬浮窗移动到屏幕之内('控制台悬浮窗', 控制台悬浮窗)
          }
          break;
        }else{
          log('控制台悬浮窗0000000000')
        }
        sleep(100)
        endTime = new Date().getMilliseconds()
        spendTime = endTime - startTime
        if (spendTime > 2000) {
          log('控制台在%sms之内没有加载出来', spendTime)
          alert('控制台在%sms之内没有加载出来', spendTime)
          exit()
        }
      }
    }
  )
}
setTimeout(
  function(){
    var viewName=带属性的悬浮窗小红点悬浮球.setViewClickAction(
      '五角星', 小红点悬浮球.circleImg, 隐藏或显示控制台
    )
  },1000
)

// setInterval(() => {}, 3000)
module.exports=小红点悬浮球
