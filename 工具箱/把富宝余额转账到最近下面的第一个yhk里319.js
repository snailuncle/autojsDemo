

点击我的()
余额=余额识别()
// 余额="0.01"
点击首页()
点击转账()
最近=找最近()
最近下方第一个银行卡控件=找最近下方第一个银行卡(最近)
log("最近下方第一个银行卡控件=")
log(最近下方第一个银行卡控件)

第一个银行卡的信息=找姓名和银行卡号(最近下方第一个银行卡控件)
log("最近下方第一个银行卡控件=")
log(最近下方第一个银行卡控件)

点击第一张银行卡(最近下方第一个银行卡控件)

输入金额(余额)

点击下一步()

点击确认转账()
点击立即付款()
sleep(2000)
输入密码()

点击完成()








function 点击我的(){
  var 我的=text("我的").findOne(2000)
  if(我的){
    // 我的.click()
    var x=我的.bounds().centerX()
    var y=我的.bounds().centerY()
    press(x,y,1)
    log(x,y)
    log('已经点击我的')
  }else{
    log('没有找到我的,脚本停止')
    exit()
  }
}
function 余额识别(){
  var 余额=bounds(208,710,649,748).findOne(2000)
  // var 余额=id("list_right_text").findOne(2000)
  if(余额){
    log('已经找到余额')
    log('余额=')
    余额=余额.child(0).text()
    log(余额)
    余额=余额.replace(/[元 ]/g, "")
    log('只提取金额')
    log(余额)
    return 余额
  }else{
    log('没有找到余额,脚本停止')
    exit()
  }
}

function 点击首页(){
  var 首页=text("首页").findOne(2000)
  if(首页){
    // 首页.click()
    var x=首页.bounds().centerX()
    var y=首页.bounds().centerY()
    press(x,y,1)
    log(x,y)
    log('已经点击首页')
  }else{
    log('没有找到首页,脚本停止')
    exit()
  }
}

function 点击转账(){
  var 转账=text("转账").findOne(2000)
  if(转账){
    // 转账.click()
    var x=转账.bounds().centerX()
    var y=转账.bounds().centerY()
    press(x,y,1)
    log(x,y)
    log('已经点击转账')
  }else{
    log('没有找到转账,脚本停止')
    exit()
  }
}

function 找最近(){
  var 最近=text("最近").findOne(2000)
  if(最近){
    log('已经找到最近')
    return 最近
  }else{
    log('没有找到最近,脚本停止')
    exit()
  }
}

function 找最近下方第一个银行卡(最近){
  // Rect(34, 659 - 720, 697)
  // Rect(0, 618 - 720, 698)
  // Rect(0, 698 - 720, 838)
  // 838-698=140
  var 银行卡控件的高度=140
  log(最近.parent().bounds())
  var 银行卡控件的左上角x=最近.parent().bounds().left
  var 银行卡控件的左上角y=最近.parent().bounds().bottom
  var 银行卡控件的右下角x=最近.parent().bounds().right
  var 银行卡控件的右下角y=最近.parent().bounds().bottom+银行卡控件的高度
  var 银行卡控件=bounds(银行卡控件的左上角x,银行卡控件的左上角y,银行卡控件的右下角x,银行卡控件的右下角y).findOne(2000)
  if(银行卡控件){
    log('已经找到银行卡控件')
    log(银行卡控件)
    return 银行卡控件
  }else{
    log('没有找到银行卡控件,脚本停止')
    exit()
  }
}

function 找姓名和银行卡号(银行卡控件){
  // className("TextView").findOne().children()
  var left=银行卡控件.bounds().left
  var top=银行卡控件.bounds().top
  var right=银行卡控件.bounds().right
  var bottom=银行卡控件.bounds().bottom
  log(left, top, right, bottom)
  // var 姓名=boundsInside(left, top, right, bottom).id('item_left_text').findOne(2000)
  // var 银行卡号=boundsInside(left, top, right, bottom).id('item_left_sub_text').findOne(2000)
  // log('姓名=')
  // log(姓名)
  // log('银行卡号=')
  // log(银行卡号)
  var 子控件s=boundsInside(left, top, right, bottom).className('TextView').find()

  // var uc = className("TextView").filter(function(w){
  var uc = 子控件s.filter(function(w){
    return w.id().length > 1;
  });
  log('uc=')
  log(uc)
  var 姓名=null
  var 银行卡号=null
  for(let i=0;i<uc.length;i++){
    log("uc["+i+"].id()=",uc[i].id())
    if(uc[i].id() == "com.alipay.mobile.antui:id/item_left_text"){
      姓名=uc[i].text()
      log('找到姓名了,姓名=')
      log(姓名)

    }
    if(uc[i].id() == "com.alipay.mobile.antui:id/item_left_sub_text"){
      银行卡号=uc[i].text()
      log('找到银行卡号了,银行卡号=')
      log(银行卡号)
    }
    if(姓名 && 银行卡号){
      return {
        "姓名":姓名,
        "银行卡号":银行卡号
      }
    }
  }
  return false
}


function 点击第一张银行卡(第一张银行卡){
  if(第一张银行卡){
    // 第一张银行卡.click()
    var x=第一张银行卡.bounds().centerX()
    var y=第一张银行卡.bounds().centerY()
    press(x,y,1)
    log(x,y)
    log('已经点击第一张银行卡')
  }else{
    log('没有找到第一张银行卡,脚本停止')
    exit()
  }
}

function 输入金额(金额){
  var 金额控件=找金额()
  var 金额控件的父控件=金额控件.parent()

  // className("TextView").findOne().children()
  var left=金额控件的父控件.bounds().left
  var top=金额控件的父控件.bounds().top
  var right=金额控件的父控件.bounds().right
  var bottom=金额控件的父控件.bounds().bottom
  log(left, top, right, bottom)
  // var 姓名=boundsInside(left, top, right, bottom).id('item_left_text').findOne(2000)
  // var 银行卡号=boundsInside(left, top, right, bottom).id('item_left_sub_text').findOne(2000)
  // log('姓名=')
  // log(姓名)
  // log('银行卡号=')
  // log(银行卡号)
  var 子控件s=boundsInside(left, top, right, bottom).className('EditText').find()

  // var uc = className("TextView").filter(function(w){

  log('子控件s=')
  log(子控件s)
  for(let i=0;i<子控件s.length;i++){
    log(子控件s[i].id())
    if(子控件s[i].id() == "com.alipay.mobile.ui:id/content"){
      log('找到了金额的输入框')
      log(子控件s[i].text())
      子控件s[i].setText(金额)
    }
  }

}


function 找金额(){
  var 金额=text("金额").findOne(2000)
  if(金额){
    log('已经找到金额')
    log("金额=",金额)
    return 金额
  }else{
    log('没有找到金额,脚本停止')
    exit()
  }
}


function 点击下一步(){
  var 下一步=text('下一步').findOne(2000)
  if(下一步){
    下一步.click()
    return true
  }
  return false
}

function 点击确认转账(){
  var 确认转账=text('确认转账').findOne(2000)
  if(确认转账){
    确认转账.click()
    return true
  }
  return false
}

function 点击立即付款(){
  var 立即付款=text('立即付款').findOne(2000)
  if(立即付款){
    log('找到了立即付款')
    var x=立即付款.bounds().centerX()
    var y=立即付款.bounds().centerY()
    press(x,y,1)
    return true
  }
  log('没有找到立即付款')

  return false
}

function 输入密码(){
  var 密码框={
    "1":{
      "x":152,
      "y":903
    },
    "2":{
      "x":365,
      "y":921
    },
    "3":{
      "x":605,
      "y":915
    }
  }
  var 密码="112233"

  for(i=0;i<密码.length;i++){
    单个数字=密码.charAt(i)
    var x=密码框[单个数字].x
    var y=密码框[单个数字].y
    sleep(100)
    press(x,y,1)
    sleep(900)
  }

}

function 点击完成(){
  var 完成=text("完成").findOne(2000)
  if(完成){
    // 完成.click()
    var x=完成.bounds().centerX()
    var y=完成.bounds().centerY()
    press(x,y,1)
    log(x,y)
    log('已经点击完成')
  }else{
    log('没有找到完成,脚本停止')
    exit()
  }
}
