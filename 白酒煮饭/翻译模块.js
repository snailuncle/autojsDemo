//翻译模块
(function(){
    function 搜狗(str) {
  url = "http://fanyi.sogou.com/reventondc/translate";
  var text = http.post(url, {
    "from": "en",
    "to": "zh-CHS",
    "text": str
  }).body.string();
  var txt=JSON.parse(text);
  return txt.translate.dit;
}
    
    function 有道(str){
    content = str;
    word = "";
    path = "http://www.youdao.com/w/" + content + "/#keyfrom=dict2.top";
    a = http.get(path).body.string();
    bs = '<span>\n                ';
    cs = '</span>';
    d = getcenter(a, bs, cs);
    word = d[0];
    if (word == null) {
        bl = '<p>';
        cl = '</p>\n';
        dl = getcenter(a, bl, cl);
        word = dl[1];
    }
    if (word == null || isnull(word)) {
        word = str + " ";
    }
    word = replaceHtml(word);
    return word;
}
function getcenter(a, b, c) {
    a1 = a.split(b);
    b1 = [];
    for (i in a1)
        b1[i] = a1[i].split(c);
    //log(b1);
    c1 = [];
    for (var i = 0; i < b1.length; i++) {
        c1[i - 1] = b1[i][0];
    }
    return c1;
}


function replaceHtml(str) {
    a = [/&#39;/g, /&amp;/g, /&lt;/g, /&gt;/g];
    b = ["'", "&", "<", ">"];
    for (var i = 0; i < a.length; i++) {
        str = str.replace(a[i], b[i]);
    }
    return str;
}



function isnull(str) {
    if (str.substr(0, 24) == "<input id=\"downIt\" type=" || str.substr(0, 64) == "<span id=\"tran_0_0\" onmouseover=\"hlgt(\'#src_0_0,#tran_0_0\')\" onm") {
        return true;
    } else {
        return false;
    }
}


var 翻译 = {
        "有道": 有道,
        "搜狗":搜狗
    };
    
    module.exports =翻译;


})();
