//截图当前屏幕并识别截图中的文字

auto()
//请求截图
if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}


log("识别开始")
requestUrl="https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic"
accessToken = '24.45e9e852ec0cc0f41a268e11ce7b2f3f.2592000.1535634423.282335-10386148'
requestUrl = requestUrl + "?access_token=" + accessToken
imgFile="/sdcard/test.jpg"
function img64(imgFile){
  var img = captureScreen();
  let img64=images.toBase64(img)
  return img64
}
imageBase64=img64(imgFile)
imageBase64=encodeURI(imageBase64)
console.show();
var res = http.post(requestUrl, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    image:imageBase64,
    image_type:"BASE64",
});
var html = res.body.string();
log(html)
log("识别结束")
