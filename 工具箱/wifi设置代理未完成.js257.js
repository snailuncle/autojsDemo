importPackage(java.lang);
importPackage(android.net.wifi);
importPackage(android.net);
importPackage(android.content);
importPackage(android.os);

let host = "127.0.0.1";
let port = 10086;
let wifiManager = context.getSystemService(Context.WIFI_SERVICE);
let config = getCurrentWifiConfiguration(wifiManager);
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    mInfo = ProxyInfo.buildDirectProxy(host, port);
}
let clazz = Class.forName("android.net.wifi.WifiConfiguration");
let parmars = Class.forName("android.net.ProxyInfo");
let method = clazz.getMethod("setHttpProxy", parmars);
toastLog(method);
toastLog(mInfo);
method.invoke(config, mInfo);
let mIpConfiguration = getDeclaredFieldObject(config, "mIpConfiguration");

setEnumField(mIpConfiguration, "STATIC", "proxySettings");
setDeclardFildObject(config, "mIpConfiguration", mIpConfiguration);
//save the settings
wifiManager.updateNetwork(config);
wifiManager.disconnect();
wifiManager.reconnect();


function getCurrentWifiConfiguration(wifiManager) {
    if (!wifiManager.isWifiEnabled())
        return null;
    let configurationList = wifiManager.getConfiguredNetworks();
    let configuration = null;
    let cur = wifiManager.getConnectionInfo().getNetworkId();
    // Log.d("当前wifi连接信息",wifiManager.getConnectionInfo().toString());
    for (let i = 0; i < configurationList.size(); ++i) {
        let wifiConfiguration = configurationList.get(i);
        if (wifiConfiguration.networkId == cur)
            configuration = wifiConfiguration;
    }
    return configuration;
}

function setEnumField(obj, value, name) {
    let f = obj.getClass().getField(name);
    f.set(obj, Enum.valueOf(f.getType(), value));
}

function getDeclaredFieldObject(obj, name) {
    let f = obj.getClass().getDeclaredField(name);
    f.setAccessible(true);
    return out = f.get(obj);

}

function setDeclardFildObject(obj, name, object) {
    let f = null;
    try {
        f = obj.getClass().getDeclaredField(name);
    } catch (e) {
        console.error(e);
    }
    f.setAccessible(true);
    try {
        f.set(obj, object);
    } catch (e) {
        console.error(e);
    }
}