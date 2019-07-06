
/*
作者： 弦鱼
*/
importClass(android.net.Uri);
importClass(android.content.ContentValues);
//轮子地址
//https://blog.csdn.net/shaohuawuxian/article/details/84487208

var values = new ContentValues();
    values.put("address", "1856680");
    values.put("type", "1");
    values.put("read", "0");
    values.put("body", "我收到一条短信");
    values.put("person", "test");
    context.getApplicationContext().getContentResolver().insert(Uri.parse("content://sms/inbox"), values);

这个短信 设置为未读  怎么才能想正常短信未读一样  在通知栏提醒一下？