"ui";

ui.layout(
    <vertical padding="16" gravity="center">
        <text text="处理中..." gravity="center" textColor="black" textSize="16sp"/>
        <progressbar />
        <text text="点击包名进行复制" gravity="center"/>
        
    </vertical>
);
threads.start(function(){
dm1=b64("InVpIjsKCnVpLmxheW91dCgKICAgIDxTY3JvbGxWaWV3PgogICAgICAgIDx2ZXJ0aWNhbD4K");    
dm2=b64("PC92ZXJ0aWNhbD4KICAgIDwvU2Nyb2xsVmlldz4KKTsKCiAKIHFiPWNvbnRleHQuZ2V0UGFja2FnZU1hbmFnZXIoKTsKIGxiPXFiLmdldEluc3RhbGxlZFBhY2thZ2VzKDApOwogeHQ9bmV3IEFycmF5KCk7CiB5aD1uZXcgQXJyYXkoKTsKIGkwPTA7CiBpMT0wOwpmb3IgKGl1ID0gMDsgaXUgPGxiLnNpemUoKTsgaXUrKykgewpldmFsKCJ1aS55eWJtIitpdSsiLmNsaWNrKGZ1bmN0aW9uKCl7c2V0Q2xpcCh1aS55eWJtIitpdSsiLnRleHQoKSk7dG9hc3QoJ+WMheWQjeW3suWkjeWIticpO30pIik7Cn0KeHMoKTs=");


var qb = context.getPackageManager();
var lb = qb.getInstalledPackages(0);
code0 = "";
for (i = 0; i < lb.size(); i++) {
    code0+= '<linear><img id="yytb' + i + '" h="40" w="40" margin="1" bg="#000000"/>         <text id="yym' + i + '" textSize="13sp" h="40" w="80" bg="#00ffff" textColor="#000000" text="0"/>       <text id="yybm' + i + '" textSize="10sp" h="40" w="180" textColor="#ffffff00" bg="#666666" margin="0 1" text="0"/></linear>';
   }


dm=dm1+code0+dm2+xs;
//files.write("/storage/emulated/0/脚本/网页相关/1.js",dm);
engines.execScript("包名查看器",dm);

function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}

});

function xs(){
threads.start(function(){
for (i = 0; i <lb.size(); i++) {
  var yy=lb.get(i)
 if ((yy.applicationInfo.flags & yy.applicationInfo.FLAG_SYSTEM) <= 0) {
 yh[i1]=yy;i1++;
 }else{xt[i0]=yy;i0++;}
}
for(i=0;i<yh.length;i++){
var yyxx=yh[i].applicationInfo;
try{
eval("ui.yytb"+i+".setImageBitmap(qb.getApplicationIcon(yyxx).bitmap)");
}catch(e){}
eval("ui.yym"+i+".text('"+qb.getApplicationLabel(yyxx)+"');ui.yybm"+i+".text('"+yyxx.packageName+"');");
}
for(j=0;j<xt.length;j++){
var k=j+yh.length;
yyxx=xt[j].applicationInfo;
try{
eval("ui.yytb"+k+".setImageBitmap(qb.getApplicationIcon(yyxx).bitmap)");
}catch(e){}
eval("ui.yym"+k+".text('"+qb.getApplicationLabel(yyxx)+"');ui.yybm"+k+".text('"+yyxx.packageName+"');");
}
});
}

