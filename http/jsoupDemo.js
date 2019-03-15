
// 作者QQ   203118908
// 时间     2019 1 8
// 脚本作用: autojs使用jsoup的demo
// 脚本内容: 爬取科学网  刘玉仙 博客的  指定id的好友名字
// 需要导入jsoup.
// jsoupDemo.js
console.show()
runtime.loadJar('/sdcard/jsoup.jar')
importClass("org.jsoup.Jsoup")
importClass("java.io.IOException")
importClass("java.util.HashMap")
importClass("org.jsoup.Jsoup")
importClass("org.jsoup.nodes.Document")
importClass("org.jsoup.nodes.Element")
importClass("org.jsoup.select.Elements")

function Spider(url) {
  this.CrawlName = function (url) {
    var tmp = new HashMap();
    try {
      var doc = Jsoup.connect(url)
        .header("User-Agent",
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
        .get();
      var links = doc.select("dt a");
      links = links.toArray()
      for (let i = 0; i < links.length; i++) {
        var link = links[i]
        if (link.hasAttr("style")) {
          tmp.put(parseInt(link.attr("href").substring(link.attr("href").indexOf("uid=") + 4)), link.attr("title"));
        }
      }
      log(tmp)
      return (tmp);
    } catch (e) {
      log(e)
    }
    return (null);
  }
  var data = this.CrawlName(url);
  this.getName = function (id) {
    if (data != null) {
      log('id: %d - name: %s', id, data.get(id));
    }
  }
}
s = new Spider("http://blog.sciencenet.cn/home.php?mod=space&uid=215715&do=friend&view=me&from=space");
s.getName(71079);
