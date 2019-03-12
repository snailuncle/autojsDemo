//console.show()
requestScreenCapture();
 // <horizontal>


function xuanfuchuang(){
 w = floaty.window(
 <frame id="action"  bg="#90259911"  w="*" h="200">
     <linear w="340" h="200">
       <vertical padding="0">
          <vertical w="260" h="85" bg="#90251911">
            <text id="baidu" bg="#50251911"  color="#ffffffff" textSize="10sp">百度答案</text>
            <text id="sogou" bg="#50251921"  color="#ffffffff" textSize="10sp">搜狗答案</text>
            <text id="s360"  bg="#50251931"  color="#ffffffff" textSize="10sp">360答案</text>
            <text id="uc"  bg="#50251931"  color="#ffffffff" textSize="10sp">UC答案</text>
     </vertical>
       <vertical w="260" h="*" padding="-15">
         <webview id="aa" w="255" h="*" margin="16"/>
       </vertical>
     </vertical>
    <vertical gravity="left" >
        <button id="yidong" text="移动"   w="40" h="30" textSize="8sp" />
        <button id="zhanting" text="暂停" w="40" h="30" textSize="8sp"/>
        <button id="tuichu" text="退出"   w="40" h="30" textSize="8sp" />
        <button id="fanhui" text="返回"   w="40" h="50" textSize="8sp" />
        <button id="yunxin" text="截图"   w="40" h="80" textSize="8sp"/>
    </vertical>
   
    </linear>
 </frame>
);

setInterval(()=>{}, 1000);
    gengxin=0
    /*
    threads.start(function(){
    //在新线程执行的代码
    while(true){
       tmsuaxin()
        sleep(200)
    }
    
});*/
w.setPosition(5,800)
w.fanhui.click(()=>{
    toast("返回");
    ui.run(function(){
    w.aa.goBack();
});

});
w.yunxin.click(()=>{
    //setClip("uc截图")
   //  img = captureScreen();

    threads.start(function(){
    // str="uc截图看看"
    shitu()
});
});
w.zhanting.click(()=>{
    toast("暂停");
});
w.tuichu.click(()=>{
    toast("退出");
   // activity.finish();
       w.close();
    exit()
});

w.yidong.setOnTouchListener(function(view, event) {
  switch (event.getAction()) {
     case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      aw = w.getWidth();
      ah = w.getHeight();
      windowX = w.getX();
      windowY = w.getY();
      downTime = new Date().getTime();
      return true;
    case event.ACTION_MOVE:
      //移动手指时调整悬浮窗位置
      w.setPosition(windowX + (event.getRawX() - x),
        windowY + (event.getRawY() - y))
    case event.ACTION_UP:
   }
    return true;
})
 }
xuanfuchuang()
function shitu(){
    threads.start(function(){
           img = captureScreen();
        aa = images.clip(img, 80,400,1010-80,1240-400)
        images.saveImage(aa, "/sdcard/ucjt.png");
      toast("截图");
       // str="23:49:34.581/D: 儒家经典著作中保存相对完整,在先秦时期流传相对较广的是哪一部A:《诗经》B:《周易》移动暂停退出C:《春秋》秋》"
        main()
        str=str.toUpperCase()
        daan = []
        答案a = str.indexOf("A", 10);
        答案b=str.indexOf("B", 10);
        答案c=str.indexOf("C", 10);
         题目 = str.substr(0, 答案a)
        daan[0]=str.substr(答案a+2, 答案b-答案a-2)
        daan[1]=str.substr(答案b+2, 答案c-答案b-2)
        daan[2]=str.substr(答案c+2,str.length-答案c-2)
        log("题目"+题目)
    // str="uc截图看看"
       setClip("uc答题题目"+题目)
  显示=[]
        引擎 = ["百度:", "搜狗:", "360:", "UC"]
搜索网址 = []
搜索网址[0] = "www.baidu.com/s?word=" + 题目
搜索网址[1] = "https://www.sogou.com/web?query=" + 题目
搜索网址[2] = "http://m.so.com/s?q=" + 题目
搜索网址[3] = "http://so.m.sm.cn/s?q=" + 题目
for (var a = 0; a < 4; a++) {
  threads.start(function(){
    //在新线程执行的代码
     搜索(搜索网址[a],引擎[a])
  
});
 sleep(100)
}
      // http.get("http://www.zhinengweixiu.cn/fuzhu/ucdt/index.asp?"+str)
        ui.run(function(){
            settings= w.aa.getSettings()
            settings.setSupportZoom(true);
         settings.setUseWideViewPort(true);
       // settings.setLayoutAlgorithm(LayoutAlgorithm.NARROW_COLUMNS);  
       // settings.setLoadWithOverviewMode(true);
            settings.setTextZoom(40); //设置字体
            w.aa.loadUrl("http://www.baidu.com/s?word="+题目);//设置网址
      // w.aa.loadUrl("http://m.sogou.com/web/searchList.jsp?keyword="+str);
        //w.aa.loadUrl("http://m.so.com/s?q="+str);
        });
        });
}
function tmsuaxin(){
    img = captureScreen();
    var ys1 = images.pixel(img, 533,263)
    log(ys1)
    //var ys2 = images.pixel(img, 544,263)
   // 坐标:X:533  Y:263数字:-65177
    //坐标:X:544  Y:263数字:-1
    if(gengxin==0){
    if(ys1==-65177){
       shitu()
        toast("更新了")
        gengxin=1
      }
    }else if(gengxin==1){
         if(ys1==-1){
        gengxin=0
      }
      }
    
    
    }
function main() {
  //requestScreenCapture();
 // openConsole();
  access_token = "23.db829351c3e80c661ec357d7de155293.2592000.1518496490.3247496661-10688239";
  path = "/sdcard/ucjt.png";
  str = getimgtext(path, access_token);
  str=str.replace(/(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))/g, '')
    log(str);
    return true
}

function getimgtext(path, access_token) {
  url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
  var img = getbase64(path);
  var res = http.post(url, {
    image: img
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  img = "null";
  var html = res.body.string();
  var ht = cutstr(html, '{"words": "', '"}');
  return ht;
}

function getbase64(path) {
  var oin = null;
  oin = new java.io.FileInputStream(path);
  var lt = oin.available();
  var data = a(new Array(lt + 1) + "");
  lt = oin.read(data);
  return c(android.util.Base64.encode(data, 0));

}

function a(b) {
  return c(b).getBytes();
}

function c(a) {
  return java.lang.String(a);
}

function cutstr(a, b, c) {
  a = a.split(b);
  var d = "";
  for (i = 1; i < a.length; i++) {
    var tmp = a[i].split(c);
    if (tmp.length > 1) {
      d += tmp[0] + "\n";
    }
  }
  return d;
}

//console.show();
//题目 = "儒家经典著作中保存相对完整,在先秦时期流传相对较广的是哪一部"

//cishu = [0, 0, 0]
//https://m.sogou.com/web/searchList.jsp?uID=F39IEd7M7vFCOkDP&v=5&from=index&w=1274&t=1517201926728&s_t=1517201966019&s_from=index&keyword=%E5%84%92%E5%AE%B6%E7%BB%8F%E5%85%B8%E8%91%97%E4%BD%9C%E4%B8%AD%E4%BF%9D%E5%AD%98%E7%9B%B8%E5%AF%B9%E5%AE%8C%E6%95%B4%2C%E5%9C%A8%E5%85%88%E7%A7%A6%E6%97%B6%E6%9C%9F%E6%B5%81%E4%BC%A0%E7%9B%B8%E5%AF%B9%E8%BE%83%E5%B9%BF%E7%9A%84%E6%98%AF%E5%93%AA%E4%B8%80%E9%83%A8&pg=webSearchList&suguuid=3b4530c6-4869-4e2d-a0ef-1b54495bef63&sugsuv=AAH39mLaHQAAAAqRIjKAkgQAAwI%3D&sugtime=1517201966028
//https://www.sogou.com/web?query=%E4%BD%A0%E8%BF%98
//daan[0] = "诗经"
//daan[1] = "周易"
//daan[2] = "春秋"


function 搜索(网址,引擎) {
   var 答案 = 引擎 + "最佳:"
   var 参考答案 = "参考:"
  var 网页 = http.get(网址);
  //log("code = " + r.statusCode);
 var 网页内容 = 网页.body.string()
  //log(网页内容)
 var zjda = cuxiancishu(网页内容, "最佳答案", 100)
  if (zjda) {
    for (var a = 0; a < 3; a++) {
    var  选项 = cuxiancishu(zjda.join(""), daan[a]).length
      if (选项) {
        答案 += daan[a] + 选项 + ";"
      }
    }
    log(答案)
  }
  for (var a = 0; a < 3; a++) {
    选项 = cuxiancishu(网页内容, daan[a]).length
    if (选项) {
      参考答案 += daan[a] + 选项 + ";"
    }
  }
   log(答案+参考答案)
  显示答案(引擎, 答案+参考答案)
return 答案+参考答案
}
function 显示答案(引擎,答案){
    ui.run(function(){
          if(引擎=="百度:"){
       w.baidu.setText(答案)
    }else if(引擎=="搜狗:"){
       w.sogou.setText(答案)
    }else if(引擎=="360:"){
       w.s360.setText(答案)
    }else if(引擎=="UC"){
       w.uc.setText(答案)
    }
});
    }
function cuxiancishu(str, ci, zishu) {
  if (!zishu) {
    zishu = ci.length
  }
  var a = 0
  var g = 0
  var daan = []
  do {
    a = str.indexOf(ci, a + 1);
    if (a > -1) {
      daan[g] = str.substr(a, zishu)
      g++
    }
  } while (a > -1)
  if (daan.length == 0) {
    return false
  } else {
    return daan
  }
}
