/**
 * 直接打开开发者模式 
 * 我是用来选择直接进入系统的, 这样亮屏之后就不用滑动解锁了
 * 作者: 稻草人, 家
 */

importClass(android.app.Activity)
importClass(android.content.ComponentName)
importClass(android.content.Intent)
importClass(android.os.Bundle)

componentName = new ComponentName("com.android.settings", "com.android.settings.DevelopmentSettings");
intent = new Intent();
intent.setComponent(componentName);
intent.setAction("android.intent.action.View");
context.startActivity(intent);