"ui";
//importClass(android.view.View.OnClickListener);
importClass(java.lang.Runnable);
//importClass(android.os.Build);
//这是一个通过webView控件简单调用js网页代码的示例

ui.layout(
    <vertical>
        <webview id="webview"/>
        <button id="button"/>
    </vertical>
);
//importClass(android.webkit.JavascriptInterface);
//importClass(android.webkit.WebViewClient);
webView = ui.findById("webview");

button = ui.findById("button");
button.setText("确定");
button.setOnClickListener({
    onClick: function(v) {
        webView.post(new Runnable({
            run: function() {
                // 调用javascript的callJS()方法
                webView.loadUrl("javascript:callJS()");
            }
        }));
    }
});

html = files.path("./html.html");
webView.loadUrl("file://" + html);