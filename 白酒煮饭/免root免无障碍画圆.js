var window = floaty.window(
    <frame>
        <vertical>
            <linear>
                <button id="action" text="移动" gravity="center" w="40" h="40" color="#ffffff" bg="#77000000"/>
                <button id="nzh" text="画圆" w="40" h="40" color="#ffffff" bg="#77000000" margin="1 0 0 0"/>
            </linear>
            <img id="tp" w="81" h="0" bg="#44000000" />
            
        </vertical>
    </frame>
);



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
            
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
            // if(xs==1){ 
            //   window2.setPosition(windowX + (event.getRawX() - x),
            //    windowY + (event.getRawY() - y)+82);
            // }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击

            return true;
    }
    return true;
});
//requestScreenCapture();
function jt() {
    while (true) {
        if (tu = captureScreen()) {
            return tu;
            break;
        }
    }
}

window.nzh.on("touch_down", () => {
   //window.tp.setImageBitmap(jt().bitmap);
   threads.start(function(){
   sleep(1000);
    hy(360,550,300);});
});



function hy(prx, pry, prt) {
    kz=1;
    htx=prt*Math.cos(0*(Math.PI/180));
    hty=prt*Math.sin(0*(Math.PI/180));
    threads.start(function(){
        for(ix=0;ix<360;ix++){
        sleep(10);
        htx=prt*Math.cos(ix*(Math.PI/180));
        hty=prt*Math.sin(ix*(Math.PI/180));
        }
        kz=0;
        
        });
    threads.start(function() {
        touchdown(prx+htx,pry+hty,0);
        
        while(kz==1){
        sleep(5);
        touchmove(prx+htx,pry+hty,0);
        
        }
        touchup(prx+htx,pry+hty,0);
        
        });
}


function touchdown(pressx, pressy, pressn) {
    
        new android.app.Instrumentation().sendPointerSync(android.view.MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(),0, pressx, pressy, pressn));
  
}

function touchmove(pressx, pressy, pressn) {
   
      new android.app.Instrumentation().sendPointerSync(android.view.MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), 2, pressx, pressy, pressn));

}

function touchup(pressx, pressy, pressn) {
  
        new android.app.Instrumentation().sendPointerSync(android.view.MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), 1, pressx, pressy, pressn));                          

}


while (true) {
    sleep(1000);
}