function codeWhenExitFunction() {
  var args = engines.myEngine().execArgv;
  // log(args);
  var parent = args.parent;
  events.on("exit", function () {
    log('exit event!')
    parent.go()
  });
}
var codeWhenExit = codeWhenExitFunction.toString().replace(/function *?codeWhenExitFunction(.*?){/, '').replace(/}[\s\S]?$/, '')

function Task(name, scriptPaths) {
  var num = function () {
    var count = 0
    return function () {
      return count++;
    }
  }()
  this.num = num
  this.name = name
  this.scriptPaths = scriptPaths // scripts是数组,存放脚本路径
  this.go = function () {
    var serialNumber = this.num()
    // log('serialNumber')
    // log(serialNumber)
    if(serialNumber>=this.scriptPaths.length){
      log('脚本全部运行完毕')
      return ;
    }
    var path = this.scriptPaths[serialNumber]
    // log('path')
    // log(path)
    var scriptContent = files.read(path)
    var newScript = scriptContent + codeWhenExit
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
