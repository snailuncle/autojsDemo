importClass("java.io.DataInputStream");
importClass("java.io.DataOutputStream");
importClass("java.io.OutputStreamWriter");
importClass("java.io.BufferedWriter");
importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');


function str1(roomi) {
    var x1 = "";
    var roomid = roomi.toString();
    if (roomid.length == 1) {
        var x1 = "\x22\x00\x00\x00\x22\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 2) {
        var x1 = "\x23\x00\x00\x00\x23\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 3) {
        var x1 = "\x24\x00\x00\x00\x24\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 4) {
        var x1 = "\x25\x00\x00\x00\x25\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 5) {
        var x1 = "\x26\x00\x00\x00\x26\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 6) {
        var x1 = "\x27\x00\x00\x00\x27\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 7) {
        var x1 = "\x28\x00\x00\x00\x28\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 8) {
        var x1 = "\x29\x00\x00\x00\x29\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    if (roomid.length == 9) {
        var x1 = "\x2a\x00\x00\x00\x2a\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=" + roomid + "/\x00";
    };
    return x1;
}

function str2(roomi) {
    var x2 = "";
    var roomid = roomi.toString();
    if (roomid.length == 1) {
        var x2 = "\x2b\x00\x00\x00\x2b\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 2) {
        var x2 = "\x2c\x00\x00\x00\x2c\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 3) {
        var x2 = "\x2d\x00\x00\x00\x2d\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 4) {
        var x2 = "\x2e\x00\x00\x00\x2e\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 5) {
        var x2 = "\x2f\x00\x00\x00\x2f\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 6) {
        var x2 = "\x30\x00\x00\x00\x30\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 7) {
        var x2 = "\x31\x00\x00\x00\x31\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 8) {
        var x2 = "\x32\x00\x00\x00\x32\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    if (roomid.length == 9) {
        var x2 = "\x33\x00\x00\x00\x33\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=" + roomid + "/gid@=-9999/\x00";
    };
    return x2;
}

var roomid = rawInput("请输入房间号");
console.show();
danmu_re = /txt@=(.+?)\/cid/g;
username_re = /nn@=(.+?)\/txt/g;
dm_re = /\/nn@=(.+?)\/txt@=(.+?)\/cid/g;
var ip = "119.97.145.131";
var socket = new Socket(ip, 8601);
var out = socket.getOutputStream();
var bw = new DataOutputStream(out);
bw.writeBytes(str1(roomid));
bw.writeBytes(str2(roomid));
bw.flush;

function xt() {
    var xtb = "\x14\x00\x00\x00\x14\x00\x00\x00\xb1\x02\x00\x00type@=mrkl/\0"
    bw.writeBytes(xtb);
    bw.flush;
    console.error("发送心跳包");
}
threads.start(function() { //在新线程执行的代码 
    while (1) {
        xt();
        sleep(15000);
    }
});



var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区
while (1) {
    var a = bufferedReader.readLine();
    // log(a);
    try {
        dc = a.match(danmu_re);
        //log(dc);
        for (var i = 0; i < dc.length; i++) {
            //log("[", dc[i].split("/")[1].split("=")[1], "]:", dc[i].split("/")[2].split("=")[1]);
            log(dc[i].split("=")[1].split("/")[0]);
        }
    } catch (err) {}
};