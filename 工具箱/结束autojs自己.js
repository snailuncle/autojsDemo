var nowPid = android.os.Process.myPid();
var am = context.getSystemService(java.lang.Class.forName("android.app.ActivityManager"));
var list = am.getRunningAppProcesses();
for(var i=0;i<list.size();i++){
var info = list.get(i)
if(info.pid != nowPid){
kill(info.pid);
}
}
kill(nowPid);
function kill(pid){
   android.os.Process.killProcess(pid);
}