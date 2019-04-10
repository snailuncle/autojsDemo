/**
 * 链派自动回收海盗船金币
 * 本脚本需要专用的 链派apk包  安装包在群里
 * QQ群:823217748
 */
var ra = new RootAutomator();
var pref = android.preference.PreferenceManager.getDefaultSharedPreferences(context);
pref.edit().putBoolean("key_enable_accessibility_service_by_root", true).commit();

//华为解锁 只适用于华为手机 密码解锁方式
if (device.brand == "HUAWEI") {
    if (!device.isScreenOn()) {
        UnlockScreen("0220"); //修改为自己的解锁密码
    }
}
//自己抓
var userId = "";
var cookie = "";

var getMd5 = http.get('https://script.iqqclub.com/md5.js');
eval(getMd5.body.string());

launchApp("链派");
waitForActivity("com.xi6666.lpsq.ui.main.MainActivity");
id("tv_module_name").text("航海").waitFor();
sleep(200);
while(!click("航海"));
className("Button").waitFor();
// app.startActivity({
//     packageName: "com.xi6666.lpsq",
//     className: "com.xi6666.lpsq.ui.web.Html5Activity",
//     extras: {
//         url:'http://newpai.xiaoxi6.com//lianpai/navigation/index?_ver=2.1.0&_dtype=Android&_t='+TimeStamp+'&_utoken='+utoken+'&user_id='+userId,
//     }
// });

// while (true) {
    var Info = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/button_list.html", {
        "user_id" : userId,
    }, getHeaders());
    
    var infoHeader = Info.headers;
    var fleetListArry = Info.body.json().fleet_list;
    for (let i = 0; i < fleetListArry.length; i++) {
        var data = fleetListArry[i];
    
        /**
         * status: 2 3 4
         *      2: 未探险状态
         *      3: 出海探险中
         *      4: 探险归来,有收获
         */
        console.show();
        var status = data.status
        if (status == 2) {
            var outShip = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/out_ship.html", {
                "user_id" : userId,
                "ship_id" : shipId,
            }, getHeaders());
            log(outShip.body.json().msg);
            log(shipName + " 出海了");
            sleep(random(2000,3000));
        }
        if (status == 4) {
            var shipName = data.ship_name;
            var shipId = data.ship_id;
            // var getGold = data.get_gold_num;
            // var type = data.type;
            log(shipName + " 归来了");
            
            if (needShare(userId,shipId)) {
                var TimeStamp = Math.round(new Date() / 1000);
                var utoken = hex_md5(TimeStamp+device.serial);
                if (currentActivity() != "com.xi6666.lpsq.ui.web.Html5Activity") {
                    app.startActivity({
                        packageName: "com.xi6666.lpsq",
                        className: "com.xi6666.lpsq.ui.web.Html5Activity",
                        extras: {
                            url:'http://newpai.xiaoxi6.com//lianpai/navigation/index?_ver=2.1.0&_dtype=Android&_t='+TimeStamp+'&_utoken='+utoken+'&user_id='+userId,
                        }
                    });
                }
                className("Button").waitFor();
                sleep(500);
                className("Button").findOne().click();
                text("收取金币").waitFor();
                sleep(500);
                if (!text("收取金币").find().empty()) {
                    text("收取金币").find().get(i).click();
                }
                if (!desc("收取金币").find().empty()) {
                    desc("收取金币").find().get(i).click();
                }

                id("rl_share_qq").waitFor();
                sleep(500);
                id("rl_share_qq").findOne().click();
                text("发送到").waitFor();
                sleep(500);
                while(!click("我的电脑"));
                text("发送").waitFor();
                sleep(500);
                while(!click("发送"));
                text("返回链派").waitFor();
                sleep(500);
                while(!click("返回链派"));
                waitForActivity("com.xi6666.lpsq.ui.web.Html5Activity");
                sleep(1000);
                back();
            }
    
            while(needShare(userId,shipId)) { sleep(500); }
    
            var charge = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/charge.html", {
                "user_id" : userId,
                "ship_id" : shipId,
            }, getHeaders());
            var chargeJson = charge.body.json();
            if (chargeJson.success) {
                log(chargeJson.msg);
                //开始出海
                var outShip = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/out_ship.html", {
                    "user_id" : userId,
                    "ship_id" : shipId,
                }, getHeaders());
                log(outShip.body.json().msg);
                log(shipName + " 出海了");
                sleep(random(2000,3000));
            }
        }
    }
    // log("半小时后再次运行");
    // sleep(3000);
    console.hide();
    // console.clear();
    shell("am force-stop com.xi6666.lpsq", true);
    KeyCode("KEYCODE_POWER");
    ra.exit();
// }


function needShare(userId,shipId) {
    var updateShare = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/updateshare.html", {
        "user_id" : userId,
        "ship_id" : shipId,
    }, getHeaders());
    if (updateShare.body.json().msg == "无需分享") {
        return false;
    }
    return true;
}
function getHeaders() {
    var TimeStamp = Math.round(new Date() / 1000);
    var utoken = hex_md5(TimeStamp+device.serial);
    var release = device.release;
    var model = device.model;
    var build = device.buildId;
    var header = {
        headers : {
            'Host': 'newpai.xiaoxi6.com',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Origin': 'http://newpai.xiaoxi6.com',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Linux; Android '+release+'; '+model+' Build/'+build+'; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'http://newpai.xiaoxi6.com//lianpai/navigation/index?_ver=2.2.0&_dtype=Android&_t='+TimeStamp+'&_utoken='+utoken+'&user_id='+userId,
            'Accept-Language': 'zh-CN,en-US;q=0.9',
            'Cookie': cookie,
        }
    };
    return header;
}

function UnlockScreen(pass) {
    device.wakeUp();
    id('com.android.systemui:id/clock_text').waitFor();
    sleep(200);
    swipe(1024,888,555,666,200);
    text('输入密码').waitFor();
    sleep(200);
    var passwd = pass.split('');
    for (let i = 0; i < passwd.length; i++) {
        // sleep(150);
        while(!click(passwd[i]));
    }
}
function clearAll() {
    recents();
    id('recent_igmbutton_clear_all').waitFor();
    sleep(100);
    id('recent_igmbutton_clear_all').findOne().click();
    return;
}