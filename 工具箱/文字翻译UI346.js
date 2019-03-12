"ui";

ui.layout(
    <vertical padding="16" bg="#DCDCDC">
    <text textSize="16sp" textStyle="bold">文字翻译 v0.1</text>
        <horizontal>
            <text textSize="19sp"></text>
            <spinner id="sp1" entries="AUTO|中文|英文|粤语|文言文|日语|韩语|法语|繁体中文"/>
            <text textSize="16"text="       翻译成"/>
            <text textSize="16sp" text="      "/>
            <spinner id="sp2" entries="中文|英语|粤语|文言文|日语|韩语|法语|繁体中文" spinnerMode="dialog"/>
        </horizontal>
        <input id="get" textColor="red" layout_weight="1" h="100" gravity="top" bg="#BEBEBE" alpha="1"/>
        <horizontal>
        <button id="ok">开始翻译</button>
        <button id="copy">复制结果</button>
        <button id="song">朗读</button>
        <button id="clos">清空</button>
        </horizontal>
        <input id="te" textSize="20sp" textColor="red" layout_weight="1" h="100" bg="#BEBEBE" alpha="1"/>
        <text textSize="16sp" gravity="right" text="by 白酒煮饭"/>
    </vertical>
);
var list=["auto","zh","en","yue","wyw","jp","kor","fra","cht"];
ui.ok.on("click", ()=>{
    let txt=ui.get.text();
     var fo = ui.sp1.getSelectedItemPosition();
     var to = ui.sp2.getSelectedItemPosition();
    if(txt){
    var ok1 = threads.start(function(){
        let as=Baidu_To(txt,list[fo],list[to+1]);
        if(as){
            ui.run(() => {
        ui.te.setText(as);
        });
       }else{ui.te.setText(ui.get.text())}; 
     });
   }  
});

ui.copy.on("click", ()=>{
    let tt=ui.te.text();
    if(tt){
        toast("已复制");
        setClip(tt);
   }
});
ui.clos.on("click", ()=>{
    ui.get.setText("");
    ui.te.setText("");
  });  

function Baidu_To(str,from,to) {
    function getMd5(string) {
        return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)
    }
    let salt = (new Date).getTime();
    let sign = getMd5("20180125000118573" + str + salt + "O_PrebY0tsdbHjKNOaDf");
    let res = http.post("http://api.fanyi.baidu.com/api/trans/vip/translate?", {
        q: str,
        appid: "20180125000118573",
        salt: salt,
        from: from,
        to: to,
        sign: sign
    });
    try{
    str = JSON.parse(res.body.string()).trans_result.map(val => val.dst).join('\n');
    return str;
    }catch(e){
        log(e);
    toastLog("翻译出现错误！！");
    }
}




