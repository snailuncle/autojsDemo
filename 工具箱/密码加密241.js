"ui";
//用于简单的密码加密
//输入密码,
//输出加密后的密码
//密码只允许字母大小写加数字
//加密方式如下
//字母数字更改为对应的ascii执行加1或者减1
//再由数字变为ascii对应的字符
ui.layout(
    <vertical padding="16">
        <text textSize="40sp" color="#111111">简单的密码加密</text>
        <text textSize="40sp">请输入密码:</text>
        <input id="passwd" hint="请输入您的密码"/>
        <button  id="click_me" text="长长的按钮" style="Widget.AppCompat.Button.Colored" w="*"/>
    </vertical>
);

ui.click_me.click(()=>{
    var text = ui.passwd.text();
    if (text.length == 0) {
        ui.passwd.setError("输入不能为空");
        return;
    }
    //只允许大小写字母加数字
    var reg = /^[0-9a-zA-Z]+$/
    if(!reg.test(text)){
        ui.passwd.setError("你输入的字符不是数字或者字母");
        return;
    }

    str_length = text.length;
    right_length = 8
    if (str_length < right_length) {
        ui.passwd.setError("至少输入" + right_length + "个字符");
        return;
    }

    pd=''
    special_chars = '09azAZ'
    for (i = 0; i < str_length; i++) {
        single_char = text.charAt(i);
        if (special_chars.search(single_char) == -1) {
            if (i % 2 == 0) {
                single_char = single_char.charCodeAt();
                single_char=String.fromCharCode(single_char+1);
            } else {
                single_char = single_char.charCodeAt();
                single_char=String.fromCharCode(single_char-1);
            }
        }
        pd=pd+single_char;

    }

    ui.run(function () {
        threads.start(function() {
            console.show();
            console.info("ui测试脚本开始");
            log('原始密码:'+text);
            log('加密后是:'+pd);
            log('已经复制到粘贴板');
        })
    });
    setClip(pd);


});








