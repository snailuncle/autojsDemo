signin()

function signin() {
  print(重复指定字符N次('*', 30) + '百度贴吧签到小助手' + 重复指定字符N次('*', 30))
  cookie = "填写你的cookie"
  url = 'https://tieba.baidu.com/'
  headers = {
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
  }
  var r = http.get(url, {
    headers: headers
  });
  log("code = " + r.statusCode);
  html = r.body.string()
  var re = {}
  re.findall = function (正则, html) {
    var 带前缀的吧名 = html.match(正则);
    var 不带前缀的吧名 = []
    for (let i = 0; i < 带前缀的吧名.length; i++) {
      var temp = 带前缀的吧名[i]
      temp = /"([^"]+)"$/.exec(temp)[1]
      不带前缀的吧名.push(temp)
    }
    return 不带前缀的吧名
  }
  tieba = re.findall(/forum_name":".*?"/g, html)
  tieba = 分片(tieba, 0, parseInt(tieba.length / 2))
  print('正在进行贴吧签到...')
  num = 0
  for (let i = 0; i < tieba.length; i++) {
    tieba[i] = reconvert(tieba[i])
    url = 'http://tieba.baidu.com/sign/add'
    form = {
      "ie": "utf-8",
      "kw": tieba[i], // 要签到的贴吧名
      "tbs": "9da208cc747e7b5b1519730458"
    }
    log(form)
    var res = http.post(url, form, {
      "headers": headers,
    });
    html = res.body.json();
    if (html['no'] == 1101) {
      print('[' + tieba[i] + '吧]:' + '亲，此贴吧您之前已经签过了哦!')
    }
    if (html['error'] == '' || html['no'] == 0) {
      print('[' + tieba[i] + '吧]:' + '签到成功!')
      num += 1
    }
  }
  print('\n')
  print('恭喜您,贴吧签到成功!一共签到' + String(num) + '个贴吧!')
}

function 重复指定字符N次(char, n) {
  var chars = ""
  for (let i = 0; i < n; i++) {
    chars = chars + char
  }
  return chars
}

function 分片(数组, 开头, 结尾) {
  var result = []
  for (let i = 开头; i < 结尾; i++) {
    result.push(数组[i])
  }
  return result
}

function left_zero_4(str) {
  if (str != null && str != '' && str != 'undefined') {
    if (str.length == 2) {
      return '00' + str;
    }
  }
  return str;
}

function reconvert(str) {
  str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
    return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
  });
  str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
  });
  str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
  });
  return str;
}
