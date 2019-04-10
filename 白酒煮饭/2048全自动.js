"ui";
ui.statusBarColor("#AA0000");
ui.layout(
    <frame background="#AA0000">
    <vertical align="top" margin="5">
       <img id="img" bg="#ffffff" w="350" margin="1 0 0 0"/>
     <linear>
    <vertical w="170">
   <text text="分数:" color="#000000" size="64"/>
   <text id="分数" text="0" gravity="center" color="#ffffff" size="34"/>
    </vertical>
    <vertical>
    <linear> 
    <button  h="60" w="60" id="up" text="上"></button>
    </linear>
          <linear>
    <button h="60" w="60" id="left" text="左"></button>
    <button h="60" w="60" id="ok" text="ok"></button>
    <button h="60" w="60" id="right" text="右"></button>
    </linear>
        <linear>
    <button margin="0 0 0 60" h="60" w="60" id="down" text="下"></button>
    </linear>
          </vertical>
    </linear>
    </vertical>
    </frame>
);

importClass(android.graphics.Paint);
importClass(android.graphics.Canvas);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Matrix);
importClass(android.content.Intent);
importClass(android.net.Uri);
var 大图;
var 分数=0;
var 分享否=0
var 控制=0;
ui.ok.click(() => {
分享否=1;
});
ui.img.click(() => {
var qq群号="332093831";
app.startActivity({
    action: "android.intent.action.VIEW",
    data:"mqqapi://card/show_pslcard?card_type=group&uin="+qq群号,
    packageName: "com.tencent.mobileqq",
});//打开qq群名片
});
threads.start(function(){
while(true){
if(分享否==1){
shareI(存图(大图));
分享否=0;
}else{

}
}
});
function shareI(图) {
 var imageUri = Uri.fromFile(new java.io.File(图));
 var shareIntent = new Intent();
  shareIntent.setAction(Intent.ACTION_SEND);
  shareIntent.putExtra(Intent.EXTRA_STREAM, imageUri);
  shareIntent.setType("image/*");
  context.startActivity(Intent.createChooser(shareIntent, "分享到"));
}
function 存图(bitmap){
var path="/storage/emulated/0/DCIM/Screenshots/"+new Date().getTime()+".png";
var mFile = new java.io.File(path);          
var mFileOutputStream = new java.io.FileOutputStream(mFile);
bitmap.compress(Bitmap.CompressFormat.PNG,100,mFileOutputStream); 
return path;
}
function 游戏2048(){
var 地图={};
var 宽=8;
var 长=8;
for(var i=0;i<宽;i++){
地图[i]={};
for(var j=0;j<长;j++){
地图[i][j]=0;
}
}
/*
地图=[
[0,0,0,0],
[32,16,8,4],
[64,128,256,512],
[8192,4096,2048,1024]
];
*/
var 图32768=绘图(0,255,0,"唐嫣",155,120,90,15,160); 

var 图16384=绘图(0,0,255,"杨幂",155,120,90,15,160); 
var 图8192=绘图(255,0,255,"8192",155,120,90,10,160);
var 图2048=绘图(255,255,0,"2048",155,120,90,10,160);
var 图1024=绘图(55,200,255,"1024",155,120,90,10,160);
var 图512=绘图(55,200,100,"512",155,120,90,40,160);
var 图256=绘图(55,200,0,"256",155,120,90,40,160);
var 图128=绘图(55,0,0,"128",155,120,90,40,160);
var 图64=绘图(255,255,0,"64",155,120,90,68,160);
var 图32=绘图(255,255,255,"32",155,120,90,68,160);
var 图16=绘图(100,255,255,"16",155,120,90,68,160);
var 图8=绘图(0,255,255,"8",155,120,90,95,160);
var 图4=绘图(0,0,255,"4",155,120,90,95,160);
var 图2=绘图(0,255,0,"2",155,120,90,95,160);
var 图0=绘图(155,120,90,"0",155,120,90,95,160);
var 图4096=绘图(255,0,0,"4096",155,120,90,10,160);

function 绘图(r,g,b,str,br,bg,bb,x,y){
var bitmap =Bitmap.createBitmap(250,250,Bitmap.Config.ARGB_8888);
var canvas = new Canvas(bitmap);
canvas.drawARGB(255,br,bg,bb);
var paint = new Paint();
    paint.setARGB(255,r,g,b);//青色画笔
    paint.setStyle(Paint.Style.FILL);//FILL||STROKE空心样式  
    paint.setStrokeWidth(1);//边缘宽度  
    paint.setTextSize(100); //以px为单位
    canvas.drawText(str,x,y,paint);
canvas.save(Canvas.ALL_SAVE_FLAG);
canvas.restore();
return bitmap;
}
function 绘大图(){
var bitmap =Bitmap.createBitmap(1080,1080,Bitmap.Config.ARGB_8888);
var canvas = new Canvas(bitmap);
canvas.drawARGB(255,0,0,0);
var paint = new Paint();
 var 宽间隔=(1080-14-(宽-1)*5)/宽;
 var 长间隔=(1080-14-(长-1)*5)/长;
 
    for(var i=0;i<宽;i++){
for(var j=0;j<长;j++){
eval('var 数图=图'+地图[i][j]);
var scaleWidth =宽间隔/数图.width;
var scaleHeight=长间隔/ 数图.height;
// 取得想要缩放的matrix参数
var matrix = new Matrix();
matrix.postScale(scaleWidth, scaleHeight);
// 得到新的图片
var bitMap = Bitmap.createBitmap(数图, 0, 0, 数图.width, 数图.height, matrix, true);
eval('canvas.drawBitmap(bitMap'+','+(i*(宽间隔+5)+7)+','+(j*(长间隔+5)+7)+',paint)');
 }}
    
canvas.save(Canvas.ALL_SAVE_FLAG);
canvas.restore();
return bitmap;
}
function 随机2(){
var 空数=0;
for(var i=0;i<宽;i++){
for(var j=0;j<长;j++){
if(地图[i][j]==0){空数++;}
}}
var 随机位置=random(1,空数);
空数=0;
for(var i=0;i<宽;i++){
for(var j=0;j<长;j++){
if(地图[i][j]==0){
空数++;
if(空数==随机位置){
 地图[i][j]=2;
}
}
}}
}
var 总移动次数=1;
while(true){
if(总移动次数!=0){
随机2();
分数++;
总移动次数=0;
}
大图=绘大图();
ui.run(function(){
ui.img.setImageBitmap(大图);
ui.分数.text(分数+"");
});
while(控制==0){sleep(10);}
if(控制==2){
var 次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var i=0;i<宽;i++){
for(var j=1;j<长;j++){
if(地图[i][j]!=0&&地图[i][j-1]==0){
地图[i][j-1]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
for(var i=0;i<宽;i++){
for(var j=1;j<长;j++){
if(地图[i][j]==地图[i][j-1]&&地图[i][j]!=0){
地图[i][j-1]=地图[i][j]*2;
地图[i][j]=0;
总移动次数++;
}
}}//向上合并
次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var i=0;i<宽;i++){
for(var j=1;j<长;j++){
if(地图[i][j]!=0&&地图[i][j-1]==0){
地图[i][j-1]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
}
if(控制==8){
var 次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var i=0;i<宽;i++){
for(var j=长-2;j>=0;j--){
if(地图[i][j]!=0&&地图[i][j+1]==0){
地图[i][j+1]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
for(var i=0;i<宽;i++){
for(var j=长-2;j>=0;j--){
if(地图[i][j]==地图[i][j+1]&&地图[i][j]!=0){
地图[i][j+1]=地图[i][j]*2;
地图[i][j]=0;
总移动次数++;
}
}}//向上合并
次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var i=0;i<宽;i++){
for(var j=长-2;j>=0;j--){
if(地图[i][j]!=0&&地图[i][j+1]==0){
地图[i][j+1]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
}
if(控制==4){
var 次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var j=0;j<长;j++){
for(var i=1;i<宽;i++){
if(地图[i][j]!=0&&地图[i-1][j]==0){
地图[i-1][j]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
for(var j=0;j<长;j++){
for(var i=1;i<宽;i++){
if(地图[i][j]==地图[i-1][j]&&地图[i][j]!=0){
地图[i-1][j]=地图[i][j]*2;
地图[i][j]=0;
总移动次数++;
}
}}//向上合并
次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var j=0;j<长;j++){
for(var i=1;i<宽;i++){
if(地图[i][j]!=0&&地图[i-1][j]==0){
地图[i-1][j]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
}
if(控制==6){
var 次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var j=0;j<长;j++){
for(var i=宽-2;i>=0;i--){
if(地图[i][j]!=0&&地图[i+1][j]==0){
地图[i+1][j]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
for(var j=0;j<长;j++){
for(var i=宽-2;i>=0;i--){
if(地图[i][j]==地图[i+1][j]&&地图[i][j]!=0){
地图[i+1][j]=地图[i][j]*2;
地图[i][j]=0;
总移动次数++;
}
}}//向上合并
次数统计=1;
while(次数统计!=0){
次数统计=0;
for(var j=0;j<长;j++){
for(var i=宽-2;i>=0;i--){
if(地图[i][j]!=0&&地图[i+1][j]==0){
地图[i+1][j]=地图[i][j];
地图[i][j]=0;
次数统计++;
总移动次数++;
}
}}}//向上贴
}
控制=0;
}
}

ui.up.click(() => {
控制=2;
});
ui.down.click(() => {
控制=8;
});
ui.left.click(() => {
控制=4;
});
ui.right.click(() => {
控制=6;
});
threads.start(function(){
游戏2048();
});
threads.start(function(){
while(true){
    if(控制==0){
控制=random(1,4)*2;
}
}
});


