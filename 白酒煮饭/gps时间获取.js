console.show();
importClass(android.content.BroadcastReceiver);
importClass(android.content.Intent);
importClass(android.content.Context);
importClass(android.app.PendingIntent);
importClass(android.provider.Settings);
importClass(android.net.Uri);
importClass(android.content.IntentFilter);
importClass(android.location.LocationManager);
importClass(android.location.Location);
importClass(android.location.LocationListener);
importClass(android.location.Criteria);
if(!gpsIsOpen()){openGPS();}





locationListener=new LocationListener(){
 onLocationChanged(location){
  if(location!=null){
   log("维度:"+location.getLatitude()+"\n经度:"+location.getLongitude());
  }else{
   log("获取不到数据");
  }
 }
}


    
mLocation = getLocation();
console.clear();
//log(Object.keys(mLocation));
//log("位置信息："+mLocation);
log("gps时间:"+new Date(mLocation.time));
    




function getLocation(){
var mLocationManager =context.getSystemService(Context.LOCATION_SERVICE);
var criteria = new Criteria();
criteria.setAccuracy(Criteria.ACCURACY_FINE); //定位精度: 最高
 criteria.setAltitudeRequired(true); //海拔信息：不需要
 criteria.setBearingRequired(true); //方位信息: 不需要
 criteria.setCostAllowed(true);  //是否允许付费
 criteria.setPowerRequirement(Criteria.POWER_LOW); //耗电量: 低功耗
 
var provider =mLocationManager.getBestProvider(criteria, true); //获取GPS信息
log(provider);
var location = mLocationManager.getLastKnownLocation(provider);
mLocationManager.requestLocationUpdates(provider, 2000, 5, locationListener);
return location;
}



function openGPS(){
var settingsIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
settingsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
context.startActivity(settingsIntent);
}//打开gps






function gpsIsOpen(){
var alm=context.getSystemService(Context.LOCATION_SERVICE);     
var bRet=true;
 if(!alm.isProviderEnabled(LocationManager.GPS_PROVIDER))
 {
  bRet = false;
 }
return bRet;
}//判断gps是否打开
