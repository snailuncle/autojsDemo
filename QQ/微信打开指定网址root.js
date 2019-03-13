
var url='https://www.baidu.com'
var cmd="am start -n com.tencent.mm/com.tencent.mm.plugin.webview.ui.tools.WebViewUI -d "+url
log(cmd)
shell(cmd,true)
