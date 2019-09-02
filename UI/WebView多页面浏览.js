"ui";

ui.layout(
    <vertical>
        <horizontal id="webs" layout_weight="1">
            
        </horizontal>
        <button id="one" text="第一个" />
        <button id="two" text="第二个" />
        <button id="three" text="第三个" />
        <button id="four" text="第四个" />
        <button id="o" text="改变第二个地址" />
    </vertical>
);

var webs = [];
var urls = ["https://baidu.com", "https://m.mi.com", "https://m.weibo.com", "https://meizu.com"];

var num = 0;
urls.forEach(e => {
    webs.push(ui.inflate(
        <webview/>));
    webs[num++].loadUrl(e);
})


ui.webs.addView(webs[0]);

ui.one.click(() => {
    ui.webs.removeAllViews();
    ui.webs.addView(webs[0]);
})


ui.two.click(() => {
    ui.webs.removeAllViews();
    ui.webs.addView(webs[1]);
});

ui.three.click(() => {
    ui.webs.removeAllViews();
    ui.webs.addView(webs[2]);
})

ui.four.click(() => {
    ui.webs.removeAllViews();
    ui.webs.addView(webs[3]);
})

ui.o.click(() => {
    webs[1].loadUrl("https://qzone.qq.com");
})