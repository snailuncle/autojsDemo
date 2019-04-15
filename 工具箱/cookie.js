
// 免费版
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var cookieManager = android.webkit.CookieManager.getInstance();

cookieManager.removeAllCookie();
cookieManager.removeSessionCookie();

// 专业版
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(web.webkitCookieJar))
var cookieManager = web.cookieManager;
cookieManager.removeAllCookie();
cookieManager.removeSessionCookie();
