/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   运行勾选的脚本
 * 改编自:  软件自带示例->复杂界面->待办事项
 */
"ui";

importClass(android.graphics.Paint);
// layout_width="0dp" layout_weight="1"
ui.layout(
    <frame>
        <vertical>
          <horizontal>
            <frame  layout_weight="1">
            <appbar>
                <toolbar id="toolbar" title="脚本列表"
                bg="#00ff00"
                />
            </appbar>
            </frame>
            <button
              id='start'
              textSize='16sp'
              bg="#00ff00"
              layout_height='match_parent'
            >运行</button>
            <button
              id='stop'
              textSize='16sp'
              bg="#00ff00"
              layout_height='match_parent'
            >停止</button>
          </horizontal>
            <list id="todoList">
                <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                    cardElevation="1dp" foreground="?selectableItemBackground">
                    <horizontal gravity="center_vertical">
                        <View bg="{{this.color}}" h="*" w="10" />
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <text id="title" text="{{this.title}}" textColor="#222222" textSize="16sp" maxLines="1" />
                            <text text="{{this.summary}}" textColor="#999999" textSize="14sp" maxLines="1" />
                        </vertical>
                        <checkbox id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" />
                    </horizontal>

                </card>
            </list>
        </vertical>
    </frame>
);

var materialColors = ["#e91e63", "#ab47bc", "#5c6bc0", "#7e57c2", "##2196f3", "#00bcd4",
    "#26a69a", "#4caf50", "#8bc34a", "#ffeb3b", "#ffa726", "#78909c", "#8d6e63"];

var todoList = [
    {
        title: "script1",
        summary: "脚本备注1",
        color: "#f44336",
        done: false
    },
    {
      title: "script2",
      summary: "脚本备注2",
        color: "#ff5722",
        done: false
    },
    {
      title: "script3",
      summary: "脚本备注3",
        color: "#4caf50",
        done: false
    }
];

function 闪一下(view) {
  threads.start(
    function(){
      var borderColor = colors.toString(view.getBackground().getColor());
      log('borderColor=')
      log(borderColor)
      ui.run(
        function () {
          view.attr('bg',"#ff0000")
        }
      )
      sleep(300)
      ui.run(
        function () {
          view.attr('bg',borderColor)
        }
      )

    }
  )
}

var threadsArr=[]
ui.stop.on('click',()=>{
  闪一下(ui.stop)
  stopAll(threadsArr)
})
function stopAll(threadsArr){
  for(var i=0;i<threadsArr.length;i++){
    var thread=threadsArr[i]
    if(thread && thread.isAlive()){
      thread.interrupt()
    }
  }
}
function script1(){
  var threadId=threads.start(
    function(){
      while(1){
        toastLog('script1')
        sleep(1000)
      }

    }
  )
  threadsArr.push(threadId)
}
function script2(){
  var threadId=threads.start(
    function(){
      while(1){
        toastLog('script2')
        sleep(1300)
      }

    }
  )
  threadsArr.push(threadId)
}
function script3(){
  var threadId=threads.start(
    function(){
      while(1){
        toastLog('script3')
        sleep(1600)
      }

    }
  )
  threadsArr.push(threadId)
}

function 获取所有选中脚本的标题(){
  var todoList=ui.todoList
  log('todoList childCount')
  log(todoList.getChildCount())
  var titles=[]
  for(var i=0;i<todoList.getChildCount();i++){
    var itemView=todoList.getChildAt(i)
    var title=itemView.title.getText().toString()
    if(itemView.done.isChecked()){
      log(title+'是选中状态')
      titles.push(title)
    }else{
      log(title+'是未选中状态')
    }
  }
  // log(titles)
  // exit()
  return titles
}
function 执行所有选中的脚本(){
  var 所有选中脚本的标题=获取所有选中脚本的标题()
  for(var i=0;i<所有选中脚本的标题.length;i++){
    var 标题=所有选中脚本的标题[i]
    eval(标题+'()')
  }
}
ui.start.on('click',()=>{
  闪一下(ui.start)
  执行所有选中的脚本()
})
ui.todoList.setDataSource(todoList);
var checkedColor='#FF69B4'
ui.todoList.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    itemView.done.on("check", function (checked) {
        let item = itemHolder.item;
        item.done = checked;
        let paint = itemView.title.paint;
        //设置或取消中划线效果
        if (checked) {
          paint.flags &= ~Paint.STRIKE_THRU_TEXT_FLAG;
          itemView.attr('bg',checkedColor)
        } else {
          paint.flags |= Paint.STRIKE_THRU_TEXT_FLAG;
          itemView.attr('bg','#ffffff')
        }
        itemView.title.invalidate();
    });
});

ui.todoList.on("item_click", function (item, i, itemView, listView) {
    itemView.done.checked = !itemView.done.checked;
});



