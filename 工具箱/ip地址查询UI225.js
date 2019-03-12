"ui";
ui.layout(
    <frame background="#515155">
        <vertical align="top" margin="30">
        <linear>
            <text textSize="20sp" textStyle="bold">当前的IP地址：</text>
             <text id="iip" textSize="26sp"/>
         </linear>   
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" hint="IP地址" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="查询" />
            </linear>
            <linear>
                <text textSize="26sp" text="您查询的的IP："/>
                <text id="ipp" h="30" w="auto"  textSize="18sp"/>
            </linear>            
            <linear>
                <text textSize="26sp" text="国家："/>
                <text id="gjia" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                <text textSize="26sp" text="省份："/>
                    <text id="sff" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                <text textSize="26sp" text="地区："/>
                    <text id="dqq" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                <text textSize="26sp" text="运营商："/>
                    <text id="ysss" h="40" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
);
threads.start(function() {
    var iipp=iip();
        ui.post(() => {
    ui.iip.setText(iipp);
    });
    asd(iipp);
  });  
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            let sum = chaip(sd);
            if (sum) {
                ui.run(() => {
                    ui.ipp.setText(sum.data.ip);
                    ui.gjia.setText(sum.data.country);
                    ui.sff.setText(sum.data.region);
                    ui.dqq.setText(sum.data.city);
                    ui.ysss.setText(sum.data.isp);
                });
            }
        }
    });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});
ui.iip.click(function() {
    let ssj = ui.iip.text();
    if (ssj) {
        setClip(ssj);
        toast("复制成功");
    }
});
ui.gjia.click(function() {
    let cvb = ui.gjia.text();
    if (cvb) {
        setClip(cvb);
        toast("复制成功");
    }
});
ui.sff.click(function() {
    let sffj = ui.sff.text();
    if (sffj) {
        setClip(sffj);
        toast("复制成功");
    }
});

ui.sff.click(function() {
    let sffj = ui.sff.text();
    if (sffj) {
        setClip(sffj);
        toast("复制成功");
    }
});
ui.dqq.click(function() {
    let dqqd = ui.dqq.text();
    if (dqqd) {
        setClip(dqqd);
        toast("复制成功");
    }
});

ui.ysss.click(function() {
    let qhh = ui.ysss.text();
    if (qhh) {
        setClip(qhh);
        toast("复制成功");
    }
});
function iip() {
    var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
    var InetIP = getIp_api.body.string();
    eval(InetIP);
    return returnCitySN.cip;
}

function chaip(ble) {
    ui.run(() => {
        ui.sff.setText("");
        ui.dqq.setText("");
        ui.ysss.setText("");
    });
    var numbel = "221.13.63.81";
    var url = "http://ip.taobao.com/service/getIpInfo.php?ip=";
    var html = http.get(url + ble, {
        headers: {
            'Accept-Language': 'zh-cn,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
    }).body.json();
     return html;
}
function asd(dd){
  let sum = chaip(dd);
        if (sum) {
             ui.run(() => {
             ui.ipp.setText(sum.data.ip);
             ui.gjia.setText(sum.data.country);
             ui.sff.setText(sum.data.region);
             ui.dqq.setText(sum.data.city);
             ui.ysss.setText(sum.data.isp);
   });
}
}