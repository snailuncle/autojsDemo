function getimgsrc(htmlstr) {
  var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
  var arr = [];
  while (tem = reg.exec(htmlstr)) {
    arr.push(tem[2]);
  }
  return arr;
}
String.prototype.strip = function () { 
  var str = this,
     whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'; 
  for (var i = 0, len = str.length; i < len; i++) {  
    if (whitespace.indexOf(str.charAt(i)) === -1) {   
      str = str.substring(i);   
      break;  
    } 
  } 
  for (i = str.length - 1; i >= 0; i--) {  
    if (whitespace.indexOf(str.charAt(i)) === -1) {   
      str = str.substring(0, i + 1);   
      break;  
    } 
  } 
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function BDTB() {
  this.name = null
  this.pageReply = null
  this.pageNum = null
  this.x = null
  this.Url = "http://tieba.baidu.com/p/2005436135"
  this.seeLZ = "0"
  this.Num = "1"
  this.getPage = function (Url, SeeLZ, Num) {
    Url = this.Url
    if (SeeLZ == 1) {
      Url = Url.strip() + '?see_lz=1' + '&pn=' + String(Num)
    }
    if (SeeLZ == 0) {
      Url = Url.strip() + '?see_lz=0' + '&pn=' + String(Num)
    }
    print("当前爬取的帖子链接Url=", Url)
    try {
      var r = http.get(Url, {
        headers: {
          'Accept-Language': 'zh-cn,zh;q=0.5',
          'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
      });
      log("code = " + r.statusCode);
      result6 = r.body.string()
      return result6
    } catch (err) {
      log(err)
    }
    return null
  }
  this.getTitle = function (page) {
    var pattern = new RegExp('<h1 class=".*?>(.*?)</h1>', 'gi');
    pattern.compile(pattern);
    result = pattern.exec(page)
    this.name = result[1]
  }
  this.getPageNumAndReply = function (page) {
    var pattern = new RegExp('<li class="l_reply_num.*?><span class=".*?>(\\d+)</span>.*?>(\\d+)</span>', 'gim');
    pattern.compile(pattern);
    result = pattern.exec(page)
    print('该贴子共', result[1], '回复 ; 共', result[2], '页数')
    this.pageReply = result[1]
    this.pageNum = result[2]
  }
  this.getContent = function (page) {
    var pattern = new RegExp('<img username="([\\s\\S]*?)"[\\s\\S]*?<div id="post_content[\\s\\S]*?>([\\s\\S]*?)</div>', 'gim');
    pattern.compile(pattern);
    result = page.match(pattern)
    if (result) {
      resultTemp = []
      k = 0
      for (let i = 0; i < result.length; i++) {
        var 贴子作者正则 = /<img username="(.*?)"/igm
        var 贴子内容正则 = /<div id="post_content[\s\S]*?>([\s\S]*?)<\/div>/igm
        var 贴子 = {
          "作者": "",
          "内容": ""
        }
        贴子.作者 = result[i].match(贴子作者正则)
        贴子作者正则 = /<img username="(.*?)"/igm
        贴子.作者 = 贴子作者正则.exec(贴子.作者[0])
        贴子内容正则 = /<div id="post_content[\s\S]*?>([\s\S]*?)<\/div>/igm
        贴子.内容 = result[i].match(贴子内容正则)
        贴子.内容 = 贴子内容正则.exec(贴子.内容)
        贴子.作者 = 贴子.作者[1]
        贴子.内容 = 贴子.内容[1]
        log('贴子=',贴子)
        resultTemp[k] = [贴子.作者, 贴子.内容]
        k = k + 1
      }
      result = resultTemp
    } else {
      log('没有匹配到贴子')
    }
    var pattern1 = new RegExp('src="([\\s\\S]*?)"', 'gim');
    pattern1.compile(pattern1);
    for (x of result) {
      content = this.removeOthers(x[1])
      this.wiriteFile(x[0], content, this.x)
      result1 = getimgsrc(x[1])
      if (result1 != []) {
        this.savePicture(result1, this.x)
      }
      this.x += 1
    }
  }
  this.removeOthers = function (page) {
    var removeImg = new RegExp('<img .*?>');
    removeImg.compile(removeImg);
    var removeAddr = new RegExp('<a.*?>|</a>')
    removeAddr.compile(removeAddr);
    var replaceBr = new RegExp('<br>');
    replaceBr.compile(replaceBr);
    var removeOthers = new RegExp('<.*?>');
    removeOthers.compile(removeOthers);
    page = page.replace(removeImg, '')
    page = page.replace(removeAddr, '')
    page = page.replace(replaceBr, '\\n')
    page = page.replace(removeOthers, '')
    return page
  }
  this.wiriteFile = function (name, content, num) {
    path = files.cwd() + '/' + this.name + '/' + this.name + '.txt'
    files.create(path);
    file = open(path, 'a')
    if (num == 1) {
      file.write('贴子名称：')
      file.write(this.name)
      file.write('   |   贴子总回复：')
      file.write(this.pageReply)
      file.write('   |   贴子总页数：')
      file.write(this.pageNum)
    }
    file.write('\n----------------------------\n')
    file.write('第')
    num = String(num)
    file.write(num)
    file.write('楼\n\n')
    file.write(name)
    file.write('\n\n')
    file.write(content)
    file.close()
    print(num, '楼内容已爬取完成...')
  }
  this.savePicture = function (Picture, num) {
    filepath = files.cwd() + '/' + this.name
    for (url of Picture) {
      a = 1
      temp = filepath + '/' + String(num) + '(' + String(a) + ')L.jpg'
      this.savePicToFile(url, temp)
      a += 1
    }
  }
  this.savePicToFile = function (url, temp) {
    files.writeBytes(temp, http.get(url).body.bytes())
  }
  this.start = function () {
    url = this.url
    seeLZ = this.seeLZ
    Num = this.Num
    if (seeLZ == '是') {
      seeLZ = 1
    }
    if (seeLZ == '否') {
      seeLZ = 0
    }
    this.x = 1
    page = this.getPage(url, seeLZ, Num)
    this.getTitle(page)
    this.getPageNumAndReply(page)
    filepath = files.cwd() + '/' + this.name + "/"
    files.createWithDirs(filepath)
    y1 = parseInt(Num)
    y2 = parseInt(this.pageNum) + 1
    for (let y = y1; y < y2; y++) {
      page = this.getPage(url, seeLZ, y)
      this.getContent(page)
    }
    print('爬取完成，实际爬取到', this.x - 1, '楼！')
  }
}
bdtb = new BDTB()
bdtb.start()
exit()
