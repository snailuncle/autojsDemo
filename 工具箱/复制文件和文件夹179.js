function copy(fromPath, toPath) {
    /*格式:H.copy(原文件路径,要复制到的路径);*/
    /*解释:复制文件或文件夹 返回是否复制成功*/
    var rp = /^([/][^\/:*?<>|]+[/]?)+$/;
    var rp1 = /^([/][^\/:*?<>|]+)+$/;
    var rp2 = /^([/][^\/:*?<>|]+)+[/]$/;
    try {
        if (rp.test(fromPath) == false || files.exists(fromPath) == false) throw "非法原文件地址,H.copy(?,);" + fromPath;
        if (rp.test(toPath) == false) throw "非法要复制到的路径地,H.copy(,?);" + toPath;
        if (rp1.test(fromPath) == true && rp1.test(toPath) == false) throw "非法要复制到的地址,H.copy(,?);" + toPath;
        if (rp2.test(fromPath) == true && rp2.test(toPath) == false) throw "非法要复制到的地址,H.copy(,?);" + toPath;
    } catch (err) {
        log(err);
        exit();
    }
    if (rp1.test(fromPath) == true) {
        /*复制文件*/
        return files.copy(fromPath, toPath);
    } else if (rp2.test(fromPath)) {
        /*复制文件夹*/
        /*获取原文件路径文件和文件夹*/
        var arr = getFilesFromPath(fromPath);
        /*遍历文件路径数组*/
        for (var i = 0; i < arr.length; i++) {
            /*原文件路径替换成目的路径*/
            var path = arr[i].replace(fromPath, toPath);
            /*判断路径类型*/
            if (files.isDir(arr[i])) {
                /*创建目的文件夹*/
                files.createWithDirs(path + "/");
            } else if (files.isFile(arr[i])) {
                /*复制文件到目的文件路径*/
                files.copy(arr[i], path);
            }
        }
        /*获取目的路径文件和文件夹*/
        var arrToPath = getFilesFromPath(toPath);
        /*通过对比原文件和目的文件数量来返回是否复制成功*/
        if (arr.length == arrToPath.length) {
            return true;
        } else {
            return false;
        }
    }
}

function getFilesFromPath(path) {
    /*格式:H.getFilesFromPath(文件夹路径)*/
    /*解释:获取指定路径所有文件和文件夹 递归遍历 返回文件路径数组*/
    var arrDir = new Array();
    var arrFile = new Array();
    try {
        var rp = /^([/][^\/:*?<>|]+[/]?)+$/;
        if (rp.test(path) == false) throw "非法文件路径,H.getFilesFromPath(?);" + path;
    } catch (err) {
        log(err);
        exit();
    }
    /*获取path目录下所有文件夹和文件*/
    var arr = files.listDir(path);
    /*遍历文件和文件夹*/
    for (var i = 0; i < arr.length; i++) {
        /*连接路径*/
        newPath = files.join(path, arr[i]);
        /*判断路径类型*/
        if (files.isDir(newPath)) {
            arrDir.push(newPath);
            /*递归遍历文件夹*/
            var arrF = getFilesFromPath(newPath);
            arrDir = arrDir.concat(arrF);
        } else if (files.isFile(newPath)) {
            /*过滤隐藏文件*/
            if (arr[i].slice(0, 1) != ".") {
                arrFile.push(newPath);
            }
        }
    }
    /*按字母升序排序数组*/
    arrDir.sort();
    arrFile.sort();
    /*连接数组并返回*/
    return arrDir.concat(arrFile);
}