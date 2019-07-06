importClass(android.provider.ContactsContract);
importClass(android.content.DialogInterface);
importClass(android.content.ContentResolver);
importClass(android.database.Cursor);
importClass(android.provider.CallLog);
importClass(android.net.Uri);
importClass(android.Manifest);
importClass(android.content.ContentValues);

//因为本身aj并不支持通信记录权限
//只能打包后自行增加
//轮子地址
//https://blog.csdn.net/qq_27061049/article/details/88061653
//弦余制作(3446623843)

//权限申请
var permissionList = [Manifest.permission.READ_CALL_LOG, Manifest.permission.WRITE_CALL_LOG]
//url
var callUri = CallLog.Calls.CONTENT_URI;

var columns = [CallLog.Calls.CACHED_NAME // 通话记录的联系人
    , CallLog.Calls.NUMBER // 通话记录的电话号码
    , CallLog.Calls.DATE // 通话记录的日期
    , CallLog.Calls.DURATION // 通话时长
    , CallLog.Calls.TYPE
]; // 通话类型

var cursor = context.getContentResolver().query(callUri, // 查询通话记录的URI
    columns, null, null, CallLog.Calls.DEFAULT_SORT_ORDER // 按照时间逆序排列，最近打的最先显示
);

while (cursor.moveToNext()) {
var name = cursor.getString(cursor.getColumnIndex(CallLog.Calls.CACHED_NAME)); //姓名
var number = cursor.getString(cursor.getColumnIndex(CallLog.Calls.NUMBER)); //号码
var dateLong = cursor.getLong(cursor.getColumnIndex(CallLog.Calls.DATE)); //获取通话日期
var duration = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.DURATION)); //获取通话时长，值为多少秒
var type = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.TYPE)); //获取通话类型：
log(name+":"+number)
}