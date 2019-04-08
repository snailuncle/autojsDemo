/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  单选按钮demo
 */
'ui';
ui.layout(
  <horizontal padding="10" bg='#00ff00'>
    <radiogroup id='fbName'>
      <radio text='选项1'></radio>
      <radio text='选项2'></radio>
      <radio text='选项3'></radio>
      <radio text='选项4'></radio>
      <radio text='选项5'></radio>
    </radiogroup>
</horizontal>
)

单选按钮集合=[]
ui.post(
  function(){
    var count=ui.fbName.getChildCount()
    for(var i=0;i<count;i++){
      var view=ui.fbName.getChildAt(i)
      var id=view.id
      var content=view.getText().toString()
      单选按钮集合.push({
        num:i,
        id:id,
        content:content,
      })
    }
    log(单选按钮集合)
  }
)


function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  log( attrs)
}

ui.fbName.setOnCheckedChangeListener(
  function (radioGroup,id){
    var myIdStartFrom0=id-单选按钮集合[0].id
    var content=radioGroup.getChildAt(myIdStartFrom0).getText().toString()
    var msg=util.format('序号=%s, 内容=%s', myIdStartFrom0, content)
    toastLog(msg)
  }
)
