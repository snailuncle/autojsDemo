/*
 * @Author: Dcr.Yu 
 * @Date: 2018-07-03 12:09:01 
 * @Last Modified by: Dcr.Yu
 * @Last Modified time: 2018-07-03 12:21:21
 * @Remarks: 脚本需要root权限,无root权限无法锁屏;
 *           脚本没有设置监听 绕X轴的变化,如果需要,可以自行添加;
 *           限制了在autojs界面时(4.0版本以上) 执行锁屏操作
 */

//初始化监听参数
var Y = 0;
var Z = 0;

//开始监听绕 Y轴 Z轴 的角度变化
sensors.register("orientation").on("change", (event, dx,dy,dz)=>{
    Y = parseInt(dy);
    Z = parseInt(dz);
});

//脚本主循环
while(true) {
    var oldTime = new Date();
    var Con_Y = Y;
    var Con_Z = Z;
    while(true) {
        var newTime = new Date();
        if (newTime - oldTime >= 30*1000) {
            while (true) {
                // log('超过30秒,屏幕亮着,未发生变化');
                if ((Y != Con_Y || Z != Con_Z) && device.isScreenOn()) {
                    // log('手机动了,开始锁屏!');
                    if (currentPackage() != 'org.autojs.autojs') {
                        KeyCode(26);
                    } else{
                        continue;
                    }
                    while (device.isScreenOn()) {
                        // log('屏幕亮着');
                        sleep(500);
                    }
                    break;
                }
            }
            break;
        } else if (Y != Con_Y || Z != Con_Z) {
            // log('30秒内发生变化,重新计时');
            break;
        }
    }

    while (!device.isScreenOn()) {
        // log('屏幕关闭');
        sleep(1000);
    }
}