
var pm = context.getPackageManager()
var appList=pm.getInstalledApplications(0)
var appInfoList=[]
for(let i=0;i<appList.size();i++){
  var app=appList.get(i)
  var appInfo={
    appName:app.loadLabel(pm),
    packageName:app.packageName,
    isSystemApp:app.isSystemApp(),
    firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
  }
  appInfoList.push(appInfo)
}
appInfoList.sort((a,b)=>{
  return b.firstInstallTime-a.firstInstallTime
})
log('最新安装的app是=%j',appInfoList[0])
