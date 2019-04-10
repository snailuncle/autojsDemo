"ui";

var url2 = "https://www.autojs.org/assets/uploads/files/1540386817060-918021-20160416200702191-185324559.jpg";
var path="/sdcard/11/11.jpg";
var logo = null;
var currentImg = null;
var list ="/sdcard/12/";
var all=["11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg"];
var asd=null;

events.on("exit", function(){
    if(logo != null){
        logo.recycle();
    }
    if(currentImg != null){
        currentImg.recycle();
    }
});

ui.layout(
    <vertical>
        <img id="img" w="250" h="250" src="file:///{{path}}" />
        <scroll>
            <vertical>
                <button id="concat" text="拼接" />
                </vertical>
        </scroll>
    </vertical>
);

//把一张图片设置到图片控件中
function setImage(img) {
    ui.run(() => {
        ui.img.setImageBitmap(img.bitmap);
        var oldImg = currentImg;
        //不能立即回收currentImg，因为此时img控件还在使用它，应该在下次消息循环再回收它
        ui.post(()=>{
            if(oldImg != null){
                oldImg.recycle();
            }
        });
        currentImg = img;
    });
}

//启动一个处理图片的线程
var imgProcess = threads.start(function () {
    setInterval(() => { }, 1000);
});

//处理图片的函数，把任务交给图片处理线程处理
function processImg(process) {
    imgProcess.setTimeout(() => {
        if (logo == null) {
            //logo = images.load(url);
            logo = images.read(path);
        }
        //处理图片
        var result = process(logo);
        //把处理后的图片设置到图片控件中
        setImage(result);
    }, 0);
}

ui.concat.on("click", () => {
    processImg(img => {
        if(currentImg == null){
            toast("请先点击其他按钮，再点击本按钮");
            return img.clone();
        }
        for (let i in all){
        //把currentImg拼接在img右边
        images.concat(img, currentImg, "right");
        
        
        return images.concat(img, currentImg, "right");
    });
});
