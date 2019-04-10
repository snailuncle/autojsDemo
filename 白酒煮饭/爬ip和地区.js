
let html = http.get('http://www.xicidaili.com/nn/1',{"headers":{"Host":"www.xicidaili.com","Connection":"keep-alive","Upgrade-Insecure-Requests":"1","User-Agent":"Mozilla/5.0 (Linux; Android 9; MI 8 UD Build/PKQ1.180729.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","dnt":"1","Accept-Language":"zh-CN,en-US;q=0.9","X-Requested-With":"mark.via"}}).body.string();
//log(html);
//提取页数
let Page = cutstr(html, 'span> <a href="/nn/', '">', 1,3);
//log(Page);
let ht = cutstr(html, '<td>', '/td>', 1, 1000);
//地区名字列表，遍历时，length-1
let GetName = cutstr(ht, '">', '/a>', 1, 200).split("<");
//log(GetName);
//提取IP
let GetIp = ht.match(/(\d+\.){3}\d+/g);
//log(GetIp);
var Pg = GetPage();
var i = 1;

while(i < Pg) {
    let html = http.get('http://www.xicidaili.com/nn/' + i,{"headers":{"Host":"www.xicidaili.com","Connection":"keep-alive","Upgrade-Insecure-Requests":"1","User-Agent":"Mozilla/5.0 (Linux; Android 9; MI 8 UD Build/PKQ1.180729.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","dnt":"1","Accept-Language":"zh-CN,en-US;q=0.9","X-Requested-With":"mark.via"}}).body.string();
    let ht = cutstr(html, '<td>', '/td>', 1, 1000);
    let GetName = cutstr(ht, '">', '/a>', 1, 100).split("<");
    let GetIp = ht.match(/(\d+\.){3}\d+/g);
    for (let i = 0; i < GetName.length - 1; i++) {
        log(GetIp[i] + "   " + GetName[i]);
    }
}


function GetPage() {
    let html=http.get('http://www.xicidaili.com/nn/',{"headers":{"Host":"www.xicidaili.com","Connection":"keep-alive","Upgrade-Insecure-Requests":"1","User-Agent":"Mozilla/5.0 (Linux; Android 9; MI 8 UD Build/PKQ1.180729.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","dnt":"1","Accept-Language":"zh-CN,en-US;q=0.9","X-Requested-With":"mark.via"}}).body.string();
    let Page = cutstr(html, 'span> <a href="/nn/', '">', 1,3);
    return Page;
}

//万能切割函数
function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = "";
    if (e < a.length && e != null) {} else {
        e = a.length;
    }
    if (f == null) {
        f = 1;
    }
    for (i = f; i < e; i++) {
        tmp = a[i].split(c);
        if (tmp.length > 1) {
            d += tmp[0];
        }
    }
    return d;
}