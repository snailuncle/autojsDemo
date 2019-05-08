/**
 * 作者:  大柒
 * QQ:   531310591
 * 功能:  对话框
 * 日期:  2019/04/08
 * AJ版本:    Auto.js 4.1.0 Alpha5(其他版本自行测试)
 * 测试设备:    三星S8 安卓9.0
 * BUG:   乐视手机6.0出现点击不到控件的BUG
 * 添加页面方法:
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
var win = {}//悬浮窗
const w = device.width//设备分辨率 宽高
const h = device.height
const w_win = 210//悬浮窗 原尺寸
const h_win = 420
const v_win = parseInt((w - 160) / w_win)//悬浮窗 放大比例(很重要!!悬浮窗的所有值都对应的这个参数放大尺寸)
//可操作变量
const 落款 = "D7-Woker"
const 动画时间 = 500;//动画播放时间
const 界面背景颜色="#188296"

/**
 * 悬浮窗构建
 */
win = floaty.rawWindow(
    <frame w="{{w}}px" h="{{h}}px">
        <frame >
        <card id="框架" w="{{w_win*v_win}}px" h="{{h_win*v_win}}px" cardCornerRadius="{{(20*v_win)}}px" cardBackgroundColor="{{界面背景颜色}}"
            layout_gravity="center"  cardElevation="15dp" foreground="?selectableItemBackground"
            alpha="0">
            <frame h="*">
                <card w="{{100*v_win}}px" h="{{30*v_win}}px" cardCornerRadius="{{16*v_win}}px" marginTop="-{{15*v_win}}px" cardBackgroundColor="#000000"
                    layout_gravity="center_horizontal" cardElevation="-10dp" foreground="?selectableItemBackground" alpha="0.3" >
                    <frame layout_gravity="center|bottom" marginBottom="{{1*v_win}}px" w="auto" h="{{14*v_win}}px" >
                        <text text="{{落款}}" textSize="{{10*v_win}}px" textColor="#ffffff" textStyle="bold|italic" typeface="monospace" alpha="1" />
                    </frame>
                </card>
            </frame>
            //页面
            <frame id="CD_0" alpha="1" >
                <vertical w="*" h="auto" marginTop="{{20*v_win}}px" >
                    <vertical w="*" h="auto" gravity="center_horizontal" layout_gravity="center" >
                        <text w="auto"
                        text="这是对话框
                        点击即可关闭"
                        marginTop="{{40*v_win}}px" textSize="{{24*v_win}}px" textColor="#ffffff" gravity="center_horizontal" layout_gravity="center_horizontal" textStyle="bold" typeface="monospace" />
                    </vertical>

                </vertical>
            </frame>

        </card>
        </frame>
    </frame>
)
/**
 * 模拟初始化事件
 */
time_0 = setInterval(() => {
    if (win.框架.getY() > 0) {
        clearInterval(time_0)
        进场动画();
    }
}, 100)

time_1 = setInterval(() => {
}, 1000)

win.框架.on("click", () => {
    退场动画()
})

function 进场动画(){
    let C=win.框架
    界面显示 = ObjectAnimator.ofFloat(C, "alpha", 1,1)
    界面X = ObjectAnimator.ofFloat(C, "scaleX", 0, 1)
    界面Y = ObjectAnimator.ofFloat(C, "scaleY", 0, 1)
    显示=new AnimatorSet();
    显示.playTogether(界面显示,界面X,界面Y)
    显示.setDuration(700);
    显示.start()
}
function 退场动画(){
    let C=win.框架
    let time=0
    界面X = ObjectAnimator.ofFloat(C, "scaleX", 1, 0)
    界面Y = ObjectAnimator.ofFloat(C, "scaleY", 1, 0)
    显示=new AnimatorSet();
    显示.playTogether(界面X,界面Y)
    显示.setStartDelay(time);
    显示.setDuration(700);
    time+=700
    显示.start()//5
    threads.start(function(){
        sleep(time+500)
        exit()
    })
}
