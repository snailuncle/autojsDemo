/**
 *Usedfor： Auto.js Pro
 *Author: Hyun Mai  QQ:2668649892
 *Features: 读取通讯录联系人
 *Tips: 请先允许读取通讯录权限
 */


importClass(android.database.Cursor);

var cursor = context.getContentResolver().query(android.provider.ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
while (cursor.moveToNext()) {
    //读取通讯录的姓名
    var name = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
    //读取通讯录的号码
    var number = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER));
    if (name != number) {
        log("[名字]：" + name + " [号码]：" + number);
    } else {
        log("[号码]：" + number);
    }
}
