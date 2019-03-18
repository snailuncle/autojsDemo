 /**
 * 作者：唯一
 * 功能：一个无聊的悬浮窗仿抽屉栏菜单效果，仅实现点击显示和隐藏的效果，不能拖动隐藏，如果想要自己可以监听OnTouchListener，懒得写了。
 * 备注：估计也没什么用处。看看就好。
 */



var w = floaty.rawWindow(
  <frame bg="#FFFFFF" w="240" h="320">
      <vertical>
          <button id="show" text="显示" w="*" h="50" />
          <button id="stop" text="停止" w="*" h="50" />
      </vertical>
      <frame id="drawer" w="*" h="*" bg="#90222222">
          <vertical id="child" layout_gravity="left" bg="#ffffff" w="160">
              <img w="*" h="120" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
              <list id="menu">
                  <horizontal bg="?selectableItemBackground" w="*">
                      <img w="50" h="50" padding="16" src="{{this.icon}}" />
                      <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                  </horizontal>
              </list>
          </vertical>
      </frame>
  </frame>
);


w.setPosition(100, 100);
setTimeout(() => {
  ui.post(function() {
      w.menu.setDataSource([{
              title: "选项一",
              icon: "@drawable/ic_android_black_48dp"
          },
          {
              title: "选项二",
              icon: "@drawable/ic_settings_black_48dp"
          },
          {
              title: "选项三",
              icon: "@drawable/ic_favorite_black_48dp"
          },
          {
              title: "退出",
              icon: "@drawable/ic_exit_to_app_black_48dp"
          }
      ])
  });

}, 100);

function demo(view,parentLayout){
  var timer = null;
  var width = view.getMeasuredWidth();
  //demo行为：false 隐藏，true 显示
  var isShow = false;
  //margin目标
  var target = 0;
  //缓冲动画速度
  var speed = 0;

  //父布局背景透明度
  var alpha = 0;

  if(parentLayout.visibility == 8){
      parentLayout.setBackgroundColor(android.graphics.Color.argb(0,22,22,22));
      parentLayout.visibility = 0;
      isShow = true;
      target = 0;
      alpha = 0;
  } else {
      isShow = false;
      target = -width;
      alpha = 144;
  }


  if(timer){
      clearInterval(timer);
  }

  timer = setInterval(function(){
      // speed = (target - view.x)/number; 这里的number越小，demo的速度越快
      speed = (target - view.x)/2;
      //if(isShow){ //另一种判断方式
      if(target > view.x){
          //显示demo
          speed = Math.ceil(speed);
          alpha += 12;
      } else {
          //隐藏demo
          speed = Math.floor(speed);
          alpha -= 12;
      }

      if(alpha<=255 && alpha >=0){
          parentLayout.setBackgroundColor(android.graphics.Color.argb(alpha,22,22,22));
      }

      if(view.x == target){
          if(isShow){
              parentLayout.setBackgroundColor(android.graphics.Color.argb(144,22,22,22));
          } else {
              parentLayout.setBackgroundColor(android.graphics.Color.argb(0,22,22,22));
              parentLayout.visibility = 8;
          }
          clearInterval(timer);
      } else {
          setMarginX(view,view.x + speed);
      }

      //设置父布局背景透明度

  },50);
  return timer;
}

function setMarginX(view, left) {
  var margin = new android.view.ViewGroup.MarginLayoutParams(view.getLayoutParams());
  //setMargins(left,top,right,bottom);
  margin.setMargins(left, margin.topMargin, left + margin.width, margin.bottomMargin);
  //这里需要知道父布局方式，如果是LinearLayout就使用android.widget.LinearLayout.LayoutParams(margin)
  //相应的布局方式需要使用相应的LayoutParams，不然会报错或崩溃
  var layoutParams = new android.widget.FrameLayout.LayoutParams(margin);
  view.setLayoutParams(layoutParams);
}

var time = null;

w.drawer.click(function() {
  if(time){
      clearInterval(time);
  }
  time =  demo(w.child,w.drawer);
})

w.menu.on("item_click", item => {
  switch(item.title){
      case "退出":
          w.close();
          exit();
          break;
  }
})

w.show.click(function() {
  if(time){
      clearInterval(time);
  }
  time =  demo(w.child,w.drawer);
})

w.stop.click(function() {
  clearInterval(time);
})

setInterval(() => {}, 1000);
