importClass(android.provider.ContactsContract);
//自己照着轮子写的
//https://m.jb51.net/article/143106.htm

var cursor = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
while (cursor.moveToNext()) {
    //获取联系人姓名
    var displayName = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
    //获取联系人手机号
    var number = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
    //把取出的两类数据进行拼接
    log(displayName + ":" + number);
}