//使用说明
/**
 *运行环境：有蓝牙硬件的 安卓全设备 任意分辨率
 *运行前请保证，需检测软件曾连接过，或处于已连接状态
 *
 *运行正常进入监听状态后：
 *所有收到的数据会写入本地数据库/sdcard/datebase/BlueMessage.db
 *
 *运行时设备可以处于待机状态，但不可开启高级省电模式
 *
 *开发者：浩然（Q 2125764918）
 */


//导入Java&Android包
importClass(android.bluetooth.BluetoothSocket)
importClass(android.bluetooth.BluetoothAdapter)
importClass(android.bluetooth.BluetoothDevice)
importClass(android.bluetooth.BluetoothServerSocket)
importClass(android.bluetooth.BluetoothClass)
importClass(android.bluetooth.BluetoothProfile)
importClass(android.content.BroadcastReceiver)
importClass(java.util.UUID)
importClass(java.io.BufferedReader);
importClass(java.io.IOException);
importClass(java.io.InputStream);
importClass(java.io.InputStreamReader);
importClass(java.io.OutputStream);
importClass(java.io.PrintWriter);

//申请权限
//requestScreenCapture()

//常量池
var REQUEST_ENABLE_BT = 1

//检查设备支持
var bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
if (bluetoothAdapter == null) {
    toastLog("抱歉，您的设备不支持蓝牙")
    exit()
}
log("已获取到设备蓝牙适配器：" + bluetoothAdapter)

//检查蓝牙状态
if (bluetoothAdapter.isEnabled()) {
    toastLog("蓝牙已开启")
} else {
    log("蓝牙未开启，正在打开蓝牙")
    var enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
    app.startActivity(enableBtIntent, REQUEST_ENABLE_BT);
    for (var i = 0; !bluetoothAdapter.isEnabled(); i++) {
        sleep(200)
        if (i >= 40) {
            toastLog("蓝牙超时未连接成功，自动终止程序")
            exit()
        }
    }
    toastLog("蓝牙已开启")
}

//连接设备
var devices = bluetoothAdapter.getBondedDevices();
var option = new Array()

if (devices.size() > 0) {
    for (var iterator = devices.iterator(); iterator.hasNext();) {
        var bluetoothDevice = iterator.next();
        option.push("设备：" + bluetoothDevice.getName() + "\n地址：" + bluetoothDevice.getAddress() + "\nuuid：" + bluetoothDevice.getUuids().toString());
    }
}

var cho = -1;
for (; cho < 0;) {
    cho = dialogs.select("请选择需要连接的蓝牙设备", option)
}
toastLog("正在连接：\n" + option[cho])
var device = devices.toArray()[cho]

try {
    var socket = device.createRfcommSocketToServiceRecord(UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"))
    bluetoothAdapter.cancelDiscovery();
    socket.connect()
    toast("连接成功")
} catch (e) {
    toast("连接异常")
    exit()
}

//构建通信通道
var outputStream = socket.getOutputStream(); //获取一个输出流，向服务端发送信息
var printWriter = new PrintWriter(outputStream); //将输出流包装成打印流
var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区

//开启数据库
let db = sqlite.open("/sdcard/datebase/BluetoothMessage.db", {
    version: 1
}, {
    onOpen: function(db) {

        db.execSQL("CREATE TABLE IF NOT EXISTS ALLMESSAGE(" +
            "`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "`nr` TEXT" + ")"
        );
    }
});

threads.start(function() {
    var window = floaty.window(
        <vertical>
            <input id="input" text="请输入要发送的内容" textSize="16sp" focusable="true"/>
            <button id="ok" text="确定"/>
        </vertical>
    );

    window.exitOnClose();

    toast("长按确定键可调整位置");

    window.input.on("key", function(keyCode, event) {
        if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
            window.disableFocus();
            event.consumed = true;
        }
    });

    window.input.on("touch_down", () => {
        window.requestFocus();
        window.input.requestFocus();
    });

    window.ok.on("click", () => {
        printWriter.print(window.input.text())
        toast("已发送：" + window.input.text())
        printWriter.flush()
        window.input.setText("")
        window.disableFocus();
    });

    window.ok.on("long_click", () => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });

    setInterval(() => {}, 1000);
});

//监听写入
while (true) {
    try {
        var nstr = bufferedReader.readLine();
        if (nstr != null) {
            toastLog("插入张三: ", db.insert("ALLMESSAGE", {
                nr: nstr
            }));
        }
    } catch (e) {
        toastLog("蓝牙断开，停止服务")
    }
}


/**/