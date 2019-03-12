
importClass(android.media.ThumbnailUtils)
importClass(android.graphics.BitmapFactory)
importClass(android.graphics.Bitmap)
importClass(android.graphics.Matrix)
importClass(android.graphics.ColorMatrix)
importClass(java.io.File)
importClass(java.io.FileOutputStream)
importClass(java.lang.Integer)



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

log("一个倍数一个图片J.array=",J.array)












//首先要做缩略图,减少计算
function getImgThumbnail(imagePath, width, height) {
  width=width || 8
  height=height || 11
  options = new BitmapFactory.Options();
  options.inJustDecodeBounds = true; //关于inJustDecodeBounds的作用将在下文叙述
  bitmap = BitmapFactory.decodeFile(imagePath, options);
  h = options.outHeight;//获取图片高度
  w = options.outWidth;//获取图片宽度
  scaleWidth = w / width; //计算宽度缩放比
  scaleHeight = h / height; //计算高度缩放比
  scale = 1;//初始缩放比
  if (scaleWidth < scaleHeight) {//选择合适的缩放比
      scale = scaleWidth;
  } else {
      scale = scaleHeight;
  }
  if (scale <= 0) {//判断缩放比是否符合条件
      be = 1;
  }
  options.inSampleSize = scale;
  // 重新读入图片，读取缩放后的bitmap，注意这次要把inJustDecodeBounds 设为 false
  options.inJustDecodeBounds = false;
  if(bitmap != null && !bitmap.isRecycled()) {
    bitmap.recycle();
  }
  bitmap = BitmapFactory.decodeFile(imagePath, options);
  // 利用ThumbnailUtils来创建缩略图，这里要指定要缩放哪个Bitmap对象
  bitmap = ThumbnailUtils.extractThumbnail(bitmap, width, height,ThumbnailUtils.OPTIONS_RECYCLE_INPUT);
  return bitmap;
}
//再提取缩略图点阵
function getImgLattice(bitmap) {
  width = bitmap.getWidth();
  height = bitmap.getHeight();
  console.log("width=",width,"  height=",height)
  pixels = J.array("int", width * height);
  // pixels = new Array(width * height);

  offset=0
  stride=width
  x=0
  y=0
  bitmap.getPixels(pixels,offset,stride,x,y,width,height)

  // console.log("pixels=",pixels)
  // exit()


  // var pixels01 = pixels.map(function (value) {
  //   if(value<-14000431){
  //     return 1
  //   }else{
  //     return 0
  //   }
  // });


  return pixels



  // k=0
  // for(let j=0;j<height;j++){
  //   for(let i=0;i<width;i++){
  //     let color=bitmap.getPixel(i,j)
  //     console.log("color=",color)
  //     // if(color>-1645833){
  //     if(color==-1){
  //       pixels[k]=0
  //     }else{
  //       pixels[k]=1
  //     }
  //     k++
  //   }
  // }
  // return pixels
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




var multipleImg={}

multipleImg.getMultipleImg=(multiple) =>{
  PathBasic="/sdcard/QQ图中图/";
  files.ensureDir(PathBasic);

  w=Math.floor(1080/multiple)
  h=Math.floor(1920/multiple)

  imgPath='/sdcard/QQ图中图/原始截图.png'
  images.captureScreen(imgPath)
  //先得到bitmap
  bitmap=getImgThumbnail(imgPath,w,h);
  //保存缩略图
  imgThumbnailPath='/sdcard/QQ图中图/'+multiple+'.png'
  files.createWithDirs(imgThumbnailPath)
  saveBitmapToSDCard(bitmap, imgThumbnailPath);
  if(bitmap != null && !bitmap.isRecycled()) {
    bitmap.recycle();
  }
}

log("multipleImg=",multipleImg)

module.exports = multipleImg;




