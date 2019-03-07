var it = new Intent(Intent.ACTION_INSERT, android.net.Uri.withAppendedPath(
  app.parseUri("content://com.android.contacts"), "contacts"))
  ;
it.setType("vnd.android.cursor.dir/person");

// 联系人姓名
it.putExtra(android.provider.ContactsContract.Intents.Insert.NAME, '陈真');

// 手机号码
it.putExtra(android.provider.ContactsContract.Intents.Insert.PHONE,
'13570334567');
// 单位电话
it.putExtra(
  android.provider.ContactsContract.Intents.Insert.SECONDARY_PHONE,
  '13570334567');
// 住宅电话
it.putExtra(
  android.provider.ContactsContract.Intents.Insert.TERTIARY_PHONE,
  '13570334567');

  app.startActivity(it);


  sleep(2000);
  var descbtn = desc('确定').findOne(2000);
  if(descbtn!=null)
  {
      toast('要保存 了');
      descbtn.click();
      sleep(1000);
      back();

  }
  else{
      toast('找不到确定按钮');
  }


