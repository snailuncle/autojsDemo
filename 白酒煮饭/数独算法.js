importClass(java.util.HashMap);
//importClass(java.util.Map);
//网上抄袭
//嘻嘻  
var N = 3;
var x = [
    [0, 2, 0, 0, 0, 9, 0, 1, 0, 0],
    [5, 0, 6, 0, 0, 0, 3, 0, 9, 0],
    [0, 8, 0, 5, 0, 2, 0, 6, 0, 0],
    [0, 0, 5, 0, 7, 0, 1, 0, 0, 0],
    [0, 0, 0, 2, 0, 8, 0, 0, 0, 0],
    [0, 0, 4, 0, 1, 0, 8, 0, 0, 0],
    [0, 5, 0, 8, 0, 7, 0, 3, 0, 0],
    [7, 0, 2, 3, 0, 0, 4, 0, 5, 0],
    [0, 4, 0, 0, 0, 0, 0, 7, 0, 0]
];

functio(x, 0, 0);


　　
function functio(x, r, c) {
    if (r >= x.length) {
        show(x);
        return;
    }
    if (c == 0 && (r == x.length / N || r == x.length / N * 2 || r == x.length)) {
        if (!checkedbox(x, r)) {
            return;
        };

    }
    if (c >= x.length) {
        functio(x, r + 1, 0);
        return;
    }

    if (x[r][c] == 0) {
        for (var i = 1; i <= x.length; i++) {
            if (checked(x, r, c, i)) {
                x[r][c] = i;
                functio(x, r, c + 1);
                x[r][c] = 0;
            }
        }
    } else {
        functio(x, r, c + 1);
    }
}

function checkedbox(x, r) {
    for (var k = 0; k < x.length; k += x.length / N) {
        map = new HashMap();
        for (var i = r - N; i < r; i++) {
            for (var j = k; j < k + x.length / N; j++) {
                if (map.containsKey(x[i][j])) {
                    return false;
                }
                map.put(x[i][j], 1);
            }
        }

    }
    return true;
}

function checked(x, r, c, i) {
    for (var j = 0; j < x.length; j++) {
        if (x[j][c] == i) {
            return false;
        }
        if (x[r][j] == i) {
            return false;
        }
    }
    return true;
}

function show(x) {
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x.length; j++) {
            print(x[i][j] + " ");
        }
        print("\n");
    }
    print("\n");
}