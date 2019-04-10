//获取网易云热歌榜的热评

count = 100; //获取歌的数目  <= 190

var comment = [];
var music_list = [];
path = "/sdcard/网易云热评.txt";

console.show();
toastLog("稍等稍等");
netease_hot(); //从热歌榜获取;

for (j = 0; j < count; j++) {
    url = "http://music.163.com/api/v1/resource/comments/R_SO_4_" + music_list[j].id + "?offset=0&rid=" + music_list[j].id + "&limit=1"
    log(j + ", " + music_list[j].name);
    var json = http.get(url).body.json();
    if (json.code == -460) {
        toast("频繁了，换个ip吧" + json.code);
        if (j == 0) {
            exit();
        } else {
            break;
        }
    }
    var hotlist = json.hotComments;
    for (i in hotlist) {
        comment.push({
            name: music_list[j].name,
            likecount: parseInt(hotlist[i].likedCount),
            content: hotlist[i].content
        });
    }
}

comment.sort(function(a, b) {
    return b.likecount - a.likecount;
});
txt = "";
for (i in comment) {
    txt += i + ", " + comment[i].content + "  —— " + comment[i].name + "   \t" + comment[i].likecount + "\n\n";
}
files.write(path, txt);
toast("已保存到" + path);
app.viewFile(path);

function netease_hot() {
    url = "https://y.xuelg.com/api.php?callback=jQuery111305475340320325446_1529241763034&types=playlist&id=3778678";
    hot = http.get(url).body.string();
    hot = hot.match(/"tracks":.*/g)[0];
    eval("hot = " + hot.substr(9).replace(/,"trackIds".*/g, ""));
    for (i in hot) {
        music_list.push({
            id: hot[i].id,
            name: hot[i].name + " - " + hot[i].ar[0].name,
        });

    }
    return hot;
}