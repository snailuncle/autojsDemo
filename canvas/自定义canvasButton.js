/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  自定义一个canvas控件,可以显示任何东西,只要你能用canvas画出来
 *
 */

"ui";
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.Paint)
importClass(android.graphics.Bitmap)
importClass(android.graphics.PorterDuff)


var url = 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g1/M0B/0F/01/Cg-4jlSjXM6IGISwAARqzSkXVr0AAPpqwHgGlYABGrl783.jpg'
imgPath = '/sdcard/m.png'


http.get(
  url, {},
  function (res, err) {
    if (err) {
      console.error(err);
      return;
    }
    log("code = " + res.statusCode);
    files.writeBytes(imgPath, res.body.bytes())
  }
)







var CanvasButton = (function() {
    //继承ui.Widget
    util.extend(CanvasButton, ui.Widget);
    this.color=[127,127,127]
    that=this.color
    log('this.color[0], this.color[1], this.color[2]')
    log(this.color[0], this.color[1], this.color[2])

    function CanvasButton() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义按钮颜色
        this.defineAttr("color", (view, name, defaultGetter) => {
            return this._color;
        }, (view, name, value, defaultSetter) => {
            this._color = value;
            view.attr("backgroundTint", value);

        });

    }




    this.canvasWidth='800'
    this.canvasHeight='800'

    CanvasButton.prototype.render = function() {
        return (
          <frame text='父窗口' id='_parent' gravity='center'>
            <canvas id='_board' w='{{this.canvasWidth}}px' h='{{this.canvasHeight}}px'  gravity='center'/>
          </frame>
        );
    }



    importClass(android.graphics.Rect)
    importClass(android.graphics.Shader)
    importClass(android.graphics.Paint)
    importClass(android.graphics.RectF)
    importClass(android.graphics.Path)
    importClass(android.graphics.LinearGradient)
    var path = new android.graphics.Path();
    var paint = new android.graphics.Paint();
    paint.setStrokeWidth(2);
    paint.setTextAlign(Paint.Align.CENTER);
    paint.setStyle(Paint.Style.FILL);
    paint.setColor(-28707)
    paint.setTextSize(100)
    // paint.setStyle(Paint.Style.STROKE);
    var bitmap = android.graphics.Bitmap.createBitmap(this.canvasWidth, this.canvasHeight, android.graphics.Bitmap.Config.ARGB_8888);
    var mcanvas = new Canvas(bitmap);

    ui.post(
      function(){
        if(ui._board){
          ui._board.on("draw", function (canvas) {
            // canvas.drawARGB(255, that[1], that[1], that[2]);
            canvas.drawARGB(255,0,255,0)
            canvas.drawBitmap(bitmap, 0, 0, paint);
          });
        }
      }
    )

    function rndShape(){

      threads.start(function () {
        asd(mcanvas);
      });
    }


    function asd(canvas) {
      // canvas.drawARGB(255, that[1], that[1], that[2]);


      clearPaint = new Paint();
      //清屏
      clearPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.CLEAR));
      canvas.drawPaint(clearPaint);

      paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC));

      // xfermode=new PorterDuffXfermode(PorterDuff.Mode.DST);


      // paint.setXfermode(new PorterDuffXfermode(Mode.DST));

      // this.canvasWidth='200'
      // this.canvasHeight='200'


      canvasWidth = canvas.getWidth();
      canvasHeight = canvas.getHeight();
      log(canvasWidth,canvasHeight)
      r = canvasWidth / 3;
      //绘制黄色的圆形
      paint.setColor(rndColor2());
      layerId = canvas.saveLayer(0, 0, canvasWidth, canvasHeight, null, android.graphics.Canvas.ALL_SAVE_FLAG);

      // canvas.drawCircle(r, r, r, paint);



      p=paint
      //所有的形状在这里改变
      function shape1(){
        log(arguments.callee.name)
        canvas.drawText("画圆：", this.canvasWidth/2, this.canvasHeight/2, p);// 画文本
      }
      function shape2(){
        log(arguments.callee.name)
        canvas.drawCircle(this.canvasWidth/2, 100, 100, p);// 小圆
      }
      function shape3(){
        log(arguments.callee.name)

        paint.setStyle(Paint.Style.FILL);
        canvas.drawCircle(this.canvasWidth/2, 300, 300, p);// 大圆
        paint.setStyle(Paint.Style.STROKE);
      }
      function shape4(){
        paint.setTextSize(100)

        log(arguments.callee.name)
        canvas.drawText("画线及弧线：", this.canvasWidth/2, 160, p);
      }
      function shape5(){
        log(arguments.callee.name)
        canvas.drawLine(30, 40, 690, 840, p);// 画线
      }
      function shape6(){
        log(arguments.callee.name)
        canvas.drawText("画矩形：", this.canvasWidth/2, this.canvasWidth/2, p);
        paint.setStyle(Paint.Style.STROKE);

        canvas.drawRect(60, 60, 666, 666, p);// 正方形
        canvas.drawRect(30, 30, 730, 555, p);// 长方形

        paint.setStyle(Paint.Style.FILL);




      }
      function shape7(){
        p.setTextSize(100)

        log(arguments.callee.name)
        canvas.drawText("画扇形和椭圆:", this.canvasWidth/2, this.canvasWidth/2, p);
        /* 设置渐变色 这个正方形的颜色是改变的 */
         mShader = new LinearGradient(0, 0, 100, 100, [rndColor2(),rndColor2(),rndColor2(),rndColor2(),rndColor2(),rndColor2()], null, Shader.TileMode.REPEAT); // 一个材质,打造出一个线性梯度沿著一条线。
        p.setShader(mShader);
        oval2 = new RectF(60, 100, 200, 240);// 设置个新的长方形，扫描测量
        paint.setStyle(Paint.Style.FILL);

        canvas.drawArc(oval2, 200, 130, true, p);
        paint.setStyle(Paint.Style.STROKE);

      }
      function shape8(){
        log(arguments.callee.name)
        canvas.drawText("画三角形：", this.canvasWidth/5*4, 200, p);
        // 绘制这个三角形,你可以绘制任意多边形
        path = new Path();
        path.moveTo(80, 200);// 此点为多边形的起点
        path.lineTo(666, 750);
        path.lineTo(580, 250);
        path.close(); // 使这些点构成封闭的多边形
        paint.setStyle(Paint.Style.FILL);
        canvas.drawPath(path, p);
        paint.setStyle(Paint.Style.STROKE);
      }
      function shape9(){
        log(arguments.callee.name)
        // 你可以绘制很多任意多边形，比如下面画六连形
        p.reset();//重置
        p.setStyle(Paint.Style.STROKE);//设置空心
        path1=new Path();
        path1.moveTo(180, 200);
        path1.lineTo(200, 300);
        path1.lineTo(210, 210);
        path1.lineTo(200, 720);
        path1.lineTo(680, 220);
        path1.lineTo(170, 610);
        path1.close();//封闭
        paint.setStyle(Paint.Style.FILL);

        canvas.drawPath(path1, p);
        paint.setStyle(Paint.Style.STROKE);

      }
      function shape10(){
        log(arguments.callee.name)
        //画图片，就是贴图
        imgPath = '/sdcard/m.png'
        mOutterImg = images.read(imgPath)
        mOutterBitmap = mOutterImg.getBitmap()
        canvas.drawBitmap(mOutterBitmap, 10,10, p);


      }



      eval('shape'+rndNum(1, 10)+'()')



      // xfermode = new PorterDuffXfermode(PorterDuff.Mode.XOR);
      // xfermode=new PorterDuffXfermode(PorterDuff.Mode.DST);
      // xfermode=new PorterDuffXfermode(PorterDuff.Mode.SRC);
      // 在Android的PorterDuff.Mode类中列举了他们制定的规则：
      // android.graphics.PorterDuff.Mode.SRC:只绘制源图像
      // android.graphics.PorterDuff.Mode.DST:只绘制目标图像
      // android.graphics.PorterDuff.Mode.DST_OVER:在源图像的顶部绘制目标图像
      // android.graphics.PorterDuff.Mode.DST_IN:只在源图像和目标图像相交的地方绘制目标图像
      // android.graphics.PorterDuff.Mode.DST_OUT:只在源图像和目标图像不相交的地方绘制目标图像
      // android.graphics.PorterDuff.Mode.DST_ATOP:在源图像和目标图像相交的地方绘制目标图像，在不相交的地方绘制源图像
      // android.graphics.PorterDuff.Mode.SRC_OVER:在目标图像的顶部绘制源图像
      // android.graphics.PorterDuff.Mode.SRC_IN:只在源图像和目标图像相交的地方绘制源图像
      // android.graphics.PorterDuff.Mode.SRC_OUT:只在源图像和目标图像不相交的地方绘制源图像
      // android.graphics.PorterDuff.Mode.SRC_ATOP:在源图像和目标图像相交的地方绘制源图像，在不相交的地方绘制目标图像
      // android.graphics.PorterDuff.Mode.XOR:在源图像和目标图像重叠之外的任何地方绘制他们，而在不重叠的地方不绘制任何内容
      // android.graphics.PorterDuff.Mode.LIGHTEN:获得每个位置上两幅图像中最亮的像素并显示
      // android.graphics.PorterDuff.Mode.DARKEN:获得每个位置上两幅图像中最暗的像素并显示
      // android.graphics.PorterDuff.Mode.MULTIPLY:将每个位置的两个像素相乘，除以255，然后使用该值创建一个新的像素进行显示。结果颜色=顶部颜色*底部颜色/255
      // android.graphics.PorterDuff.Mode.SCREEN:反转每个颜色，执行相同的操作（将他们相乘并除以255），然后再次反转。结果颜色=255-(((255-顶部颜色)*(255-底部颜色))/255)
      // paint.setXfermode(xfermode);
      //绘制蓝色的矩形
      paint.setColor(rndColor2());
      // canvas.drawRect(r, r, r * 2.7, r * 2.7, paint);
      //最后将画笔去除Xfermode
      paint.setXfermode(null);
      canvas.restoreToCount(layerId);
    }



    CanvasButton.prototype.onViewCreated = function(view) {
      view.on("click", () => {
        that=rndColor()
        rndShape()
        log(that)
        log('点击了按钮')
      });
    }




    function rndColor() {
      return [random(0, 255), random(0, 255), random(0, 255)]
    }



    function rndColor2() {
      return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
    }

    function rndNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }






    ui.registerWidget("canvas-button", CanvasButton);
    return CanvasButton;
})();

activity.window.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);//设置全屏


ui.layout(
    <vertical gravity='center' id='parent' bg='#00ff00'>
        <canvas-button text="第一个按钮" color="#ff5722"/>
    </vertical>
);





//为页面设置渐变色背景
// ui.firstpage.backgroundDrawable=GradientDrawable("TL_BR",["#81C784","#2E7D32","#2E7D32"]);



function Color(color){
  return android.graphics.Color.parseColor(color);
}







function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  log( attrs)
}
// backgroundColor
// drawingCacheBackgroundColor
