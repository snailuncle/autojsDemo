auto.waitFor();

KS();

function KS() {
    text("账单").waitFor();
    if(swipe(500, 500, 500, 1000, 800) == true){
        sleep(1000);
    }
    var i = 0;
    while (i < 15) {
        var k = desc("日期选择").findOne().parent().parent();
        if (k.childCount() < 3) {
            toast("清理完毕");
        } else {
            k.child(3).longClick();
            text("删除").waitFor();
            sleep(100);
            var sc = text("删除").findOne();
            sleep(100);
            click(sc.bounds().centerX(), sc.bounds().centerY());
        }
        sleep(150);
       
        i = i + 1;
    }
    KS();
}