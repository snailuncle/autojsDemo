//按照游戏正常操作,可以自动玩拯救萌宠这个游戏
//如果中间出了什么幺蛾子,就自动不了了,
//我测试了三局游戏,是可以正常自动的.
//直接在手机桌面启动脚本就可以了.会自动打开游戏的.


// 遍历所有色块,点击颜色相同并且相邻的色块(点击一下就可以,相邻的会自动消除,也就是说不用两个都点)

// 步骤
// 1 截图
// 2 分析颜色相同的色块位置
// 3 点击分析出来的坐标
// 4 重复

Threshold = 6;

function captureScreenImg() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
    var img = captureScreen();
    return img;
}


function coordinateAnalysisAndExtract(img) {
    //分析提取图片中相邻色块颜色相同的坐标
    //只分析色块的右方和下方,如果右边或者下边颜色一样,那么就记录这个坐标
    //起点坐标是137,538
    //终点坐标是1027,1597
    var xStart = 137,
        yStart = 542,
        xEnd = 1027,
        yEnd = 1597;
    //色块上下间距120
    //色块左右间距126
    SpacingLeftAndRight = 124;
    SpacingUpAndDown = 122;

    // 横排8个竖排9个
    //最后一排不需要考虑,在第8排的时候,就已经检测过第9排了.
    //横排竖排都一样,最后一排都不需要考虑
    HorizontalNumber = 8;
    VerticalNumber = 9;

    var targetCoordinatesArray = new Array()
    // 从左往右,从上到下.
    for (var i = 1; i <= HorizontalNumber - 1; i++) {
        for (var j = 1; j <= VerticalNumber - 1; j++) {
            //获取在点(x, y)处的颜色
            // console.log(xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
            var ColorMainColorBlock = images.pixel(img, xStart + (i - 1) * SpacingLeftAndRight, yStart + (j - 1) * SpacingUpAndDown);







            // ttt=1200;

            // var xxx=xStart+(i-1)*SpacingLeftAndRight
            // var yyy=yStart+(j-1)*SpacingUpAndDown
            // press(xxx,yyy, ttt);

            // var xxxRight=xStart+i*SpacingLeftAndRight
            // var yyyRight=yStart+(j-1)*SpacingUpAndDown
            // press(xxxRight,yyyRight, ttt);

            // var xxxDown=xStart+(i-1)*SpacingLeftAndRight
            // var yyyDown=yStart+j*SpacingUpAndDown
            // press(xxxDown,yyyDown, ttt);





            var ColorRightColorBlock = images.pixel(img, xStart + i * SpacingLeftAndRight, yStart + (j - 1) * SpacingUpAndDown);
            var ColorDownColorBlock = images.pixel(img, xStart + (i - 1) * SpacingLeftAndRight, yStart + j * SpacingUpAndDown);

            // if (ColorMainColorBlock==ColorRightColorBlock || ColorMainColorBlock==ColorDownColorBlock){
            threshold = Threshold;
            if (colors.isSimilar(ColorMainColorBlock, ColorRightColorBlock, threshold) || colors.isSimilar(ColorMainColorBlock, ColorDownColorBlock, threshold)) {
                var targetCoordinates = new Array(xStart + (i - 1) * SpacingLeftAndRight, yStart + (j - 1) * SpacingUpAndDown)
                targetCoordinatesArray.push(targetCoordinates)
            }
        }
    }
    return targetCoordinatesArray;
}


//边上的色块


function coordinateAnalysisAndExtractRight(img) {
    //分析提取图片中相邻色块颜色相同的坐标
    //只分析色块的右方和下方,如果右边或者下边颜色一样,那么就记录这个坐标
    //起点坐标是137,538
    //终点坐标是1027,1597
    var xStart = 1008,
        yStart = 547,
        xEnd = 1027,
        yEnd = 1597;
    //色块上下间距120
    //色块左右间距126
    SpacingLeftAndRight = 124;
    SpacingUpAndDown = 122;

    // 横排8个竖排9个
    //最后一排不需要考虑,在第8排的时候,就已经检测过第9排了.
    //横排竖排都一样,最后一排都不需要考虑
    VerticalNumber = 9;

    var targetCoordinatesArray = new Array()
    // 从左往右,从上到下.

    for (var j = 1; j <= VerticalNumber - 1; j++) {
        //获取在点(x, y)处的颜色
        // console.log(xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
        var ColorMainColorBlock = images.pixel(img, xStart, yStart + (j - 1) * SpacingUpAndDown);







        // ttt=1200;

        // var xxx=xStart+(i-1)*SpacingLeftAndRight
        // var yyy=yStart+(j-1)*SpacingUpAndDown
        // press(xxx,yyy, ttt);

        // var xxxRight=xStart+i*SpacingLeftAndRight
        // var yyyRight=yStart+(j-1)*SpacingUpAndDown
        // press(xxxRight,yyyRight, ttt);

        // var xxxDown=xStart+(i-1)*SpacingLeftAndRight
        // var yyyDown=yStart+j*SpacingUpAndDown
        // press(xxxDown,yyyDown, ttt);



        var ColorDownColorBlock = images.pixel(img, xStart, yStart + j * SpacingUpAndDown);

        // if (ColorMainColorBlock==ColorRightColorBlock || ColorMainColorBlock==ColorDownColorBlock){
        threshold = Threshold;
        if (colors.isSimilar(ColorMainColorBlock, ColorDownColorBlock, threshold)) {
            var targetCoordinates = new Array(xStart, yStart + (j - 1) * SpacingUpAndDown)
            targetCoordinatesArray.push(targetCoordinates)
        }
    }

    return targetCoordinatesArray;
}






function coordinateAnalysisAndExtractDown(img) {
    //分析提取图片中相邻色块颜色相同的坐标
    //只分析色块的右方和下方,如果右边或者下边颜色一样,那么就记录这个坐标
    //起点坐标是137,538
    //终点坐标是1027,1597
    var xStart = 137,
        yStart = 1530,
        xEnd = 1027,
        yEnd = 1597;
    //色块上下间距120
    //色块左右间距126
    SpacingLeftAndRight = 124;
    SpacingUpAndDown = 122;

    // 横排8个竖排9个
    //最后一排不需要考虑,在第8排的时候,就已经检测过第9排了.
    //横排竖排都一样,最后一排都不需要考虑
    HorizontalNumber = 8;


    var targetCoordinatesArray = new Array()
    // 从左往右,从上到下.
    for (var i = 1; i <= HorizontalNumber - 1; i++) {

        //获取在点(x, y)处的颜色
        // console.log(xStart+(i-1)*SpacingLeftAndRight, yStart+(j-1)*SpacingUpAndDown);
        var ColorMainColorBlock = images.pixel(img, xStart + (i - 1) * SpacingLeftAndRight, yStart);







        // ttt=1200;

        // var xxx=xStart+(i-1)*SpacingLeftAndRight
        // var yyy=yStart+(j-1)*SpacingUpAndDown
        // press(xxx,yyy, ttt);

        // var xxxRight=xStart+i*SpacingLeftAndRight
        // var yyyRight=yStart+(j-1)*SpacingUpAndDown
        // press(xxxRight,yyyRight, ttt);

        // var xxxDown=xStart+(i-1)*SpacingLeftAndRight
        // var yyyDown=yStart+j*SpacingUpAndDown
        // press(xxxDown,yyyDown, ttt);





        var ColorRightColorBlock = images.pixel(img, xStart + i * SpacingLeftAndRight, yStart);
        var ColorDownColorBlock = images.pixel(img, xStart + (i - 1) * SpacingLeftAndRight, yStart);

        // if (ColorMainColorBlock==ColorRightColorBlock || ColorMainColorBlock==ColorDownColorBlock){
        threshold = Threshold;
        if (colors.isSimilar(ColorMainColorBlock, ColorRightColorBlock, threshold)) {
            var targetCoordinates = new Array(xStart + (i - 1) * SpacingLeftAndRight, yStart)
            targetCoordinatesArray.push(targetCoordinates)
        }

    }
    return targetCoordinatesArray;
}









function coordinatesClick(targetCoordinatesArray) {
    for (j = 0, len = targetCoordinatesArray.length; j < len; j++) {
        x = targetCoordinatesArray[j][0];
        y = targetCoordinatesArray[j][1];
        click(x, y);
        // press(500, 1000, 1200);
        sleep(10);
    }
}



function rocketClick(img) {
    var wx = images.read("/sdcard/火箭筒.png");
    //截图并找图
    var p = findImage(img, wx, {
        region: [52, 482, 950, 1145],
        threshold: 0.8
    });
    if (p) {
        console.log("在桌面找到了微信图标啦: " + p);
        click(p.x, p.y);
    }


}



// 打开块收小游戏
function gameAppOpen() {
    // console.log("开始执行脚本122222222221")
    // text('微信').exists()
    //找出动态列表
    var one = text("吃鸡游戏").exists();

    var one2 = text("谁是卧底").exists();
    var one3 = text("消砖块").exists();

    if (one == false && one2 == false && one3 == false) {
        var packageName = "com.kwai.sogame";

        launch(packageName);
        sleep(5000);
        // return;
    } else {
        var textContent = "拯救萌宠";
        while (!click(textContent));
        sleep(8000);
    }








}
// 打开拯救萌宠
function spoilSave() {
    log("点击拯救萌宠之前")
    var textContent = "拯救萌宠"
    while (!click(textContent));
    click(textContent)
    click(textContent)
    log("已经点击拯救萌宠")
    sleep(8000);





    // var options = {
    //     timeout: 6000, // 查找控件超时时间
    //     max_retry_times: MAX_RETRY_TIMES, // 最大重试次数
    //     min_step_count: 0, // 最低点赞步数
    // };

}
// 回到主界面
function mainInterfaceBack() {
    var textContent = "回到首页"

    if (text("回到首页").exists()) {
        while (!click("回到首页"));
    } else if (text("换个游戏").exists()) {
        while (!click("换个游戏"));
        sleep(1000);
        Back();
    }





    sleep(1000);

}

function gameover(img) {
    // text("吃鸡游戏").exists()
    var one = text("回到首页").exists();
    var one2 = text("换个游戏").exists();
    var one3 = text("发送").exists();


    if (one == true || one2 == true || one3 == true) {
        return true;
    } else {
        return false;
    }

}






// var packageName = "com.kwai.sogame";

// launch(packageName);
console.log("开始执行脚本123456")
while (1) {
    console.log("脚本第一行")
    // // 打开快手小游戏
    gameAppOpen();
    console.log("游戏打开完毕")
    // //打开拯救萌宠
    spoilSave();
    console.log("拯救萌宠打开完毕")
    console.log("开始游戏=====拯救萌宠")
    while (1) {
        img = captureScreenImg();
        sleep(30);



        // 如果游戏完成,就回到主界面
        if (gameover(img)) {

            mainInterfaceBack();
            console.log("返回主界面")
            break;
        }





        targetCoordinatesArray = coordinateAnalysisAndExtract(img);
        console.log(targetCoordinatesArray);
        coordinatesClick(targetCoordinatesArray);
        targetCoordinatesArray = coordinateAnalysisAndExtractRight(img);
        console.log(targetCoordinatesArray);
        coordinatesClick(targetCoordinatesArray);
        targetCoordinatesArray = coordinateAnalysisAndExtractDown(img);
        console.log(targetCoordinatesArray);
        coordinatesClick(targetCoordinatesArray);
        //增加点击火箭筒
        rocketClick(img);
        sleep(80);


    }
    console.log("结束游戏=====拯救萌宠")
}
