var window = floaty.window(
    <frame><linear>
        <button id="action" text="CA" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> </frame>
);


var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            //if(new Date().getTime() - downTime > 1500){
                //exit();
            //}
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});
bkz=0;
function onClick(){
   /* if(bkz==0){
        bkz=1;
        window.action.text("..");*/
    threads.start(function(){
        选择();
       /* bkz=0;
       ui.run(function(){
        window.action.text("CA");
       });*/
    });}
//}
function 选择(){
var 一级命令=["常用","模块化功能","ui","逻辑","控制台","java与安卓"];
var 一级选择=dialogs.select("命令助手",一级命令);
var 二级命令=[["setClip()",
           'Object.keys()',
           'requestScreenCapture();',
          "threads.start(function(){\n\n});",
           'function (){\n\n}',
           
          ],
          [b64("ZnVuY3Rpb24gY3V0c3RyKGEsIGIsIGMpIHsvL+WcqGHkuK3miKrlj5ZiLGPkuYvpl7TnmoTlhoXlrrkKYSA9IGEuc3BsaXQoYik7dmFyIGQ9W107dmFyIHA9MDsKZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7CnZhciB0bXAgPSBhW2ldLnNwbGl0KGMpOwppZiAodG1wLmxlbmd0aCA+IDEpIHsKZFtwXT10bXBbMF0KcCsrOwp9Cn1yZXR1cm4gZDsKfQ=="),
          b64("dmFyIHFxPWphdmEubGFuZy5TdHJpbmcoZmlsZXMubGlzdERpcigiL3N0b3JhZ2UvZW11bGF0ZWQvMC9UZW5jZW50L01vYmlsZVFRL2FydGZpbHRlci8iLCBmdW5jdGlvbihuYW1lKXsKICAgIHJldHVybiBuYW1lLmVuZHNXaXRoKCJhcnRmaWx0ZXIuY29uZmlnIik7Cn0pLmpvaW4oIiwiKSkucmVwbGFjZSgnYXJ0ZmlsdGVyLmNvbmZpZycsICcnKTsKLy/or7vlj5borrDlvZVxceWPtw=="),
          b64("ZnVuY3Rpb24gY2FwdHVyZXNjcmVlbigpIHsvL+eos+WumuaIquWbvuaooeWdlwp2YXIgYTsKd2hpbGUgKHRydWUpIHsKaWYgKGE9Y2FwdHVyZVNjcmVlbigpKSB7CnJldHVybiBhOwp9Cn0KfQ=="),
           b64("dmFyIHFx576k5Y+3PSI2NzkwMzk1MTYiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXFhcGk6Ly9jYXJkL3Nob3dfcHNsY2FyZD9jYXJkX3R5cGU9Z3JvdXAmdWluPSIrcXHnvqTlj7csCiAgICBwYWNrYWdlTmFtZTogImNvbS50ZW5jZW50Lm1vYmlsZXFxIiwKfSk7Ly/miZPlvIBxcee+pOWQjeeJhw=="),
           b64("ZnVuY3Rpb24g5pCc54uX5Zu+6ZO+KHBhdGgpewp2YXIgdXJsPSJodHRwOi8vcGljLnNvZ291LmNvbS9waWMvdXBsb2FkX3BpYy5qc3AiOwp2YXIgcmVzPWh0dHAucG9zdE11bHRpcGFydCh1cmwsewoiZmlsZSI6IG9wZW4ocGF0aCksCn0pOwp2YXIgdD1yZXMuYm9keS5zdHJpbmcoKTsKcmV0dXJuIHQ7Cn0="),
           b64("dmFyIHFx5Y+3PSI3ODcwNjcwMzMiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXFhcGk6Ly9jYXJkL3Nob3dfcHNsY2FyZD91aW49IitxceWPtywKICAgIHBhY2thZ2VOYW1lOiAiY29tLnRlbmNlbnQubW9iaWxlcXEiLAp9KTsvL+aJk+W8gHFx5ZCN54mH"),
           b64("dmFyIHFx5Y+3PSI3ODcwNjcwMzMiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXE6Ly9pbS9jaGF0P2NoYXRfdHlwZT13cGEmdmVyc2lvbj0xJnNyY190eXBlPXdlYiZ1aW49IitxceWPtywKICAgIHBhY2thZ2VOYW1lOiAiY29tLnRlbmNlbnQubW9iaWxlcXEiLAp9KTsvL3Fx5by65Yi26IGK5aSp"),
           b64("dmFyIHFx576k5Y+3PSI2NzkwMzk1MTYiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXE6Ly9pbS9jaGF0P2NoYXRfdHlwZT1ncm91cCZ2ZXJzaW9uPTEmc3JjX3R5cGU9d2ViJnVpbj0iK3Fx576k5Y+3LAogICAgcGFja2FnZU5hbWU6ICJjb20udGVuY2VudC5tb2JpbGVxcSIsCn0pOy8v5bey5Yqg5YWl55qEcXHnvqTogYrlpKk="),
           b64("Ly/ohJrmnKzmiafooYzpgJ/luqbmtYvor5UKY29uc29sZS5zaG93KCk7CnZhciDlvIDlp4vml7bpl7Q9bmV3IERhdGUoKTsKZm9yKHZhciBpPTA7aTwxMDAwMDAwO2krKyl7Ci8v5b6q546vMTAw5LiH5qyh55qE5pe26Ze0Cn0KdmFyIOe7k+adn+aXtumXtD1uZXcgRGF0ZSgpOwpsb2co57uT5p2f5pe26Ze0LeW8gOWni+aXtumXtCk7"),
           
           b64("Ly/orrDlvZXmjInplK7ooqvmjInkuIvml7bnmoTop6bmkbjlnZDmoIcKdmFyIHggPSAwLCB5ID0gMDsKLy/orrDlvZXmjInplK7ooqvmjInkuIvml7bnmoTmgqzmta7nqpfkvY3nva4KdmFyIHdpbmRvd1gsIHdpbmRvd1k7Ci8v6K6w5b2V5oyJ6ZSu6KKr5oyJ5LiL55qE5pe26Ze05Lul5L6/5Yik5pat6ZW/5oyJ562J5Yqo5L2cCnZhciBkb3duVGltZTsKd2luZG93LmFjdGlvbi5zZXRPblRvdWNoTGlzdGVuZXIoZnVuY3Rpb24odmlldywgZXZlbnQpewogICAgc3dpdGNoKGV2ZW50LmdldEFjdGlvbigpKXsKICAgICAgICBjYXNlIGV2ZW50LkFDVElPTl9ET1dOOgogICAgICAgICAgICB4ID0gZXZlbnQuZ2V0UmF3WCgpOwogICAgICAgICAgICB5ID0gZXZlbnQuZ2V0UmF3WSgpOwogICAgICAgICAgICB3aW5kb3dYID0gd2luZG93LmdldFgoKTsKICAgICAgICAgICAgd2luZG93WSA9IHdpbmRvdy5nZXRZKCk7CiAgICAgICAgICAgIGRvd25UaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIGNhc2UgZXZlbnQuQUNUSU9OX01PVkU6CiAgICAgICAgICAgIC8v56e75Yqo5omL5oyH5pe26LCD5pW05oKs5rWu56qX5L2N572uCiAgICAgICAgICAgIHdpbmRvdy5zZXRQb3NpdGlvbih3aW5kb3dYICsgKGV2ZW50LmdldFJhd1goKSAtIHgpLAogICAgICAgICAgICAgICAgd2luZG93WSArIChldmVudC5nZXRSYXdZKCkgLSB5KSk7CiAgICAgICAgICAgIC8v5aaC5p6c5oyJ5LiL55qE5pe26Ze06LaF6L+HMS4156eS5Yik5pat5Li66ZW/5oyJ77yM6YCA5Ye66ISa5pysCiAgICAgICAgICAgIC8vaWYobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBkb3duVGltZSA+IDE1MDApewogICAgICAgICAgICAgICAgLy9leGl0KCk7CiAgICAgICAgICAgIC8vfQogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICBjYXNlIGV2ZW50LkFDVElPTl9VUDoKICAgICAgICAgICAgLy/miYvmjIflvLnotbfml7blpoLmnpzlgY/np7vlvojlsI/liJnliKTmlq3kuLrngrnlh7sKICAgICAgICAgICAgaWYoTWF0aC5hYnMoZXZlbnQuZ2V0UmF3WSgpIC0geSkgPCA1ICYmIE1hdGguYWJzKGV2ZW50LmdldFJhd1goKSAtIHgpIDwgNSl7CiAgICAgICAgICAgICAgICAvL+WNleWHu+aXtueahOWGheWuuQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgfQogICAgcmV0dXJuIHRydWU7Cn0pOy8v5oyJ6ZSu55uR5ZCs")
          ],
          ["ui.run(function(){\n\n});",'ui..click(() => {\n\n});',
          'var window=floaty.window(\n\n);',
          '"ui";',
          'ui.layout(\n\n);','ui.statusBarColor("#00000000");','<frame>\n\n</frame>','<ScrollView>\n\n</ScrollView>','<vertical>\n\n</vertical>','<linear>\n\n</linear>','<text />','<seekbar progress="0"/>','<button />','<input />','color="#ffffff" ',
           'id="" ',
           'margin="1 0 0 1" '],                 
          ["for(var i=0;i<1;i++){\n\n}","while(true){\n\n}","if(){\n\n}else{\n\n}","try{\n\n}catch(e){\n\n}",
          "for(var i in ){\nlog(i);\n}"
          ],["console.",
           "show();",
           "setPosition(,);",
           'rawInput("提示","");',
          'clear()'
            
            ],
          ['importClass();',
          'importPackage();',
           'java.lang.String();',
           'android.util.Base64.decode',
           '.getBytes()',
           
          ]];
var 二级选择=dialogs.select(一级命令[一级选择],二级命令[一级选择]);
setClip(二级命令[一级选择][二级选择]);
}
function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}



while(true){
    sleep(111);
}











