/**
 * 感谢 笔青居大佬的指点
 * 功能 悬浮窗按钮动态添加
 * 作者 家
 * QQ   203118908
 * */
console.show()
var w = floaty.rawWindow(
  <frame gravity="center" bg="#44ffcc00">
  <button id='but' w='200px' h='200px' text='开始'>
  </button>
  <list id='list'>
    <vertical>
    <button id='but1' w='200px' h='200px' text="姓名{{name}}">
    </button>
    <button id='but2' w='200px' h='200px' text="年龄{{age}}">
    </button>
    </vertical>
  </list>
  </frame>
);
var flag = true;
var items = [{
  name: '鸣人',
  age: '18'
}]
w.but.click(
  function () {
    log('点了')
    if (flag) {
      log('flag真')
      ui.run(function () {
        //拷贝一份
        var newItems = items.slice(0);
        newItems.push({
          'name': '鸣人分身',
          'age': '81'
        })
        w.list.setDataSource(newItems);
        //备份一份
        items = newItems;
        newItems = null
        flag = false
      });
    } else {
      log('flag假')
      ui.run(function () {
        //拷贝一份
        var newItems = items.slice(0);
        log('newItems')
        log(newItems)
        newItems.splice(-1, 1)
        log(newItems)
        w.list.setDataSource(newItems);
        //备份一份
        items = newItems;
        newItems = null
        flag = true
      });
    }
  }
)
w.setSize(-1, -1);
w.setTouchable(true);
w.list.setDataSource(items)
setTimeout(() => {
  w.close();
}, 10000);
