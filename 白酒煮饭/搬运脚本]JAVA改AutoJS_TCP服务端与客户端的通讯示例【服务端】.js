auto();
console.show();

importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.ServerSocket');

var serversocket = new ServerSocket(8888);
log('服务端已经启动,正在等待客户端连接...');
var socket = serversocket.accept();
var inputStream = socket.getInputStream();
var inputStreamReader = new InputStreamReader(inputStream);
var bufferedReader = new BufferedReader(inputStreamReader);
var temp = null;
var info = "";
while(true){
    temp = bufferedReader.readLine();
    if(temp != null) {
        info += temp;
        log("已接收到客户端连接\n");
        log("收到客户端信息：\n"+info+"\n\n当前客户端ip为：\n"+socket.getInetAddress().getHostAddress());
        break;
    }
    sleep(200);
}
var outputStream = socket.getOutputStream();
var printWriter = new PrintWriter(outputStream);
printWriter.print("你好，服务端已接收到您的信息");
printWriter.flush();
socket.shutdownOutput();//关闭输出流
//关闭对应资源
printWriter.close();
outputStream.close();
bufferedReader.close();
inputStream.close();
serversocket.close();