//   加入下面的权限才能打电话或者pro版的Auto.js;网上的不论是java的代码还是shell的代码能直接打电话的只有它最好。
//<uses-permission android:name="android.permission.CALL_PHONE" />
app.startActivity({
  action:"CALL",
 data: "tel:10010"
   });


/*var intent1=app.intent({
 action:"intent.ACTION_CALL",
 data: "tel:10010"
  })
            app.startActivity(intent1);

*/
