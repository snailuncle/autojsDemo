intent = new Intent();
importClass(android.content.BroadcastReceiver);
importClass(android.content.ContextWrapper);
importClass(android.content.IntentFilter);
importClass(android.net.ConnectivityManager);
filter = new IntentFilter();
filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
new ContextWrapper(context).registerReceiver(a = new BroadcastReceiver({
    onReceive: function(context, intent) {
        action = intent.getAction();
        if (action.equals(ConnectivityManager.CONNECTIVITY_ACTION)) {
            mConnectivityManager = context.getSystemService(context.CONNECTIVITY_SERVICE);
            netInfo = mConnectivityManager.getActiveNetworkInfo();
            if (netInfo != null && netInfo.isAvailable()) {

                /////////////网络连接  
                name = netInfo.getTypeName();

                if (netInfo.getType() == ConnectivityManager.TYPE_WIFI) {
                    /////WiFi网络  
                    toastLog("WiFi网络");
                } else if (netInfo.getType() == ConnectivityManager.TYPE_ETHERNET) {
                    /////有线网络  
                    toastLog("有线网络");
                } else if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE) {
                    /////////3g网络  
                    toastLog("3g网络");
                }
            } else {
                ////////网络断开  
                toastLog("网络断开");
            }
        }

    }
}), filter);