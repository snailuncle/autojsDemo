"ui";
path="/sdcard/";acs(path);b4=new Array();
ui.statusBarColor("#AA0000");
ui.layout(
    <frame background="#AA0000">
    <vertical align="top" margin="5">
		
       <text id="text" bg="#ffffff" h="430" color="#111111" size="6"></text>
     <linear>
    <vertical w="170">
   
    </vertical>
    <vertical>
    <linear> 
    <button margin="0 0 0 60" h="60" w="60" id="ashang" text="上"></button>
    </linear>
          <linear>
    <button h="60" w="60" id="azuo" text="左"></button>
    <button h="60" w="60" id="aok" text="ok"></button>
    <button h="60" w="60" id="ayou" text="右"></button>
    </linear>
        <linear>
    <button margin="0 0 0 60" h="60" w="60" id="axia" text="下"></button>
    </linear>
          </vertical>
    </linear>
    </vertical>
    </frame>
);
ui.text.text(ahz());
ui.ashang.click(() => {bcz(2);ui.text.text(ahz());});
ui.ayou.click(() => {bcz(6);ui.text.text(ahz());});
ui.axia.click(() => {bcz(8);ui.text.text(ahz());});
ui.azuo.click(() => {bcz(4);ui.text.text(ahz());});
ui.aok.click(() => {bcz(5);ui.text.text(ahz());});

function acs(scriptsPath){
a3=0;
var scriptFiles = files.listDir(scriptsPath, function(name){
    return name.endsWith("");
});
a0=scriptFiles;
a1=new Array();
a4=a0.length;
for(i1=0;i1<a4;i1++){
a1[i1]="○";
}
a1[a3]="◉";
}//初始化棋盘
function ahz(){
a2="";
for(i1=0;i1<a0.length;i1++){
a2=a2+a1[i1]+a0[i1]+"\n";
}
return a2;
}//绘制整张棋盘数据
function bcz(b0){
if(b0==8){
if(a3<a4-1){a1[a3]="○";a3++;a1[a3]="◉";ui.text.text(ahz());}}
if(b0==2){
if(a3>0){a1[a3]="○";a3--;a1[a3]="◉";ui.text.text(ahz());}}
if(b0==5||b0==6){
b1=path+a0[a3]+"/";
if(files.listDir(b1, function(name){
    return name.endsWith("");
})){b4[path.length]=a3;
    path=b1;acs(path);ui.text.text(ahz());
}else{}
}
if(b0==4){
b1="";
b2=new Array();
b2=path.split("/");
b3=b2.length;
for(i=0;i<b3-2;i++){
b1=b1+b2[i]+"/";
}
if(b3>3){
    path=b1;acs(path);
a1[a3]="○";a3=b4[path.length];a1[a3]="◉";ui.text.text(ahz());
}}
}//操作