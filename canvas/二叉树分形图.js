/**
 * 文章链接:　https://blog.csdn.net/cc_fys/article/details/77622651
 * 翻译： 家
 * QQ:   203118908
 * 功能:　画　二叉树分形图
 */

'ui';
var marginSize = '10'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
ui.layout(
  <vertical>
    <button id='button' >button</button>
    <frame margin= '{{myMargin}}' >
      <canvas id='board'></canvas>
    </frame>
  </vertical>
)

var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(2);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
// paint.setColor(-65536)


// paint.setColor(13823224)
// paint.setStyle(Paint.Style.FILL);
paint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);







ui.board.on("draw", function (canvas) {
  canvas.drawARGB(255, 127, 127, 127);
  canvas.drawBitmap(bitmap, 0, 0, paint);




});




// path.moveTo(500,300);
// path.lineTo(378,230);
// mcanvas.drawPath(path, paint);












threads.start(function () {
  asd(mcanvas,paint,path);
});

function asd(mcanvas,paint,path) {
  var t=10
  主程序(mcanvas,paint,path,t)

}






// (3)图象缓存
// (4)程序入口
function 主程序(canvas,paint,path,t) {
// var canvas = document.getElementById('myc');
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = '#000';
// ctx.fillRect(0, 0, 1000, 1000);
// //ctx.strokeStyle='rgb(46,139,87)';
// ctx.strokeStyle = '#fff';
// drawTree(ctx, 500, 500, 200, 0.7);
// ctx.stroke();
drawTree(canvas,paint,path, 500, 500, 200, 0.7,t)
}




//x,y是初始点
//length初始树枝长度
//ratio 树枝长度与比例
//n 迭代次数
var n = 0;

function drawTree(canvas,paint,path, x, y, length, ratio,t) {
  sleep(t)

  var cross = {};
  var value = [];
  cross.x = x;
  cross.y = y - length;
  cross.arc = Math.PI / 2;
  value.push(cross);
  growBranch(canvas,paint,path, value, length * ratio, ratio,t);
}

function growBranch(canvas,paint,path, value, bralen, ratio,t) {
  sleep(t)

  n = n + 1;
  if (n == 10)
    return;
  var value1 = [];
  value.forEach(function (item, index) {
  sleep(t)

    // var arc1 = item.arc + (Math.PI * 4) / (3 * 2);
    // var arc2 = item.arc - (Math.PI * 4) / (3 * 2);

    var arc1=item.arc+(Math.PI)/(3*2);
    var arc2=item.arc-(Math.PI)/(3*2);




    //分支1
    var bx = Math.cos(arc1) * bralen;
    var by = Math.sin(arc1) * bralen;
    // log('item.x, item.y')
    // log(item.x, item.y)
    // path.reset()
    path.moveTo(item.x, item.y);
    path.lineTo(item.x + bx, item.y + by);
    var cross = {};
    cross.x = item.x + bx;
    cross.y = item.y + by;
    cross.arc = arc1;
    value1.push(cross)
    //分支2
    var bx1 = Math.cos(arc2) * bralen;
    var by1 = Math.sin(arc2) * bralen;
    path.moveTo(item.x, item.y);
    path.lineTo(item.x + bx1, item.y + by1);
    var cross1 = {};
    cross1.x = item.x + bx1;
    cross1.y = item.y + by1;
    cross1.arc = arc2;
    value1.push(cross1);
  });
  // ctx.stroke();
  canvas.drawPath(path, paint);
  growBranch(canvas,paint,path, value1, bralen * ratio, ratio,t);

}
