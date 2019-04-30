/**
 * 原文链接: https://www.cnblogs.com/miyue/p/10138253.html
 * 翻译:    家
 * QQ:      203118908
 * 备注:     为啥有白色?
 * 时间:     11:17
 */
'ui';
var marginSize = '10'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
ui.layout(
  <vertical>
    <canvas id='board'></canvas>
  </vertical>
)
var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(1);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
// paint.setColor(-65536)
// paint.setColor(13823224)
paint.setStyle(Paint.Style.FILL);
// paint.setStyle(Paint.Style.STROKE);
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
  asd(mcanvas, paint, path);
});
function asd(mcanvas, paint, path) {
  var c = mcanvas
  var a = paint;
  with(m = Math) C = cos, S = sin, P = pow, R = random;
  f = 500;
  h = -250;
  function p(a, b, c) {
    if (c > 60) return [S(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) - S(b) * 50, b * f + 50, 625 + C(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) + b * 400, a * 1 - b / 2, a];
    A = a * 2 - 1;
    B = b * 2 - 1;
    if (A * A + B * B < 1) {
      if (c > 37) {
        n = (j = c & 1) ? 6 : 4;
        o = .5 / (a + .01) + C(b * 125) * 3 - a * 300;
        w = b * h;
        return [o * C(n) + w * S(n) + j * 610 - 390, o * S(n) - w * C(n) + 550 - j * 350, 1180 + C(B + A) * 99 - j * 300, .4 - a * .1 + P(1 - B * B, -h * 6) * .15 - a * b * .4 + C(a + b) / 5 + P(C((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B), o / 1e3 + .7 - o * w * 3e-6]
      }
      if (c > 32) {
        c = c * 1.16 - .15;
        o = a * 45 - 20;
        w = b * b * h;
        z = o * S(c) + w * C(c) + 620;
        return [o * C(c) - w * S(c), 28 + C(B * .5) * 99 - b * b * b * 60 - z / 2 - h, z, (b * b * .3 + P((1 - (A * A)), 7) * .15 + .3) * b, b * .7]
      }
      o = A * (2 - b) * (80 - c * 2);
      w = 99 - C(A) * 120 - C(b) * (-h - c * 4.9) + C(P(1 - b, 7)) * 50 + c * 2;
      z = o * S(c) + w * C(c) + 700;
      return [o * C(c) - w * S(c), B * 99 - C(P(b, 7)) * 50 - c / 3 - z / 1.35 + 450, z, (1 - b / 1.2) * .9 + a * .1, P((1 - b), 20) / 4 + .05]
    }
  }
  setInterval(function(){
    for (i = 0; i<1e4;i++){
      if (s = p(R(), R(), i % 46/.74)) {
        z = s[2];
        x = ~~(s[0] * f / z - h);
        y = ~~(s[1] * f / z - h);
        if (!m[q = y * f + x] | m[q] > z) m[q] = z, paint.setColor(colors.rgb(~(s[3] * h), ~(s[4] * h), ~(s[3] * s[3] * -80))), mcanvas.drawCircle(x,y,  1, paint)
      }
    }
  },0)
}
