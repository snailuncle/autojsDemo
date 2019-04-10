//需要用到root权限 否则打不开
var TimeStamp = Math.round(new Date());
var corpId = ""; //自己想办法获取公司的ID   ding开头的一串码
shell("am start -n com.alibaba.android.rimet/com.alibaba.lightapp.runtime.activity.CommonWebViewActivity"+
    " -a android.intent.action.VIEW"+
    " --es url 'https://attend.dingtalk.com/attend/index.html?swtrace=oa_cloud_attendance_onduty_remind&showmenu=false&_progress=false&_from=oa&corpId="+corpId+"&_biz=onDuty_remind'"+
    " --el navi_to_open_mini_app "+TimeStamp+
    " --es title '考勤打卡'", true);