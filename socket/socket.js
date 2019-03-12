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
console.show();
danmu_re = /txt@=(.+?)\//g;
username_re =/nn@=(.+?)\//g;
var ip="119.97.145.131";
//创建Socket对象
var socket = new Socket(ip,8601);
log(1);
var out=socket.getOutputStream();
log(2);
var bw = new DataOutputStream(out);
log(3);
//bw.writeBytes("\x27\x00\x00\x00\x27\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=606118/\x00");
//bw.writeBytes("\x30\x00\x00\x00\x30\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=606118/gid@=-9999/\x00");
bw.writeBytes("\x26\x00\x00\x00\x26\x00\x00\x00\xb1\x02\x00\x00type@=loginreq/roomid@=96291/\x00");
bw.writeBytes("\x2f\x00\x00\x00\x2f\x00\x00\x00\xb1\x02\x00\x00type@=joingroup/rid@=96291/gid@=-9999/\x00");

log(4);
bw.flush;
log(5);


var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
log(6);
var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
log(7);
        
var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区
log(8);
while(1){//log(data.readLine());
   var a=bufferedReader.readLine();
   //log(a);
        //du = a.match(username_re);
        dc = a.match(danmu_re);
        try{
        for (var i=0;i<dc.length;i++){
            var xx=dc[i].split("=")[1].split("/")[0];
        log(xx);}}
        catch(err){}};

var info = "";
var temp = null;
/*
while(true){
    temp = bufferedReader.readLine();
    if(temp != null) {
        info += temp;
        log(info);
        break;
    }
    sleep(200);
}*/
