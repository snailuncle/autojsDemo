
module.exports = {
    /**
     * 以root权限启动无障碍服务
     */
    enableAbSByRoot : function() {
        var pref = android.preference.PreferenceManager.getDefaultSharedPreferences(context);
        pref.edit().putBoolean("key_enable_accessibility_service_by_root", true).commit();
        return;
    },
    /**
     * 以root权限打开飞行模式
     */
    enableFlightMode : function() {
        shell("settings put global airplane_mode_on 1", true);
        shell("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true", true);
        return;
    },
    /**
     * 以root权限关闭飞行模式
     */
    disableFlightMode : function() {
        shell("settings put global airplane_mode_on 0", true);
        shell("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false", true);
        return;
    },
    /**
     * 以root权限打开wifi
     */
    enableWifi : function() {
        shell("svc wifi enable", true);
        return;
    },
    /**
     * 以root权限关闭wifi
     */
    disableWifi : function() {
        shell("svc wifi disable", true);
        return;
    },
    /**
     * 启动adbd服务
     * @param {string} port 设置adbd的端口号,参数为空则端口号为5555
     */
    enableAdbd : function(port) {
        if (port) {
            var adbPort = port;
            shell("setprop service.adb.tcp.port "+ adbPort);
        } else {
            var adbPort = "5555";
            shell("setprop service.adb.tcp.port "+ adbPort);
        }

        var res = shell("netstat -tunlp |grep ':::'"+adbPort);
        if (res.code == 0) {
            toastLog("adbd服务正在运行!");
            return true;
        } else {
            let info = shell("start adbd", true);
            if (info.code == 0) {
                toastLog("启动了adbd服务");
                return true;
            } else {
                toastLog('code='+info.code+'\nerror='+info.error);
                return false;
            }
        }
    },
    /**
     * 关闭adbd服务,服务未运行/服务正确关闭 返回true, 否则返回 false
     */
    disableAdbd : function() {
        var adbPort = shell("getprop service.adb.tcp.port").result;
        if (adbPort == "") {
            toastLog("adbd服务未运行!");
            return true;
        }
        var res = shell("netstat -tunlp |grep ':::'"+adbPort);
        if (res.code != 0) {
            toastLog("adbd服务未运行!");
            return true;
        } else {
            let info = shell("stop adbd", true);
            if (info.code == 0) {
                toastLog("关闭了adbd服务");
                return true;
            } else {
                toastLog('code='+info.code+'\nerror='+info.error);
                return false;
            }
        }
    },
    /**
     * 跳转到给QQ好友发送红包界面
     * @param {string} friendsaccount 好友的Q号码
     * @param {*} type 红包类型 1 为普通红包, 2 为口令红包
     */
    jumpRedPacketsbyQQFriends : function(friendsaccount, type) {
        friendsaccount = friendsaccount.toString();
        switch (type) {
            case 1: {
                app.startActivity({
                    packageName : "com.tencent.mobileqq",
                    className : "com.tencent.mobileqq.activity.qwallet.SendHbActivity",
                    extras : {
                        extra_data : '{"recv_type":1,"recv_uin":'+ friendsaccount +',"channel":1,"bus_type":"1"}',
                        app_info : "appid#1344242394|bargainor_id#1000030201|channel#aio",
                    },
                    root : true
                });
                break;
            }
            case 2: {
                app.startActivity({
                    packageName : "com.tencent.mobileqq",
                    className : "com.tencent.mobileqq.activity.qwallet.SendHbActivity",
                    extras : {
                        extra_data : '{"recv_type":1,"recv_uin":'+friendsaccount+',"channel":32,"bus_type":"2","extra_info":{"redgift_type":"3","redgift_subtype":"1"}}',
                        app_info : "appid#1344242394|bargainor_id#1000030201|channel#aio",
                    },
                    root : true
                });
                break;
            }
        }//switch结束
    },//jumpRedPacketsbyQQFriends函数结束
    /**
     * 跳转到已加入群的发红包界面
     * @param {string} groupNumber 已加入的QQ群号码
     * @param {*} type 红包类型 1 为普通红包 2 为拼手气红包 3 为口令红包
     */
    jumpRedPacketsbyQQGroup : function(groupNumber, type) {
        groupNumber = groupNumber.toString();
        switch (type) {
            case 1: {
                app.startActivity({
                    packageName : "com.tencent.mobileqq",
                    className : "com.tencent.mobileqq.activity.qwallet.SendHbActivity",
                    extras : {
                        extra_data : '{"recv_type":3,"recv_uin":'+QGroup+',"channel":1,"bus_type":"1","people_num":1000}',
                        app_info : "appid#1344242394|bargainor_id#1000030201|channel#aio",
                    },
                    root : true
                });
                break;
            }
            case 2: {
                app.startActivity({
                    packageName : "com.tencent.mobileqq",
                    className : "com.tencent.mobileqq.activity.qwallet.SendHbActivity",
                    extras : {
                        extra_data : '{"recv_type":3,"recv_uin":'+QGroup+',"channel":1,"bus_type":"2","people_num":1000}',
                        app_info : "appid#1344242394|bargainor_id#1000030201|channel#aio",
                    },
                    root : true
                });
                break;
            }
            case 3: {
                app.startActivity({
                    packageName : "com.tencent.mobileqq",
                    className : "com.tencent.mobileqq.activity.qwallet.SendHbActivity",
                    extras : {
                        extra_data : '{"recv_type":3,"recv_uin":"'+groupNumber+'","channel":32,"bus_type":"2","people_num":14,"extra_info":{"redgift_type":"3","redgift_subtype":"0"}}',
                        app_info : "appid#1344242394|bargainor_id#1000030201|channel#aio",
                    },
                    root : true
                });
                break;
            }
        }//switch结束
    },//jumpRedPacketsbyQQGroup函数结束
    /**
     * 使用微信打开任意url
     * @param {string} url http/https 开头的url地址
     */
    openUrlByWechat : function(url) {
        app.startActivity({
            packageName : "com.tencent.mm",
            className : "com.tencent.mm.plugin.webview.ui.tools.WebViewUI",
            extras : {
                rawUrl : url
            },
            root : true
        })
    },
    /**
     * 使用手机QQ打开任意url
     * @param {string} url http/https 开头的url地址
     */
    openUrlByQQ : function(url) {
        app.startActivity({
            packageName : "com.tencent.mobileqq",
            className : "com.tencent.mobileqq.activity.QQBrowserActivity",
            extras : {
                url : url,
            },
            root : true
        })
    }
}
