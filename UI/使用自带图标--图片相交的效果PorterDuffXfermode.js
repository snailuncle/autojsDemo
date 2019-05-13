


/**
 * 作者:   家
 * QQ:     203118908
 * 功能:    Canvas绘图之PorterDuffXfermode使用
 * 使用说明: 准备两张图片,试试PorterDuffXfermode, /sdcard/01.png, /sdcard/02.png
 */
'ui';
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.Paint)
importClass(android.view.View)
importClass(android.graphics.Bitmap)
importClass(android.graphics.PorterDuff)
importClass(android.graphics.BitmapFactory)
importClass(android.graphics.RectF)
var imgPath1='/sdcard/01.png'
var imgPath2='/sdcard/02.png'
var bitmap01 = BitmapFactory.decodeFile(imgPath1)
var bitmap02 = BitmapFactory.decodeFile(imgPath2)



ui.layout(
<vertical>
  <vertical id='parent' h='800px'w='1000px' >
    <canvas id='board' hardwareAccelerated="false"></canvas>
  </vertical>
  <seekbar id="seekbar" bg='#00eeee' margin='30 30' h='200px' w='900px'/>
  <text id='threshold' textSize='30sp'>seekBarValue=0</text>
  <vertical>
  <radiogroup id='PorterDuffXfermode'>
    <horizontal>
      <vertical>
        <radio id='SRC'  text='SRC'></radio>
        <radio id='DST'  text='DST'></radio>
        <radio  id='DST_OVER' text='DST_OVER'></radio>
        <radio  id='DST_IN' text='DST_IN'></radio>
        <radio  id='DST_OUT' text='DST_OUT'></radio>
      </vertical>
      <vertical>
        <radio  id='DST_ATOP' text='DST_ATOP'></radio>
        <radio  id='SRC_OVER' text='SRC_OVER'></radio>
        <radio  id='SRC_IN' text='SRC_IN'></radio>
        <radio  id='SRC_OUT' text='SRC_OUT'></radio>
        <radio  id='SRC_ATOP' text='SRC_ATOP'></radio>
      </vertical>
      <vertical>
        <radio  id='XOR' text='XOR'></radio>
        <radio  id='LIGHTEN' text='LIGHTEN'></radio>
        <radio  id='DARKEN' text='DARKEN'></radio>
        <radio  id='MULTIPLY' text='MULTIPLY'></radio>
        <radio  id='SCREEN' text='SCREEN'></radio>
      </vertical>
    </horizontal>
  </radiogroup>
</vertical>
</vertical>

)
var allRadio = [
  'SRC',
  'DST',
  'DST_OVER',
  'DST_IN',
  'DST_OUT',
  'DST_ATOP',
  'SRC_OVER',
  'SRC_IN',
  'SRC_OUT',
  'SRC_ATOP',
  'XOR',
  'LIGHTEN',
  'DARKEN',
  'MULTIPLY',
  'SCREEN'
]
var currentXfermode='XOR'
allRadio.map((item) => {
  var view = ui[item]
  view.setOnClickListener(
    function () {
      if (view.isChecked()) {
        currentXfermode=item
        allRadio.map((item2) => {
          if(item !== item2){
            ui[item2].setChecked(false)
          }
        })
      }
    }
  )
})


ui.seekbar.setMax(888);
var imgOffset=0
ui.seekbar.setOnSeekBarChangeListener({ 
  onProgressChanged: function (seekBar, progress, fromUser) {  
    ui.threshold.setText('seekBarValue=' + String(progress));  
    if (fromUser) {
       imgOffset=-progress
    } 
  }
});

var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
paint.setStyle(Paint.Style.FILL);
// var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
// var mcanvas = new android.graphics.Canvas(bitmap);

ui.board.on("draw", function (canvas) {
  // canvas.setLayerType(View.LAYER_TYPE_HARDWARE, null);
  // canvas.getAndroidCanvas().setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
  // android.graphics.Canvas.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
  // canvas.setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null);
  // canvas.drawBitmap(bitmap, 0, 0, paint);
  canvas.drawARGB(255, 139, 197, 186);
  // canvas.drawARGB(255, 127, 127, 127);
  canvasWidth = canvas.getWidth();
  canvasHeight = canvas.getHeight();
  layerId = canvas.saveLayer(0, 0, canvasWidth, canvasHeight, null, android.graphics.Canvas.ALL_SAVE_FLAG);
  canvas.drawBitmap(bitmap01, 0, 0, paint);
  // 设置图片相交的模式
  xfermode = eval("new PorterDuffXfermode(PorterDuff.Mode."+currentXfermode+")");
  paint.setXfermode(xfermode);
  canvas.drawBitmap(bitmap02, bitmap01.getWidth()+100+ imgOffset, 0, paint);

  paint.setXfermode(null);
  canvas.restoreToCount(layerId);

});

// xfermode=new PorterDuffXfermode(PorterDuff.Mode.SRC_IN);
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



