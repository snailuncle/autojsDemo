// 需要root
function runScript(path){
  shell("am start -n org.autojs.autojs/org.autojs.autojs.external.open.RunIntentActivity -d file://" + path + " -t application/x-javascript",true)
}
path='/sdcard/脚本/2.js'
runScript(path)

function runScriptPro1(path) {
  shell("am start -n org.autojs.autojspro/org.autojs.autojs.external.open.RunIntentActivity -d file://" + path + " -t application/x-javascript", true)
}

function runScriptPro2(path) {
  shell("am start -n org.autojs.autojspro/org.autojs.autojs.external.open.RunIntentActivity -d file://" + path + " -t text/javascript", true)
}