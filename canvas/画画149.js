"ui";
ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
        <horizontal h="auto">
        <button id="but_q" layout_weight="1" h="auto" text="清空"/>
        <button id="but_c" layout_weight="1" h="auto" text="撤销"/>
        </horizontal>
    </vertical>
);

threads.start(function() {
    //console.show();
});

var canvasAD = new canvasDraw(ui.canvas);

ui.but_q.click(function(){
    canvasAD.linesAry=new Array;
    });
ui.but_c.click(function(){
    canvasAD.linesAry.shift();
    });

function canvasDraw(canvasView) {
    this.linesAry = new Array;
    this.paint = new Paint;
    //this.paint.setTextAlign(Paint.Align.CENTER);
    this.paint.setStrokeWidth(5);
    this.paint.setStyle(Paint.Style.STROKE);
    this.paint.setARGB(255, 0, 0, 0);
    this.paint.setTextSize(75);


    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        var AX = w / 2;
        var AY = h / 2;
        //this.paint.setStyle(Paint.Style.FILL);
        //this.drawRects(canvas, this.rectsAry, this.pointsMatrix, this.paint);
        this.paint.setStyle(Paint.Style.STROKE);
        this.paint.setColor(colors.BLACK);
        for (let i = 0; i < this.linesAry.length; i++) {
            canvas.drawPath(this.linesAry[i], this.paint);
        };
        if (this.TouchPointStart.length) {
            for (let i = 0; i < this.TouchPointRecord.length; i++) {
                canvas.drawPath(this.TouchPointRecord[i], this.paint);
            };
            return 
        this.paint.setColor(colors.RED);
            for (let i = 0; i < this.TouchPointStart.length; i += 2) {
                let X = this.TouchPointStart[i];
                let Y = this.TouchPointStart[i + 1];
                let x = this.TouchPointCurrent[i];
                let y = this.TouchPointCurrent[i + 1];
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                let a = X - (x - X);
                let b = Y - (y - Y);
                canvas.drawLine(X, Y, x, y, this.paint);
                canvas.drawLine(X, Y, a, b, this.paint);
                canvas.drawText(String("A"), X, Y, this.paint)
                canvas.drawText(String("B"), x, y, this.paint);
                canvas.drawCircle(X, Y, 10, this.paint);
                canvas.drawCircle(x, y, 10, this.paint);
                canvas.drawCircle(a, b, 10, this.paint);
            };
        };

    });


    this.resetPoints = function() {
        this.rectsAry = this.pointsToRect(this.rectPoints(this.pointsRect.width(), this.pointsRect.height(), this.distance), this.distance, this.distance * 0.1);
    };

    this.countPoints = function(ary) {
        //运算点。
        return this.matrixPoints(this.pointsInvertMatrix, ary);
    };

    this.main = function(ary, ary2) {
        let Ary = this.countPoints(ary);
        //log(Ary);
        let x = Ary[0],
            y = Ary[1];
        for (let i = 0; i < ary2.length; i++) {
            if (ary2[i].rect.contains(x, y)) {
                return ary2[i];
            };
        };
    };
    this.main2 = function(ary, ary2) {
        let Ary = this.countPoints(ary);
        let x = Ary[0],
            y = Ary[1];
        for (let i = 0; i < ary2.length; i++) {
            if (ary2[i].rect.contains(x, y)) {
                if (!this.kg) {
                    if (ary2[i].color == colors.WHITE) {
                        this.Color = colors.BLACK;
                    } else {
                        this.Color = colors.WHITE;
                    };
                    this.kg = true;
                };
                if (ary2[i].color != this.Color) {
                    ary2[i].color = this.Color
                };
            };
        };
    };

    this.TouchPointRecord = new Array;
    this.TouchPointStart = new Array;
    this.TouchPointCurrent = new Array;


    canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    for (let i = 0; i < PC; i++) {
                        let id = event.getPointerId(i);
                        let X = event.getX(i);
                        let Y = event.getY(i);
                        this.TouchPointCurrent[i * 2] = X;
                        this.TouchPointCurrent[i * 2 + 1] = Y;
                        // this.Segmenting([this.TouchPointRecord[i][0],this.TouchPointRecord[i][1],X,Y],(X,Y)=>{this.main2([X, Y], this.rectsAry);});
                        this.TouchPointRecord[i].lineTo(X, Y);
                    };



                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.TouchPointStart = new Array;
                    this.TouchPointCurrent = new Array;

                    this.TouchPointRecord = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            //第一个手指按下。
                            //log("down");
                            this.TouchPointStart.splice(I * 2, 0, X, Y);
                            this.TouchPointCurrent.splice(I * 2, 0, X, Y);
                            var path = new android.graphics.Path;
                            path.moveTo(X, Y);
                            this.TouchPointRecord.splice(I, 0, path);
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            //log("up");
                            this.TouchPointStart = new Array;
                            this.TouchPointCurrent = new Array;
                            this.linesAry.unshift(this.TouchPointRecord[I]);
                            this.TouchPointRecord = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            //log("POINTER_DOWN");
                            this.TouchPointStart.splice(I * 2, 0, X, Y);
                            this.TouchPointCurrent.splice(I * 2, 0, X, Y);
                            var path = new android.graphics.Path;
                            path.moveTo(X, Y);
                            this.TouchPointRecord.splice(I, 0, path);

                            break;
                        case event.ACTION_POINTER_UP:
                            //log("POINTER_UP");
                            this.TouchPointStart.splice(I * 2, 2);
                            this.TouchPointCurrent.splice(I * 2, 2);
                            this.linesAry.unshift(this.TouchPointRecord[I]);

                            this.TouchPointRecord.splice(I, 1);
                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);

        };

        return true;
    }));

    this.matrixPoints = function(imgMatrix, ary) {
        var ary = this.toJavaArray("float", ary);
        imgMatrix.mapPoints(ary);
        return this.toJsArray(ary);
    };
    this.toJavaArray = function(type, ary) {
        //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
        var Ary = util.java.array(type, ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.toJsArray = function(ary) {
        var Ary = new Array(ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };

    this.Segmenting = function(A, B) {
        var sx = A[2] - A[0],
            sy = A[3] - A[1];
        var sd = this.weiyi([sx, sy]) / this.distance * 2;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            //sleep(5);
            B(A[0] + x, A[1] + y);
        }
        B(A[2], A[3]);
    }


    this.反色 = function(color) {
        return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
    };

    this.SolvePos = function(a, b, r, k, c) {
        let a1 = k * k + 1;
        let b1 = 2 * k * (c - b) - 2 * a;
        let c1 = a * a + (c - b) * (c - b) - r * r;
        let delta = b1 * b1 - 4 * a1 * c1;
        let result = [];
        if (delta == 0) {
            let x0 = Math.sqrt(delta);
            let x1 = -b1 / (2 * a1);
            let y1 = k * x1 + c;
            result.push(x1, y1);
        } else if (delta > 0) {
            let x0 = Math.sqrt(delta);
            let x1 = (-b1 - x0) / (2 * a1);
            let y1 = k * x1 + c;
            result.push(x1, y1);
            let x2 = (-b1 + x0) / (2 * a1);
            let y2 = k * x2 + c;
            result.push(x2, y2);
        }
        return result;
    };

    this.weiyi = function(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };

    this.kdfx = function(Y) {
        var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
        var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
        return {
            x: x,
            y: y
        };
    };

    this.ydfx = function(obj) {
        var ary = this.getsd(1, [obj.x, obj.y]);
        var x = ary[0],
            y = ary[1];
        var Y = Math.asin(y) / (2 * Math.PI) * 360;
        if (x < 0) {
            Y = 180 - Y;
        };
        return Y;
    };

    this.getsd = function(s, ary) {
        var sum = this.weiyi(ary);
        var S = s / sum;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };

    this.XYTOAB = function(x, y, x1, y1) {
        var A = (y1 - y) / (x1 - x);
        var B = y - A * x;
        return [A, B];
    };

    this.rectPoints = function(w, h, s, g) {
        //宽,高,点距,是否边框
        let sx = Math.floor(w / s / 2) + 1,
            sy = Math.floor(h / s / 2) + 1;
        //以中心基本点正负循环总量    
        let cw = w / 2,
            ch = h / 2;
        let Ary = new Array;
        if (g) {
            //横向
            for (let ix = 0; ix < sx; ix++) {
                if (ix == 0) {
                    Ary.push(0, -ch, 0, ch);
                } else {
                    Ary.push(-ix * s, -ch, ix * s, -ch, -ix * s, ch, ix * s, ch);
                };
            };
            //横向边框线
            for (let iy = 0; iy < sy; iy++) {
                if (iy == 0) {
                    Ary.push(-cw, 0, cw, 0);
                } else {
                    Ary.push(-cw, -iy * s, -cw, iy * s, cw, -iy * s, cw, iy * s);
                };
            };
            //纵向边框线
        } else {
            //内部所有点

            for (let iy = 0; iy < sy; iy++) {
                for (let ix = 0; ix < sx; ix++) {
                    if (iy == 0 && ix == 0) {
                        Ary.push(0, 0);
                    } else {
                        let AX = -ix * s;
                        let AY = -iy * s;
                        let BX = ix * s;
                        let BY = iy * s;
                        if ((iy == 0 && ix != 0) || (iy != 0 && ix == 0)) {
                            Ary.push(AX, AY, BX, BY);
                        } else {
                            Ary.push(AX, AY, BX, BY, AX, BY, BX, AY);
                        };
                    };
                };
            };
        };
        return Ary;
    };

    this.pointsToRect = function(ary, s, c) {
        var Ary = new Array;
        var S = (s - c) / 2;
        for (let i = 0; i < ary.length; i += 2) {
            let x = ary[i],
                y = ary[i + 1];
            Ary.push({
                color: colors.WHITE,
                rect: new android.graphics.RectF(x - S, y - S, x + S, y + S)
            });
        };
        return Ary;
    };






};




/*
int getPointerCount() //手势操作所包含的点的个数
int findPointerIndex(int pointerId) //根据pointerId找到pointer在MotionEvent中的index
int getPointerId(int pointerIndex) //根据MotionEvent中的index返回pointer的唯一标识
float getX(int pointerIndex) //返回手势操作点的x坐标
float getY(int pointerIndex) //返回手势操作点的y坐标
final int getActionMasked () //获取特殊点的action 
final int getActionIndex()//  用来获取当前按下／抬起的点的标识。如果当前没有任何点抬起／按下，该函数返回0。比如事件类型为ACTION_MOVE时，该值始终为0。

*/