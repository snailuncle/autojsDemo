/*
 * @Author: NickHopps
 * @Last Modified by: QQ203118908
 * @Last Modified time: 2019-03-16 14:25:00
 * @Description: 文件更新（下载进度条显示）
 */

importClass(java.io.File);
importClass(java.io.IOException);
importClass(java.io.InputStream);
importClass(java.io.FileOutputStream);
importClass(java.security.MessageDigest);

/**
 * 向服务器查询可更新的文件列表
 *
 * @param {*} server 提供更新文件的服务器地址
 * @param {*} path 本地需要更新文件的目录路径
 */
function GetUpdateList(server, path) {
  const _server = server,
        _path = path,
        _processor = "generate_update_list.php";

  let _ignore_list = [];

  const _generate_md5 = function(file) {
    let md5 = MessageDigest.getInstance("MD5");
    let hex = [];
    md5.update(file);
    md5.digest().forEach((byte) => {
      let temp = (0xFF & byte).toString(16);
      while (temp.length < 2) temp = "0" + temp;
      hex.push(temp);
    });
    return hex.join("");
  };

  const _generate_postdata = function func(path, data) {
    data = data || {};
    files.listDir(path).forEach(function(file_name) {
      let new_path = files.join(path, file_name);
      if (_ignore_list.indexOf(file_name) < 0) {
        if (!files.isDir(new_path)) {
          let file = files.readBytes(new_path);
          data[file_name] = _generate_md5(file);
        } else {
          func(new_path, data);
        }
      }
    });
    return data;
  };

  return {
    get ignore_list() {
      return _ignore_list;
    },
    set ignore_list(arr) {
      _ignore_list = arr;
    },
    get_updateList: function() {
      const postdata = _generate_postdata(_path);
      if (Object.keys(postdata).length > 0) {
        let url = files.join(_server, _processor);
        let res = http.postJson(url, postdata);
        if (res.statusCode != 200) {
          toastLog("请求失败: " + res.statusCode + " " + res.statusMessage);
        } else {
          return res.body.json();
        }
      } else {
        toastLog("无法获取本地文件信息");
      }
    }
  }
}

/**
 * 下载器，可监听下载进度
 *
 * @param {*} url 下载链接
 * @param {*} path 保存地址
 * @param {*} listener 下载监听
 */
function DownloadUtil(url, path, listener) {
  const _path = path,
        _listener = listener,
        _client = new OkHttpClient(),
        _request = new Request.Builder().url(url).get().build();

  let _sum = 0;
      _len = -1;
      _file = new File(_path),
      _total_bytes = null,
      _input_stream = null,
      _file_output_stream = new FileOutputStream(_file),
      _buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 2048);

  return {
    download: function() {
      _client.newCall(_request).enqueue(new Callback({
        onFailure: function(call, err) {
          throw new Error(err);
        },
        onResponse: function(call, res) {
          try {
            _input_stream = res.body().byteStream();
            _total_bytes = res.body().contentLength();
            while ((_len = _input_stream.read(_buffer)) != -1) {
              _file_output_stream.write(_buffer, 0, _len);
              _listener.onDownloading((_sum += _len) / _total_bytes * 100);
            }
            _file_output_stream.flush();
            _listener.onDownloadSuccess(_file);
          } catch (err) {
            _listener.onDownloadFailed(err);
          } finally {
            try {
              if (_input_stream != null)
              _input_stream.close();
            } catch (err) {
              throw new Error(err);
            }
          }
        }
      }));
    }
  }
}

(function main() {
  let update_list = {};
  let get_update_list = new GetUpdateList("服务器地址", "本地查询更新的文件");
  get_update_list.ignore_list = [".", "..", ".git"]; // 忽略的目录
  update_list = get_update_list.get_updateList(); // 获取可更新文件

  if (Object.keys(update_list).length) {
    let downloadDialog = null;
    let url = "服务器文件地址"; // update_list.url
    let path = "本地保存地址"; // /sdcard/xxx
    dialogs.build({
      title: "发现新版本",
      content: "下载框中显示的文本内容",
      positive: "更新",
      negative: "取消",
      neutral: "到浏览器下载",
    }).on("positive", () => {
      downloadDialog = dialogs.build({
        title: "更新中...",
        negative: "取消",
        progress: {
          max: 100,
          showMinMax: true
        },
        autoDismiss: false
      }).on("negative", () => {
        downloadDialog.dismiss();
        downloadDialog = null;
      }).show();

      new DownloadUtil(url, path, {
        onDownloadSuccess: function(file) {
          downloadDialog.dismiss();
          downloadDialog = null;
          toastLog("更新完成");
        },
        onDownloading: function(progress) {
          downloadDialog.setProgress(progress);
        },
        onDownloadFailed: function(err) {
          throw new Error(err);
        }
      }).download();
    }).on("neutral", () => {
      app.openUrl("https://www.bing.com");
    }).show();
  } else {
    toastLog("当前已经是最新版本了");
  }
})();
