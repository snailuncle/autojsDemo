// 读取图片
var imgPath = '/sdcard/1.png'
var img = images.read(imgPath)
// 配置文件, 如果要使用以下代码, 请更改username和password
var config = {
  baseUrl: 'https://v2-api.jsdama.com/upload',
  headers: {
    "Host": 'v2-api.jsdama.com',
    "Connection": 'keep-alive',
    "Accept": 'application/json, text/javascript, */*; q=0.01',
    "Content-Type": 'text/json',
    "User-Agent": "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5 Quark/2.4.2.986"
  },
  softwareSecret: 'FjXYcWGeVRaReAuW92PrsTKnkG9HuLoy3DXhJc5H',
  softwareId: '12330',
  username: 'autojs',
  password: 'lianzhong',
  captchaData: images.toBase64(img, format = "png"),
  captchaType: '1001',
  captchaMinLength: '4',
  captchaMaxLength: '4'
}
// 配置参数中有三个参数需要注意一下:

// captchaType:图像类型, 图像类型有很多种,比如汉字,中英文,车牌号,箭头等,
// 具体请查看 图像类型
// captchaMinLength:验证码最小长度
// captchaMaxLength:验证码最大长度
// 识别图片
var url = config.baseUrl
var data = {
  softwareSecret: config.softwareSecret,
  softwareId: config.softwareId,
  username: config.username,
  password: config.password,
  captchaData: config.captchaData,
  captchaType: config.captchaType,
  captchaMinLength: config.captchaMinLength,
  captchaMaxLength: config.captchaMaxLength,
}
var options = {
  headers: config.headers
}
try {
  http.__okhttp__.setTimeout(3e4);
  var res = http.postJson(url, data, options);
  log('请求开始')
  var html = res.body.json();
  log('请求结束')
  log(html)
  if (html.code === '0') {
    console.log('联众识别结果=', html.data.recognition)
    // return html.data.recognition
  } else {
    log("识别图片出现错误,请检查账号信息是否正确")
  }
} catch (e) {
  log(e)
}
