"ui";
ui.layout(
    <ScrollView>
        <vertical>
            <button id="ok" text="开始获取"/>
            <button id="cl" text="清楚痕迹"/>
            <webview id="web" margin="10 10 10 10"/>
        </vertical>
    </ScrollView>
);
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var url = "https://qzone.qq.com";
ui.web.loadUrl(url);
var cookieManager = android.webkit.CookieManager.getInstance();
ui.web.getSettings().setJavaScriptEnabled(true);
var CookieStr = cookieManager.getCookie(url);
/*
cookieManager.removeAllCookie();
cookieManager.removeSessionCookie();



*/
ui.ok.click(function() {
    CookieStr = cookieManager.getCookie(url);
    var reg = (CookieStr + ";").replace(/(.*?)=(.*?);/g, '"$1":"$2",').replace(/ /g, "");
    var cookie = JSON.parse("{" + reg + "}");
    getHY(CookieStr, cookie.uin, cookie.skey);
    //cookieManager.removeAllCookie();
});

ui.cl.click(function() {
   cookieManager.removeAllCookie();
});
/**
 * 登入QQ空间，获取cookie，用api获取所有好友信息
 * @param skey
 * @return all
 */
function getHY(Cooki, qq, skey) {
    threads.start(function() {
        let s_skey = skey;
        let QQ = qq.slice(1);
        let G_tk = getGTK(skey);
        let getInfo = http.get("http://r.cnc.qzone.qq.com/cgi-bin/tfriend/friend_mngfrd_get.cgi?uin=" + QQ + "&rd=0.9840207901969242&g_tk=" + G_tk, {
            headers: {
                "Cookie": Cooki
            }
        });
        log(getInfo.body.string());
        toast("获取成功！");
    });
}
/**
 * 通过skey计算G_tk值
 * @param skey
 * @return G_tk
 */

function getGTK(skey) {
    var hash = 5381;
    for (var i = 0, len = skey.length; i < len; ++i) {
        hash += (hash << 5) + skey.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
}
