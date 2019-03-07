/**
 * autojs版本要求4.0.3 Alpha7
 * 最新版autojs4.1.1 FileProvider报错
 * 作者: 家
 * qq:   203118908
 * 功能:  用qq分享指定app
 */
var appName = 'QQ'
shareApp(appName)

function shareApp(appName) {
  var packageName = getPackageName(appName);
  var pm = context.getPackageManager()
  var appList = pm.getInstalledApplications(0)
  var packageInfo = pm.getPackageInfo(packageName, 0)
  var apkFile = new java.io.File(packageInfo.applicationInfo.sourceDir)
  log(apkFile)
  // /data/app/com.tinkerstuff.pasteasy.v2-2/base.apk
  var fileSize = apkFile.length()
  log(fileSize)
  // 5051628
  share(apkFile)

  function share(apkFile) {
    importClass(android.content.Intent)
    importClass(android.net.Uri)
    importClass(android.content.ComponentName);
    var intent = new Intent();
    // 下面这三行是分享到微信
    // var comp = new ComponentName("com.tencent.mm",
    // "com.tencent.mm.ui.tools.ShareImgUI");
    // intent.setComponent(comp);
    intent.setAction(Intent.ACTION_SEND);
    // 这个是分享到QQ
    intent.setPackage("com.tencent.mobileqq");
    intent.setType("*/*");
    outputFileUri = android.support.v4.content.FileProvider.getUriForFile(context, "org.autojs.autojs.fileprovider", apkFile);
    intent.putExtra(Intent.EXTRA_STREAM, outputFileUri);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    context.startActivity(intent);
  }
}
