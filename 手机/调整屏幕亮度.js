/**
 * 作者: ProjectXero
 * 功能: 调整屏幕亮度
 * 备注: screenBrightness=0 0最暗 1最亮 
 */

var w = floaty.rawWindow(
  <frame id="main" gravity="center" bg="#44ffcc00"/>
);
w.setSize(-1, -1);
w.setTouchable(false);
log(w.main.getRootView().getLayoutParams().screenBrightness=0);
setTimeout(()=>{ w.close(); }, 4000);
