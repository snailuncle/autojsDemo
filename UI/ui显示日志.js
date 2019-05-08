"ui";
ui.layout(
    <vertical>
        <text text="日志"/>
        <com.stardust.autojs.core.console.ConsoleView id="console" h="*"/>
    </vertical>
);

ui.console.setConsole(runtime.console);
// 设置控制台字体颜色
let c = new android.util.SparseArray();
let Log = android.util.Log;
c.put(Log.VERBOSE, new java.lang.Integer(colors.parseColor("#dfc0c0c0")));
c.put(Log.DEBUG, new java.lang.Integer(colors.parseColor("#cc000000")));
c.put(Log.INFO, new java.lang.Integer(colors.parseColor("#ff64dd17")));
c.put(Log.WARN, new java.lang.Integer(colors.parseColor("#ff2962ff")));
c.put(Log.ERROR, new java.lang.Integer(colors.parseColor("#ffd50000")));
c.put(Log.ASSERT, new java.lang.Integer(colors.parseColor("#ffff534e")));
ui.console.setColors(c);

// 别问我这些API哪来的，能不能完善文档？这些都是Auto.js内部的API，因此不提供文档。如有更改，恕不另行通知。后续可能会提供正式支持。

setInterval(()=>{
    console.log(1);
    console.info(2);
}, 500);
