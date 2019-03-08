/**
 * 作者: 家
 * 功能: 本地识别数字 (效果没的说   Σ( ° △ °|||)︴  )
 * 备注: 需要下载ocr插件  名字是   OPR插件试用版非常慢.apk
 */


requestScreenCapture()
var OCR=plugins.load('org.autojs.plugin.ocr')
log(OCR)
function 识别文字(x1,y1,x2,y2){
  if(!x1){
    x1=0
    y1=0
    x2=device.width
    y2=device.height
  }
  var ocr = new OCR();
  events.on("exit", () => {
     ocr.end();
  });
  log("ocr screen");
  var img=captureScreen()
  var w=x2-x1
  var h=y2-y1
  var clip = images.clip(img, x1, y1, w, h);
  var result=ocr.ocrImage(clip)
  log('ocr识别结果',result)
  result=result.text
  log("ocr识别结果文本=",result)
  // ocr识别结果 OcrWordsResult{text='公告', success=true, words=[Word{text='公告', bounds=Rect(23, 8 - 138, 67), confidences=90.60959}], timeRequired=27}
  img.recycle()

  return result
}




//log(ocrWidget(text("运行").findOne()));

function ocrWidget(w) {
   let img = captureScreen();
   let bounds = w.bounds();
   img = images.clip(img, bounds.left, bounds.top, bounds.width(), bounds.height());
   return ocr.ocrImage(img);
}


var result=识别文字()
log(result)
// var circle = {};
// circle.识别文字 = 识别文字
// module.exports = circle;
