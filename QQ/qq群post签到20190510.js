"ui";
var 你的qq群号码 = '123'
var 你的QQ号码 = '456'
ui.layout(
  <vertical bg='#436EEE'>
       <button id="checkIn" textSize="16sp" margin="8" gravity="center" >登录空间后点此签到</button>
       <button id="clearCookie" textSize="16sp" margin="8" gravity="center" >清除cookie</button>
      <ScrollView margin='20 20 20 20' >
          <vertical layout_gravity="center" >
              <webview id="webview" h="*" margin="0 16" />
          </vertical>
      </ScrollView>
  </vertical>
)
var url = 'https://user.qzone.qq.com'
// cookie管理器
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(web.webkitCookieJar))
var cookieManager = web.cookieManager;
// 删除cookie
ui.clearCookie.on("click", () => {
  cookieManager.removeAllCookie();
  cookieManager.removeSessionCookie();
  ui.webview.loadUrl(url);
  ui.checkIn.setText('cookie已删除,请登录QQ后点此签到')
  setTimeout(
    function () {
      ui.checkIn.setText('登录空间后点此签到')
    }, 3000
  )
})
// 点击签到
ui.checkIn.on("click", () => {
  var ck = getCookie(url)
  log('点击签到后,提取的cookie=')
  log(ck)
  var key = extrackSkeyAndP_skey(ck)
  config.skey = key.skey
  config.p_skey = key.p_skey
  qqcheckIn(config)
})
//判断本地有没有存储cookie, 有的话直接点击按钮签到, 没有就登录后提取cookie,然后签到
var storage = storages.create("qzoneCookie");
var hasKey = storage.get("skey")
var skey = null
var p_skey = null
var config = {
  skey: skey,
  p_skey: p_skey,
  你的qq群号码: 你的qq群号码,
  你的QQ号码: 你的QQ号码
}
if (hasKey) {
  ui.checkIn.setText('cookie存在,直接点此签到')
  config.skey = storage.get("skey")
  config.p_skey = storage.get("p_skey")
} else {
  ui.webview.loadUrl(url);
}
// 提取cookie
function getCookie(url) {
  var ck = cookieManager.getCookie(url)
  return ck
}
// 从cookie中提取Skey, P_skey
function extrackSkeyAndP_skey(ck) {
  var keyReg = /(skey|p_skey)=.+?(;|$)/g
  var key = ck.match(keyReg)
  var skey = null;
  var p_skey = null;
  for (let i = 0; i < key.length; i++) {
    var v = key[i]
    var newArr = v.split('=')
    if (newArr[0] == "skey") {
      skey = newArr[1]
    } else if (newArr[0] == "p_skey") {
      p_skey = newArr[1]
    } else {
      alert('好像是其他怪怪的东西,你自己写cookie提取key吧')
      log(ck)
      exit()
    }
  }
  var result = {
    skey: skey.substr(0, skey.length - 1),
    p_skey: p_skey.replace(';', '')
  }
  storage.put("skey", result.skey);
  storage.put("p_skey", result.p_skey);
  return result
}
// qq群签到
function qqcheckIn(config) {
  var skey = config.skey
  var p_skey = config.p_skey
  var 你的qq群号码 = config.你的qq群号码
  var 你的QQ号码 = config.你的QQ号码
  var url = "https://qun.qq.com/cgi-bin/qiandao/sign/publish"
  var headers = {
    "Cookie": "uin=o" + 你的QQ号码 + "; skey=" + skey + "; p_uin=o" + 你的QQ号码 + "; p_skey=" + p_skey
  }

  function getGTK(skey) {
    var str = skey
    var hash = 5381;
    for (var i = 0, len = str.length; i < len; ++i) {
      hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
  }
  var form = {
    "bkn": getGTK(skey),
    "template_data": "",
    "gallery_info": {
      'category_id': 5,
      'page': 0,
      'pic_id': 122
    },
    "template_id": "3",
    "gc": 你的qq群号码,
    "client": "2",
    "lgt": "0",
    "lat": "0",
    "poi": "",
    "pic_id": "",
    "text": "post签到: 四阿哥",
  }
  log('url=', url)
  log('form=', form)
  log('headers=', headers)
  http.post(
    url, form, {
      headers: headers
    },
    function (res, err) {
      if (err) {
        console.error(err);
        return;
      }
      log("code = " + res.statusCode);
      var html = res.body.string()
      log(html)
      alert('签到完毕')
    }
  )
}
