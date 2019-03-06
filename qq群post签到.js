"ui";
var layoutContent = (
  <vertical>
      <ScrollView>
          <vertical layout_gravity="center">
              <button id="qiandao" textSize="16sp" margin="8" gravity="center" >登录空间后点此签到</button>
              <webview id="webview" h="*" margin="0 16" />
          </vertical>
      </ScrollView>
  </vertical>
)
/**
 * 作者: 家
 * qq:   203118908
 * 功能:  qq群post签到
 * 流程:  先登录qq空间获取skey和p_skey,然后就可以签到了.
 * 备注:  只需要修改两个参数  你的QQ号码  +  你的qq群号码
 */
var 你的QQ号码 = '123'
var 你的qq群号码 = '456'
//第一判断本地有没有存储cookie
var storage = storages.create("qzoneCookie");
// storage.remove('skey')
// storage.remove('p_skey')
// storage.put("a", 123);
var hasKey = storage.get("skey")
var skey = null
var p_skey = null
if (hasKey) {
  skey = storage.get("skey")
  p_skey = storage.get("p_skey")
  qq群签到(skey, p_skey)
  exit()
} else {
  ui.layout(layoutContent)
  var url = 'https://user.qzone.qq.com'
  ui.webview.loadUrl(url);
  ui.qiandao.on("click", () => {
    var ck = 获取cookie()
    var key = 提取key(ck)
    skey = key.skey
    p_skey = key.p_skey
    qq群签到(skey, p_skey)
    exit()
  })
}

function 提取key(ck) {
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
    p_skey: p_skey
  }
  var storage = storages.create("qzoneCookie");
  storage.put("skey", result.skey);
  storage.put("p_skey", result.p_skey);
  return result
}

function 获取cookie() {
  http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
  var cookieManager = android.webkit.CookieManager.getInstance();
  var ck = cookieManager.getCookie(url)
  storage.put("qzoneCk", ck);
  return ck
}

function qq群签到(skey, p_skey) {
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
    "text": "作者QQ: 203118908",
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
      exit()
    }
  )
}
