/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  改变图片大小
 * 备注:  百度了好几个小时,真费劲
 */

var path = '/sdcard/qq.png'
var 改变大小后的图片路径='/sdcard/aabccc.jpg'
var size = [100,100]
var interpolation="LINEAR"
var img = images.read(path)
var javaImages = runtime.getImages();
function initIfNeeded() {
  javaImages.initOpenCvIfNeeded();
}
function newSize(size) {
  if (!Array.isArray(size)) {
      size = [size, size];
  }
  if (size.length == 1) {
      size = [size[0], size[0]];
  }
  return new org.opencv.core.Size(size[0], size[1]);
}
var path = '/sdcard/qq.png'
var size = [100,100]
var interpolation="LINEAR"
var img = images.read(path)
log(img)
log(size)
log(interpolation)
function matToImage(matrix) {
  importClass(java.io.ByteArrayInputStream)
  mob = new org.opencv.core.MatOfByte();
  org.opencv.imgcodecs.Imgcodecs.imencode(".png", matrix, mob);
  byteArray = mob.toArray();
  files.writeBytes(改变大小后的图片路径,byteArray)
}
function resize(img, size, interpolation) {
  log(img)
  log(size)
  log(interpolation)
  initIfNeeded();
  var mat = new org.opencv.core.Mat();
  interpolation = org.opencv.imgproc.Imgproc["INTER_" + (interpolation || "LINEAR")];
  org.opencv.imgproc.Imgproc.resize(img.mat, mat, newSize(size), 0, 0, interpolation);
  return matToImage(mat);
}
resize(img, size, interpolation)
