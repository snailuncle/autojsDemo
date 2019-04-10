"ui";
ui.statusBarColor("#ff555555");
ui.layout(
    <frame background="#ff555555">
<ScrollView>
<vertical align="top" margin="0">
<linear>
<text h="55" w="60"  text="标题:" color="#ffffffff"/>
<input id="abt" w="*" text="南城张某某贩卖autojs脚本被..." bg="#ffffff" h="45" hint="输入标题。"></input>
</linear>
<linear>
<text h="55" w="60"  text="内容:" color="#ffffffff"/>
<input id="anr" w="*" text="南城在校大学生张某某贩卖autojs脚本被刑拘，南城警方正在调查中....." bg="#ffffff" h="45" hint="输入内容。"></input>
</linear>
<linear>
<text h="55" w="60"  text="图标地址:" color="#ffffffff"/>
<input id="atp" w="*" text="http://img04.sogoucdn.com/app/a/100520146/d5f7cece76bfbf65c42ebe18b7fda989" bg="#ffffff" h="45" hint="输入网址。"></input>
</linear>
<linear>
<text h="55" w="60"  text="id:" color="#ffffffff"/>
<input id="aid" w="*" text="1104466627" bg="#ffffff" h="45" hint="输入网址。"></input>
</linear>
<linear>
<text h="55" w="60"  text="点开链接:" color="#ffffffff"/>
<input id="alj" w="*" text="http://img04.sogoucdn.com/app/a/100520146/d5f7cece76bfbf65c42ebe18b7fda989" bg="#ffffff" h="45" hint="输入网址。"></input>
</linear>
<button id="dj" text="发送"/>
</vertical>
</ScrollView>
</frame>
);
ui.dj.click(function() {
    threads.start(function() {
        si();
    });
});

function si() {
    t = "mqqapi://share/to_fri?file_type=news&src_type=web&version=1&share_id=" + ui.aid.text() + "&url=" + jm(ui.alj.text()) + "&previewimageUrl=&image_url=" + jm(ui.atp.text()) + "&title=" + jm(ui.abt.text()) + "&description=" + jm(ui.anr.text()) + "&callback_type=scheme&thirdAppDsplayName=ufcujgcuggiccikc&app_name=UVE&cflag=0&shareType=0"
    log(t);
    context.startActivity(android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(t)))
}

function jm(a) {
    h = java.lang.String(a).getBytes();
    h = android.util.Base64.encodeToString(h, android.util.Base64.DEFAULT);
    return h;
}