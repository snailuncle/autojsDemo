var res = http.post("http://route.showapi.com/1211-1", {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    "showapi_appid": '79304',
    "showapi_sign": 'dc57036459004b369823957c97e01f14',
    "count": "10"
});
var html = res.body.json().showapi_res_body.data;
for (let i in html){
log(html[i].english + "\n" + html[i].chinese+"\n\n");
};