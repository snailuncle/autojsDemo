"ui";
ui.layout(
    <horizontal gravity="right">
        <list id="list" w="auto" h="auto" bg="#111111">
            <vertical w="*" h="auto" bg="#eeeeee" margin="10px" gravity="center">
                <text id="txt" w="auto" h="auto" textSize="20sp" padding="5px" gravity="center" text="{{txt}}"/>
                <text id="action" w="auto" h="auto" textSize="10sp" padding="5px" gravity="center" text="{{action}}"/>
            </vertical>
        </list>
    </horizontal>
    );
//    ACTION_APN_SETTINGS
//    ACTION_ACCESSIBILITY_SETTINGS   AIRPLANE_MODE_SETTINGS
var items=[
{action:"android.settings.ACCESSIBILITY_SETTINGS",txt:"无障碍"},
{action:"android.net.vpn.SETTINGS",txt:"vpn"},
{action:"android.settings.ACCESSIBILITY_SETTINGS",txt:"辅助功能"},
{action:"android.settings.ADD_ACCOUNT_SETTINGS",txt:"添加账户"},
{action:"android.settings.SETTINGS",txt:"系统设置首页"},
{action:"android.settings.APN_SETTINGS",txt:"APN设置"},
{action:"android.settings.APPLICATION_SETTINGS",txt:"应用管理"},
{action:"android.settings.BATTERY_SAVER_SETTINGS",txt:"节电助手 "},
{action:"android.settings.BLUETOOTH_SETTINGS",txt:"蓝牙 "},
{action:"android.settings.CAPTIONING_SETTINGS",txt:"字幕 "},
{action:"android.settings.CAST_SETTINGS",txt:"无线显示 "},
{action:"android.settings.DATA_ROAMING_SETTINGS",txt:"移动网络 "},
{action:"android.settings.DATE_SETTINGS",txt:"日期和时间设置"},
{action:"android.settings.DEVICE_INFO_SETTINGS",txt:"关于手机"},
{action:"android.settings.DISPLAY_SETTINGS",txt:"显示设置 "},
{action:"android.settings.DREAM_SETTINGS",txt:"互动屏保设置 "},
{action:"android.settings.HARD_KEYBOARD_SETTINGS",txt:"实体键盘 "},
{action:"android.settings.HOME_SETTINGS",txt:"应用权限,默认应用设置,特殊权限 "},
{action:"android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS",txt:"忽略电池优化设置 "},
{action:"android.settings.INPUT_METHOD_SETTINGS",txt:"可用虚拟键盘设置 "},
{action:"android.settings.INPUT_METHOD_SUBTYPE_SETTINGS",txt:"安卓键盘语言设置(AOSP) "},
{action:"android.settings.INTERNAL_STORAGE_SETTINGS",txt:"内存和存储 "},
{action:"android.settings.LOCALE_SETTINGS",txt:"语言偏好设置"},
{action:"android.settings.LOCATION_SOURCE_SETTINGS",txt:"定位服务设置 "},
{action:"android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS",txt:"所有应用"},
{action:"android.settings.MANAGE_APPLICATIONS_SETTINGS",txt:"应用管理 "},
{action:"android.settings.MANAGE_DEFAULT_APPS_SETTINGS",txt:"与ACTION_HOME_SETTINGS相同"},
{action:"android.settings.action.MANAGE_OVERLAY_PERMISSION",txt:"在其他应用上层显示,悬浮窗"},
{action:"android.settings.MANAGE_UNKNOWN_APP_SOURCES",txt:"安装未知应用 安卓8.0 "},
{action:"android.settings.action.MANAGE_WRITE_SETTINGS",txt:"可修改系统设置 权限 "},
{action:"android.settings.MEMORY_CARD_SETTINGS",txt:"内存与存储 "},
{action:"android.settings.NETWORK_OPERATOR_SETTINGS",txt:"可用网络选择"},
{action:"android.settings.NFCSHARING_SETTINGS",txt:"NFC设置 "},
{action:"android.settings.NFC_SETTINGS",txt:"网络中的 更多设置 "},
{action:"android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS",txt:"通知权限设置 "},
{action:"android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS",txt:"勿扰权限设置 "},
{action:"android.settings.ACTION_PRINT_SETTINGS",txt:"打印服务设置 "},
{action:"android.settings.PRIVACY_SETTINGS",txt:"备份和重置 "},
{action:"android.settings.SECURITY_SETTINGS",txt:"安全设置 "},
{action:"android.settings.SHOW_REGULATORY_INFO",txt:"监管信息"},
{action:"android.settings.SOUND_SETTINGS",txt:"声音设置 "},
{action:"android.settings.SYNC_SETTINGS",txt:"添加账户设置 "},
{action:"android.settings.USAGE_ACCESS_SETTINGS",txt:"有权查看使用情况的应用 "},
{action:"android.settings.USER_DICTIONARY_SETTINGS",txt:"个人词典 "},
{action:"android.settings.VOICE_INPUT_SETTINGS",txt:"辅助应用和语音输入 "},
{action:"android.settings.VPN_SETTINGS",txt:"VPN设置 "},
{action:"android.settings.VR_LISTENER_SETTINGS",txt:"VR助手 "},
{action:"android.settings.WEBVIEW_SETTINGS",txt:"选择webview "},
{action:"android.settings.WIFI_IP_SETTINGS",txt:"高级WLAN设置 "},
{action:"android.settings.WIFI_SETTINGS",txt:"选择WIFI,连接WIFI "}
];

ui.list.setDataSource(items);

ui.list.on("item_click", function( item, itemView){
    //toast( item.txt + "\n" + item.action);
    //toast(itemView);
try{
var intent = new Intent();
intent.setAction(item.action);
app.startActivity(intent);
}catch(e){toast("错误");}
});
