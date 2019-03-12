importClass(android.net.Uri);
console.show();
SMS_INBOX = Uri.parse("content://sms/");
短信=getSmsFromPhone();
for(i in 短信){
log(短信[i]);
}
function getSmsFromPhone() {
 var cr = context.getContentResolver();
 var projection = [
    "_id",
    "address",
    "person",
    "body",
    "date",
    "type"
  ];
  var cur = cr.query(SMS_INBOX, projection, null, null, "date desc");//此处报错是因为系统没允许autojs读取短信            
  if (null == cur) {
    log("************cur == null");
    return;
  }
    var i=0;
    var sms=[];
    
  while (cur.moveToNext()) {
    sms[i]={
    number:cur.getString(cur.getColumnIndex("address")),
    name:cur.getString(cur.getColumnIndex("person")),
    body:cur.getString(cur.getColumnIndex("body")),
    }
    i++;
    //至此就获得了短信的相关的内容, 以下是把短信加入map中，构建listview,非必要。
  }
    return sms;
}