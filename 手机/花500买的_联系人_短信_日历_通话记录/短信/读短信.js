importClass(android.net.Uri);

//轮子地址
//https://blog.csdn.net/adminlxb89/article/details/81068419


var SMS_INBOX = Uri.parse("content://sms/");
var cr = context.getApplicationContext().getContentResolver();
var projection = ["_id", "address", "person", "body", "date", "type"]
var cur = cr.query(SMS_INBOX, projection, null, null, "date desc");

while (cur.moveToNext()) {
    var number = cur.getString(cur.getColumnIndex("address")); //手机号
    var body = cur.getString(cur.getColumnIndex("body")); //短信内容
    log(number + ":" + body)
}