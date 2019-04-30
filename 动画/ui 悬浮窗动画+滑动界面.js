/**
 * 作者:  大柒
 * QQ:   531310591
 * 功能:  酷炫的悬浮窗界面
 * 日期:  2019/04/08
 * AJ版本:    Auto.js 4.1.0 Alpha5(其他版本自行测试)
 * 测试设备:    三星S8 安卓9.0
 * BUG:   乐视手机6.0出现点击不到控件的BUG
 * 添加页面方法:
 *      (1)在悬浮窗'页面'添加新页面
 *      (2)在悬浮窗'下方导航栏'添加下面代码 注意修改id名称
 *      <vertical id="导航_3" layout_weight="1" gravity="center">
            <img w="{{14*v_win}}px" h="{{14*v_win}}px" src="#000000" circle="true" alpha="0.5" />
        </vertical>
 *      (3)在悬浮窗'下方白色小圆球'添加下面代码
 *      <vertical w="{{15*v_win}}px" layout_weight="1" gravity="center" />
 *      (4)在'变量'-'可修改变量'区域修改  页面总数和页面信息
 *      (5)在模拟初始化事件-'界面信息'变量添加新页面视图信息
 * 
 */

/*
importClass(android.content.Context)
importClass(android.content.res.TypedArray)
importClass(android.graphics.Color)
importClass(android.util.AttributeSet)
importClass(android.view.MotionEvent)
importClass(android.graphics.drawable.GradientDrawable);
*/

importClass(java.lang.Runnable);
importClass(android.animation.ObjectAnimator)
importClass(android.animation.PropertyValuesHolder)
importClass(android.animation.ValueAnimator)
importClass(android.animation.AnimatorSet)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.TranslateAnimation)
importClass(android.animation.ObjectAnimator)
importClass(android.animation.TimeInterpolator)
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


/**
 * 变量
 */

//不可操作变量
const logo_关闭="@drawable/ic_close_black_48dp"
const logo_笑脸="@drawable/ic_insert_emoticon_black_48dp"
const logo_装死="@drawable/ic_sentiment_very_dissatisfied_black_48dp"
const 白 = "#ffffff"
var win = {}//悬浮窗
const w = device.width//设备分辨率 宽高
const h = device.height
const w_win = 210//悬浮窗 原尺寸
const h_win = 420
const v_win = parseInt((w - 160) / w_win)//悬浮窗 放大比例(很重要!!悬浮窗的所有值都对应的这个参数放大尺寸)
var 当前界面 = 0//记录当前在哪个界面
var 切换动作 = true//动画动作真往前 假往后
var 界面数据 = [0,]//保存所有界面的动画数据
var 导航X差值 = 0//计算下方导航的X距离
var 点击界面 = 0//点击导航栏事件
//可操作变量
const 落款 = "D7-Woker"
const 动画时间 = 500;//动画播放时间
const 界面总数 = 4;//多界面的总数量
const 界面信息 = [
    //在这里添加你的每个界面名称和界面颜色
    ["个人中心", "#188296"],
    ["第二页", "#ffa000"],
    ["第三页", "#C71585"],
    ["第四页", "#E37968"]
];

/**
 * 悬浮窗构建
 */
win = floaty.rawWindow(
    <frame w="{{w}}px" h="{{h}}px">
        <frame id="关闭_0" w="{{40*v_win}}px" h="{{40*v_win}}px" marginTop="{{(h-(h_win*v_win))/2}}px"  marginRight="{{(w-(w_win*v_win))/2}}px" layout_gravity="right" alpha="0">
            <img id="关闭_bg" w="*" h="*" src="#1e88e5" circle="true" alpha="1" />
            <img w="{{40*v_win}}px" h="{{40*v_win}}px"  src="{{logo_笑脸}}" tint="#ffffff" circle="true" alpha="1" />
        </frame>
        <frame >
        <card id="框架" w="{{w_win*v_win}}px" h="{{h_win*v_win}}px" cardCornerRadius="{{(20*v_win)}}px" cardBackgroundColor="{{界面信息[当前界面][1]}}"
            layout_gravity="center" cardElevation="15dp" foreground="?selectableItemBackground" alpha="0">
            <frame h="*">
                <card w="{{100*v_win}}px" h="{{30*v_win}}px" cardCornerRadius="{{16*v_win}}px" marginTop="-{{15*v_win}}px" cardBackgroundColor="#000000"
                    layout_gravity="center_horizontal" cardElevation="-10dp" foreground="?selectableItemBackground" alpha="0.3" >
                    <frame layout_gravity="center|bottom" marginBottom="{{1*v_win}}px" w="auto" h="{{14*v_win}}px" >
                        <text text="{{落款}}" textSize="{{10*v_win}}px" textColor="#ffffff" textStyle="bold|italic" typeface="monospace" alpha="1" />
                    </frame>
                </card>

                //下方导航栏 导航栏宽度 w
                <frame w="{{w_win*v_win-200}}px" h="auto" alpha="1" layout_gravity="center|bottom"  >
                    //导航栏高度 h
                    <horizontal w="*" h="{{14*v_win}}px" marginBottom="{{14*v_win}}px" layout_gravity="center_horizontal" alpha="0" />
                    //导航小黑球
                    <horizontal w="*" h="*" layout_gravity="center_horizontal" alpha="0.5"  >
                        <vertical h="*" id="导航_0" layout_weight="1" gravity="center" >
                            <img w="{{14*v_win}}px" h="{{14*v_win}}px" src="#000000" circle="true" alpha="0.5" />
                        </vertical>
                        <vertical h="*" id="导航_1" layout_weight="1" gravity="center" >
                            <img w="{{14*v_win}}px" h="{{14*v_win}}px" src="#000000" circle="true" alpha="0.5" />
                        </vertical>
                        <vertical h="*" id="导航_2" layout_weight="1" gravity="center">
                            <img w="{{14*v_win}}px" h="{{14*v_win}}px" src="#000000" circle="true" alpha="0.5" />
                        </vertical>
                        <vertical h="*" id="导航_3" layout_weight="1" gravity="center">
                            <img w="{{14*v_win}}px" h="{{14*v_win}}px" src="#000000" circle="true" alpha="0.5" />
                        </vertical>
                    //在这里添加 小黑球

                    </horizontal>
                    //下方白色小圆球    上方加导航了栏目 下方也要对应添加一个
                    <horizontal w="*" h="*" layout_gravity="center_horizontal" alpha="1"  >
                        <vertical h="*" id="导航" layout_weight="1" gravity="center"  >
                            <img w="{{14*v_win}}px" h="{{14*v_win}}px" src="#ffffff" circle="true" alpha="1" />
                        </vertical>
                        <vertical h="*" w="{{14*v_win}}px" layout_weight="1" gravity="center" alpha="0" />
                        <vertical h="*" w="{{14*v_win}}px" layout_weight="1" gravity="center" alpha="0" />
                        <vertical h="*" w="{{14*v_win}}px" layout_weight="1" gravity="center" alpha="0" />
                    //在这里添加 小白球

                    </horizontal>

                </frame>
            </frame>

            //页面
            <frame id="CD_0" alpha="1" >
                <vertical w="*" h="auto" marginTop="{{20*v_win}}px" >
                    <vertical w="*" h="auto" gravity="center_horizontal" layout_gravity="center" >
                        <text w="auto" text="{{界面信息[0][0]}}" textSize="{{14*v_win}}px" textStyle="bold" typeface="monospace" />
                        <img w="{{100*v_win}}px" h="{{100*v_win}}px" marginTop="30" src="#ffffff" circle="true" 
                        layout_gravity="center" alpha="0.5" />
                        <text w="auto" 
                        text="你好,大柒!
                        滑动屏幕
                        点击下方导航
                        切换界面"
                        marginTop="{{40*v_win}}px" textSize="{{24*v_win}}px" textColor="{{白}}" gravity="center_horizontal" layout_gravity="center_horizontal" textStyle="bold" typeface="monospace" />
                        
                    </vertical>

                </vertical>
            </frame>
            <frame id="CD_1" alpha="0"  >
                <vertical w="*" h="auto" marginTop="{{20*v_win}}px" >

                    <text text="{{界面信息[1][0]}}" textSize="{{14*v_win}}px" gravity="center_horizontal" textStyle="bold" typeface="monospace" />
                    <img w="{{100*v_win}}px" h="{{100*v_win}}px" marginTop="30" src="#ffffff" circle="true" layout_gravity="center" alpha="0.5" />
                </vertical>
            </frame>
            <frame id="CD_2" alpha="0"  >
                <vertical w="*" h="auto" marginTop="{{20*v_win}}px" >

                    <text text="{{界面信息[2][0]}}" textSize="{{14*v_win}}px" gravity="center_horizontal" textStyle="bold" typeface="monospace" />
                    <img w="{{100*v_win}}px" h="{{100*v_win}}px" marginTop="30" src="#ffffff" circle="true" layout_gravity="center" alpha="0.5" />
                </vertical>
            </frame>
            <frame id="CD_3" alpha="0"  >
                <vertical w="*" h="auto" marginTop="{{20*v_win}}px" >

                    <text text="{{界面信息[3][0]}}" textSize="{{14*v_win}}px" gravity="center_horizontal" textStyle="bold" typeface="monospace" />
                    <img w="{{100*v_win}}px" h="{{100*v_win}}px" marginTop="30" src="#ffffff" circle="true" layout_gravity="center" alpha="0.5" />
                </vertical>
            </frame>
        </card>
        </frame>
        <frame id="关闭_1" w="{{40*v_win}}px" h="{{40*v_win}}px" marginTop="{{(h-(h_win*v_win))/2}}px"  marginRight="{{(w-(w_win*v_win))/2}}px" layout_gravity="right" alpha="0" >
        <img id="关闭_bg_1" src="{{界面信息[当前界面][1]}}"  circle="true" alpha="1" />
            <img id="关闭_logo" w="*" h="*" margin="{{5*v_win}}px" src="{{logo_关闭}}" circle="true" alpha="1" />
            <img id="关闭" src="{{界面信息[当前界面][1]}}"  circle="true" alpha="0" />
        </frame>
    </frame>
)
/**
 * 模拟初始化事件
 */
time_0 = setInterval(() => {
    if (界面数据.length == 1 && win.框架.getY() > 0) {
        界面数据 = [//添加每个页面的视图
            win.CD_0,
            win.CD_1,
            win.CD_2,
            win.CD_3
        ]
        let w1 = win.框架.getWidth() / 2
        let h1 = win.框架.getHeight() + w1
        for (i = 0; i < 界面数据.length; i++) {
            界面数据[i].setPivotX(w1)
            界面数据[i].setPivotY(h1)
        }
        //win.框架.setPivotX(win.关闭.getLeft()+((win.关闭.getWidth()/2)+w1)+w1+w1)
        win.框架.setPivotX(w1+(win.关闭.getWidth())+(win.关闭.getWidth()))
        win.框架.setPivotY(h1-(h1-(win.关闭.getHeight()/2)))
        导航X差值 = win.导航_1.getX() - win.导航_0.getX()
        log("X差值" + 导航X差值)
        进场动画();
    }
}, 100)

time_1 = setInterval(() => {
}, 1000)

/**
 * 导航栏触发事件
 */
win.导航_0.on("click", () => {
    log("导航0")
    if (当前界面 == 0) { return }
    切换动作 = false
    动画(0)
})

win.导航_1.on("click", () => {
    log("导航1")
    if (当前界面 == 1) { return }
    if (当前界面 == 0) {
        切换动作 = true
    } else {
        切换动作 = false
    }
    动画(1)
})

win.导航_2.on("click", () => {
    log("导航2")
    if (当前界面 == 2) { return }
    if (当前界面 < 2) {
        切换动作 = true
    } else {
        切换动作 = false
    }
    动画(2)
})

win.导航_3.on("click", () => {
    log("导航3")
    if (当前界面 == 3) { return }
    if (当前界面 < 3) {
        切换动作 = true
    } else {
        切换动作 = false
    }
    动画(3)
})
win.导航.on("click", () => {
    log("导航")
})
win.关闭.on("click", () => {
    log("关闭")
    win.关闭_bg_1.attr("src",界面信息[当前界面][1])
    退场动画()
})


/**
 *  ------------------下方代码无需修改--------------
 * 触摸事件
 */
//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY; G_Y = 0
//记录按键被按下的时间以便判断长按等动作
var downTime; yd = false;
win.框架.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = win.getX();
            windowY = win.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            if (!yd) {//如果移动的距离大于h值 则判断为移动 yd为真
                if (Math.abs(event.getRawY() - y) < 300 && Math.abs(event.getRawX() - x) > 300) { yd = true }
            }
            return true;
        case event.ACTION_UP:                //手指弹起
            //触摸时间小于 200毫秒 并且移动距离小于30 则判断为 点击
            if (yd) {
                if (event.getRawX() > x) {
                    切换动作 = false;
                } else {
                    切换动作 = true;
                }
                动画(界面判定())
            }
            yd = false
            return true;
    }
    return true;
});

/**

 * 动画
 */
function 动画(A) {
    log("\n当前界面" + 当前界面 + "\n置换到" + A)
    Animator = ObjectAnimator.ofInt(//颜色处理动画
        win.框架, "cardBackgroundColor",
        colors.parseColor(界面信息[当前界面][1]),
        colors.parseColor(界面信息[A][1]));
    Animator0 = ObjectAnimator.ofFloat(//小白球移动动画
        win.导航, "translationX",
        (当前界面) * 导航X差值,
        A * 导航X差值
    );
    Animatorx = ObjectAnimator.ofFloat(//小白球X缩放动画
        win.导航, "scaleY", 1, 0.7, 0.5, 0.7, 1);
    Animatory = ObjectAnimator.ofFloat(//小白球Y缩放动画
        win.导航, "scaleX", 1, 2, 1.7, 1.4, 1);
    if (切换动作) {//页面旋转动画
        Animator1 = ObjectAnimator.ofFloat(界面数据[当前界面], "rotation", 0, -45)
        Animator2 = ObjectAnimator.ofFloat(界面数据[A], "rotation", 45, 0)
    } else {
        Animator1 = ObjectAnimator.ofFloat(界面数据[当前界面], "rotation", 0, 45)
        Animator2 = ObjectAnimator.ofFloat(界面数据[A], "rotation", -45, 0)
    }
    Animator3 = ObjectAnimator.ofFloat(界面数据[当前界面], "alpha", 1, 1)
    Animator4 = ObjectAnimator.ofFloat(界面数据[A], "alpha", 1, 1)
    set = new AnimatorSet();
    set.playTogether(Animator2, Animator1, Animator3, Animator4, Animator0, Animatorx, Animatory)
    set.setDuration(动画时间);
    Animator.setDuration(动画时间);
    Animator.setEvaluator(new android.animation.ArgbEvaluator());
    Animator.start();
    set.start();
    当前界面 = A
}
function 进场动画(){
    let A=win.关闭_0
    let B=win.关闭_1
    let C=win.框架
    let D=win.关闭_logo
    let time=0
    //进场
    圆进场 = ObjectAnimator.ofFloat(A, "translationX", w-A.getLeft(),0);
    圆显示 = ObjectAnimator.ofFloat(A, "alpha", 1,1)
    圆滚动 = ObjectAnimator.ofFloat(A, "rotation", 360, 0)
    set = new AnimatorSet();
    set.playTogether(圆进场,圆显示,圆滚动)
    set.setDuration(1000);
    //转换
    圆翻转 = ObjectAnimator.ofFloat(A, "scaleX", 1,0)
    圆翻转.setStartDelay(1000);
    圆翻转.setDuration(250);
    替身圆翻转  =ObjectAnimator.ofFloat(B, "scaleX", 0,1)
    圆显示_0 = ObjectAnimator.ofFloat(A, "alpha", 0,0)
    圆显示_1 = ObjectAnimator.ofFloat(B, "alpha", 1,1)
    转换=new AnimatorSet();
    转换.playTogether(替身圆翻转,圆显示_0,圆显示_1)
    转换.setStartDelay(1250);
    转换.setDuration(250);
    //过渡_0
    圆X1=ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleX", 1,0)
    圆Y1 = ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleY", 1,0)
    旋转1 = ObjectAnimator.ofFloat(B, "rotation", 0, 180)
    过渡=new AnimatorSet();
    过渡.playTogether(圆X1,圆Y1,旋转1)
    过渡.setStartDelay(2000);
    过渡.setDuration(500);
    //界面显示
    界面显示 = ObjectAnimator.ofFloat(C, "alpha", 1,1)
    界面X = ObjectAnimator.ofFloat(C, "scaleX", 0, 1)
    界面Y = ObjectAnimator.ofFloat(C, "scaleY", 0, 1)
    旋转 = ObjectAnimator.ofFloat(B, "rotation", 180, -360)
    圆X = ObjectAnimator.ofFloat(D, "scaleX", 1,0.5, 0.75)
    圆Y = ObjectAnimator.ofFloat(D, "scaleY", 1,0.5, 0.75)
    圆X2=ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleX", 0,1)
    圆Y2 = ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleY", 0,1)
    圆Z1 = ObjectAnimator.ofFloat(win.关闭_bg_1, "alpha", 1,1,1,0)
    圆Z2 = ObjectAnimator.ofFloat(D, "alpha", 1,0.3)
    显示=new AnimatorSet();
    显示.playTogether(界面显示,界面X,界面Y,旋转,圆X,圆Y,圆X2,圆Y2,圆Z1,圆Z2)
    显示.setStartDelay(2500);
    显示.setDuration(700);
    //结束
    set.start()//1
    圆翻转.start()//2
    转换.start()//3
    过渡.start()//4
    显示.start()//5
}
function 退场动画(){
    let A=win.关闭_0
    let B=win.关闭_1
    let C=win.框架
    let D=win.关闭_logo
    let time=0
    //开始退场
    //界面显示 = ObjectAnimator.ofFloat(C, "alpha", 1,1)
    界面X = ObjectAnimator.ofFloat(C, "scaleX", 1, 0)
    界面Y = ObjectAnimator.ofFloat(C, "scaleY", 1, 0)
    旋转 = ObjectAnimator.ofFloat(B, "rotation", -360, 180)
    圆X = ObjectAnimator.ofFloat(D, "scaleX", 0.75,0.5, 1)
    圆Y = ObjectAnimator.ofFloat(D, "scaleY", 0.75,0.5, 1)
    圆X2=ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleX",1, 0)
    圆Y2 = ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleY",1, 0)
    圆Z1 = ObjectAnimator.ofFloat(win.关闭_bg_1, "alpha", 1,1)
    圆Z2 = ObjectAnimator.ofFloat(D, "alpha",0.3, 1)
    显示=new AnimatorSet();
    显示.playTogether(界面显示,界面X,界面Y,旋转,圆X,圆Y,圆X2,圆Y2,圆Z1,圆Z2)
    显示.setStartDelay(time);
    显示.setDuration(700);
    time+=700
    //过渡_0
    圆X1=ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleX",0, 1)
    圆Y1 = ObjectAnimator.ofFloat(win.关闭_bg_1, "scaleY",0, 1)
    旋转1 = ObjectAnimator.ofFloat(B, "rotation", 180, 0)
    过渡=new AnimatorSet();
    过渡.playTogether(圆X1,圆Y1,旋转1)
    过渡.setStartDelay(time);
    过渡.setDuration(500);
    time+=500
        //转换
        替身圆翻转  =ObjectAnimator.ofFloat(B, "scaleX",1, 0)
        圆显示_1 = ObjectAnimator.ofFloat(B, "alpha", 1,1)
        转换=new AnimatorSet();
        转换.playTogether(替身圆翻转,圆显示_1)
        转换.setStartDelay(time);
        转换.setDuration(250);
        time+=250
        圆显示_0 = ObjectAnimator.ofFloat(B, "alpha", 0,0)
        圆显示_2 = ObjectAnimator.ofFloat(A, "alpha", 1,1)
        圆翻转 = ObjectAnimator.ofFloat(A, "scaleX", 0,1)
        转换1=new AnimatorSet();
        转换1.playTogether(圆翻转,圆显示_0,圆显示_2)
        转换1.setStartDelay(time);
        转换1.setDuration(250);
        time+=1000


    //退场
    animator = ObjectAnimator.ofFloat(A, "translationX", 0, w);
  mTimeInterpolator = new AnticipateInterpolator();
  animator.setInterpolator(mTimeInterpolator);
  animator.setStartDelay(time);
  animator.setDuration(500);
  time+=500
  animator.start();
  /*
    圆进场 = ObjectAnimator.ofFloat(A, "translationX",0, w-A.getLeft());
    圆显示 = ObjectAnimator.ofFloat(A, "alpha", 1,1)
    圆滚动 = ObjectAnimator.ofFloat(A, "rotation", 0, 360)
    set = new AnimatorSet();
    set.playTogether(圆进场,圆显示,圆滚动)
    set.setStartDelay(time);
    set.setDuration(1000);
*/
    //结束
   // set.start()//1
    转换1.start()//2
    转换.start()//3
    过渡.start()//4
    显示.start()//5
    threads.start(function(){
        sleep(time+500)
        exit()
    })
}


function 界面判定() {//正常滑动时判定下一个界面
    if (切换动作) {
        if (当前界面 == 界面总数 - 1) { return 0 }
        return 当前界面 + 1
    } else {
        if (当前界面 == 0) { return 界面总数 - 1 }
        return 当前界面 - 1
    }
}