/**
  * @method getAllText
  * @param  setting 是个对象, 决定是否获取text,desc,id,以及是否去重; 默认获取text和desc,不获取id,默认去重
  * @desc 默认设置为{
    getText: true,
    getDesc: true,
    getId: false,
    removeRepetitiveElements: true
  }
  * @desc 获取页面所有文字,可以指定text,desc,id三个中的任意几个
  * @return 所有文字组成的数组
  */
function getAllText(setting) {
  var setting = setting || {}
  var defaultSetting = {
    getText: true,
    getDesc: true,
    getId: true,
    removeRepetitiveElements: true
  }
  Object.assign(defaultSetting, setting);
  log(defaultSetting)
  var allStr = []
  var getDescAndTextAndIdOfNode = function (node) {
    if (node) {
      if (defaultSetting.getText) {
        var text = node.text()
        if (!!text) {
          allStr.push(text)
        }
      }
      if (defaultSetting.getDesc) {
        var desc = node.desc()
        if (!!desc) {
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
    return className('FrameLayout').findOne(2000)
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
  return allStr
}
var setting = {
  getId: true
}
var r = getAllText(setting)
log(r)
