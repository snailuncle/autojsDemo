/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  动画ObjectAnimator例子
 * 备注:   属性动画,顾名思义,更改view的属性
 */
'ui';
importClass(java.lang.Runnable);
importClass(android.animation.ObjectAnimator)
importClass(android.animation.PropertyValuesHolder)
importClass(android.animation.ValueAnimator)
importClass(android.animation.AnimatorSet)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.TranslateAnimation)
importClass(android.animation.ObjectAnimator)
importClass(android.animation.TimeInterpolator)
// importClass(android.support.v4.view.animation.FastOutLinearInInterpolator)
// importClass(android.support.v4.view.animation.FastOutSlowInInterpolator)
// importClass(android.support.v4.view.animation.LinearOutSlowInInterpolator)
// importClass(android.support.v7.app.AppCompatActivity)
importClass(android.os.Bundle)
importClass(android.view.View)
importClass(android.view.Window)
importClass(android.view.WindowManager)
importClass(android.view.animation.AccelerateDecelerateInterpolator)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.AnticipateInterpolator)
importClass(android.view.animation.AnticipateOvershootInterpolator)
importClass(android.view.animation.BounceInterpolator)
importClass(android.view.animation.CycleInterpolator)
importClass(android.view.animation.DecelerateInterpolator)
importClass(android.view.animation.LinearInterpolator)
importClass(android.view.animation.OvershootInterpolator)
importClass(android.view.animation.PathInterpolator)
importClass(android.widget.Button)
importClass(android.widget.ImageView)
importClass(android.widget.TextView)
var myColor = function () {
  return '#' + getRndColor()
}
ui.layout(
  <vertical>
    <scroll>
  <vertical id='parent'>
    <button id='ObjectAnimator多个动画'  textSize='20sp'>ObjectAnimator多个动画</button>
    <button id='PropertyValuesHolder多个动画'  textSize='20sp'>PropertyValuesHolder多个动画</button>
    <button id='自定义动画同时执行'  textSize='20sp'>自定义动画同时执行</button>
    <button id='自定义动画先后执行'  textSize='20sp'>自定义动画先后执行</button>
    <button id='透明'  textSize='20sp'>透明</button>
    <button id='旋转'  textSize='20sp'>旋转</button>
    <button id='插值器_头慢中快尾慢'  textSize='20sp'>插值器_头慢中快尾慢</button>
    <button id='插值器_头快尾慢'  textSize='20sp'>插值器_头快尾慢</button>
    <button id='插值器_慢慢加快'  textSize='20sp'>插值器_慢慢加快</button>
    <button id='插值器_弹射'  textSize='20sp'>插值器_弹射</button>
    <button id='自定义动画完成度_时间完成度曲线'  textSize='20sp'>自定义动画完成度_时间完成度曲线</button>
    <button id='插值器_惯性'  textSize='20sp'>插值器_惯性</button>
    <button id='插值器_惯性2'  textSize='20sp'>插值器_惯性2</button>
    <button id='插值器_弹性的小球掉到地上'  textSize='20sp'>插值器_弹性的小球掉到地上</button>
    <button id='插值器_类似sin函数'  textSize='20sp'>插值器_类似sin函数</button>
    <button id='绕X轴旋转'  textSize='20sp'>绕X轴旋转</button>
    <button id='在X轴上的平移'  textSize='20sp'>在X轴上的平移</button>
    <button id='在Y轴上的平移'  textSize='20sp'>在Y轴上的平移</button>
    <button id='在X轴上的缩放'  textSize='20sp'>在X轴上的缩放</button>
    <button id='在Y轴上的缩放'  textSize='20sp'>在Y轴上的缩放</button>
    <button id='更换背景颜色'  textSize='20sp'>更换背景颜色</button>
    <button id='顺序执行动画'  textSize='20sp'>顺序执行动画</button>
    <button id='同时执行动画'  textSize='20sp'>同时执行动画</button>
    <button id='平移_虚假移动_真身未动'  textSize='20sp'>平移_虚假移动_真身未动</button>
  </vertical>
    </scroll>
  </vertical>
)
ui.post(
  function () {
    var parent = ui.parent
    var sonsNum = parent.getChildCount()
    for (var i = 0; i < sonsNum; i++) {
      var son = parent.getChildAt(i)
      log(son.getText())
      var color = rndColor()
      log(color)
      son.setBackgroundColor(color)
    }
  }, 300
)
ui.插值器_头慢中快尾慢.on('click', () => {
  //更加丰富的控制效果
  var view = ui.插值器_头慢中快尾慢
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -600, 0);
  mTimeInterpolator = new AccelerateDecelerateInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.插值器_头快尾慢.on('click', () => {
  //更加丰富的控制效果
  var view = ui.插值器_头快尾慢
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -1000, 0);
  mTimeInterpolator = new DecelerateInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.插值器_慢慢加快.on('click', () => {
  var view = ui.插值器_慢慢加快
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -2000, 0);
  mTimeInterpolator = new AccelerateInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000);
  animator.start();
})
ui.插值器_弹射.on('click', () => {
  var view = ui.插值器_弹射
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -300, 0);
  mTimeInterpolator = new AnticipateInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000);
  animator.start();
})
ui.插值器_惯性2.on('click', () => {
  var view = ui.插值器_惯性2
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -200, 0);
  mTimeInterpolator = new OvershootInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000);
  animator.start();
})
ui.插值器_惯性.on('click', () => {
  var view = ui.插值器_惯性
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -200, 0);
  mTimeInterpolator = new AnticipateOvershootInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000);
  animator.start();
})
ui.插值器_弹性的小球掉到地上.on('click', () => {
  var view = ui.插值器_弹性的小球掉到地上
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -600, 0);
  mTimeInterpolator = new BounceInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000);
  animator.start();
})
ui.插值器_类似sin函数.on('click', () => {
  var view = ui.插值器_类似sin函数
  // 为了显示效果,我们先把按钮升高一点,然后再执行这个插值器效果
  animator往上走 = ObjectAnimator.ofFloat(view, "translationY", 0, -600);
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, -600);
  mTimeInterpolator = new CycleInterpolator(6);
  animator.setInterpolator(mTimeInterpolator);
  set = new AnimatorSet();
  set.playSequentially(animator往上走, animator);
  set.setDuration(3000);
  set.start();
})
ui.自定义动画完成度_时间完成度曲线.on('click', () => {
  var view = ui.自定义动画完成度_时间完成度曲线
  // 为了显示效果,我们先把按钮升高一点,然后再执行这个插值器效果
  var path = new android.graphics.Path();
  // 先以「动画完成度 : 时间完成度 = 1 : 1」的速度匀速运行 25%
  path.lineTo(0.25, 0.25);
  // 然后瞬间跳跃到 150% 的动画完成度
  path.moveTo(0.25, 1.5);
  // 再匀速倒车，返回到目标点
  path.lineTo(1, 1);
  animator = ObjectAnimator.ofFloat(view, "translationY", 0, 100, 0);
  mTimeInterpolator = new PathInterpolator(path);
  animator.setInterpolator(mTimeInterpolator);
  animator.setDuration(3000);
  animator.start();
})
ui.透明.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.透明, "alpha", 1, 0, 1);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.旋转.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.旋转, "rotation", 0, 180, 0);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.绕X轴旋转.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.绕X轴旋转, "rotationX", 0, 270, 0);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.在X轴上的平移.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.在X轴上的平移, "translationX", 0, 200, -200, 0);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.在Y轴上的平移.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.在Y轴上的平移, "translationY", 0, 200, -200, 0);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.在X轴上的缩放.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.在X轴上的缩放, "scaleX", 1, 10, 1);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.在Y轴上的缩放.on('click', () => {
  animator = ObjectAnimator.ofFloat(ui.在Y轴上的缩放, "scaleY", 1, 10, 1);
  animator.setDuration(3000); //动画时间
  animator.start();
})
ui.更换背景颜色.on('click', () => {
  objectAnimator = ObjectAnimator.ofInt(ui.更换背景颜色, "backgroundColor", rndColor(), rndColor(), rndColor(), rndColor());
  objectAnimator.setDuration(3000);
  objectAnimator.setEvaluator(new android.animation.ArgbEvaluator());
  objectAnimator.start();
})
ui.顺序执行动画.on('click', () => {
  playAnimationDaShang顺序(ui.顺序执行动画)
})
ui.同时执行动画.on('click', () => {
  playAnimationDaShang同时(ui.同时执行动画)
})
ui.平移_虚假移动_真身未动.on('click', () => {
  move(ui.平移_虚假移动_真身未动)
})
ui.ObjectAnimator多个动画.on('click', () => {
  ObjectAnimator多个动画(ui.ObjectAnimator多个动画)
})
ui.PropertyValuesHolder多个动画.on('click', () => {
  PropertyValuesHolder多个动画(ui.PropertyValuesHolder多个动画)
})
ui.自定义动画同时执行.on('click', () => {
  自定义动画同时执行(ui.自定义动画同时执行)
})
ui.自定义动画先后执行.on('click', () => {
  自定义动画先后执行(ui.自定义动画先后执行)
})

function 自定义动画同时执行(view) {
  //更加丰富的控制效果
  animator1 = ObjectAnimator.ofFloat(view, "translationX", 0, 600, 0);
  animator2 = ObjectAnimator.ofFloat(view, "translationY", 0, -200, 0);
  animator3 = ObjectAnimator.ofFloat(view, "rotation", 0, 360, 0);
  set = new AnimatorSet();
  set.playTogether(animator1, animator2, animator3);
  //set.play(animator1).with(animator2);
  //set.play(animator2).after(animator3);
  set.setDuration(3000);
  set.start();
}

function 自定义动画先后执行(view) {
  //更加丰富的控制效果
  animator1 = ObjectAnimator.ofFloat(view, "translationX", 0, 600, 0);
  animator2 = ObjectAnimator.ofFloat(view, "translationY", 0, -200, 0);
  animator3 = ObjectAnimator.ofFloat(view, "rotation", 0, 360, 0);
  set = new AnimatorSet();
  set.playSequentially(animator1, animator2, animator3);
  set.setDuration(3000);
  set.start();
}

function PropertyValuesHolder多个动画(view) {
  //优化
  p1 = PropertyValuesHolder.ofFloat("rotation", 0, 360, 0);
  p2 = PropertyValuesHolder.ofFloat("translationX", 0, 600, 0);
  p3 = PropertyValuesHolder.ofFloat("translationY", 0, -200, 0);
  ObjectAnimator.ofPropertyValuesHolder(view, p1, p2, p3).setDuration(3000).start();
}

function ObjectAnimator多个动画(view) {
  ObjectAnimator.ofFloat(view, "translationX", 0, 800, 0).setDuration(3000).start(); //1 操纵的对象 2 所需要操纵的对象属性 3 动画变化的范围
  ObjectAnimator.ofFloat(view, "rotation", 0, 360, 0).setDuration(3000).start(); //异步过程
  ObjectAnimator.ofFloat(view, "translationY", 0, -200, 0).setDuration(3000).start();
}

function move(view) {
  ta = new TranslateAnimation(0, 100, 0, -900);
  ta.setDuration(1000); //持续时间
  ta.setFillAfter(true); //平移完后true代表保存平移后的状态
  view.startAnimation(ta);
}

function playAnimationDaShang顺序(view) {
  animatorSetPeople = new AnimatorSet(); //多个动画 动画集
  animatorSetPeople.setDuration(3000);
  translationX = ObjectAnimator.ofFloat(view, "translationX", 0, -110, 110, 0);
  scaleX = ObjectAnimator.ofFloat(view, "scaleX", 1, 3, 1, 2, 1, 2, 1, 1.5, 1, 1.2, 1, 1.1, 1, 1.1, 1, 1.03, 1, 1.01, 1); //从原始状态放大2倍再回到原始状态
  scaleY = ObjectAnimator.ofFloat(view, "scaleY", 1, 3, 1, 2, 1, 2, 1, 1.5, 1, 1.2, 1, 1.1, 1, 1.1, 1, 1.03, 1, 1.01, 1);
  // translationX.setRepeatCount(-1); //设置动画重复次数
  // translationX.setRepeatMode(ObjectAnimator.RESTART); //动画重复模式
  translationX.setStartDelay(100); //动画延时执行
  translationX.setInterpolator(new AccelerateInterpolator()); //Interpolator可以定义动画播放的速度
  /*after(Animator anim) 将现有动画插入到传入的动画之后执行
after(long delay) 将现有动画延迟指定毫秒后执行
before(Animator anim) 将现有动画插入到传入的动画之前执行
with(Animator anim) 将现有动画和传入的动画同时执行*/
  animatorSetPeople.play(translationX).before(scaleX).after(scaleY)
  // animatorSetPeople.play(translationX).with(scaleX).with(scaleY)
  // animatorSetPeople.playTogether(translationX, scaleX, scaleY);
  animatorSetPeople.start();
  // animatorSetPeople.end();
  // animatorSetPeople.cancel();
}

function playAnimationDaShang同时(view) {
  animatorSetPeople = new AnimatorSet(); //多个动画 动画集
  animatorSetPeople.setDuration(3000);
  translationX = ObjectAnimator.ofFloat(view, "translationX", 0, -110, 110, 0);
  scaleX = ObjectAnimator.ofFloat(view, "scaleX", 1, 3, 1, 2, 1, 2, 1, 1.5, 1, 1.2, 1, 1.1, 1, 1.1, 1, 1.03, 1, 1.01, 1); //从原始状态放大2倍再回到原始状态
  scaleY = ObjectAnimator.ofFloat(view, "scaleY", 1, 3, 1, 2, 1, 2, 1, 1.5, 1, 1.2, 1, 1.1, 1, 1.1, 1, 1.03, 1, 1.01, 1);
  translationX.setStartDelay(100); //动画延时执行
  animatorSetPeople.play(translationX).with(scaleX).with(scaleY)
  animatorSetPeople.start();
}

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
