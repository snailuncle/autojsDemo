
'ui';
var entries = "3G|VPN|不换ip"
ui.layout(
  <vertical>
    <spinner id="mySpinner" entries="{{entries}}" />
  </vertical>
)
ui.post(function(){
  var view = ui.mySpinner
  view.setSelection(0, false)
})
var fn = function () {
  var r = ui.mySpinner.getSelectedItem()
  log(r)
}
setInterval(
  fn, 500
)
setTimeout(
  function () {
    r = ui.mySpinner.setSelection(2, true);
    log(r)
  }, 2000
)
var isFirst=true
var myAdapterListener=new android.widget.AdapterView.OnItemSelectedListener({
  onItemSelected:function(parent,view,position,id){
    if(isFirst){
      isFirst=false
    }else{
      log('选中了第'+id+'项')
    }
  }
})
ui.mySpinner.setOnItemSelectedListener(myAdapterListener)
