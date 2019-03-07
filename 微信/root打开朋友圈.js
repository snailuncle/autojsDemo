//要root才能打开朋友圈
var activity = "com.tencent.mm/com.tencent.mm.plugin.sns.ui.SnsTimeLineUI"
shell("am start -n " + activity, true);
