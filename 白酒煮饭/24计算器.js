//"auto";
console.show();
var typestate
var exists = false
var numbervalue = new Array();
var evaltype = new Array();
var jisuanfua = new Array();
var jisuanfub = new Array();
var jisuanfuc = new Array();
var shuzicunf = []; // = new Array();


while (true) {
    var n = console.rawInput("请输入数字:");
    if (n) {
        main();
        qwe();
    }
}

function qwe() {
    log(shuzicunf);
}

function main(n) {
    //var aa = n.split(" ");
    //console.info(n);
    var aa = ["9", "3", "7", "1"];

    //console.info(shuzicunf);
    for (i = 0; i < 4; i++) {
        if (aa[i] == '') {
            alert('必须把四个数字输全')
            return
        } else {
            //log(aa[i]);
            numbervalue[i] = aa[i];
        }
    }
    //数字排列有4!=12个情况 
    //组合方式一:无括号 a+b+c+d 
    //组合方式二:有一个括号 (a+b)+c+d;a+(b+c)+d;a+b+(c+d); 
    //组合方式三:有二个括号 (a+b)+(c+d);((a+b)+c)+d 
    //总结下来都可以认为是存在两个括号的情况 
    //typestate='('+numbervalue[i] + jisuanfua[x] + numbervalue[j] + ')'+jisuanfub[y] +'('+ numbervalue[k] + jisuanfuc[z] + numbervalue[l]+')' 
    //typestate='('+'('+numbervalue[i] + jisuanfua[x] + numbervalue[j] +')'+ jisuanfub[y] + numbervalue[k] +')'+ jisuanfuc[z] + numbervalue[l] 
    //执行组合方式    //符号种类 + - * /  
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
                ///下面开始组合方式 
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
                                                shuzicunf = typestate;
                                                exists = true
                                                break
                                            } else {
                                                typestate = '(' + '(' + numbervalue[i] + jisuanfua[x] + numbervalue[j] + ')' + jisuanfub[y] + numbervalue[k] + ')' + jisuanfuc[z] + numbervalue[l]
                                                if (checkvalue(typestate) == 24) {
                                                    shuzicunf = typestate;
                                                    exists = true
                                                    break
                                                } else {
                                                    typestate = '(' + numbervalue[i] + jisuanfua[x] + '(' + numbervalue[j] + jisuanfub[y] + numbervalue[k] + ')' + ')' + jisuanfuc[z] + numbervalue[l]
                                                    if (checkvalue(typestate) == 24) {
                                                        shuzicunf = typestate;
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
                //结束组合方式 
            }
        }
    }
    if (exists != 'true') {
        toastLog = '这四个数不存在可能,请重新输入'
    }
}

function checkvalue(a) {
    var b
    b = eval(a)
    return (b)
}