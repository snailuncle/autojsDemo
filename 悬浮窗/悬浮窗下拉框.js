var w = floaty.rawWindow(
    <frame gravity="center" bg="#999999">
        <text id="text">悬浮文字</text>
        <vertical padding="16">
        <horizontal>
            <text textSize="16sp">下拉菜单</text>
            <spinner h="55" id="sp1" spinnerMode="dropdown" entries="选项1|选项2|选项3"/>
        </horizontal>
       
    </vertical>
    </frame>);
w.setPosition(500, 500);



w.sp1.on("key", function(keyCode, event){
    if(event.getAction() == event.ACTION_DOWN && keyCode == keys.back){
        w.disableFocus();
        event.consumed = true;
    }
});

w.sp1.on("touch_down", ()=>{
    w.requestFocus();
    w.sp1.requestFocus();
});

setTimeout(() => {
    w.close();
}, 5000);