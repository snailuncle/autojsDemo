"ui";
ui.layout(
    <frame >
        <ScrollView>
    <vertical>
<img id="tu" w="360" h="360"/>
<text id="t" w="*" h="*" />
<button id="cz" h="*" w="*"  text="重置" />
</vertical>
</ScrollView>
    </frame>
);
importClass(android.graphics.Paint);
Canvas = android.graphics.Canvas;
importClass(android.graphics.Bitmap);

bitmap = Bitmap.createBitmap(720, 720, Bitmap.Config.ARGB_8888);
canvas = new Canvas(bitmap);
canvas.drawARGB(255, 0, 0, 0);
paint = new Paint();
paint.setTextSize(30);
paint.setARGB(255, 0, 255, 0); //
canvas.drawText("北", 345,30, paint);
canvas.drawText("西", 0,375, paint);
canvas.drawText("东", 690,375, paint);
canvas.drawText("南", 345,710, paint);
canvas.save(Canvas.ALL_SAVE_FLAG);
canvas.restore();
ui.tu.setImageBitmap(bitmap);

ljx=new Array();
ljy=new Array();


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

wz=null;
ui.cz.click(() => {
    if(wz!=null){
        cssj=new Date().getTime();
    cjd=wz.getLongitude();
cwd=wz.getLatitude();
chb=wz.getAltitude();}
    gx();
    });

locationListener=new LocationListener(){}

threads.start(function(){
  //console.show();
  while(wz==null){
      wz= getLocation();
  }
  cjd=wz.getLongitude();
cwd=wz.getLatitude();
chb=wz.getAltitude();
  cssj=new Date().getTime();
while(true){
    sleep(1000);

wz= getLocation();
gx();
    }
});

function gx(){
    jd=wz.getLongitude();
wd=wz.getLatitude();
hb=wz.getAltitude();
xlc=Distancex(cjd,cwd,jd,wd);
ylc=Distancey(cwd,wd);
lc=Distance(cjd,cwd,jd,wd);
        ui.run(function() {
            ui.t.text("卫星时间:" + wz.time + 
            "\n本地时间:" + (new Date().getTime()) +
             "\n经度:" + jd+
             "\n纬度:" + wd+
             "\n海拔"+hb+"m"+
             "\nx路程"+xlc+"m"+
             "\ny路程"+ylc+"m"+
             "\n算程"+Math.sqrt(xlc*xlc+ylc*ylc)+"m"+
             "\n路程"+lc+"m"+
             "\n速度"+lc/(new Date().getTime()-cssj)*3600+"km/h");
        });
        }
function getLocation(){
var mLocationManager =context.getSystemService(Context.LOCATION_SERVICE);
var criteria = new Criteria();
criteria.setAccuracy(Criteria.ACCURACY_FINE); //定位精度: 最高
 criteria.setAltitudeRequired(true); //海拔信息：不需要
 criteria.setBearingRequired(true); //方位信息: 不需要
 criteria.setCostAllowed(true);  //是否允许付费
 criteria.setPowerRequirement(Criteria.POWER_LOW); //耗电量: 低功耗
 
var provider =mLocationManager.getBestProvider(criteria, true); //获取GPS信息
//log(provider);
var location = mLocationManager.getLastKnownLocation(provider);
mLocationManager.requestLocationUpdates(provider, 1000, 5, locationListener);
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

function Distance(long1, lat1, long2, lat2) {

    var a, b, R;
    R = 6378137; // 地球半径
    lat1 = lat1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;
    a = (lat1 - lat2);
    b = (long1 - long2) * Math.PI / 180.0;
    var d;
    var sa2, sb2;
    sa2 = Math.sin(a / 2.0);
    sb2 = Math.sin(b / 2.0);
    d = 2 * R * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1) * Math.cos(lat2) * sb2 * sb2));

    return d;
}

function Distancex(long1, lat1, long2, lat2) {
    var a, b, R, c;
    R = 6378137; // 地球半径

    lat1 = lat1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;
    c = Math.cos((lat1 + lat2) / 2);
    b = (long1 - long2) * Math.PI / 180.0;
    var d;
    var sb2;
    sb2 = Math.sin(b / 2.0);
    d = 2 * R * Math.asin(Math.sqrt(c * c * sb2 * sb2));
    if (long2 > long1) {
        return d;
    } else {
        return -d;
    }
}

function Distancey(lat1, lat2) {
    var a, b, R, c;
    R = 6378137; // 地球半径
    a = (lat1 - lat2) * Math.PI / 180.0;
    var d;
    var sa2;
    sa2 = Math.sin(a / 2.0);
    d = 2 * R * Math.asin(Math.sqrt(sa2 * sa2));
    if (lat2 > lat1) {
        return d;
    } else {
        return -d;
    }
}
