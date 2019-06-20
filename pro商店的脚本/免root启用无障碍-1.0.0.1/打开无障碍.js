importClass(android.content.Context);
importClass(android.provider.Settings);
try {
    var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
    //log('当前已启用的辅助服务\n', enabledServices);
    /*
    附上几个我安装的应用的辅助功能服务
    AutoJsPro版 org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService
    AutoJS免费版 org.autojs.autojs/com.stardust.autojs.core.accessibility.AccessibilityService
    Nova桌面 com.teslacoilsw.launcher/com.teslacoilsw.launcher.NovaAccessibilityService
    
    注意每个服务之间要用英文冒号链接
    
    重要！
    建议把要用的所有辅助服务打开，然后通过上面那个log获取到已开启的服务，再把Services变量写死
    由于Android的一些bug，有时候实际没有开启的服务仍会出现在已启用的里面，所有没办法通过判断得知服务是否开启
    像当前这样子会导致已开启服务里面有很多重复项目，所有建议直接写死不再每次重新获取
    */
    var Services = enabledServices + ":org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService";
    Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
    Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
    toastLog("成功开启AutoJS的辅助服务");
} catch (error) {
    //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
    toastLog("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
    setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
}