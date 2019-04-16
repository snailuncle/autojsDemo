importPackage(android.app);
importPackage(android.content);
importPackage(android.net);
importPackage(android.os);
importPackage(android.view);
//importClass(android.app.PendingIntent);
importClass(android.content.Intent);
importClass(android.telephony.SmsManager);
importClass(android.widget.EditText);
importClass(android.widget.Toast);

  //android.app.PendingIntent;
  //android.content.Intent;
//var tt= bb.getActivity(this,0,cc,0);
//var pendingIntent= PendingIntent.getActivity(this,0, new Intent(), 0);
//		PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, new Intent(), 0);

     //可以发信息了。一毛
       // smsManager.sendTextMessage(number.getText().toString(), null,
						//		   smsContent.getText().toString(), pendingIntent, null);
var smsManager = android.telephony.SmsManager.getDefault();

//var  smsManager=new  SmsManager();
smsManager.sendTextMessage("13620748245", null,
"wangyj ceshi",  null, null);
       // Toast.makeText(this, "SMS Send Finished.", Toast.LENGTH_LONG).show();
   