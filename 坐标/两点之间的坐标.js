var x1 = 100
var y1 = 300
var x2 = 100
var y2 = 200
var xy1 = [x1, y1]
var xy2 = [x2, y2]
输入两个坐标之间的坐标集合(xy1, xy2)

function 输入两个坐标之间的坐标集合(xy1, xy2) {
  var x1 = xy1[0]
  var y1 = xy1[1]
  var x2 = xy2[0]
  var y2 = xy2[1]
  var xyArr = []
  var distance = Math.pow(((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), 0.5);
  log('distance=', distance)
  if (distance == 0) {
    log([
      [xy1]
    ])
    return [
      [xy1]
    ]
  }
  var xUnit = (x2 - x1) / distance
  var yUnit = (y2 - y1) / distance
  log('xUnit=', xUnit)
  log('yUnit=', yUnit)
  for (var i = 0; i <= distance; i++) {
    var xTemp = xUnit * i
    var yTemp = yUnit * i
    xyArr.push([Math.floor(xTemp + x1), Math.floor(yTemp + y1)])
  }
  log(xyArr)
  return xyArr
}
