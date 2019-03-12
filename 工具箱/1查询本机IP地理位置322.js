var ip地理位置 = false
var ip地理位置正则 = /本机IP:&nbsp;\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}<\/span>([\s\S]*?)<\/td/
var ipUrl = "http://www.baidu.com/s?ie=UTF-8&wd=ip%E5%BD%92%E5%B1%9E%E5%9C%B0%E6%9F%A5%E8%AF%A2"
var r = http.get(ipUrl);
log("code = " + r.statusCode);
var htmlResult = r.body.string()
ip地理位置 = ip地理位置正则.exec(htmlResult)
if (ip地理位置) {
  ip地理位置 = ip地理位置正则.exec(ip地理位置)
  ip地理位置 = ip地理位置[1]
  toastLog(ip地理位置)
} else {
  log('没有查询到Ip地理位置,脚本停止')
  exit()
}
