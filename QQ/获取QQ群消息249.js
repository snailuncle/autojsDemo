auto();
if (currentPackage() != "com.tencent.mobileqq") { launchPackage("com.tencent.mobileqq"); sleep(500); }
var Frame = depth(0).className("FrameLayout").untilFind()[0];
try {
    var ListView = Frame.child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).children();
    //var ListView = id("listView1").depth(8).untilFind()[0].children();
    var MessageArr = [];
    ListView.forEach(function (child) {
        if (child.className() == "android.widget.RelativeLayout") {
            var ChildNum = child.childCount();
            if (child.child(ChildNum - 1).className() != "android.widget.ImageView") {
                //消息是别人发的
                var MessageInfo = 0;
            } else {
                //消息是自己发的
                var MessageInfo = 1;
            }
            var NickName = child.find(className("LinearLayout"))[0].child(0).text();
            var TextArr = child.child(ChildNum - 1 - MessageInfo);
            if (TextArr.className() == "android.widget.TextView") {
                var MessageText = TextArr.text();
            } else if (TextArr.child(0).className() == "android.widget.LinearLayout") {
                //回复或分享类型的消息
                //暂时没有来区分，可以靠正则检测textview里面有没有满足00:00时间格式的文本判断
                var MessageInfo = 2;
                //正则 提取昵称 去除表情乱码
                var ReplyName = TextArr.child(0).child(0).child(1).text().replace(/([^\s]+)\s.*/, "$1");
                var ReplyText = TextArr.child(0).child(0).child(2).text().replace(/¡/g, "");
                var ChildNum = TextArr.childCount();
                var MessageText = TextArr.child(ChildNum - 1).text();
            } else if (TextArr.className() == "android.widget.LinearLayout") {
                var MessageText = "[图片]";
                MessageText += TextArr.find(className("TextView"))[0].text();
            } else if (TextArr.child(0).className() == "android.widget.ImageView") {
                if (TextArr.find(className("LinearLayout"))[0]) {
                    var MessageText = "[视频]";
                } else {
                    var MessageText = "[图片]";
                }
            } else if (ChildNum >= 6) {
                if (TextArr.child(0).className() == "android.widget.RelativeLayout") {
                    var MessageText = "[表情包]";
                } else {
                    var MessageText = "[分享]";
                }
            } else {
                var ChildNum2 = TextArr.childCount();
                var MessageText = TextArr.child(ChildNum2 - 1).text();
            }
            if (MessageText == "群文件") { var MessageText = "[文件]" }
            if (MessageInfo == 2) {
                MessageArr.push([NickName, MessageText, MessageInfo, [ReplyName, ReplyText]]);
            } else {
                MessageArr.push([NickName, MessageText, MessageInfo]);
            }
        }
    });
    var LogStr = "";
    for (let i = 0; i < MessageArr.length; i++) {
        if (MessageArr[i][2] == 0) {
            LogStr += "\n";
            LogStr += MessageArr[i][0];
            LogStr += ": ";
            LogStr += MessageArr[i][1];
            //log(MessageArr[i][0], ": ", MessageArr[i][1]);
        } else if (MessageArr[i][2] == 1) {
            LogStr += "\n";
            LogStr += "你(";
            LogStr += MessageArr[i][0];
            LogStr += "): ";
            LogStr += MessageArr[i][1];
            //log("你(", MessageArr[i][0], "): ", MessageArr[i][1]);
        } else if (MessageArr[i][2] == 2) {
            LogStr += "\n";
            LogStr += MessageArr[i][0];
            LogStr += ": ";
            LogStr += MessageArr[i][1];
            LogStr += "\n";
            LogStr += "   ↳";
            LogStr += MessageArr[i][3][0];
            LogStr += ": ";
            LogStr += MessageArr[i][3][1];
            //log(MessageArr[i][0], ": ", MessageArr[i][1]);
            //log("  ↳回复", MessageArr[i][3][0], ": ", MessageArr[i][3][1]);
        }
    }
    toastLog(LogStr);
} catch (error) {
    var LogStr = "\n";
    LogStr += "获取出错，请确保当前为群聊天页面";
    LogStr += "\n\n";
    LogStr += error;
    toastLog(LogStr);
}