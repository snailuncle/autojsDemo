//请求截图 
if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}


//打开微信
launchApp("微信");

w=device.width
h=device.height
金额=0.01
//点击屏幕底部,我的
var x1=0
var y1=Math.floor(h/6*5)
var x2=w
var y2=h

log(x1,y1,x2,y2)

微信下方四个选项=id('chn').boundsInside(x1,y1,x2,y2).find()
var checkedMe=我是否选中()
if(!checkedMe){
  选中我()
}

//点击钱包
clickText('钱包')
sleep(1000)
clickText('零钱')
sleep(1000)
clickText('充值')
sleep(1000)
输入充值金额()
sleep(1000)
clickText('下一步')
sleep(1000)
clickText('立即支付')
sleep(1000)
输入支付密码的地方=id('bvs').findOne(1000)

输入支付密码的地方.setText(101017)
log('设置文本完毕')

//先找到上半部分,剩下的是数字区域
上半部分=id('e4s').findOne(1000).bounds()
log(上半部分)
x1=0
y1=上半部分.bottom
x2=上半部分.right
y2=h
//支付密码数字区域
log('支付密码数字区域=' ,x1,y1,x2,y2)

// 下半部分分成5份
// 高度大于5份,小于4份的

hMax=Math.floor((y2-y1)/4)
hMin=Math.floor((y2-y1)/5)
wMax=w
wMin=Math.floor(x2/10*9)

log('长宽限制为','高度最低,最高,宽度最低,最高',hMin,hMax,wMin,wMax)

// var 数字区域=className('LinearLayout').boundsInside(x1,y1,x2,y2).find()



var 数字区域=className('LinearLayout').boundsInside(x1,y1,x2,y2).filter(function(w){
  // log(w)
  // if(w.bounds().width()>=wMin){
  if(w.bounds().width()>=wMin && w.bounds().width()<=wMax && w.bounds().height()>=hMin && w.bounds().height()<=hMax){
    return true
  }else{
    return false
  }
}).find()



log('数字区域长度='+数字区域.length)

数字框=[]
for(var i = 0; i < 4; i++){
  var tv = 数字区域[i];
  // log(tv,'宽',tv.bounds().width(),'高',tv.bounds().height())
  数字框.push(tv.bounds())
}

log(数字框)
log('数字框长度='+数字框.length)

// 解析0-9的位置坐标
// 一个长框分成6份
六分之一框=Math.floor(w/6)
数字坐标={
  '1':{'x':六分之一框,'y':数字框[0].centerY()},
  '2':{'x':六分之一框*3,'y':数字框[0].centerY()},
  '3':{'x':六分之一框*5,'y':数字框[0].centerY()},
  '4':{'x':六分之一框,'y':数字框[1].centerY()},
  '5':{'x':六分之一框*3,'y':数字框[1].centerY()},
  '6':{'x':六分之一框*5,'y':数字框[1].centerY()},
  '7':{'x':六分之一框,'y':数字框[2].centerY()},
  '8':{'x':六分之一框*3,'y':数字框[2].centerY()},
  '9':{'x':六分之一框*5,'y':数字框[2].centerY()},
  '0':{'x':数字框[3].centerX(),'y':数字框[3].centerY()},
}

密码='384632'

for(i=0;i<密码.length;i++){
  var num=密码.charAt(i)
  log(num);
  点击密码(num)
  sleep(1000)
}






function 点击密码(num){
  // device.sdkInt<24?Tap(x,y):press(x,y,1);
  log("数字坐标["+num+"]=",数字坐标[num])
  var x=数字坐标[num].x
  var y=数字坐标[num].y
  log('x,y,',x,y)
  device.sdkInt<24?Tap(x,y):press(x,y,1);
}






function 输入充值金额(){

  x1=0
  y1=Math.floor(h/5)
  x2=w
  y2=Math.floor(h/5*3)
  充值金额填空之处=id('cr').boundsInside(x1,y1,x2,y2).findOne(1000)
  if(充值金额填空之处){
    充值金额填空之处.setText(金额)
    log('已经设置了金额'+金额)
  }
}





function clickText(控件文本){
  if(text(控件文本).findOne(100)){
    log('找到了'+控件文本)
    click(控件文本)
    log('点击了'+控件文本)
  }else{
    log('没找到'+控件文本)

  }
}





function 我是否选中(){
  for(var i = 0; i < 微信下方四个选项.length; i++){
    var tv = 微信下方四个选项[i];
    if(tv.text() == "我"){
      log(tv.text());
      if(截图找色(tv)){
        log('选中了我')
        return  true
        break;
      }
    }
  }
  log('没有选中我')
  return false
}
function 选中我(){
  for(var i = 0; i < 微信下方四个选项.length; i++){
    var tv = 微信下方四个选项[i];
    if(tv.text() == "我"){
      // log(tv)
      var x=tv.bounds().centerX()
      var y=tv.bounds().centerY()
      // press(x,y,10)
      device.sdkInt<24?Tap(x,y):press(x,y,1);
      log('点击了我');
      sleep(1000)
      break;
    }
  }
}






// 944, 1803, 0x46c01b
//927, 1856 - 963, 1905





function 截图找色(object){
  var img = captureScreen();
  var left=object.bounds().left
  var top=object.bounds().top
  var w=object.bounds().right-object.bounds().left
  var h=object.bounds().bottom-object.bounds().top

  var point = findColor(img, "#46c01b", {
    region: [left, top, w, h],
    threshold: 4
});
  if(point){
      log("找到绿色，坐标为(" + point.x + ", " + point.y + ")");
      log('变为绿色的对象是',object)
      return true
  }
  return false
}


