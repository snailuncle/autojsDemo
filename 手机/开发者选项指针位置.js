// 此脚本可以切换开发者选项中的显示指针位置
// 感谢 @家 指点如何打开开发者选项

auto.waitFor();
app.startActivity({
    action: "android.intent.action.VIEW", //此处可为其他值
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$DevelopmentSettingsActivity"
    //此处可以加入其他内容，如data、extras
});
sleep(200);
while (!textContains("指针位置").exists()) {
    //sleep(50);
    scrollDown();
    sleep(100);
}
var zz = textContains("指针位置").findOne(5000);
if (zz) {
    a = click("指针位置");
    toastLog("指针位置切换成功：" + a);
    back();
}
