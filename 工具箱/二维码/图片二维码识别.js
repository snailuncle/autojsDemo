runtime.loadDex("二维码识别.dex");
importPackage(com.google.zxing);
importPackage(com.google.zxing.common);
importPackage(com.google.zxing.client.j2se);

var imgPath = "/storage/emulated/0/DCIM/Screenshots/Screenshot_2019-03-29-13-09-51-952_bin.mt.plus.png";

var pixels = images.readPixels(imgPath);
var w = pixels.width;
var h = pixels.height;
var binaryBitmap = new BinaryBitmap(new HybridBinarizer(new RGBLuminanceSource(w, h, pixels.data)));
var qrCodeResult = new MultiFormatReader().decode(binaryBitmap);
toastLog(qrCodeResult.getText());