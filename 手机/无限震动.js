importClass(android.os.Vibrator);
importPackage(android.content)
var vibrator =  context.getSystemService(Context.VIBRATOR_SERVICE);
// log(vibrator.vibrate.toString())
log('开始震动')
vibrator.vibrate([1,1000000000], 0);
setTimeout(
  function(){
    vibrator.cancel();
    log('结束震动')
  },1000*60
)
