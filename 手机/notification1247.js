"ui";
ui.layout(
    <vertical w="*" h="*" gravity="center" >
        <button id="notify" w="auto" h="auto" text="发送通知" textSize="22sp" padding="12dp" />
        <button id="cancel" w="auto" h="auto" text="去除通知" textSize="22sp" padding="12dp" />
    </vertical>
);
ui.notify.on("click", () => {
    var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
    var notification;
    if (device.sdkInt >= 26) {
        var channel = new android.app.NotificationChannel("channel_id", "channel_name", android.app.NotificationManager.IMPORTANCE_DEFAULT);
        channel.enableLights(true);
        channel.setLightColor(0xff0000);
        channel.setShowBadge(false);
        manager.createNotificationChannel(channel);
        notification = new android.app.Notification.Builder(context, "channel_id")
            .setContentTitle("通知栏标题"+new date())
            .setContentText("这是消息的内容")
            .setWhen(new Date().getTime())
            .setSmallIcon(org.autojs.autojs.R.drawable.autojs_material)
            .setTicker("这是状态栏显示的内容")
            .build();
    } else {
        notification = new android.app.Notification.Builder(context)
            .setContentTitle("通知栏标题")
            .setContentText("这是消息的内容")
            .setWhen(new Date().getTime())
            .setSmallIcon(org.autojs.autojs.R.drawable.autojs_material)
            .setTicker("这是状态栏显示的内容")
            .build();
    }
    manager.notify(1, notification);
});
ui.cancel.on("click", () => {
    var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
    manager.cancelAll();
    // manager.cancel(1);
});