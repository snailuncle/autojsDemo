function get_track_list(albumId) {
  var url = 'https://www.ximalaya.com/revision/play/album?albumId=' + albumId + '&pageNum=1&sort=1&pageSize=30'
  var r = http.get(url, {
    headers: {
      'Accept-Language': 'zh-cn,zh;q=0.5',
      'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
    }
  });
  var result = r.body.json()
  var trackList = []
  if (result['ret'] == 200) {
    var tracks = result['data']['tracksAudioPlay']
    for (var track of tracks) {
      trackList.push({
        'trackId': track['trackId'],
        'title': track['trackName'],
        'src': track['src']
      })
    }
  }
  return trackList
}

function save_track(track) {
  var track_src = track['src']
  var track_download_url = track_src
  var r = http.get(track_download_url, {
    headers: {
      'Accept-Language': 'zh-cn,zh;q=0.5',
      'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
    }
  });
  var folder = '/sdcard/1ximalaya/'
  files.ensureDir(folder)
  var file_name = folder + track['title'] + '.' + files.getExtension(track_download_url)
  file_name = stripscript(file_name)
  files.writeBytes(file_name, r.body.bytes())
  print("<<" + track['title'] + '>>写入完毕')
}

function stripscript(s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>?~！@#￥……&*（）——|{}【】‘；：”“'。，、、？！   ]")
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

// 作者:  家
// QQ:    203118908
// 更新日期: 20190117
// 19736453  快听短资讯
// 4308484 陆家嘴财经早餐
// 9723091 郭德纲21年相声精选
// 电脑上打开喜马拉雅专辑网址是这样的
// 比如郭德纲21年相声精选
// https://www.ximalaya.com/xiangsheng/9723091/
// albumId是9723091
var albumId = '19736453'
var track_list = get_track_list(albumId)
for (let i = 0; i < track_list.length; i++) {
  save_track(track_list[i])
}
