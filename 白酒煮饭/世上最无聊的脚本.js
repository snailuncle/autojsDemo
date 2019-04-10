var 绘布 = function(view) {
    if (view.accessibilityClassName != "android.widget.ImageView") {
        throw "我报错";
    };
    this.width = view.getWidth();
    this.height = view.getHeight();
    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(this.bitmap);
    this.matrix = new android.graphics.Matrix();
    threads.start(new java.lang.Runnable(() => {
        while (true) {
            if (view.getWidth() != this.width || view.getHeight() != this.height) {
                this.width = view.getWidth();
                this.height = view.getHeight();
                this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
                this.canvas = new android.graphics.Canvas(this.bitmap);
            };
            sleep(500);
        };
    }));
    this.Draw = function() {};
    this.setDraw = function(fun) {
        if (typeof fun == "function") {
            this.Draw = fun;
        };
    };
    setInterval(() => {
        try {
            this.bitmap.eraseColor(0);
            this.canvas.setMatrix(this.matrix);
            this.Draw(this.canvas);
            ui.run(() => {
                view.setImageBitmap(this.bitmap);
            });
        } catch (e) {
            toastLog(e);
        };
    }, 50);
};

var window = floaty.rawWindow(
    <ImageView id="img"/>
);
window.setSize(-1, -1);
window.setTouchable(false);


var paint1 = new Paint;
//paint1.setTextAlign(Paint.Align.CENTER);
paint1.setStrokeWidth(2);
paint1.setStyle(Paint.Style.STROKE);
//.paint1.setStyle(Paint.Style.FILL);
paint1.setARGB(255, 255, 0, 0);
paint1.setTextSize(75);
var paint2 = new Paint;
//paint2.setTextAlign(Paint.Align.CENTER);
paint2.setStrokeWidth(2);
//paint2.setStyle(Paint.Style.STROKE);
paint2.setStyle(Paint.Style.FILL);
paint2.setARGB(255, 0, 255, 0);
paint2.setTextSize(75);



var x = 540,
    y = 540;
var path = new android.graphics.Path;
path.moveTo(x, y);


var ad = new 绘布(window.img);
ad.setDraw(function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    //canvas.setMatrix(matrix);
    canvas.translate(w/2-x,h/2-y);
    var R = Math.random() * 2 * Math.PI;
    var a = getsd(random(10, 100), RToxy(R));
    x += a[0];
    y += a[1];
    path.lineTo(x, y);
    canvas.drawPath(path, paint1);
    canvas.drawCircle(x,y,15, paint2);
    
});


function RToxy(R) {
    var x = Math.cos(R);
    var y = Math.sin(R);
    return [x, y];
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};