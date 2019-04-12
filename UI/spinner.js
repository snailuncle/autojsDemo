'ui';
var entries = "3G|VPN|不换ip"
ui.layout(
  <vertical>
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
var myAdapterListener = new android.widget.AdapterView.OnItemSelectedListener({
  onItemSelected: function (parent, view, position, id) {
    if (isFirst) {
      isFirst = false
    } else {
      log('选中了第' + id + '项')
    }
  }
})
ui.mySpinner.setOnItemSelectedListener(myAdapterListener)
var view = ui.mySpinner
log(view.setAdapter.toString())
// 修改spinner选项
var mCountries = ["中国", "美国", "日本", "俄罗斯", "加拿大"]
setTimeout(
  function () {
    change_list(ui.mySpinner, mCountries)
  }, 3000
)

function change_list(spinner, mCountries) {
  sp = spinner
  adapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_spinner_item, mCountries);
  adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
  sp.setAdapter(adapter);
}
