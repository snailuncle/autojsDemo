Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};


app父目录='/sdcard/恢复出厂设置后要安装的app'
// app父目录是否存在()
apk信息=获取所有的apk信息()
log(apk信息)
// [ { appName: 'QQ',
//     'apk路径': '/sdcard/恢复出厂设置后要安装的app/QQ_7.8.8.apk' },
//   { appName: 'TC',
//     'apk路径': '/sdcard/恢复出厂设置后要安装的app/TC_7.6.1.23030.apk' },
//   { appName: 'Via',
//     'apk路径': '/sdcard/恢复出厂设置后要安装的app/Via_3.4.3.apk' },
//   { appName: 'Xposed Installer',
//     'apk路径': '/sdcard/恢复出厂设置后要安装的app/Xposed Installer_3.1.5.apk' },
//   { appName: '爱加速',
//     'apk路径': '/sdcard/恢复出厂设置后要安装的app/爱加速_1.0.2.apk' }]


var 所有app的名字=获取手机上所有的app名字()
log(所有app的名字)


var 手机上的app名字列表=所有app的名字
var 文件夹中的app名字列表=apk信息.map(t => t.appName);
log("文件夹中的app名字列表=",文件夹中的app名字列表)
手机上没有的app=对比一下要安装那些手机上没有的app(手机上的app名字列表,文件夹中的app名字列表)
log("手机上没有的app=",手机上没有的app)

安装app(手机上没有的app,apk信息)

function 安装app(手机上没有的app,apk信息){

  手机上没有的app.map(appName => {
    apk信息.map(apk => {
      if(apk.appName == appName){
        log("开始安装",appName)
        log("apk.apk路径=",apk.apk路径)
        静默安装app(apk.apk路径)
      }
    })

  })
}

function 静默安装app(apk路径){
  shell("pm install -r " + apk路径 , true)
}



function 对比一下要安装那些手机上没有的app(手机上的app名字列表,文件夹中的app名字列表){
  log("function 对比一下要安装那些手机上没有的app(手机上的app名字列表,文件夹中的app名字列表){")
  log("文件夹中的app名字列表=",文件夹中的app名字列表)


  var result=文件夹中的app名字列表.diff(手机上的app名字列表)
  return result
}


function 获取手机上所有的app名字(){
  var 所有的app名字=[]
  var pm=context.getPackageManager()
  let list=pm.getInstalledApplications(0)
  for(let i=0;i<list.size();i++){
    let p=list.get(i)
    var app={
      appName:p.loadLabel(pm),
      packageName:p.packageName
    }
    所有的app名字.push(app.appName)
  }
  return 所有的app名字
}




function 获取所有的apk信息(){

  //获取所有的apk路径列表
  var dir = app父目录
  var jsFiles = files.listDir(dir, function(name){
      return name.endsWith(".apk") && files.isFile(files.join(dir, name));
  });
  // log(jsFiles);
  apk路径列表=[]
  jsFiles.forEach(element => {
    // log(element)
    var apk路径=files.join(app父目录, element)
    var apk信息={
      appName:element.split("_")[0],
      apk路径:apk路径
    }

    apk路径列表.push(apk信息)
  });

  // apk路径列表.forEach(element => {
  //   log(element)
  // });
  if(apk路径列表<1){
    log('没有找到app','脚本停止')
    exit()
  }
  return apk路径列表
}



function app父目录是否存在(){
  app父目录是否存在结果=files.exists(app父目录)
  if(app父目录是否存在结果){
    log("app父目录是否存在结果=",app父目录是否存在)
  }else{
    log("app父目录是否存在结果=",app父目录是否存在)
    log('app父目录不存在,脚本停止')
    exit()
  }
}
