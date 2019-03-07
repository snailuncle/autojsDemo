/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  显示你的手势
 */

画坐标操作 = function (duration, xyArr) {
  log('duration=',duration)
  if(xyArr.length<10){
    log('xyArr=',xyArr)
  }else{
    log('xyArr.length=',xyArr.length)
  }
  var 多于多少个压缩数组=200

  var path = new android.graphics.Path();
  var window, paint, bitmap, bitmapCanvas;
  var duration = duration || 2000
  function 创建悬浮窗() {
    window = floaty.rawWindow( <canvas id = "board"
      h = "{{device.height}}"
      w = "{{device.width}}" />
    );
    // setInterval(() => {}, 3000)
    window.setSize(device.width, device.height)
    window.setTouchable(false);
    // window.setPosition(0, 110)
    // var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
    bitmap = android.graphics.Bitmap.createBitmap(device.width, device.height, android.graphics.Bitmap.Config.ARGB_8888);
    bitmapCanvas = new Canvas(bitmap);
    paint = new Paint()
    paint.setStrokeWidth(20);
    var color = '#ff0000'
    color = colors.parseColor(color)
    paint.setColor(color)
    paint.setStyle(Paint.Style.STROKE);
    paint.setTextAlign(Paint.Align.CENTER);
    paint.setTextSize(35);
    window.board.on("draw", function (canvas) {
      canvas.drawBitmap(bitmap, 0, 0, paint);
    });
  }
  function showView(xyArr) {
    创建悬浮窗()
    var originalStrokeWidth = paint.getStrokeWidth()
    var originalColor = paint.getColor()
    // var rndColor = getRndColor()
    // var color = colors.parseColor(rndColor)
    // paint.setColor(color)
    paint.setStrokeWidth(20)
    画xyArr(duration, xyArr)
    paint.setColor(originalColor)
    paint.setStrokeWidth(originalStrokeWidth)
  }
  function 画矩形(left, top, right, bottom) {
    bitmapCanvas.drawRect(left, top, right, bottom, paint)
  }



  function 扩充数组(arr) {
    var 最低距离 = 10
    var xy1=arr[0]
    var xy2=arr[1]

    function 输入两个坐标之间的坐标集合(xy1, xy2) {
      var x1 = xy1[0]
      var y1 = xy1[1]
      var x2 = xy2[0]
      var y2 = xy2[1]
      var xyArr = []
      var distance = Math.pow(((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), 0.5);
      // log('distance=', distance)
      if (distance == 0) {
        return [
          [xy1]
        ]
      }
      var xUnit = (x2 - x1) / distance
      var yUnit = (y2 - y1) / distance
      // log('xUnit=', xUnit)
      // log('yUnit=', yUnit)
      for (var i = 0; i <= distance; i++) {
        var xTemp = xUnit * i
        var yTemp = yUnit * i
        xyArr.push([Math.floor(xTemp + x1), Math.floor(yTemp + y1)])
      }
      // log(xyArr)
      return xyArr
    }








    return 输入两个坐标之间的坐标集合(xy1, xy2)







  }

  function 两点距离(xy1, xy2) {       
    var dx = Math.abs(xy2[0] - xy1[0]);         
    var dy = Math.abs(xy2[1] - xy1[1]);         
    var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return parseInt(dis)
  }
  function 两个坐标的弧度(xy1,xy2){
    var angle = Math.atan2((xy2[1]-xy1[1]), (xy2[0]-xy1[0]))
    return angle
  }


  // canvas.drawPath(this.TouchPointRecord[i], this.paint);
  function 画xyArr2(duration, xyArr) {
    var xStart=xyArr[0][0]
    var yStart=xyArr[0][1]
    if(xyArr.length==1){
      bitmapCanvas.drawPoint(xStart,yStart,paint)
    }else{
      path.reset();
      path.moveTo(xStart, yStart);
      for (var i = 0; i < xyArr.length; i++) {
        var x = xyArr[i][0]
        var y = xyArr[i][1]
        path.lineTo(x, y);
      }
      bitmapCanvas.drawPath(path, paint);
    }
  }
  function 画xyArr(duration, xyArr) {
    var xStart=xyArr[0][0]
    var yStart=xyArr[0][1]
    var count=xyArr.length
    // var 画点间隔时间=0.9
    // var 画点间隔时间=duration/count
    // log("画点间隔时间=",画点间隔时间)
    log('count=',count)
    if(count==1){
      bitmapCanvas.drawPoint(xStart,yStart,paint)
      sleep(duration)
    }else if(count==2){
      log('两个坐标')
      path.reset();
      path.moveTo(xStart, yStart);

      xyArr=扩充数组(xyArr)
      xyArr=压缩数组(xyArr)
      var count=xyArr.length
      log('扩充后count=',count)

      var 画点间隔时间=duration/count


      for (var i = 0; i < xyArr.length; i++) {
        log(i)
        var x = xyArr[i][0]
        var y = xyArr[i][1]
        log(x,",",y)
        bitmapCanvas.drawPoint(x,y,paint)
        sleep(画点间隔时间)
      }

    }else if(count < 100){
      var 画点间隔时间=duration/count
      for (var i = 0; i < xyArr.length; i++) {
        var x = xyArr[i][0]
        var y = xyArr[i][1]
        bitmapCanvas.drawPoint(x,y,paint)
        sleep(画点间隔时间)
      }
    }else{
      xyArr=压缩数组(xyArr)
      log('压缩后的数组长度=',xyArr.length)
      var 画点间隔时间=duration/多于多少个压缩数组
      for (var i = 0; i < xyArr.length; i++) {
        var x = xyArr[i][0]
        var y = xyArr[i][1]
        bitmapCanvas.drawPoint(x,y,paint)
        sleep(画点间隔时间)
      }
    }

  }
  function 压缩数组(arr){
    var newArr=[]
    var count=arr.length
    log('压缩数组(arr).count=',count)
    var 多于100的个数=count-多于多少个压缩数组
    log('多于100的个数=',多于100的个数)
    var 倍数=Math.floor(count/多于多少个压缩数组)
    log("倍数=",倍数)
    for(var i=0;i<arr.length;i++){
      if(Number.isInteger(i/倍数)){
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  function getRndColor() {
    var a, r, g, b;
    a = Math.floor(0), r = Math.floor(随机0_255()), g = Math.floor(随机0_255()), b = Math.floor(随机0_255());
    // var 反色 = -1 - colors.argb(0, r, g, b);
    var color = colors.argb(0, r, g, b);
    color = colors.toString(color)
    log(color)
    return color
  }
  function 随机0_255() {
    var r = parseInt(255 * Math.random())
    return r
  }
  showView(xyArr)
  // sleep(1000)
  path = null;
}
// 画坐标操作
function 画press(x, y, duration) {
  threads.start(
    function () {
      press(x, y, duration)
    }
  )
  var xyArr = [
    [x, y]
  ]
  画坐标操作(duration, xyArr)
}
function 画swipe(x1, y1, x2, y2, duration) {
  threads.start(
    function () {
      swipe(x1, y1, x2, y2, duration)
    }
  )
  var xyArr = [
    [x1, y1],
    [x2, y2]
  ]
  画坐标操作(duration, xyArr)
}
// gesture(duration, [x1, y1], [x2, y2], ...)
function 画gesture(duration, xyArr) {
  var points = []
  points = [duration].concat(xyArr)
  threads.start(
    function () {
      gesture.apply(null, points)
    }
  )
  画坐标操作(duration, xyArr)
}


setScreenMetrics(1080, 1920);

var points = [];
var interval = 0.1;
var x0 = device.width / 2;
var y0 = device.height / 2;

for (var t = -3; t <= 3; t = t + 0.001) {
    //坐标系的 x,y
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = 13 * Math.cos(t) - 5 * Math.cos(t * 2) - 2 * Math.cos(t * 3) - Math.cos(t * 4);
    //增大心
    x = x * 16;
    y = y * 16;
    //算出对于手机机的坐标 手机左上角是0,0
    x = x0 + x;
    y = y0 - y;
    //存入数组
    if (x < x0) {
        points.push([parseInt(x), parseInt(y)]);
    }
    if (x > x0) {
        points.push([parseInt(x), parseInt(y)]);
    }
}
// gesture.apply(null, points);


画press(device.width/2, device.height/2,300)

x1=device.width/6
y1=device.height/2
x2=device.width/6*5
y2=device.height/2
duration=1000
画swipe(x1, y1, x2, y2, duration)

var xyArr=points
画gesture(3000, xyArr)
