"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年4月14日 下午1:35:40
 *测试机型: vivo PD1813D
  *Auto.js版本: Pro 7.0.0-7
  *Android版本: 8.1.0
  *屏幕: 1080*2280
  *API: 27
 *备注: 本脚本演示了ColorMatrix各个值的用法。
**/



/*
*
* 4x5 matrix for transforming the color and alpha components of a Bitmap.　
* The matrix can be passed as single array, and is treated as follows:
* 下面这个4x5的矩阵可以表达，为一张图的颜色以及透明图信息。
* [ a, b, c, d, e,
*   f, g, h, i, j,
*   k, l, m, n, o,
*   p, q, r, s, t  ]
*
* When applied to a color 颜色分量矩阵
* [R, G, B, A]
* the resulting color is computed as:计算结果如下公式：
*
* R’ = a*R + b*G + c*B + d*A + e;
* G’ = f*R + g*G + h*B + i*A + j;
* B’ = k*R + l*G + m*B + n*A + o;
* A’ = p*R + q*G + r*B + s*A + t;
*
* That resulting color
* [R’, G’, B’, A’]
* then has each channel clamped to the 0 to 255 range.计算出来的结果，每个通道都在0-255之间
*
* The sample ColorMatrix below inverts incoming colors by scaling each
* channel by -1, and then shifting the result up by
* 255 to remain in the standard color space.
* 好像用来举例说明的，前四列代表RGBA的偏向成分，第五列代表着颜色偏移量
*
* [ -1, 0, 0, 0, 255,
*   0, -1, 0, 0, 255,
*   0, 0, -1, 0, 255,
*   0, 0, 0, 1, 0  ]
*/



importClass(android.graphics.ColorMatrixColorFilter);
importClass(android.graphics.ColorMatrix);


var SeekBarLayout = (function() {
    util.extend(SeekBarLayout, ui.Widget);

    function SeekBarLayout() {
        ui.Widget.call(this);
        this.Magnification=1;
        this.defineAttr("text", (view, attr, value, defineSetter) => {
            view._text.setText(String(value));
        });
        this.defineAttr("max", (view, attr, value, defineSetter) =>{
            let MinSum=parseFloat(String(value));
            view._Duration.setText(String(value));
            let MaxSum=parseInt(String(value).replace(".",""));
            this.Magnification=MaxSum/MinSum;
            view._Duration_seekbar.setMax(MaxSum);
        });
        this.defineAttr("sum", (view, attr, value, defineSetter) => {
            let Sum=parseFloat(String(value));
            view._CurrentDuration.setText(String(value));
            let _Sum=this.Magnification*Sum;
            view._Duration_seekbar.setProgress(_Sum);
        });
        this.defineAttr("onClick", (view, attr, value, defineSetter)=> {
            var _myFun = eval(value);
            view._Duration_seekbar.setOnSeekBarChangeListener({
                onProgressChanged: (seekBar, progress, fromUser)=> {
                    view._CurrentDuration.setText(String(progress/this.Magnification));
                    if (fromUser) {
                        _myFun(view._text, progress/this.Magnification);
                    }
                },
                onStartTrackingTouch: function(seekBar) {},
                onStopTrackingTouch: function(seekBar) {
                    //eval(value+"(view._text,progress)");
                }
            });
        });
    };
    SeekBarLayout.prototype.render = function() {
        return (
            <vertical margin="5" >
                            <frame w="*">
                                <text id="_CurrentDuration" w="auto" text="0"margin="10 0 0 0" gravity="center" layout_gravity="left"/>
                                <text id="_text"  w="auto"text="A"gravity="center" layout_gravity="center"/>
                                <text id="_Duration" w="auto" text="0"margin="0 0 10 0" gravity="center" layout_gravity="right"/>
                            </frame>
                            <seekbar id="_Duration_seekbar" layout_weight="1"/>
                        </vertical>
        );
    };
    SeekBarLayout.prototype.getSum = function() {
        return this.view._Duration_seekbar.getProgress();
    };
    ui.registerWidget("seekbar-layout", SeekBarLayout);
    return SeekBarLayout;
})();


var w = device.width;

ui.layout(
    <vertical>
        <canvas id="canvas" w="{{w}}px"h="{{w}}px"/>
        <scroll>
            <vertical margin="5">
            <vertical bg="#e0e0e0" margin="5">
                <text text="R红色通道最大不超过255" textSize="17" gravity="center"w="*"/>
                <seekbar-layout w="*" h="auto" text="0 R*值" max="10.0" sum="1.0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="1 G*值" max="10.0" sum="0.0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="2 B*值" max="10.0" sum="0.0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="3 A*值" max="10.0" sum="0.0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="4 C+值" max="255" sum="0" onClick="MyView"/>
            </vertical>
            <vertical bg="#e0e0e0" margin="5">
                <text text="G绿色通道最大不超过255" textSize="17" gravity="center"w="*"/>
                <seekbar-layout w="*" h="auto" text="5 R*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="6 G*值" max="10.0" sum="1" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="7 B*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="8 A*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="9 C+值" max="255" sum="0" onClick="MyView"/>
            </vertical>
            <vertical bg="#e0e0e0" margin="5">
                <text text="B蓝色通道最大不超过255" textSize="17" gravity="center"w="*"/>
                <seekbar-layout w="*" h="auto" text="10 R*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="11 G*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="12 B*值" max="10.0" sum="1" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="13 A*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="14 C+值" max="255" sum="0" onClick="MyView"/>
            </vertical>
            <vertical bg="#e0e0e0" margin="5">
                <text text="A透明通道最大不超过255" textSize="17" gravity="center"w="*"/>
                <seekbar-layout w="*" h="auto" text="15 R*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="16 G*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="17 B*值" max="10.0" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="18 A*值" max="10.0" sum="1" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="19 C+值" max="255" sum="0" onClick="MyView"/>
            </vertical>
                <text w="*" text="应该还有别的方法吧，我不管了" textSize="17" gravity="center"margin="10"/>
            </vertical>
        </scroll>
    </vertical>
);

var mBitmap;
threads.start(function(){
    try{
var url = "https://www.autojs.org/assets/uploads/files/1540386817060-918021-20160416200702191-185324559.jpg";
var img=images.load(url);

mBitmap=img.getBitmap();
}catch(e){
    toastLog("图片加载失败，网络未连接\n或修改代码加载本地");

    };
}).join();
if(!mBitmap){
    exit();
};
//黑色画笔。
var paint = new Paint;
//paint.setTextAlign(Paint.Align.CENTER);
//paint.setStrokeWidth(2);
//paint.setStyle(Paint.Style.STROKE);
//paint.setStyle(Paint.Style.FILL);
//paint.setARGB(255, 0, 0, 0);
//paint.setColor(colors.GRAY);
//paint.setTextSize(75);


var canvasRect = new android.graphics.RectF;
var canvasMatrix = new android.graphics.Matrix;
ui.canvas.post(function() {
    let v = ui.canvas;
    //var rect=new android.graphics.Rect;
    //ui.canvas.getBoundsOnScreen(canvasRect);
    let w = v.getWidth(),
        h = v.getHeight();
    canvasRect.set(new android.graphics.RectF(0, 0, w, h));
    if(mBitmap){
    canvasMatrix.setRectToRect(new android.graphics.RectF(0, 0, mBitmap.getWidth() , mBitmap.getHeight()), new android.graphics.RectF(canvasRect), android.graphics.Matrix.ScaleToFit.START);
    }else{
       ui.finish();
    };
});

var ColorMatrixAry=[1,0,0,0,0 ,0,1,0,0,0 ,0,0,1,0,0 ,0,0,0,1,0];

ui.canvas.on("draw",function(canvas){
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127)
    canvas.setMatrix(canvasMatrix);
    paint.setColorFilter(new ColorMatrixColorFilter(new ColorMatrix(ColorMatrixAry))); //蓝色通道输出
    if(mBitmap){
    canvas.drawBitmap(mBitmap, 0, 0, paint);
    };
});


function MyView(view, value){
        var index = parseInt(view.getText());
        ColorMatrixAry[index]=value;

    };

