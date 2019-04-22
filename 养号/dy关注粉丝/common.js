
function exist(propFeature, searchCount, intervalTime) {
  var searchCount = searchCount || 3
  var intervalTime = intervalTime || 1000
  //propFeature是一个json格式
  //desc,text,id,boundsInside,bounds,boundsContains
  if (!(getObjType(propFeature) == "Object")) {
    log('你传入的propFeature是')
    log(propFeature)
    log('propFeature--控件特征描述是一个对象,正确的对象例子')
    var obj = {
      k1: "v1",
      k2: "v2",
      k3: "v3"
    }
    log(JSON.stringify(obj))
    throw '请传入一个对象'
  }
  var propFeature = propFeature || {}
  var mySelector = ""
  for (var k in propFeature) {
    if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
      mySelector += k + "(" + propFeature[k][0] + "," + propFeature[k][1] + "," + propFeature[k][2] + "," + propFeature[k][3] + ")."
      continue;
    }
    mySelector += k + "(\"" + propFeature[k] + "\")."
  }
  mySelector += 'visibleToUser().findOnce()'
  for (var i = 0; i < searchCount; i++) {
    // log('查找第%d次',i)
    var searchResult = eval(mySelector)
    if (searchResult) {
      return searchResult
    }
    sleep(intervalTime)
  }
  return false
}
function getObjType(obj) {
  // JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
  var result = Object.prototype.toString.call(obj)
  result = result.match(/ \w+/)[0]
  result = result.replace(/ /g, '')
  return result
}

var common={}
common.exist=exist
common.getObjType=getObjType
module.exports=common
