var f = '/sdcard/img/1.png';
app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,android.net.Uri.fromFile(java.io.File(f))));