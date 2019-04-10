auto.waitFor();
//对方QQ号码
var QNum = '';
//红包金额
var Money = '';
//自己的支付密码
var PaymentPass = '';

var i = app.intent({
    action: "VIEW",
    data: "mqqwpa://im/chat?chat_type=wpa&uin="+QNum
});
app.startActivity(i);

waitForActivity('com.tencent.mobileqq.activity.SplashActivity');
sleep(2000);
//判断是否弹出键盘
var inputBar_Y = id('inputBar').findOne().bounds().centerY()
if (inputBar_Y > (device.height/5)*4) {
    id('listView1').findOne().parent().child(6).child(4).click();
} else {
    id('listView1').findOne().parent().child(5).child(4).click();
}

text('普通红包').waitFor();
while(!click('普通红包'));
text('塞钱').waitFor();
text('输入金额').setText(Money);
sleep(200);
textStartsWith('塞钱').findOne().click();
text('找回密码').waitFor();
desc('支付密码输入框').setText(PaymentPass);