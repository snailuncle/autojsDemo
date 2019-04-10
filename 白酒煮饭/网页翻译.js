"ui";
ui.layout(
    <frame background="#ff555555">
        <ScrollView>
            <vertical align="top" margin="5">
                <linear>
                    <img h="20" w="20" id="op" marginLeft="10" layout_gravity="center|left" src="@drawable/ic_search_black_48dp" />
                    <input id="inpu"  bg="#80ffffff"  w="250"   textSize="14sp" hint="输入网址 例如:http://github.com" inputType="textUri" />
                    <button id="ok" text="翻译"  textSize="18sp" padding="5" layout_gravity="center|right"  h="30" w="50" style="Widget.AppCompat.Button.Borderless.Colored" />
                </linear>
                <webview w="359" h="800" size="6" id="web" margin="0 5 1 0"/>
            </vertical>
        </ScrollView>
    </frame>
);
var url = "https://www.microsofttranslator.com/bv.aspx?from=&to=zh-CHS&a=";
var t = "http://github.com";
ui.ok.click(() => {
    let tourl = ui.inpu.text();
    if (tourl.length > 1) {
        ui.web.loadUrl(url + tourl);
    } else {
        toast("您还没有输入网址呢");
    }
});
ui.op.click(() => {
    let tourl = ui.inpu.text();
    if (tourl.length > 1) {
        app.openUrl(url + tourl);
    } else {
        toast("输入网址后，点我可以用浏览器打开");
    }
});