// autojs是基于控件的
// 控件决定行为
// 控件改变,行为改变
// 基于这个理念,写个ＱＱ发消息的脚本
// 控件---------------->行为
// 桌面的QQ图标          打开QQ
// QQ左下角的消息        点击聊天窗口
// 发送按钮              发送消息
// 以上是最基本的流程
/**
 * @class Watch
 * @param {Array} viewArr 举个例子[{text:'QQ',id:'QQ'},{text:'发送'}]
 * @param {function} action
 */
function Watch(viewArr, action) {
  this.viewArr = viewArr || []
  this.action = action || function () {}
  this.addView = function (view) {
    this.viewArr.push(view)
  }
  this.setViewArr = function (viewArr) {
    this.viewArr = viewArr || []
  }
  this.setAction = function (action) {
    this.action = action || function () {}
  }
  this.watch = function (limitTime) {
    var limitTime = limitTime || 3000
    var startTime = new Date().getTime()
    while (1) {
      sleep(1000)
      var flag = 0
      for (let i = 0; i < this.viewArr.length; i++) {
        var viewNeedExist = this.viewArr[i]
        var findRule = ''
        for (var k in viewNeedExist) {
          findRule += k + '(' + '"' + viewNeedExist[k] + '"' + ')' + '.'
        }
        findRule += 'findOnce()'
        log('findRule=%s', findRule)
        if (eval(findRule)) {
          log(viewNeedExist.toString() + '存在')
          flag++;
        } else {
          log(viewNeedExist.toString() + '不存在')
          break;
        }
      }
      //判断控件存在的数量与参数指定的是否一致
      if (flag == this.viewArr.length) {
        this.action()
        log('我返回的是true')
        return true
      }
      var endTime = new Date().getTime()
      var spendTime = endTime - startTime
      if (spendTime > limitTime) {
        log('你传入的参数是%j', this.viewArr)
        log('查找失败')
        log('我返回的是false')
        return false
      }
    }
  }
}
//QQ发消息的三个步骤
//在桌面打开QQ
//在消息界面点击某个聊天窗口
//输入消息,点击发送
var 桌面QQ控件 = {
  text: 'QQ'
}
var 桌面QQ行为 = function () {
  log('执行了桌面QQ行为')
  text('QQ').findOnce().click()
}
var 左下角消息控件 = {
  id: 'com.tencent.mobileqq:id/name',
  text: '消息'
}
var 左下角消息行为 = function () {
  log('执行了左下角消息行为')
  var 点击聊天窗口 = function () {
    press(659, 1259, 1)
  }
  点击聊天窗口()
}
var 发送控件 = {
  text: '发送',
  id: 'com.tencent.mobileqq:id/fun_btn'
}
var 发送行为 = function () {
  log('执行了发送行为')
  id('input').findOnce().setText('hello world')
  sleep(1000)
  click('发送')
}
// 为了直观些,我们把控件和行为并排写
var viewArrs = [
  [桌面QQ控件],
  [左下角消息控件],
  [发送控件]
]
var actions = [桌面QQ行为, 左下角消息行为, 发送行为]
var watches = []
for (let i = 0; i < viewArrs.length; i++) {
  var watch = new Watch(viewArrs[i], actions[i])
  watches.push(watch)
}
//由于这是一个有顺序的行为,我们用promise包装一下action
var 桌面QQ行为promiseFn = function () {
  return new Promise((resolve, reject) => {
    if (watches[0].watch()) {
      resolve('成功')
    } else {
      reject('失败')
    }
  })
}
var 左下角消息行为promiseFn = function () {
  return new Promise((resolve, reject) => {
    if (watches[1].watch()) {
      resolve('成功')
    } else {
      reject('失败')
    }
  })
}
var 发送行为promiseFn = function () {
  return new Promise((resolve, reject) => {
    if (watches[2].watch()) {
      resolve('成功')
    } else {
      reject('失败')
    }
  })
}
桌面QQ行为promiseFn()
  .then(左下角消息行为promiseFn)
  .then(发送行为promiseFn)
  .catch(() => {
    log('发身错误')
  })
