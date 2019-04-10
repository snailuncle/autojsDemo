"ui";
/**
 * 随机密码生成器.
 * 测试环境:华为P10 安卓7.0 AutoJS版本:Alpha35
 */
ui.layout(
        <vertical background="http://1.119.192.186:8088/img/bg1.jpg">
            <vertical>
                <text w="*" h="56" gravity="center" color="#4D3D26" size="24sp" textStyle="bold">复杂密码生成器</text>
            </vertical>
            <vertical marginTop="13">
                <text marginLeft="16" color="#1E1E1E" size="18sp" textStyle="bold">设置要生成密码的长度和数量</text>
                <linear>
                <input id="passlength" paddingLeft="5" inputType="number" maxLength = "2" marginTop="8" singleLine="true" marginLeft="16" h="*" w="154" hint="长度[6-32位]" bg="http://1.119.192.186:8088/img/a6.png" />
                <input id="passnum" paddingLeft="5" inputType="number" maxLength = "3" marginTop="8" singleLine="true" marginLeft="16" h="*" w="154" hint="数量[选填]" bg="http://1.119.192.186:8088/img/a6.png" />
                </linear>
            </vertical>
        <linear paddingTop='10'>
            <checkbox id="str" text="小写字母" color="#684D38" marginLeft="16"/>
            <checkbox id="STR" text="大写字母" color="#684D38" marginLeft="16"/>
        </linear>
        <linear paddingTop='10'>
            <checkbox id="num" text="数字" color="#684D38" marginLeft="16"/>
            <checkbox id="sym" text="特殊符号" color="#684D38" marginLeft="44"/>
        </linear>

        <input id="text_output" paddingLeft="5" gravity="top" bg="http://1.119.192.186:8088/img/TextBg1.png" color="#000000" size="15" margin="15 16 0 16" w="*" h="200" />

        <linear gravity="center">
            <button id="make" h="35" bg="http://1.119.192.186:8088/img/produce.jpg" margin="16"></button>
            <button id="copy" h="35" bg="http://1.119.192.186:8088/img/copy.jpg" margin="16"></button>
        </linear>
        </vertical>
);

ui.str.setChecked(true);
ui.STR.setChecked(true);
ui.num.setChecked(true);
ui.sym.setChecked(true);
ui.text_output.setCursorVisible(false);
ui.text_output.setFocusable(false);
ui.text_output.setHint('        本程序是百度应用"随机密码生成器"的移植版,唯一不同的是,本程序可以一次性生成多条密码.');

var str = 'abcdefghijklmnopqrstuvwxyz';
var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var num = '0123456789';
var sym = '+=-@#~,.[]()!%^*$';

ui.make.click(function() {
    var PassLength = ui.passlength.text();
    var PassNum = ui.passnum.text();
    if (PassLength == '') {toast('密码长度不能为空!'); return;}
    if (PassNum == '') {PassNum = 1;}
    if (PassLength < 6 || PassLength > 32) {
        toast('长度设置非法!');
        return;
    }else if (PassNum == 0) {
        toast('生成数量不可为"0"!');
        return;
    }
    
    var text = new Array();
    if (ui.str.isChecked()) {text.push(str);}
    if (ui.STR.isChecked()) {text.push(STR);}
    if (ui.num.isChecked()) {text.push(num);}
    if (ui.sym.isChecked()) {text.push(sym);}
    if (!ui.str.isChecked() && !ui.STR.isChecked() && !ui.num.isChecked() && !ui.sym.isChecked()) {
        toast('请选择密码的组合元素');
        return;
    }

    function randPassword(){
        var pw = '';
        for(i=0; i<PassLength; i++){
            var strpos = random(0,text.length-1);
            pw += text[strpos].charAt(random(0, text[strpos].length-1));
        }
        return pw; 
    }
    var Result1 = '';
    for (var j = 0; j < PassNum; j++) {
        var Result = randPassword();
        if(j > 0) {
            Result1 += '\n';
        }
        Result1 += Result;

    }
    // log(Result);
    ui.text_output.setText(Result1);
});

ui.copy.click(function() {
    var PasswordText = ui.text_output.text();
    if (PasswordText != null && PasswordText != '') {
        setClip(PasswordText);
        var ClipText = getClip();
        if (ClipText == PasswordText) {
            toast('已复制到剪贴板!')
        } else {
            toast('写入剪贴板失败!')
        }
    } else {
        toast('请先生成密码!');
    }
    return;
});