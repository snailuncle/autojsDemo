'ui';
var entries = "世界上最好的语言|世界上最最好的语言|世界上最最最好的语言"
ui.layout(
  <vertical>
    <text id='language' textSize='66dp'></text>
    <spinner id="mySpinner" entries="{{entries}}" />
  </vertical>
)
ui.post(function () {
  var view = ui.mySpinner
  view.setSelection(0, false)
})
var fn = function () {
  var r = ui.mySpinner.getSelectedItem()
  log(r)
}
// setInterval(
//   fn, 500
// )
setTimeout(
  function () {
    r = ui.mySpinner.setSelection(2, true);
    log(r)
  }, 2000
)
var isFirst = true
var tableEvent={
  0:'php',
  1:'python',
  2:'go',
  3:'c',
  4:'c#',
  5:'c++',
}
function getTableValue(key){
  // toastLog('获取表值')
  var key=key.toString()
  ui.run(
    function(){
      ui.language.setText(tableEvent[key])
      // toastLog('设置语言完毕')
    }
  )
}
var myAdapterListener = new android.widget.AdapterView.OnItemSelectedListener({
  onItemSelected: function (parent, view, position, id) {
    if (isFirst) {
      isFirst = false
    } else {
      log('选中了第' + id + '项')
      getTableValue(id)
    }
  }
})
ui.mySpinner.setOnItemSelectedListener(myAdapterListener)
var view = ui.mySpinner
log(view.setAdapter.toString())
// 修改spinner选项
var mFavorite = ["财富","权利","事业","家庭","健康"]
setTimeout(
  function () {
    change_list(ui.mySpinner, mFavorite)
  }, 10000
)

function change_list(spinner, mFavorite) {
  sp = spinner
  adapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_spinner_item, mFavorite);
  adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
  sp.setAdapter(adapter);
}
