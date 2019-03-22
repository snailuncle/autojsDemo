/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   多个脚本排队运行
 */
// 当脚本退出时,添加一个parent.go(),parent是外部传给脚本的参数
function codeWhenExitFunction() {
  var args = engines.myEngine().execArgv;
  // log(args);
  var parent = args.parent;
  events.on("exit", function () {
    log('exit event!')
    parent.go()
  });
}
// 把codeWhenExitFunction代码的函数体提取出来,去掉花括号
var codeWhenExit = codeWhenExitFunction.toString().replace(/function *?codeWhenExitFunction(.*?){/, '').replace(/}[\s\S]?$/, '')

function Task(name, scriptPaths) {
  // num是一个计数器
  var num = function () {
    var count = 0
    return function () {
      return count++;
    }
  }()
  this.num = num
  this.name = name
  // scripts是数组,存放脚本路径
  this.scriptPaths = scriptPaths
  // 先读取指定路径的脚本,添加退出事件的函数,就可以按照顺序调用下一个脚本了
  this.go = function () {
    var serialNumber = this.num()
    // log('serialNumber')
    // log(serialNumber)
    if (serialNumber >= this.scriptPaths.length) {
      log('脚本全部运行完毕')
      return;
    }
    var path = this.scriptPaths[serialNumber]
    // log('path')
    // log(path)
    var scriptContent = files.read(path)
    var newScript = scriptContent + ';' + codeWhenExit
    // log(newScript)
    engines.execScript(path, newScript, {
      arguments: {
        parent: this
      }
    })
  }
}
var myTask = new Task('myTask', ['./1.js', './2.js', './3.js'])
// log(myTask)
myTask.go()
