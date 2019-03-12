path="/data/data/com.aaa.bbb"
pathSD="/sdcard/com.aaa.bbb"
//删除原来的文件
shell('chown root:root '+path,true)
shell('rm '+path+" -rf",true);
shell('rm '+pathSD+" -rf",true);
sleep(2000)

// 解压备份的文件
inkeSdacrdPath="/sdcard/com.aaa.bbb.zip"
文件路径=inkeSdacrdPath
文件夹路径="/sdcard"
com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(文件夹路径))
sleep(2000)

//移动解压后的文件
shell("mv -f /sdcard/com.aaa.bbb /data/data/com.aaa.bbb",true);

//修改权限
shell("chmod -R 777 /data/data/com.aaa.bbb",true);

