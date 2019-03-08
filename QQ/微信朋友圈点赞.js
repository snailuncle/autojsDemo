// 在朋友圈界面运行该脚本
// 朋友圈点赞大致两个步骤
// 上滑+点赞
// 本脚本仅用于软件学习
// 作者: 家
// QQ:  203118908
// 功能: 朋友圈点赞
var 已经点击过的朋友圈 = []
while (1) {
  上滑()
  点赞()
}

function 上滑() {
  var randomP = random(500, 600);
  var points = [randomP];
  var interval = 0.1;
  var x0 = random(780, 900);
  var y0 = random(1500, 1600);
  var a = 120;
  for (var t = 0; t < Math.PI / 2; t += interval) {
    var x = x0 - a * (1.8 * Math.cos(t * 0.9) - Math.cos(2 * t * 0.9));
    var y = y0 - a * (5 * Math.sin(t * 0.9) - Math.sin(2 * t * 0.9));
    points.push([parseInt(x), parseInt(y)]);
  }
  gesture.apply(null, points);
  sleep(2500);
}

function 点赞() {
  // 点赞的步骤
  //
  // 1 查找右边两个点,两个结果
  //   没有两个点==>本次点赞结束
  //   有两个点==>两个结果==>
  // 1 这两个点所属朋友圈已经点过了,=>本次点赞结束
  // 2  还没点过==>点击两个点,两个结果==>
  // 1 没有出现了 赞 这个词  =>本次点赞结束
  // 2 出现了 赞 这个词  =>点击赞,本次点赞结束
  //  备注: 如果有点击无效的情况,请自己调试点击部分的代码.
  var 右边两个点的特征 = {
    desc: "评论",
    id: "com.tencent.mm:id/eb6",
    boundsInside: [device.width / 4 * 3, device.height / 5 * 1, device.width, device.height / 5 * 4]
  }
  var 右边两个点 = 是否有指定特征的控件(右边两个点的特征)
  if (!右边两个点) {
    return;
  }
  var 右边两个点的爷爷 = 右边两个点.parent().parent()
  var 爷爷的字 = 获取指定节点内所有文字(右边两个点的爷爷)
  log("已经点击过的朋友圈=", 已经点击过的朋友圈)
  log("爷爷的字=", 爷爷的字)
  if (已经点击过的朋友圈.indexOf(爷爷的字) > -1) {
    return true
  }
  点击控件(右边两个点)
  var 赞的特征 = {
    text: "赞",
    id: "com.tencent.mm:id/eae",
    boundsInside: [device.width / 3 * 1, 右边两个点.bounds().top, device.width / 3 * 2, 右边两个点.bounds().bottom]
  }
  var 赞 = 是否有指定特征的控件(赞的特征)
  if (赞) {
    toastLog('发现赞')
  } else {
    toastLog('没有发现赞')
  }
  if (!赞) {
    return;
  }
  点击控件(赞)
  已经点击过的朋友圈.push(爷爷的字)
}

function 获取指定节点内所有文字(rootNode) {
  var setting = {}
  var defaultSetting = {
    getText: true,
    getDesc: true,
    getId: false,
    removeRepetitiveElements: true
  }
  Object.assign(defaultSetting, setting);
  var allStr = []
  var getDescAndTextAndIdOfNode = function (node) {
    if (node) {
      if (defaultSetting.getText) {
        var text = node.text()
        if (!!text) {
          text = iGetInnerText(text)
          allStr.push(text)
        }
      }
      if (defaultSetting.getDesc) {
        var desc = node.desc()
        if (!!desc) {
          text = iGetInnerText(desc)
          allStr.push(desc)
        }
      }
      if (defaultSetting.getId) {
        var id = node.id()
        if (!!id) {
          allStr.push(id)
        }
      }
    }
    for (let i = 0; i < node.childCount(); i++) {
      getDescAndTextAndIdOfNode(node.child(i));
    }
  }
  var getFrameLayoutNode = function () {
    return rootNode
    // return className('FrameLayout').findOne(2000)
  }
  getDescAndTextAndIdOfNode(getFrameLayoutNode())

  function removeRepetitiveElements(arr) {
    var obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (obj.hasOwnProperty(arr[i])) {} else {
        obj[arr[i]] = true
      }
    }
    return Object.keys(obj)
  }
  if (defaultSetting.removeRepetitiveElements) {
    allStr = removeRepetitiveElements(allStr)
  }
  allStr = allStr.join(",")
  return allStr
}

function 点击控件(view, 点击控件后的延时) {
  var 点击控件后的延时 = 点击控件后的延时 || 1000
  log(arguments.callee.name + '开始')
  if (view) {
    var x = view.bounds().centerX()
    var y = view.bounds().centerY()
    log('将要点击的坐标 %s,%s', x, y)
    press(x, y, 1)
    sleep(点击控件后的延时)
  } else {
    throw '传入点击控件中的view异常'
  }
  log(arguments.callee.name + '结束')
}

function 是否有指定特征的控件(控件特征, 查找次数, 查找间隔时间) {
  var 查找次数 = 查找次数 || 3
  var 查找间隔时间 = 查找间隔时间 || 1000
  //控件特征是一个json格式
  //desc,text,boundsInside
  if (!(getObjType(控件特征) == "Object")) {
    log('正确的对象例子')
    var obj = {
      k1: "v1",
      k2: "v2",
      k3: "v3"
    }
    log(JSON.stringify(obj))
    throw '请传入一个对象'
  }
  var 控件特征 = 控件特征 || {}
  var 选择器 = ""
  for (var k in 控件特征) {
    if (k == "boundsInside") {
      选择器 += k + "(" + 控件特征[k][0] + "," + 控件特征[k][1] + "," + 控件特征[k][2] + "," + 控件特征[k][3] + ")."
      continue;
    }
    选择器 += k + "(\"" + 控件特征[k] + "\")."
  }
  选择器 += 'findOnce()'
  for (var i = 0; i < 查找次数; i++) {
    var 一次查找结果 = eval(选择器)
    if (选择器) {
      return 一次查找结果
    }
    sleep(查找间隔时间)
  }
  return false
}

function 对象是否有某个属性(对象, 属性名字) {
  return 对象.hasOwnProperty(属性名字);
}

function getObjType(obj) {
  // JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
  var result = Object.prototype.toString.call(obj)
  result = result.match(/ \w+/)[0]
  result = result.replace(/ /g, '')
  return result
}

function iGetInnerText(testStr) {
  var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
  resultStr = testStr.replace(/[ ]/g, ""); //去掉空格
  resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
  return resultStr;
}
