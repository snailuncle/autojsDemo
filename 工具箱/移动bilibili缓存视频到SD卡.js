var bilibiliCacheVideoPath = files.join(files.getSdcardPath(), 'Android/data/tv.danmaku.bili/download/38379328')
r = files.exists(bilibiliCacheVideoPath)
log(r)
var arr = files.listDir(bilibiliCacheVideoPath);
log(arr);
arr.map(
  (parentPathName) => {
    var videoInfo = extractVideoInfo(parentPathName)
    moveVideoFile(videoInfo)
  }
)

function moveVideoFile(videoInfo) {
  files.move(videoInfo.path, videoInfo.targetPath)
}

function extractVideoInfo(parentPathName) {
  var videoTitle = extractTitle(parentPathName) + parentPathName
  var viedeFilePath = extractVideoPath(parentPathName)
  var videoInfo = {
    title: videoTitle,
    path: viedeFilePath
  }
  var bilibiliVideoSDPath = files.join(files.getSdcardPath(), 'bilibiliVideo')
  log(bilibiliVideoSDPath)
  files.ensureDir(bilibiliVideoSDPath + '/')
  videoInfo.targetPath = files.join(bilibiliVideoSDPath, videoInfo.title + '.blv')
  return videoInfo
}

function extractTitle(parentPathName) {
  var OneVideoPath = files.join(bilibiliCacheVideoPath, parentPathName)
  var viedeInfoPath = files.join(OneVideoPath, 'entry.json')
  var videoInfo = files.read(viedeInfoPath)
  var videoTitle = JSON.parse(videoInfo).title
  log(videoTitle)
  videoTitle=videoTitle.replace(/\s+/g,'')
  return videoTitle
}

function extractVideoPath(parentPathName) {
  var OneVideoPath = files.join(bilibiliCacheVideoPath, parentPathName)
  var viedeFilePath = files.join(OneVideoPath, 'lua.flv360.bili2api.16', '0.blv')
  log(viedeFilePath)
  return viedeFilePath
}
