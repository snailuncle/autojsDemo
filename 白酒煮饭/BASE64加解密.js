"ui";

ui.layout(
    <frame>
        <vertical padding="7" bg="#708090" layout_weight="1">
            <card w="*" h="auto" margin="5" cardCornerRadius="5dp" cardBackgroundColor="#b0c4de"
            cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
            <text textSize="16sp" textStyle="bold" gravity="center">BASE64加/解密</text>
        </card>
        <card layout_weight="1" margin="0" cardCornerRadius="10dp" cardBackgroundColor="#b0c4de"
        cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
        <input id="input" hint="请输入要加密或者解密的数据" gravity="top" bg="#c0c0c0"/>
    </card>
    <horizontal gravity="center">
        <button id="jia" style="Widget.AppCompat.Button.Colored" >加密</button>
        <button id="jie" style="Widget.AppCompat.Button.Colored" >解密</button>
        <button id="zha" style="Widget.AppCompat.Button.Colored" >粘贴</button>
        <button id="cl1" style="Widget.AppCompat.Button.Colored" >清空</button>
    </horizontal>
    <vertical >
        <card h="250" margin="0" cardCornerRadius="10dp" cardBackgroundColor="#b0c4de"
        cardElevation="15dp" gravity="top" foreground="?selectableItemBackground">
        <input id="output" textSize="20sp" hint="结果区域" bg="#c0c0c0" gravity="top"/>
    </card>
    <horizontal gravity="center">
        <button id="cpy" style="Widget.AppCompat.Button.Colored" >复制结果</button>
        <button id="cl2" style="Widget.AppCompat.Button.Colored" >清空</button>
    </horizontal>
    </vertical>
    </vertical>
    </frame>
);
ui.jia.click(() => {
    let str = ui.input.text();
    if (str.length > 1) {
        ui.output.setText(ec(str));
    }
});

ui.jie.click(() => {
    let str = ui.input.text();
    if (str.length > 1) {
        ui.output.setText(b64(str));
    }
});

ui.zha.click(() => {
    ui.input.setText(getClip());
});

ui.cl1.click(() => {
    ui.input.setText("");
});

ui.cpy.click(() => {
    let str = ui.output.text();
    if (str.length > 1) {
        setClip(str);
        toast("复制成功");
    }
});

ui.cl2.click(() => {
    ui.output.setText("");
});

function ec(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}

function b64(str) {
    return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(), 0));
}