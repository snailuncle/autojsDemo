/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   canvas.drawBitmap 调整rect达到平移或者收缩的效果
 * 说明:　使用的方法 canvas.drawBitmap(myImgBitmap, mSrcRect, mDestRect, mBitPaint);
 * 备注:   这个demo一共两种效果,收缩和平移,点击屏幕就可看到效果
 */
'ui';
// var 展示效果='平移'
var 展示效果='收缩'
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.graphics.Bitmap)
importClass(android.animation.ValueAnimator)
importClass(java.util.Random)
importClass(java.io.FileOutputStream)
importClass(java.io.File)
importClass(android.graphics.Bitmap)
importClass(android.graphics.Paint)
importClass(android.graphics.Path)
importClass(android.graphics.Rect)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.PorterDuff)
importClass(android.graphics.RectF)
var marginSize = '30'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
ui.layout(
  <vertical>
    <button id='button' >button</button>
    <frame margin= '{{myMargin}}' >
      <canvas id='board'></canvas>
    </frame>
  </vertical>
)
var view = ui.board
var myPaint;
var myCanvas;
var myBitmap;
var width;
var height;
var mBitWidth;
var mBitHeight;
var mBitmap;
var mBitPaint;
var myImgBitmap;
var imgPath;
var myImg;

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
    ui.post(
      function () {
        init()
        midware()
        main()
      }, 100
    )
  }
)





function main() {
  ui.board.on('draw', function (canvas) {
    canvas.drawARGB(255, 127, 127, 127);

    canvas.drawBitmap(myImgBitmap, mSrcRect, mDestRect, mBitPaint);
  })
}

function midware() {
  mSrcRect = new Rect(0, 0, mBitWidth, mBitHeight);
  log('width  height')
  log(width, height)
  // 计算左边位置
  var left = width / 2 - mBitWidth / 2;
  // 计算上边位置
  var top = height / 2 - mBitHeight / 2;
  log('left  top')
  log(left, top)
  mDestRect = new Rect(left, top, left + mBitWidth, top + mBitHeight);
}

function init() {
  myPaint = new Paint();
  设置画笔属性(myPaint)
  width = view.getWidth()
  height = view.getHeight()
  myBitmap = Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
  myCanvas = new Canvas(myBitmap);
  mBitmap = myBitmap
  mBitPaint = myPaint
  imgPath = '/sdcard/m.png'
  myImg = images.read(imgPath)
  myImgBitmap = myImg.getBitmap()
  mBitWidth = myImgBitmap.getWidth()
  mBitHeight = myImgBitmap.getHeight()
}

function 设置画笔属性(myPaint) {
  myPaint.setColor(rndColor());
  myPaint.setAntiAlias(true);
  myPaint.setDither(true);
  myPaint.setStrokeJoin(Paint.Join.ROUND);
  myPaint.setStrokeCap(Paint.Cap.ROUND);
  myPaint.setStyle(Paint.Style.FILL);
  myPaint.setTextSize('333');
  myPaint.setTextAlign(Paint.Align.CENTER);
}

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * 移动位图
 *
 * @param startLeft 起始左边距
 * @param startTop 起始距上边距离
 * @param toLeft 到达左边距
 * @param toTop 到达上边距
 * @param duration 时长
 */
// int startLeft, int startTop, int toLeft, int toTop, long duration
function startTranslate(startLeft, startTop, toLeft, toTop, duration) {
  mStartLeft = startLeft;
  mStartTop = startTop;
  mToLeft = toLeft;
  mToTop = toTop;
  // 使用ValueAnimator创建一个过程
  valueAnimator = ValueAnimator.ofFloat(0, 1);
  valueAnimator.setDuration(duration);
  valueAnimator.setInterpolator(new AccelerateInterpolator());
  valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
    onAnimationUpdate: (animator) => {
      // 不断重新计算上下左右位置
      fraction = animator.getAnimatedValue();
      currentLeft = ((mToLeft - mStartLeft) * fraction + mStartLeft);
      currentTop = ((mToTop - mStartTop) * fraction + mStartTop);
      if (mDestRect == null) {
        mDestRect = new Rect(currentLeft, currentTop, currentLeft + mBitWidth,
          currentTop + mBitHeight);
      }
      mDestRect.left = currentLeft;
      mDestRect.right = currentLeft + mBitWidth;
      mDestRect.top = currentTop;
      mDestRect.bottom = currentTop + mBitHeight;
      // 重绘
      // postInvalidate();
      view.invalidate();

    }
  }));
  valueAnimator.start();
}


ui.board.setOnTouchListener(function (view, event) {
  action = event.getAction();
  x = event.getX();
  y = event.getY();
  random = new Random();
  startLeft = random.nextInt(200);
  startTop = random.nextInt(250);
  toLeft = random.nextInt(550) + 200;
  toBottom = random.nextInt(1000) + 250;
  if(展示效果=='平移'){
    startTranslate(startLeft, startTop, toLeft, toBottom, 1000);
  }else{
    startScale( 1000)
  }
  // view.invalidate();
  return true;
});




function startScale( duration) {

  // 使用ValueAnimator创建一个过程
  valueAnimator = ValueAnimator.ofFloat(1, 0);
  valueAnimator.setDuration(duration);
  valueAnimator.setInterpolator(new AccelerateInterpolator());
  valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener(


  {
      onAnimationUpdate:( animator) =>{
          // 不断重新计算上下左右位置
           fraction =  animator.getAnimatedValue();
          if (mDestRect == null) {
              mDestRect = new Rect(0, 0, mBitWidth,
                      mBitHeight);
          }
          mDestRect.right =  (fraction * mBitWidth);
          // 重绘
          view.invalidate();
      }
  }
  )

  );
  valueAnimator.start();
}
