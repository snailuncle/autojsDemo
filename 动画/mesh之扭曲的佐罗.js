/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   canvas.drawBitmapMesh的demo
 * 说明:   用手指触摸即可看到效果
 */
'ui';
importClass(android.graphics.Bitmap)
importClass(java.io.FileOutputStream)
importClass(java.io.File)
importClass(android.graphics.Bitmap)
importClass(android.graphics.Paint)
importClass(android.graphics.Path)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.PorterDuff)
importClass(android.graphics.RectF)
ui.layout(
  <vertical>
    <frame margin= '6 6 6 6' >
      <canvas id='board' ></canvas>
    </frame>
  </vertical>
)

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
    mOutterImg = images.read(imgPath)
    var myImg = images.read(imgPath)
    var myImgBitmap = myImg.getBitmap()
    var myBitmap = Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
    var myCanvas = new Canvas(myBitmap);
    myCanvas.drawImage(myImg, 0, 0, 1000, 1000, null)
    var verts = null;
    var orig = null;
    var HEIGHT = 20
    var WIDTH = 22
    var COUNT = (WIDTH + 1) * (HEIGHT + 1);
    ui.post(
      function () {
        init(myBitmap)
        ui.board.on('draw', function (canvas) {
          canvas.drawARGB(255, 127, 127, 127);
          canvas.drawBitmapMesh(myBitmap, WIDTH, HEIGHT, verts, 0, null, 0, null);
        })
      }, 100
    )

    function init(myBitmap) {
      var w = myBitmap.getWidth()
      var h = myBitmap.getHeight()
      log(w, h)
      verts = new Array(COUNT * 2)
      orig = new Array(COUNT * 2)
      var index = 0
      for (var y = 0; y <= HEIGHT; y++) {
        var fy = (h / HEIGHT) * y;
        for (x = 0; x <= WIDTH; x++) {
          var fx = (w / WIDTH) * x;
          //用数组保存坐标点fx , fy
          orig[index * 2 + 0] = verts[index * 2 + 0] = fx;
          orig[index * 2 + 1] = verts[index * 2 + 1] = fy;
          index++;
        }
      }
    }

    function a(view) {
      myCanvas.drawBitmapMesh(myBitmap, WIDTH, HEIGHT, verts, 0, null, 0, null);
    }
    ui.board.setOnTouchListener(function (view, event) {
      action = event.getAction();
      x = event.getX();
      y = event.getY();
      warp(x, y, view)
      return true;
    });
    //工具方法，用于根据触摸事件的位置计算verts数组里各元素的值
    function warp(cx, cy, view) {
      log(cx, cy)
      for (var i = 0; i < COUNT * 2; i += 2) {
        dx = cx - orig[i + 0];
        dy = cy - orig[i + 1];
        dd = dx * dx + dy * dy;
        //计算每个座标点与当前点（cx、cy）之间的距离
        d = Math.sqrt(dd);
        //计算扭曲度，距离当前点（cx、cy）越远，扭曲度越小
        pull = 80000 / ((dd * d));
        //对verts数组（保存bitmap上21 * 21个点经过扭曲后的座标）重新赋值
        if (pull >= 1) {
          verts[i + 0] = cx;
          verts[i + 1] = cy;
        } else {
          //控制各顶点向触摸事件发生点偏移
          verts[i + 0] = orig[i + 0] + dx * pull;
          verts[i + 1] = orig[i + 1] + dy * pull;
        }
      }
      //通知View组件重绘
      // invalidate();
      view.invalidate();
    }
  }
)
