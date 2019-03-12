var pref = android.preference.PreferenceManager.getDefaultSharedPreferences(context);
pref.edit().putBoolean("key_enable_accessibility_service_by_root", true).commit();

//群号数组.每天有5次加分机会. 你可以设置5个群号.
var gcNumArry = [
    "823217748"
]
for (let i = 0; i < gcNumArry.length; i++) {
    shell("am start -n com.tencent.mobileqq/com.tencent.mobileqq.activity.QQBrowserActivity "+
    "--ei fling_action_key 2 "+
    "--es preAct SplashActivity "+
    "--es url 'https://qun.qq.com/qqweb/m/qun/checkin/index.html?gc="+ gcNumArry[i] +"&state=1&from=appstore_aio' "+
    "--el preAct_time " + Math.round(new Date()), true);
    text("发表").waitFor();
    sleep(500);
    while(!click("发表"));
    //如果感觉太快就取消注释下面两行
    //waitForActivity("com.tencent.mobileqq.activity.SplashActivity");
    //sleep(700);
}