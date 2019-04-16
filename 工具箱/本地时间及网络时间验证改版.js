/*
**脚本源码:白酒煮饭
**脚本改进:魚離ヤ吥開氺
**脚本作用:验证网络时间、本地时间以及是否超过设定日期
**测试人员:魚離ヤ吥開氺
**测试系统:安卓8.1
**测试版本:4.1.1 Alpha2
使用说明: //ntime为过期时间
格式示例: time_validation(20190325120000)
表示验证时间为2019年3月25日12点00分00秒
过期返回false,正常返回true
*/


var 验证时间 = time_validation(20191212121212)
if (验证时间) {
    for (let i = 1; i < 10; i++) {
        toastLog("我是主程序,已进行:" + i + "次");
        sleep(1000);
        }
    } else {
        toastLog("时间验证失败,结束脚本");
        sleep(1000);
        exit();
    }


    function time_validation(ntime) {
        //网络时间
        log("网络时间为:" + IntTime());
        //本地时间
        log("本地时间为:" + load_Time());
        let abs_time = Math.abs(IntTime() - load_Time());
        //网络和本地时间秒数差
        log("时间差值为:" + abs_time + "秒");
        if (abs_time < 10 && IntTime() < ntime) {
            log("正常");
            return true;
        } else {
            log("时间差过大");
            log("已过期或本地时间被修改");
            return false;
        }

    }


    function load_Time() {
        return new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    }

    function IntTime() {
        try {
            var recode_suning = http.get("http://quan.suning.com/getSysTime.do");
            var suningTime = recode_suning.body.json();
            return suningTime.sysTime1;
        } catch (e) {
            log("网络错误")
            return 0;
        }
    }
