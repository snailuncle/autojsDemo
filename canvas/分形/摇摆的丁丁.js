/**
 * 原文链接: https://blog.csdn.net/zzy1078689276/article/details/46042627
 * 翻译:  家
 * QQ:   203118908
 */


"ui";
ui.layout(
    <vertical>
        <canvas id="board" layout_weight="1"/>
    </vertical>
);
//线程
var t; //  private Thread
//弧度
PI = Math.PI / 180; // private static final double
//图片
offScreenImage = null; // Image
//绘图
offScreenBuffer = null; // Graphics
//定义绘图域的宽和高
width = 600, height = 600;
//判断状态
dstatus = true;
//设定初始值
D = -100, K = 400;
var myPaint = new Paint();
myPaint.setColor(colors.RED);
myPaint.setStrokeWidth(5);
ui.board.on("draw", function(canvas) {
  canvas.drawColor(colors.BLACK);
  javaPaint(canvas,myPaint)
});
// g是canvas
//开始绘图  g  Graphics
function javaPaint(g,myPaint) {
  myPaint.setColor(rndColor());
  //枝条的左右摆幅
  if (dstatus) {
    D += 2;
    if (D >= 10) {
      dstatus = false;
    }
  } else {
    D -= 2;
    if (D <= -10) {
      dstatus = true;
    }
  }
  //摆动的速率
  if (K < 6) {
    K += 8;
  }
  //清空绘图区域
  // offScreenBuffer.clearRect(0, 0, width, height);
  //绘图方法
  // drawSilkTreeLeaf(g, 520, 666, 60, 27, K, D,myPaint);
  drawSilkTreeLeaf(g, 220, 350, 30, 270, K, D,myPaint);
  //绘图
}
//绘图方法  Graphics g,double x,double y,double L,double a,float K,float D
function drawSilkTreeLeaf(g, x, y, L, a, K, D) {
  var x1, y1, x2, y2, x1L, y1L, x1R, y1R, x2L, y2L, x2R, y2R;
  if (L > 2) {
    //主干
    x2 = x + L * Math.cos(a * PI);
    y2 = y + L * Math.sin(a * PI);
    //左上侧树枝
    x2L = x2 + L / 3 * Math.cos((a - K) * PI);
    y2L = y2 + L / 3 * Math.sin((a - K) * PI);
    //右上侧树枝
    x2R = x2 + L / 3 * Math.cos((a + K) * PI);
    y2R = y2 + L / 3 * Math.sin((a + K) * PI);
    //主干较短
    x1 = x + L / 3 * Math.cos(a * PI);
    y1 = y + L / 3 * Math.sin(a * PI);
    //左下侧树枝
    x1L = x1 + L / 3 * Math.cos((a - K) * PI);
    y1L = y1 + L / 3 * Math.sin((a - K) * PI);
    //右下侧树枝
    x1R = x1 + L / 3 * Math.cos((a + K) * PI);
    y1R = y1 + L / 3 * Math.sin((a + K) * PI);
    // g.setColor(Color.blue);
    //画出枝条
    // log(g)
    g.drawLine(x, y, x2, y2,myPaint);
    g.drawLine(x2, y2, x2L, y2L,myPaint);
    g.drawLine(x2, y2, x2R, y2R,myPaint);
    g.drawLine(x, y, x1, y1,myPaint);
    g.drawLine(x1, y1, x1L, y1L,myPaint);
    g.drawLine(x1, y1, x1R, y1R,myPaint);
    //迭代绘图
    drawSilkTreeLeaf(g, x2, y2, L / 11, a + D, K, D);
    drawSilkTreeLeaf(g, x2L, y2L, L / 30, a - K, K, D);
    drawSilkTreeLeaf(g, x2R, y2R, L / 60, a + K, K, D);
    drawSilkTreeLeaf(g, x1L, y1L, L / 3, a - K, K, D);
    drawSilkTreeLeaf(g, x1R, y1R, L / 6, a + K, K, D);
  }
}
function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}
