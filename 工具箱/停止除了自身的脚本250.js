脚本数组 = ['aaa', 'bbb', 'ccc']
脚本数组.map((file) => {
  engines.execScriptFile(files.cwd() + "/" + file + ".js")
})
end = () => {
  enginesAll = engines.all()
  log(enginesAll)
  enginesAll.map((ScriptEngine) => {
    if (engines.myEngine().toString() == ScriptEngine.toString()) {} else {
      console.log('即将停止的脚本引擎' + ScriptEngine)
      ScriptEngine.forceStop()
    }
  })
}
setTimeout(end, 5000)
