auto();
console.show();

importClass('java.net.Inet4Address');
importClass('java.net.InetAddress');
importClass('java.net.NetworkInterface');
importClass('java.util.Enumeration');
importClass('java.net.Inet6Address');
//获取内网IP地址
var hostIp = null;
try{
    var nis = NetworkInterface.getNetworkInterfaces();
    var ia = null;
    while (nis.hasMoreElements()) {
        var ni = nis.nextElement();
        var ias = ni.getInetAddresses();
        while (ias.hasMoreElements()) {
            ia = ias.nextElement();
            if (ia instanceof Inet6Address) {
                continue;
            }
            var ip = ia.getHostAddress();
            if (!"127.0.0.1".equals(ip)) {
                hostIp = ia.getHostAddress();
                break;
            }
        }
    }
} catch (e) {
    log(e);
}
log(hostIp);

//获取外网ip地址
var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
var InetIP = getIp_api.body.string();
eval(InetIP);
log(returnCitySN.cip);
