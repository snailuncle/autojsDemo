// var 识别结果=联众识别验证码图片(用户名,密码,img)
联众识别验证码图片 = function(e, t, img) {
  http.__okhttp__.setTimeout(3e4);
  var o = img, r = images.toBase64(o, format = "png"), i = device.release, c = device.model, s = device.buildId;
  try {
      var n = http.postJson("https://v2-api.jsdama.com/upload", {
          softwareId: 12330,
          softwareSecret: "FjXYcWGeVRaReAuW92PrsTKnkG9HuLoy3DXhJc5H",
          username: e,
          password: t,
          captchaData: r,
          captchaType: 1117,
          captchaMinLength: 4,
          captchaMaxLength: 4
      }, {
          headers: {
              Host: "v2-api.jsdama.com",
              Connection: "keep-alive",
              Accept: "application/json, text/javascript, */*; q=0.01",
              "User-Agent": "Mozilla/5.0 (Linux; Android " + i + "; " + c + " Build/" + s + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36",
              "Content-Type": "text/json"
          }
      });
  } catch (e) {
      return {
          code: "-1",
          msg: "缃戠粶閾炬帴瓒呮椂...",
          data: {}
      };
  }
  var d = n.body.json(), p = d.code, m = d.message;
  if ("10079009" == p) return {
      code: p,
      msg: m,
      data: {}
  };
  if ("10142006" == p) return {
      code: p,
      msg: m,
      data: {}
  };
  if ("10142004" == p) return {
      code: p,
      msg: m,
      data: {}
  };
  if ("10142005" == p) return {
      code: p,
      msg: m,
      data: {}
  };
  if ("10079006" == p) return {
      code: p,
      msg: m,
      data: {}
  };
  if ("0" == p) {
      return {
          code: p,
          msg: m,
          data: {
              res: d.data.recognition
          }
      };
  }
  return d;
}, module.exports = 联众识别验证码图片;
