"ui";
ui.layout(
    <vertical>
    <text w="*" h="200px" text="发送通知" textSize="100px" gravity="center"/>
    <button id="setTitle" text="设置标题"/>
    <button id="setIcon" text="设置图标"/>
    <button id="setContent" text="设置内容"/>
    <button id="setContentIntent" text="设置意图"/>
    <button id="setOngoing" text="设置可否被清除"/>
    <text w="*" h="100px"/>
    <button id="notify" text="发送通知(前面必须设置完毕)"/>
    <button id="delNotify" text="删除通知"/>
    </vertical>
)
//导入类
importClass("android.app.NotificationManager");
importClass("android.app.Notification");
importClass("android.app.PendingIntent");
importClass("android.content.res.Resources");

var intent = PendingIntent.getActivity(context, 0, app.intent({
    action: "android.intent.action.VIEW",
    data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=2190935120",
    packageName: "com.tencent.mobileqq",
}), 0);

var NO = new Notification.Builder(context);
var NM = context.getSystemService(context.NOTIFICATION_SERVICE);
var notify_id = 1123;
var cancel = true;

ui.setTitle.click(() => {
    NO.setContentTitle("Auto.JS更新至9.0");
});

ui.setIcon.click(() => {
    //设置通知图标
    var ic = ['ic_3d_rotation_black_48dp', 'ic_accessibility_black_48dp', 'ic_accessible_black_48dp', 'ic_account_balance_black_48dp', 'ic_account_balance_wallet_black_48dp', 'ic_account_box_black_48dp'];
    var i = random(0, ic.length);
    var icon = getResourceID(ic[i], "drawable");
    NO.setSmallIcon(icon);
});

ui.setContent.click(() => {
    NO.setContentText("其实更新是假的啦~");
});

ui.setContentIntent.click(() => {
    NO.setContentIntent(intent);
});


ui.notify.click(() => {
    //var icon_autojs = getResourceID("autojs_material", "drawable");
    //Notify("Auto.JS有新版啦~", "更新若干BUG", icon_autojs, );
    try {
        NM.notify(notify_id, NO.build())
    } catch (e) {
        toastLog("错误: " + e)
    };
});

ui.setOngoing.click(() => {
    try {
        cancel = !cancel
        //设置通知可否被清除
        NO.setOngoing(!cancel);
    } catch (e) {
        toastLog("错误: " + e)
    };
});

ui.delNotify.click(() => {
    try {
        NM.cancel(notify_id);
    } catch (e) {
        toastLog("错误: " + e)
    };
});

function getResourceID(name, defType) {
    //获取资源文件ID
    //参数
    //defType 类名 如drawable id string等
    //name 资源名
    var resource = context.getResources();
    return resource.getIdentifier(name, defType, context.getPackageName());
};