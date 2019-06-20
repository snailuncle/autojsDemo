importPackage(android.content);
importPackage(java.io);
importPackage(java.util);
importPackage(java.util.zip);

importClass(android.net.Uri);
importClass(android.provider.Settings);
importClass(android.content.pm.PackageManager);
importClass(android.provider.ContactsContract);
importClass(android.database.Cursor);

module.exports = {
    /**
     * 使用cookie管理
     */
    getCookieManager : function() {
        if (context.getPackageName() != "org.autojs.autojs") {
            toastLog("cookieManager只能运行在免费版本的autojs,pro版不支持本方法");
            return null;
        }
        http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
        return android.webkit.CookieManager.getInstance();
    },
    /**
     * 启用http代理
     * 在脚本中引用该函数后,该函数位置后的所有http请求均会使用该http代理
     * 例如:
     *      http.get("http://www.baidu.com"); //不通过代理访问百度
     *      enableHttpProxy("192.168.1.12", 1080);
     *      http.get("http://www.baidu.com"); //通过192.168.1.12:1080访问百度
     * @param {string} ip 代理服务器的IP地址
     * @param {*} port 代理端口
     */
    enableHttpProxy : function(ip, port) {
        if (context.getPackageName() != "org.autojs.autojs") {
            toastLog("enableHttpProxy只能运行在免费版本的autojs,pro版不支持本方法");
            return null;
        }
        var n = java.net.Proxy, o = java.net.InetSocketAddress, p = new Packages.okhttp3.OkHttpClient.Builder().proxy(new n(n.Type.HTTP, new o(ip, port)));
        http.__okhttp__.muteClient(p);
    },
    /**
     * 打开指定应用的 允许修改系统设置 界面
     * @param {string} packageName 指定应用的包名
     */
    jumpSystemWriteSettings : function (packageName) {
        var intent = new Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS,
            Uri.parse("package:" + packageName));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        app.startActivity(intent);
    },

    /**
     * 返回文件夹(包含子文件夹)所有的文件路径.
     * @param {string} i 要获取的文件夹路径--绝对路径
     */
    getListFilePath : function(i) {
        function r(i) {
            var e = files.listDir(i);
            for (var s in e) {
                if ("/" == i.charAt(i.length - 1)) var a = i + e[s]; else var a = i + "/" + e[s];
                files.isDir(a) ? r(a) : t.push(a);
            }
        }
        var t = [];
        return r(i), t;
    },
    /**
     * 获取指定应用的版本号
     * @param {string} packageName 应用包名
     */
    getPackageVersion : function(packageName) {
        var pckMan = context.getPackageManager();
        try {
            var packageInfo = pckMan.getPackageInfo(packageName, 0);
        } catch (e) {
            return null;
        }
        return packageInfo.versionCode;
    },
    /**
     * 返回数字1或2 1为竖屏 2为横屏
     */
    getScreenDirection : function() {
        return context.getResources().getConfiguration().orientation;
    },
    /**
     * 检查指定APP是否拥有某个权限
     * @param {string} permission 权限名称
     * @param {string} packageName 指定的包名
     */
    checkPermission : function(packageName, permission) {
        var pkgManager = context.getPackageManager();
        return Permission = (pkgManager.PERMISSION_GRANTED == 
                            pkgManager.checkPermission(permission, packageName));
    },
    /**
     * 检查自身是否开启某权限
     * @param {string} permission 权限名称
     */
    checkSelfPermission : function(permission) {
        log(context.checkSelfPermission(permission));
        return context.checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED
    },
    /**
     * 设置http请求的超时时间
     * @param {int} time 超时时间
     */
    setHttpTimeout : function(time) {
        http.__okhttp__.setTimeout(time);
    },
    /**
     * 获取Md5值
     * @param {*} str 要加密的数据
     */
    getMd5 : function(data) {
        return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
               .digest(java.lang.String(data).getBytes())).toString(16);
    },
    /**
     * 测试与目标网络的ping值,返回最小值 最大值 平均值 平均偏差值
     * @param {string} target 目标网络的域名或者IP
     * @param {int} count  测试次数,次数越大,测试值越准确,但时间会越长
     */
    pingTest : function(target, count) {
        var res = shell("ping -c "+ count +" "+ target +" |grep 'rtt' |awk '{print $4}'").result;
            res = res.replace("\n", "");
        var resArry = res.split("/");
        return {
            min : resArry[0], //最小值
            max : resArry[2], //最大值 
            avg : resArry[1], //平均值
            mdev: resArry[3]  //抖动, 与平均值的偏差,值越大,说明网络越不稳定
        };
    },
    /**
     * 将等号字符串转换成json对象
     * @param {string} strDes 
     */
    parseStrObjByRegExp : function(strDes) {
        var obj = {};
        strDes.replace(/(\w+)(?:=([^;]*))?/g, function (str, key, value) {
            obj[key] = value;
        });
        return obj;
    },
    /**
     * 在手机qq中打开腾讯的网址
     * 只有qq.com域名下的url可以打开.其他域名的 无法打开,腾讯限制了.
     * @param {string} url url地址
     */
    openUrlByQQ : function(url) {
        var Base64 = new this.Base64();
        var URL_TO_BASE64 = Base64.encode(url);
        app.startActivity({
            data: "mqqapi://forward/url?plg_auth=1&url_prefix="+URL_TO_BASE64
        });
    },
    /**
     * base64字符串的编码与接码
     */
    Base64 : function() {
        this.encode = function(str) {
            return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(),2));
        }
        this.decode = function(str) {
            return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),2));
        }
    },
    /**
     * 获取指定app的UID
     * @param {string} packagename app的包名
     */
    getUid : function(packagename) {
        importPackage(android.content);
        var uid = "";
        var pm = context.getPackageManager();
        var ai = pm.getApplicationInfo(packagename, pm.GET_META_DATA);
        uid = ai.uid;
        return uid;
    },
    /**
     * 判断设备是否root
     */
    isRootAvailable : function() {
        runtime.loadJar("./lib/RootTools-3.4.jar");
        importPackage(com.stericson.RootTools);
        return RootTools.isRootAvailable();
    },
    /**
     * 判断是否安装busybox
     */
    isBusyboxAvailable : function() {
        runtime.loadJar("./lib/RootTools-3.4.jar");
        importPackage(com.stericson.RootTools);
        return RootTools.isBusyboxAvailable();
    },
    /**
     * zip压缩文件夹/单文件
     * 压缩后的zip文件存放在 文件/文件夹 的同级目录中
     * 压缩成功返回压缩文件的绝对路径,压缩失败返回 mull
     * @param {string} srcpath 被压缩的文件夹/文件 绝对路径
     */
    zip : function(srcpath){
        var f = new File(srcpath);
        if (!f.exists()) return null;
        var path = f.getPath();
        var parent = f.getParentFile();
        if (f.isDirectory()) {
            var zipName = path+".zip";
        }
        if (f.isFile()) {
            var zipName = parent+"/"+f.getName().split(".")[0]+".zip";
        }
        var zos = null ;
        try {
            var fos2 = new FileOutputStream(new File(zipName));
            zos = new ZipOutputStream(fos2);
            var sourceFile = new File(srcpath);
            compress(sourceFile,zos,sourceFile.getName(), true);
        } catch (e) {
            throw "zip error from ZipUtils: "+e
        }finally{
            if(zos != null){
                try {
                    zos.close();
                    return true;
                } catch (e) {
                    log(e);
                    return false;
                }
            }
        }

        function compress(sourceFile, zos, name, KeepDirStructure) {
            var buf = new util.java.array('byte', 4096);
            if(sourceFile.isFile()){
                zos.putNextEntry(new ZipEntry(name));
                var len;
                var ins = new FileInputStream(sourceFile);
                while ((len = ins.read(buf)) != -1){
                    zos.write(buf, 0, len);
                }
                zos.closeEntry();
                ins.close();
            } else {
                var listFiles = sourceFile.listFiles();
                if(listFiles == null || listFiles.length == 0){
                    if(KeepDirStructure){
                        zos.putNextEntry(new ZipEntry(name + "/"));
                        zos.closeEntry();
                    }
                }else {
                    for (var f in listFiles) {
                        var file = listFiles[f]
                        if (KeepDirStructure) {
                            compress(file, zos, name + "/" + file.getName(),KeepDirStructure);
                        } else {
                            compress(file, zos, file.getName(),KeepDirStructure);
                        }
                    }
                }
            }
        }//compress
    },//zip

    /**
     * 解压zip文件,可指定解压路径.若不指定,则解压到同级目录
     * @param {string} zippath zip文件绝对路径
     * @param {string} outzippath 指定解压目录
     */
    unzip : function(zippath, outzippath) {
        try {
            var file = new File(zippath);
            var outFile = null;
            var zipFile = new ZipFile(file);
            var zipInput = new ZipInputStream(new FileInputStream(file));
            var entry = null;
            var input = null;
            var output = null;
            while((entry = zipInput.getNextEntry()) != null){
                // log("解压缩 " + entry.getName() + " 文件");
                outFile = new File(outzippath + File.separator + entry.getName());
                if (entry.isDirectory()) {
                    outFile.mkdirs();
                    continue;
                }
                if(!outFile.getParentFile().exists()){
                    outFile.getParentFile().mkdirs();
                }
                if(!outFile.exists()){
                    files.createWithDirs(outFile);
                }
                input = zipFile.getInputStream(entry);
                output = new FileOutputStream(outFile);
                var temp = 0;
                while((temp = input.read()) != -1){
                    output.write(temp);
                }
                input.close();
                output.close();
            }
            return true;
        } catch (e) {
            log(e);
            return false;
        }
    }, //unzip
    /**
     * 创建一个byte类型的数组
     * @param {int} length 创建数组的长度
     */
    byte : function(length) {
        return new util.java.array("byte", length);
    },
    /**
     * 向通讯录添加联系人
     * @param {string} name         联系人姓名
     * @param {string} phoneNumber  手机号码
     */
    addContact : function(name, phoneNumber) {
        if (context.getPackageName() == "org.autojs.autojs") {
            toastLog("addContact只能运行在pro版本的autojs,免费版不支持本方法");
            return false;
        }
        try {
            var values = new ContentValues();
            var rawContactUri = context.getContentResolver().insert(ContactsContract.RawContacts.CONTENT_URI, values);
            var rawContactId = ContentUris.parseId(rawContactUri);
            values.clear();
            values.put(ContactsContract.Data.RAW_CONTACT_ID, new java.lang.Integer(rawContactId));
            values.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE);
            values.put(ContactsContract.CommonDataKinds.StructuredName.GIVEN_NAME, name);
            context.getContentResolver().insert(ContactsContract.Data.CONTENT_URI, values);
            values.clear();
    
            values.put(ContactsContract.Data.RAW_CONTACT_ID, new java.lang.Integer(rawContactId));
            values.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE);
            values.put(ContactsContract.CommonDataKinds.Phone.NUMBER, phoneNumber);
            values.put(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE);
            context.getContentResolver().insert(ContactsContract.Data.CONTENT_URI, values);
            values.clear();
    
            //以下为插入e-mail信息，不需要可以注释掉
        //    values.put(ContactsContract.Data.RAW_CONTACT_ID, rawContactId);
        //    values.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE);
        //    // 联系人的Email地址
        //    values.put(ContactsContract.CommonDataKinds.Email.DATA, "zhangphil@xxx.com");
        //    // 电子邮件的类型
        //    values.put(ContactsContract.CommonDataKinds.Email.TYPE, ContactsContract.CommonDataKinds.Email.TYPE_WORK);
        //    // 向联系人Email URI添加Email数据
        //    context.getContentResolver().insert(ContactsContract.Data.CONTENT_URI, values);
    
            toast("联系人数据添加成功");
            return true;
        } catch (e) {
            return false;
        }
    },
    /**
     * 读取手机联系人,返回全部联系人数组
     */
    readContact : function() {
        if (context.getPackageName() == "org.autojs.autojs") {
            toastLog("readContact只能运行在pro版本的autojs,免费版不支持本方法");
            return null;
        }
        var cursor = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
        var arr = [];
        while (cursor.moveToNext()) {
            //读取通讯录的姓名
            var name = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
            //读取通讯录的号码
            var number = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
            number = number.replace(/\s*/g,"");
            arr.push(name+"----"+number)
        }
        return arr;
    },
    /**
     * 清空全部联系人,删除所有的通讯录,执行前请务必备份.
     */
    clearContact : function() {
        if (context.getPackageName() == "org.autojs.autojs") {
            toastLog("clearContact只能运行在pro版本的autojs,免费版不支持本方法");
            return false;
        }
        var cursor = context.getContentResolver().query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);
        while(cursor.moveToNext()){	
            var rawId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
            var where = ContactsContract.Data._ID  + " =?";
            var whereparams = [rawId];
            context.getContentResolver().delete(ContactsContract.RawContacts.CONTENT_URI, where, whereparams);
        }
        return true;
    }
}