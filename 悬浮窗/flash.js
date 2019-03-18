 //导入模块
 function 导入常用函数模块(){
  var url='https://raw.githubusercontent.com/snailuncle/autojsDemo/master/autojsCommonFunctions.js'
  var r = http.get(url)
  log("code = " + r.statusCode);
  var html=r.body.bytes()
  files.write('./autojsCommonFunctions.js','')
  files.writeBytes('./autojsCommonFunctions.js',html)
  var common=require('./autojsCommonFunctions.js')
  return common
}
var common=导入常用函数模块()
log(common)
for(let i=0;i<33;i++){
  common.闪光弹('fire in the hole')
}
