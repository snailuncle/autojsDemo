"ui";

/*
本文主要介绍了。bitmap的getPixels 各参数的作用。
参数
pixels 接收位图颜色值的数组
offset 写入到pixels[]中的第一个像素索引值
stride pixels[]中的行间距个数值(必须大于等于位图宽度)。可以为负数
x 　从位图中读取的第一个像素的x坐标值。
y 从位图中读取的第一个像素的y坐标值
width 　　从每一行中读取的像素宽度
height 　　　读取的行数 
异常
IilegalArgumentExcepiton 如果x，y，width，height越界或stride的绝对值小于位图宽度时将被抛出。
ArrayIndexOutOfBoundsException 如果像素数组太小而无法接收指定书目的像素值时将被抛出。

*/

/*
var x=0,y=0;
var width=W/2,height=H/2;
//坐标宽高的区域。
var offset=0,stride=width;
//从数组的索引offset处开始写入。偏移stride个空位写入一行
var length=offset+stride*height;

 var pixels = util.java.array("int",length );
//log(bitmap.getPixels.toString());
bitmap.getPixels(pixels,offset,stride,x,y,width,height);
//log(Bitmap.createBitmap.toString());
//log(pixels);

var bitmap2=Bitmap.createBitmap(pixels,width,length/width,Bitmap.Config.ARGB_8888);
*/



importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Paint);
importClass(android.graphics.Bitmap);



var SeekBarLayout = (function() {
    util.extend(SeekBarLayout, ui.Widget);

    function SeekBarLayout() {
        ui.Widget.call(this);
        this.Magnification = 1;
        this.Difference = 0;
        this.defineAttr("text", (view, attr, value, defineSetter) => {
            view._text.setText(String(value));
        });
        this.defineAttr("range", (view, attr, value, defineSetter) => {
            value = String(value);
            let ary = String(value).split(" ");
            let ASumStr = ary[0];
            let BSumStr = ary[1];

            let AMinSum = parseFloat(ASumStr);
            let AMaxSum = parseFloat(ASumStr.replace(".", ""));
            let A_M = AMaxSum / AMinSum;

            let BMinSum = parseFloat(BSumStr);
            let BMaxSum = parseFloat(BSumStr.replace(".", ""));
            let B_M = BMaxSum / BMinSum;

            this.Magnification = A_M >= B_M ? A_M : B_M;

            let MinSum = AMinSum <= BMinSum ? AMinSum : BMinSum;
            let MaxSum = AMinSum <= BMinSum ? BMinSum : AMinSum;
            let MinSumStr = AMinSum <= BMinSum ? ASumStr : BSumStr;
            let MaxSumStr = AMinSum <= BMinSum ? BSumStr : ASumStr;

            this.Difference = MinSum;

            view._Duration_Min.setText(MinSumStr);
            view._Duration_Max.setText(MaxSumStr);
            view._Duration_seekbar.setMax(this.Magnification * (MaxSum - MinSum));
        });
        this.defineAttr("sum", (view, attr, value, defineSetter) => {
            let Sum = parseFloat(String(value));
            view._CurrentDuration.setText(String(value));
            let _Sum = this.Magnification * (Sum - this.Difference);
            view._Duration_seekbar.setProgress(_Sum);
        });
        this.defineAttr("onChang", (view, attr, value, defineSetter) => {
            var _myFun = eval(value);
            view._Duration_seekbar.setOnSeekBarChangeListener({
                onProgressChanged: (seekBar, progress, fromUser) => {
                    view._CurrentDuration.setText(String(Math.floor((progress / this.Magnification + this.Difference) * 100) / 100));
                    if (fromUser) {
                        _myFun(view._text, Math.floor(progress / this.Magnification + this.Difference));
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
                            <text id="_text"  w="auto" text="A" textSize="15"gravity="center" layout_gravity="center"/>
                            <frame w="*">
                                <text id="_Duration_Min" w="auto" text="0"margin="10 0 0 0" gravity="center" layout_gravity="left"/>
                                <text id="_CurrentDuration" w="auto" text="0"margin="0 0 0 0" gravity="center" layout_gravity="center"/>
                                <text id="_Duration_Max" w="auto" text="0"margin="0 0 10 0" gravity="center" layout_gravity="right"/>
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
                    <text id="text" text="参数正确" textSize="10" w="*"h="30"/>
        <scroll layout_weight="1">
            <vertical margin="5">
                <vertical bg="#e0e0e0" margin="5">
                    <text text="就下面这6道参数" textSize="17" gravity="center"w="*"/>
                    <seekbar-layout id="s1" w="*" h="auto" text="offset" range="0 {{w}}" sum="1" onChang="setOffset"/>
                    <seekbar-layout id="s2" w="*" h="auto" text="stride" range="{{w}} {{w*2}}" sum="{{w}}" onChang="setStride"/>
                    <seekbar-layout id="s3" w="*" h="auto" text="x" range="0 {{w}}" sum="0" onChang="setX"/>
                    <seekbar-layout id="s4" w="*" h="auto" text="y" range="0 {{w}}" sum="0" onChang="setY"/>
                    <seekbar-layout id="s5" w="*" h="auto" text="width" range="0 {{w}}" sum="{{w}}" onChang="setWidth"/>
                    <seekbar-layout id="s6" w="*" h="auto" text="height" range="0 {{w}}" sum="{{w}}" onChang="setHeight"/>
                </vertical>
            </vertical>
        </scroll>
    </vertical>
);

var offset,stride,x,y,width,height;

var MainImg;
var MainBitmap;
var imgBitmap;

var url = "https://www.autojs.org/assets/uploads/files/1540386817060-918021-20160416200702191-185324559.jpg";
//黑色画笔。
var paint = new Paint;
var paint1 = new Paint;
paint1.setTextSize(75);
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
    threads.start(function(){
    MainImg=images.load(url);
    MainBitmap=MainImg.getBitmap();
    let v = ui.canvas;
    //var rect=new android.graphics.Rect;
    //ui.canvas.getBoundsOnScreen(canvasRect);
    let w = v.getWidth(),
        h = v.getHeight();
    canvasRect.set(new android.graphics.RectF(0, 0, w, h));
    if (MainImg) {
        canvasMatrix.setRectToRect(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()), new android.graphics.RectF(canvasRect), android.graphics.Matrix.ScaleToFit.CENTER);
    }else{
        toastLog("加载图片失败");
        ui.finish();
    };
    
    let W=MainImg.width,H=MainImg.height
    offset=0;
    stride=W;
    x=0;
    y=0;
    width=W;
    height=H;
    
  var length=offset+stride*height;

 var pixels = util.java.array("int",length );
//log(bitmap.getPixels.toString());
MainBitmap.getPixels(pixels,offset,stride,x,y,width,height);
//log(Bitmap.createBitmap.toString());
//log(pixels);

imgBitmap=Bitmap.createBitmap(pixels,width,length/width,Bitmap.Config.ARGB_8888);
  
    ui.run(()=>{
       ui.s1.attr("range","0 "+W);
       ui.s1.attr("sum","0");
       ui.s2.attr("range","0 "+W*2);
       ui.s2.attr("sum",""+W);
       ui.s3.attr("range","0 "+W);
       ui.s3.attr("sum","0");
       ui.s4.attr("range","0 "+H);
       ui.s4.attr("sum","0");
       ui.s5.attr("range","0 "+W);
       ui.s5.attr("sum",""+W);
       ui.s6.attr("range","0 "+W);
       ui.s6.attr("sum",""+H);
     });
    });
});


var ASX=new XYToMatrix(null,2);

ui.canvas.setOnTouchListener(ASX.touchListener);
ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127)
    if (MainImg) {
        canvas.drawImage(MainImg, 0, 0, paint1);
        if(imgBitmap){
        
        let matrix=new android.graphics.Matrix(canvasMatrix);;
        matrix.postConcat(ASX.matrix);
        canvas.setMatrix(matrix);
        canvas.drawBitmap(imgBitmap, 0, 0, paint);
        };
    }else{
        canvas.drawText("请等待加载图片",0,h/2,paint1);
    };
});


function setOffset(T,value){
   offset=value; 
   newBit();
};
function setStride(T,value){
   stride=value; 
   newBit();
};
function setX(T,value){
   x=value; 
   newBit();
};
function setY(T,value){
   y=value; 
   newBit();
};
function setWidth(T,value){
   width=value; 
   newBit();
};
function setHeight(T,value){
   height=value; 
   newBit();
};



function newBit() {
    
var length=offset+stride*height;

 var pixels = util.java.array("int",length );
//log(bitmap.getPixels.toString());
try{
MainBitmap.getPixels(pixels,offset,stride,x,y,width,height);
//log(Bitmap.createBitmap.toString());
//log(pixels);

imgBitmap=Bitmap.createBitmap(pixels,width,length/width,Bitmap.Config.ARGB_8888);
   ui.run(()=>{
       ui.text.setText("参数正确");
       ui.text.setTextColor(colors.parseColor("#00ff00"));
   }); 
}catch(e){
   ui.run(()=>{
       ui.text.setText(""+e);
       ui.text.setTextColor(colors.parseColor("#ff0000"));
   }); 
};
};





function XYToMatrix(matrix, maxPoints) {
    this.matrix = matrix||new android.graphics.Matrix;
    this.invertMatrix=new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.maxPoints = maxPoints||2;
    this.maxPointsListener = function(){
    this.matrix = new android.graphics.Matrix;
        
    };
    this.Touch = {
        Matrix: this.matrix, 
        PointStart: new Array,
        PointCurrent: new Array,

    };
    this.touchListener = new android.view.View.OnTouchListener((view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.maxPointsListener(view, event);
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.invertMatrix);
                        //反矩阵
                    } catch (e) {
                        throw "MOVE " + e;
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.matrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                throw "DOWN " + e;
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。
                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.maxPointsListener(view, event);
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.invertMatrix);
                                //反矩阵
                            } catch (e) {
                                throw "P_DOWN " + e;
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                throw "P_UP " + e;
                            };
                            break;
                    };
            };
        } catch (e) {
            throw "imgTouch: " + e;
        };

        return true;

    });
};
