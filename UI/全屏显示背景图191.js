"ui";

var url="http://smimg5.mingxing.com.cpgzh.com/upload/pic/smpic/20160913/20160913170456_89448.jpg";
//引用安卓类
importClass(android.view.WindowManager);
//全屏显示
activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
ui.layout(<frame  w="*" h="*">
        <img id="toolbar" w="*" h="*" src="{{url}}"/>
</frame>);
