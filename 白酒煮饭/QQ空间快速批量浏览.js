openConsole();
qs=console.rawInput("输入开始QQ号");
log(qs);
js=9999999999;//console.rawInput("输入结束QQ号");
//log(js);

function stringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
}

function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}


importClass(android.util.Base64);
//var c = byteToString(Base64.decode("aHR0cDovL3d3dy5xcS5jb20v", 0));
//log(c);
//setClip(c);
//jiaqun();
for(qq=qs;qq<=js;qq++){
console.clear();
log(qs);
console.info(qq);
//log(js);
var e = byteToString(Base64.encode(stringToByte("https://qun.qq.com/qqweb/m/qun/checkin/index.html?gc="+qq+"&state=1"), 0));
log(e);
app.startActivity({
  action: "android.intent.action.VIEW",
  data: "mqqapi://forward/url?url_prefix="+e+"&souce=oicqzone.com&version=1&src_type=web",                       
  packageName: "com.tencent.mobileqq",
}); 
   sleep(5000);
}

/*
function jiaqun(){
app.startActivity({
    action: "android.intent.action.VIEW",
    data:"mqqapi://card/show_pslcard?uin=3194096648",
    packageName: "com.tencent.mobileqq",
});

while(true){
var c=packageName("com.tencent.mobileqq").className("android.widget.FrameLayout").id("name").descEndsWith("点击可赞").find();
sleep(100);
if(c.empty()){
  
   var c=packageName("com.tencent.mobileqq").className("android.widget.FrameLayout").id("name").descEndsWith("你已赞过").find();
if(c.empty()){}else{
    log("今天已赞过");
break;
}
}else{
log("帮我点赞中");
for(i=0;i<10;i++){
while(!c.click());
}
   break;
}
}

app.startActivity({
    action: "android.intent.action.VIEW",
    data:"mqqapi://card/show_pslcard?card_type=group&uin=679039516",
    packageName: "com.tencent.mobileqq",
});//打开qq群名片

while(true){
sleep(100);
var c=packageName("com.tencent.mobileqq").className("android.widget.Button").id("name").text("申请加群").find();
if(c.empty()){
c=packageName("com.tencent.mobileqq").className("android.widget.Button").id("name").text("发消息").find();
if(c.empty()){}else{
c.click();break;
}
}else{
c.click();break;
}
}

}
*/