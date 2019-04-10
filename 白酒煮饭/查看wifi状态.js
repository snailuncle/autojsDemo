importPackage(android.content);
let wifiManager = context.getSystemService(Context.WIFI_SERVICE);
getCurrentWifiStateState(wifiManager)
function getCurrentWifiStateState(wifiManager) {
    if (wifiManager.isWifiEnabled()){
      alert('打开状态')
    }else{
      alert('关闭状态')
    }
}
