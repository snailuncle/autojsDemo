"ui";
importClass(android.webkit.WebView);
importClass(android.webkit.WebChromeClient);
importClass(android.webkit.WebResourceResponse);
importClass(android.webkit.WebViewClient);

var url = "https://support.captcha.qq.com/cgi-bin/open_cap/test.pl";
//接入需替换此url

ui.layout(
    <linear>
        <button text="悬浮窗" id="h"/>
    </linear>);
ui.h.click(() => {
    threads.start(function(){
        var exturl=http.get(url).body.json().url;
        log(exturl)
        gg(exturl);
    });
});


function gg(stringExtra) {
    threads.start(function() {
        var window = floaty.window(
            <vertical id="container" gravity="center|center_horizontal">
                 <button id="text" color="#ff0000" text="验证窗口" textSize="16sp"/>
            </vertical>
        );

        var x = 0,
            y = 0;
        //记录按键被按下时的悬浮窗位置
        var windowX, windowY;
        //记录按键被按下的时间以便判断长按等动作
        var downTime;
        var is_wrap = false;

        window.text.setOnTouchListener(function(view, event) {
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    x = event.getRawX();
                    y = event.getRawY();
                    windowX = window.getX();
                    windowY = window.getY();
                    downTime = new Date().getTime();
                    return true;
                case event.ACTION_MOVE:
                    if (new Date().getTime() - downTime < 35) break;
                    //移动手指时调整悬浮窗位置
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                    if (Math.abs(event.getRawY() - y) > 15 || Math.abs(event.getRawX() - x) > 15) is_wrap = true;
                    //如果按下的时间超过0.6秒判断为长按，退出脚本
                    if ((new Date().getTime() - downTime > 800) && !is_wrap) {
                        window.close()
                    }
                    return true;
                case event.ACTION_UP:
                    //手指弹起时如果偏移很小则判断为点击
                    if (Math.abs(event.getRawY() - y) < 6 && Math.abs(event.getRawX() - x) < 6) {
                        if(window.text.getParent().getChildCount()==1)
                           ck();
                        else toast("只能有一个验证视窗");
                    }
                    is_wrap = false;
                    return true;
            }
            return true;
        });

        var ck = function() {
            var mWebView = new WebView(context);
            var settings = mWebView.getSettings();
            settings.setUserAgentString("android");
            settings.setJavaScriptEnabled(true);

            mWebView.loadDataWithBaseURL(null, getContent(stringExtra), "text/html", "UTF-8", null);
            var webCC = new JavaAdapter(WebChromeClient, {
                onJsPrompt: function(webView, str, str2, str3, jsPromptResult) {
                    if (str2.indexOf("state") != -1 && str2.indexOf("info") != -1) return false;

                    var jSONObject = JSON.parse(str2);
                    log(jSONObject.ticket);
                    toast("验证成功");
                    window.close();
                    mWebView.clearHistory();
                    mWebView.clearCache(true);
                    mWebView.freeMemory();
                    mWebView.removeAllViews();
                    mWebView.destroy();
                    return false;
                }
            });
            mWebView.setWebChromeClient(webCC);
            window.container.addView(mWebView);
        }

        function getContent(str) {
            var sContent1 = "<html><head lang=\"zh-CN\"><title>验证码</title><meta charset=\"UTF-8\"><meta name=\"renderer\" content=\"webkit\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"><meta name=\"format-detection\" content=\"address=no; email=no\"></head><body></body><script src=\"";
            var sContent3 = "\"></script><script type=\"text/javascript\">\nfunction CapCallBack(resultJson)\n{\n  prompt(JSON.stringify(resultJson));\n}\nvar CapArgs = {\n\"showHeader\":";
            var sContent5 = ",\n\"callback\": CapCallBack\n,\"readyCallback\":CapCallBack\n}\nwindow.onload=function(){capInit(document.body,CapArgs);}\n</script></html>";
            var append = sContent1 + str + sContent3 + "false,\n";
            append = append + "themeColor:'ff0000',type:'popup',fwidth:230"
            append = append + sContent5
            return append;
        }
    });
}
