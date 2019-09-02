/**
 * @author 家
 * @目的 多个脚本按照顺序执行
 * @param {Array} scriptNames 
 */
function Observer(scriptNames) {
  this.scriptNames = scriptNames || []
  this.currentScriptContent = null;
  this.addNotice = function (scriptName) {
    var scriptPath = files.join(files.getSdcardPath(), '脚本', scriptName + '.js')
    var scriptContent = files.read(scriptPath)
    var notice = ";(function () {  var args = engines.myEngine().execArgv;  var observer = args.observer;  events.on(\"exit\", function () {    log('exit event!');    observer.next();  });})();;"
    var tempScriptContent = scriptContent + notice
    this.currentScriptContent = tempScriptContent;
  }
  this.next = function () {
    if (scriptNames.length > 0) {
      var scriptName = this.scriptNames.shift()
      this.addNotice(scriptName)
      engines.execScript(scriptName, this.currentScriptContent, {
        arguments: {
          observer: this
        }
      })
    } else {
      return true
    }
  }
}


var scriptNames = ['1', '2', '3'];
(new Observer(scriptNames)).next();