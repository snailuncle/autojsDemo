"ui";
path="/storage/emulated/0/脚本/足艺阁图片";//本地图片文件夹
var scriptFiles = files.listDir(path, function(name){
    return name.endsWith("");
});
k1=scriptFiles.length;
k0=0;
ui.statusBarColor("#009900");
ui.layout(
<frame background="#009900">
  <vertical align="top" margin="0">
    <linear>
    <text id="oopsm" h="20" w="170" color="#FFFFFF" gravity="left" size="10" text=""/>
    <text id="oopss" h="25" w="170" color="#FFFFFF" gravity="right" size="20" text=""/>
</linear>
    <img id="rounded_img" src="http://img03.sogoucdn.com/app/a/100520146/44b50e8bdd34658fd3e65abd403531dd"/>
  </vertical>
  <vertical paddingTop="480">
    <seekbar id="progress" progress="0"/>
    <button id="payment" text="上一张" margin="20 0 0 0"/>
    <button id="decrypt" text="下一张"/>
  </vertical>
</frame>
);
prok=0;
setInterval(()=>{
        pro0=parseInt(ui.progress.getProgress()/101*(k1-1));
       
    if(prok!=pro0){
        
    prok=pro0;k0=prok+random(0,parseInt(k1/101));
        ui.oopss.setText(k0+"/"+k1);
        ui.oopsm.text(scriptFiles[k0]);
    ui.rounded_img.setSource("file://"+path+"/"+scriptFiles[k0]);
    }
    }, 20);

ui.decrypt.click(() => {
if(k0>=-1&&k0<k1-1){
k0++;
    ui.rounded_img.setSource("file://"+path+"/"+scriptFiles[k0]);
ui.oopsm.text(scriptFiles[k0]);
ui.oopss.text(k0+"/"+k1);
}
});

ui.payment.click(() => {
  if(k0>0){
k0--;
    ui.rounded_img.setSource("file://"+path+"/"+scriptFiles[k0]);
ui.oopsm.text(scriptFiles[k0]);
ui.oopss.text(k0+"/"+k1);
}
});
