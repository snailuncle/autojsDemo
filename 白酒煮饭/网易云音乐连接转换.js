/*
把网易云音乐复制的链接输入到这个脚本
就可以在浏览器中打开
配合特殊浏览器可以免费下载音乐
*/
j = ["电台主页", "单独电台", "歌单", "歌曲"];
p = ["radio?id=", "/program/", "/playlist/", "/song/"];
a = dialogs.rawInput("连接");
for (var i in p) {
  q = a.indexOf(p[i]);
  if (q != (-1)) {
    break;
  };
};
switch (i * 1) {
  case 0:
    log(j[0])
    b = a.split("id=")[1].split("&")[0];
    c = "http://music.163.com/m/djradio?id=" + b;
    setClip(c);
    break;
  case 1:
    log(j[1])
    b = a.split("gram/")[1].split("/")[0];
    c = "http://music.163.com/m/program?id=" + b + "&autoplay=true";
    setClip(c);
    break;
  case 2:
    log(j[2])
    b = a.split("list/")[1].split("/")[0];
    c = "http://music.163.com/m/playlist?id=" + b;
    setClip(c);
    break;
  case 3:
    log(j[3])
    b = a.split("song/")[1].split("/?")[0];
    c = "http://music.163.com/m/song?id=" + b;
    setClip(c);
    break;
  default:
    alert("应该修改脚本了");
}




















//