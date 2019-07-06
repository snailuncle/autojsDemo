importClass(android.Manifest);
importClass(java.lang.System);
importClass(android.provider.CallLog);
importClass(android.content.ContentValues);

var permissionList = [Manifest.permission.READ_CALL_LOG, Manifest.permission.WRITE_CALL_LOG]
/**
     * 插入一条通话记录
     * @param number 通话号码
     * @param duration 通话时长（响铃时长）以秒为单位 1分30秒则输入90 
     * @param type  通话类型  1呼入 2呼出 3未接
     * @param isNew 是否已查看    0已看1未看
    轮子地址
    https://blog.csdn.net/m940034240/article/details/77237301/
     */

var number = 1554563;
var duration = 99;
var type = 1;
var isNew = 1;
//因为字符串类型，所以需要toString()
var values = new ContentValues();
values.put(CallLog.Calls.NUMBER, number.toString());
values.put(CallLog.Calls.DATE, System.currentTimeMillis().toString());
values.put(CallLog.Calls.DURATION, duration.toString());
values.put(CallLog.Calls.TYPE, type.toString());
values.put(CallLog.Calls.NEW, isNew.toString());

context.getContentResolver().insert(CallLog.Calls.CONTENT_URI, values);