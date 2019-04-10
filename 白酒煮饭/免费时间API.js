//淘宝时间戳API
var recode_taobao = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
var tapbaoTime = recode_taobao.body.json().data.t;
log(tapbaoTime);
//腾讯QQ时间API
var recode_qq = http.get("http://cgi.im.qq.com/cgi-bin/cgi_svrtime");
var qqTime = recode_qq.body.string();
log(qqTime);
//苏宁时间API
var recode_suning = http.get("http://quan.suning.com/getSysTime.do");
var suningTime = recode_suning.body.json();
log(suningTime.sysTime1);
log(suningTime.sysTime2);