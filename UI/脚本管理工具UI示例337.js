"ui";
/**
 * 此UI之前用于C/S架构的脚本管理,脚本中 可能有一些逻辑性的bug,和有些用户体验上的问题.
 * 按照一般用户的使用习惯,整个流程应该没有什么大问题,没时间搞了,需要去学习一段时间.
 * 如果有人愿意更新一些其他功能,欢迎在此基础上进行补充.
 * 
 * 一些简单的说明:
 *      脚本用到了服务器,需要自己搭建环境.纯静态的即可,有能力的可以自己写接口.
 *      脚本版本号的验证 需要写在脚本文件的首行 例子: //version:0.0.1
 * 
 *      服务器端需要有一个json文件来控制UI中的脚本列表, json文件示例:
 * 
 *                          列表显示名|本地文件夹名称|服务端脚本文件名|版本号
 *      {
 *          "script_001" : "AutoJs Say Hello|HelloWorld|main_Hello.js|0.0.1",
 *      }
 */
var color = "#4C484C";
var frameColor = "#7E787F";
var textColor = "#CCCCCC";
var img_scriptIconColor = "#007E787F";
var img_refreshIconColor = "#FFFFFF";


//indexOf的替代函数 contains();
const contains = (() =>
Array.prototype.includes
? (arr, value) => arr.includes(value)
: (arr, value) => arr.some(el => el === value)
)();

//保存脚本文件列表的数组
var scriptInfo = [];

ui.statusBarColor("#4C484C");
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar background="{{color}}">
                <linear>
                    <toolbar id="toolbar" title="脚本管理平台"/>
                    <vertical w="*" h="*" padding="13 13">
                        {/* 右上角刷新按钮 */}
                        <img id="refresh" 
                            src="@drawable/ic_autorenew_black_48dp" 
                            tint="{{img_refreshIconColor}}"
                            w="33"
                            h="33"
                            layout_gravity="right" />
                    </vertical>
                </linear>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager" background="{{frameColor}}">
                <frame> {/** 第一屏布局*/}
                    <vertical>
                        {/* <android.support.v4.widget.SwipeRefreshLayout> */}
                        {/* 启动时网络不好等待加载的动画效果 */}
                        <vertical id="waitForDownload" gravity="center" w="*" h="50">
                            <linear w="auto">
                                <img id="img_waitForDownload"
                                    src="@drawable/ic_rotate_right_black_48dp"
                                    w="20" h="20" />
                                <linear gravity="center" h="*">
                                <text id="str_waitForDownload"
                                    text="正在拉取数据..."
                                    textSize="11sp"
                                    textColor="{{textColor}}" />
                                </linear>
                            </linear>
                        </vertical>
                        <vertical id="noData" gravity="center" w="*" h="50" >
                            <linear w="auto">
                                <text id="str_noData"
                                    text="暂无数据,请刷新..."
                                    textSize="13sp"
                                    textColor="{{textColor}}" />
                            </linear>
                        </vertical>
                        <list id="files" layout_weight="1" >
                            <vertical w="*">
                                <linear id="script_list" bg="?selectableItemBackground" h="50">
                                    {/* 脚本Icon */}
                                    <img src="@drawable/ic_cloud_done_black_48dp" 
                                        tint="white"
                                        bg ="{{img_scriptIconColor}}"
                                        w="35"
                                        h="35"
                                        margin="10" />

                                    <vertical h="*">
                                        {/* 脚本名称 */}
                                        <text id="name"
                                            textSize="14sp"
                                            textColor="{{textColor}}"
                                            text="{{this.desc}}"
                                            marginTop="4"
                                            maxLines="1"
                                            ellipsize="end"/>
                                        {/* 脚本版本号 */}
                                        <text id="version"
                                            textSize="12sp"
                                            textColor="{{textColor}}"
                                            text="版本号:{{this.serverVersion}}"
                                            marginTop="4"
                                            maxLines="1"
                                            ellipsize="end"/>
                                    </vertical>

                                    <vertical w="*" h="*">
                                        {/* 开始按钮图标 */}
                                        <img id="item_start"
                                            src="@drawable/ic_play_arrow_black_48dp"
                                            tint="#CCCCCC"
                                            bg="{{img_scriptIconColor}}"
                                            w="25"
                                            h="25"
                                            margin="13"
                                            layout_gravity="right"/>
                                    </vertical>
                                </linear>
                                {/* 分割线填充 */}
                                <vertical id="fill_line" w="*" h="1" bg="{{color}}"></vertical>
                            </vertical>
                        </list>
                        {/* </android.support.v4.widget.SwipeRefreshLayout> */}
                    </vertical>
                </frame>

                <frame> {/** 第二屏布局*/}
                    <vertical>
                        <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                            <text text="基础设置" textSize="12sp" textColor="{{textColor}}" />
                        </linear>

                        <linear h="40" paddingTop="10">
                        <linear w="*" margin="0 20 0 20" layout_gravity="center" >
                            {/* 微信号 Text控件 */}
                            <linear layout_weight="1" gravity="center" h="*">
                                <text text="微信号:"
                                    color="{{textColor}}"
                                    size="16sp"
                                     />
                            </linear>

                            {/* 微信号输入框控件 */}
                            <linear layout_weight="3" h="*">
                                <input id="wechaNum"
                                    inputType="textVisiblePassword"
                                    padding="0 5 0 5"
                                    singleLine="true"
                                    h="30"
                                    w="*"
                                    textColor="#E1E4E5"
                                    textSize="14sp"
                                    textCursorDrawable="@null"
                                    hint="为空则不发送"
                                    bg="#f1bbbbbb"
                                    layout_gravity="left|center" />
                            </linear>

                            {/* 执行次数 Text控件 */}
                            <linear layout_weight="1" gravity="center" h="*">
                                <text text="次数:"
                                    marginLeft="1"
                                    marginRight="1"
                                    color="{{textColor}}"
                                    size="16sp"
                                     />
                            </linear>

                            {/* 执行次数输入框控件 */}
                            <linear layout_weight="2" h="*">
                                <input id="Loops"
                                    inputType="number"
                                    padding="0 5 0 5"
                                    singleLine="true"
                                    h="30"
                                    w="*"
                                    textColor="#E1E4E5"
                                    textSize="14sp"
                                    textCursorDrawable="@null"
                                    hint="1"
                                    bg="#f1bbbbbb"
                                    layout_gravity="left|center" />
                            </linear>
                        </linear>
                        </linear>

                        <vertical>
                            <linear w="*" h="40" margin="0 20 0 20" >
                                <linear layout_weight="1" h="30" layout_gravity="left|center" >
                                    {/* 脚本速度 Text控件 */}
                                    <linear gravity="right|center" w="80" h="*">
                                        <text text="当前速度: "
                                            textColor="{{textColor}}"
                                            marginBottom="1"
                                            textSize="16sp" />
                                    </linear>

                                    {/* 当前速度值 Text控件 */}
                                    <linear gravity="center" w="30" h="*">
                                    <text id="speedtext"
                                        text=""
                                        textColor="{{textColor}}"
                                        textSize="14sp"
                                        textStyle="bold" />
                                    </linear>
                                </linear>
                            </linear>

                            <linear w="*" h="24" margin="0 20 0 20" gravity="center" >
                                {/** 慢 Text控件 */}
                                <linear layout_weight="1" gravity="right" >
                                <text text="慢"
                                    textColor="{{textColor}}"
                                    textSize="14sp" />
                                </linear>

                                {/** 进度条控件 */}
                                <linear layout_weight="8" >
                                <seekbar id="speed"
                                    max="99"
                                    progress="79"
                                    bg="#00bbbbbb"
                                    w="*" />
                                </linear>

                                {/** 快 Text控件 */}
                                <linear layout_weight="1" gravity="left" >
                                <text text="快"
                                    textColor="{{textColor}}"
                                    textSize="14sp" />
                                </linear>
                            </linear>
                        </vertical>

                        {/* 分割线填充 */}
                        <vertical w="*" h="1" bg="{{color}}" ></vertical>

                        {/* 其他功能区域相关配置 */}
                        <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                            <text text="附加功能" textSize="12sp" textColor="{{textColor}}" />
                        </linear>
                        <vertical margin="0 20 0 20">
                            {/* <linear layout_weight="1" >
                                <checkbox id="str" text="脚本运行前开启录屏(功能未开发)" color="{{textColor}}" />
                            </linear> */}
                            <linear layout_weight="1" >
                                <checkbox id="sendMsgOption" text="脚本出错时发送相关日志给开发者(需安装QQ)" color="{{textColor}}" />
                            </linear>
                        </vertical>

                        {/* 分割线填充 */}
                        <vertical w="*" h="1" bg="{{color}}" ></vertical>

                        {/* 垃圾清理区域相关配置 */}
                        <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                            <text text="清理相关" textSize="12sp" textColor="{{textColor}}" />
                        </linear>
                        <vertical>
                            <linear w="*" h="50" margin="0 20 0 20" gravity="center" >
                                <linear layout_weight="1" >
                                    <checkbox id="clear_log" text="日志" color="{{textColor}}" />
                                </linear>
                                <linear layout_weight="1" >
                                    <checkbox id="clear_namelist" text="已聊名单" color="{{textColor}}" />
                                </linear>
                                <linear layout_weight="1" >
                                    <checkbox id="clear_config" text="配置文件" color="{{textColor}}" />
                                </linear>
                                <linear layout_weight="1" gravity="right" >
                                    <button id="clear_Btn" text="删除" w="60" h="40" />
                                </linear>
                            </linear>

                        </vertical>

                        {/* 分割线填充 */}
                        <vertical w="*" h="1" bg="{{color}}" ></vertical>
                        
                        {/* <linear gravity="center" margin="0 0 0 0">
                            <button id="reset" w="85" h="40" style="Widget.AppCompat.Button.Colored" bg="#E1E4E5" textSize="16sp" textStyle="bold" textColor="#000000" text="清除缓存" margin="12"></button>
                            <button id="start" w="85" h="40" style="Widget.AppCompat.Button.Colored" bg="#3CCA3C" textSize="16sp" textStyle="bold" textColor="#FFFFFF" text="开  始" margin="12"></button>
                        </linear> */}
                    </vertical>
                </frame>

                <frame> {/** 第三屏布局*/}
                    <text text="暂时还没想好内容" textColor="{{textColor}}" textSize="16sp"/>
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);

//启动后权限申请以及相关设置
importPackage(java.io);
importPackage(java.lang);
importClass(android.view.View);
importClass(java.text.SimpleDateFormat);
events.on("exit", function(){
    if (device.sdkInt < 24) {
        ra.exit();
    }
});
if (device.sdkInt < 24) {
    try {
        var ra = new RootAutomator();
    } catch (e) {
        log("设备没有root");
    } 
}
var beforeStartUp_Thread = threads.start(function() {
    sleep(1000);
    if (!requestScreenCapture()) {
        toast('若无截图权限,部分脚本可能无法运行!');
    }
    setScreenMetrics(1080,1920);
    auto.waitFor();
})
ui.noData.setVisibility(View.GONE);
//设置滑动页面的标题
ui.viewpager.setTitles(["脚本列表", "相关设置", "关于"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//去除viewpager的光晕效果
//ui.viewpager.setOverScrollMode(ui.viewpager.OVER_SCROLL_NEVER);
//去除l(ist的光晕效果
//ui.files.setOverScrollMode(ui.files.OVER_SCROLL_NEVER);
// //设置缓存页数
// ui.viewpager.setOffscreenPageLimit();
ui.viewpager.setOnPageChangeListener({ //设置非第一页时,刷新按钮隐藏
    onPageScrolled: function(position, positionOffset, positionOffsetPixels) {
        // log('position: ' + position + "\npositionOffsetPixels: " + positionOffsetPixels );
        if (position != 0) {
            ui.refresh.setVisibility(View.INVISIBLE);
        } else {
            ui.refresh.setVisibility(View.VISIBLE);
        }
    }
});

/**
 * 第一屏相关函数/方法
 */

    //点击item时执行脚本.
    ui.files.on("item_click", function(item, pos, aaa, bbb){
        events.setKeyInterceptionEnabled("volume_up", true);
        events.observeKey();
        events.onKeyDown("volume_up", function(event){ //此处有逻辑问题.没有修改
            if (scriptx_Thread.isAlive()) {
                scriptx_Thread.interrupt(); //停止执行脚本的线程
                toast('按下了音量上键,脚本停止!');
            } else {
                toast('当前没有脚本在执行!');
            }
        });

        if (typeof scriptx_Thread == "object") {
            scriptx_Thread.interrupt();
        }
        
        var scriptx_Thread = threads.start(function() {
            //这里写脚本内公用的方法
            function sleeply() { //随机延迟
                var ran = random(90,130);
                var speedNum = 101 - speed;
                sleep(ran*speedNum);
            }
            function getAlreadyTalkArry(a) {
                var c, d, e, b = "/sdcard/com.UITest.script/tmp/NameList/" + a + "AlreadyTalk.tmp";
                return files.exists(b) || (files.createWithDirs(b), c = files.read(b), "" == c && files.write(b, "0"), 
                sleep(200)), d = open(b, mode = "r"), e = d.readlines().slice(), d.close(), e;
            }
            if (!newworkTesting()) {
                toast('网络连接失败...');
                return;
            }

            //设置微信号变量和执行次数
            var Config_file = "/sdcard/com.UITest.script/tmp/Config/config.ini";
            files.createWithDirs(Config_file)
            let configStr = files.read(Config_file);
            if (configStr != "") {
                let configArry = configStr.split("|");
                var wechaNumber = configArry[0];
                if (wechaNumber == "") { writeLog("微信号使用默认值: 空");}
                var loopTimes = configArry[1];
                if (loopTimes == "") {
                    loopTimes = 1;
                    writeLog("执行次数使用默认值: " + loopTimes);
                }
                var speed = parseInt(configArry[2]);
                if (speed == "") {
                    speed = parseInt(79);
                    writeLog('脚本速度使用默认值: ' + (speed + 1));
                }
                var sendMsg = configArry[3];
                if (sendMsg == "") {
                    sendMsg = "false";
                    writeLog('出错后不发送消息给开发者.');
                }
            } else {
                var wechaNumber = "";
                var loopTimes = 1;
                var speed = parseInt(79);
                var sendMsg = "false";
                writeLog("没有设置相关参数,使用默认值.");
            }
            //开始执行脚本
            var script_x = files.read(item.path, encoding = 'utf-8');
            try {
                eval(script_x);
                writeLog("脚本执行完毕.");
            } catch (e) {
                writeLog(e + '\n' + e.stack);
                if (sendMsg == "true") {
                    sendMsgToDeveloper();
                } else {
                    var ErrMsg = confirm("程序出错是否发送日志给开发者?","点击确定发送,点击取消不发送.");
                    if (ErrMsg) {
                        sendMsgToDeveloper();
                    }
                }
                return;
            }
        });
    });

    //点击右上角的刷新按钮,刷新list列表
    ui.refresh.click(()=>{
        //刷新数据时刷新按钮旋转线程
        var imgRotate_Thread = threads.start(function() {
            var i = 0;
            while(true) {
                i+=4;
                ui.run(()=>{
                    ui.refresh.setRotation(i);
                });
            }
        });

        //数据刷新线程
        var refreshItem_Thread = threads.start(function () {
            //初始化数据源数组
            scriptInfo = [];

            var url = 'https://script.iqqclub.com/Script/script_info.json';
            try {
                var script_list_html = http.get(url);
            } catch (e) {
                return;
            }
            var script_info = script_list_html.body.json();
            //在线更新脚本
            var file_desc_Arry = []; file_name_Arry = []; file_root_path_Arry = [];
            for (let FILE in script_info) {
                //判断本地脚本列表中是否存在脚本
                var file_version = script_info[FILE].split('|')[3];
                var file_desc = script_info[FILE].split('|')[0];
                file_desc_Arry.push(file_desc + '_V'+file_version);
                var file_name = script_info[FILE].split('|')[2];
                file_name_Arry.push(file_name);
    
                var file_root_path = script_info[FILE].split('|')[1];
                file_root_path_Arry.push(file_root_path);
    
                //创建脚本存储目录
                var script_download_path = '/sdcard/com.UITest.script/ScriptDownLoad/' + file_root_path + '/';
                files.ensureDir(script_download_path);
                var scriptPath = script_download_path+file_name;
                //从网络下载
                if (!getScriptFromServer(file_name,script_download_path)) {
                    return;
                }
                
                //将脚本信息填充到数据源数组中
                scriptInfo.push({
                    desc: file_desc,
                    serverVersion: file_version,
                    path: scriptPath,
                });
            }
        });

        //等待listView刷新完成后,要执行的逻辑
        var waitItem_Thread = threads.start(function() {
            refreshItem_Thread.join(10000);
            if (scriptInfo == "") {
                var rotationAngle = ui.refresh.getRotation();
                var Rem = rotationAngle%360
                var supplement = 360 - Rem;
                var supplementTimes = supplement/4;
                for (var i = 0; i < supplementTimes; i++) {
                    Rem += 4;
                    ui.run(()=>{
                        ui.refresh.setRotation(Rem);
                    });
                }

                //结束刷新按钮旋转的进程
                imgRotate_Thread.interrupt();
                toast('网络连接失败...');
                return;
            }

            var rotationAngle = ui.refresh.getRotation();
            var Rem = rotationAngle%360
            var supplement = 360 - Rem;
            var supplementTimes = supplement/4;
            for (var i = 0; i < supplementTimes; i++) {
                Rem += 4;
                ui.run(()=>{
                    ui.refresh.setRotation(Rem);
                });
            }

            //设置list控件的数据源
            ui.run(()=>{
                ui.waitForDownload.setVisibility(View.GONE);
                ui.noData.setVisibility(View.GONE);
                ui.files.setVisibility(View.VISIBLE);
                ui.files.setDataSource(scriptInfo);
                //结束刷新按钮旋转的进程
                imgRotate_Thread.interrupt();
                toast('刷新完毕');
            });
        }); 
    });

    //获取脚本信息生成列表数据
    var loadItem_Thread = threads.start(function () {
        var url = 'https://script.iqqclub.com/Script/script_info.json';
        try {
            var script_list_html = http.get(url);
        } catch (e) {
            return;
        }
        
        var script_info = script_list_html.body.json();
        //在线更新脚本
        var file_desc_Arry = []; file_name_Arry = []; file_root_path_Arry = [];
        for (let FILE in script_info) {
            //判断本地脚本列表中是否存在脚本
            var file_version = script_info[FILE].split('|')[3];
            var file_desc = script_info[FILE].split('|')[0];
            file_desc_Arry.push(file_desc + '_V'+file_version);
            var file_name = script_info[FILE].split('|')[2];
            file_name_Arry.push(file_name);

            var file_root_path = script_info[FILE].split('|')[1];
            file_root_path_Arry.push(file_root_path);

            //创建脚本存储目录
            var script_download_path = '/sdcard/com.UITest.script/ScriptDownLoad/' + file_root_path + '/';
            files.ensureDir(script_download_path);
            var scriptPath = script_download_path+file_name;
            if (!files.exists(script_download_path+file_name)) {
                //从网络下载回来
                if (!getScriptFromServer(file_name,script_download_path)) {
                    return;
                }
            } else {
                //读取本地脚本文件的版本号
                var fr = open(script_download_path+file_name, mode = 'r');
                var script_version_line = fr.readline();
                fr.close();
                var script_version_clint = script_version_line.split(':')[1].replace('.', '');
                //获取服务器脚本文件的版本号
                var script_version_server = file_version.replace('.', '');
                if (script_version_server > script_version_clint) {
                    if (!getScriptFromServer(file_name,script_download_path)) {
                        return;
                    }
                }
            }
            //将脚本信息填充到数据源数组中
            scriptInfo.push({
                desc: file_desc,
                serverVersion: file_version,
                path: scriptPath
            });
        }
    });

    //获取数据时的等待效果
    var waitForDownload_Thread = threads.start(function() {
        refreshBtnDisable();
        for (;;) {
            for (r = 0, t = 0; ;) if (r += .23, t += r, ui.run(()=>{ui.img_waitForDownload.setRotation(t)}), 
            ui.img_waitForDownload.getRotation() >= 180) break;
            for (;;) if (r -= .23, t += r, ui.run(()=>{ui.img_waitForDownload.setRotation(t)}), ui.img_waitForDownload.getRotation() >= 360) break;
        }
    });
    //等待listView加载完成后,要执行的逻辑
    var waitItem_Thread = threads.start(function() {
        loadItem_Thread.join(10000);
        if (scriptInfo == "") {
            toast('网络连接失败,请刷新');
            loadItem_Thread.interrupt();
            waitForDownload_Thread.interrupt();
            ui.run(()=>{
                refreshBtnEnable();
                ui.str_waitForDownload.setText("网络连接失败...");
                ui.img_waitForDownload.setRotation(0);
            });
            return;
        }
        //拉取成功,停止拉取动画
        waitForDownload_Thread.interrupt();
        //设置list控件的数据源
        ui.run(()=>{
            refreshBtnEnable();
            ui.waitForDownload.setVisibility(View.GONE); 
            ui.files.setDataSource(scriptInfo);
        });
        // alert(ui.files.getAdapter().getItemCount());
    });

/**
 * 第二屏相关代码逻辑
 */

ui.speedtext.setText((ui.speed.getProgress()+1).toString());
ui.speed.setOnSeekBarChangeListener({
    //进度条监听设置
    onProgressChanged: function(seekbar, p, fromUser){
        var text, send;
        fromUser && (text = (p + 1).toString(), ui.speedtext.setText(text), wechatNum = ui.wechaNum.text(), 
        loopTime = ui.Loops.text(), "" == loopTime && (loopTime = 1), send = ui.sendMsgOption.isChecked() ? !0 :!1, 
        configStr = wechatNum + "|" + loopTime + "|" + p + "|" + send, writeConfig(configStr));
    }
});
ui.wechaNum.addTextChangedListener({
    //监听微信号输入框
    // onTextChanged(s, start, before, count)
    // beforeTextChanged(s, start, before, count)
    afterTextChanged: function(s) {
        var send;
        loopTime = ui.Loops.text(), "" == loopTime && (loopTime = 1), speed = ui.speed.getProgress(), 
        send = ui.sendMsgOption.isChecked() ? !0 :!1, configStr = s + "|" + loopTime + "|" + speed + "|" + send, 
        writeConfig(configStr);
    } 
}); 
ui.Loops.addTextChangedListener({
    afterTextChanged: function(s) {
        var send;
        wechatNum = ui.wechaNum.text(), speed = ui.speed.getProgress(), send = ui.sendMsgOption.isChecked() ? !0 :!1, 
        configStr = wechatNum + "|" + s + "|" + speed + "|" + send, writeConfig(configStr);
    }
});
//从配置文件读取微信号和执行次数以及速度
var loadConfig_Thread = threads.start(function() {
    let ConfigPath = "/sdcard/com.UITest.script/tmp/Config/config.ini";
    if (!files.exists(ConfigPath)) {
        files.createWithDirs(ConfigPath);
    }
    let configStr = files.read(ConfigPath);
    if (configStr != "") {
        let configArry = configStr.split("|");
        let wecharNum = configArry[0];
        let loopTime = configArry[1];
        let speed = configArry[2];
        ui.run(()=>{
            ui.wechaNum.setText(wecharNum);
            ui.Loops.setText(loopTime);
            ui.speed.setProgress(speed);
            ui.speedtext.setText((ui.speed.getProgress()+1).toString());
        });
    }
});
//清理相关区域删除按钮状态的设置
ui.clear_Btn.setClickable(false);
ui.clear_Btn.setEnabled(false);
ui.clear_Btn.setFocusable(false);

ui.clear_log.on("check", (checked)=>{
    checked ? clearBtnEnable() :(clear_namelist_hecked = ui.clear_namelist.isChecked(), 
    clear_config_hecked = ui.clear_config.isChecked(), clear_namelist_hecked || clear_config_hecked || clearBtnDisable());
});
ui.clear_namelist.on("check", (checked)=>{
    checked ? clearBtnEnable() :(clear_log_hecked = ui.clear_log.isChecked(), clear_config_hecked = ui.clear_config.isChecked(), 
    clear_log_hecked || clear_config_hecked || clearBtnDisable());
});
ui.clear_config.on("check", (checked)=>{
    checked ? clearBtnEnable() :(clear_log_hecked = ui.clear_log.isChecked(), clear_namelist_hecked = ui.clear_namelist.isChecked(), 
    clear_log_hecked || clear_namelist_hecked || clearBtnDisable());
});
ui.clear_Btn.click(()=>{
    // toast('clicked');
    let clear_log_hecked = ui.clear_log.isChecked();
    let clear_namelist_hecked = ui.clear_namelist.isChecked();
    let clear_config_hecked = ui.clear_config.isChecked();
    if (clear_log_hecked) {
        clearLog();
    }
    if (clear_namelist_hecked) {
        clearNamelist();
    }
    if (clear_config_hecked) {
        clearConfig();
    }
    toast('清理完毕');
    setAllChecked();

    ui.files.setVisibility(View.GONE);
    ui.noData.setVisibility(View.VISIBLE);
});

//附加功能区域的逻辑

ui.sendMsgOption.on("check", (checked)=>{
    if (checked) {
        if (!findApp("QQ")) return toast("未安装QQ,该功能不可用!"), ui.sendMsgOption.setChecked(!1), 
        void 0;
        wechatNum = ui.wechaNum.text(), loopTime = ui.Loops.text(), "" == loopTime && (loopTime = 1), 
        speed = ui.speed.getProgress(), sendMsg = "true", configStr = wechatNum + "|" + loopTime + "|" + speed + "|" + sendMsg, 
        writeConfig(configStr);
    } else wechatNum = ui.wechaNum.text(), loopTime = ui.Loops.text(), "" == loopTime && (loopTime = 1), 
    speed = ui.speed.getProgress(), sendMsg = "false", configStr = wechatNum + "|" + loopTime + "|" + speed + "|" + sendMsg, 
    writeConfig(configStr);
});


/**
 * 脚本所有公用函数
 */
function newworkTesting() {
    try {
        var a = "https://www.baidu.com";
        http.get(a);
    } catch (b) {
        return !1;
    }
    return !0;
}
function clearBtnEnable() {
    ui.clear_Btn.setClickable(!0), ui.clear_Btn.setEnabled(!0), ui.clear_Btn.setFocusable(!0);
}
function clearBtnDisable() {
    ui.clear_Btn.setClickable(!1), ui.clear_Btn.setEnabled(!1), ui.clear_Btn.setFocusable(!1);
}
function setAllChecked() {
    ui.clear_log.setChecked(!1), ui.clear_namelist.setChecked(!1), ui.clear_config.setChecked(!1);
}
function refreshBtnEnable() {
    ui.refresh.setClickable(!0), ui.refresh.setEnabled(!0), ui.refresh.setFocusable(!0);
}
function refreshBtnDisable() {
    ui.refresh.setClickable(!1), ui.refresh.setEnabled(!1), ui.refresh.setFocusable(!1);
}
function clearLog() {
    var a = "/sdcard/com.UITest.script/log/";
    files.exists(a) && (files.isEmptyDir(a) || files.removeDir(a)), files.createWithDirs(a);
}
function clearNamelist() {
    var a = "/sdcard/com.UITest.script/tmp/NameList/";
    files.exists(a) && (files.isEmptyDir(a) || files.removeDir(a)), files.createWithDirs(a);
}
function clearConfig() {
    ui.run(()=>{
        ui.wechaNum.setText("");
        ui.Loops.setText("");
        ui.speed.setProgress(79);
        ui.speedtext.setText((ui.speed.getProgress()+1).toString());
    });
    var a = "/sdcard/com.UITest.script/ScriptDownLoad/", b = "/sdcard/com.UITest.script/tmp/Config/";
    files.exists(a) && (files.isEmptyDir(a) || files.removeDir(a)), files.exists(b) && (files.isEmptyDir(b) || files.removeDir(b)), 
    files.createWithDirs(a), files.createWithDirs(b);
}

function clickId(a) {
    for (obj_ID = id(a).boundsInside(5, 5, device.width-5, device.height-5); obj_ID.find().empty(); ) sleep(1e3);
    X = obj_ID.find().get(0).bounds().centerX(), Y = obj_ID.find().get(0).bounds().centerY(), 
    Deviation = random(-10, 10), X1 = X - Deviation, Y1 = Y - Deviation, device.sdkInt<24?ra.tap(X1,Y1):click(X1,Y1);
}
function clickText(a) {
    for (obj_Text = text(a).boundsInside(5, 5, device.width-5, device.height-5); obj_Text.find().empty(); ) sleep(1e3);
    X = obj_Text.find().get(0).bounds().centerX(), Y = obj_Text.find().get(0).bounds().centerY(), 
    Deviation = random(-10, 10), X1 = X - Deviation, Y1 = Y - Deviation, device.sdkInt<24?ra.tap(X1,Y1):click(X1,Y1);
}
function clickDesc(a) {
    for (obj_Desc = desc(a).boundsInside(5, 5, device.width-5, device.height-5); obj_Desc.find().empty(); ) sleep(1e3);
    X = obj_Desc.find().get(0).bounds().centerX(), Y = obj_Desc.find().get(0).bounds().centerY(), 
    Deviation = random(-10, 10), X1 = X - Deviation, Y1 = Y - Deviation, device.sdkInt<24?ra.tap(X1,Y1):click(X1,Y1);
}
function getSystemDate(a) {
    var b = new SimpleDateFormat("HH:mm:ss"), c = new SimpleDateFormat("yyyy-MM-dd");
    return "tf" == a ? b.format(new java.util.Date()) :"df" == a ? c.format(new java.util.Date()) :void 0;
}
function writeLog(a) {
    var c, b = "/sdcard/com.UITest.script/log/Info_" + getSystemDate("df") + ".log";
    files.ensureDir("/sdcard/com.UITest.script/log/"), files.exists(b) || files.create(b);
    try {
        c = new PrintWriter(new FileWriter(b, !0)), c.println("[" + getSystemDate("tf") + "] " + a), 
        c.flush(), c.close();
    } catch (d) {
        log(d);
    }
}
function writeConfig(str) { //将内容写入配置文件
    var ConfigPath = "/sdcard/com.UITest.script/tmp/Config/config.ini";
    files.exists(ConfigPath) || files.createWithDirs(ConfigPath), files.write(ConfigPath, str);
}
function getScriptFromServer(FILE,PATH) { //从服务器获取脚本
    var i, download_res, script_file_url = "https://script.iqqclub.com/Script/" + FILE;
    for (i = 0; 10 > i; i++) try {
        if (download_res = http.get(script_file_url), 200 == download_res.statusCode) break;
    } catch (e) {
        if (sleep(500), 9 == i) return !1;
    }
    return files.writeBytes(PATH + FILE, download_res.body.bytes()), 
    !0;
}
function sendMsgToDeveloper() {
    var LogfilePath = "/sdcard/com.UITest.script/log/Info_" + getSystemDate("df") + ".log";
    var fr = open(LogfilePath, mode = "r");
    var logArry = fr.readlines();
    fr.close(); 
    if (logArry.length >= 10) {
        var sendMsgArry = logArry.slice(-10);
    } else {
        var sendMsgArry = logArry;
    }
    var sendMsg = "";
    for (let i = 0; i < sendMsgArry.length; i++) {
        var w = sendMsgArry[i];
        sendMsg = sendMsg + w + "\n";
    }
    // alert(sendMsg);
    app.startActivity({
        data: "mqqapi://im/chat?chat_type=wpa&uin=1741903670",
    });
    waitForActivity('com.tencent.mobileqq.activity.SplashActivity');
    sleep(1000);
    id("input").setText(sendMsg);
    sleep(200);
    // id('fun_btn').findOne().click();
    clickText("发送");
    return;
}
function findApp(n) {
    if (getPackageName(n) != null) {
        return true;
    } else {
        return false;
    }
}