var window = floaty.window(
        <frame bg="#55000000">
        <vertical h="auto" align="top" margin="0 0">
     
       

<linear margin="0 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="0"/>          <text w="110" id="js0" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="1"/>          <text w="110" id="js1" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="2"/>          <text w="110" id="js2" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="3"/>          <text w="110" id="js3" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="4"/>          <text w="110" id="js4" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="5"/>          <text w="110" id="js5" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="6"/>          <text w="110" id="js6" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="7"/>          <text w="110" id="js7" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="8"/>          <text w="110" id="js8" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="9"/>          <text w="110" id="js9" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="10"/>          <text w="110" id="js10" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
<linear margin="1 0 0 0">          <text w="40" gravity="left" color="#0000ff" bg="#55ffffff" size="16" text="编号"/>          <text w="20" gravity="left" color="#ffff00" bg="#99111111" size="16" text="11"/>          <text w="110" id="js11" gravity="left" color="#ffffff" bg="#99111111" size="16" text="000::00:00:00"/></linear>
          
        </vertical>
        <vertical  margin="0 0 0 170">
         <button id="ub" text="帮" size="30" gravity="center" w="40" h="128" color="#ffffff" bg="#55000055"  margin="0 0 1 0"/>
  <button id="ut" text="退" size="30" gravity="center" w="40" h="128" color="#ffffff" bg="#55000055"/>
  </vertical>
      </frame>
    );
    window.ub.click(()=>{
alert("需要存储权限，所以即使手机重启，计时器依旧继续运行，运行脚本就能看到计时数据，点击即使时间可以重置为00:00:00");
    });
window.ut.click(()=>{
    threads.start(function(){
    if(confirm("确认退出？")){tc=1;}
    });
    });
var tc=0;
var txt1 = new Array();
var sdpath = android.os.Environment.getExternalStorageDirectory(); //获取跟目录
var path = sdpath + "/脚本/计时内容.txt";

function 毫秒格式化(num) {
    var 总秒 = parseInt(num / 1000);
    var 秒 = 总秒 % 60;
    var 总分 = parseInt(总秒 / 60);
    var 分 = 总分 % 60;
    var 总时 = parseInt(总分 / 60);
    var 时 = 总时 % 24;
    var 总天 = parseInt(总时 / 24);
    return pf(总天, 3) + "::" + pf(时, 2) + ":" + pf(分, 2) + ":" + pf(秒, 2);

    function pf(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
}

threads.start(function() {
    x = 11;
    files.create(path);
    var txt = files.read(path);
    var txt0 = txt.split("\n");

    var 时间 = new Date().getTime();
    for (i = 0; i <= x; i++) {
        if (txt[i]) {
            txt1[i] = parseInt(txt0[i]);
            log("null")
        } else {
            txt1[i] = 时间;
            log("ok");
        }
    }
    var txt2 = txt1.join("\n");
    files.write(path, txt2);
    while (true) {
        sleep(100);
        if(tc==1){exit();}
        var 时间 = new Date().getTime();
        ui.run(function() {
            
window.js0.text(毫秒格式化(时间 - txt1[0]) + "");
window.js1.text(毫秒格式化(时间 - txt1[1]) + "");
window.js2.text(毫秒格式化(时间 - txt1[2]) + "");
window.js3.text(毫秒格式化(时间 - txt1[3]) + "");
window.js4.text(毫秒格式化(时间 - txt1[4]) + "");
window.js5.text(毫秒格式化(时间 - txt1[5]) + "");
window.js6.text(毫秒格式化(时间 - txt1[6]) + "");
window.js7.text(毫秒格式化(时间 - txt1[7]) + "");
window.js8.text(毫秒格式化(时间 - txt1[8]) + "");
window.js9.text(毫秒格式化(时间 - txt1[9]) + "");
window.js10.text(毫秒格式化(时间 - txt1[10]) + "");
window.js11.text(毫秒格式化(时间 - txt1[11]) + ""); });
    }
});

window.js0.click(() => {    threads.start(function() {       var ok = confirm("确定给0重新计时？");       if (ok) {            log("ok");           txt1[0] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js1.click(() => {    threads.start(function() {       var ok = confirm("确定给1重新计时？");       if (ok) {            log("ok");           txt1[1] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js2.click(() => {    threads.start(function() {       var ok = confirm("确定给2重新计时？");       if (ok) {            log("ok");           txt1[2] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js3.click(() => {    threads.start(function() {       var ok = confirm("确定给3重新计时？");       if (ok) {            log("ok");           txt1[3] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js4.click(() => {    threads.start(function() {       var ok = confirm("确定给4重新计时？");       if (ok) {            log("ok");           txt1[4] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js5.click(() => {    threads.start(function() {       var ok = confirm("确定给5重新计时？");       if (ok) {            log("ok");           txt1[5] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js6.click(() => {    threads.start(function() {       var ok = confirm("确定给6重新计时？");       if (ok) {            log("ok");           txt1[6] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js7.click(() => {    threads.start(function() {       var ok = confirm("确定给7重新计时？");       if (ok) {            log("ok");           txt1[7] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js8.click(() => {    threads.start(function() {       var ok = confirm("确定给8重新计时？");       if (ok) {            log("ok");           txt1[8] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js9.click(() => {    threads.start(function() {       var ok = confirm("确定给9重新计时？");       if (ok) {            log("ok");           txt1[9] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js10.click(() => {    threads.start(function() {       var ok = confirm("确定给10重新计时？");       if (ok) {            log("ok");           txt1[10] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});
window.js11.click(() => {    threads.start(function() {       var ok = confirm("确定给11重新计时？");       if (ok) {            log("ok");           txt1[11] = new Date().getTime();         var txt2 = txt1.join("\n");      files.write(path, txt2);       } else {            log("no");       }   });});