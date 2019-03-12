"ui";
dialogs.alert("该BDUSS获取器来源于网络,\n安全系数未知！ \n请谨慎使用,本人只是该获取器搬运工,不承担任何使用方面责任！\n获取器发布网站 彩虹工具网 \n网址:http://tool.cccyun.cc/")
dialogs.alert("若对该获取器的安全性存在怀疑,请自行百度BDUSS获取方式！")
ui.layout(
    <vertical bg="#ffffff">   
    <webview id="webview" w="*" h="*"/>
    </vertical>
    )

setInterval(()=>{}, 1000);

ui.webview.loadUrl("http://tool.cccyun.cc/tool/bduss/index.html");
