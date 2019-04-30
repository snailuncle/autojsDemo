'ui';
ui.layout(
  <vertical>
    <list id='jsFiles'>
      <text id='fileName' text='{{this.fileName}}' margin='22 22' bg='#eeeeee' ></text>
    </list>
  </vertical>
)
var jsFiles = getJsFile()
var jsFileObjs = []
jsFiles.map(
  (fileName) => {
    jsFileObjs.push({
      fileName: fileName
    })
  }
)
var listView = ui.jsFiles
listView.setDataSource(jsFileObjs)
listView.on("item_click", function (item, i, itemView, listView) {
  var info = itemView.fileName.text()
  toastLog(info)
});

function getJsFile() {
  var dir = "/sdcard/脚本/";
  var jsFiles = files.listDir(dir, function (name) {
    return name.endsWith(".js") && files.isFile(files.join(dir, name));
  });
  return jsFiles
}
