wifi = context .getSystemService("wifi");
info = wifi.getConnectionInfo();
log(info.getMacAddress());



var MAC_ADDR = shell("ifconfig |grep 'wlan0'");

log(MAC_ADDR);


importClass(android.net.wifi.WifiManager);
importClass(android.net.wifi.WifiInfo);
function getMac(context){
    var wifi = context.getSystemService(context.WIFI_SERVICE);  
    var info = wifi.getConnectionInfo();  
    return info.getMacAddress();
}
log(getMac(context))
   