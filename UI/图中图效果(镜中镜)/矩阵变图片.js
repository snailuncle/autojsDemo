
importClass(android.media.ThumbnailUtils)
importClass(android.graphics.BitmapFactory)
importClass(android.graphics.Bitmap)
importClass(android.graphics.Matrix)
importClass(android.graphics.ColorMatrix)
importClass(java.io.File)
importClass(java.io.FileOutputStream)

// var J = require("./J.js");




function typeToClass(type) {
  if (typeof(type) != 'string') {
      return type;
  }
  var types = {
      "int": "Integer",
      "long": "Long",
      "string": "String",
      "double": "Double",
      "char": "Character",
      "byte": "Byte",
      "float": "Float"
  };
  if (types[type]) {
      return Packages["java.lang." + types[type]].TYPE;
  }
  return Packages[type];
}

function array(type) {
  var clazz = typeToClass(type);
  var args = arguments;
  args[0] = clazz;
  return java.lang.reflect.Array.newInstance.apply(null, args);
}

J = {
  "array": array
};

log("矩阵变图片J.array=",J.array)
// exit()






function getImgLattice(bitmap) {
  width = bitmap.getWidth();
  height = bitmap.getHeight();
  console.log("width=",width,"  height=",height)
  pixels = J.array("int", width * height);
  offset=0
  stride=width
  x=0
  y=0
  bitmap.getPixels(pixels,offset,stride,x,y,width,height)
  return pixels
}














//如果要保存缩略图,调用save
function saveBitmapToSDCard(bitmap, path) {
  file = new File(path);
  if(file.exists()) {
      file.delete();
  }
  try {
      fileOutputStream = new FileOutputStream(file);
      bitmap.compress(Bitmap.CompressFormat.PNG, 100, (fileOutputStream));//设置PNG的话，透明区域不会变成黑色
      fileOutputStream.close();
      log("----------save success-------------------");
  }
  catch(e) {
      console.log(e)
  }
}









var matrix2Img={}

matrix2Img.getImgFromMatrix=(multiple) =>{
  sd_path="/sdcard/QQ图中图/"+multiple+'.png';
  bitmap = BitmapFactory.decodeFile(sd_path)
  pixels=getImgLattice(bitmap)
  //得到矩阵后要改变矩阵
  var newPixels = pixels.map(function (item) {
    return item * multiple;
  });


  width = bitmap.getWidth();
  height = bitmap.getHeight();
  bitmapTem = Bitmap.createBitmap(width, height, bitmap.config);

  index=0
  //stride应该大于width
  stride=width
  x=0
  y=0
  width=width
  length=height

  log('开始改变颜色')
  bitmapTem.setPixels(newPixels, index, stride, x, y, width, length);
  log(bitmapTem)
  imgPath="/sdcard/QQ图中图/"+multiple+'彩色'+'.png';
  files.createWithDirs(imgPath)
  saveBitmapToSDCard(bitmapTem, imgPath)
  log('结束改变颜色')
  if(bitmap != null && !bitmap.isRecycled()) {
    bitmap.recycle();
  }
}







log('matrix2Img=',matrix2Img)
module.exports = matrix2Img;
