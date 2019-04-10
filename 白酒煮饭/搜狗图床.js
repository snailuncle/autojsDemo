function 上传图片(path){
var url="http://pic.sogou.com/pic/upload_pic.jsp";
var res=http.postMultipart(url,{
"file": open(path),
});
var t=res.body.string();
return t;
}
path="/storage/emulated/0/BDY_DOWNLOAD/1.驱动&程序_69ac5/1.驱动&程序/122U操作图解说明/1操作说明（第一页）.jpg";
log(上传图片(path));

