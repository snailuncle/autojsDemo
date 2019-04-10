importClass(android.content.Intent);
importClass(android.net.Uri);

toWeChatScan2();

function toWeChatScan() {
    try {
        toast("正在打开微信扫一扫…");
        //利用Intent打开微信
        app.startActivity({
            "action": "VIEW",
            "packageName": "com.tencent.mm",
            "className": "com.tencent.mm.ui.LauncherUI",
            "extras": {
                "LauncherUI.From.Scaner.Shortcut": true
            }
        })
    } catch (e) {
        //若无法正常跳转，在此进行错误处理
        toast("无法跳转到微信，请检查您是否安装了微信！");
    }
};

function toAliPayScan() {
    try {
        toast("正在打开支付宝扫一扫…");
        //利用Intent打开支付宝
        //支付宝跳过开启动画打开扫码和付款码的url scheme分别是alipayqr://platformapi/startapp?saId=10000007和
        //alipayqr://platformapi/startapp?saId=20000056
        var uri = new Uri.parse("alipayqr://platformapi/startapp?saId=10000007");
        var intent = new Intent(Intent.ACTION_VIEW, uri);
        app.startActivity(intent);
    } catch (e) {
        //若无法正常跳转，在此进行错误处理
        toast("无法跳转到支付宝，请检查您是否安装了支付宝！");
    }
}