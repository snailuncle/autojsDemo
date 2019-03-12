var svc = context.getSystemService(context.NOTIFICATION_SERVICE);

function getLastEngine() {
	var m = engines.myEngine(),
		a = engines.all(),
		i;
	for (i in a) {
		if (String(a[i].getSource()) == String(m.getSource().getFile())) {
			if (a[i] != m) return a[i];
		}
	}
}

function showNotification(id, text) {
	var nof = new android.app.Notification.Builder(context);
	nof.setContentTitle(text);
	nof.setContentText("通知便签 - 点击查看详情");
	nof.setSmallIcon(com.stardust.scriptdroid.R.drawable.autojs_material);
	nof.setLargeIcon(android.graphics.BitmapFactory.decodeResource(context.getResources(), com.stardust.scriptdroid.R.drawable.autojs_material));
	var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.fromFile(engines.myEngine().getSource().getFile()));
	intent.setClassName("com.stardust.scriptdroid", "com.stardust.scriptdroid.external.open.RunIntentActivity");
	nof.setContentIntent(android.app.PendingIntent.getActivity(context, intent.hashCode(), intent, android.app.PendingIntent.FLAG_UPDATE_CURRENT));
	svc.notify(id, nof.build());
}

function editNote() {
	var sets = storages.create("nofnote");
	var newnote = dialogs.rawInput("编辑便签", sets.get("note", ""));
	if (newnote == null) return;
	if (newnote) {
		sets.put("note", newnote);
	} else {
		sets.remove("note");
	}
}

events.on("nofnote:update", function() {
	var sets = storages.create("nofnote");
	showNotification(299, sets.get("note", "无"));
});

var l = getLastEngine();
var sets = storages.create("nofnote");
if (l) {
	editNote();
	l.emit("nofnote:update");
} else {
	if (!sets.contains("note")) editNote();
	events.emit("nofnote:update");
	setInterval(function() {}, 1000);
}