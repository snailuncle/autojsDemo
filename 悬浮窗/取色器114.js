if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
当前方向 = 1
坐标偏移x = -1
坐标偏移y = -1
w = floaty.rawWindow(
    <frame id="背景"  bg="#99611919" h="200" w="200" >
       <vertical w="*" h="*" >
         <vertical w="*" h="20" gravity="top" >
            <linear w="*" h="20"  >  
              <linear w="40" h="30"  gravity="left">
                 <text id="左上" text=" ◤" textColor="red" textSize="16sp" />
              </linear>
              <linear  w="*" h="30" gravity="right">  
                <text  text=" 点击四周箭头切换采点方向   " textColor="#ff000000" textSize="12sp" />
                <text id="右上" text="↗ " textColor="red" textSize="16sp" />
              </linear>  
            </linear>  
         </vertical>
         <vertical>
          <text id="最小化" text="最小化" bg="#ff000000" h="auto" w="auto" textSize="12sp" />
         <linear w="*" h="auto">
           <vertical>
          <linear>
            <text text="当前坐标:"  textSize="12sp" />
            <text id="坐标" text="点我复制" bg="#ff999933" textSize="14sp" />
          </linear>
          <linear>
            <text text="数字颜色:  "  textSize="12sp" />
            <text id="数字颜色" text="点我复制"  bg="#ff558800"  textSize="14sp" />
          </linear>
          <linear>
            <text text="ARGB颜色:"  textSize="12sp" />
            <text id="ARGB颜色" text="点击复制"  bg="#ff990055"  textSize="14sp" />
          </linear>
          <linear>
            <text text="hsl颜色:     "  textSize="12sp" />
            <text id="hsl颜色" text="点击复制"  bg="#ff009900"  textSize="14sp" />
          </linear>
          </vertical>
           <linear w="50" h="50" gravity="center" bg="#ff000000" >
          <text id="当前颜色" w="40" h="40" text="" bg="#ffffffff"  />
          </linear>
          </linear>
         </vertical>
          <vertical>
            <vertical bg="#99991919" gravity="top" h="80" w="165">
           <linear gravity="center">
             <button id="zxh" gravity="center" text="⊙"  w="40" h="30" textSize="8sp" />
             <button id="上" gravity="center" text="↑"  w="40" h="30" textSize="8sp" />
             <button id="退出" gravity="center" text="╳"  w="40" h="30" textSize="8sp" />
           </linear>
          <linear gravity="center">
            <button id="左" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
            <button id="fuzhi" gravity="center" text="复制"  w="40" h="30" textSize="8sp" />
            <button id="右" gravity="center" text="→"  w="40" h="30" textSize="8sp" />
          </linear>
          <linear gravity="center">
            <button id="zuo" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
            <button id="下" gravity="center" text="↓"  w="40" h="30" textSize="8sp" />
            <button id="you" gravity="center" text="→"  w="40" h="30" textSize="8sp" />
          </linear>
     </vertical>
          </vertical>
         <vertical w="*" h="*" gravity="bottom">
           <linear  h="20" >  
              <linear w="40" h="30" gravity="left">
                 <text id="左下" text=" ↙" textColor="red" textSize="16sp" />
              </linear>
              <linear  w="*" h="30" gravity="right">  
                 <text  text=" 点击四周箭头切换采点方向    " textColor="#ff000000" textSize="12sp" />
                 <text id="右下" text="↘ " textColor="red" textSize="16sp" />
              </linear>  
            </linear>  
         </vertical>
      </vertical>
  </frame>
);
w.setPosition(55, 250)
sleep(100)
窗口宽 = w.getWidth()
窗口高 = w.getHeight()
log(窗口宽)
w.背景.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            aw = w.getWidth();
            ah = w.getHeight();
            windowX = w.getX();
            windowY = w.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            fcx = windowX + (event.getRawX() - x)
            fcy = windowY + (event.getRawY() - y)
            窗口移动()
            return true;
        case event.ACTION_UP:
            return true;
    }
    return true;
})
w.退出.click(() => {
    exit()
});
w.最小化.click(() => {
    if (w.最小化.text() == "最小化") {
        w.最小化.setText("最大化")
        w.setSize(90, 100)
    } else {
        w.最小化.setText("最小化")
        w.setSize(窗口宽, 窗口高)
    }
});
w.上.click(() => {
    fcy -= 1
    窗口移动()
});
w.下.click(() => {
    fcy += 1
    窗口移动()
});
w.左.click(() => {
    fcx -= 1
    窗口移动()
});
w.右.click(() => {
    fcx += 1
    窗口移动()
});
w.左上.click(() => {
    w.左上.setText(" ◤")
    w.右上.setText("↗ ")
    w.左下.setText(" ↙")
    w.右下.setText("↘ ")
    坐标偏移x = -1
    坐标偏移y = -1
});
w.右上.click(() => {
    w.左上.setText(" ↖")
    w.右上.setText("◥ ")
    w.左下.setText(" ↙")
    w.右下.setText("↘ ")
    坐标偏移x = 窗口宽 + 1
    坐标偏移y = -1
});
w.左下.click(() => {
    w.左上.setText(" ↖")
    w.右上.setText("↗ ")
    w.左下.setText(" ◣")
    w.右下.setText("↘ ")
    坐标偏移x = -1
    坐标偏移y = 窗口高 + 1
});
w.右下.click(() => {
    w.右上.setText(" ↖")
    w.右上.setText("↗ ")
    w.左下.setText(" ↙")
    w.右下.setText("◢ ")
    坐标偏移x = 窗口宽 + 1
    坐标偏移y = 窗口高 + 1
});
w.坐标.click(() => {
    toast("复制坐标");
    setClip(w.坐标.text())
});
w.数字颜色.click(() => {
    toast("复制数字颜色");
    setClip(w.数字颜色.text())
});
w.ARGB颜色.click(() => {
    toast("复制ARGB颜色");
    setClip(w.ARGB颜色.text())
});
w.hsl颜色.click(() => {
    toast("复制hsl颜色");
    setClip(w.hsl颜色.text())
});

function 窗口移动() {
    w.setPosition(fcx, fcy)
    x1 = w.getX() + 坐标偏移x
    y1 = w.getY() + 坐标偏移y
    w.坐标.setText(x1 + "," + y1)
    var img = captureScreen();
    if ((当前方向 == 1 && 1080 > x1 && x1 > 0 && 1920 > y1 && y1 > 0) || (当前方向 == 2 && 1080 > y1 && y1 > 0 && 1920 > x1 && x1 > 0)) {
        var color = images.pixel(img, x1, y1);
        //显示该颜色值
        w.数字颜色.setText("" + color);
        w.ARGB颜色.setText(colors.toString(color));
        hsl = RgbToHsl(colors.red(color), colors.green(color), colors.blue(color))
        w.hsl颜色.setText("" + hsl)
        w.当前颜色.setBackgroundColor(colors.parseColor(colors.toString(color)))
    }
}

function RgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [Math.floor(h * 100), Math.round(s * 100) + "%", Math.round(l * 100) + "%"];
}

while(1) {
    方向 = context.getResources().getConfiguration().orientation
    //log(方向)
    if (方向 == 1 && 方向 != 当前方向) {
        当前方向 = 方向
        toastLog("竖屏")
        requestScreenCapture(false)
        sleep(1000)
    } else if (方向 == 2 && 方向 != 当前方向) {
        当前方向 = 方向
        toastLog("横屏")
        requestScreenCapture(true)
        sleep(1000)
    }
sleep(500)
}