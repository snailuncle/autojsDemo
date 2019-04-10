/*
* @Author: 攀登
* @Last Modified by:   sqzhang
* @Last Modified time: 2019-03-04 02:23:31
* @Description: 蚂蚁庄园登山赛 自动登山
* @Auto.js Version: 4.1.0 Alpha5
* @Android Version: >=6
*/


console.show()
var ra = new RootAutomator();
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
var w = floaty.rawWindow(
    <frame gravity="center" bg="#99ff0000" w="5" h="5">
        <text id="text">悬浮文字</text>
    </frame>
);
app.startActivity({    
     action: "android.intent.action.VIEW",    
     data: "alipays://platformapi/startApp?appId=68687154", //登山赛    
     packageName: "com.eg.android.AlipayGphone",    
     });


sleep(6000)
log("开始游戏")

click(553,1079);//这个是开始游戏的坐标x,y值，请自行更改

sleep(500)
star_point = 540
anxia(540, 1888, 0)
while (1) {
    the_time = new Date().getTime()
    var img = captureScreen();
    var p = findColor(img, "#fff2d71e", {
        // region中第2个参数的值 表示的是 把第3块草地分成上下对等的水平线的Y坐标
        region: [40, 1100, 1000, 10],
        threshold: 30
    });
    if (p) {
        cost_time = new Date().getTime() - the_time
        //  log(cost_time,"找到啦:" + p);
        w.setPosition(p.x, p.y)
        end_point = p.x + 1
        //  end_point=end_point-540
        //end_point=end_point/2
        // end_point=end_point+540
        cost_numbers = Math.abs(end_point - star_point)
        log(star_point, end_point, cost_numbers)
        //  swipe(star_point,1870,end_point,1870,200)
        randon_number = random(1400, 1800)
        //基数=0.15                
        for (let a = 0; a < cost_numbers; a++) {
            if (end_point > star_point) { //判断刚踩过金币(old)和即将要踩的金币(new)的x值的大小
            yidong(star_point + 0.85*a - 13, randon_number, 0) //只需要改动 13 这个值 如果移动太小，就把13改小
            } else {
            yidong(star_point - 0.85*a - 8, randon_number, 0)  //只需要改动 8 这个值 如果移动太小，就把8改大
            }
        }
        star_point = end_point
        //  press(p.x,p.y+280+random(5,60),random(500,800))
        sleep(200)
    } else {
        // toast("没找到");
    }
   if( images.detectsColor(img, "#ffff6458",381,1616, threshold = 16, algorithm = "diff")){
       tanqi(0)
       sleep(200)
       toastLog("游戏挂了")
       exit()
       }
}

function anxia(x, y, id) {
    var sjs = random(99999, 10000)
    ra.sendEvent(3, 47, id); 
    ra.sendEvent(3, 57, sjs); 
    ra.sendEvent(1, 330, 1);
    ra.sendEvent(1, 325, 1);
    ra.touchX(x);
    ra.touchY(y);
    ra.sendEvent(3, 48, 5); 
    ra.sendEvent(3, 49, 5); 
    ra.sendSync(); 
}

function yidong(x, y, id) {
    sjs = random(6, 3)
    sjs1 = random(6, 6)
    ra.sendEvent(3, 47, id); 
    ra.touchX(x);
    ra.touchY(y);
    ra.sendEvent(3, 48, sjs); 
    ra.sendEvent(3, 49, sjs1); 
    ra.sendSync(); 
}

function tanqi(id) {
    ra.sendEvent(3, 47, id); 
    ra.sendEvent(3, 57, -1); 
    // ra.sendEvent(1, 330, 0); 
    // ra.sendEvent(1, 325, 0);
    ra.sendSync();
}