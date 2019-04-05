importClass(android.widget.Button)
importClass('android.view.WindowManager')
importClass('android.view.Gravity')
importClass('android.graphics.PixelFormat')

windowManager = context.getSystemService(context.WINDOW_SERVICE);
log(windowManager)
screenWidth = windowManager.getDefaultDisplay().getWidth();
screenHeight = windowManager.getDefaultDisplay().getHeight();
mBallView = new Button(context);
params = new WindowManager.LayoutParams();
params.x = screenWidth;
params.y = screenHeight / 2;
params.width = WindowManager.LayoutParams.WRAP_CONTENT;
params.height = WindowManager.LayoutParams.WRAP_CONTENT;
params.gravity = Gravity.LEFT | Gravity.TOP;
params.type = WindowManager.LayoutParams.TYPE_PHONE;
params.format = PixelFormat.RGBA_8888;
params.flags = WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL | WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE;
mBallView.setLayoutParams(params);
mBallView.setTextSize(20);
mBallView.setTextColor(colors.parseColor("#ff00f0"))
mBallView.setText("大护法");
mBallView.setGravity(0); //左护法
windowManager.addView(mBallView, params);
