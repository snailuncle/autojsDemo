// 版本号  1.0
/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   bmob用户验证demo
 * 参数:　　白嫖时间，有不知道啥意思的吗？O(∩_∩)O哈哈~
 */
function init(){
  你要运行的脚本Id=false
  storage = storages.create("登录界面");
  myHashCode=getHashCode()
  appId=''
  restKey=''
  检查云端和本地设备信息是否一致的时间间隔=6*1000　//６秒
  白嫖时长=100*1000 // 10秒
}
init()

function 你要运行的脚本放这里(){
  for(var i=0;i<3;i++){
    toastLog(i+' '+'autojs啥时候发pro')
    sleep(2000)
  }
  toastLog('你要运行的脚本放这里 运行完毕')
  sleep(2000)
}

function 获取设备信息(账号,密码){
  log('hashCode='+hashCode)
  var 屏幕宽度 =  device.width;
  var 屏幕高度 =  device.height;
  var 制造商 =  device.brand;
  var 型号 =  device.model;
  var 唯一标识码 = device.fingerprint;
  var info={
    hashCode:myHashCode,
    width:屏幕宽度,
    height:屏幕高度,
    brand:制造商,
    model:型号,
    fingerprint:唯一标识码,
    username:账号,
    password:密码
  }
  return info
}

function 云端有这个用户名(username){
  var url='https://api2.bmob.cn/1/users'
  var where={
    username:username
  }
  where=JSON.stringify(where)
  url=encodeURI(url+'?where='+where)
  log('url='+url)
  var headers={
    'X-Bmob-Application-Id': appId,
    'X-Bmob-REST-API-Key': restKey
  }
  log(headers)
  var r=http.get(url,{headers:headers}).body.json().results
  if(r.length == 0){
    return false
  }
  log(r[0])
  return r[0]
}
function 登录(username,password){
  var url = 'https://api2.bmob.cn/1/login'
  url = util.format('%s?username=%s&password=%s', url, username, password)
  url = encodeURI(url)
  var headers = {
    'X-Bmob-Application-Id': appId,
    'X-Bmob-REST-API-Key': restKey,
    'Content-Type': 'application/json'
  }
  var r = http.get(url, {
    headers: headers
  })
  var bodyJson=r.body.json()
  if(bodyJson && bodyJson.hasOwnProperty('username')){
    log('登录成功后获取到了登录信息')
    return bodyJson
  }else{
    log('登录失败')
    return false
  }

}
function 提交设备信息到云端(本机设备信息){
  var username=本机设备信息.username
  var password=本机设备信息.password
  if(云端有这个用户名(username)){
    log('用户名已存在')
    var 登录结果=登录(username,password)
    if(登录结果){
      log('密码正确,登录成功')
      var sessionToken=登录结果.sessionToken
      var objectId=登录结果.objectId
      log('sessionToken=')
      log(sessionToken)
      var url='http://api2.bmob.cn/1/users/'+objectId
      var headers={
        "X-Bmob-Application-Id": appId,
        "X-Bmob-REST-API-Key": restKey,
        'Content-Type': 'application/json',
        'X-Bmob-Session-Token': sessionToken
      }
      var body=本机设备信息
      body=JSON.stringify(body)
      var options={headers:headers,method:'PUT',body:body}
      log(options)
      r=http.request(url,options).body.json()
      log(r)
      // updatedAt=2019-03-23 23:18:50
      if(r.hasOwnProperty('updatedAt')){
        return true
      }else{
        var functionName=arguments.callee.name
        alert(util.format('%s-失败',functionName))
        return false
      }
    }else{
      log('已经存在的账号登录失败')
      //--------------------------------
      alert('登录失败')
      return false
    }

  }else{
    log('云端还没有这个用户')
    return 创建新用户(本机设备信息)
  }
}
function 创建新用户(本机设备信息){
  log(本机设备信息)
  var url = "https://api2.bmob.cn/1/users";
  var r = http.postJson(url, 本机设备信息,{
    headers:{
      'X-Bmob-Application-Id': appId,
      'X-Bmob-REST-API-Key': restKey,
      'Content-Type': 'application/json'
    }
  });
  var code = r.statusCode
  if(code == '201'){
    log('创建新用户成功')
    return r.body.json()
  }else{
    alert('创建新用户失败')
    log(r.body.string())
    return false
  }
}
function 隐藏登录窗口(window){
  log('function 隐藏登录窗口(window)')
  log(window)

      log('隐藏登录窗口(window)')
      log(window)
      var w=window.getWidth()
      var x=window.getX()
      var y=window.getY()
      storage.put('登录界面',JSON.stringify([x,y]))
      window.setPosition(device.width+w,y)


}
function 显示登录窗口(window){
  var w=window.getWidth()
  var x=window.getX()
  var y=window.getY()
  var xy=JSON.parse(storage.get('登录界面'))
  x=xy[0]
  y=xy[1]
  window.setPosition(x,y)
}
function 小白点靠边站(window){
  var w=window.getWidth()
  var x=window.getX()
  var y=window.getY()
  window.setPosition(device.width-w,device.height/2)
}
var 小白点=floaty.rawWindow(
  <frame  bg="#00ff0000">
  <img id='circleImg' circle="true" borderWidth="5" borderColor="gray" scaleType='centerInside'  src="@drawable/ic_stars_black_48dp" />
</frame>
)
var 小白点Size=168
小白点.setSize(小白点Size,小白点Size)
隐藏登录窗口(小白点)
function 运行主脚本(){
  小白点.circleImg.post(new java.lang.Runnable(
    ()=>{
      隐藏登录窗口(登录界面)
      小白点靠边站(小白点)

      悬控移动和点击(小白点,'小白点',小白点.circleImg,点击了小白点要做的事情)

    }
  ))
  if(你要运行的脚本Id){
    你要运行的脚本Id.interrupt()

  }
  你要运行的脚本Id=threads.start(
    function(){
      你要运行的脚本放这里()
    }
  )
}
function 点击了小白点要做的事情(){
  toastLog('点击了小白点')
  if(window在屏幕之内(登录界面)){
    隐藏登录窗口(登录界面)
  }else{
    显示登录窗口(登录界面)
  }
}
function window在屏幕之内(window){
  var x=window.getX()
  var y=window.getY()
  var w=window.getWidth()
  var h=window.getHeight()
  var centerX=x+w/2
  var centerY=y+h/2
  if(centerX>0 && centerX<device.width &&centerY>0 && centerY<device.height){
    return true
  }else{
    return false
  }
}
function main(账号,密码){
  toastLog('开始执行'+arguments.callee.name)
  var 本机设备信息=获取设备信息(账号,密码)

  var 提交设备信息到云端结果=提交设备信息到云端(本机设备信息)
  if(!提交设备信息到云端结果){
    alert('请检查网络和账号密码')
    return false
  }

  间歇性检查设备信息(账号,本机设备信息)
  运行主脚本()


}
function 间歇性检查设备信息(账号,本机设备信息){
  // 5分钟检查一下同账号下的设备信息和本机设备信息是否一样
  // var intervalTime=5*60*1000
  // var oneDay=24*3600*1000
  var intervalTime=检查云端和本地设备信息是否一致的时间间隔
  var oneDay=白嫖时长

  setInterval(
    function(){
      var 云端设备信息=获取云端设备信息(账号)
      if (!(isSame2Obj(本机设备信息,云端设备信息))) {
        alert('我们不一样,告辞!')
        exit()
      }
      var 白嫖时间=获取白嫖时间(账号)
      if(白嫖时间>oneDay){
        alert('白嫖一天,该休息了')
        exit()
      }
    },intervalTime
  )
}
function 获取云端设备信息(username) {
  var url = 'https://api2.bmob.cn/1/users'
  var where = {
    username: username
  }
  where = JSON.stringify(where)
  url = encodeURI(url + '?where=' + where)
  log('url=' + url)
  var headers = {
    'X-Bmob-Application-Id': appId,
    'X-Bmob-REST-API-Key': restKey
  }
  log(headers)
  var r = http.get(url, {
    headers: headers
  }).body.json().results
  if (r.length == 0) {
    alert(arguments.callee.name + '失败')
    return false
  }
  log(r[0])
  return r[0]
}
function isSame2Obj(obj1,obj2){
  for(var k in obj1){
    if(k=='password'){
      continue;
    }
    var v=obj1[k]
    if(obj2.hasOwnProperty(k) && obj2[k] == v){

    }else{
      log('不一样的字段是'+k.toString())
      log('obj1.'+k.toString()+'='+v.toString())
      if(obj2.hasOwnProperty(k)){
        log('obj2.'+k.toString()+'='+obj2[k].toString())
      }
      return false
    }
  }
  return true
}
function 提取云端该用户的创建时间(username){
  var url='https://api2.bmob.cn/1/users'
  var where={
    username:username
  }
  where=JSON.stringify(where)
  url=encodeURI(url+'?where='+where)
  log('url='+url)
  var headers={
    'X-Bmob-Application-Id': appId,
    'X-Bmob-REST-API-Key': restKey
  }
  log(headers)
  var r=http.get(url,{headers:headers}).body.json().results
  if(r.length == 0){
    alert(arguments.callee.name+'失败')
    return false
  }
  log(r[0])
  return dateToStamp(r[0].createdAt)
}
function dateToStamp(s) {
  var simpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  var date = simpleDateFormat.parse(s);
  var ts = date.getTime();
  return ts;
}


function 获取白嫖时间(username){
  var 用户创建时间的时间戳=提取云端该用户的创建时间(username)
  var 当前时间=new Date().getTime()
  var result=当前时间-用户创建时间的时间戳
  return result
}

var marginSize=3
var margin=new Array(4).join(marginSize+' ')
var 登录界面=floaty.rawWindow(
<vertical bg='#FFB6C1'>
  <text id='标题' textSize='30sp' textStyle='bold|italic' textColor='#DA70D6' gravity="center" margin="{{margin}}" >登录界面</text>
  <TableLayout>
    <TableRow>
      <text layout_weight="1" margin="{{margin}}" bg='#00BFD8' layout_width="0dp" >账号</text>
      <input id="账号" hint="输入字母数字"

      digits="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      margin="{{margin}}" layout_weight="2" text="" textSize="16sp" focusable="true" bg='#D8BFD8'
        layout_width="0dp" />
    </TableRow>
    <TableRow>
      <text layout_weight="1" layout_width="0dp" margin="{{margin}}" bg='#00BFD8' >密码</text>
      <input id='密码' textSize="16sp"
      inputType="textPassword"
      digits="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"


      hint="输入字母数字"  layout_width="0dp" layout_weight="2" margin="{{margin}}" bg='#D8BFD8' />
    </TableRow>
    <TableRow>
      <button id='登录' margin="{{margin}}" layout_weight="2">登录/注册/运行</button>
      <button id='移动' margin="{{margin}}" layout_weight="1">移动</button>
    </TableRow>
  </TableLayout>
</vertical>
)

登录界面.setPosition(device.width/3,device.height/2)
setInterval(
  ()=>{},3000
)

var 标题view=登录界面.标题
var 账号view=登录界面.账号
var 密码view=登录界面.密码
var 登录view=登录界面.登录
var 移动view=登录界面.移动
var window=登录界面

function 纯字母数字(s) {
  var regu = "^[0-9a-zA-Z]{6,}$";
  var re = new RegExp(regu);
  if (re.test(s)) {
    return true;
  } else {
    return false;
  }
}
登录view.on("click",()=>{
  window.disableFocus();
  var 账号=账号view.getText().toString()
  var 密码=密码view.getText().toString()
  if(纯字母数字(账号) && 纯字母数字(密码)){

  }else{
    alert('只允许输入字母和数字,至少6个字符')
    return false
  }
  var msg=util.format('账号: %s, 密码: %s',账号,密码)
  toastLog(msg)

  标题view.setText('登陆中,请稍后')
  登录view.setEnabled(false)
  setTimeout(function(){
  登录view.setEnabled(true)
  },3000);


  setTimeout(() => {
    //--------------主函数在这里执行------------------------------
    threads.start(
      function(){
        main(账号,密码)

      }
    )
  }, 100);
})
账号view.on("key", function(keyCode, event){
  if(keyCode == keys.back){
      window.disableFocus();
      event.consumed = true;
  }
});
账号view.on("touch_down", ()=>{
  把悬浮窗放到屏幕上半部分(window)
  window.requestFocus();
  账号view.requestFocus();
});
密码view.on("key", function(keyCode, event){
  把悬浮窗放到屏幕上半部分(window)
  if(keyCode == keys.back){
      window.disableFocus();
      event.consumed = true;
  }
});
密码view.on("touch_down", ()=>{
  把悬浮窗放到屏幕上半部分(window)
  window.requestFocus();
  密码view.requestFocus();
});
密码view.on("touch_down", ()=>{
  把悬浮窗放到屏幕上半部分(window)
  window.requestFocus();
  密码view.requestFocus();
});
var 点击移动按钮后要执行的动作=()=>{alert('我是移动')}
悬控移动和点击(window,'移动按钮',移动view,点击移动按钮后要执行的动作)
function 把悬浮窗放到屏幕上半部分(window){
  var x=window.getX()
  var y=window.getY()
  var w=window.getWidth()
  var h=window.getHeight()
  y=device.height/2-h
  window.setPosition(x,y)
}

function 悬控移动和点击(window,viewName,view,clickAction){
  log('您点击的view是->',viewName)
  var show=function(){toast('view被点了')}
  //记录按键被按下时的触摸坐标
  var x = 0, y = 0;
  //记录按键被按下时的悬浮窗位置
  var windowX, windowY;
  //记录按键被按下的时间以便判断长按等动作
  var downTime;
  var onClick=show
  if(clickAction){
    onClick=()=>{clickAction()}
  }

  view.setOnTouchListener(function(view, event){
      switch(event.getAction()){
          case event.ACTION_DOWN:
              x = event.getRawX();
              y = event.getRawY();
              windowX = window.getX();
              windowY = window.getY();
              downTime = new Date().getTime();
              return true;
          case event.ACTION_MOVE:
              //移动手指时调整悬浮窗位置
              window.setPosition(windowX + (event.getRawX() - x),
                  windowY + (event.getRawY() - y));
              //如果按下的时间超过5秒判断为长按，退出脚本
              if(new Date().getTime() - downTime > 5500){
                  exit();
              }
              return true;
          case event.ACTION_UP:
              //手指弹起时如果偏移很小则判断为点击
              if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                  onClick(clickAction);
              }
              return true;
      }
      return true;
  });
}


//-----------------------下面的是生成一个哈希数字----------------------------------------------------------------------------------------------------------
// 方法是gethashcode()
//产生一个hash值，只有数字，规则和java的hashcode规则相同
function hashCode(str) {
  var h = 0;
  var len = str.length;
  var t = 2147483648;
  for (var i = 0; i < len; i++) {
      h = 31 * h + str.charCodeAt(i);
      if (h > 2147483647) h %= t; //java int溢出则取模
  }
  /*var t = -2147483648 * 2;
   while (h > 2147483647) {
   h += t
   }*/
  return h;
}

//时间戳来自客户端，精确到毫秒，但仍旧有可能在在多线程下有并发，
//尤其hash化后，毫秒数前面的几位都不变化，导致不同日期hash化的值有可能存在相同，
//因此使用下面的随机数函数，在时间戳上加随机数，保证hash化的结果差异会比较大
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** 用法  randomWord(false,6);规定位数 flash
*      randomWord(true,3，6);长度不定，true
* arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
*/
function randomWord(randomFlag, min, max) {
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
  }
  return str;
}
//获取hashcode
function getHashCode() {
  //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
  var timestamp = (new Date()).valueOf();
  var myRandom=randomWord(false,6);
  var hashcode=hashCode(myRandom+timestamp.toString());
  return hashcode;
}


