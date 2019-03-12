/*********************
//说明文档

百度云.登录()      => ""    //填写BDUSS实现登录
     .列表("目录/")      => ("目录/") or ("目录/目录/") //获取当前目录文件,文件夹列表 返回数组
     .上传("图片.jpg","我的资源/")   => ("文件名","网盘存储路径")
     .下载("我的资源/图片.jpg")     => ("路径/文件名")
     .创建文件夹("相册")    =>  ("相册/宠物")  
     .重命名("我的资源","你的资源")   =>  ("更名前名称","更名后名称")
     .删除("照片1.jpg")  =>  (相册/宠物/狗狗.jpg)


*///******************
var BDUSSk = storages.create("BDUSS库");
var cookie = BDUSSk.get("BDUSS")
var SD=files.getSdcardPath();
files.create(SD+"/网盘");
files.create(SD+"/网盘/上传");
files.create(SD+"/网盘/下载");


var 正则 = {
    替换: function(str, stra, strb) {
        return str.replace(stra, strb)
    },
    全部替换: function(str, stra, strb) {
        return eval("str.replace(/" + stra + "/g,'" + strb + "')")
    },
    查找: function(str, stra) {
        return str.search(stra)
    },
    截取: function(str, inta, intb) {
        if (intb) {
            return str.substr(inta, intb)
        } else {
            return str.substr(inta)
        }
    },
    提取: function(str, stra, strb) {
        return eval("str.match(/" + stra + "(\\S*)" + strb + "/)[1]")
    }

}
var 百度云 = {
    "验证": function() {
        if (cookie == "" || cookie == null || cookie == "BDUSS=null") {
            toast("请先登录填写BDUSS然后再运行其他项目！");
            exit();
        }
    },
    "登录": function() {
        dialogs.rawInput("请输入BDUSS", "", function(BDUSS) {
           
            if(BDUSS!=null){
            BDUSSk.put("BDUSS", "BDUSS=" + BDUSS)
            alert("BDUSS 保存成功！");
            }else{alert("已取消！");}
        });
        return cookie
        toast("模块正在开发");
    },
    "列表": function(path) {
        百度云.验证()
        if (!path) {
            path = ""
        }

        var url = "http://pcs.baidu.com/rest/2.0/pcs/file?path=/" + path + "&method=list&app_id=266719&by=name&order=asc&limit=0-100"
        var 头 = {
            headers: {
                "Cookie": cookie
            }
        }
        var 返回数据 = http.get(url, 头)
        var 文件 = 返回数据.body.json().list
        var 文件数量 = 文件.length
        var 文件列表 = []
        for (var i = 0; i < 文件数量; i++) {
            if (文件[i].isdir == 1) {
                文件列表.push(文件[i].server_filename + "/")
            } else {
                文件列表.push(文件[i].server_filename)

            }
        }
        return 文件列表
        toast("模块正在开发");


    },
    "上传": function(name, path) {
        百度云.验证()
        if (!path) {
            path = ""
        }
        dialogs.alert("请在内存根目录创建'网盘/上传'文件夹,使用文件名称,网盘存储路径 进行传参上传文件！")

        var fh = http.postMultipart("http://pcs.baidu.com/rest/2.0/pcs/file?method=upload&app_id=266719&type=tmpfile", {
            file: open(SD + "/网盘/上传/" + name)
        }, {
            headers: {
                "Cookie": cookie
            }
        })
        var md5 = fh.body.json().md5;
        //log(md5)

        var sc = http.post("http://pcs.baidu.com/rest/2.0/pcs/file?method=createsuperfile&app_id=266719&path=/" + path + name, {
            'param': '{"block_list":["' + md5 + '"]}'
        }, {
            headers: {
                "Cookie": cookie
            }
        })
        if (sc.statusCode == 200) {
            return "OK"
        } else {
            return sc.body.json().error_msg
        }

        toast("模块正在开发")
    },
    "下载": function(patha) {
        百度云.验证()
        var xzfh = http.get("pcs.baidu.com/rest/2.0/pcs/file?method=download&app_id=266719&path=/" + patha, {
            headers: {
                "Cookie": cookie
            }
        })
        if (xzfh.statusCode != 200) {
            toast("请求失败");
            //return xzfh.body.json().error_msg 
        }

        var name = 正则.提取(xzfh.headers['Content-Disposition'], 'filename="', '"')
        files.writeBytes(SD + "/网盘/下载/" + name, xzfh.body.bytes());
        toast("下载成功");
        return "OK"

        toast("模块正在开发");
    },
    "创建文件夹": function(path) {
        百度云.验证()
        if (!path) {
            path = "新建文件夹"
        }
        var cjfh = http.post("pcs.baidu.com/rest/2.0/pcs/file?method=mkdir&app_id=266719&path=/" + path, {}, {
            headers: {
                Cookie: cookie
            }
        })
        if (cjfh.statusCode == 200) {
            return "OK"
        } else {
            return cjfh.body.json().error_msg
        }

        toast("模块正在开发");

    },
    "重命名": function(namea, nameb) {
        百度云.验证()
        var cmm = http.post("pcs.baidu.com/rest/2.0/pcs/file?method=move&app_id=266719&from=/" + namea + "&to=/" + nameb, {}, {
            headers: {
                "Cookie": cookie
            }
        })
        if (cmm.statusCode == "200") {
            var fh = "OK"
        } else {
            var fh = cmm.body.json().error_msg
        }
        return fh

        toast("模块正在开发");
    },
    "删除": function(name) {
        百度云.验证()
        var scfh = http.post("http://pcs.baidu.com//rest/2.0/pcs/file?method=delete&app_id=266719&path=/" + name, {}, {
            headers: {
                "Cookie": cookie
            }
        })
        if (scfh.statusCode == "200") {
            var fh = "OK"
        } else {
            var fh = scfh.body.json().error_msg
        }
        return fh

        toast("模块正在开发");
    }
}

console.show();
log(
    //百度云.登录(),
    百度云.列表()
    //百度云.上传(),
    //百度云.下载(),
    //创建文件夹,
    //重命名,
    //删除,
)