/*
作者:攀登
作用:弥补自带找图不支持透明图的不足
使用方法:先把要找的图转成透明数据在，找图

***透明图片需要把透明左上角第一个像素和透明的地方涂层一个颜色

可惜自带的多点找色不支持设置找色的方向和相似度
还有找图也是，好像会先转换成灰度图在找色，导致找图色彩不一样也能找到，
用这个可以解决这个问题

*/


requestScreenCapture(); //截图 
sleep(3000)


//var templ = images.read("/sdcard/js截图/文件名_290_249_325_285.png");
var 透明图 = images.read("/sdcard/js截图/两星辅印.png");
var 开始 = android.os.SystemClock.uptimeMillis();
var 透明数据 = img转像素(透明图)
log("转换用时", android.os.SystemClock.uptimeMillis() - 开始)
//log(透明数据)
var 开始 = android.os.SystemClock.uptimeMillis();
b = 找透明图([], 透明数据, 30) //全屏找图
log("找图用时", android.os.SystemClock.uptimeMillis() - 开始)
toastLog(b)
b = 找透明图([500, 500, 200, 200], 透明数据, 30) //区域找图
toastLog(b)

function 找透明图(范围, 数据, 偏色) {
    偏色 = 偏色 || 20
    var img = captureScreen();
    var p = images.findMultiColors(img, 数据[2], 数据[3], {
        region: 范围,
        threshold: 偏色
    });
    if (p) {
        return {
            x: p.x - 数据[0],
            y: p.y - 数据[1]
        }
    } else
        return null
}


function img转像素(img, 间隔, 偏色, 相似度, 透明图) {
    //间隔为取色间隔，越小找图越精确速度越慢,越大越快，但可能找到错误的地方
    //相似度为透明颜色范围相似度0-3左右
    间隔 = 间隔 || 20
    偏色 = 偏色 || 20
    相似度 = 相似度 || 1
    透明图 = 透明图 == undefined ? true : 透明图
    var bitmap = img.getBitmap();
    var w = bitmap.getWidth();
    var h = bitmap.getHeight();
    var pixels = util.java.array("int", w * h);
    bitmap.getPixels(pixels, 0, w, 0, 0, w, h);
    log("透明色", pixels[0])
    var 结果 = []
    var 起点 = [0, 0, 0, 0]
    for (let h1 = 0; h1 < h; h1 += 间隔) {
        跳出: for (let w1 = 0; w1 < w; w1 += 间隔) {
            let i = pixels[h1 * w + w1]
            if (透明图) {
                for (let y = 0 - 相似度; y < 相似度 + 1; y++) {
                    for (let x = 0 - 相似度; x < 相似度 + 1; x++) {
                        let i1 = pixels[(h1 + x) * w + w1 + y]
                        if (!i1) continue
                        if (colors.isSimilar(i1, pixels[0], 偏色)) continue 跳出
                    }
                }
            }
            if (起点[2] == 0) {
                起点[0] = w1
                起点[1] = h1
                起点[2] = i
            } else 结果.push([w1 - 起点[0], h1 - 起点[1], i])
        }
    }
    起点[3] = 结果
    return 起点
}