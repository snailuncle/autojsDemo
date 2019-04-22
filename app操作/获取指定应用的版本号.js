/**
* 获取指定应用的版本号
* @param {string} packageName 应用包名
*/
function getPackageVersion(packageName) {
  importPackage(android.content);
  var pckMan = context.getPackageManager();
  var packageInfo = pckMan.getPackageInfo(packageName, 0);
  return packageInfo.versionName;
}
