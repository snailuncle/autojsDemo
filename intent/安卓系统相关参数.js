function getApiLevel() {//获取系统API级别
  return android.os.Build.VERSION.SDK_INT;
}

function getSysDevelopmentCode() {//获取系统开发代号
  return android.os.Build.VERSION.CODENAME;
}

function getSystemVersion() {//获取系统版本
  return android.os.Build.VERSION.RELEASE;
}

function getDeviceUser() {//获取设备用户名
  return android.os.Build.USER;
}

function getDeviceVersionType() {//获取设备版本类型
  return android.os.Build.TYPE;
}

function getTime() {//获取系统时间
  return android.os.Build.TIME;
}

function getDeviceTags() {//获取设备标签
  return android.os.Build.TAGS;
}

function getProductName() {//获取产品名称
  return android.os.Build.PRODUCT;
}

function getManufacturer() {//获取制造商名称
  return android.os.Build.MANUFACTURER;
}

function getDeviceModel() {//获取设备型号
  return android.os.Build.MODEL;
}

function getDeviceVersion() {//获取设备版本号
  return android.os.Build.ID;
}

function getHost() {//获取主机地址
  return android.os.Build.HOST;
}

function getUniqueID() {//获取设备唯一标识
  return android.os.Build.FINGERPRINT;
}

function getDeviceName() {//获取设备驱动名称
  return android.os.Build.DEVICE;
}

function getCpuType() {//获取CPU第一个指令集名称
  return android.os.Build.CPU_ABI;
}

function getCpuType2() {//获取CPU第二个指令集名称
  return android.os.Build.CPU_ABI2;
}

function getDeviceBrand() {//获取设备品牌;
  return android.os.Build.BRAND;
}

function getBootLoader() {//获取设备引导程序版本号
  return android.os.Build.BOOTLOADER;
}
