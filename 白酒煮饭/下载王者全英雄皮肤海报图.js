console.show();

var dirpath = "/sdcard/王者荣耀英雄海报/";
files.ensureDir(dirpath);

var url = 'http://pvp.qq.com/web201605/js/herolist.json';
var head = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
};
var res = http.get(url, head);

var json = res.body.json();

for (let j in json) {
    let obj = json[j];
    let I = obj.ename;
    let name_ary = obj.skin_name.split("|");
    log("第", j + 1, json.length, "英雄");
    log("皮肤数量", name_ary.length);
    for (let n = 0; n < name_ary.length; n++) {
        let heroskin_links = "http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/" + I + "/" + I + "-bigskin-" + (n + 1) + ".jpg";
        let res = http.get(heroskin_links);
        let path = "/" + obj.cname + "_" + name_ary[n] + (n + 1) + '.jpg';
        if (res.statusCode == 200) {
            files.writeBytes(files.join(dirpath, path), res.body.bytes());
            log("OK " + path);
        } else {
            log("NO " + path);
        };
    };
};




/*

import requests
import os

# 包含英雄名称信息的URL
url = 'http://pvp.qq.com/web201605/js/herolist.json'
head = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'}
response = requests.get(url, headers=head)
hero_list = response.json()
# 提取英雄名字及对数字
hero_name = list(map(lambda x:x['cname'], hero_list)) 
hero_number = list(map(lambda x:x['ename'], hero_list))

# 定义一个函数，用于下载并存储图片
def save_IMG():
    num = 0
    # 逐一遍历英雄
    for i in hero_number:
        # 逐一遍历皮肤，此处假定一个英雄最多有15个皮肤
        for sk_num in range(15):
            # 英雄皮肤的URL链接
            heroskin_links = 'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/'+str(i)+'/'+str(i)+'-bigskin-'+str(sk_num)+'.jpg'
            hl = requests.get(heroskin_links)
            if hl.status_code == 200:
                # 将图片保存下来，并以"英雄名称_皮肤序号"方式命名
                with open(hero_name[num] + str(sk_num) + '.jpg', 'wb') as f:
                    f.write(hl.content)
        num = num + 1

# 函数调用
save_IMG()

*/