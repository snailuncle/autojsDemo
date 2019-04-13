/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  教你修改一些简单的安卓或java代码
 * 功能:  让autojs也可以用
 */


// 原版java   作用是获取手机simSerialNumber
TelephonyManager telephonyManager = (TelephonyManager) getSystemService(TELEPHONY_SERVICE);
String simSerialNumber = telephonyManager.getSimSerialNumber();


// 第0步:  把所有java前面的类型去掉
// 第一步
// getSystemService这函数哪里来的?,在autojs怎么调用?
// 答: 不知道
// 怎么办? 去  https://github.com/snailuncle/autojsDemo
// 左上角输入   getSystemService in:file
// 搜到了几个例子,前面加上context就可以直接用了

// 于是第一行变成这样
telephonyManager = context.getSystemService(TELEPHONY_SERVICE);

// 第二步
// TELEPHONY_SERVICE 这是啥? 好像是电话服务,
// 嗯,刚才搜索getSystemService,她后面就有大写字母
// 前缀是  context   或者    android.app.Service
// 各尝试一下两种前缀
// 并打印一下结果

telephonyManager = context.getSystemService(context.TELEPHONY_SERVICE);
log(telephonyManager)
// android.telephony.TelephonyManager@bedf93b
telephonyManager = android.app.Service.getSystemService(context.TELEPHONY_SERVICE);
log(telephonyManager)
// Java class "android.app.Service" has no public instance field or method named "getSystemService".

// 第一个正确,第二个报错了

// 于是第一行最终样子

telephonyManager = context.getSystemService(context.TELEPHONY_SERVICE);

// 这是第二行
simSerialNumber = telephonyManager.getSimSerialNumber();
log(simSerialNumber)

// 喜出望外的去执行, 但是报错了,需要READ_PHONE_STATE权限
// Wrapped java.lang.SecurityException: getIccSerialNumber: Neither user 10360 nor current process has android.permission.READ_PHONE_STATE.


//去官方文档找一找申请权限的例子
// https://hyb1996.github.io/AutoJs-Docs/#/

// 左上角有个搜索按钮,输入权限两个字, 第三个搜索结果有  动态申请安卓权限几个字

//请求GPS权限
runtime.requestPermissions(["access_fine_location"]);

// 照猫画虎的改改,懒得不行,先试试大写,大写不行,再去试试小写,
// 小写不行再去百度.
// 试了一下,大写就可以申请权限
runtime.requestPermissions(["READ_PHONE_STATE"]);



// 最终的样子
runtime.requestPermissions(["READ_PHONE_STATE"]);
telephonyManager = context.getSystemService(context.TELEPHONY_SERVICE);
simSerialNumber = telephonyManager.getSimSerialNumber();
log(simSerialNumber)

// 成功获取simSerialNumber
// 89866666666666627447
