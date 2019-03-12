var window = floaty.window(
   <frame>
   <vertical>
   <linear>
        <button id="action" text="+00:00:00" gravity="left" w="70" h="40" color="#ffffff" bg="#77000000"/>
   </linear>  

   </vertical>
   </frame>
);
var window2 = floaty.window(
    <frame>
    <vertical>
<linear>
   <button id="n1" text="1" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 1 0"/>
   <button id="n2" text="2" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n3" text="3" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nstar" text="▲" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   
   <linear>
   <button id="n4" text="4" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 1 0"/>
   <button id="n5" text="5" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n6" text="6" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nstop" text="■" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   <linear>
   <button id="n7" text="7" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 1 0"/>
   <button id="n8" text="8" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n9" text="9" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nb5" text="⑤" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   
   <linear>
   <button id="nwen" text="帮" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n0" text="0" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nt" text="退" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nb10" text="⑩" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   </vertical>
      </frame>
);
window2.setPosition(10000,10000);
log(Object.keys(window2));
var xs=2;
var sz=0;
var dj=0;
var pp=[0,0,0,0,0,0];
var sj=new Date().getTime();
var kj=0;
var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            if(xs!=1){window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
              } // if(xs==1){ 
             //   window2.setPosition(windowX + (event.getRawX() - x),
            //    windowY + (event.getRawY() - y)+82);
          // }
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 1500){
            exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                threads.start(function() {
                    onClick();
                });
            }
            return true;
    }
    return true;
});

function onClick() {
    if (xs==1) {
      xs=2;
      window2.setPosition(10000,10000);
        
    } else {
        xs=1;
        sz=0;
        kj=0;
        window2.setPosition(window.getX(),window.getY()+82);
        for(i in pp){pp[i]="_"}
    }
}
window2.n0.click(()=>{pp[sz]=0;sz++;if(sz==6){sz=0;}});
window2.n1.click(()=>{pp[sz]=1;sz++;if(sz==6){sz=0;}});
window2.n2.click(()=>{pp[sz]=2;sz++;if(sz==6){sz=0;}});
window2.n3.click(()=>{pp[sz]=3;sz++;if(sz==6){sz=0;}});
window2.n4.click(()=>{pp[sz]=4;sz++;if(sz==6){sz=0;}});
window2.n5.click(()=>{pp[sz]=5;sz++;if(sz==6){sz=0;}});
window2.n6.click(()=>{pp[sz]=6;sz++;if(sz==6){sz=0;}});
window2.n7.click(()=>{pp[sz]=7;sz++;if(sz==6){sz=0;}});
window2.n8.click(()=>{pp[sz]=8;sz++;if(sz==6){sz=0;}});
window2.n9.click(()=>{pp[sz]=9;sz++;if(sz==6){sz=0;}});
window2.nstop.click(()=>{ sj=new Date().getTime();
xs=2;dj=0;
      window2.setPosition(10000,10000);});
window2.nstar.click(()=>{
    for(i in pp){if(pp[i]=="_"){pp[i]=0;}}
    s=(((pp[0]*10+pp[1])*60+(pp[2]*10+pp[3]))*60+(pp[4]*10+pp[5]))*1000;
    sj=s+new Date().getTime();
    xs=2;dj=1;
      window2.setPosition(10000,10000);});
   
window2.nwen.click(()=>{
alert("停止健是顺计时，播放键是倒计时，倒计时结束会震动提醒，倒计时必须输入计时时间，顺计时从00:00:00开始；⑤、⑩是快捷倒计时5分钟和10分钟");
    });
window2.nt.click(()=>{
    threads.start(function(){
    var handsome = confirm("确认退出？");
    if(handsome){exit();}
});
    });
window2.nb5.click(()=>{
    kj+=5*60000;
    var st=gs(kj).split("");
    for(i in pp){
    pp[i]=parseInt(st[parseInt(i*(3/2))]);
    }
    sz=0;
    });
window2.nb10.click(()=>{
    kj+=10*60000;
    var st=gs(kj).split("");
    for(i in pp){
    pp[i]=parseInt(st[parseInt(i*(3/2))]);
    }
    sz=0;
    });
function gs(num) {
    var 总秒 = parseInt(num / 1000);
    var 秒 = 总秒 % 60;
    var 总分 = parseInt(总秒 / 60);
    var 分 = 总分 % 60;
    var 总时 = parseInt(总分 / 60);
    var 时 = 总时 % 24;
    var 总天 = parseInt(总时 / 24);
    return pf(时, 2) + ":" + pf(分, 2) + ":" + pf(秒, 2);

    function pf(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
}

var s;
var p;

while(true){
sleep(100);
if(xs==2){
s=sj-(new Date().getTime());
if(s>0){p="-"+gs(s);}else{p="+"+gs(0-s);if(dj==1){device.vibrate(3000);sleep(4000);}}
ui.run(function() {
                window.action.setText(p);
            });
}else{
p="-"+pp[0]+pp[1]+":"+pp[2]+pp[3]+":"+pp[4]+pp[5];;
    ui.run(function() {
                window.action.setText(p);
            });

}
}



