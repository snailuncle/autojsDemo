var jsoupPath = files.join(files.getSdcardPath(), "/jsoup.jar")
if (files.exists(jsoupPath)) {} else {
  var jsoupUrl = "http://bmob-cdn-11368.b0.upaiyun.com/2019/03/01/33dd4f2f40b9a65980765ec28535c906.jar"
  var r = http.get(jsoupUrl);
  log("code = " + r.statusCode);
  files.writeBytes(jsoupPath, r.body.bytes())
}
runtime.loadJar(jsoupPath)
importClass("org.jsoup.Jsoup")
importClass("java.io.IOException")
importClass("java.util.HashMap")
importClass("org.jsoup.Jsoup")
importClass("org.jsoup.nodes.Document")
importClass("org.jsoup.nodes.Element")
importClass("org.jsoup.select.Elements")
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var cookieManager = android.webkit.CookieManager.getInstance();
var url = 'http://www.baidu.com/login/'
var r = http.get(url, {
  headers: {
    'Accept-Language': 'zh-cn,zh;q=0.5',
    'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
  }
});
log(r)
var str = r.body.string()
// var content = r.body.bytes()
// var path = './jinju.txt'
// files.writeBytes(path, content)
// var str = files.read(path, 'gbk')
var bigStrReg = /name="vrf" value="[\d.]+/
var bigStr = str.match(bigStrReg)[0]
var vrf = bigStr.replace('name="vrf" value="', '')
log(vrf)
var CookieStr = cookieManager.getCookie('http://www.baidu.com');
log(CookieStr)
var 主页url = "http://www.baidu.com/login/"
var username = "123";
var password = "456";
var cookie = CookieStr
headers = {
  'Cookie': cookie,
  'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
}
var res = http.post(主页url, {
  "username": username,
  "password": password,
  "vrf": vrf
});
var html = res.body.string();
log(html)
var 密码不正确 = getBarrage密码不正确(html)

function getBarrage密码不正确(doc) {
  var doc = Jsoup.parse(doc)
  var 密码不正确 = doc.select("div .text-danger").first();
  if (密码不正确) {
    var err = 密码不正确.text()
    log('err')
    log(err)
    if (err = '密码不正确!…') {
      return true
    }
  }
  return false
}
if (密码不正确) {
  alert('密码不正确')
  exit()
}
CookieStr = cookieManager.getCookie('http://www.baidu.com');
log(CookieStr)
var 个人信息 = getBarrage(html)
log(个人信息)
var 长跑成绩汇总 = getBarrage2(html)
log(长跑成绩汇总)
var msg = 个人信息 + '\n' + 长跑成绩汇总
alert("", msg)

function getBarrage2(doc) {
  var doc = Jsoup.parse(doc)
  var 长跑成绩汇总 = doc.select("div .table.table-striped").first();
  长跑成绩汇总 = 长跑成绩汇总.select("tbody").first();
  长跑成绩汇总 = 长跑成绩汇总.select("tr")
  log("长跑成绩汇总")
  log(长跑成绩汇总)
  d = 长跑成绩汇总.toArray()
  var barrage = []
  for (let i = 0; i < d.length; i++) {
    barrage.push(d[i].text())
  }
  return barrage[barrage.length - 1]
}

function getBarrage(doc) {
  var doc = Jsoup.parse(doc)
  var 个人信息 = doc.select("div.thumbnail").first();
  log(个人信息)
  var 四个label = 个人信息.select("label");
  d = 四个label.toArray()
  var barrage = []
  for (let i = 0; i < d.length; i++) {
    barrage.push(d[i].text())
  }
  return barrage[1] + "--" + barrage[2]
}
// function getBarrage(doc) {
//   var d = doc.select("d");
//   d = d.toArray()
//   var barrage = []
//   for (let i = 0; i < d.length; i++) {
//     barrage.push(d[i].text())
//   }
//   return barrage
// }
