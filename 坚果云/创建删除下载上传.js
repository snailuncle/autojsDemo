var url = "http://dav.jianguoyun.com/dav/";
var name = ""; //坚果云账号
var pass = ""; //获取方式 https://writer.drakeet.com/backups
var code = base64(name + ":" + pass);


function 读取(code) {
    //读取目录文件
    var res = http.request("http://dav.jianguoyun.com/dav/", {
        method: "PROPFIND",
        headers: {
            Authorization: "Basic "+code
        }
    })
    log(res.body.string());
}

function 创建目录(name) {
    //用于创建目录
    //vat name = "Writer.txt;
    var res = http.request(url + name, {
        method: "MKCOL",
        headers: {
            "Authorization": "Basic " + code,
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        },

    });
    log(res.body.string());
}

function 删除(path) {
    //删除一个文件
    //var path = "Put/Writer.txt";
    var res = http.request(url + path, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + code,
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    log(res.body.string());
}

function 获取(path) {
    //获取一个资源文件
    //var url = "Put/Writer.txt";
    var res = http.get(url + path, {
        headers: {
            "Authorization": "Basic " + code,
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    log(res.body.string());
}

function 上传(path, str) {
    //上传文件
    //var path = "Put/Writer.txt";
    var res = http.request(url, {
        method: "PUT",
        headers: {
            "Authorization": "Basic " + code,
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        },
        //body: "Javascript 面向对象编程—继承和封装"
        body: str
    });
    log(res.body.string());
}

function base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}
