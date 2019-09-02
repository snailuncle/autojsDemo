console.show()

var raf = new java.io.RandomAccessFile("/storage/emulated/0/gx", "rw");
var fc = raf.getChannel();
var mbb = fc.map(java.nio.channels.FileChannel.MapMode.READ_WRITE, 0, 1024 * 1024 );



//清除文件内容  
for (let i = 0; i < 1024; i++) {
    mbb.put(i, 0);
}
threads.start(function() {
    var 命令, 内容, 长度
    while (true) {
        let 状态 = mbb.get(0); //取读写数据的标志  
        let 指令 = mbb.get(1); //读取数据的位置,2 为可读  
        if (状态 == 1 || 指令 == 1) {
            var 开始 = java.lang.System.currentTimeMillis()
            let 长度 = 读取内容(mbb, 2, 20)
            //log(长度)
            长度 = parseInt(new java.lang.String(长度))
            log("接收数据长度:", 长度)
            命令 = 读取内容(mbb, 22, 长度)
            命令 = new java.lang.String(命令)
            log("收到数据:", 命令)
            if (命令 == "开始") {
                内容 = "收到"
                长度 = "" + java.lang.String(内容.toString()).getBytes().length;
            } else if (命令 == "截图") {
                内容 = imgb
                长度 = "" + 内容.length
            } else {
                内容 = "未知命令"
                长度 = "" + java.lang.String(内容.toString()).getBytes().length;
            }
            写入内容(mbb, 2, 长度)
            写入内容(mbb, 22, 内容)
            mbb.put(0, 2); //状态复位
            mbb.put(1, 2); //指令复位
            log("用时", java.lang.System.currentTimeMillis() - 开始)
        }

    }

})

sleep(300)
var 开始 = java.lang.System.currentTimeMillis()
var img = images.read("/sdcard/1.png")
log("用时", java.lang.System.currentTimeMillis() - 开始)
imgb = images.toBytes(img)
log("用时", java.lang.System.currentTimeMillis() - 开始)
log(imgb.length)
发送命令("开始")
发送命令("截图")

function 发送命令(命令) {
    var b = java.lang.String(命令.toString()).getBytes();
    var 长度 = "" + (b.length)
    //var 长度1 = 长度.substring(长度.length - 20)
    log("长度", 长度)
    while (true) {
        let 状态 = mbb.get(0); //取读写数据的标志  
        let 指令 = mbb.get(1); //读取数据的位置,2 为可读  
        if (状态 == 0 && 指令 == 0) {
            写入内容(mbb, 2, 长度)
            写入内容(mbb, 22, 命令)
            mbb.put(0, 1); //指令复位
            mbb.put(1, 1); //指令复位
            log("发送完成")
            while (true) {
                let 状态 = mbb.get(0); //取读写数据的标志  
                let 指令 = mbb.get(1); //读取数据的位置,2 为可读  
                if (状态 == 2 && 指令 == 2) {
                    log("收到回复")
                    var 开始 = java.lang.System.currentTimeMillis()
                    let 长度 = 读取内容(mbb, 2, 20)
                    //log(长度)
                    长度 = parseInt(new java.lang.String(长度))
                    log("接收数据长度:", 长度)
                    命令 = 读取内容(mbb, 22, 长度)
                    // 命令 = new java.lang.String(命令)
                    log("收到回复数据:", 命令.length)
                    mbb.put(0, 0); //指令复位
                    mbb.put(1, 0); //指令复位
                    log("收到回复用时", java.lang.System.currentTimeMillis() - 开始)
                    return 命令
                    break
                }
            }
            break
        }
    }
}

function 读取内容(流, 开始, 个数) {
    var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 个数);
    for (let i = 0; i < 个数; i++) {
        buf[i] = 流.get(开始 + i)
    }
    return buf
}

function 写入内容(流, 开始, 内容) {
    var b
    if (typeof(内容) == "string") {
        b = java.lang.String(内容.toString()).getBytes();
    } else {
        b = 内容
    }
    for (let i = 0; i < b.length; i++) {
        流.put(开始 + i, b[i])
    }
    return b.length
}