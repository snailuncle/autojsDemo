
var app名字='某某大全'
含有关键字的app=遍历app(app名字)
log('含有关键字的app=%s',JSON.stringify(含有关键字的app))


含有关键字的app.map((app)=>{
  if(app.名称==app名字){

  }else{
    var packageName=app.包名
    卸载app(packageName)

  }
})

alert(util.format('卸载完毕所有%s分身',app名字))


function 卸载app(packageName){
  if(是不是mx6){
    log('是魅族mx6')
    app.uninstall(packageName);
    var 卸载 = 找控件("卸载", "text('卸载').findOnce()")
    if (卸载) {
      log('发现卸载,弹框')
      点击(卸载)
      sleep(2000)
    } else {
      alert('没有发现卸载')
      exit()
    }

  }else{

    shell("pm uninstall "+packageName,true)
  }





}
function 是不是mx6(){
  var 手机唯一标识码=device.fingerprint
  var mx6='Meizu/meizu_MX6/MX6'
  if(手机唯一标识码.indexOf(mx6) != -1){
    return true
  }
  return false
}

function 遍历app(app关键字) {
  importClass(android.content.pm.PackageManager)
  var uc应用 = []
  var ucapp = {}
  pm = context.getPackageManager();
  var 有的 = pm.getInstalledPackages(PackageManager.GET_SHARED_LIBRARY_FILES)
  有的 = pm.getInstalledPackages(PackageManager.GET_META_DATA)
  有的 = 有的 + ""
  有的 = 有的.replace(/PackageInfo[^ ]+ /g, "")
  有的 = 有的.replace(/[\}|\[|\]| ]/g, "")
  有的 = 有的.split(",")
  for (let i of 有的) {
      var packageInfo = pm.getPackageInfo(i, 0);
      var appName = packageInfo.applicationInfo.loadLabel(context.getPackageManager()).toString()
      //appName = app.getAppName(i)
      if (appName.match(app关键字)) {
          // log(appName)
          // log("包名:" + i)
          ucapp = {
              "包名": i,
              "名称": appName
          }
          uc应用.push(ucapp) 
      }
  }
  return uc应用
}


function 点击(控件) {
  log(控件)
  var x = 控件.bounds().centerX()
  var y = 控件.bounds().centerY()
  log('将要点击的坐标 %s,%s', x, y)
  press(x, y, 1)
}

function 找控件(控件名称, 查找控件语句, 查找次数) {
  var 查找次数 = 查找次数 || 3
  for (let i = 0; i < 查找次数; i++) {
    var 控件 = eval(查找控件语句)
    if (控件) {
      log('发现了%s', 控件名称)
      return 控件
    }
    sleep(1000)
  }
  log('没有发现%s', 控件名称)
  return false
}
