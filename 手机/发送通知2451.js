"ui";
ui.layout(
    <frame>
    <vertical>
    <button id="notify" text="发送通知(必须先执行)"/>
    <button id="setIcon" text="随机改变图标"/>
    <button id="setTitle" text="改变标题"/>
    <button id="setContent" text="改变内容"/>
    <button id="setOngoing" text="设置可否被清除"/>
    <button id="delNotify" text="删除通知"/>
    </vertical>
    </frame>
)
//导入类
importClass("android.app.NotificationManager");
importClass("android.app.Notification");
importClass("android.content.res.Resources")
var NO = new Notification.Builder(context);
var NM = context.getSystemService(context.NOTIFICATION_SERVICE);
var notify_id = 1123;
var cancel = true;
ui.notify.click(() => {
    var icon_autojs = getResourceID("autojs_material", "drawable");
    Notify("Auto.JS有新版啦~", "更新若干BUG", icon_autojs, notify_id);
})
ui.setTitle.click(() => {
    setNotifyTitle(notify_id, "Auto.JS更新至9.0");
})
ui.setIcon.click(() => {
    setNotifyIco(notify_id);
})
ui.setContent.click(() => {
    setNotifyContent(notify_id, "其实更新是假的啦~");
})
ui.setOngoing.click(() => {
    cancel = !cancel
    setNotifyCancelable(notify_id, cancel);
})
ui.delNotify.click(()=>{
    deleteNotify(notify_id)
    })

function Notify(title, content, IcoID, ID) {
    //发送通知
    //参数分别为 标题 内容 图标ID 通知ID
    NO.setContentTitle(title);
    NO.setContentText(content);
    NO.setSmallIcon(IcoID);
    NM.notify(ID, NO.build())
}

function setNotifyTitle(ID, title) {
    //设置通知标题
    //参数 通知ID,标题
    NO.setContentTitle(title);
    NM.notify(ID, NO.build());
}

function setNotifyContent(ID, content) {
    //设置通知内容
    //参数 通知ID,内容
    NO.setContentText(content);
    NM.notify(ID, NO.build())
}

function setNotifyIco(ID) {
    //设置通知图标
    //参数 通知ID,图标资源ID
    //下面ID参考自 示例-界面控件-表格 截取部分
    var ic = ['ic_3d_rotation_black_48dp', 'ic_accessibility_black_48dp', 'ic_accessible_black_48dp', 'ic_account_balance_black_48dp', 'ic_account_balance_wallet_black_48dp', 'ic_account_box_black_48dp'];
    var i = random(0, ic.length);
    var icon = getResourceID(ic[i], "drawable");
    NO.setSmallIcon(icon);
    NM.notify(ID, NO.build())
}

function setNotifyCancelable(ID, cancelable) {
    //设置通知可否被清除
    //参数 通知ID,是否可清除
    NO.setOngoing(!cancelable);
    NM.notify(ID, NO.build());
}

function getResourceID(name, defType) {
    //获取资源文件ID
    //参数
    //defType 类名 如drawable id string等
    //name 资源名
    var resource = context.getResources();
    return resource.getIdentifier(name, defType, context.getPackageName());
}
function deleteNotify(ID){
    NM.cancel(ID);
    }