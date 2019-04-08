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

ui.post(
  function(){
    var count=ui.fbName.getChildCount()
    for(var i=0;i<count;i++){
      var view=ui.fbName.getChildAt(i)
      view.setId(i)
    }
  }
)

ui.fbName.setOnCheckedChangeListener(
  function (radioGroup,id){
    var count=radioGroup.getChildCount()
    var id=id % count -1
    if(id==-1){
      id=count-1
    }
    id=radioGroup.getCheckedRadioButtonId()
    content=radioGroup.getChildAt(id).getText()
    var msg=util.format('id=%s, content=%s', id, content)
    toastLog(msg)
  }
)
