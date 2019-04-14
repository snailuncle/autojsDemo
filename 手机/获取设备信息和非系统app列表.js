
var info = 获取设备信息和非系统app列表()
log(JSON.parse(info))

function 获取设备信息和非系统app列表(是否重新采样) {
  var 是否重新采样 = 是否重新采样 || false
  var storage = storages.create("test");
  if (是否重新采样) {
    storage.remove('设备特征和app列表')
  }
  var 设备特征和app列表 = storage.get('设备特征和app列表')
  if (设备特征和app列表) {} else {
    var 设备特征 = 提取设备特征()
    var app列表 = 获取手机上所有的app名字()
    var 设备特征和app列表 = {
      "设备特征": 设备特征,
      "app列表": app列表
    }
    设备特征和app列表 = JSON.stringify(设备特征和app列表)
    storage.put("设备特征和app列表", 设备特征和app列表);
  }
  return 设备特征和app列表
}

function 提取设备特征() {
  var myDevice = {};
  myDevice.屏幕宽度 = device.width;
  myDevice.屏幕高度 = device.height;
  myDevice.buildId = device.buildId;
  myDevice.主板 = device.board;
  myDevice.制造商 = device.brand;
  myDevice.型号 = device.model;
  myDevice.产品名称 = device.product;
  myDevice.bootloader版本 = device.bootloader;
  myDevice.硬件名称 = device.hardware;
  myDevice.唯一标识码 = device.fingerprint;
  myDevice.AndroidId = device.getAndroidId();
  myDevice.Mac = device.getMacAddress();
  myDevice.API = device.sdkInt;
  return myDevice
}

function 获取手机上所有的app名字() {
  var 所有的app名字 = []
  var pm = context.getPackageManager()
  let list = pm.getInstalledApplications(0)
  for (let i = 0; i < list.size(); i++) {
    let p = list.get(i)
    var app = {
      appName: p.loadLabel(pm),
      packageName: p.packageName
    }
    if (p.isSystemApp()) {} else {
      所有的app名字.push(app.appName)
    }
  }
  return 所有的app名字
}
