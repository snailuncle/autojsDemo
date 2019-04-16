//初始化参数
var WIFI_SSID = '"HiWiFi_Mr.Yu"';
var IP = "192.168.10.12";

// importPackage(java.lang);
importPackage(android.net.wifi);
importPackage(android.content);
importClass(java.net.Socket);
importClass(java.net.InetSocketAddress);

importPackage(org.autojs.autojs.pluginclient);
importClass(org.autojs.autojs.tool.Observers);

var DPS = new DevPluginService();
var wifiManager = context.getSystemService(Context.WIFI_SERVICE);

while(true) {//循环判断当前wifi是否符合要求
    let wifiSSID = wifiManager.getConnectionInfo().getSSID();
    sleep(2000);
    if (wifiSSID == WIFI_SSID) {
        let ra = shell("ping -c 1 "+ IP).code;
        if (ra == 0) {
            while(true) { //循环检测端口是否开启
                try {
                    var socket = new Socket();
                    var socAddress = new InetSocketAddress(IP, 9317);
                    socket.connect(socAddress, 200);
                    socket.close();
                    //开始连接vscode
                    DPS.getInstance().connectToServer(IP).subscribe(Observers.emptyConsumer());
                    while(DPS.getInstance().isConnected()) {sleep(2000)}; //连接成功后无限延迟,直到断开
                    let ra = shell("ping -c 1 "+ IP).code;
                    if (ra != 0) {
                        break;
                    }
                } catch (e) {
                    log(e);
                    socket.close();
                    sleep(2000);
                }
            }
        }
    }
}
