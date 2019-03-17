var window在屏幕之内 = require('./window在屏幕之内.js')
var 移动悬浮窗 = require('./移动悬浮窗.js')

function 多线程控制悬浮窗隐藏或显示(悬浮窗名字,悬浮窗){
  if(!悬浮窗){
   log('悬浮窗还没初始化,现在是空的!')
   alert('悬浮窗还没初始化,现在是空的!')
   exit()
  }
  threads.start(
    function () {
      sleep(100)
      var startTime = new Date().getMilliseconds()
      var endTime = undefined
      var spendTime = undefined
      while (1) {
        if (悬浮窗) {
          if (window在屏幕之内(悬浮窗)) {
            移动悬浮窗.悬浮窗移动到屏幕之外(悬浮窗名字, 悬浮窗)
          } else {
            移动悬浮窗.悬浮窗移动到屏幕之内(悬浮窗名字, 悬浮窗)
          }
          break;
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



var 多线程控制悬浮窗={}
多线程控制悬浮窗.隐藏或显示=多线程控制悬浮窗隐藏或显示
module.exports=多线程控制悬浮窗
