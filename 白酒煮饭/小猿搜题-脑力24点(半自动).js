"auto";
console.show();

var window = floaty.window(
    <frame><linear>
        <button id="action" text="计算" w="50" h="40" color="#ffffff" bg="#66000000" />
    </linear> </frame>
);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                console.hide();
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                main();
            }
            return true;
    }
    return true;
});
setInterval(() => {}, 1000);

function main() {
    if(currentActivity()=="com.fenbi.android.solar.game.activity.PointGamePKActivity"){
    var aa = new Array();
    var obj_text = textMatches(".*");
    for (let i = 5; i < 9; i++) {
        aa.push(obj_text.find().get(i).text());
    }
    console.info(aa);
    var typestate
    var exists = false
    var numbervalue = new Array();
    var evaltype = new Array();
    var jisuanfua = new Array();
    var jisuanfub = new Array();
    var jisuanfuc = new Array();
    var jisuanfud = new Array();

    for (i = 0; i < 4; i++) {
        if (aa[i] == '') {
            alert('必须把四个数字输全')
            return
        } else {
            numbervalue[i] = aa[i];
        }
    }
    evaltype[0] = '+'
    evaltype[1] = '-'
    evaltype[2] = '*'
    evaltype[3] = '/'
    for (t = 0; t < 4; t++) {
        jisuanfua[t] = evaltype[t]
        jisuanfub[t] = evaltype[t]
        jisuanfuc[t] = evaltype[t]
    }
    for (x = 0; x < 4; x++) {
        if (exists == true) {
            return
        }
        for (y = 0; y < 4; y++) {
            if (exists == true) {
                return
            }
            for (z = 0; z < 4; z++) {
                for (i = 0; i < 4; i++) {
                    for (j = 0; j < 4; j++) {
                        if (j == i) {
                            continue
                        } else {
                            for (k = 0; k < 4; k++) {
                                if ((k == i) || (k == j)) {
                                    continue
                                } else {
                                    for (l = 0; l < 4; l++) {
                                        if ((l == i) || (l == j) || (l == k)) {
                                            continue
                                        } else {
                                            typestate = '(' + numbervalue[i] + jisuanfua[x] + numbervalue[j] + ')' + jisuanfub[y] + '(' + numbervalue[k] + jisuanfuc[z] + numbervalue[l] + ')'
                                            if (checkvalue(typestate) == 24) {
                                                log(typestate);
                                                exists = true
                                                break
                                            } else {
                                                typestate = '(' + '(' + numbervalue[i] + jisuanfua[x] + numbervalue[j] + ')' + jisuanfub[y] + numbervalue[k] + ')' + jisuanfuc[z] + numbervalue[l]
                                                if (checkvalue(typestate) == 24) {
                                                    log(typestate);
                                                    exists = true
                                                    break
                                                } else {
                                                    typestate = '(' + numbervalue[i] + jisuanfua[x] + '(' + numbervalue[j] + jisuanfub[y] + numbervalue[k] + ')' + ')' + jisuanfuc[z] + numbervalue[l]
                                                    if (checkvalue(typestate) == 24) {
                                                        log(typestate);
                                                        exists = true
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (exists != 'true') {
        toastLog = '这四个数不存在可能,请重新输入'
    }
    }
    return toastLog("你还没有进入游戏呢");
}

function checkvalue(a) {
    var b
    b = eval(a)
    return (b)
}