"ui";
ui.statusBarColor("#434551");

ui.layout(
    <scroll gravity="center"bg="#434551" padding="10">
        <vertical >
            <card cardBackgroundColor="#5a5c69" w="*"  margin="10 5" cardCornerRadius="5dp"
            cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
            
            <vertical padding="6">
                
                <linear gravity="center">
                    <text textStyle="bold" gravity="top" size="80px" color="#6ae2e7"text="ONE Touch"/>
                    
                </linear>
                
            </vertical>
            
        </card>
         <card cardBackgroundColor="#5a5c69"w="*"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
        <vertical>
         <text  color="#b3b5c0" size="8"padding="5"text="手势设置"/>
         
           <linear gravity="center">
                
                <vertical >
                         <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                        <text color="#b3b5c0"gravity="center" size="10" id="c1"text="1" w="200px" h="450px"/>
                    </card>
                             <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                    <text color="#b3b5c0" gravity="center" size="10"id="c5"text="5"w="200px" h="200px" />
                    </card>
                </vertical>
                
                
                <vertical >
                            <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                     <text  color="#b3b5c0"gravity="center" size="10" id="c3"text="3"w="200px" h="300px"/>
                    </card>
                               <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                 <text  color="#b3b5c0"gravity="center"size="10"id="c4" text="4" w="200px" h="350px"/>
                    </card>
                </vertical>
                
                
                <vertical>
                             <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                    <text  color="#b3b5c0"gravity="center" size="10" id="c2"text="2"w="200px" h="450px"/>
                    </card>
                             <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                    <text  color="#b3b5c0"gravity="center" size="10" id="c6" text="6"w="200px" h="200px"/>
                    </card>
                </vertical>
                
            </linear>
            
            
            <linear gravity="center|bottom">
                           <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                  <text  color="#b3b5c0"gravity="center" size="10" id="c7"text="7" w="200px" h="100px"/>
                </card>
                         <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                    <text color="#b3b5c0" gravity="center" size="10" id="duang" text=""w="200px" h="100px"/>
                </card>
                       <card cardBackgroundColor="#434551"  margin="5 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
                      <text color="#b3b5c0" gravity="center"size="10"id="c8" text="8" w="200px" h="100px"/>
                </card>
            </linear>
            <vertical >
                <text color="#6ae2e7" size="10"gravity="center"text="▲"/>
                <text size="10" color="#b3b5c0"gravity="center"text="此处单击"/>
            </vertical>
        </vertical>
    </card>
    
    <card cardBackgroundColor="#5a5c69"w="*"  margin="10 5" cardCornerRadius="5dp"
    cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
    <vertical >
        <text  color="#b3b5c0" size="8"padding="5"text="应用设置"/>
        
        <linear gravity="center">
            
         <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
              <text id="app1" color="#6ae2e7"size="12" gravity="center" text="APP1" w="60"h="30"/>
            </card>
            <text text=" "/>
            <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
         
                <text id="app2" color="#6ae2e7"size="12" gravity="center"text="APP2"w="60"h="30"/>
            </card>
            <text text=" "/>
            <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
         
                <text id="app3" color="#6ae2e7"size="12" gravity="center" text="APP3"w="60"h="30"/>
            </card>
            <text text=" "/>
            <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
         
                <text id="app4" color="#6ae2e7"size="12"  gravity="center" text="APP4"w="60"h="30"/>
            </card>
            
        </linear>
        <linear gravity="center">
            
         <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="0dp" gravity="center"foreground="?selectableItemBackground">
              <text  size="12"  color="#b3b5c0"gravity="center" text="1#" w="60"h="30"/>
            </card>
            <text text=" "/>
            <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="0dp" gravity="center"foreground="?selectableItemBackground">
         
                <text size="12" color="#b3b5c0"gravity="center"text="2#"w="60"h="30"/>
            </card>
            <text text=" "/>
            <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="0dp" gravity="center"foreground="?selectableItemBackground">
         
                <text size="12" color="#b3b5c0"gravity="center" text="3#"w="60"h="30"/>
            </card>
            <text text=" "/>
            <card cardBackgroundColor="#5a5c69"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="0dp" gravity="center"foreground="?selectableItemBackground">
         
                <text  size="12"  color="#b3b5c0"gravity="center" text="4#"w="60"h="30"/>
            </card>
            
        </linear>
       
        <linear padding="10">
        <text size="12" color="#b3b5c0" gravity="center" text="短语1"/>
    
        <card cardBackgroundColor="#999999"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground" w="300"> 
        <text id="txt1" text="点击修改或 预设" maxLines="1" />  
         </card>
         </linear>
         
          <linear padding="10">
        <text size="12" color="#b3b5c0" gravity="center" text="短语2"/>
    
           <card cardBackgroundColor="#999999"  margin="10 5" cardCornerRadius="5dp"
        cardElevation="1dp" gravity="center"foreground="?selectableItemBackground" w="300"> 
        <text id="txt2" text="点击修改或 预设" maxLines="1" />  
         </card>
         </linear>
    
    </vertical>
    </card>
    
    <card cardBackgroundColor="#5a5c69" w="*"  margin="10 5" cardCornerRadius="5dp"
    cardElevation="1dp" gravity="center"foreground="?selectableItemBackground">
    
    <linear gravity="center">
    
    
    <card cardBackgroundColor="#434551" w="40"h="40"  margin="15 5" cardCornerRadius="18dp"
    cardElevation="5dp" gravity="center"foreground="?selectableItemBackground">
    <text textStyle="bold"color="#b3b5c0" gravity="center" textStyle="bold"color="#6ae2e7"id="初始化"text="重启"/>
    </card>
    <card cardBackgroundColor="#434551"  w="40"h="40"  margin="15 5" cardCornerRadius="18dp"
    cardElevation="5dp" gravity="center"foreground="?selectableItemBackground" >
    <text gravity="center" textStyle="bold"color="#6ae2e7"id="start" text="运行"/>
    </card>
        <card  cardBackgroundColor="#434551" w="40"h="40"  margin="15 5" cardCornerRadius="18dp"
        cardElevation="100dp" gravity="center"foreground="?selectableItemBackground">
        <text id="re" textStyle="bold"color="#6ae2e7"gravity="center"text="预设"/>
    </card>
    
    <card w="40"h="40" cardBackgroundColor="#434551" margin="15 5" cardCornerRadius="18dp"
    cardElevation="5dp" gravity="center"foreground="?selectableItemBackground">
    <text textStyle="bold"color="#6ae2e7" gravity="center" textStyle="bold"id="help"text="帮助"/>
    </card>
    
    </linear>
    </card>
    
    </vertical>
    </scroll>
);

files.createWithDirs("/sdcard/ONEKEY/0.txt");
files.createWithDirs("/sdcard/ONEKEY/1.txt");
files.createWithDirs("/sdcard/ONEKEY/2.txt");
files.createWithDirs("/sdcard/ONEKEY/3.txt");
files.createWithDirs("/sdcard/ONEKEY/4.txt");
files.createWithDirs("/sdcard/ONEKEY/5.txt");
files.createWithDirs("/sdcard/ONEKEY/6.txt");
files.createWithDirs("/sdcard/ONEKEY/7.txt");

files.createWithDirs("/sdcard/ONEKEY/app1.txt")
files.createWithDirs("/sdcard/ONEKEY/appdo1.txt");

files.createWithDirs("/sdcard/ONEKEY/app2.txt");
files.createWithDirs("/sdcard/ONEKEY/appdo2.txt");

files.createWithDirs("/sdcard/ONEKEY/app3.txt");
files.createWithDirs("/sdcard/ONEKEY/appdo3.txt");

files.createWithDirs("/sdcard/ONEKEY/app4.txt");
files.createWithDirs("/sdcard/ONEKEY/appdo4.txt");

files.createWithDirs("/sdcard/ONEKEY/duang.txt");
files.createWithDirs("/sdcard/ONEKEY/wxsys.txt")
files.createWithDirs("/sdcard/ONEKEY/txt1.txt")
files.createWithDirs("/sdcard/ONEKEY/txt2.txt")

reads()
var b1, b2, b3, b4, b5, b6, b7, b8, app1v, app2v, app3v, app4v, duang,txt1,txt2

function reads() {

    b1 = files.read("/sdcard/ONEKEY/0.txt")
    ui.c1.setText(b1)
    b2 = files.read("/sdcard/ONEKEY/1.txt")
    ui.c2.setText(b2)
    b3 = files.read("/sdcard/ONEKEY/2.txt")
    ui.c3.setText(b3)
    b4 = files.read("/sdcard/ONEKEY/3.txt")
    ui.c4.setText(b4)
    b5 = files.read("/sdcard/ONEKEY/4.txt")
    ui.c5.setText(b5)
    b6 = files.read("/sdcard/ONEKEY/5.txt")
    ui.c6.setText(b6)
    b7 = files.read("/sdcard/ONEKEY/6.txt")
    ui.c7.setText(b7)
    b8 = files.read("/sdcard/ONEKEY/7.txt")
    ui.c8.setText(b8)
    b8 = files.read("/sdcard/ONEKEY/7.txt")
    ui.c8.setText(b8)
    app1v = files.read("/sdcard/ONEKEY/appdo1.txt")
    ui.app1.setText(app1v)
    app2v = files.read("/sdcard/ONEKEY/appdo2.txt")
    ui.app2.setText(app2v)
    app3v = files.read("/sdcard/ONEKEY/appdo3.txt")
    ui.app3.setText(app3v)
    app4v = files.read("/sdcard/ONEKEY/appdo4.txt")
    ui.app4.setText(app4v)
    duang = files.read("/sdcard/ONEKEY/duang.txt")
    ui.duang.setText(duang)
    wxsys = files.read("/sdcard/ONEKEY/wxsys.txt")
   
    txt1 = files.read("/sdcard/ONEKEY/txt1.txt")
    ui.txt1.setText(txt1)
    txt2 = files.read("/sdcard/ONEKEY/txt2.txt")
    ui.txt2.setText(txt2)

}
var startwindow
ui.start.on("click", () => {
        startwindow = engines.execScriptFile("./手势.js");

})

ui.初始化.on("click", () => {
    importClass(android.os.Process);
    Process.killProcess(Process.myPid());

})


//////////////
ui.app1.on("click", () => {
    var thread = threads.start(function() {
        var appstart = dialogs.rawInput("APP1 区分大小写");
        files.write("/sdcard/ONEKEY/appdo1.txt", appstart)
        reads()
    })
})
ui.app2.on("click", () => {
    var thread = threads.start(function() {
        var appstart = dialogs.rawInput("APP2 区分大小写");
        files.write("/sdcard/ONEKEY/appdo2.txt", appstart)
        reads()
    })
})
ui.app3.on("click", () => {
    var thread = threads.start(function() {
        var appstart = dialogs.rawInput("APP3 区分大小写");
        files.write("/sdcard/ONEKEY/appdo3.txt", appstart)
        reads()
    })
})
ui.app4.on("click", () => {
    var thread = threads.start(function() {
        var appstart = dialogs.rawInput("APP4 区分大小写");
        files.write("/sdcard/ONEKEY/appdo4.txt", appstart)
        reads()
    })
})


ui.txt1.on("click", () => {
    var thread = threads.start(function() {
        var appstart = dialogs.rawInput("快捷文案1",txt1);
        files.write("/sdcard/ONEKEY/txt1.txt", appstart)
        reads()
    })
})

ui.txt2.on("click", () => {
    var thread = threads.start(function() {
        var appstart = dialogs.rawInput("快捷文案2",txt2);
        files.write("/sdcard/ONEKEY/txt2.txt", appstart)
        reads()
    })
})

///////////////
ui.re.on("click", () => {
files.write("/sdcard/ONEKEY/0.txt","无");
files.write("/sdcard/ONEKEY/1.txt","无");
files.write("/sdcard/ONEKEY/2.txt","分屏");
files.write("/sdcard/ONEKEY/3.txt","后台");
files.write("/sdcard/ONEKEY/4.txt","返回");
files.write("/sdcard/ONEKEY/5.txt","返回");
files.write("/sdcard/ONEKEY/6.txt","未读");
files.write("/sdcard/ONEKEY/7.txt","上一个app");

    files.write("/sdcard/ONEKEY/app1.txt", "")
    files.write("/sdcard/ONEKEY/app2.txt", "")
    files.write("/sdcard/ONEKEY/app3.txt", "")
    files.write("/sdcard/ONEKEY/app4.txt", "")
    files.write("/sdcard/ONEKEY/duang.txt", "home")
    files.write("/sdcard/ONEKEY/txt1.txt", "我现在不方便回复，稍后我会联系你的")
    files.write("/sdcard/ONEKEY/txt2.txt", "----来自One Key")
    
    reads()
})
///////////////
ui.help.on("click",()=>{
     alert("关于ONE Touch" ,"ONE Touch是隶属于ONE KEY黑莓工具箱的手势功能的升级版。\n可以自定义手势各区域的功能。由于代码构造差异，可能不适用Android 7.0及以下机型。\n\n手势功能二选一即可，不必同时开启。");
   
    })
///////////////
var ctxt
var idlist
var no
ui.c1.on("click", () => {
    ctxt = "c1"
    no = 0
    dolist(ctxt)
    //  events.broadcast.emit("r1", "tt")

})
ui.c2.on("click", () => {
    ctxt = "c2"
    no = 1
    dolist(ctxt)
})
ui.c3.on("click", () => {
    ctxt = "c3"
    no = 2
    dolist(ctxt)
})
ui.c4.on("click", () => {
    ctxt = "c4"
    no = 3
    dolist(ctxt)
})
ui.c5.on("click", () => {
    ctxt = "c5"
    no = 4
    dolist(ctxt)
})
ui.c6.on("click", () => {
    ctxt = "c6"
    dolist(ctxt)
    no = 5
})
ui.c7.on("click", () => {
    ctxt = "c7"
    dolist(ctxt)
    no = 6
})
ui.c8.on("click", () => {
    ctxt = "c8"
    dolist(ctxt)
    no = 7
})
////
ui.app1.on("click", () => {
    ctxt = "app1"
})
ui.app2.on("click", () => {
    ctxt = "app2"
})

///////////
ui.duang.on("click", () => {
    ctxt = "duang"
    no = "duang"
    dolist(ctxt)
})

//////////
function set() {
    toast(dolistname)
    ui[ctxt].setText(dolistname)

    files.write("/sdcard/ONEKEY/" + no + ".txt", dolistname)

}


////////

//////////
var dolistname

function dolist() {
    var c = threads.start(function() {
        while (true) {
            var i = dialogs.select("选择功能", "1.无", "2.返回", "3.后台", "4.回到上一个app", "5.分屏", "6.APP 1", "7.APP 2", "8.APP 3", "9.APP 4", "10.home回到桌面", "11.读取未读消息", "12.微信扫一扫", "13.顶栏下拉","14.熄屏：可指纹开屏","15.APP-bigbang截图","16.APP-bigbang取词","17.截图并分享","18.快捷短语1","19.快捷短语2");
            if (i == -1) { //没选
                break;
            }
            if (i == 0) {
                dolistname = "无"
                set(ctxt, no, dolistname)
                break;
            }
            if (i == 1) {
                dolistname = "返回"
                set(ctxt, no, dolistname)
                break;
            }
            if (i == 2) {
                dolistname = "后台"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 3) {
                dolistname = "上一个app"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 4) {
                dolistname = "分屏"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 5) {
                dolistname = "app1"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 6) {
                dolistname = "app2"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 7) {
                dolistname = "app3"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 8) {
                dolistname = "app4"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 9) {
                dolistname = "home"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 10) {
                dolistname = "未读"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 11) {
                dolistname = "微信扫一扫"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 12) {
                dolistname = "下拉"
                set(ctxt, no, dolistname)
                break
            }
            
            if (i == 13) {
                dolistname = "熄屏"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 14) {
                dolistname = "APP-bigbang截图"
                set(ctxt, no, dolistname)
                break
            }
            
            if (i == 15) {
                dolistname = "APP-bigbang取词"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 16) {
                dolistname = "截图并分享"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 17) {
                dolistname = "快捷短语1"
                set(ctxt, no, dolistname)
                break
            }
            if (i == 18) {
                dolistname = "快捷短语2"
                set(ctxt, no, dolistname)
                break
            }
        }
    })
}

