var storage = storages.create("悬浮窗信息");

function 滑动效果(window,endXY,spendTime){
  var startXY=[
    window.getX(),
    window.getY()
  ]
  var spendTime=spendTime || 100
  spendTime=spendTime <100 ? 100 : spendTime
  var dis=两点距离(startXY,endXY)
  var 每次移动距离=10
  var 一共移动多少份距离=dis/每次移动距离
  // intervalTime
  var intervalTime=spendTime/一共移动多少份距离

  var 两个坐标之间的坐标集合=输入两个坐标之间的坐标集合(startXY, endXY)
  // log('两个坐标之间的坐标集合')
  // log(两个坐标之间的坐标集合)
  if(两个坐标之间的坐标集合.length<2){
    // log("两个坐标之间的坐标集合.legnth<=1")
    // log(两个坐标之间的坐标集合)
    return '两个坐标一样';
  }
  var 最终要移动的坐标集合=压缩数组(两个坐标之间的坐标集合,一共移动多少份距离)

  threads.start(
    function(){
      for(var i=0;i<最终要移动的坐标集合.length;i++){
        var xy=最终要移动的坐标集合[i]
        window.setPosition(xy[0], xy[1])
        sleep(intervalTime)
      }

    }
  )





}

function 两点距离(xy1, xy2) {
  var dx = Math.abs(xy2[0] - xy1[0]);
  var dy = Math.abs(xy2[1] - xy1[1]);
  var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  return dis  // return parseInt(dis)
}

function 输入两个坐标之间的坐标集合(xy1, xy2) {
  // log(" 输入两个坐标之间的坐标集合(xy1, xy2)")
  // log(xy1, xy2)
  var x1 = xy1[0]
  var y1 = xy1[1]
  var x2 = xy2[0]
  var y2 = xy2[1]
  var xyArr = [xy1]
  var distance = Math.pow(((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), 0.5);
  if (distance == 0) {

    var result=[
      xy1
    ]

    return result
  }
  var xUnit = (x2 - x1) / distance
  var yUnit = (y2 - y1) / distance

  for (var i = 0; i <= distance; i++) {
    var xTemp = xUnit * i
    var yTemp = yUnit * i
    xyArr.push([Math.floor(xTemp + x1), Math.floor(yTemp + y1)])
  }
  xyArr.push(xy2)
  return xyArr
}

function 压缩数组(arr,多于多少个压缩数组){
  // var newArr=[arr[0]]
  var newArr=[]
  var count=arr.length
  var 多于100的个数=count-多于多少个压缩数组
  var 倍数=Math.floor(count/多于多少个压缩数组)
  for(var i=0;i<arr.length;i++){
    if(Number.isInteger(i/倍数)){
      newArr.push(arr[i])
    }
  }
  newArr.push(arr[arr.length-1])
  return newArr
}





module.exports=滑动效果
