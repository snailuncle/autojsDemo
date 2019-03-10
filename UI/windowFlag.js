"ui";
ui.layout(
  <vertical>
    <button margin = "66" id="but" >点 我</button>
  </vertical>
)
ui.but.click(function(){toast('我被点了')})

activity.getWindow().setFlags(-1, -1) //变黑

// activity.getWindow().setFlags(16, 16) //无法获取焦点

// activity.getWindow().setFlags(1024, 1024) //隐藏所有的装饰物(比如状态栏)

// activity.getWindow().setFlags(8192, 8192) //不允许截屏

// activity.getWindow().setFlags(524288, 524288) //强制锁屏显示本界面
