"ui";
importClass(android.webkit.WebViewClient);
importPackage(android.webkit);

ui.layout(
    <vertical graivity="center">
        <linear >
            <button text="后退" id="goback"/>
            <button text="前进" id="goforward"/>
            <button text="涮新" id="res"/>
        </linear>
        <webview id="webshow" />
    </vertical>
);

ui.goback.click(() => {
    ui.webshow.goBack();
})
ui.goforward.click(() => {
    ui.webshow.goForward();
})
ui.res.click(() => {
    ui.webshow.reload();
})

ui.webshow.getSettings().setJavaScriptEnabled(true);
ui.webshow.loadUrl("http://riki.cc/forum-1.htm");