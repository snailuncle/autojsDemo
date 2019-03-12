var loging = floaty.window(
    <card cardBackgroundColor="#aa00FF00" cardCornerRadius="18dp">
        <horizontal w="250" h="35" paddingLeft="10" paddingRight="10">
            <text id="log" size="12dp" color="white" w="180" h="35" layout_gravity="center" gravity="center||left">脚本启动中</text>
            <button id="stop" w="50" textSize="10dp" textColor="red" h="35">关闭</button>
        </horizontal>
    </card>
)
ui.run(() => {
    loging.setPosition(170, 1074)
})

_log = log

function log(text) {
    if (loging) {
        ui.run(() => {
            loging.log.text(text)
        })
    }
}
var on = threads.start(function() {
    loging.log.on("click", () => {
        toast("已隐藏日志悬浮窗")
        loging.close()
    })
    loging.stop.on("click", () => {
        engines.stopAll()
    })
})
fn=function (){
    var c=0
    return ()=>{
        log(c.toString())
        return (++c)
        }
    }()
setInterval(fn,1000)
