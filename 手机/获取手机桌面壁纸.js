"ui";
importClass(android.app.WallpaperManager)

ui.layout(
    <frame>
        <img id="img" w="*" h="*" />
    </frame>
);

var Manager = WallpaperManager.getInstance(context);
var Q = Manager.getDrawable();
ui.run(() => {
    ui.img.setImageBitmap(Q.bitmap);
});
