var img = images.read("./ic_11.jpg");
var canvas = new Canvas(img);
var paint = new Paint;
var fx = 540;
var fy = 1200;
var sx = 168.66;
var sy = 84.66;
console.show();
var k = 0;

var f = {
    d: getADCdirection(img)
};
var x = 0,
    y = 0;
for (var i = 1; i < 11; i++) {
    var iA = isGird(img, fx + x - sx, fy - sy * i);
    var iB = isGird(img, fx + x + sx, fy - sy * i);
    var iC = isGird(img, fx + x, fy - sy * (i + 1));
    if (iA) {
        dr(fx + x - sx, fy - sy * i);
        toLeft(f);
        x -= sx;
    } else if (iB) {
        dr(fx + x + sx, fy - sy * i);
        toRight(f);
        x += sx;
    } else if (i == 2) {
        //自身遮挡。
        if (x < 0) {
            dr(fx + x + sx, fy - sy * i);
            toRight(f);
            x += sx;
        } else {
            dr(fx + x - sx, fy - sy * i);
            toLeft(f);
            x -= sx;
        };
    } else if (i == 1) {
        //终点?
        var iv = isEnd(img);
        if (iv === 1) {
            dr(fx + x + sx, fy - sy * i);
            toRight(f);
        } else if (iv === -1) {
            dr(fx + x - sx, fy - sy * i);
            toLeft(f);
        } else {
            break;
        };
    } else if (iC && i > 2) {
        //超出屏幕外的转向
        if (iA === 0) {
            dr(fx + x - sx, fy - sy * i);
            dr(fx + x, fy - sy * (i + 1));
            toLeft(f);
            toRight(f);
            i++;
        } else if (iB === 0) {
            dr(fx + x + sx, fy - sy * i);
            dr(fx + x, fy - sy * (i + 1));
            toRight(f);
            toLeft(f);
            i++;
        } else {
            break;
        };
    } else {
        break;
    };
}

var toImg = canvas.toImage();

images.save(toImg, "./cv_1.jpg", "jpg", 50);

function dr(x, y) {
    canvas.drawCircle(x, y, 30, paint);
};

function prs(x, y, s) {
    //press(x, y, s);
};


function toLeft(f) {
    if (f.d < 0) {
        log(f.d + "△");
        prs(867, 1596, 2)
    } else {
        log(f.d + "←");
        f.d = -1;
        prs(218, 1596, 2);

    };
    k++;
};

function toRight(f) {
    if (f.d > 0) {
        log(f.d + "△");
        prs(867, 1596, 2)
    } else {
        log(f.d + "→");
        f.d = 1;
        prs(218, 1596, 2);

    };
    k++;
};


function getADCdirection(img) {
    //{"x":563,"y":976,"color":-131587,"colorString":"#fffdfdfd"}
    //{"x":527,"y":965,"color":-8334876,"colorString":"#ff80d1e4"}
    if (images.pixel(img, fx + 20, 976) < images.pixel(img, fx - 20, 976)) {
        log("◢");
        return -1;
    } else {
        log("◣");
        return 1;
    };
    return 0;
};




function isGird(img, x, y, threshold) {
    threshold = threshold || 16;
    var data = {
        "x": 540,
        "y": 1200,
        "color": "#fffdf1f1",
        "ary": [
            [30, 0, "#ffef314a"],
            [-30, 0, "#ffef3d55"],
        ]
    };
    if (x < 0 || x > img.width) {
        return 0;
    };
    if (images.detectsColor(img, data.color, Math.floor(x), Math.floor(y), threshold)) {
        for (var i = 0; i < data.ary.length; i++) {
            if (!images.detectsColor(img, data.ary[i][2], Math.floor(x + data.ary[i][0]), Math.floor(y + data.ary[i][1]), threshold)) {
                return false;
            };
        };
    } else {
        return false;
    };
    return true;
};

function isEnd(img) {
    //{"x":711,"y":1066,"color":-269725,"colorString":"#fffbe263"}
    //171,1066;→
//{"x":253,"y":1067,"color":-139421,"colorString":"#fffddf63"}
//287,1066;←
    if (images.detectsColor(img, "#fffbe263", Math.floor(fx - 287), Math.floor(1066), 16)) {
        return -1;
    } else if (images.detectsColor(img, "#fffbe263", Math.floor(fx + 171), Math.floor(1066), 16)) {
        return 1;
    } else {
        return 0;
    };
};
