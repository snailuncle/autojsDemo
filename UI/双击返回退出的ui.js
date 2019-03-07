
"ui";
ui.layout(
    <frame gravity="center">
   <text textSize="25" text="这个界面只能双击返回键退出"gravity="center"/>
    </frame>
    );
var isCanFinish = false;
var isCanFinishTimeout;
ui.emitter.on("back_pressed", e => {
    if (!isCanFinish) {
        isCanFinish = true;
        isCanFinishTimeout=setTimeout(() => {
            toastLog("双击退出");
            isCanFinish = false;
        }, 400);
        e.consumed = true;
    } else {
        clearTimeout(isCanFinishTimeout);
        e.consumed = false;
    };
});
