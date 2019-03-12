auto();
//qq群
var qun = ["823217748","182391644","730428861","598183532","87272821"];
for (let i = 0; i < qun.length; i++) {
    var c = base64("https://qun.qq.com/qqweb/m/qun/checkin/index.html?gc="+ qun[i] + "&state=1");
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://forward/url?url_prefix=" + c + "&version=1&src_type=web"
    });
    text("发表").waitFor();
    while(!click("发表"));
    sleep(500);
}
function base64(str){
 return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(),2));
}
