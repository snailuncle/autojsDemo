'ui';
var entries = "3G|VPN|不换ip"
ui.layout(
  <vertical>
    <spinner id="wangluo1" entries="{{entries}}" />
  </vertical>
)
var view = ui.wangluo1
var fn = function () {
  var r = view.getSelectedItem()
  log(r)
}
setInterval(
  fn, 500
)
setTimeout(
  function () {
    r = view.setSelection(2, true);
    log(r)
  }, 2000
)
