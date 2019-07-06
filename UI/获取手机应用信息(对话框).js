// 需要Pro 7.0.3-4以上
requiresAutojsVersion(7000304);
//by:无名小姐 
//qq:1352183717
//代码不是很要紧啊  将就一下

importClass(android.graphics.Bitmap);
importClass(java.io.ByteArrayOutputStream);
importClass(android.util.Base64);
importClass(java.io.File);
importClass(android.icu.text.SimpleDateFormat);
importClass(java.util.HashSet);

let view1 = ui.inflate(
    <progressbar/>
    );
    
var dialog1 = dialogs.build({
    customView: view1,
    title: "加载中...",
    cancelable: false
}).show();

function scanLocalInstallAppList(packageManager) {
    var myAppInfos = new HashSet();
    var packageInfos = packageManager.getInstalledPackages(0);
    for (var i = 0; i < packageInfos.size(); i++) {
        var packageInfo = packageInfos.get(i);
        if (packageInfo.applicationInfo.loadIcon(packageManager) == null) {
            continue;
        }
        var bitmap = packageInfo.applicationInfo.loadIcon(packageManager).getBitmap();
        var baos = new ByteArrayOutputStream();
        //todo 压缩只对保存有效果bitmap还是原来的大小
        bitmap.compress(Bitmap.CompressFormat.JPEG, 30, baos);
        baos.flush();
        baos.close();
        // 转换为字节数组
        var byteArray = baos.toByteArray();
        // 转换为字符串
        var reslut = Base64.encodeToString(byteArray, Base64.NO_WRAP);

        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
        items.push({
            Icon: reslut,
            label: packageInfo.applicationInfo.loadLabel(packageManager),
            version: "版本号: " + packageInfo.versionName,
            pgName: packageInfo.packageName,
            firstInstall: "安装时间: " + dateFormat.format(appDate)
        });

    }
}

let view = ui.inflate(
    <frame>
        <list id="listView">
            <horizontal>
                <img marginRight="18" id="img" gravity="center" w="60" h="60" src="data:image/png;base64,{{this.Icon}}"/>
                <vertical gravity="center">
                    <text id="appName" textSize="18" text="{{this.label}}"/>
                    <text id="pkName" textSize="14" text="{{this.pgName}}"/>
                    <text id="vsName" textSize="10" text="{{this.version}}"/>
                    <text id="time" textSize="8" text="{{this.firstInstall}}"/>
                </vertical>
            </horizontal>
        </list>
    </frame>, null, false);

var items = [];

var storage = storages.create("app");

if (storage.get("items") == null) {
    scanLocalInstallAppList(context.getPackageManager());
    storage.put("items", items);
    view.listView.setDataSource(storage.get("items"));
    dialog1.dismiss();
} else {
    view.listView.setDataSource(storage.get("items"));
    dialog1.dismiss();
}


var imgID = context.getResources().getIdentifier("ic_android_black_48dp", "drawable", context.getPackageName());
var Drawabledrawable = context.getResources().getDrawable(imgID);
// 显示对话框
var dialog = dialogs.build({
    customView: view,
    icon: Drawabledrawable,
    title: "应用列表",
    positive: "更新列表",
    negative: "取消选择",
    cancelable: false,
    // view高度超过对话框时是否可滑动
    wrapInScrollView: true,
    // 按下按钮时是否自动结束对话框
    autoDismiss: true
}).on("positive", (dialog2) => {
    threads.start(function() {
        dialog1.show();
        scanLocalInstallAppList(context.getPackageManager());
        storage.put("items", items);
        view.listView.setDataSource(storage.get("items"));
        dialog1.dismiss();
        dialog.show();
    })
}).on("negative", (dialog) => {
    dialog.dismiss();
    exit();
}).show();