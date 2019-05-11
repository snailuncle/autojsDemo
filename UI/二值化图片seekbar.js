"ui";
var url = "https://www.autojs.org/assets/uploads/files/1540386817060-918021-20160416200702191-185324559.jpg";
var logo = null;
var currentImg = null;
events.on("exit", function () {
  if (logo != null) {
    logo.recycle();
  }
  if (currentImg != null) {
    currentImg.recycle();
  }
});
var imgPath = '/sdcard/1.png'

ui.layout(
    <vertical>
        <img id="img" w="250" h="250" src="file://{{imgPath}}" />
        <scroll>
            <vertical>
                <text  text="二值化" textSize='30sp'/>
                <text id='threshold' textSize='30sp'>当前阈值=0</text>
                <seekbar id="seekbar" bg='#00eeee' margin='30 30' h='200px' w='900px'/>
            </vertical>
        </scroll>
    </vertical>
);
http.get(url, {}, function(res, err){
  files.writeBytes(imgPath,res.body.bytes())
  ui.img.attr('src',"file://"+imgPath)
})
var threshold = 100;
ui.seekbar.setMax(255);
//把一张图片设置到图片控件中
function setImage(img) {
  ui.run(() => {
    ui.img.setImageBitmap(img.bitmap);
    var oldImg = currentImg;
    //不能立即回收currentImg，因为此时img控件还在使用它，应该在下次消息循环再回收它
    ui.post(() => {
      if (oldImg != null) {
        oldImg.recycle();
      }
    });
    currentImg = img;
  });
}
//启动一个处理图片的线程
var imgProcess = threads.start(function () {
  setInterval(() => {}, 1000);
});
//处理图片的函数，把任务交给图片处理线程处理
function processImg(process) {
  imgProcess.setTimeout(() => {
    if (logo == null) {
      logo = images.read(imgPath);
    }
    //处理图片
    var result = process(logo);
    //把处理后的图片设置到图片控件中
    setImage(result);
  }, 0);
}
// ui.binary.on("click", () => {
//   processImg(img => {
//     var g = images.grayscale(img);
//     //二值化，取灰度为30到200之间的图片
//     var result = images.threshold(g, 100, 200);
//     g.recycle();
//     return result;
//   });
// });
ui.seekbar.setOnSeekBarChangeListener({ 
  onProgressChanged: function (seekBar, progress, fromUser) {  
    ui.threshold.setText('当前阈值=' + String(progress));  
    if (fromUser) {
      // log('fromUser')
      // log('threshold=')
      // log(progress)
      threshold = progress
      // 改变阈值
      processImg(img => {
        var g = images.grayscale(img);
        //二值化，取灰度为30到200之间的图片
        var result = images.threshold(g, threshold, 255);
        g.recycle();
        return result;
      });  
    } 
  }
});
