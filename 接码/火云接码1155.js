/**
 *火云接码可能写的可能写的不好见谅!
 *by Hyun Mai
 *QQ：2668649792
 **/


var number = ""; //平台账号
var password = ""; //平台密码

var project = "11165"; //接码项目ID
var Themroughly = "1"; //0为正常号段，1为虚拟号段，为空则随机


var hy_api = "http://huoyun888.cn/api/do.php?"; //接码API

var GetToken = http.get(hy_api + "action=loginIn&name=" + number + "&password=" + password).body.string().split("|");
if (GetToken[0] == 0) { //获取登入验证
    dialogs.alert("火云接码", GetToken[1]);
    exit();
} else {
    var token = GetToken[1];
}

while (true) {
    var GetPhone = http.get(hy_api + "action=getPhone&sid=" + project + "&vno=" + Themroughly + "&token=" + token).body.string().split("|");
    if (GetPhone[0] == 0) { //获取项目号码
        if (!dialogs.alert("火云接码", "没有获取到号码[加入对接]或者[更改号段]")) {
            exit();
        }
    } else {
        toastLog("【火云】获取到手机号:" + GetPhone[1]);
        var Number = GetPhone[1];
    }
    for (let i = 0; i < 20; i++) {
        var getMessage = http.get(hy_api + "action=getMessage&sid=" + project + "&phone=" + Number + "&token=" + token).body.string().split("|");
        if (getMessage[0] != 0) { //获取验证码
            toastLog("【火云】获取到验证码:" + getMessage[1]);
            break;
        }
        sleep(3000);
    } //如果一分钟没有获取到验证码就释放
    var cancelRecv = http.get(hy_api + "action=cancelRecv&sid=" + project + "&phone=" + Number + "&token=" + token).body.string().split("|");
    if (cancelRecv[0] == 0) { //释放号码
        dialogs.alert("An error occurred!", "释放：" + cancelRecv[1]);
        exit();
    } else {
        log("【火云】取码超时释放:" + cancelRecv[1]);
    }
    if (!dialogs.confirm("火云接码", "是否继续获取号码?"));
    exit();
}