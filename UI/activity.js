 am = context.getSystemService(context.ACTIVITY_SERVICE);
 cn = am.getRunningTasks(1).get(0).topActivity;
//  log("current", "pkg:" + cn.getPackageName());
//  log("currentclass", "cls:" + cn.getClassName());
 var mPackageManager = context.getPackageManager()
 // var appList=pm.getInstalledApplications(0)
 latestPackageStr=cn.getPackageName()
 latestClassStr=cn.getClassName()
 componentName = new android.content.ComponentName('org.autojs.autojs', 'org.autojs.autojs.ui.main.MainActivity_')
// mLatestActivity = mPackageManager.getActivityInfo(componentName, 0);
mLatestActivity = mPackageManager.getActivityInfo(componentName, 1);
log(mLatestActivity)
