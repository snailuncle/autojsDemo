
var 太阳号=ui.inflate(
<frame><vertical id='ONE_PIECE'>
</vertical></frame>
);
function getActivity() {
  context = runtime.app.getCurrentActivity();
  if (context == null || (context).isFinishing()) {
    context = getContext();
  }

  return context
}

function  getContext() {
  mThemeWrapper = new android.view.ContextThemeWrapper(runtime.uiHandler.getContext().getApplicationContext(), com.stardust.autojs.R.style.Theme_AppCompat_Light);
  return mThemeWrapper;
}

var activity=getActivity()
var myView=ui.inflate(<LinearLayout
    orientation="vertical"
    layout_width="match_parent"
    layout_height="match_parent"
    background="#00ffff">
    <ImageView
        id="progress_bar"
        layout_width="wrap_content"
        layout_height="wrap_content"
        layout_gravity="center"
        layout_marginTop="10dp"
        layout_marginBottom="10dp"/>
    <TextView
        text="正在加载..."
        layout_width="match_parent"
        layout_height="20dp"
        textColor="#ff0000"
        layout_gravity="center"
        gravity="center"/>
</LinearLayout>,太阳号,true
)


// activity
// 自定义弹出框,框内放入图片,图片设置旋转动画
alert_progress = new android.app.AlertDialog.Builder(activity).create();
alert_progress.show();
// alert_progress.setCancelable(true); // 点击背景时对话框不会消失
alert_progress.setCanceledOnTouchOutside(true);
window = alert_progress.getWindow();
window.setContentView(太阳号); //加载自定义的布局文件
wm = window.getAttributes();
wm.width = 666; // 设置对话框的宽
wm.height = 666; // 设置对话框的高
wm.alpha = 1; // 对话框背景透明度
wm.dimAmount = 0.6; // 遮罩层亮度
window.setAttributes(wm);

var progress_barId = com.stardust.autojs.core.ui.inflater.util.Ids.parse("progress_bar")
var img = window.findViewById(progress_barId); // 获取布局文件中的ImageView控件
// img.setBackgroundResource(android.R.drawable.ic_move_cursor); // 设置图片，也可在布局文件中设置
// ic_move_cursor.png
alert_img_id = com.stardust.autojs.core.ui.inflater.util.Ids.parse("ic_android_eat_js")
log('第一种获取id的办法,不能用')
log(alert_img_id)
// log(img.setBackgroundResource.toString())
var secondImgId = getResource('ic_android_eat_js')
log('第二种获取id的办法,能用')
log(secondImgId)
img.setBackgroundResource(secondImgId); // 设置图片，也可在布局文件中设置
// 设置旋转动画
var tranfrom = new android.view.animation.RotateAnimation(0, 359, android.view.animation.Animation.RELATIVE_TO_SELF, 0.5, android.view.animation.Animation.RELATIVE_TO_SELF, 0.5); //(359:旋转角度（可自调），若为360会有卡顿，正数为顺势针旋转，负数为逆时针)
tranfrom.setDuration(2000); // 旋转速度
tranfrom.setFillAfter(true);
tranfrom.setRepeatCount(-1); // －1为一只旋转，若10，则旋转10次设定的角度后停止
// tranfrom.cancel();  // 取消动画
img.setAnimation(tranfrom);

function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  return attrs
}

function getResource(imageName) {
  var resId = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
  return resId;
}


