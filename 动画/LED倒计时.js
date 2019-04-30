"ui";
/**
 * 作者:    大柒
 * 日期:    2019/04/16 07:45
 * 说明:    无聊做得一个ui界面
 *      暂时没有适配分辨率 没有400DP宽度 会显示不全(可以自行适配 哈哈哈)
 *      (ui宽高 400X400)
 *      有LED数字
 *      可调节环形进度条 按住白色小球可调节进度
 *      其他的好像也没啥了啊
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
var td = false//标识当前是否在运行中
var color_off = "#ff2100"//开关按钮颜色 关闭
var color_on = "#0082e4"//开关按钮颜色 开启
var img_off = "@drawable/ic_stop_black_48dp"//开关图标 关闭
var img_on = "@drawable/ic_play_arrow_black_48dp"//开关图标 开启
var xc_sj //多线程
var sj_jd = 175 //进度条 总弧度 本来180的 白色小球占了5°
var sj_sj = 0 //保存当前以运行秒数
var num_n = 9 //LED数字
var jd_s = 175 / (data_f * 60)//计算每秒钟进度条旋转多少度
var LED = {//LED数字 素材地址
    bg: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAgj5LT5QUonsHEEzAoOEU.png",
    hs: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAgkJLT5QUoscHp7AcwKDgH.png",
    hz: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAgk5LT5QUom4D5gwUwKDgH.png",
    hx: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAgkZLT5QUo1ovOsQIwKDgH.png",
    zs: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAglpLT5QUowZWNxQEwCDgh.png",
    zx: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAgl5LT5QUo7Im-2gQwCDgh.png",
    ys: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAglJLT5QUo_NXFdjAIOCE.png",
    yx: "https://16570095.s21i.faiusr.com/4/ABUIABAEGAAglZLT5QUo85v44wYwCDgh.png",
}

/**
 * 可修改变量
 */
var data_f = 5 //总运行分钟



ui.layout(
    <frame w="*" h="*">
        <frame id="bg" w="400" h="400" layout_gravity="center">
            <img w="*" h="*" src="http://www.dyhywz.com/d_pan.png" />
            <frame id="jd" w="400" h="400" rotation="175.00"  >
                <img w="380" h="187" margin="10" layout_gravity="bottom" src="http://www.dyhywz.com/jdt.png" />
                <frame w="383" h="190" margin="10" layout_gravity="bottom"  >
                    <frame w="16" h="16" layout_gravity="top|right">
                        <img id="bo_img" w="16" h="16" src="#ffffff" circle="true" />
                        <img w="10" h="10" src="#3a304d" circle="true" layout_gravity="center" />
                    </frame>
                </frame>
            </frame>
            <img w="*" h="*" src="http://www.dyhywz.com/bg.png" circle="true" />
            <img w="*" h="*" src="http://www.dyhywz.com/d_pan1.png" circle="true" />
            <frame w="173" h="56" marginTop="20" layout_gravity="center">
                <horizontal w="*"  >
                    <img w="44" h="*" src="@drawable/ic_keyboard_arrow_left_black_48dp" tint="#ffffff" />
                    <card id="on" w="85" h="*" cardCornerRadius="28" cardBackgroundColor="{{color_on}}"
                        cardElevation="5dp" gravity="bottom" foreground="?selectableItemBackground"  >
                        <img id="on_img" margin="5" src="{{img_on}}" tint="#ffffff" layout_gravity="center" />
                    </card>
                    <img w="44" h="*" src="@drawable/ic_keyboard_arrow_right_black_48dp" tint="#ffffff" />
                </horizontal>
            </frame>
            <card w="120" h="20" marginTop="80" cardCornerRadius="10" cardBackgroundColor="#201f22"
                layout_gravity="center" foreground="?selectableItemBackground"  >
                <text id="sj" text="0:00 / {{data_f}}:00" textColor="#ffffff" gravity="center" />
            </card>
            <frame w="40" h="69" layout_gravity="center" marginBottom="120">
                <img w="*" h="*" src="{{LED.bg}}" tint="#000000" alpha="0" />
                <frame id="num">
                    <img id="nu_hs" w="*" h="7" src="{{LED.hs}}" alpha="0" />
                    <img id="nu_hz" w="*" h="7" src="{{LED.hz}}" layout_gravity="center" alpha="0" />
                    <img id="nu_hx" w="*" h="7" src="{{LED.hx}}" layout_gravity="bottom" alpha="0" />
                    <img id="nu_zs" w="8" h="33" src="{{LED.zs}}" marginTop="1" alpha="0" />
                    <img id="nu_ys" w="8" h="33" src="{{LED.ys}}" marginTop="1" layout_gravity="right" alpha="0" />
                    <img id="nu_yx" w="8" h="33" src="{{LED.yx}}" marginBottom="1" layout_gravity="bottom|right" alpha="0" />
                    <img id="nu_zx" w="8" h="33" src="{{LED.zx}}" marginBottom="1" layout_gravity="bottom" alpha="0" />
                </frame>
            </frame>
            <card id="ts" w="200" h="40" marginTop="-100" cardCornerRadius="10" cardBackgroundColor="#000000"
                layout_gravity="center" foreground="?selectableItemBackground" alpha="0" >
                <frame >
                    <text id="text_0" text="◁  左右滑动调节进度  ▷" textColor="#ffffff" gravity="center" alpha="1" />
                    <text id="text_1" text="" textColor="#ffffff" gravity="center" alpha="0" />
                </frame>
            </card>
        </frame>
    </frame>
)
var AAA = false
var num = [//0-9 LED数字信息 [视图ID,显示隐藏(0隐藏 1显示)]
    [//0
        [ui.nu_hs, 1],
        [ui.nu_hz, 0],
        [ui.nu_hx, 1],
        [ui.nu_zs, 1],
        [ui.nu_zx, 1],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
    [//1
        [ui.nu_hs, 0],
        [ui.nu_hz, 0],
        [ui.nu_hx, 0],
        [ui.nu_zs, 0],
        [ui.nu_zx, 0],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
    [//2
        [ui.nu_hs, 1],
        [ui.nu_hz, 1],
        [ui.nu_hx, 1],
        [ui.nu_zs, 0],
        [ui.nu_zx, 1],
        [ui.nu_ys, 1],
        [ui.nu_yx, 0],
    ],
    [//3
        [ui.nu_hs, 1],
        [ui.nu_hz, 1],
        [ui.nu_hx, 1],
        [ui.nu_zs, 0],
        [ui.nu_zx, 0],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
    [//4
        [ui.nu_hs, 0],
        [ui.nu_hz, 1],
        [ui.nu_hx, 0],
        [ui.nu_zs, 1],
        [ui.nu_zx, 0],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
    [//5
        [ui.nu_hs, 1],
        [ui.nu_hz, 1],
        [ui.nu_hx, 1],
        [ui.nu_zs, 1],
        [ui.nu_zx, 0],
        [ui.nu_ys, 0],
        [ui.nu_yx, 1],
    ],
    [//6
        [ui.nu_hs, 1],
        [ui.nu_hz, 1],
        [ui.nu_hx, 1],
        [ui.nu_zs, 1],
        [ui.nu_zx, 1],
        [ui.nu_ys, 0],
        [ui.nu_yx, 1],
    ],
    [//7
        [ui.nu_hs, 1],
        [ui.nu_hz, 0],
        [ui.nu_hx, 0],
        [ui.nu_zs, 0],
        [ui.nu_zx, 0],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
    [//8
        [ui.nu_hs, 1],
        [ui.nu_hz, 1],
        [ui.nu_hx, 1],
        [ui.nu_zs, 1],
        [ui.nu_zx, 1],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
    [//9
        [ui.nu_hs, 1],
        [ui.nu_hz, 1],
        [ui.nu_hx, 1],
        [ui.nu_zs, 1],
        [ui.nu_zx, 0],
        [ui.nu_ys, 1],
        [ui.nu_yx, 1],
    ],
]
ui.on.on("click", (view) => {//开始按钮点击事件
    if (!td) {
        td = true
        Animator = ObjectAnimator.ofInt(//颜色处理动画
            ui.on, "cardBackgroundColor",
            colors.parseColor(color_on),
            colors.parseColor(color_off));
        ui.run(function () {
            ui.on_img.attr("src", img_off)
        })
        Animator.setDuration(500);
        Animator.setEvaluator(new android.animation.ArgbEvaluator());
        Animator.start();
        时间(5)
    } else {
        结束()
        xc_sj.interrupt()
    }

})
function 倒计时() {//LED数字倒计时显示
    for (let E = 5; E > -1; E--) {//从5开始 可选1到9 不然会报错
        ui.run(function () {
            animator1 = ObjectAnimator.ofFloat(num[E][0][0], "alpha", parseInt(num[E][0][0].getAlpha()), num[E][0][1]);
            animator2 = ObjectAnimator.ofFloat(num[E][1][0], "alpha", parseInt(num[E][1][0].getAlpha()), num[E][1][1]);
            animator3 = ObjectAnimator.ofFloat(num[E][2][0], "alpha", parseInt(num[E][2][0].getAlpha()), num[E][2][1]);
            animator4 = ObjectAnimator.ofFloat(num[E][3][0], "alpha", parseInt(num[E][3][0].getAlpha()), num[E][3][1]);
            animator5 = ObjectAnimator.ofFloat(num[E][4][0], "alpha", parseInt(num[E][4][0].getAlpha()), num[E][4][1]);
            animator6 = ObjectAnimator.ofFloat(num[E][5][0], "alpha", parseInt(num[E][5][0].getAlpha()), num[E][5][1]);
            animator7 = ObjectAnimator.ofFloat(num[E][6][0], "alpha", parseInt(num[E][6][0].getAlpha()), num[E][6][1]);
            set = new AnimatorSet();
            set.playTogether(animator1, animator2, animator3, animator4, animator5, animator6, animator7);
            set.setDuration(500);
            set.start();
            num_n = E
            log(E)
        })
        sleep(1000)
    }
    ui.run(function () {//隐藏LED数字
        animator1 = ObjectAnimator.ofFloat(num[num_n][0][0], "alpha", parseInt(num[num_n][0][0].getAlpha()), 0);
        animator2 = ObjectAnimator.ofFloat(num[num_n][1][0], "alpha", parseInt(num[num_n][1][0].getAlpha()), 0);
        animator3 = ObjectAnimator.ofFloat(num[num_n][2][0], "alpha", parseInt(num[num_n][2][0].getAlpha()), 0);
        animator4 = ObjectAnimator.ofFloat(num[num_n][3][0], "alpha", parseInt(num[num_n][3][0].getAlpha()), 0);
        animator5 = ObjectAnimator.ofFloat(num[num_n][4][0], "alpha", parseInt(num[num_n][4][0].getAlpha()), 0);
        animator6 = ObjectAnimator.ofFloat(num[num_n][5][0], "alpha", parseInt(num[num_n][5][0].getAlpha()), 0);
        animator7 = ObjectAnimator.ofFloat(num[num_n][6][0], "alpha", parseInt(num[num_n][6][0].getAlpha()), 0);
        set = new AnimatorSet();
        set.playTogether(animator1, animator2, animator3, animator4, animator5, animator6, animator7);
        set.setDuration(500);
        set.start();
    })
}
function 结束() {//按钮结束事件
    td = false
    Animator = ObjectAnimator.ofInt(//开关颜色处理动画
        ui.on, "cardBackgroundColor",
        colors.parseColor(color_off),
        colors.parseColor(color_on));
    ui.run(function () {
        ui.on_img.attr("src", img_on)
    })
    //LED数字关闭动画
    animator1 = ObjectAnimator.ofFloat(num[num_n][0][0], "alpha", parseInt(num[num_n][0][0].getAlpha()), 0);
    animator2 = ObjectAnimator.ofFloat(num[num_n][1][0], "alpha", parseInt(num[num_n][1][0].getAlpha()), 0);
    animator3 = ObjectAnimator.ofFloat(num[num_n][2][0], "alpha", parseInt(num[num_n][2][0].getAlpha()), 0);
    animator4 = ObjectAnimator.ofFloat(num[num_n][3][0], "alpha", parseInt(num[num_n][3][0].getAlpha()), 0);
    animator5 = ObjectAnimator.ofFloat(num[num_n][4][0], "alpha", parseInt(num[num_n][4][0].getAlpha()), 0);
    animator6 = ObjectAnimator.ofFloat(num[num_n][5][0], "alpha", parseInt(num[num_n][5][0].getAlpha()), 0);
    animator7 = ObjectAnimator.ofFloat(num[num_n][6][0], "alpha", parseInt(num[num_n][6][0].getAlpha()), 0);
    set = new AnimatorSet();
    set.playTogether(animator1, animator2, animator3, animator4, animator5, animator6, animator7);
    set.setDuration(500);
    set.start();
    Animator.setDuration(500);
    Animator.setEvaluator(new android.animation.ArgbEvaluator());
    Animator.start();

}
var an = []
function 时间(X) {//主线程
    xc_sj = threads.start(function () {
        倒计时()//LED倒计时
        let A = data_f * 60
        let B = 175 / A
        let s1 = "0"
        let s = 0, f = 0
        if (sj_sj != 0) {
            s = parseInt(sj_sj / 60)
            f = sj_sj % 60
        }
        //循环 从0:00到结束 5:00
        for (let i = s; i < X; i++) {
            for (let n = f; n < 60; n++) {
                ui.run(function () {
                    Animator1 = ObjectAnimator.ofFloat(ui.jd, "rotation", sj_jd, sj_jd -= B)
                    Animator1.setDuration(1130);
                    Animator1.start();
                    //ui.jd.attr("rotation",C)
                    if (n < 10) { s1 = "0" + n } else { s1 = n }
                    ui.sj.setText(i + ":" + s1 + " / " + X + ":00")
                })
                sj_sj++
                sleep(1000)
            }
            s = 0
            f = 0
        }
        //结束 进度条按钮复位
        ui.run(function () {
            Animator = ObjectAnimator.ofInt(//颜色处理动画
                ui.on, "cardBackgroundColor",
                colors.parseColor(color_off),
                colors.parseColor(color_on));
            ui.on_img.attr("src", img_on)
            Animator.setDuration(500);
            Animator.setEvaluator(new android.animation.ArgbEvaluator());
            Animator.start();
            Animator1 = ObjectAnimator.ofFloat(ui.jd, "rotation", 0, 175)
            Animator1.setDuration(1000);
            Animator1.start();
        })
        td = false
        sj_jd = 175
        sj_sj = 0
        ui.sj.setText("0:00 / " + X + ":00")
    })
}

function angle(start, end) {//角度计算函数
    var diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    //返回角度,不是弧度
    return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
}


//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY; G_Y = 0
//记录按键被按下的时间以便判断长按等动作
var downTime; yd = false; 表示点 = false
//记录旋转中心点坐标
var xuan_x, xuan_y, xuan_j, xuan_j1
//记录按下时 时间进度
var jd_sjb
ui.bo_img.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = ui.bo_img.getX();
            windowY = ui.bo_img.getY();
            downTime = new Date().getTime();
            var rect = new android.graphics.Rect;
            ui.bg.getBoundsOnScreen(rect);
            xuan_x = rect.left + (rect.width() / 2)
            xuan_y = rect.top + (rect.height() / 2)
            log("中心X:" + xuan_x + "\n中心Y:" + xuan_y)
            jd_sjb = sj_sj
            jd_s = 175 / (data_f * 60)
            ui.run(function () {
                if (td) {
                    ui.text_0.setText("请结束后再试")
                } else {
                    ui.text_0.setText("◁  左右滑动调节进度  ▷")
                }
                ui.text_0.attr("alpha", 1)
                ui.text_1.attr("alpha", 0)
                an = ObjectAnimator.ofFloat(ui.ts, "alpha", 0, 0.3);
                an.setDuration(200);
                an.start();
            })
            表示点 = true
            return true;
        case event.ACTION_MOVE:
            if (td) { return true; }
            if (Math.abs(event.getRawY() - y) > 30 || Math.abs(event.getRawX() - x) > 30) { yd = true }
            if (yd) {
                if (event.getRawY() > xuan_y) {
                    xuan_j1 = angle({ x: xuan_x, y: xuan_y }, { x: event.getRawX(), y: event.getRawY() })
                    if (xuan_j1 > 0) {
                        sj_jd = xuan_j1//整数角度
                    } else {
                        sj_jd = Math.abs(-180 - xuan_j1)//负数角度转换为整数角度
                    }
                    if (sj_jd > 175) {//旋转上限175°
                        sj_jd = 175
                    } else if (sj_jd < 0) {//旋转下限0°
                        sj_jd = 0
                    }
                } else if (sj_jd < 5) {//角度为小于5 补全为0
                    sj_jd = 0
                } else if (sj_jd > 170) {//角度为170 补全为175
                    sj_jd = 175
                }
                sj_sj = Math.round(Math.abs(sj_jd - 175) / jd_s)//角度转换为对应秒数
                ui.run(function () {//准备操作ui视图
                    if (sj_sj % 60 < 10) {//秒钟小于10 补全为 01-09
                        ui.sj.setText(parseInt(sj_sj / 60) + ":0" + sj_sj % 60 + " / " + data_f + ":00")
                    } else {
                        ui.sj.setText(parseInt(sj_sj / 60) + ":" + sj_sj % 60 + " / " + data_f + ":00")
                    }
                    if (表示点) {//按下后 第一次调节 切换 提示文字视图
                        表示点 = false
                        ui.text_0.attr("alpha", 0)
                        ui.text_1.attr("alpha", 1)
                        ui.text_1.setTextColor(colors.rgb(57, 156, 57))
                    }
                    if (sj_sj > jd_sjb) {//往前调节
                        ui.text_1.setText("▷▷▷ +" + (sj_sj - jd_sjb) + "秒 ▷▷▷")
                        ui.text_1.setTextColor(colors.rgb(57, 156, 57))

                    } else {//往后调节
                        ui.text_1.setText("◁◁◁ -" + (jd_sjb - sj_sj) + "秒 ◁◁◁")
                        ui.text_1.setTextColor(colors.rgb(242, 37, 0))
                    }
                    //调节进度条
                    ui.jd.attr("rotation", sj_jd)
                })
            }
            return true;
        case event.ACTION_UP:                //手指弹起
            yd = false
            ui.run(function () {
                an = ObjectAnimator.ofFloat(ui.ts, "alpha", 0.3, 0);
                an.setDuration(500);
                an.start();
            })
    }
    return true;
});
