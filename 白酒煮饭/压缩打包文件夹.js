importClass(java.io.File);
importClass(android.net.Uri);
importClass(java.lang.System);
importClass(java.io.FileInputStream);
importClass(java.io.FileOutputStream);
importClass(java.io.OutputStream);
importClass(java.util.zip.ZipEntry);
importClass(java.util.zip.ZipOutputStream);

var srcPath = "/sdcard/000/语音包/";
var zipFilePath = "/sdcard/语音包.zip"

dirToZip(srcPath, zipFilePath);

/**
 * 将一个文件夹压缩成zip包 
 * @param {string} srcDir 要压缩的文件夹(绝对路径)
 * @param {string} out 压缩后输出的zip文件(绝对路径)
 */
function dirToZip(srcDir, out) {
    var zipPath = new FileOutputStream(new File(out));
    var path = new File(srcDir);
    var srcDirParent = path.getParent();
    var start = System.currentTimeMillis();
    var zos = null ;
    try {
        zos = new ZipOutputStream(zipPath);
        var sourceFile = new File(srcDir);
        compress(sourceFile, zos, sourceFile.getName());
        var end = System.currentTimeMillis();
        log("压缩完成，耗时：" + (end - start) +" ms");
    } catch (e) {
        throw ("zip error from ZipUtils"+e);
    } finally {
        if(zos != null){
            try {
                zos.close();
            } catch (e) {
                log(e);
            }
        }
    }
    function compress(sourceFile, zos, name) {
        if(files.isFile(sourceFile)){
            zos.putNextEntry(new ZipEntry(name));
            var len;
            var put = new FileInputStream(sourceFile);
            while ((len = put.read()) != -1){
                zos.write(len);
            }
            zos.closeEntry();
            put.close();
        } else {
            var listFiles = getListFilePath(sourceFile);
            for (let i in listFiles) {
                var fileName = new File(listFiles[i]);
                compress(listFiles[i], zos, fileName.getParent().split(srcDirParent)[1] + "/" + fileName.getName());
            }
        }
    }
    function getListFilePath(i) {
        i = i.toString();
        function r(i) {
            var e = files.listDir(i);
            for (var s in e) {
                if ("/" == i.charAt(i.length - 1)) var a = i + e[s]; else var a = i + "/" + e[s];
                files.isDir(a) ? r(a) : t.push(a);
            }
        }
        var t = [];
        return r(i), t;
    }
}