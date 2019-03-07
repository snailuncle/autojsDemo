var 搜索框 = bounds(120, 101, 1056, 187).findOnce()
if (搜索框) {
  clickView(搜索框)
  sleep(1000)
  输入消息(搜索框, '喵喵喵')
} else {
  alert('没找到')
}

function 输入消息(view, msg) {
  sleep(1000)
  KeyCode('KEYCODE_SPACE')
  sleep(3000)
  input(msg)
  sleep(1000)
}

function clickView(view) {
  log(arguments.callee.name + '开始')
  log(view)
  if (view) {
    var x = view.bounds().centerX()
    var y = view.bounds().centerY()
    log('将要点击的坐标 %s,%s', x, y)
    press(x, y, 1)
  } else {
    throw '传入clickView中的view异常'
  }
  log(arguments.callee.name + '结束')
}
