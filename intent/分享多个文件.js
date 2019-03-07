importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(java.io.File);

/**
*作者QQ: 1811588980
*完成时间: 2018年12月29日 下午10:04:56
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/
分享文件夹中的所有文件("/storage/emulated/0/脚本/ui类");

function 分享单个文件(文件路径) {
    // var uri = new Uri.parse("/storage/emulated/0/建记/图片/img08.jpg");
    var uri = new Uri.parse(文件路径);
    new weiFile([String(文件路径)]).share();
    //new SystemShareUtils().share(context, uri);
};


function 分享文件夹中的所有文件(文件夹路径) {
    //不支持子文件夹中的文件。
    //var file= new File("/storage/emulated/0/超建记/文件夹");
    var file = new File(文件夹路径);
    var list = file.listFiles();

    var uris = list.map(function(file) {
        return new Uri.fromFile(file);
    });
    //log(list);
    new weiFile(list).share();
    //new SystemShareUtils().shareList(context, uris);
};

function SystemShareUtils() {

    this.shareText = function(ctx, text) {
        sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, text);
        sendIntent.setType("text/plain");
        ctx.startActivity(Intent.createChooser(sendIntent, "分享至"));
    };

    this.share = function(ctx, uri) {
        sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_STREAM, uri);
        sendIntent.setType("*/*");
        ctx.startActivity(Intent.createChooser(sendIntent, "分享至"));
    };

    this.shareList = function(ctx, uris) {
        sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
        sendIntent.putExtra(Intent.EXTRA_STREAM, uris);
        sendIntent.setType("*/*");
        ctx.startActivity(Intent.createChooser(sendIntent, "分享至"));
    };
};


 //下面是要主要功能的模块。
 function weiFile(pathList, ctx) {
     this.open = function() {
         try{
         var intent = new android.content.Intent("android.intent.action.VIEW");
         intent.setDataAndType(this.uriList[0], "*/*");
         ctx.startActivity(Intent.createChooser(intent, "打开文件"));
         }catch(e){toastLog(e);};
     };
     this.share = function() {
         try{
         var sendIntent = new android.content.Intent();
         sendIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
         sendIntent.putExtra(Intent.EXTRA_STREAM, this.uriList);
         sendIntent.setType("*/*");
         ctx.startActivity(Intent.createChooser(sendIntent, "分享文件"));
         }catch(e){toastLog(e);};
     };
     this.getMIMEType = function(file) {
         var MIME_MapTable = {
             'text': ['.txt', '.c', '.conf', '.cpp', '.h', '.htm', '.html', '.java', '.txt', '.js', '.log', '.prop', '.rc', '.sh', '.xml'],
             'image': ['.bmp', '.gif', '.jpeg', '.jpg', '.png'],
             'audio': ['.m3u', '.m4a', '.m4b', '.m4p', '.mp2', '.mp3', '.mpga', '.ogg', '.rmvb', '.wav', '.wma', '.wmv'],
             'video': ['.3gp', '.asf', '.avi', '.m4u', '.m4v', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpg4'],
             'application': ['.apk', '.bin', '.class', '.doc', '.docx', '.xls', '.xlsx', '.exe', '.gtar', '.gz', '.jar', '.js', '.mpc', '.msg', '.pdf', '.pps', '.ppt', '.pptx', '.rtf', '.tar', '.tgz', '.wps', '.z', '.zip'],
             '*': ['']
         };
         var type = "*/*";
         var fName = String(file.getName());
         var dotIndex = fName.split(".");
         if (dotIndex.length < 2) {
             return type;
         }
         var end = String("." + dotIndex.pop()).toLowerCase();
         if (end == "") {
             return type;
         };
         for (let i in MIME_MapTable) {
             var ary = MIME_MapTable[i];
             for (let a = 0; a < ary.length; a++) {
                 if (end == ary[a]) {
                     //toastLog(i + "/*" + "/" + end);
                     return i + "/*";
                 };
             };
         };
         return type;
     };
     this.getUriFromFile = function(file) {
         return android.net.Uri.fromFile(file);
         //return android.support.v4.content.FileProvider.getUriForFile(ctx, "org.autojs.autojs.fileprovider", file);
     };
     this.pathExists = (value)=> {
         value=String(value);
         if (typeof value == "string" && files.exists(value)) {
             return true;
         };
         return false;
     };
try{
     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     ctx = ctx || context;
     this.fileList = new Array;
     this.uriList = new Array;
     this.MIMEType;
     pathList.map(String);
     if (pathList.every(this.pathExists)) {
         this.fileList = pathList.map(function(path) {
             return new java.io.File(String(path));
         });
         if (!this.fileList.every((file, i, ary) => {
                 var MIMEType = this.getMIMEType(file);
                 if (!i || this.getMIMEType(ary[i - 1]) == MIMEType) {
                     return true;
                 } else {
                     return false;
                 };
             })) {
             throw "文件类型不相同";
         };
         this.MIMEType = this.getMIMEType(this.fileList[0]);
         this.uriList = this.fileList.map((file)=> {
             //this.uri = android.net.Uri.fromFile(this.file);
             return this.getUriFromFile(file);
         });
     } else {
         throw "数组或文件不存在";
     };
     }catch(e){toastLog(e);};

 };
