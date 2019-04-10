"ui";

ui.layout(
  <ScrollView>
    <vertical>
     <webview id="iloveyou" h="300" margin="0 0"/>    
     <input id="n" text="8712"/>
     <button id="qd" text="确定"/>
     <text id="text" text=".."/>
    </vertical>
  </ScrollView>
)

ui.iloveyou.loadUrl("http://he.yinyuetai.com/uploads/videos/common/1B29014191092EAA004C70C863179105.flv?sc=60409e6e64f2461e");
ui.qd.click(() => {
threads.start(function(){
    var p=url3(ui.n.text()+"");
ui.run(function(){
ui.text.text(p);
ui.iloveyou.loadUrl(p);
});
});
});
               
              
                
                
openConsole();
while(true){
dz=url3(console.rawInput("输入音悦台编号"));
console.info(dz);
setClip(dz);
}
//log(url3(8712));
function 音悦台(n) {
  return "http://www.yinyuetai.com/video/" + n;
}

function cutstr(a, b, c) {
  a = a.split(b);
  for (i = 1; i < a.length; i++) {
    tmp = a[i].split(c);
    if (tmp.length > 1) {
      //log(tmp[0]);
      return ('http://he.yinyuetai.com/uploads/videos/common/'+tmp[0]+'|');//&flag=one&format=super"//&flag=one&format=high
    }
  }
}
function url3(n){
var url="http://www.flvcd.com/parse.php?kw=" + 音悦台(n)+"&flag=one&format=super";//super|high
var r=http.get(url).body.string();
url2=cutstr(r,'<input type="hidden" name="inf" value="http://he.yinyuetai.com/uploads/videos/common/','|"/>');
//log(r);
return url2;
}



