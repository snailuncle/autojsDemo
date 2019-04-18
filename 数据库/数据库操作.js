//用于转换英汉字典数据库，作为demo

var dbf=context.openOrCreateDatabase("/sdcard/xyecdict/db/cedict", android.content.Context.MODE_PRIVATE, null);
var db = context.openOrCreateDatabase("/sdcard/xyecdict/db/cedict.db", android.content.Context.MODE_PRIVATE, null);
var FJConverter=require("./繁简转换/繁简转换");

//遍历出表名
var cursor = dbf.rawQuery("select name from sqlite_master where type='table' AND name NOT LIKE 'android_metadata' order by name", null);
log(cursor.getCount());

while(cursor.moveToNext()){
   var name = cursor.getString(0);
   log(name);
   db.execSQL("create table if not exists "+name+"(word,description)");
   var cursor2=dbf.query(name,null,null,null,null,null,null);
   while(cursor2.moveToNext()){
       var con=new android.content.ContentValues();
       con.put("word",FJConverter.F2J(cursor2.getString(0)));
       con.put("description",FJConverter.F2J(cursor2.getString(2)));
       db.insert(name,null,con);
       //不能防注入
       //db.execSQL("INSERT INTO "+name+" VALUES ('"+cursor2.getString(0)+"','"+cursor2.getString(2)+"')")
   }
}



/*
db.execSQL("create table if not exists user(_id ,username,password)");

var con=new android.content.ContentValues();
con.put("_id",java.lang.Integer(123));
con.put("username","java");
con.put("password",java.lang.Integer(456));
db.insert("user",null,con);

//遍历数据
var cursor1=db.query("user",null,null,null,null,null,null);
log(cursor1.getColumnNames())//获取列名数组
while(cursor1.moveToNext()){
   var name = cursor1.getString(1);
   log(name);
}
db.close();*/
