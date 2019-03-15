auto();
console.show();

var SERVERIP = '192.168.3.13'; //这里修改成服务端IP

importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');

//创建Socket对象
var socket = new Socket(SERVERIP,8888);
//根据输入输出流和服务端连接
var outputStream = socket.getOutputStream(); //获取一个输出流，向服务端发送信息
var printWriter = new PrintWriter(outputStream); //将输出流包装成打印流
printWriter.print("服务端你好，我是DcrClub,请求连接...");
printWriter.flush();
socket.shutdownOutput();//关闭输出流

var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区
var info = "";
var temp = null;
while(true){
    temp = bufferedReader.readLine();
    if(temp != null) {
        info += temp;
        log("客户端接收服务端发送信息："+info);
        break;
    }
    sleep(200);
}
//关闭相对应的资源
bufferedReader.close();
inputStream.close();
printWriter.close();
outputStream.close();
socket.close();