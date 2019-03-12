

 //导入模块
 function 导入常用函数模块(){
  var url='https://raw.githubusercontent.com/snailuncle/autojsCommonFunctions/master/autojsCommonFunctions.js'
  var r = http.get(url)
  log("code = " + r.statusCode);
  var html=r.body.bytes()
  files.write('./autojsCommonFunctions.js','')
  files.writeBytes('./autojsCommonFunctions.js',html)
  var common=require('./autojsCommonFunctions.js')
  return common
}
var common=导入常用函数模块()



  // 注意:url尾部必须带后缀名,后缀名随意
  // 使用例子
  var url = "https://api2.bmob.cn/2/files/webViewClasses.dex"
  // var path = "/storage/emulated/0/pinyin4j.jar"
  var path = files.join(files.getSdcardPath(), "/classes.dex")
  log('path=', path)
  log(files.exists(path))
  // exit()

  appId='f39de735666d2718117defb5cc090ca3'
  restKey='200274dc0d52dcc191cefb8baff7a5f9'
  common.bmob上传文件(url, path, appId, restKey)
