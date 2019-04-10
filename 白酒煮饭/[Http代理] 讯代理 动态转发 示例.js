/**
 * 使用时传入url和端口即可
 *      例如: httpProxy("forward.xdaili.cn", 80);
 *      此函数生效后,在此函数后的所有 Http 请求都会通过该代理去完成
 * @param {string} url 
 * @param {int} prot 
 */

function httpProxy(url,prot) {
    var Proxy =  java.net.Proxy;
    var InetSocketAddress = java.net.InetSocketAddress;
    var okhttp = new Packages.okhttp3.OkHttpClient.Builder().proxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress(url, prot)));
    http.__okhttp__.muteClient(okhttp);
}




/**
 * 以下是讯代理的 动态转发 请求示例
 * 讯代理官方网站: http://www.xdaili.cn?invitationCode=254F07B05E464EEF9C76FAA4E66D5503
 * 20元 10万次 请求
 */
var orderNo = ""; //动态转发的订单号
var secret = ""; //讯代理的secret,个人中心查看

var getMd5 = http.get('https://script.iqqclub.com/md5.js');
eval(getMd5.body.string());

httpProxy("forward.xdaili.cn", 80);

var html = http.get("http://www.diaoyu.com", getHeaders());
log(html.body.string());

function getHeaders() {
    var timestamp = Math.round(new Date() / 1000);
    var planText = "orderno="+orderNo+",secret="+secret+",timestamp="+timestamp;
    var sign = hex_md5(planText).toLocaleUpperCase(); //将拼接的字符串MD5后,转换成大写

    var header = {
        headers : {
            'Proxy-Authorization': 'sign='+sign+'&orderno='+orderNo+'&timestamp='+timestamp,
        }
    };
    return header;
}