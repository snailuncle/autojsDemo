var list;
var childs;
var nickname = [];
var tmp;
toast("请打开群成员列表，在日志中查看输出");
Array.prototype.add = function(item) {
    //防止重复加入
    for (var i = 0; i < this.length; i++) {
        if (this[i] == item)
            return;
    }
    this.push(item)
    log(item);
}
waitForActivity("com.tencent.mobileqq.activity.TroopMemberListActivity")
sleep(1000);
while (true) {
    list = className("android.widget.AbsListView").findOne();
    childs = list.children();
    childs.forEach(function(child) {
        if (child == null)
            return;
        if (child.className() != "android.widget.FrameLayout")
            return;
        child.children().forEach(function(child1) {
            if (child1.className() != "android.widget.FrameLayout")
                return;
            try {
                tmp = child1.child(0).child(2).child(2).child(0).text();
                nickname.add(tmp)
                //这里会出错是因为有些群员没有群聊等级
                //这里我选择忽略不管
            } catch (e) {
                //log(e)
            }
        })
    })
    if (!list.scrollForward())
        break;
    //滑动到底，退出循环
    sleep(1000)
}