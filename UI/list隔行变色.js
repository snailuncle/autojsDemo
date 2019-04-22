/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  list隔行变色
 * 感谢:  沐泠,隔行变色,给list添加一个bg属性,判断奇偶就可以了
 */
'ui';
ui.layout(
  <vertical id='脚本列表页'>
    <scroll>
      <list id='todoList'>
      <frame id='parent' bg='{{this.bg}}' >
        <text textSize='30sp'  text='{{this.content}}'></text>
      </frame>
      </list>
    </scroll>
  </vertical>
)
var todoList = [{
    content: '111111'
  },
  {
    content: '222222'
  },
  {
    content: '33333333'
  },
  {
    content: '444444444'
  },
  {
    content: '555555'
  }
]
for(var i=0;i<todoList.length;i++){
  if(i % 2 == 0){
    todoList[i].bg='#ffff00'
  }else{
    todoList[i].bg='#ff0000'

  }
}
ui.todoList.setDataSource(todoList);
