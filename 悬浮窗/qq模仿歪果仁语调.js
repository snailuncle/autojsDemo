var window = floaty.rawWindow(
  <frame gravity="center">
      <button id="button" h="*" w="*" />
  </frame>
);

window.exitOnClose();

window.button.click(() => {
  threads.start(function(){onClick()})
  //window.setAdjustEnabled(!window.isAdjustEnabled());
});
window.button.setBackgroundColor(colors.argb(0, 255, 255, 255))
setInterval(() => {
  //对控件的操作需要在UI线程中执行
  ui.run(function() {
      var send = depth(10).text("发送").packageName("com.tencent.mobileqq").find()
      if (!send.empty()) {
          var rect = send[0].bounds()
          //var rect = depth(10).text("发送").packageName("com.tencent.mobileqq").findOnce().bounds();
          print(rect.height())

          window.setPosition(rect.left, rect.top);
          window.setSize(rect.width(), rect.height());

      } else {
          window.setPosition(0, 0);
          window.setSize(0, 0)
      }
      //window.setPosition(200,200);
  });
}, 100);
function onClick(){

   //toast("run")
  var send = depth(10).text("发送").packageName("com.tencent.mobileqq").find()[0]
  var input = className("android.widget.EditText").depth(9).findOne()
  t=text(input.text())
  input.setText(t)
  send.click()
  }
function text(str) {
log(str)
  return translate(translate(str, "zh", "en"),"en","zh")

}
function translate(message, f, t) {
  //const tran = require('/sdcard/脚本/翻译模块.js');
  return 百度(message, f, t)
};


function 百度(str, f, t) {
  function getMd5(string) {
      return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)
  }
  let salt = (new Date).getTime();
  let sign = getMd5("20180125000118573" + str + salt + "O_PrebY0tsdbHjKNOaDf");
  let res = http.post("http://api.fanyi.baidu.com/api/trans/vip/translate?", {
      q: str,
      appid: "20180125000118573",
      salt: salt,
      from: f,
      to: t,
      sign: sign
  });
  try {
      str = JSON.parse(res.body.string()).trans_result.map(val => val.dst).join('\n');
      return str;
  } catch (e) {
      log(e);
      百度(str, f, t)
      toastLog("翻译出现错误！！");
  }
}
