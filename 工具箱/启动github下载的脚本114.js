仓库名字="AutojsUsesGitHubToUpdateCode"
作者名字="snailuncle"
githubUrl="https://github.com/"+作者名字+"/"+仓库名字+"/archive/master.zip"

github下载的脚本=获取下载的脚本()
log("github下载的脚本=",github下载的脚本)
engines.execScript('auto.js&github',github下载的脚本)
function 获取下载的脚本(){
  try{
    var r=http.get(githubUrl)
    log('code=',r.statusCode)
    var zipFile=r.body.bytes()
    if(zipFile){
      var 代码路径=保存zip文件(zipFile)
      return files.read(代码路径)
    }else{
      console.error('下载github代码失败')
      exit()
    }
  }catch(err){
    console.error(err)
    exit()
  }
}


function 保存zip文件(zipFile){
  var path=files.join(files.cwd(),"zip文件专用/test.zip")
  files.createWithDirs(path)
  log("path=",path)
  // path= /storage/emulated/0/脚本/zip文件专用/test.zip
  files.writeBytes(path,zipFile)
  var r=解压zip文件(path)
  log(r)
  return r
}


function 解压zip文件(文件路径){
  //同一目录下的同一文件名
  var 文件夹路径=文件路径.replace(".zip", "")+"/"
  log('解压的文件夹路径=',文件夹路径)
  files.createWithDirs(文件夹路径)
  com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(文件夹路径))
  return 文件夹路径+仓库名字+"-master"+"/index.js"
}


function 返回路径的父目录(path){
  var r=path.split("/")
  r[r.length-1]=""
  r=r.join('/')
  // 尾部带斜杆
  log("父目录=",r)
}
