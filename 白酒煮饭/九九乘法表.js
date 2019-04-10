function 循环(i, n) { //数位长度, 要转换的数
    var sz = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var c = sz.length;
    if (i < 0) return;
    for (var a = 0, o = n; a < i; a++) {
        o = parseInt(o / c);
    }
    D += sz[o % c];
    循环(--i, n);
}

var D = []
循环(9, 556);
log(D);
/*
//你敢运行一下被注释的（可怕的）代码吗！
for (var k = 0; k < 99; k++) {
    var D = []
    循环(9, k);
    log(D)
}*/