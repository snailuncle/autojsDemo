/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   阿基米德螺线?
 */
'ui';
ui.layout(
  <vertical>
    <vertical id='parent'>
      <canvas id='board'></canvas>
    </vertical>
  </vertical>
)
var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
paint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);
ui.board.on("draw", function (canvas) {
  canvas.drawBitmap(bitmap, 0, 0, paint);
});
threads.start(function () {
  asd(mcanvas);
});

function asd(canvas) {
  canvas.drawARGB(0, 123, 104, 238);
  path.reset();
  origin = {
    x: 0,
    y: 0
  };
  origin.x = 600;
  origin.y = 600;
  path.moveTo(origin.x, origin.y);
  var point = {};
  var 线速度 = 3
  var 角速度 = 66
  var t = 1
  var width = device.width * 2
  log(width)
  var limit=330
  count=0
  setTimeout(
    function(){
      其他附加效果(canvas)
    },1000
  )
  while (count < limit) {
    point.x = 线速度 * t * Math.cos(角速度 * t) + origin.x;
    point.y = 线速度 * t * Math.sin(角速度 * t) + origin.y;
    path.lineTo(point.x, point.y)
    canvas.drawPath(path, paint);
    // log(point)
    sleep(15)
    t++;
    count++;
  }

}


function 其他附加效果(canvas){

  转转转(ui.parent)
}

function 转转转(view){
  // 设置旋转动画
  var tranfrom = new android.view.animation.RotateAnimation(0, 359, android.view.animation.Animation.RELATIVE_TO_SELF, 0.5, android.view.animation.Animation.RELATIVE_TO_SELF, 0.5); //(359:旋转角度（可自调），若为360会有卡顿，正数为顺势针旋转，负数为逆时针)
  tranfrom.setDuration(200); // 旋转速度
  tranfrom.setFillAfter(true);
  tranfrom.setRepeatCount(-1); // －1为一只旋转，若10，则旋转10次设定的角度后停止
  tranfrom.setInterpolator(new android.view.animation.LinearInterpolator());//匀速插值器 解决卡顿问题
  // tranfrom.cancel();  // 取消动画
  view.setAnimation(tranfrom);
}
