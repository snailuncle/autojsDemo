function Baidu_zh_To_en(str) {
    function getMd5(string) {return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)}
    var salt = (new Date).getTime();
    var sign = getMd5("20180125000118573" + str + salt + "O_PrebY0tsdbHjKNOaDf");
    var res = http.post("http://api.fanyi.baidu.com/api/trans/vip/translate?", {q: str,appid: "20180125000118573",salt: salt,from: "zn",to: "en",sign: sign});
    str = JSON.parse(res.body.string()).trans_result.map(val => val.dst).join('\n');
    return str;
}
toastLog(Baidu_zh_To_en("今天天气好晴朗"));