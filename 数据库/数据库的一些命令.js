
注:以下由不可不黑参考 沐泠 代码和参考网上代码拼凑而成。直接用sqldatabase类操作数据库。查询用query 没用那个我认为不行的rawQuery查询。删库删表建表代码已拼凑能用其余的自己研究sql语句测试。
上面的代码中基本上囊括了大部分的数据库操作；对于添加、更新和删除来说，我们都可以使用

importClass('android.database.sqlite.SQLiteDatabase');
importClass("android.content.ContentValues");
importClass("android.content.Context");
importClass("android.database.Cursor"); 

//打开或创建test.db数据库        
db  =  context.openOrCreateDatabase("test5.db",  Context.MODE_PRIVATE,  null);        

//创建person表
db.execSQL("create table if not exists " +  "person" + "(_id integer primary key autoincrement,name,age)");  

var person1 = new Object;        
person1.name  =  "jt2n2";          
person1.age  =  30;
//ContentValues以键值对的形式存放数据       
var  cv  =  new  ContentValues();          
cv.put("name", person1.name);          
cv.put("age",  java.lang.Integer(35));

 //插入ContentValues中的数据        
db.insert("person",  null,  cv);                 
//  查询  c 是 Cursor类
var c = db.query("person", null, "age<38", null, null, null, null, null);        
while  (c.moveToNext())  {              
    var  _id  = c.getInt(c.getColumnIndex("_id"));              
    var  name  = c.getString(c.getColumnIndex("name"));              
    var  age  = c.getInt(c.getColumnIndex("age"));             
    toastLog("数据库 _id="  +  _id  +  " name="  +  name +  " age="  + age);        
}   
                  
//删除表数据  ok
//db.delete("person", null,null);  

//ok. 删除表内容
// db.execSQL("DELETE FROM  person  WHERE age>32");

//关闭当前数据库      
db.close();   
              
//删除test.db数据库  ok
//context.deleteDatabase("test5.db");  
// context.deleteDatabase("test5.db"); 
/*在执行完上面的代码后，系统就会在/data/data/[PACKAGE_NAME]/databases目录下生成一个“test.db”的数据库文件，如图：

注:以上由不可不黑参考 沐泠 代码和参考网上代码拼凑而成。直接用sqldatabase类操作数据库。查询用query 没用那个我认为不行的rawQuery查询。删库删表建表代码已拼凑能用其余的自己研究sql语句测试。
上面的代码中基本上囊括了大部分的数据库操作；对于添加、更新和删除来说，我们都可以使用

db.executeSQL(String sql);  
db.executeSQL(String sql, Object[] bindArgs);//sql语句中使用占位符，然后第二个参数是实际的参数集  
除了统一的形式之外，他们还有各自的操作方法：
db.insert(String table, String nullColumnHack, ContentValues values);  
db.update(String table, Contentvalues values, String whereClause, String whereArgs);  
db.delete(String table, String whereClause, String whereArgs);  
以上三个方法的第一个参数都是表示要操作的表名；insert中的第二个参数表示如果插入的数据每一列都为空的话，需要指定此行中某一列的名称，系统将此列设置为NULL，不至于出现错误；insert中的第三个参数是ContentValues类型的变量，是键值对组成的Map，key代表列名，value代表该列要插入的值；update的第二个参数也很类似，只不过它是更新该字段key为最新的value值，第三个参数whereClause表示WHERE表达式，比如“age > ? and age < ?”等，最后的whereArgs参数是占位符的实际参数值；delete方法的参数也是一样。
下面来说说查询操作。查询操作相对于上面的几种操作要复杂些，因为我们经常要面对着各种各样的查询条件，所以系统也考虑到这种复杂性，为我们提供了较为丰富的查询形式：

db.rawQuery(String sql, String[] selectionArgs);  
db.query(String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy);  
db.query(String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit);  
db.query(String distinct, String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit);  
上面几种都是常用的查询方法，第一种最为简单，将所有的SQL语句都组织到一个字符串中，使用占位符代替实际参数，selectionArgs就是占位符实际参数集；下面的几种参数都很类似，columns表示要查询的列所有名称集，selection表示WHERE之后的条件语句，可以使用占位符，groupBy指定分组的列名，having指定分组条件，配合groupBy使用，orderBy指定排序的列名，limit指定分页参数，distinct可以指定“true”或“false”表示要不要过滤重复值。需要注意的是，selection、groupBy、having、orderBy、limit这几个参数中不包括“WHERE”、“GROUP BY”、“HAVING”、“ORDER BY”、“LIMIT”等SQL关键字。
最后，他们同时返回一个Cursor对象，代表数据集的游标，有点类似于JavaSE中的ResultSet。
下面是Cursor对象的常用方法：

c.move(int offset); //以当前位置为参考,移动到指定行  
c.moveToFirst();    //移动到第一行  
c.moveToLast();     //移动到最后一行  
c.moveToPosition(int position); //移动到指定行  
c.moveToPrevious(); //移动到前一行  
c.moveToNext();     //移动到下一行  
c.isFirst();        //是否指向第一条  
c.isLast();     //是否指向最后一条  
c.isBeforeFirst();  //是否指向第一条之前  
c.isAfterLast();    //是否指向最后一条之后  
c.isNull(int columnIndex);  //指定列是否为空(列基数为0)  
c.isClosed();       //游标是否已关闭  
c.getCount();       //总数据项数  
c.getPosition();    //返回当前游标所指向的行数  
c.getColumnIndex(String columnName);//返回某列名对应的列索引值  
c.getString(int columnIndex);   //返回当前行指定列的值  
在上面的代码示例中，已经用到了这几个常用方法中的一些，关于更多的信息，大家可以参考官方文档中的说明。

最后当我们完成了对数据库的操作后，记得调用SQLiteDatabase的close()方法释放数据库连接，否则容易出现SQLiteException。

上面就是SQLite的基本应用，但在实际开发中，为了能够更好的管理和维护数据库，我们会封装一个继承自SQLiteOpenHelper类的数据库操作类，然后以这个类为基础，再封装我们的业务逻辑方法。
