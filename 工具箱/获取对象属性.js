/**
 * 功能: 获取对象属性
 */
var me = Object('me')
me.sister='littleGril'
log(getAttr(me))

function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  return attrs
}
