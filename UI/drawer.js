"ui";
importClass("androidx.drawerlayout.widget.DrawerLayout")
importClass(android.view.WindowManager);
importClass(android.view.View);
importClass(android.graphics.Color)
importClass(android.app.AlertDialog)
importClass(java.io.FileOutputStream);
importClass(java.io.File);

var window = activity.getWindow();
var decorView = window.getDecorView();
var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
			 | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
decorView.setSystemUiVisibility(option);
decorView.getChildAt(0).getChildAt(1).getLayoutParams().height=device.height
//fd.setLayoutParams(lp)
window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
window.setStatusBarColor(Color.TRANSPARENT);

var MyColor="#FF7065BE"
ui.layout(
   <drawer id="drawer">
    <vertical h="*">
       <appbar fitsSystemWindows="true">
          <toolbar bg="{{MyColor}}" id="toolbar" title="日志" paddingTop="24dp" h="auto" >
             <button id="tolog" layout_gravity="right" textColor="#ffffff" text="全部日志" style="Widget.AppCompat.Button.Borderless.Colored" w="auto"/>
          </toolbar>
       </appbar>
       <scroll layout_gravity="center">
          <vertical id="loglist"/>
       </scroll>
    </vertical>
    <vertical layout_gravity="left" bg="#f8f8f8" w="280">
        <linear bg="#000000" w="280" h="168" elevation="5dp" scaleType="centerCrop" src="file://res/wall.jpg"/>
        <scroll>
           <vertical id="applist">
              <card id="add" w="*" h="35" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center" foreground="?selectableItemBackground">
                 <img w="28" h="28" src="@drawable/ic_add_circle_outline_black_48dp" tint="#FF03A9F5"/>
              </card>
           </vertical>
        </scroll>
    </vertical>
    </drawer>
);

ui.drawer.setDrawerElevation(5)
ui.drawer.setScrimColor(Color.parseColor("#55000000"));
ui.drawer.setDrawerListener(new DrawerLayout.DrawerListener({
  onDrawerSlide:
       function(drawerView,offset){
           drawerView.scrollTo(((offset-1)*drawerView.getMeasuredWidth()/2),0);
           ui.drawer.getChildAt(0).setTranslationX(drawerView.getWidth()*offset);
       }

}));
