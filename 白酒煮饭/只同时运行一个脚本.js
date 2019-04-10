/*
打开这个脚本的同时，会同时结束其他脚本
多次运行同一个脚本，会结束前面的脚本，运行最后一个脚本
使用方法，把下面
//=================
之前的代码放在脚本的开头就可以了
*/
只运行一个脚本()
function 只运行一个脚本() {
    var source = engines.myEngine().getTag("source");
    var minling = files.read(source)
    minling = minling.replace("只运行一个脚本", "开始")
    log(minling)
    engines.execScript("hello ", minling)
    engines.stopAll()
}
function 开始() {
    toast("开始")
}
//=================


sleep(1000)
i = 0
while (true) {
    toastLog("哈哈" + i)
    i++
    sleep(2000)
}