"ui";
page = 0;
num = 1;
word = "福利";
boo = false;
var c = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518200624346&di=41443ef9f076d78712fb61e6c800f004&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201308%2F08%2F20130808194552_5ktHs.thumb.700_0.jpeg"];
imgui();
function imgui() {
    ui.layout(
        <scroll>
            <vertical align="top" margin="0">
                <webview id="web" h="500" />
                <horizontal>
                    <vertical>
                        <text text="跳转" textSize="12sp" />
                        <horizontal >
                            <input id="in1" text="" w="70" />
                            <button text="确定" id="jump" w="60" h="45"/>
                        </horizontal>
                        <text text="自动播放" textSize="12sp" />
                        <horizontal >
                            <input id="in2" hint="毫秒" text="1000" w="70" />
                            <button text="播放" id="play" w="60" h="45"/>
                        </horizontal>
                    </vertical>
                    <vertical>
                        <button id="up" text="上一张" w="80" h="60" />
                        <button id="download" text="下载" w="80" h="60" />
                    </vertical>
                    <button id="rand" text="随便看" w="80" h="120" />
                    <button id="down" text="下一张" w="80" h="120" />
                </horizontal>
            </vertical>
        </scroll>
    );
    ui.web.loadUrl(c);
    ui.in1.setText(page + "");
    ui.down.click(() => {
        page++;
        ui.in1.setText(page + "");
        a = threads.start(getimg);
        a.join();
        if (c[0] == null) {
            alert("到底了");
        }
        else {
            log(page);
            ui.web.loadUrl(c[0]);
        }
    });
    ui.up.click(() => {
        if (page > 1) {
            page--;
            ui.in1.setText(page + "");
            a = threads.start(getimg);
            a.join();
            ui.web.loadUrl(c[0]);
            log(page);
        }
        else
            alert("到顶啦!");
    });
    ui.jump.click(() => {
        page = parseInt(ui.in1.text());
        a = threads.start(getimg);
        a.join();
        if (c[0] == null) {
            alert("没有图片");
            page = 0;
        }
        else {
            log(page);
            ui.web.loadUrl(c[0]);
        }
    });
    ui.rand.click(() => {
        page = random(0, 595);
        ui.in1.setText(page + "");
        a = threads.start(getimg);
        a.join();
        log(page);
        ui.web.loadUrl(c[0]);
    });
     ui.play.click(() => {
         var t;
         if(boo){
             boo = false;
                ui.run(function(){
        ui.play.setText("播放");
                  });
             tt.interrupt()
             }
         else{
             boo = true;
         tt = threads.start(function(){
         while(boo){
              ui.run(function(){
                  t = ui.in2.text()
                  });
                ui.run(function(){
        ui.play.setText("停止");
                  });
        sleep(parseInt(t));
         page++;
        a = threads.start(getimg);
        a.join();
        log(page);
              ui.run(function(){
        ui.web.loadUrl(c[0]);
                  });
      ui.run(function(){
        ui.in1.setText(page + "");
                 });
             }
             });
             }
    });
    ui.download.click(() => {
        a = threads.start(function () {
            img = images.load(c[0]);
        });
        a.join();
        files.createWithDirs("/sdcard/Download/img/data/1")
        images.save(img, "/sdcard/Download/img/"  + new Date().toTimeString().substr(0, 8)+" "+ random() + ".png");
        toast("已下载到/sdcard/Download/img");
    });
}


function getimg() {
    var url = "http://gank.io/api/data/" + word + "/" + num + "/" + page;
    a = http.get(url).body.json();
    if (a.results[0] == null) {
        c[0] = null;
        return null;
    }
    for (i in a.results) {
        c[i] = a.results[i].url;
    }
    return c;
}
