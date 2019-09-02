// 判断屏幕是否锁定
// 返回 true 表示锁定
function isScreenLocked() {
    let km = context.getSystemService("keyguard");
    return km.inKeyguardRestrictedInputMode();
  };