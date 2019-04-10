while(true) {
    var userId = dialogs.input("输入你的邀请码", "");
    if(userId == null) {
        exit();
    }
    if (userId == "") {
        alert("请输入自己的邀请码");
    } else {
        break;
    }
}

var getMd5 = http.get('https://script.iqqclub.com/md5.js');
eval(getMd5.body.string());

var getPropListHtml = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/getproplist.html", {
    "user_id" : userId,
}, getHeaders());

var res_getPropListHtml = getPropListHtml.body.json();
var info = res_getPropListHtml.success;
if (info) {
    var propListArry = res_getPropListHtml.prop_list;
    if (propListArry.length == 0) {
        log("你还没有宝箱");
        exit();
    }
    log("宝箱数量:" + propListArry.length);
    var total_goldNum = 0;
    for (let i = 0; i < propListArry.length; i++) {
        var propId = propListArry[i].id;

        var getPropHtml = http.post("http://newpai.xiaoxi6.com/lianpai/navigation/get_prop.html", {
            "user_id": userId,
            "prop_id": propId,
        }, getHeaders());
        var res_getPropHtml = getPropHtml.body.json();
        var goldNum = res_getPropHtml.data.reward_num;
        log("ID: " + propId + " 的宝箱中有" + goldNum + "个金币");
        total_goldNum = Number(total_goldNum) + Number(goldNum);
    }
    log("金币总计: " + total_goldNum);
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
            // 'Cookie': 'PHPSESSID=6e0oiqngqi13csdoo6cp48l2g7',
        }
    };
    return header;
}