
requestUrl="https://aip.baidubce.com/rest/2.0/face/v3/detect"
accessToken = '24.a51d52060f4039b9d958f85e5561004a.2592000.1537688970.282335-11544833'
requestUrl = requestUrl + "?access_token=" + accessToken

imgFile="/storage/emulated/0/QQBrowser/图片收藏/8669ee1e1cc627171136ce321cf98bad.jpg"
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



