requestScreenCapture();
/*
·不开指针显示
·不开无障碍
·支持横屏
·颜色获取
·坐标显示
·快捷粘贴
*/

var window = floaty.window(
    <frame h="100">
   
     <img src="http://img03.sogoucdn.com/app/a/100520146/71316125981b3b548da388527ac92f65" />
 
        <text id="action" text=" 显示坐标/颜色" color="#2000E8" bg="#00000000"/>
           </frame>
);/*
  var window = floaty.window(
    <vertical>
        <input id="input" text="请输入你的名字" textSize="16sp" focusable="true"/>
        <button id="ok" text="确定"/>
    </vertical>
);
*/

function capturescreen() {
while (true) {
if (ajt = captureScreen()) {
return ajt;
break;
}
}
}
setInterval(()=>{}, 1000);
var execution = null;
aw=0;
ah=0;
var x = 0, y = 0;
var windowX, windowY;
var downTime;

window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
           
            x = event.getRawX();
            y = event.getRawY();
            aw=window.getWidth();
            ah=window.getHeight();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            onchange();
            return true;
        case event.ACTION_UP:
            onchange();
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
            if(new Date().getTime() - downTime > 500){
               onClick();
               }else{
                setClip(bx+","+by);
                window.action.setText("     复制成功\n"+" \n"+" \n"+" \n"+"    Xy:"+bx+","+by);
           
            
            }
            }
            
            return true;
    }
    return true;
});

function onchange(){
aw=window.getWidth();
ah=window.getHeight();
ax = window.getX();
ay = window.getY();
var a = (context.resources.configuration.orientation);
//&
if (a === 1) {
    //竖屏
bx=ax+(aw/2);
by=ay+(ah*2/2-60);
} else {
bx=ax+(aw*2/2-78);
by=ay+(ah/2);
};
//&!
/*非刘海使用把//&到//&!的代码改成：
//可以微调后面的双位数
if (a === 1) {
  bx=ax+(aw/2);
  by=ay+(ah*2/2-76);
} else {
  bx=ax+(aw/2);
  by=ay+(ah/2);
}
*/
window.action.setText("  点击复制坐标"+"\n  Xy:"+bx+","+by);

            
      
}
function onClick(){
aw=window.getWidth();
ah=window.getHeight();
ax = window.getX();
ay = window.getY();
var a = (context.resources.configuration.orientation);
//&
if (a === 1) {
    //竖屏
  bx=ax+(aw/2);
  by=ay+(ah*2/2-60);
} else {
  bx=ax+(aw*2/2-78);
  by=ay+(ah/2);
}
//&!
/*非刘海使用把//&到//&!的代码改成：
//可以微调后面的双位数
if (a === 1) {
  bx=ax+(aw/2);
  by=ay+(ah*2/2-76);
} else {
  bx=ax+(aw/2);
  by=ay+(ah/2);
}
*/
ys=images.pixel(capturescreen(), bx, by);
nr=(" 颜色:"+ys+"\n 0x:"+colors.toString(ys)+"\n R:"+colors.red(ys)+"\n G:"+colors.green(ys)+"\n B:"+colors.blue(ys));          
window.action.setText(nr);
setClip(nr);
console.info(nr)            
      
}

toastLog("轻触复制坐标到通知栏、日志。长按0.5秒复制颜色");
sleep(2500);
toast("轻点复制坐标到通知栏、日志。长按0.5秒复制颜色");
//可以在不打开指针显示下获取坐标点，刘海屏福音！非刘海屏使用，请详细查看上面注释



