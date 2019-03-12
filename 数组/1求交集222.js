Array.intersect = function () {
  var result = new Array();
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      var str = arguments[i][j];
      if (!obj[str]) {
        obj[str] = 1;
      } else {
        obj[str]++;
        if (obj[str] == arguments.length) {
          result.push(str);
        }
      } //end else
    } //end for j
  } //end for i
  return result;
}
当前页面所有文字列表 = [
  '13491',
  '邀请码',
  '13491'
]
当前页文字列表 = [
  '点此登录',
  '我的金币'
]
var 交集 = Array.intersect(当前页文字列表, 当前页面所有文字列表)
log(交集)
