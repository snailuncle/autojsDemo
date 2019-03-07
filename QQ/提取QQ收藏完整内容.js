/**
 * 作者: 家
 * Q Q:  203118908
 * 时间: 20190204
 * 功能: 提取QQ收藏的完整内容,保留原文本格式
 * 注意: 需要将jsoup放到/sdcard/jsoup.jar
 * 注意: jsoup第一次加载需要几秒钟,之后就很快
 */
console.show()
runtime.loadJar('/sdcard/jsoup.jar')
importClass("org.jsoup.Jsoup")
importClass("java.io.IOException")
importClass("java.util.HashMap")
importClass("org.jsoup.Jsoup")
importClass("org.jsoup.nodes.Document")
importClass("org.jsoup.nodes.Element")
importClass("org.jsoup.select.Elements")
var url = "https://sharechain.qq.com/b9084714857c5d5bb2a2ef4d775f4e24";
var r = http.get(url, {
  headers: {
    'Accept-Language': 'zh-cn,zh;q=0.5',
    'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
  }
});
var result = r.body.string()
// result = result.match(/window.syncData.*?script/)
result = result.match(/<script type="text\/javascript">window.syncData.*?<\/script>/)
result = result[0]
result = result.match(/window.syncData = {.*}/)
result = result[0]
result = result.replace("window.syncData = ", '')
result = result.replace(/(\\n|\\u003Cbr  \/>)/g, '这个一会要换成换行符')
//
result = JSON.parse(result)
result = result.shareData
result = result.html_content
var doc = Jsoup.parseBodyFragment(result);
var body = doc.body();
result = Jsoup.parse(body).text()
result = result.replace(/这个一会要换成换行符/g, '\n')
log(result)
