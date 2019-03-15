/**
 * 讯代理 优质代理 示例
 * 不支持多线程获取
 * 脚本中的订单 有效日期截止到: 2018-10-15 15:28 过期后将不可用
 * 讯代理官方网站: http://www.xdaili.cn?invitationCode=254F07B05E464EEF9C76FAA4E66D5503
 */

var spiderId = "7ab204de5b7e403caada6398f29c2831"; //spiderId
var orderNo = "YZ20188145457DGCJTP"; //订单号

var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
var InetIP = getIp_api.body.string();
eval(InetIP);
log("使用代理前的外网IP:"+returnCitySN.cip);

var xdailiUrl = "http://api.xdaili.cn/xdaili-api//greatRecharge/getGreatIp?spiderId="+spiderId+"&orderno="+orderNo+"&returnType=2&count=1";

for (let i = 0; i < 3; i++) {
    try {
        var getProxy_json = http.get(xdailiUrl).body.json();

        if (getProxy_json.ERRORCODE == "10036" || getProxy_json.ERRORCODE == "10038" || getProxy_json.ERRORCODE == "10055") {
            throw {
                "code" : "-1",
                "msg"  : "提取速度过快"
            }
        }
        if (getProxy_json.ERRORCODE == "10036") {
            throw {
                "code" : "-2",
                "msg"  : "提取次数已达上限"
            }
        }
        break;
    } catch (e) {
        if (e.code == "-1") {
            log(e.msg);
            sleep(5000);
        } 
        if (e.code == "-2") {
            log(e.msg);
            exit();
        }
        if (i == 2) { //运行3次后,没有拿到IP和断开 程序结束
            log("发生了未知错误,请检查网络...");
            exit();
        }
    }
}

// log(getProxy_json);
var xdaili_proxyIP = getProxy_json.RESULT[0].ip;
var xdaili_proxyPort = parseInt(getProxy_json.RESULT[0].port);
// log(xdaili_proxyIP+":"+xdaili_proxyPort);

httpProxy(xdaili_proxyIP, xdaili_proxyPort);

var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
var InetIP = getIp_api.body.string();
eval(InetIP);
log("使用代理后的外网IP:"+returnCitySN.cip);

function httpProxy(url,prot) {
    var Proxy =  java.net.Proxy;
    var InetSocketAddress = java.net.InetSocketAddress;
    var okhttp = new Packages.okhttp3.OkHttpClient.Builder().proxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress(url, prot)));
    http.__okhttp__.muteClient(okhttp);
}