"ui";
//自己换路经啊
var path="/storage/emulated/0/tencent/QQfile_recv/-1563378418.gif";
ui.layout(
    <frame>
        <img id="img" w="*" h="*"/>
    </frame>
);


var movie=new android.graphics.Movie.decodeFile(path);
var ji=0;
var duration=movie.duration();
log(duration);


var wad=new 绘布(ui.img);

wad.setDraw(function(canvas){
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    movie.setTime(Math.floor(ji*20%duration));
    ji++;
    movie.draw(canvas,0,0);
});



function 绘布(view) {
    if (view.accessibilityClassName != "android.widget.ImageView") {
        throw "我报错";
    };
    this.width = view.getWidth();
    this.height = view.getHeight();
    this.matrix = new android.graphics.Matrix();
    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(this.bitmap);
    setInterval(() => {
        if (view.getWidth() != this.width || view.getHeight() != this.height) {
            this.width = view.getWidth();
            this.height = view.getHeight();
            this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
            this.canvas = new android.graphics.Canvas(this.bitmap);
        };
    }, 500);
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