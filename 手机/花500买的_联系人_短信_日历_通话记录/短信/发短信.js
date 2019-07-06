importClass(android.net.Uri);
importClass(android.content.ContentValues);
//轮子地址
//https://blog.csdn.net/alittleforward/article/details/40949669


var values = new ContentValues();
values.put("address", "10010");
//1为收 2为发
values.put("type", "2");
//阅读状态，0未读1已读
values.put("read", "0");
values.put("body", "我发了一条短信");
values.put("person", "test");
context.getApplicationContext().getContentResolver().insert(Uri.parse("content://sms/inbox"), values);