"ui";
toastLog(activity
          .getWindow()
          .getDecorView()
          .getChildAt(0)
          .getChildCount()
          )

窗口管理器
wManager = context.getSystemService(
  context.WINDOW_SERVICE);
          
高级输入法
var window = floaty.window(
  <text id="text"/>
);

for (var i = 0; i < 50; i++) {
  ui.run(() => {
      imm = window.text.getContext().getSystemService(context.INPUT_METHOD_SERVICE);
      imm.toggleSoftInput(0, android.view.inputmethod.InputMethodManager.SHOW_FORCED);
  });
  sleep(100);
};

调整手机亮度
var w = floaty.rawWindow(
  <frame id="main" gravity="center" bg="#44ffcc00"/>
);
w.setSize(-1, -1);
w.setTouchable(false);
log(w.main.getRootView().getLayoutParams().screenBrightness=0);
setTimeout(()=>{ w.close(); }, 4000);          