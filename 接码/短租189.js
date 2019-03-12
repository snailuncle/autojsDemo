//var  用户名="";
//var  密码="";
//var  短租token="";
var  项目ID='6666666';

var 短租={};
var 接码用户名;
var 接码密码;
短租.token=function(接码用户名,接码密码){
  var url=util.format('http://api.jmyzm.com/http.do?action=loginIn&uid=%s&pwd=%s',接码用户名,接码密码)
log(接码用户名,接码密码);
var r = http.get(url);
log("code = " + r.statusCode);
var result=r.body.string()
log("html = " + result);

var token正则=new RegExp();
if(result.indexOf(接码用户名) != -1 ){
  var token=html.match(/yongquan1\|(\w+)/)[1]
  return token
}else{
  alert('获取token失败,请检查账号密码是否写错了,或者网络太差')
  exit()
}


}
       
    短租.获取手机号码=function (){
      var url=util.format('http://api.jmyzm.com/http.do?action=getMobilenum&pid=%s&uid=%s&token=%s&mobile=&size=1&vno=0',项目ID,用户名,短租token)
      log('获取手机号码url=%s',url)
      var r = http.get(url);
      log("code = " + r.statusCode);
      var 返回值=r.body.string()
      log("html = " + 返回值);
    
    
      // 返回值 = '13157024738|3d9599cdef4b3c3d5997930faa58ff11'
    
      if(返回值.indexOf(token) != -1){
        var 手机号码=返回值.match(/\d{11}(?=|)/)[0]
        log('手机号码=',手机号码)
        return 手机号码
      }else{
        log('获取手机号码异常')
        exit()
      }
    
    }


    //==================限定一分钟内获取验证码======================//

     
      
      短租.获取验证码=function(手机号){

for(let i=0;i<50;i++){
  var url=util.format('http://api.jmyzm.com/http.do?action=getVcodeAndReleaseMobile&uid=%s&token=%s&mobile=%s',用户名,短租token,手机号)
      
  var r = http.get(url);
  log("code = " + r.statusCode);
  var 返回值=r.body.string()
  log("html = " + 返回值);

  // 返回值 = '13157024738|3d9599cdef4b3c3d5997930faa58ff11'
  // 成功返回：手机号码|验证码短信

  if(返回值.indexOf(手机号) != -1){
    var 验证码=返回值.replace(/\d{11}\|/,'')
    log('验证码=',验证码)
    return 验证码
  }else if(返回值 == 'not_receive'){
    log('还没有接收到验证码,请让程序等待几秒后再次尝试')
    return false
  }else{
    log('获取验证码异常')
    return 'error'
  }
  sleep(3000)
}
      lgo("获取验证码异常")  
      }


    短租.拉黑手机号=function (手机号){
        var url=util.format('http://api.jmyzm.com/http.do?action=addIgnoreList&uid=%s&token=%s&mobiles=%s&pid=%s',用户名,短租token,手机号,项目ID)
      
        var r = http.get(url);
        log("code = " + r.statusCode);
        var 返回值=r.body.string()
        log("html = " + 返回值);
        if(返回值 == '1'){
          log('拉黑成功')
        }else{
          log('拉黑失败')
        }
      
      }

// log(账户信息)
module.exports=短租;
