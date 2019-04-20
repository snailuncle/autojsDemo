/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  list隔行变色
 */
'ui';
ui.layout(
  <vertical id='脚本列表页'>
    <scroll>
      <list id='todoList'>
      <frame id='parent'>
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
  },
]
ui.todoList.setDataSource(todoList);
var myCount = function () {
  var count = 0;
  return function () {
    return count++;
  }
}()
ui.todoList.on("item_bind", function (itemView, itemHolder) {
  var currentCount = myCount()
  if (currentCount % 2 == 0) {
    itemView.attr('bg', '#ff0000')
  } else {
    itemView.attr('bg', '#ffff00')
  }
});
