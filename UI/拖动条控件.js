/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2019-07-01 23:41:57
 * @Version: Auto.Js Pro
 * @Description: 
 * @LastEditors: 大柒
 * @LastEditTime: 2019-07-02 07:28:48
 */
"ui";

importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorSet);
importClass(android.view.animation.BounceInterpolator);
//储存argb颜色 A,R,G,B,值
var colorData = {
    A: 0,
    R: 0,
    G: 0,
    B: 0
}
//dp和px之间转换
var scale = context.getResources().getDisplayMetrics().density;
var px2dp = function (px) {
    return Math.floor(px / scale + 0.5);
}
var dp2px = function (dp) {
    return Math.floor(dp * scale + 0.5);
}

//自定义控件 seekbar拖动条
var seekbarLayout = function () {
    util.extend(seekbarLayout, ui.Widget);
    function seekbarLayout() {
        ui.Widget.call(this);
        this.defineAttr("color", (view, attr, value, defineSetter) => {
            this.setView(view);
            view.btn_seekbar_color.attr("src", value);
            view.btn_seekbar_bg_color.attr("src", "#50" + value.replace(/#/g, ""));
            view.seekbar_qj.attr("cardBackgroundColor", value);
            view.scale_bottom_bg.attr("cardBackgroundColor", value);
            view.scale_bottom_bg_left.attr("cardBackgroundColor", value);
            view.scale_bottom_bg_right.attr("cardBackgroundColor", value);
            view.seekbar_bg.attr("cardBackgroundColor", "#50" + value.replace(/#/g, ""));
            view.scale_left_src.attr("tint", value);
            view.scale_right_src.attr("tint", value);
            view.scale_top_src.attr("tint", value);
        });
        this.defineAttr("title", (view, attr, value, defineSetter) => {
            view.scale_bottom_title.setText(value);
            view.title_bg.attr("visibility", "visible");
        });
        this.defineAttr("subTitle", (view, attr, value, defineSetter) => {
            view.scale_top_title.setText(value);
        });
        this.defineAttr("scaleIconVisibility", (view, attr, value, defineSetter) => {
            let e;
            value == "true" ? e = "visible" : e = "gone";
            view.scale_right.attr("visibility", e);
            view.scale_left.attr("visibility", e);
        });
        this.defineAttr("max", (view, attr, value, defineSetter) => {
            this.setMax(value);
        })
        this.defineAttr("progress", (view, attr, value, defineSetter) => {
            view.scale_top_text.setText(value);
            this.setProgress(value);
        });
        this.defineAttr("onClick", (view, name, defineSetter) => {
            return this._onClick;
        }, (view, name, value, defineSetter) => {
            this._onClick = value;
        });
        //自定义属性 
        this.defineAttr("progressChanged")
        this.defineAttr("view")
        this.defineAttr("index")
    }

    //初始化事件
    seekbarLayout.prototype.setView = function (view) {
        this.view = view;
        //设置默认值为0
        this.setIndex(0);
        let id = setInterval(() => {
            if (view.seekbar_bg.getLeft()) {
                clearInterval(id);
                //初始化 颜色参数
                colorData[view.scale_top_title.text()] = this.index;
                colorPreview();
                //加载 事件触发
                this.OnProgressChanged();
            }
        }, 5)
    }

    //设置进度条当前值
    seekbarLayout.prototype.setIndex = function (value) {
        this.index = value;
    }

    //设置进度条最大值
    seekbarLayout.prototype.setMax = function (value) {
        this.view.scale_right_text.setText(value);
        this.max = value;
        return this.max;
    }

    //设置进度值
    seekbarLayout.prototype.setProgress = function (value) {
        let id = setInterval(() => {
            if (this.view.seekbar_bg.getLeft()) {
                clearInterval(id);
                this.left = this.view.seekbar_bg.getLeft() - dp2px(16);
                this.right = this.view.seekbar_bg.getRight() - dp2px(16);
                this.scale = (this.right - this.left) / this.max;
                this.setIndex(value);
                this.view.btn_seekbar.setTranslationX(this.scale * value);
                this.view.seekbar_qj.attr("width", parseInt(px2dp(this.scale * value)));
            }
        }, 5);
    }

    //事件触发
    seekbarLayout.prototype.OnProgressChanged = function () {
        let view = this.view;
        let x = dp2px(32);
        let y = dp2px(6);
        let left = view.seekbar_bg.getLeft() - dp2px(16);
        let right = view.seekbar_bg.getRight() - dp2px(16);
        let max = this.max;
        let scale = (right - left) / max;
        let eventX = 0;
        let index = this.index;
        let _index = 0;
        let onClick = this._onClick;
        //读取 subTitle 值 当进度发生改变时 更改colorData对应值 并触发colorPreview()函数
        view.btn_seekbar_bg_color.setOnTouchListener(function (_view, event) {
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    //动画
                    animationY = ObjectAnimator.ofFloat(view.animation_img, "translationY", 0, -y);
                    animationScaleX = ObjectAnimator.ofFloat(view.btn_seekbar_bg_color, "scaleX", 0.5, 1);
                    animationScaleY = ObjectAnimator.ofFloat(view.btn_seekbar_bg_color, "scaleY", 0.5, 1);
                    set = new AnimatorSet();
                    set.playTogether([animationY, animationScaleX, animationScaleY]);
                    set.setDuration(200);
                    set.start();
                    //按钮半透明背景 透明度设为1
                    view.btn_seekbar_bg_color.attr("alpha", 1);
                    return true
                case event.ACTION_MOVE:
                    //手指触摸的X值
                    eventX = event.getRawX() - x;
                    if (eventX < left) {
                        eventX = left;
                    } else if (right < eventX) {
                        eventX = right;
                    };
                    _index = parseInt(eventX / scale)
                    //进度发生改变 触发
                    if (index != _index) {
                        index = _index;
                        view.scale_top_text.setText("" + index);
                        eval(onClick);
                    };
                    //设置 进度条指示器位置
                    view.btn_seekbar.setTranslationX(eventX);
                    //设置 一级进度条宽度
                    view.seekbar_qj.attr("width", parseInt(px2dp(eventX)));
                    return true
                case event.ACTION_UP:
                    //动画
                    animationY = ObjectAnimator.ofFloat(view.animation_img, "translationY", -y, 0);
                    animationScaleX = ObjectAnimator.ofFloat(view.btn_seekbar_bg_color, "scaleX", 1, 0.5);
                    animationScaleY = ObjectAnimator.ofFloat(view.btn_seekbar_bg_color, "scaleY", 1, 0.5);
                    set = new AnimatorSet();
                    set.playTogether([animationY, animationScaleX, animationScaleY]);
                    set.setDuration(200);
                    set.start();
                    //定时器 在动画结束后 将半透明按钮背景大小恢复 透明度设为0
                    setTimeout(() => {
                        view.btn_seekbar_bg_color.attr("alpha", 0)
                        view.btn_seekbar_bg_color.setScaleX(1);
                        view.btn_seekbar_bg_color.setScaleY(1);
                    }, 250)
                    return true
            }
            return true
        });
        return true
    }

    seekbarLayout.prototype.render = function () {
        return (
            <frame w="*" margin="10 0">
                <vertical marginTop="45">
                    <horizontal id="title_bg" w="auto" h="40" marginTop="-20" layout_gravity="center_horizontal" visibility="gone">
                        <card id="scale_bottom_bg_left" h="30" w="30" rotation="45" margin="10 5 0 0"
                            cardCornerRadius="0" cardElevation="0" foreground="?selectableItemBackground" />
                        <card id="scale_bottom_bg" w="auto" h="40" margin="-15 0 0 0" layout_gravity="center_horizontal"
                            cardCornerRadius="0" cardElevation="0" foreground="?selectableItemBackground" >
                            <text id="scale_bottom_title" w="auto" h="auto" margin="16 2"
                                textSize="12" textStyle="bold" textColor="#ffffff" layout_gravity="center|bottom" />
                        </card>
                        <card id="scale_bottom_bg_right" h="30" w="30" rotation="45" margin="-15 5 10 0"
                            cardCornerRadius="0" cardElevation="0" foreground="?selectableItemBackground" />
                    </horizontal>
                </vertical>
                <frame marginTop="43" >
                    <card id="seekbar_bg" margin="16 0" w="*" h="2"
                        cardCornerRadius="1" cardElevation="0" foreground="?selectableItemBackground">
                        <card h="*" w="auto" id="seekbar_qj" />
                    </card>
                    <frame id="scale_left" w="32" h="32" marginTop="6" >
                        <img id="scale_left_src" src="@drawable/ic_label_black_48dp" rotation="-90" />
                        <text id="scale_left_text" w="auto" h="auto" text="0" textColor="#ffffff" textSize="8sp" layout_gravity="center" />
                    </frame>
                    <frame id="scale_right" w="32" h="32" marginTop="6" layout_gravity="right" >
                        <img id="scale_right_src" src="@drawable/ic_label_black_48dp" rotation="-90" />
                        <text id="scale_right_text" w="auto" h="auto" textColor="#ffffff" textSize="8sp" layout_gravity="center" />
                    </frame>
                </frame>
                <frame w="auto" h="56" id="btn_seekbar">
                    <frame id="animation_img" w="32" h="32" marginTop="6">
                        <img id="scale_top_src" w="32" src="@drawable/ic_label_black_48dp" rotation="90" />
                        <vertical w="auto" h="auto" layout_gravity="center">
                            <text id="scale_top_text" w="auto" h="auto" text="0" textColor="#ffffff" textSize="8sp" layout_gravity="center" />
                            <text id="scale_top_title" w="auto" h="auto" layout_gravity="center"
                                textStyle="bold" textColor="#ffffff" textSize="8sp" />
                        </vertical>
                    </frame>
                    <frame w="24" h="24" layout_gravity="center|bottom">
                        <img id="btn_seekbar_bg_color" w="24" h="24" circle="true" layout_gravity="center" alpha="0" />
                        <img id="btn_seekbar_color" w="12" h="12" circle="true" layout_gravity="center" />
                    </frame>
                </frame>
            </frame>
        )
    }

    ui.registerWidget("seekbar-layout", seekbarLayout);
    return seekbarLayout;
}()

ui.layout(
    <vertical>
        <img id="colorImg" w="60" h="60" src="#ffffff" margin="0 10" borderWidth="1" circle="true" scaleType="fitXY" layout_gravity="center_horizontal" />
        <seekbar-layout color="#000000" max="255" title="A通道" subTitle="A" onClick="colorPreview('A',index)" progress="255" />
        <seekbar-layout color="#ff0000" max="255" title="R通道" subTitle="R" onClick="colorPreview('R',index)" />
        <seekbar-layout color="#00c853" max="255" title="G通道" subTitle="G" onClick="colorPreview('G',index)" scaleIconVisibility="false" />
        <seekbar-layout color="#2962ff" max="255" title="B通道" subTitle="B" onClick="colorPreview('B',index)" scaleIconVisibility="false" />
        <horizontal marginTop="10">
            <text text="16进制颜色: " />
            <text id="colorStr" />
        </horizontal>
        <horizontal>
            <text text="     整数颜色: " />
            <text id="parseColor" />
        </horizontal>
    </vertical>
)

function colorPreview(index, value) {
    colorData[index] = value;
    var a = colorData;
    var parseColor = colors.argb(a.A, a.R, a.G, a.B);
    var colorStr = colors.toString(parseColor);
    try {
        ui.run(() => {
            ui.colorImg.attr("src", colorStr);
            ui.colorStr.setText(colorStr);
            ui.parseColor.setText("" + parseColor);
        })
    } catch (error) {
    }
}
