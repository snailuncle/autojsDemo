function base64编码(r) {
  var r = android.util.Base64.encodeToString(r, 0);
  return r
}

function base64解码(r) {
  var r = android.util.Base64.decode(r, 0)
  return r
}

setClip("android.util.Base64.encodeToString(r, 0)")
