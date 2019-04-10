importClass(android.net.ConnectivityManager);
var cm=context.getSystemService(context.CONNECTIVITY_SERVICE);
var net=cm.getActiveNetworkInfo();
log(net);
if(net==null||!net.isAvailable()){
    toastLog("网络连接不可用!");
}else{
    toastLog("网络连接可用!");
}