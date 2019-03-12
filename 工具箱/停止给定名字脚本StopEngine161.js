/*此代码保存为 StopEngine.js
 在调用方使用: 声明 var stscript= require('./StopEngine.js');
             调用 stscript("1.js");
 代码作用: 停止给定脚本。
 疑问:模块单独运行会提示错误
 不黑从autojs论坛保存
 */
  

function stopscript(scriptname){
  var execution=engines.all();
  for(var i=0;i<execution.length;i++){
      //toastLog("i=0"+"|"+execution[0].getSource().toString().match(/([^/]+)$/)[1]+"///");
      //toastLog("i="+i+"|"+execution.length+"|"+"长度");
    // toastLog("i="+i+"|"+execution[i].getSource().toString().match(/([^/]+)$/)[1]+"///");
   
   if( scriptname== execution[i].getSource().toString().match(/([^/]+)$/)[1] ){
      execution[i].forceStop();
      toastLog("已停止"+scriptname);
    }
  }

}
module.exports=stopscript;




