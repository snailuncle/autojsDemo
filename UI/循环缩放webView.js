"ui";
ui.layout(
  <vertical>
    <button id='zoom'>循环缩放</button>
    <webview id="web" w="*" h="*"></webview>
  </vertical>
)
ui.web.loadUrl('https://www.baidu.com')
var mode = [{
    w: 100,
    h: 150
  },
  {
    w: 300,
    h: 450
  },
  {
    w: device.width+"px",
    h: device.height+"px"
  },
  {
    w: 900,
    h: 1350
  }
]
var num = function () {
  var current = 0
  return function () {
    if (current > mode.length - 1) {
      current = 0
    }
    return current++
  }
}()
ui.zoom.click(
  function () {
    var currentNum = num()
    var currentMode = mode[currentNum]
    log('currentNum=', currentNum)
    ui.run(
      function () {
        ui.web.attr("width", currentMode.w)
        ui.web.attr("height", currentMode.h)
      }
    )
  }
)
