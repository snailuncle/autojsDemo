wifi = context .getSystemService("wifi");
info = wifi.getConnectionInfo();
log(info.getMacAddress());



var MAC_ADDR = shell("ifconfig |grep 'wlan0'");

log(MAC_ADDR);
