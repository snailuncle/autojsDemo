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
