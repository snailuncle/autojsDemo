/**
 * 作者:　安安以迁迁
 * 文章链接:　https://www.jianshu.com/p/db310254f71c
 * 翻译： 家
 * QQ:   203118908
 * 功能:　画经典分形图案Mandelbrot
 */

'ui';
var marginSize = '10'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
ui.layout(
  <vertical>
    <text   textSize='30sp' gravity='center' textStyle='bold'>Mandelbrot</text>
    <text   textStyle='bold'>这是一个点一个点绘制的,实时计算</text>
    <frame margin= '{{myMargin}}' w='210px' h='155px' >
      <canvas id='board'></canvas>
    </frame>
    <scroll>
      <vertical>
        <text textSize='18sp' id='introduction' />
        <img src='https://dwz.cn/myc9wAmj' />
        <img src='https://dwz.cn/Kc2LnC8o' />
        <img src='https://dwz.cn/DSn4Yqi1' />
        <img src='https://dwz.cn/L7Dj4yPr' />
        <img src='https://dwz.cn/EiPbcx19' />
        <img src='https://dwz.cn/K4JOCMBd' />
        <text textSize='50sp' gravity='center' >到底了</text>
      </vertical>
    </scroll>
  </vertical>
)
var introduction='    曼德博集合（Mandelbrot Set）是一个在复平面上的点集。有人认为 Mandelbrot 集合是“人类有史以来做出的最奇异、最瑰丽的几何图形”，曾被称为“上帝的指纹”。\n\n    Mandelbrot 集合是一个分形（fractal），将它无限放大都能够有精妙的细节在内，而这瑰丽的图案仅仅由一个简单的公式生成。\n\n    Mandelbrot 集合的定义是由法国数学家 Adrien Douady 做出的，而它的命名则是为了纪念被称为“分形学之父”的 Benoit Mandelbrot。'
ui.introduction.setText(introduction)
// (1)可调参数
ESCAPERADIUS = 4.0;
MAXITERNUMBER = 100;
// -0.743030 + 0.126433i @ 0.016110 /0.75
OX = -0.743030;
OY = 0.126433;
WIDTH = 0.016110;
RATIO = 0.75;
IMAGEWIDTH = 200;  // 这是图片宽度   高度由宽度乘以系数决定RATIO
// (2)计算所得参数
IMAGEHEIGHT = (IMAGEWIDTH * RATIO);
PIXELSIZE = WIDTH / IMAGEWIDTH;
COFFSET = IMAGEWIDTH % 2 == 0 ? (IMAGEWIDTH / 2) - 0.5 : (IMAGEWIDTH / 2);
ROFFSET = IMAGEHEIGHT % 2 == 0 ? (IMAGEHEIGHT / 2) - 0.5 : (IMAGEHEIGHT / 2);
var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
// paint.setColor(13823224)
paint.setStyle(Paint.Style.FILL);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);
ui.board.on("draw", function (canvas) {
  canvas.drawARGB(255, 127, 127, 127);
  canvas.drawBitmap(bitmap, 0, 0, paint);
});
threads.start(function () {
  asd(mcanvas);
});

function asd(mcanvas) {

  主程序(mcanvas,paint)

}






// (3)图象缓存
// (4)程序入口
function 主程序(canvas,paint) {
  draw(canvas,paint);
}

function draw(canvas,paint) {
  log('开始循环')
  for (row = 0; row < IMAGEHEIGHT; row++) {
    for (col = 0; col < IMAGEWIDTH; col++) {
      color = calcColor(col, row);
      drawColor(col, row, color,canvas,paint);
    }
  }
  log('循环完毕')
}
  // (6)计算颜色
  function calcColor(col, row) {
    cx = (col - COFFSET) * PIXELSIZE + OX;
    cy = (row - ROFFSET) * PIXELSIZE + OY;
    d = iter(cx, cy);
    return getColor(d);
  }

  // (7)迭代计算
  function iter(cx, cy) {
    x = 0;
    y = 0;
    newx = null;
    newy = null;
    smodz = 0;
    i = 0;
    while (i < MAXITERNUMBER) {
      newx = x * x - y * y + cx;
      newy = 2 * x * y + cy;
      x = newx;
      y = newy;
      i++;
      smodz = x * x + y * y;
      if (smodz >= ESCAPERADIUS) {
        d = i + 1 - Math.log(Math.log(smodz) * 0.5) / Math.log(2);
        return d;
      }
    }
    return -1.0;
  }
  // (8)调色盘
  function getColor(d) {
    if (d >= 0) {
      k = 0.021 * (d - 1 + Math.log(Math.log(128)) / Math.log(2));
      k = Math.log(1 + k) - 29.0 / 400;
      k = k - Math.floor(k);
      k *= 400;
      if (k < 63.0) {
        return interpolation(k / 63.0, 0x000764, 0x206BCB);
      } else if (k < 167.0) {
        return interpolation((k - 63.0) / (167.0 - 63.0), 0x206BCB, 0xEDFFFF);
      } else if (k < 256.0) {
        return interpolation((k - 167.0) / (256.0 - 167.0), 0xEDFFFF, 0xFFAA00);
      } else if (k < 342.0) {
        return interpolation((k - 256.0) / (342.0 - 256.0), 0xFFAA00, 0x310230);
      } else {
        return interpolation((k - 342.0) / (400.0 - 342.0), 0x310230, 0x000764);
      }
    } else {
      return 0x000000;
    }
  }

  function interpolation(f, c0, c1) {
    r0 = (c0 >> 16) & 0xFF;
    g0 = (c0 >> 8) & 0xFF;
    b0 = c0 & 0xFF;
    r1 = (c1 >> 16) & 0xFF;
    g1 = (c1 >> 8) & 0xFF;
    b1 = c1 & 0xFF;
    r = ((1 - f) * r0 + f * r1 + 0.5);
    g = ((1 - f) * g0 + f * g1 + 0.5);
    b = ((1 - f) * b0 + f * b1 + 0.5);
    return (r << 16) | (g << 8) | b;
  }
  // (9)在图像像素(col, row)处画上颜色rgb
  function drawColor(col, row, rgb,canvas,paint) {
    rgb=colors.parseColor(colors.toString(rgb))
    paint.setColor(rgb)
    var x=col
    var y=IMAGEHEIGHT - row - 1
    canvas.drawCircle(x,y,  1, paint)







  }
