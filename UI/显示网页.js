"ui";

ui.layout(
    <vertical>
        <ScrollView>
            <vertical>
                <text textSize="16sp" margin="8">在界面加载一个网页</text>
                <webview id="webview" h="*" margin="0 16"/>
            </vertical>
        </ScrollView>
    </vertical>
)

ui.webview.loadUrl("http://baidu.com/");
