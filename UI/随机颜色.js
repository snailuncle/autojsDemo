function getRndColor() {
  var a, r, g, b;
  a = Math.floor(0), r = Math.floor(rnd_0_255()), g = Math.floor(rnd_0_255()), b = Math.floor(rnd_0_255());
   var 反色 = -1 - colors.argb(0, r, g, b);
  var color = colors.argb(0, r, g, b);
  color = colors.toString(color)
  return color
}

function rnd_0_255() {
  var r = parseInt(255  Math.random())
  return r
}
