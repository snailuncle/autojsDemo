/**
 * 利用 jijidown 的接口 通过B站视频的oid下载对应视频的弹幕
 * 需要用的第三方jar包:
 *      https://github.com/dom4j/dom4j/releases/download/dom4j_1_6_1/dom4j-1.6.1.jar
 * jar包存放路径自行修改
 */

runtime.loadJar("./jar/dom4j-1.6.1.jar");

importPackage(java.util);

importClass(java.io.File);
importClass(org.dom4j.io.SAXReader);
importClass(org.dom4j.Document);
importClass(org.dom4j.Element);

var xmlUrl = getXmlUrl(73610610, "333");
var xmlBytes = http.get(xmlUrl).body.bytes();

files.writeBytes("/sdcard/脚本/3.xml", xmlBytes);

var reader = new SAXReader();
try {
    var document = reader.read(new File("/sdcard/脚本/3.xml"));
    var xmlStore = document.getRootElement();
    var it = xmlStore.elementIterator();
    while (it.hasNext()) {
        var xml = it.next();
        while (it.hasNext()) {
            var xmlChild = it.next();
            // log("节点名：" + xmlChild.getName() + "--节点值：" + xmlChild.getStringValue());
            log(xmlChild.getStringValue());
        }
    }
} catch (e) {
    log(e);
}


/**
 * 
 * @param {int} e B站视频的oid
 * @param {string} n 随便吧瞎几把写都行
 */
function getXmlUrl(e, n) {
    var md5=(string)=>java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
                      .digest(java.lang.String(string).getBytes())).toString(16);
    var i = new Date(), a = parseInt(Date.now() / 1e3);
    t = i.getMonth() + 1;
    r = i.getDate();
    o = i.getFullYear() + "-" + (t < 10 ? "0" + t : t) + "-" + (r < 10 ? "0" + r : r);
    l = e+o+"1"+n+a+"293CB1A8B301DA66F555DCE029E53D9C";
    c = md5(l).toUpperCase();
    n = encodeURIComponent(n), n = n.replace("\\", "@ZSlash@"), 
    n = n.replace("/", "@FSlash@"), n = n.replace(".", "@Point@"), n = n.replace("&", "@And@"), 
    n = n.replace(":", "@YH@"), n = n.replace("?", "@Quest@"), n = n.replace("%2b", "@Jia@"), 
    n = n.replace("+", "@Blank@");
    var m = "http://newbarrage.bilibilijj.com/api/down/"+e+"/"+o+"/1/"+n+"/"+c+"/"+a;
    return m;
}