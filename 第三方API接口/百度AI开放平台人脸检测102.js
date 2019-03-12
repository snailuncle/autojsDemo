auto()
requestUrl="https://aip.baidubce.com/rest/2.0/face/v3/detect"
accessToken = '你的token一般是这样的24.440c39cd127bd6c2695e3273df0e4f4e.2592000.1534'
requestUrl = requestUrl + "?access_token=" + accessToken

imgFile="/sdcard/zly.png"
function img64(imgFile){
  let img=images.read(imgFile)
  let img64=images.toBase64(img)
  return img64
}
imageBase64=img64(imgFile)

console.show();
var res = http.post(requestUrl, {
    headers: {
        'Content-Type': 'application/json'
    },
    image:imageBase64,
    image_type:"BASE64",
    face_field:"age,beauty,face_shape,gender,glasses,facetype"
});

var html = res.body.string();
log(html)



