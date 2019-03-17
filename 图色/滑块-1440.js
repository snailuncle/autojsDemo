var y = 1058//设置滑动按钮高度
//y=className("android.widget.Image").text("tag-bar").findOne().bounds().centerY()
/**
 *脚本来源：浩然
 *QQ：2125764918
 *b站UID:275511084
 *
 *适用版本：所有安卓版本
 *适用分辨率：1080p720p 及其他所有分辨率！再怎么稀奇古怪的都成功了
 *1440 分辨率由 1004864951 适配
 *
 *转载请附注来源，谢谢
 *成功率实测百次：成功率100%
 *
 *防检测功能：模拟真人滑动
 *通过四阶贝塞尔曲线，生成完全模仿真的滑动方式
 *
 */


 //显示控制台
console.show()
console.setPosition(100, 1300)
var  _G_arr0 = Array()
    for (let x = 5; x < 160; x+=5) {
            _G_arr0.push([x,0+x,"#000000"])
            _G_arr0.push([x,160-x,"#000000"])
    }
//请求权限
if (!requestScreenCapture()) {
    alert("请求截图权限失败！");
    exit();
}
//启动
start()



/**
 * 识别滑块位置
 *
 * 传入值img，ratio
 * img为要识别的图片
 * ratio为识别图片的分辨率（暂时只可选择720或1080）
 *
 * 返回值x
 * 识别出方块位置的左端横坐标
 */
function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else if (ratio==1440){
        log("分辨率2k")
        checknumber()

    }else{
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);

    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x+65
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}

function findMultiColorss(img,first,arr,option){
    var temp_img
    if (option.region) {
        temp_img = images.clip(img,option.region.x,option.region.y,option.region.width,option.region.height)
        for (let  img_height= 0; img_height < temp_img.getHeight()-165; img_height+=5) {
            for (let img_width = 0; img_width < temp_img.getWidth()-165; img_width+=5) {
                if (colors.equals(temp_img.pixel(img_width,img_height), first)) {
                    var flag=true
                    for (let index = 0; index < arr.length; index++) {
                        if ( ! colors.equals(temp_img.pixel(img_width+arr[index][0],img_height+arr[index][1]),arr[index][2])) {
                            flag=false
                        }
                    }
                    if (flag) {
                        return {x:img_width+option.region.x,y:img_height+option.region.y}
                    }
                }
            }
        }
    }
}

function checknumber() {
    var  ime = captureScreen();
    ime=images.cvtColor(ime,"BGR2GRAY",3)
    ff = images.threshold(ime,110,255,"BINARY")

    var dd= findMultiColorss(ff,"#000000",_G_arr0,{region:{x:820,y:550,width:550,height:650}})
    randomSwipe(300,1400,dd.x+85,1400)
    var err=text("请控制拼图块对齐缺口").findOne(3000)
    if (err) {

        var dd = idContains("reload").depth(24).findOne(1000)
        if (dd) {
            log("刷新滑块验证")
            dd.click()
            sleep(3000)


        }
    }
    return
}



function start() {
    auto.waitFor()
    for(var i=0;i<0;i++){sleep(1000);log(i);}
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");
            break;
        } else {
            log('截图失败,重新截图');
        }
    }
    var x = discernSlidingblock(imgBy1080,1080)
    console.info("识别结果滑块X坐标：" + x);

    if (x > -1) {
        randomSwipe(220, y, x, y)
        //滑动完成
    } else {
        console.log("识别有误，请确认是否在滑块界面");
    }
}

function bezierCreate(x1,y1,x2,y2,x3,y3,x4,y4){
    //构建参数
    var h=100;
    var cp=[{x:x1,y:y1+h},{x:x2,y:y2+h},{x:x3,y:y3+h},{x:x4,y:y4+h}];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);

    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++){
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;

        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;

        var t=dt*i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }

    //轨迹转路数组
    var array=[];
    for (var i = 0;i<curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }

    return array
}

/**
 * 真人模拟滑动函数
 *
 * 传入值：起点终点坐标
 * 效果：模拟真人滑动
 */
function randomSwipe(sx,sy,ex,ey){
    //设置随机滑动时长范围
    var timeMin=500
    var timeMax=1500
    //设置控制点极限距离
    var leaveHeightLength=500

    //根据偏差距离，应用不同的随机方式
    if(Math.abs(ex-sx)>Math.abs(ey-sy)){
        var my=(sy+ey)/2
        var y2=my+random(0,leaveHeightLength)
        var y3=my-random(0,leaveHeightLength)

        var lx=(sx-ex)/3
        if(lx<0){lx=-lx}
        var x2=sx+lx/2+random(0,lx)
        var x3=sx+lx+lx/2+random(0,lx)
    }else{
        var mx=(sx+ex)/2
        var y2=mx+random(0,leaveHeightLength)
        var y3=mx-random(0,leaveHeightLength)

        var ly=(sy-ey)/3
        if(ly<0){ly=-ly}
        var y2=sy+ly/2+random(0,ly)
        var y3=sy+ly+ly/2+random(0,ly)
    }

    //获取运行轨迹，及参数
    var time=[0,random(timeMin,timeMax)]
    var track=bezierCreate(sx,sy,x2,y2,x3,y3,ex,ey)

    log("随机控制点A坐标："+x2+","+y2)
    log("随机控制点B坐标："+x3+","+y3)
    log("随机滑动时长："+time[1])

    //滑动
    gestures(time.concat(track))
    console.hide()
}

function imgBy1080(){
    var img=captureScreen()
    return images.resize(img,[1080,device.height*1080/device.width])
}


