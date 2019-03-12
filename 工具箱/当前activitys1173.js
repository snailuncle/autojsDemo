var window = floaty.window(
    <frame gravity="center">
        <text id="text" textSize="12sp" textColor="#FFFF00FF"/>
    </frame>
);

window.exitOnClose();

var i = 0;

setInterval(function(){
   
   
   
//文件路径
var path = "/sdcard/1.txt";
//要写入的文件内容
//以写入模式打开文件
var file = open(path, "a");
    //file:week(set)
//写入文件
    file.writeline(["\n\n当前包名: " + currentPackage() + "\n",
           "当前应用名:  " + app.getAppName(currentPackage())+ "\n",
           "当前活动:  " + currentActivity()]);
//关闭文件


//附加一行"啦啦啦啦"
file.writeline("");
//附加一行"哈哈哈哈"
//file.writeline("哈哈哈哈");
//附加两行ccc, ddd
//file.writelines(["ccc", "ddd"]);
//输出缓冲区
file.flush();
//关闭文件
file.close(); 
if(i == 5){
        exit()
    }
}, 4000);



window.text.click(()=>{
    window.setAdjustEnabled(!window.isAdjustEnabled());
    setClip(currentActivity());
    toast("   已复制\n当前活动:\n " + currentActivity())
});

setInterval(()=>{
    //对控件的操作需要在UI线程中执行
    ui.run(function(){
        window.text.setText(dynamicText());
    });
}, 1000);


function dynamicText(){
     var date = new Date();
    var str = util.format("时间: %d:%d:%d\n\n", date.getHours(), date.getMinutes(), date.getSeconds());
    str += util.format("内存使用量: %d%%\n\n", getMemoryUsage());
    str += "当前包名: \n" + currentPackage() + "\n\n";
    str += "当前应用名: \n" + app.getAppName(currentPackage())+ "\n\n";
    str += "当前活动: \n" + currentActivity();
    return str;
}

//获取内存使用率
function getMemoryUsage(){
    var usage = (100 * device.getAvailMem() / device.getTotalMem());
    //保留一位小数
    return Math.round(usage * 100) / 100;
}
