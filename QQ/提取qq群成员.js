"ui";
var layoutContent = (
  <vertical>
      <button id="qiandao" textSize="16sp" margin="8" gravity="center" >登录空间后点此提取群成员</button>
      <button  textSize="16sp" margin="8" gravity="center" >双击空白缩放网页,账号密码登录</button>
      <ScrollView>
          <vertical layout_gravity="center">
              <webview id="webview" h="*" margin="0 16" />
          </vertical>
      </ScrollView>
  </vertical>
)
var path = '/sdcard/qqmember.js'
files.createWithDirs(path);
/**
 * 作者: 家
 * qq:   203118908
 * 功能:  qq群成员提取
 * 流程:  先登录qq群官网获取skey和p_skey.
 * 备注:  只需要修改两个参数  你的QQ号码  +  你的qq群号码
 */
var 你的QQ号码 = '666'
var 你的qq群号码 = '888'
//第一判断本地有没有存储cookie
var storage = storages.create("qQunCookie");
// storage.remove('skey')
// storage.remove('p_skey')
var hasKey = storage.get("skey")
var skey = null
var p_skey = null
if (hasKey) {
  log('cookie存在')
  skey = storage.get("skey")
  p_skey = storage.get("p_skey")
  qq群签到(skey, p_skey)
  exit()
} else {
  log('cookie不存在')
  ui.layout(layoutContent)
  var url = 'https://qun.qq.com/'
  ui.webview.loadUrl(url);
  ui.qiandao.on("click", () => {
    var ck = 获取cookie()
    var key = 提取key(ck)
    skey = key.skey
    p_skey = key.p_skey
    skey = storage.get("skey")
    p_skey = storage.get("p_skey")
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
  var storage = storages.create("qQunCookie");
  storage.put("skey", result.skey);
  storage.put("p_skey", result.p_skey);
  return result
}

function 获取cookie() {
  //这一句必须注释掉,不然提示未登录
  // http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
  var cookieManager = android.webkit.CookieManager.getInstance();
  var ck = cookieManager.getCookie('https://qun.qq.com/')
  // var ck = cookieManager.getCookie(url)
  log('QQ群cookie=')
  log(ck)
  storage.put("qQunCookie", ck);
  return ck
}

function qq群签到(skey, p_skey) {
  var url = "https://qun.qq.com/cgi-bin/qun_mgr/search_group_members"
  // var url = "https://qun.qq.com/cgi-bin/qiandao/sign/publish"
  var headers = {
    "cookie": "uin=o0" + 你的QQ号码 + "; skey=" + skey + "; p_skey=" + p_skey,
    "Host": "qun.qq.com",
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
    "gc": 你的qq群号码,
    "st": "10",
    "end": "20",
    "sort": "0",
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
      var html = res.body.bytes()
      log(html)
      files.writeBytes(path, html);
      alert('提取完毕==>' + path)
      exit()
    }
  )
}
