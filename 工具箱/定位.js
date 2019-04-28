importClass(android.location.Criteria);
importClass(android.location.LocationListener);
importClass(android.location.LocationManager);
importClass(android.content.Context);
console.show();
//获取定位服务
var locationManager =context.getSystemService(Context.LOCATION_SERVICE);
//判断是否已经打开GPS模块
if(locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
　　//GPS模块打开，可以定位操作
    var criteria = new Criteria();
    criteria.setAccuracy(Criteria.ACCURACY_FINE);
    criteria.setAltitudeRequired(false);
    criteria.setBearingRequired(false);
    criteria.setCostAllowed(true);
    criteria.setPowerRequirement(Criteria.POWER_LOW);
    var provider = locationManager.getBestProvider(criteria, true);

    var location = locationManager.getLastKnownLocation(provider);
    log("经度："+location.getLongitude()+"\n纬度："+location.getLatitude())


    var gc = new android.location.Geocoder(context,java.util.Locale.getDefault());
    var result = gc.getFromLocation(location.getLatitude(),location.getLongitude(),1);
    log(result)

    locationManager.requestLocationUpdates(provider, 1000, 10, new LocationListener({
      onLocationChanged:
          function(location){
             log(location);
          }
    }));
    while(true)sleep(1000);
}
