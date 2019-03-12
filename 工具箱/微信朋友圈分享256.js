//23333
importClass(android.content.ComponentName);
importClass(android.net.Uri);
intent = new Intent();
path = files.getSdcardPath() + "/haha.png";
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
var uri = android.support.v4.content.FileProvider.getUriForFile(context,
            "org.autojs.autojs.fileprovider", new java.io.File(files.path(path)));
  
comp = new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareToTimeLineUI");
intent.setComponent(comp);
intent.setAction("android.intent.action.SEND");
intent.setType("image/*");
//intent.putExtra(Intent.EXTRA_TEXT, "我是文字");
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
intent.putExtra(Intent.EXTRA_STREAM, uri);
context.startActivity(intent);