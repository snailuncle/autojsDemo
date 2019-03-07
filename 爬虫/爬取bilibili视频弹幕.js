/**
 * @功能 爬取指定bilibili视频弹幕
 * @作者 家
 * @QQ   203118908
 * @感谢 内个谁, ProjectXero
 * @难点 不会解压gzip和deflate,再次感谢上面两位大佬的帮助
 * @return 弹幕数组
 */
runtime.loadJar('/sdcard/jsoup.jar')
importClass("org.jsoup.Jsoup")
importClass("java.io.IOException")
importClass("java.util.HashMap")
// importClass("org.jsoup.nodes.Document")
// importClass("org.jsoup.nodes.Element")
// importClass("org.jsoup.select.Elements")
importClass(java.io.FileInputStream);
importClass(java.util.zip.GZIPInputStream);
importClass("java.util.ArrayList")
importClass("java.io.DataInputStream");
importClass("java.io.DataOutputStream");
importClass("java.io.OutputStreamWriter");
importClass("java.io.BufferedWriter");
importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.BufferedOutputStream');
importClass('java.io.ByteArrayInputStream');
importClass('java.io.BufferedInputStream');
importClass('java.io.ByteArrayOutputStream');
importClass('java.io.PrintWriter');
importClass('java.io.FileOutputStream');
// importClass('java.io.StringBuffer');
importClass('java.io.File');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');
importClass("java.util.zip.CRC32")
importClass("java.util.zip.CheckedOutputStream")
importClass("java.util.zip.ZipEntry")
importClass("java.util.zip.ZipOutputStream")
importClass("java.util.zip.ZipFile")
importClass("java.util.zip.InflaterInputStream")
importClass("java.util.zip.Inflater")
var videoUrl = 'https://www.bilibili.com/video/av41925519?from=search&seid=4347458925007967861'
main(videoUrl)

function main(videoUrl) {
  var webPage = getWebPageGzip(videoUrl)
  var videoInfo = getVideoInfo(webPage)
  var oid = getOid(videoInfo)
  var barrageUrl = getBarrageUrl(oid)
  webPage = getWebPageDeflate(barrageUrl)
  var doc = Jsoup.parse(webPage);
  var barrage = getBarrage(doc)
  console.show()
  log(barrage)
}

function getOid(videoInfo) {
  return videoInfo.cid
}

function getVideoInfo(webPage) {
  var window__INITIAL_STATE__REG = /<script>window\.__INITIAL_STATE__={[\s\S]*?<\/script>/
  var window__INITIAL_STATE__ = webPage.match(window__INITIAL_STATE__REG)
  window__INITIAL_STATE__ = window__INITIAL_STATE__[0]
  window__INITIAL_STATE__ = window__INITIAL_STATE__.replace(/<[\/]?script>/g, '')
  window__INITIAL_STATE__ = window__INITIAL_STATE__.replace(/window.__INITIAL_STATE__=/, '')
  window__INITIAL_STATE__ = window__INITIAL_STATE__.match(/[\s\S]*}(?=;)/)
  window__INITIAL_STATE__ = window__INITIAL_STATE__[0]
  window__INITIAL_STATE__ = JSON.parse(window__INITIAL_STATE__)
  var videoData = window__INITIAL_STATE__.videoData
  var title = videoData.title
  title = title.replace(/[&\|\\\*^%$#@\-，」 「。]/g, "");
  var cid = videoData.cid
  var info = {
    title: title,
    cid: cid
  }
  log('info')
  log(info)
  return info
}

function getWebPageDeflate(url) {
  var headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'api.bilibili.com',
    'Pragma': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
  }
  var res = http.get(
    url, {
      headers: headers
    })
  log("statusCode = " + res.statusCode);
  var deflateFileContent = res.body.bytes()
  var 网页内容 = null;
  if (deflateFileContent) {
    var br = new BufferedReader(new InputStreamReader(new InflaterInputStream(new ByteArrayInputStream(deflateFileContent), new Inflater(true))));
    var lns = [],
      cl;
    while (cl = br.readLine()) lns.push(cl);
    网页内容 = lns.join("\n")
    // log('网页内容')
    // log(网页内容)
    return 网页内容
  } else {
    console.error('下载失败')
    exit()
  }
  return false
}

function getWebPageGzip(url) {
  var headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'www.bilibili.com',
    'Pragma': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
  }
  var res = http.get(
    url, {
      headers: headers
    })
  log("statusCode = " + res.statusCode);
  var gzipFileContent = res.body.bytes()
  var 网页内容 = null;
  if (gzipFileContent) {
    var 网页保存路径 = 保存zip文件(gzipFileContent)
    网页内容 = files.read(网页保存路径)
    // log('网页内容')
    // log(网页内容)
    return 网页内容
  } else {
    console.error('下载失败')
    exit()
  }
  return false
}

function 保存zip文件(zipFile) {
  var path = files.join(files.cwd(), "1下载bilibili弹幕专用/webPage.gzip.js")
  files.createWithDirs(path)
  log("path=", path)
  // path= /storage/emulated/0/脚本/zip文件专用/test.zip
  files.writeBytes(path, zipFile)
  var r = 解压zip文件(path)
  log(r)
  return r
}

function 解压zip文件(文件路径) {
  //同一目录下的同一文件名
  // unzipGzipFile(sourceGzipFilePath, targetPath)
  var fileName = files.getName(文件路径)
  var 解压后的文件路径 = 文件路径.replace(fileName, 'webPage.js')
  log('解压的解压后的文件路径=', 解压后的文件路径)
  files.createWithDirs(解压后的文件路径)
  // com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件路径))
  var sourceGzipFilePath = 文件路径
  var targetPath = 解压后的文件路径
  unzipGzipFile(sourceGzipFilePath, targetPath)
  return targetPath
}

function unzipGzipFile(sourceGzipFilePath, targetPath) {
  var sourceGzipFilePath = sourceGzipFilePath || '/sdcard/tempSourceGzipFilePath.js'
  var targetPath = targetPath || '/sdcard/tempTargetPath.js'
  log('sourceGzipFilePath')
  log(sourceGzipFilePath)
  log('targetPath')
  log(targetPath)
  var sChunk = 8192;
  var gzipFileInputStream = new FileInputStream(sourceGzipFilePath);
  var zipin = new GZIPInputStream(gzipFileInputStream);
  var buffer = util.java.array('byte', sChunk)
  var out = new FileOutputStream(targetPath);
  var length;
  while ((length = zipin.read(buffer, 0, sChunk)) != -1)
    out.write(buffer, 0, length);
  out.close();
  zipin.close();
}

function getBarrageUrl(oid) {
  var url = util.format('https://api.bilibili.com/x/v1/dm/list.so?oid=%s', oid)
  return url
}

function getBarrage(doc) {
  var d = doc.select("d");
  d = d.toArray()
  var barrage = []
  for (let i = 0; i < d.length; i++) {
    barrage.push(d[i].text())
  }
  return barrage
}
