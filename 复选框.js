"ui";
ui.layout(
  <horizontal>
  <checkbox id="cb1" text="选了" checked="true"/>
  <checkbox id="cb2" text="没选" checked="false"/>
  </horizontal>
)
setInterval(
  fn,200
)

function fn(){
  if(ui.cb1.isChecked()){
    ui.cb1.setText("选了")
  }else{
    ui.cb1.setText("没选")
  }
  if(ui.cb2.isChecked()){
    ui.cb2.setText("选了")
  }else{
    ui.cb2.setText("没选")
  }
}
