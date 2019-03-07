/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  启动,停止指定app, 启动,停止最新安装的app, 向输入框输入字符
 */
//定义悬浮窗控制模块，命名为(悬块)。
var info=
'作者:家'+'\n'+
'QQ:203118908'+'\n'+
'功能:'+'\n'+'启动和停止指定app'+'\n'+'启动和停止最新app'+'\n'+'输入指定文字'+'\n\n'+
'注意:'+'\n'+'停止app功能需要root权限,其余功能不需要'+'\n'+'需安卓7以上,需打开无障碍'


alert(info)

var appAndYaoQingMa=init()


function init(){
var appAndYaoQingMa = storages.create("appAndYaoQingMa");
var appName=''
var yaoQingMa=''
if (appAndYaoQingMa.get("appName")==null){
}else{
  appName=appAndYaoQingMa.get("appName")
}
if (appAndYaoQingMa.get("yaoQingMa")==null){
}else{
  yaoQingMa=appAndYaoQingMa.get("yaoQingMa")
}

  return {
    appAndYaoQingMa:appAndYaoQingMa,
    appName:appName,
    yaoQingMa:yaoQingMa
  }
}
































function 悬块(window, view) {
  //判断是否缺少构造参数。
  if (!window || !view) {
      //缺少构造参数，抛出错误。
      throw "缺参数";
  };
  this.outSideStatus=false
  this.outSide=function(){
    window.setPosition(device.width,device.height)
    this.outSideStatus=true
  }
  this.standAside=function(w){
    this.outSideStatus=false
    var rightCenter=rightCenter || false
    var x=window.x
    var y=window.y
    var width=window.getWidth()
    var height=window.getHeight()
    var sideX=device.width-width
    if(w){
      var sideY=w.getY()-height
    }else{
      var sideY=device.height/4
    }
    log(sideX,sideY)
    window.setPosition(sideX,sideY)
  }
  //记录按键被按下时的触摸坐标
  this.x = 0, this.y = 0;
  this.getX=window.x
  this.getY=window.y
  //记录按键被按下时的悬浮窗位置
  this.windowX, this.windowY;
  //按下时长超过此值则执行长按等动作
  this.downTime = 500;
  //记录定时执行器的返回id
  this.Timeout = 0;
  //创建点击长按事件
  this.Click = function() {};
  this.LongClick = function() {};
  //可修改点击长按事件
  this.setClick = function(fun) {
      //判断参数类型是否为函数？
      if (typeof fun == "function") {
          this.Click = fun;
      };
  };
  this.setLongClick = function(fun, ji) {
      //判断参数类型是否为函数？
      if (typeof fun == "function") {
          this.LongClick = fun;
          //判断参数是否可为设置数字？
          if (parseInt(ji) <= 1000) {
              this.downTime = parseInt(ji);
          };
      };
  };
  view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
      //判断当前触控事件，以便执行操作。
      switch (event.getAction()) {
          //按下事件。
          case event.ACTION_DOWN:
              //按下记录各种坐标数据。
              this.x = event.getRawX();
              this.y = event.getRawY();
              this.windowX = window.getX();
              this.windowY = window.getY();
              //创建一个定时器用来定时执行长按操作。
              this.Timeout = setTimeout(() => {
                  this.LongClick();
                  this.Timeout = 0;
              }, this.downTime);
              return true;
              //移动事件。
          case event.ACTION_MOVE:
              //移动距离过大则判断为移动状态
              if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                  //移动状态清除定时器
                  if (this.Timeout) {
                      //定时器存在则清除定时器。
                      clearTimeout(this.Timeout);
                      this.Timeout = 0;
                  };
                  //移动手指时调整悬浮窗位置
                  window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
              };
              return true;
              //抬起事件。
          case event.ACTION_UP:
              if (this.Timeout) {
                  //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                  //清除定时器。
                  clearTimeout(this.Timeout);
                  this.Timeout = 0;
                  //执行点击事件。
                  this.Click();
              };
              return true;
      };
      //控件的触控事件函数必须要返回true。否则报错。
      return true;
  }));
};


var hideWindow=floaty.rawWindow(
  <frame id='main' bg='#0000ff'>
  <button id='hide' textSize="16sp"  layout_width='wrap_content' layout_height='wrap_content'   bg='#ff0000' text='隐身'/>
  {/* <button id='switch' textSize="16sp"  w='60' h='60'  bg='@drawable/ic_android_black_48dp'/> */}
  </frame>
)
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var hideAd = new 悬块(hideWindow, hideWindow.hide);
//设置长按事件。
hideAd.setLongClick(function() {
  //输出气泡信息。
  toast("脚本已关闭");
  //脚本停止代码。
  exit();
});
//设置点击事件。
hideAd.setClick(function() {
  //输出气泡信息。
  toast("点击");
  //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
  if (thread ? !thread.isAlive() : true) { //线程没有运行。
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('悬浮按钮被点击了')
      });
      //新建一个线程，赋值给变量thread
      thread = threads.start(function() {
          try {
              hideMain();
          } catch (e) {
              toastLog(e);
          };
          //运行完毕修改按钮文字
          ui.run(() => {
          //在ui线程中修改按钮的文字
            toastLog('点击事件中的方法运行完毕')
          });
      });
  } else {
      thread.interrupt();
      //中断线程;
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('点击事件中的方法被中断了')
      });
  };
});
hideWindow.setPosition(device.width/4,device.height/6)
setTimeout(
  function (){
    ad.standAside()

  },500
)
setTimeout(
  function (){

    hideAd.standAside(window)
  },700
)
function hideMain(){
  if(ad.outSideStatus){
    ad.standAside()

  }else{
    ad.outSide()

  }
  // window.standAside()
}




















var appName=appAndYaoQingMa.appName
var yaoQingMa=appAndYaoQingMa.yaoQingMa
var window=floaty.rawWindow(
<vertical bg='#0000ff'>
  <button id='移动悬浮窗' text="移动悬浮窗" />
  <EditText margin='6' id='appName' layout_width='match_parent' layout_height='wrap_content' hint='填写app名字' text='{{appName}}'>
    </EditText>
  <horizontal>
    <button id='启动指定app' text="启动" />
    <button id='停止指定app' text="停止" />
  </horizontal>
  <horizontal>
    <button id='启动最新app' text="启动最新" />
    <button id='停止最新app' text="停止最新" />
  </horizontal>
  <horizontal>
    <button id='输入邀请码' text="邀请码" />
    <EditText margin='6' id='邀请码' layout_width='match_parent' layout_height='wrap_content' hint='邀请码' text='{{yaoQingMa}}'>
    </EditText>
  </horizontal>
</vertical>
  )


  setTimeout(
    // function(){
    //   sideSlipWindow.透明度.setText(透明度范围提示内容)
    //   var 透明度value=sideSlipWindow.透明度value.text()
    //   var 上次的透明度范值=storage.get("上次的透明度范值")
    //   if(上次的透明度范值){}else{return}
    //   var 上次的透明度范值=sideSlipWindow.透明度.text()
    //   storage.put("上次的透明度范值", 上次的透明度范值);
    //   sideSlipWindow.透明度value.setText(上次的透明度范值)
    // }
    function (){
      window.appName.addTextChangedListener(
        new android.text.TextWatcher({
          afterTextChanged:function(text){
            log('afterTextChanged:function(text){',text)
            log(text.toString())
            log(text)
              appAndYaoQingMa.appAndYaoQingMa.put('appName',text.toString())
          }
        })
      )


      window.邀请码.addTextChangedListener(
        new android.text.TextWatcher({
          afterTextChanged:function(text){
            log('afterTextChanged:function(text){',text)
              appAndYaoQingMa.appAndYaoQingMa.put('yaoQingMa',text.toString())
          }
        })
      )


    }
    ,500)



setInterval(()=>{},1000)
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.移动悬浮窗);
//设置长按事件。
ad.setLongClick(function() {
  //输出气泡信息。
  toast("脚本已关闭");
  //脚本停止代码。
  exit();
});
//设置点击事件。
ad.setClick(function() {
  //输出气泡信息。
  toast("点击");
  //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
  if (thread ? !thread.isAlive() : true) { //线程没有运行。
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('悬浮按钮被点击了')
      });
      //新建一个线程，赋值给变量thread
      thread = threads.start(function() {
          try {
              Main();
          } catch (e) {
              toastLog(e);
          };
          //运行完毕修改按钮文字
          ui.run(() => {
          //在ui线程中修改按钮的文字
            toastLog('点击事件中的方法运行完毕')
          });
      });
  } else {
      thread.interrupt();
      //中断线程;
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('点击事件中的方法被中断了')
      });
  };
});
window.setPosition(device.width/4,device.height/6)


var inputBoxViewArr=[
  window.appName,
  window.邀请码,
]
使所有输入框点击时都能弹出输入法(window,inputBoxViewArr)











function Main(){
  toastLog('隐藏悬浮窗')
  window.outSide()
};



window.停止指定app.on(
  "click", function () {
    var appName=window.appName.getText();
    toastLog('您输入的APP是'+appName)
    停止指定app(appName);
    toastLog('停止指定app结束'+appName)
  }
)
window.启动指定app.on(
  "click", function () {
    var appName=window.appName.getText();
    toastLog('您输入的APP是'+appName)
    启动指定app(appName);
    toastLog('启动指定app结束'+appName)
  }
)
window.停止最新app.on(
  "click", function () {
    var appName=停止最新app();
    toastLog('停止指定app结束'+appName)
  }
)
window.启动最新app.on(
  "click", function () {
    var appName=启动最新app();
    toastLog('启动指定app结束'+appName)
  }
)
// setTimeout(() => {

// }, timeout);

window.输入邀请码.on(
  "click", function () {
    window.disableFocus()
    setTimeout(
      ()=>{
        var appName=window.邀请码.getText();
        toastLog('您输入的邀请码是'+appName)
        input(appName);
        toastLog('输入邀请码完毕'+appName)

      },1000
    )
  }
)


function 停止指定app(appName) {
  var packageName=getPackageName(appName);
  shell('am force-stop ' + packageName,true);
}
function 启动指定app(appName) {
  var packageName=getPackageName(appName);
  launch(packageName)
}



function 停止最新app(){
  var pm = context.getPackageManager()
  var appList=pm.getInstalledApplications(0)
  var appInfoList=[]
  for(let i=0;i<appList.size();i++){
    var app=appList.get(i)
    var appInfo={
      appName:app.loadLabel(pm),
      packageName:app.packageName,
      isSystemApp:app.isSystemApp(),
      firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
    }
    appInfoList.push(appInfo)

  }
  appInfoList.sort((a,b)=>{
    return b.firstInstallTime-a.firstInstallTime
  })
  log('最新安装的app是=%j',appInfoList[0])




  var packageName=appInfoList[0].packageName
  shell('am force-stop ' + packageName,true);
  return appInfoList[0].appName
}



function 启动最新app(){
  var pm = context.getPackageManager()
  var appList=pm.getInstalledApplications(0)
  var appInfoList=[]
  for(let i=0;i<appList.size();i++){
    var app=appList.get(i)
    var appInfo={
      appName:app.loadLabel(pm),
      packageName:app.packageName,
      isSystemApp:app.isSystemApp(),
      firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
    }
    appInfoList.push(appInfo)

  }
  appInfoList.sort((a,b)=>{
    return b.firstInstallTime-a.firstInstallTime
  })
  log('最新安装的app是=%j',appInfoList[0])




  var packageName=appInfoList[0].packageName
  launch(packageName)
  return appInfoList[0].appName
}










function 使输入框点击时输入法弹出来(window,view){
  view.on(
    "touch_down", function () {
      window.requestFocus();
      view.requestFocus();
    }
  )
  view.on(
    "key", function (keyCode,event) {
      if(event.getAction()==event.ACTION_DOWN && keyCode == keys.back){
        window.disableFocus()
        event.consumed=true
      }
      window.requestFocus();
      view.requestFocus();
    }
  )

}

function 使所有输入框点击时都能弹出输入法(window,inputBoxViewArr){
  for(let i=0;i<inputBoxViewArr.length;i++){
    var view=inputBoxViewArr[i]
    使输入框点击时输入法弹出来(window,view)
  }
}
