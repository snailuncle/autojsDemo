/**
 * 遍地红包自动收红包脚本,没有处理网络不好的情况.
 * 脚本运行,每半小时收取一次红包.
 * 该脚本纯后台运行,脱机脚本
 * QQ群:823217748
 */

var uid = ""; //个人中心用户名下面的那串数字
var cookie = ""; //需要自己抓包获得
var auth = ""; //需要自己抓包获得

while(true) {
    var TimeStamp = Math.round(new Date());
    var locPoint = http.post("http://loc.map.baidu.com/sdk.php", {
        "trtm" : TimeStamp,
        "bloc" : "hU2XyZmfmszBwZYHXN03oMafAq-yF5KJfZTeim4XW2z09tnM8Joj_VofBtkCpkFBkJ373V7dUsMgu89sKM-AX16CnIYNBdWAtxKwPAOEFgcWKM6h2cFdynWFIqWUI4xEP50WkFsG9TZ3xv6y6PC6kLoYRiXx8UW7VbXGYpp0vO6fDkwjKA8BpUEiYK8vpbTTNBpy0Sq3R1VLJ2hJwMqAsfJZz8QaQDtP1GTk4JWpPb91yT1KxKWfG2qcAiPQy4umWkJgfvCNwfrXGDNwLdugdRnW1OHeObHy-vSUJWpujiWp-KTTCIWp-pd7eAu-hacvsauKjR-6wdb6ZtUzwxLeeBDu4d_gm2ExGnPfdSJjoQ4RuhSl0RnsQd-8bINiVbFeoh-XH_7XDpytu__7DAtL20FH-f7DlMciUXAZexBSy6riI3PPrRRJb_zSolKCjizK3eF9Py7OmZRiR-zKhf..|tp=4"
    });
    var point = locPoint.body.json().content.point;
    
    var redbagList = http.post("http://bdhb.shuangpinkeji.com/api/m1/redbag/redbag-list", {
        'longitude':point.x,
        'latitude':point.y,
        'uid':uid,
    }, postHeader());
    var jsonInfo = redbagList.body.json();
    var list = jsonInfo.data.list;
    // log(list);
    // log(list.length);
    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            var redid = jsonInfo.data.list[i].id;
            var long = jsonInfo.data.list[i].longitude;
            var lat = jsonInfo.data.list[i].latitude;
        
            var click = http.post("http://bdhb.shuangpinkeji.com/api/m1/redbag/click", {
                'type':'2',
                'longitude':long,
                'latitude':lat,
                'id':redid,
                'uid':uid,
            }, postHeader());
            var json = click.body.json();
            //log(json);
            var id = json.data.id;
            var sign = json.data.sign;
        
            var sysReceive = http.post("http://bdhb.shuangpinkeji.com/api/m1/redbag/sys-receive", {
                'uid':uid,
                'sign':sign,
                'id':id,
                'type':'2',
            }, postHeader());
            var res = sysReceive.body.json();
            var money = res.data.user_money;
            log(money);
            sleep(1000);
        }
    } 
    log("当前无红包,30分钟后继续...");
    sleep(31*60*1000);
}


function postHeader() {
    var release = device.release;
    var model = device.model;
    var build = device.buildId;
    var header = {
        headers: {
            'Host':'bdhb.shuangpinkeji.com',
            'Content-Length':'65',
            'Accept':'*/*',
            'Origin':'file://',
            'X-Requested-With':'XMLHttpRequest',
            'Authorization':auth,
            'User-Agent':'Mozilla/5.0 (Linux; Android '+release+'; '+model+' Build/'+build+'; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36 Html5Plus/1.0',
            'Content-Type':'application/x-www-form-urlencoded',
            'Cookie':cookie,
        }
    }
    return header;
}