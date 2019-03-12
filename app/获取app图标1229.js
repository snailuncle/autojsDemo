importClass(java.io.File);
importClass(java.io.FileOutputStream);
importClass(android.graphics.Bitmap);
pm = context.getPackageManager();
importClass(android.util.DisplayMetrics)
var name = rawInput("请输入你想要获取的应用图标的应用名", "QQ");
packageName = app.getPackageName(name);
appInfo = pm.getApplicationInfo(packageName, 0);
bmp = appInfo.loadIcon(pm).getBitmap();
files.create("/sdcard/"+name+".jpg");
f = new File("/sdcard/"+name+"qq.jpg");
fOut = new FileOutputStream(f);
bmp.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
fOut.flush();
fOut.close();
app.viewFile("sdcard/"+name+".jpg")