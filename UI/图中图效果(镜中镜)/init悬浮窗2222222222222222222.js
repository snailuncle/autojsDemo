//生成图中图,速度在十几秒左右,
//十几秒之后才有图中图.
//图中图效果不是用canvas的缩放实现的
//是通过把图片制作成缩略图实现的
//图片是从矩阵得来的,尽管所谓的矩阵是个一维数组
//熟悉矩阵加减乘除的话,可以很方便的修改图片
//修改矩阵,就相当于修改图片大小和颜色,也可以实现切割
//毕竟,你给我一个颜色矩阵,我就给你一个图片
//大矩阵可以分割为小矩阵,这样图片就切割了.
//作者:QQ203118908
//日期:20180809

importClass(android.graphics.Paint);
importClass(android.graphics.Bitmap);
importClass(android.content.Intent);
importClass(android.net.Uri);

//请求截图
if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}
var multipleImg = require('一个倍数一个图片.js');
var matrix2Img = require('矩阵变图片.js');
log("multipleImg=",multipleImg)
log("matrix2Img=",matrix2Img)

numss=[]
for(let i=0;i<10;i++){
  multiple=1+0.3*i
  multipleImg.getMultipleImg(multiple)
  matrix2Img.getImgFromMatrix(multiple)
  numss.push(multiple)
}

str="悬浮文字"
path='/storage/emulated/0/QQ图中图/'+'原始截图.png'

var w = floaty.rawWindow(
  <frame background="#00FF00">
    <vertical  margin="3" weightSum="6">
      <text id="图中图"  layout_weight="1" text="图中图" gravity="center" color="#ffffff" size="34"/>

      <img id="img" layout_weight="5" src="file://{{path}}" bg="#0000ff" />
    </vertical>
  </frame>
);


w.setSize(1080, 1920)
//   <img id="img" src="file://{{path}}" bg="#ffffff" w="380" h='1900' margin="1 0 0 0"/>
sleep(1000)
var bitmap =Bitmap.createBitmap(1080,1920,Bitmap.Config.ARGB_8888);
var canvas = new Canvas(bitmap);


count = canvas.saveLayerAlpha(0, 0, 200, 200, 0x88, 0x1F);
log("count=",count)
canvas.restore();
原始图片=false
function 绘大图(path){
  // Bitmap createBitmap(int width, int height, Config config);
  // canvas.drawARGB(255,0,0,0); // 填充黑色
  var paint = new Paint();
  var matrix = new android.graphics.Matrix();
  var img=images.read(path)
  // matrix.postRotate(direction.angle, SNAKE_HEAD.getWidth() / 2, SNAKE_HEAD.getHeight() / 2);
  img.getWidth()
  matrix.postTranslate((canvas.width/2-img.getWidth()/2)-30,canvas.height/2-img.getHeight()/2);

  var Range = 360
  var Rand = Math.random();
  var num = Math.round(Rand * Range); //四舍五入
  canvas.rotate(num);

  // canvas.translate(340, 340);
  canvas.drawImage(img, matrix, paint);
  count = canvas.saveLayerAlpha(0, 0, 200, 200, 0x88, 0x1F);
  log("count=",count)
  canvas.restore();
  return bitmap;
  }

function 绘图(path){
  大图=绘大图(path);
  ui.run(function(){
    w.img.setImageBitmap(大图);
  });
}



nums=numss
path='/storage/emulated/0/QQ图中图/'+'原始截图.png'
绘图(path)
sleep(330)
nums.map(function (item) {
  path='/storage/emulated/0/QQ图中图/'+item+'彩色.png'
  绘图(path)
  sleep(330)
});














// <img src="file://{path}"/>
// // frameLayout
// // gravity设为左上
// // 往里面加imageview
// // 然后改translationX translationY


setTimeout(()=>{
  w.close();
}, 33300);


// ui.run(function(){
//   w.text.setText("啊啊啊啊");
// });



// nums=[2,4,6,8,10,12,14,16,18,20]
//   nums.map(function (item) {
//     path='/storage/emulated/0/QQ图中图/'+item+'彩色.png'
//     img=images.read(path)
//     imgArr.push(img)
//   });
