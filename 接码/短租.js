// 首先定义一个配置文件, 用来存放接码用到的信息.
// 其中vno=0是排除虚拟号码170之类的,extrackVcode时用来提取验证码的,因为各个平台验证码短信不一样,只能按实际情况编写, VcodeTimeout是短信超时,设置为1分钟.
var config = {
  username: 'autojs',
  pasword: 'duanzu',
  baseUrl:'http://api.jmyzm.com/http.do',
  项目ID:'1234',
  vno:'0',
  VcodeTimeout:60*1000,
  extrackVcode:(Vcode)=>{
    return '1234'
  }
}
// 接码基本上就是http.get请求,所以我们做个函数复用,format用来拼接params参数
function get(url,params) {
  var res = http.get(url+format(params));
  try {
    var html = res.body.string();
    return html
  } catch (e) {
    return false
  }
}
function format(params){
  var r='?'
  for(var k in params){
    r+=k+'='+params[k]+'&'
  }
  return r
}
// 登录
function loginIn(config) {
  if(config.token){
    return config.token
  }
  //登录需要用户密码
  var username=config.username
  var pasword=config.pasword
  var baseUrl=config.baseUrl
  var params={
    uid:username,
    pwd:pasword,
    action:'loginIn'
  }
  var result=get(baseUrl,params)
  if(result){
    var token=result.replace(username+'|','')
    config.token=token
    return token
  }else{
    return false
  }
}
// 获取手机号码
在登录函数中,我们把token挂到了config上面.
function getMobilenum(config) {
  var params={
    action:'getMobilenum',
    pid:config.项目ID,
    uid:config.username,
    token:config.token,
    vno:config.vno
  }
  var baseUrl=config.baseUrl
  var result=get(baseUrl,params)
  if(result && /\d{11}/.test(result)){
    result=result.match(/\d{11}/)[0]
    config.mobile=result
    return result
  }else{
    return false
  }
}
// 获取验证码
function getVcodeAndReleaseMobile(config) {
  var params={
    action:'getVcodeAndReleaseMobile',
    uid:config.username,
    token:config.token,
    mobile:config.mobile
  }
  var baseUrl=config.baseUrl
  var startTime=new Date().getTime()
  while(1){
    var endTime=new Date().getTime()
    var spendTime=endTime-startTime
    if(spendTime>config.VcodeTimeout){
      return false
    }
    var result=get(baseUrl,params)
    if(result && /\d{11}/.test(result)){
      result=result.replace(mobile+'|','')
      config.VcodeFullText=result
      config.Vcode=config.extrackVcode(result)
      return config.Vcode
    }else{
      if('not_receive'===result){
        sleep(6000)
        continue;
      }else{
        return false
      }
    }
  }
}
// 拉黑号码
function addIgnoreList(config) {
  var params={
    action:'addIgnoreList',
    pid:config.项目ID,
    uid:config.username,
    token:config.token,
    mobiles:config.mobile
  }
  var baseUrl=config.baseUrl
  get(baseUrl,params)
}
