runtime.loadDex("/storage/emulated/0/Tencent/QQfile_recv/zy.dex");
importPackage(com.google.zxing);
importPackage(com.google.zxing.common);
importPackage(com.google.zxing.client.j2se);

var imgPath = "/sdcard/Quark/Download/zx.png";

var pixels = images.readPixels(imgPath);
var w = pixels.width;
var h = pixels.height;
var binaryBitmap = new BinaryBitmap(new HybridBinarizer(
    new RGBLuminanceSource(w, h, pixels.data)));
var qrCodeResult = new MultiFormatReader().decode(binaryBitmap);
toastLog(qrCodeResult.getText());
