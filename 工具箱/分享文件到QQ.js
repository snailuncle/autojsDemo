/**
 * 调用QQ分享,分享文件到QQ好友/群 相当于发送文件给QQ好友/群文件
 * @param {string} file 本机文件绝对路径
 */
function shareToTencent(file) {
    importPackage(android.content);

    importClass(android.net.Uri);
    importClass(java.io.File);
    importClass(android.provider.MediaStore);

    var f = new File(file);
    var uri = Uri.fromFile(f);
    // var fp = app.parseUri("content://com.estrongs.files"+file);
    var fp = app.parseUri(uri.toString());
    var intent = new Intent("android.intent.action.SEND");
    intent.setType("file/*");
    intent.putExtra(Intent.EXTRA_STREAM, uri);
    intent.setClipData(ClipData.newRawUri(MediaStore.EXTRA_OUTPUT, fp));
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.setComponent(new ComponentName("com.tencent.mobileqq", "com.tencent.mobileqq.activity.JumpActivity"));

    context.startActivity(intent);
}

shareToTencent("/sdcard/Pictures/Screenshots/SVID_20190826_011717.mp4");
