"ui";
ui.layout(
    <vertical padding="4">
        <horizontal>
            <text textColor="black" textSize="18sp" layout_weight="1">单词答题 v1.0</text>
            <text id="sysj" text="00:00" gravity="left" w="auto" style="Widget.AppCompat.Button.Borderless.Colored"/>
            <text id="fs" text="分数:0" w="auto" gravity="left" style="Widget.AppCompat.Button.Borderless.Colored"/>
        </horizontal>
        <horizontal>
        <text id="bzxs" text="" w="250" gravity="left"/>
        <button id="bz" text="帮助"/>
        </horizontal>
        <text id="text1" h="80" gravity="top" color="#000000" bg="#3500FF00"/>
        <ScrollView h="200" gravity="bottom" margin="1 0 0 0">
        <text id="text2" h="*" color="#0000ff" gravity="center" bg="#3500ff00" margin="0 0 0 0"/>
        </ScrollView>
        <horizontal><button id="anq" text="q" size="10" h="60" w="35"/><button id="anw" text="w" size="10" h="60" w="35"/><button id="ane" text="e" size="10" h="60" w="35"/><button id="anr" text="r" size="10" h="60" w="35"/><button id="ant" text="t" size="10" h="60" w="35"/><button id="any" text="y" size="10" h="60" w="35"/><button id="anu" text="u" size="10" h="60" w="35"/><button id="ani" text="i" size="10" h="60" w="35"/><button id="ano" text="o" size="10" h="60" w="35"/><button id="anp" text="p" size="10" h="60" w="35"/></horizontal>
        <horizontal margin="0 0 0 17"><button id="ana" text="a" size="10" h="60" w="35"/><button id="ans" text="s" size="10" h="60" w="35"/><button id="and" text="d" size="10" h="60" w="35"/><button id="anf" text="f" size="10" h="60" w="35"/><button id="ang" text="g" size="10" h="60" w="35"/><button id="anh" text="h" size="10" h="60" w="35"/><button id="anj" text="j" size="10" h="60" w="35"/><button id="ank" text="k" size="10" h="60" w="35"/><button id="anl" text="l" size="10" h="60" w="35"/></horizontal>
        <horizontal margin="0 0 0 35"><button id="anz" text="z" size="10" h="60" w="35"/><button id="anx" text="x" size="10" h="60" w="35"/><button id="anc" text="c" size="10" h="60" w="35"/><button id="anv" text="v" size="10" h="60" w="35"/><button id="anb" text="b" size="10" h="60" w="35"/><button id="ann" text="n" size="10" h="60" w="35"/><button id="anm" text="m" size="10" h="60" w="35"/></horizontal>
        
        
        
    </vertical>
);
ui.text2.text("\n\n\n\n\n\n\n\n\n\n\n\n");
text=ui.text2.text();
ui.anq.click(()=>{dj("q");});ui.anw.click(()=>{dj("w");});ui.ane.click(()=>{dj("e");});ui.anr.click(()=>{dj("r");});ui.ant.click(()=>{dj("t");});ui.any.click(()=>{dj("y");});ui.anu.click(()=>{dj("u");});ui.ani.click(()=>{dj("i");});ui.ano.click(()=>{dj("o");});ui.anp.click(()=>{dj("p");});
ui.ana.click(()=>{dj("a");});ui.ans.click(()=>{dj("s");});ui.and.click(()=>{dj("d");});ui.anf.click(()=>{dj("f");});ui.ang.click(()=>{dj("g");});ui.anh.click(()=>{dj("h");});ui.anj.click(()=>{dj("j");});ui.ank.click(()=>{dj("k");});ui.anl.click(()=>{dj("l");});
ui.anz.click(()=>{dj("z");});ui.anx.click(()=>{dj("x");});ui.anc.click(()=>{dj("c");});ui.anv.click(()=>{dj("v");});ui.anb.click(()=>{dj("b");});ui.ann.click(()=>{dj("n");});ui.anm.click(()=>{dj("m");});
zf=0;
ui.bz.click(function(){
ui.bzxs.text(dct[0]);
});
function dj(str){
threads.start(function(){
show(str);
if(str==dct[2]){
zf++;
ui.run(()=>{ui.fs.text("分数:"+zf)});
show("恭喜您回答正确，你的分数加1\n完整单词是"+dct[0]+":"+dct[3]);
sxt();
}else{}
});
}

function show(lg) {
    text+=lg+"\n";
    text=qc(text,12);
    ui.run(() => {
        ui.text2.setText(text);;
    });
}

dc=b64("77u/dHJhY2U677u/dHJhYz86ZSE7dm9sdW1lOnY/bHVtZTpvITttb2xlY3VsZTptbz9lY3VsZTpsITtkZWNsaW5lOj9lY2xpbmU6ZCE7c3Vic3RhbmNlOnN1Yj90YW5jZTpzITtidXJkZW46P3VyZGVuOmIhO25vdGlvbjpubz9pb246dCE7Ym91bmRhcnk6Ym91P2Rhcnk6biE7ZXhjbHVzaXZlOmV4Y2x1c2k/ZTp2ITtzZXh1YWw6P2V4dWFsOnMhO2luaGFiaXRhbnQ6aW5oYWI/dGFudDppITtzZXF1ZW5jZTpzZXF1P25jZTplITtoZXJkOmhlcj86ZCE7YWNjZWxlcmF0ZTphY2NlbGVyYT9lOnQhO3JpZGdlOnJpZD9lOmchO2Rpc3RyZXNzOmRpcz9yZXNzOnQhO2hvbGxvdzo/b2xsb3c6aCE7c2luY2VyZTpzaW4/ZXJlOmMhO2ZhY2lsaXR5OmZhY2lsaT95OnQhO2V4dGluY3Q6ZXh0aT9jdDpuITtlc3RpbWF0ZTplc3RpbWE/ZTp0ITtjYXJnbzpjYXI/bzpnITttZXJlOm0/cmU6ZSE7c2NhbGU6c2NhP2U6bCE7cmVsaWVmOnJlbGk/ZjplITtmYWN1bHR5OmZhY3VsP3k6dCE7YWx0ZXI6YT90ZXI6bCE7aWRsZTppZGw/OmUhO2V2b2x1dGlvbjpldm9sdXRpP246byE7cHJvc3BlY3Q6cD9vc3BlY3Q6ciE7d2hlcmVhczp3P2VyZWFzOmghO3ZpdmlkOnZpdj9kOmkhO2NhbGVuZGFyOmNhbGVuP2FyOmQhO3NoaXZlcjpzaD92ZXI6aSE7ZXh0cmVtZTplP3RyZW1lOnghO2xhc2VyOmxhc2U/OnIhO3NsaXBwZXJ5OnNsaXBwP3J5OmUhO2NvbnNlcnZhdGl2ZTpjb25zZXJ2YT9pdmU6dCE7bGFiZWw6bGE/ZWw6YiE7ZXBpc29kZTplcGlzP2RlOm8hO3dvbmRlcjp3b24/ZXI6ZCE7ZGlzdGluZ3Vpc2g6ZGlzdGluZz9pc2g6dSE7dmlkZW90YXBlOnZpZD9vdGFwZTplITttYXhpbXVtOm1heGltP206dSE7aW50ZXJwcmV0YXRpb246aW50ZXJwcmV0YT9pb246dCE7YWNpZDo/Y2lkOmEhO3Jlc3VtZTpyZXN1bT86ZSE7cGFydGljaXBhdGU6cGFydD9jaXBhdGU6aSE7dm9jYWJ1bGFyeTp2b2NhP3VsYXJ5OmIhO2luZ3JlZGllbnQ6P25ncmVkaWVudDppITtsb29zZW46bD9vc2VuOm8hO3Nsb3BlOj9sb3BlOnMhO3BhbnRzOj9hbnRzOnAhO3JlY3JlYXRpb246cmVjcmVhdD9vbjppITtjb21tdW5pdHk6P29tbXVuaXR5OmMhO2phaWw6amFpPzpsITt2YXJ5OnZhP3k6ciE7ZHVtYjpkdT9iOm0hO3N1YnNlcXVlbnQ6P3Vic2VxdWVudDpzITttaXh0dXJlOj9peHR1cmU6bSE7dGhydXN0Oj9ocnVzdDp0ITtjb21wZXRlbnQ6Y29tcGV0ZW4/OnQhO3N1YnN0YW50aWFsOnN1YnN0YW50P2FsOmkhO3JldGFpbDpyZXRhP2w6aSE7YmFyZ2FpbjpiYXI/YWluOmchO2RlYWY6P2VhZjpkITtzcGlsbDpzcGlsPzpsITtvbmlvbjpvbmlvPzpuITtkcmlwOmQ/aXA6ciE7cHJlc2VydmU6cHJlc2VyP2U6diE7bWlzc2lvbjptaXM/aW9uOnMhO2ZydXN0cmF0ZTpmcnVzdHJhdD86ZSE7Y29udGludW91czpjbz90aW51b3VzOm4hO21haW5sYW5kOm1haW5sYW4/OmQhO2lsbGVnYWw6aWxsZWdhPzpsITt2YWluOj9haW46diE7YXNwZWN0OmFzcGVjPzp0ITttb2lzdHVyZTptP2lzdHVyZTpvITt2YWluOnY/aW46YSE7c3dhbGxvdzpzP2FsbG93OnchO21lZGl1bTptP2RpdW06ZSE7bXV0dWFsOm11dHU/bDphITtnZXN0dXJlOmdlc3R1P2U6ciE7cHJpb3JpdHk6cD9pb3JpdHk6ciE7YXZhaWxhYmxlOmF2YT9sYWJsZTppITtjb2FjaDpjb2FjPzpoITtlYXJ0aHF1YWtlOmVhcnRocXVhP2U6ayE7cGFzc2l2ZTpwYXNzP3ZlOmkhO2V4dGVybmFsOmV4dGVybmE/OmwhO3JlaW5mb3JjZTpyZWk/Zm9yY2U6biE7cmFuZ2U6cmFuP2U6ZyE7dGhlbWU6dGhlbT86ZSE7c2hpZWxkOnM/aWVsZDpoITtub3RpZnk6P290aWZ5Om4hO3BvcnRpb246cG9yP2lvbjp0ITtwcmV2aW91czo/cmV2aW91czpwITtleGNlZWRpbmdseTpleD9lZWRpbmdseTpjITttYWxlOj9hbGU6bSE7cmFkaWF0aW9uOj9hZGlhdGlvbjpyITtuZWNlc3NpdHk6bmVjZXNzaT95OnQhO2FwcHJvcHJpYXRlOmFwcHJvcHI/YXRlOmkhO3ZhcmlhYmxlOnY/cmlhYmxlOmEhO2Rlcml2ZTpkP3JpdmU6ZSE7dGFyZ2V0Oj9hcmdldDp0ITtmb2N1czpmbz91czpjITtsZWlzdXJlOmxlaXN1cj86ZSE7b3JiaXQ6P3JiaXQ6byE7YWRvcHQ6P2RvcHQ6YSE7c3Vic3RpdHV0ZTpzP2JzdGl0dXRlOnUhO3Zlc3NlbDo/ZXNzZWw6diE7Z3VhcmFudGVlOmd1YXJhP3RlZTpuITtoaW50Omg/bnQ6aSE7amFtOmphPzptITtuZXR3b3JrOm5ldHdvcj86ayE7c2NhbmRhbDpzYz9uZGFsOmEhO2luZmVyaW9yOmluZmVyaT9yOm8hO2FkdmVydGlzZTphZHY/cnRpc2U6ZSE7aG9vazpob28/OmshO2Fyb3VzZTphcm91cz86ZSE7d2VsZDo/ZWxkOnchO3ByZXZhaWw6P3JldmFpbDpwITthcml0aG1ldGljOmFyaXRobT90aWM6ZSE7YXVkaW86YT9kaW86dSE7YWxjb2hvbDphbGM/aG9sOm8hO2Zsb2NrOmZsbz9rOmMhO2FwcHJvYWNoOj9wcHJvYWNoOmEhO2NvbnNlcnZhdGlvbjpjb25zZXJ2YXRpbz86biE7YXBwcm94aW1hdGU6YXBwcm94aW1hP2U6dCE7bmF2YWw6P2F2YWw6biE7cmVnaXN0ZXI6cmVnaT90ZXI6cyE7bWFudWFsOm1hbnU/bDphITt0cmFuc21pdDo/cmFuc21pdDp0ITtzZW5zaXRpdmU6c2VuP2l0aXZlOnMhO2luZmVjdDppP2ZlY3Q6biE7ZGV2aWNlOmQ/dmljZTplITtyZXNwb25zZTpyZXNwb24/ZTpzITtzaGlmdDo/aGlmdDpzITt2aWRlbzp2aWRlPzpvITtwcmltaXRpdmU6cHJpP2l0aXZlOm0hO2xpcXVvcjpsP3F1b3I6aSE7c2VjdXJpdHk6c2VjdXJpP3k6dCE7c3BvbnNvcjpzP29uc29yOnAhO2h5ZHJvZ2VuOmh5ZHJvZz9uOmUhO3dpdG5lc3M6dz90bmVzczppITtqZWFuczpqZWFuPzpzITttb3RpdmU6bW90P3ZlOmkhO2xlYXA6bGU/cDphITtzZW1pbmFyOnNlP2luYXI6bSE7ZmF2b3JpdGU6ZmF2b3JpdD86ZSE7b3JpZ2luOm8/aWdpbjpyITtvcHRpY3M6b3B0P2NzOmkhO3Rlcm1pbmFsOnRlP21pbmFsOnIhO3JlbWVkeTpyP21lZHk6ZSE7Z2VvbG9neTpnP29sb2d5OmUhO2V4aGF1c3Rpb246ZXg/YXVzdGlvbjpoITtwYXQ6cGE/OnQhO2NhdGFsb2c6Y2F0YT9vZzpsITt1dGlsaXplOnV0aWw/emU6aSE7cGFyYWRlOj9hcmFkZTpwITthcHBsaWNhYmxlOmFwcD9pY2FibGU6bCE7cHJvdmlzaW9uOnByb3ZpP2lvbjpzITtidWRnZXQ6YnVkZz90OmUhO2F1dGhvcml0eTphdXRob3JpP3k6dCE7c3RyaXBlOnN0P2lwZTpyITtmbGVlOj9sZWU6ZiE7cG92ZXJ0eTpwbz9lcnR5OnYhO2p1bmlvcjpqdT9pb3I6biE7YWRlcXVhdGU6YWRlcXVhP2U6dCE7c2F0ZWxsaXRlOnNhdGVsP2l0ZTpsITthcHByZWNpYXRlOmFwcHJlY2lhdD86ZSE7bWlzc2lsZTo/aXNzaWxlOm0hO2JhdHRlcnk6YmF0dGU/eTpyITttb29kOj9vb2Q6bSE7Y2x1ZTo/bHVlOmMhO2ltcG9zZTppbXBvP2U6cyE7bWFzc2l2ZTptYT9zaXZlOnMhO3BhcnRpY2xlOj9hcnRpY2xlOnAhO2NvbXBldGl0aW9uOmNvbXBldD90aW9uOmkhO2VxdWl2YWxlbnQ6ZXF1aT9hbGVudDp2ITtkZWJhdGU6ZD9iYXRlOmUhO3RlbXBvcmFyeTp0ZW1wb3I/cnk6YSE7YnVyc3Q6YnVyP3Q6cyE7cml2YWw6cj92YWw6aSE7b3JpZW50Oj9yaWVudDpvITtvdXRzZXQ6bz90c2V0OnUhO3NoZWx0ZXI6c2hlbD9lcjp0ITtleGNsdWRlOmV4Y2w/ZGU6dSE7cmVkaWQ6cmVkaT86ZCE7aW5zdXJhbmNlOj9uc3VyYW5jZTppITtzaWduaWZpY2FuY2U6cz9nbmlmaWNhbmNlOmkhO3N1cnZleTo/dXJ2ZXk6cyE7c2tldGNoOnNrZT9jaDp0ITtnZW5lOmdlP2U6biE7ZGVzY2VuZDo/ZXNjZW5kOmQhO2RlcG9zaXQ6ZGU/b3NpdDpwITthZGhlcmU6YWRoZXI/OmUhO21lcmNoYW50Om1lP2NoYW50OnIhO2hhcm1vbnk6aGE/bW9ueTpyITtmYXRhbDo/YXRhbDpmITtyZWd1bGF0ZTo/ZWd1bGF0ZTpyITtmYXg6P2F4OmYhO291dHN0YW5kaW5nOm91dHN0P25kaW5nOmEhO2J1bmNoOj91bmNoOmIhO3Byb2Zlc3Npb25hbDpwcm9mZXNzaW9uP2w6YSE7YXBwbGlhbmNlOmFwcD9pYW5jZTpsITtleHRlbnQ6ZT90ZW50OnghO2FkanVzdDphZGp1cz86dCE7Z3VpbHR5Omd1P2x0eTppITtudWNsZXVzOm51P2xldXM6YyE7ZXh0ZXJpb3I6P3h0ZXJpb3I6ZSE7ZHVyYXRpb246P3VyYXRpb246ZCE7cGVyc29ubmVsOnBlcnM/bm5lbDpvITt3aXRoZHJhdzp3aXRoP3JhdzpkITt3YWdvbjp3YT9vbjpnITtjb21lZHk6Y29tP2R5OmUhO3N1Ym1pdDpzdWJtaT86dCE7ZW50aXRsZTo/bnRpdGxlOmUhO2luY2lkZW50Oj9uY2lkZW50OmkhO2ludGVycHJldDppbnRlP3ByZXQ6ciE7ZGV2aXNlOmRlP2lzZTp2ITtibGFzdDpibGFzPzp0ITtuZWdhdGl2ZTpuZWdhdD92ZTppITt5aWVsZDp5aT9sZDplITt0YWxlbnQ6dD9sZW50OmEhO2FjYWRlbWljOmFjYWRlbWk/OmMhO3BlYWs6cGVhPzprITtzbGVuZGVyOnNsZW4/ZXI6ZCE7YXV0b21hdGljOmF1dG9tYXRpPzpjITt0cmlhbmdsZTp0cmlhP2dsZTpuITtkb21lc3RpYzpkb21lcz9pYzp0ITtleHBsb2l0OmV4cGxvaT86dCE7Y29uc3RhbnQ6Yz9uc3RhbnQ6byE7aGVzaXRhdGU6P2VzaXRhdGU6aCE7Y2xpZmY6Y2xpP2Y6ZiE7cGV0cm9sZXVtOnBldHJvbD91bTplITtzdHJhdGVneTpzdHI/dGVneTphITt0aXRsZTp0aXRsPzplITt2aW9sZW5jZTp2aW9sP25jZTplITtzdWJ3YXk6c3Vidz95OmEhO3JlbHk6cmU/eTpsITtsZWF0aGVyOmxlP3RoZXI6YSE7c2NyYXRjaDpzY3JhdGM/OmghO3ByZXN1bWFibHk6cHI/c3VtYWJseTplITthY3F1aXJlOmFjcT9pcmU6dSE7aWRlbnRpZnk6aWRlbnQ/Znk6aSE7c3VzcGljaW91czpzdXNwaT9pb3VzOmMhO2NvZGU6Y28/ZTpkITt2b2x1bnRlZXI6dm9sdW50ZT9yOmUhO2Rpc3RyaWJ1dGU6ZGlzdHI/YnV0ZTppITtwaGVub21lbm9uOnBoZW5vbWVubz86biE7c2tpbTpzP2ltOmshO2V4cGVuZDpleHBlP2Q6biE7bnlsb246bj9sb246eSE7dW5kZXJnbzp1P2RlcmdvOm4hO2dlb21ldHJ5Omdlb21lP3J5OnQhO2F0dHJhY3Rpb246YXR0cmFjP2lvbjp0ITtjYW5kaWRhdGU6Yz9uZGlkYXRlOmEhO3Bvd2Rlcjpwb3c/ZXI6ZCE7c2hydWc6c2hyP2c6dSE7YXBwbGF1c2U6YXBwP2F1c2U6bCE7c29waGlzdGljYXRlZDpzb3BoaXN0aWNhdD9kOmUhO2V4Y2VlZDplP2NlZWQ6eCE7dGV4dGlsZTp0ZXh0P2xlOmkhO2xlZ2lzbGF0aW9uOj9lZ2lzbGF0aW9uOmwhO2VuY291bnRlcjplbmM/dW50ZXI6byE7aWRlbnRpZmljYXRpb246aWRlbj9pZmljYXRpb246dCE7YWJ1c2U6YT91c2U6YiE7bm90aWNlYWJsZTpub3RpP2VhYmxlOmMhO2VsYWJvcmF0ZTplP2Fib3JhdGU6bCE7ZW52aXJvbm1lbnQ6ZW52aXJvbj9lbnQ6bSE7cHJlc2NyaWJlOnByZXM/cmliZTpjITtidXJlYXU6Yj9yZWF1OnUhO2FkYXB0OmE/YXB0OmQhO2RpdmVyc2U6ZD92ZXJzZTppITtjYXN1YWw6Y2FzdT9sOmEhO2RlcHV0eTpkZXB1P3k6dCE7dHJhbnNmb3JtOnRyP25zZm9ybTphITtmYXZvcmFibGU6ZmF2b3I/YmxlOmEhO2dhcDpnP3A6YSE7d2VsZmFyZTp3ZWxmP3JlOmEhO3JvdXRlOnJvdXQ/OmUhO3JlbGlnaW9uOnJlbGlnaW8/Om4hO3BldHJvbDpwZT9yb2w6dCE7YWdlbnQ6P2dlbnQ6YSE7cmVzdHJpY3Q6P2VzdHJpY3Q6ciE7ZW50cnk6ZW50P3k6ciE7am9pbnQ6aj9pbnQ6byE7aGFyZHdhcmU6P2FyZHdhcmU6aCE7ZGlzY291bnQ6ZGlzYz91bnQ6byE7bGliZXJhbDpsaWJlcmE/OmwhO2xpYmVydHk6bGliZXI/eTp0ITtyZWxpZ2lvdXM6cmVsP2dpb3VzOmkhO3JlbW92YWw6cmVtP3ZhbDpvITtqZWFsb3VzOmplYWxvdT86cyE7b3Bwb25lbnQ6b3Bwb25lP3Q6biE7dmVyc2lvbjp2ZXJzP29uOmkhO2dhcmJhZ2U6Z2FyYj9nZTphITtudWlzYW5jZTpuP2lzYW5jZTp1ITtsaWJlcmFsOmxpYj9yYWw6ZSE7SW50ZXJuZXQ6ST90ZXJuZXQ6biE7ZXhwbG9zaXZlOmV4cGxvc2k/ZTp2ITtnZW9ncmFwaHk6Z2U/Z3JhcGh5Om8hO2Vtb3Rpb25hbDplbW90P29uYWw6aSE7ZW50ZXJ0YWlubWVudDplbnRlcnRhP25tZW50OmkhO2hvdXNlaG9sZDpoP3VzZWhvbGQ6byE7YXJjaGl0ZWN0dXJlOmFyY2hpdGU/dHVyZTpjITt2b3RlOnZvP2U6dCE7c3ByYXk6cz9yYXk6cCE7bm9uc2Vuc2U6bm9uc2VuP2U6cyE7ZXhjdXJzaW9uOj94Y3Vyc2lvbjplITtyZXNwb25kOnJlc3BvP2Q6biE7aGF0cmVkOmhhdHJlPzpkITtkdXNrOmR1cz86ayE7b3JjaGVzdHJhOm9yY2hlc3RyPzphITtleHBlbnNlOmV4cGVucz86ZSE7d2VhdmU6P2VhdmU6dyE7YXBwYXJlbnQ6YXBwYXI/bnQ6ZSE7YXdhcmU6YXc/cmU6YSE7YmFsY29ueTpiP2xjb255OmEhO29wcG9ydHVuaXR5Om9wcG9ydHVuaXQ/OnkhO3ZpY3RpbTp2aWN0aT86bSE7ZXhwZWw6P3hwZWw6ZSE7Z2VuaXVzOmdlbj91czppITtyYWNpYWw6cmFjaWE/OmwhO3B1cnN1ZTpwdT9zdWU6ciE7aW5mYW50OmluP2FudDpmITtydWluOj91aW46ciE7YmlvbG9neTpiaW9sP2d5Om8hO3dlZWQ6dz9lZDplITtqdW5nbGU6anVuZ2w/OmUhO3R3aXN0OnQ/aXN0OnchO2NvbnN1bWU6Y29uc3VtPzplITtxdW90YXRpb246cXVvdGF0aT9uOm8hO2V4cGFuZDpleHBhbj86ZCE7Y29yZTpjbz9lOnIhO2V4cGxvZGU6ZT9wbG9kZTp4ITtob29rOmg/b2s6byE7Zm9yYmlkOj9vcmJpZDpmITt2aW9sZW50Oj9pb2xlbnQ6diE7bWFnbmV0Om1hP25ldDpnITtwcml2YXRlOnA/aXZhdGU6ciE7cHJvaGliaXQ6cD9vaGliaXQ6ciE7dXJiYW46dXJiYT86biE7ZWxlY3Ryb246ZWxlY3Rybz86biE7dGVtcHRhdGlvbjp0ZT9wdGF0aW9uOm0hO3NpbXBsaWNpdHk6c2ltcGxpY2k/eTp0ITtldm9sdmU6ZXZvbD9lOnYhO2JhcnJpZXI6YmFycmllPzpyITtldmlsOmV2aT86bCE7ZmVydGlsZTo/ZXJ0aWxlOmYhO3NpbXBsaWZ5OnM/bXBsaWZ5OmkhO3NtYXNoOnNtYXM/OmghO2lsbHVzaW9uOmlsbHVzaW8/Om4hO2ZhdWx0eTpmYXVsP3k6dCE7bnVtZXJvdXM6bnVtZT9vdXM6ciE7dGlzc3VlOnQ/c3N1ZTppITtzaHJpbms6c2g/aW5rOnIhO3RvcnR1cmU6dG9yP3VyZTp0ITttb2RpZnk6bW9kaWY/OnkhO251aXNhbmNlOm51P3NhbmNlOmkhO2RlcG9ydGF0aW9uOj9lcG9ydGF0aW9uOmQhO2FnZW5jeTphZ2VuP3k6YyE7dGlkeTp0aWQ/OnkhO3ZpYnJhdGU6dmliP2F0ZTpyITt1bml2ZXJzZTp1bml2ZXI/ZTpzITticmVhZHRoOmJyZWFkdD86aCE7cmVjcnVpdDpyP2NydWl0OmUhO2NvbHVtbjpjb2x1P246bSE7ZWxhc3RpYzplbGE/dGljOnMhO3BlcnNvbmFsOnBlcnNvbj9sOmEhO2hvc3RpbGU6aG9zdGlsPzplITtsZXN0Omw/c3Q6ZSE7d2l0aHN0YW5kOndpdGhzdGE/ZDpuITtkZWNhZGU6ZGVjP2RlOmEhO3VuaXF1ZTp1bmlxP2U6dSE7dml0YWxseTp2aXRhbD95OmwhO3VuZGVydGFrZTp1bmRlcnQ/a2U6YSE7aG9ycm9yOmhvcnI/cjpvITtwb3J0YWJsZTpwb3I/YWJsZTp0ITtleHBhbnNpb246P3hwYW5zaW9uOmUhO3NvbGFyOnM/bGFyOm8hO3N0dWZmOj90dWZmOnMhO2Vzc2VudGlhbDplc3NlP3RpYWw6biE7cHJvZml0YWJsZTpwcm8/aXRhYmxlOmYhO3Bhc3Npb246cGE/c2lvbjpzITtpbnNpZ25pZmljYW50Oj9uc2lnbmlmaWNhbnQ6aSE7cHJvZml0Oj9yb2ZpdDpwITtnZXJtOmc/cm06ZSE7ZGFzaDpkYT9oOnMhO3RlbmRlcjp0ZW4/ZXI6ZCE7c3RyaWtlOnN0cmlrPzplITtpbmZpbml0ZTppbj9pbml0ZTpmITtsYXVuY2g6bGE/bmNoOnUhO2VxdWF0aW9uOmVxP2F0aW9uOnUhO2RlY2F5OmRlYz95OmEhO3JlbWFya2FibGU6cmVtYT9rYWJsZTpyITtjb25zaXN0ZW50OmM/bnNpc3RlbnQ6byE7aG9seTpoP2x5Om8hO3NlbWljb25kdWN0b3I6c2VtaWNvbmR1Y3RvPzpyITtzaHV0dGxlOnNodT90bGU6dCE7cmFkaWNhbDpyP2RpY2FsOmEhO21pbmltdW06bWk/aW11bTpuITtzb3Jyb3c6cz9ycm93Om8hO2RpdmU6ZD92ZTppITtjb2xsaXNpb246Y29sbD9zaW9uOmkhO2pld2VsOj9ld2VsOmohO2NvbnRpbnVhbDpjb24/aW51YWw6dCE7b3ZhbDpvP2FsOnYhO29wdGltaXN0aWM6b3A/aW1pc3RpYzp0ITtsb29zZTpsb28/ZTpzITtyZW5kZXI6cmVuZD9yOmUhO2tuZWVsOmtuP2VsOmUhO21hcmluZTptP3JpbmU6YSE7bmV1dHJhbDpuZT90cmFsOnUhO2FjYWRlbXk6YWNhZGU/eTptITt2YXJpYXRpb246dmFyaWF0P29uOmkhO3JlbGV2YW50OnJlbGV2P250OmEhO3RyaWFsOj9yaWFsOnQhO3JlbHVjdGFudDpyZWx1P3RhbnQ6YyE7aGlnaGxpZ2h0Omg/Z2hsaWdodDppITthZHVsdDphZHVsPzp0ITtmYXRlOmY/dGU6YSE7dXR0ZXI6dXQ/ZXI6dCE7dGVuc2U6dD9uc2U6ZSE7aW50ZWdyYXRlOmluP2VncmF0ZTp0ITtkaXNwb3NlOmQ/c3Bvc2U6aSE7bWF0dXJlOm0/dHVyZTphITtjaGFvczpjaD9vczphITtwcm9zcGVyaXR5OnByb3NwZXJpdD86eSE7dmlydHVhbDp2P3J0dWFsOmkhO3ZlcnRpY2FsOj9lcnRpY2FsOnYhO2F1eGlsaWFyeTo/dXhpbGlhcnk6YSE7Y29tcGFyYXRpdmU6Y29tcGFyYXQ/dmU6aSE7c3BpdDpzcD90OmkhO2RlY2VudDpkZT9lbnQ6YyE7Z2xpbXBzZTpnbGltcHM/OmUhO3Jlc3RyYWludDpyP3N0cmFpbnQ6ZSE7Z3JhbnQ6Z3Jhbj86dCE7ZXhwb3J0OmV4cD9ydDpvITtjb25xdWVyOmNvbnF1ZT86ciE7bW9pc3Q6bW9pcz86dCE7b21pdDpvbT90OmkhO3ZlaGljbGU6dj9oaWNsZTplITtjYW1wdXM6Y2FtcHU/OnMhO2FjY29tcGxpc2g6P2Njb21wbGlzaDphITtleGNlc3M6ZT9jZXNzOnghO2luZGl2aWR1YWw6aW5kaT9pZHVhbDp2ITt1cmdlOnVyP2U6ZyE7cmlkaWN1bG91czpyP2RpY3Vsb3VzOmkhO3NlbnNpYmxlOj9lbnNpYmxlOnMhO2ZlbWFsZTo/ZW1hbGU6ZiE7c3VidXJiOnN1Yj9yYjp1ITtyZWplY3Q6cmVqZWM/OnQhO3RyaXVtcGg6dHJpdW1wPzpoITtyZXB1dGF0aW9uOnJlcHV0YT9pb246dCE7YXR0aXR1ZGU6YXR0aXR1P2U6ZCE7cmVzb2x2ZTpyZXNvbHY/OmUhO2ludGVybmFsOmludD9ybmFsOmUhO3RlbnNpb246dGVucz9vbjppITtlbmNsb3NlOmVuY2xvP2U6cyE7Z2VudWluZTpnZW4/aW5lOnUhO3VzYWdlOnVzYWc/OmUhO3RlbXBsZTp0ZW1wbD86ZSE7bHV4dXJ5Omw/eHVyeTp1ITtkcmlmdDpkcj9mdDppITtwYXJ0aWN1bGFybHk6cGFydGljdWw/cmx5OmEhO2V4Y2xhaW06ZXg/bGFpbTpjITtnbG9yaW91czpnbG8/aW91czpyITthdHRhY2g6YXQ/YWNoOnQhO3NsaWRlOnNsaWQ/OmUhO2Rpc2NyaW1pbmF0aW9uOj9pc2NyaW1pbmF0aW9uOmQhO2lkZW50aWZ5Omk/ZW50aWZ5OmQhO21lZGlhOm1lZGk/OmEhO3RpbWJlcjp0aW0/ZXI6YiE7dGVycml0b3J5OnRlcnJpdD9yeTpvITthcHByb3ZlOj9wcHJvdmU6YSE7cmVzZW1ibGU6cmVzZW1ibD86ZSE7ZXhwZW5kaXR1cmU6ZXhwZW5kP3R1cmU6aSE7cHJpb3I6cHJpbz86ciE7ZXhwZW5zaXZlOmU/cGVuc2l2ZTp4ITt3YXg6P2F4OnchO3RlbmRlbmN5Oj9lbmRlbmN5OnQhO2xlYWs6bGU/azphITtlcmVjdDplP2VjdDpyITtjb2lsOmNvaT86bCE7Ym90aGVyOmJvdD9lcjpoITtjYW5jZWw6Y2FuYz9sOmUhO3JlbW90ZTpyP21vdGU6ZSE7ZGlzY2lwbGluZTpkP3NjaXBsaW5lOmkhO29kZDpvP2Q6ZCE7YXdhcmQ6YXc/cmQ6YSE7bW9kZXN0Om1vZGU/dDpzITtzdGFydmF0aW9uOnN0YXI/YXRpb246diE7YmVmb3JlaGFuZDo/ZWZvcmVoYW5kOmIhO2NvbW1lbnQ6P29tbWVudDpjITticmVlZDpicj9lZDplITt2YW5pc2g6P2FuaXNoOnYhO2FwcG9pbnQ6YXBwbz9udDppITtpbnZhZGU6aW52YT9lOmQhO3Ryb3BpY2FsOnRyP3BpY2FsOm8hO2dhemU6P2F6ZTpnITtlbW90aW9uOmVtbz9pb246dCE7d2Fpc3Q6P2Fpc3Q6dyE7YXBwZXRpdGU6YXA/ZXRpdGU6cCE7dGVycm9yOnQ/cnJvcjplITtnbG9iYWw6Z2w/YmFsOm8hO3ZpcnR1ZTp2P3J0dWU6aSE7bGVhbjpsZWE/Om4hO21hcnZlbG91czptYT92ZWxvdXM6ciE7c3RyZW5ndGg6cz9yZW5ndGg6dCE7ZHVyYWJsZTo/dXJhYmxlOmQhO2JhY3RlcmlhOmJhP3RlcmlhOmMhO3RyZW1lbmRvdXM6dHJlbWU/ZG91czpuITttb2lzdHVyZTo/b2lzdHVyZTptITtpbmRleDppbmQ/eDplITtpc29sYXRlOmlzb2xhP2U6dCE7ZW50aHVzaWFzbTplbnRodT9pYXNtOnMhO2dpYW50Omc/YW50OmkhO3JldmVhbDpyZT9lYWw6diE7c2VjdXJlOnNlY3VyPzplITtkaXN0dXJiOmQ/c3R1cmI6aSE7YWNrbm93bGVkZ2U6P2Nrbm93bGVkZ2U6YSE7bGlrZWxpaG9vZDpsaWtlP2lob29kOmwhO2NvcGU6Y28/ZTpwITthYnNvbHV0ZTphYnNvbD90ZTp1ITthbGdlYnJhOmFsZz9icmE6ZSE7dW5kZXJncmFkdWF0ZTp1bmRlcmdyYWR1YT9lOnQhO3JlbGlhYmxlOnJlbD9hYmxlOmkhO3ZhY3V1bTp2YWM/dW06dSE7dmlvbGV0OnZpP2xldDpvITtnb2xmOmdvP2Y6bCE7cHJpbmNpcGxlOnByaW4/aXBsZTpjITttaWxkOj9pbGQ6bSE7YXBwbGljYW50OmFwcGxpY2E/dDpuITtyZXNjdWU6cj9zY3VlOmUhO3ZhbGxleTo/YWxsZXk6diE7Z3JhbmQ6Z3Jhbj86ZCE7c3BvdDpzP290OnAhO2RlbGljYXRlOmRlP2ljYXRlOmwhO3lhd246P2F3bjp5ITtncmF0ZWZ1bDo/cmF0ZWZ1bDpnITtkZWNvcmF0ZTpkZWNvcj90ZTphITtjZXJlbW9ueTpjZXJlbW9uPzp5ITt2b2x1bnRhcnk6dj9sdW50YXJ5Om8hO2h1bWJsZTo/dW1ibGU6aCE7Y2FsY3VsYXRlOj9hbGN1bGF0ZTpjITtvYnNjdXJlOj9ic2N1cmU6byE7dmFjYW50OnZhP2FudDpjITtjYXB0dXJlOmM/cHR1cmU6YSE7Z2FsbG9uOmdhP2xvbjpsITtuZXZlcnRoZWxlc3M6bmU/ZXJ0aGVsZXNzOnYhO3NwbGl0OnNwbD90OmkhO2hlbmNlOmhlbj9lOmMhO21hbnVmYWN0dXJlOm1hbj9mYWN0dXJlOnUhO29yYWw6P3JhbDpvITtlbXBoYXNpemU6ZW1waGFzaXo/OmUhO3VyZ2VudDp1P2dlbnQ6ciE7YmFjaGVsb3I6YmFjaGVsP3I6byE7c3VidHJhY3Q6c3VidHJhP3Q6YyE7dHJhbnNwb3J0OnRyYW5zcG8/dDpyITthd2t3YXJkOmF3a3dhcj86ZCE7YmFuOmJhPzpuITtidW5kbGU6YnU/ZGxlOm4hO2F3YWl0OmE/YWl0OnchO3NoYWxsb3c6c2g/bGxvdzphITtiYXJyZWw6P2FycmVsOmIhO2luZXZpdGFibGU6aW5ldml0YWJsPzplITtnbG9iZTpnP29iZTpsITthcmJpdHJhcnk6YT9iaXRyYXJ5OnIhO3Nha2U6cz9rZTphITtncmF0aXR1ZGU6Z3JhdGl0P2RlOnUhO3Jlc2lzdGFudDpyZXNpP3RhbnQ6cyE7aW1wb3J0Oj9tcG9ydDppITtjb21wZXRlOmNvbT9ldGU6cCE7bW9yYWw6P29yYWw6bSE7ZXhwbG9yZTplP3Bsb3JlOnghO2ZsZXhpYmxlOmZsZXhpYmw/OmUhO3NvZnR3YXJlOnNvZnR3YXI/OmUhO294eWdlbjpveHlnP246ZSE7Y2FyZWVyOmNhcj9lcjplITtvZmZlbmQ6bz9mZW5kOmYhO2FidW5kYW50Oj9idW5kYW50OmEhO2RlZmVjdDo/ZWZlY3Q6ZCE7b3JnYW46bz9nYW46ciE7dHJhcDp0P2FwOnIhO3RlZGlvdXM6P2VkaW91czp0ITtnZW5lcmF0ZTpnZW5lcmE/ZTp0ITtwYXJhbGxlbDpwYXI/bGxlbDphITt1dGlsaXR5OnU/aWxpdHk6dCE7bnVjbGVhcjpudWNsP2FyOmUhO2NvYXJzZTo/b2Fyc2U6YyE7c2VtZXN0ZXI6P2VtZXN0ZXI6cyE7c3BsZW5kaWQ6c3BsZT9kaWQ6biE7c2NhbjpzYz9uOmEhO2V4cGxvc2lvbjpleHBsb3NpP246byE7ZGVzZXJ2ZTpkZXNlP3ZlOnIhO3JldGFpbjpyZXRhaT86biE7dGlkZTp0aWQ/OmUhO3JlcGV0aXRpb246cmVwZXRpdGlvPzpuITthcmNoaXRlY3Q6P3JjaGl0ZWN0OmEhO2RlbGF5Oj9lbGF5OmQhO3N1Ym1lcmdlOnN1Ym1lcmc/OmUhO3Byb21vdGU6cD9vbW90ZTpyITtyZXN0cmFpbjpyZXN0cmE/bjppITtwcm9tcHQ6cD9vbXB0OnIhO3ByZWNhdXRpb246cHJlP2F1dGlvbjpjITtlbGJvdzplbD9vdzpiITtkaXNwbGF5OmRpc3BsP3k6YSE7dml0YWw6dml0YT86bCE7dmVudHVyZTp2ZW4/dXJlOnQhO2FkdmVydGlzZW1lbnQ6YWR2ZXI/aXNlbWVudDp0ITtjb21taXQ6P29tbWl0OmMhO2x1bmFyOj91bmFyOmwhO3RvbmU6dG8/ZTpuITtmbGFzaDpmP2FzaDpsITtpbmZlcjppbmZlPzpyITthcHBlYWw6YXBwZWE/OmwhO2FyaXNlOmE/aXNlOnIhO3N0YWxlOnM/YWxlOnQhO3N0aW11bGF0ZTpzdGk/dWxhdGU6bSE7b2JsaWdlOm9ibGlnPzplITtwYXNzcG9ydDo/YXNzcG9ydDpwITtvcHRpb25hbDpvcHRpP25hbDpvITtzdHJhdGVnaWM6c3RyP3RlZ2ljOmEhO3VuaXZlcnNhbDp1bml2ZT9zYWw6ciE7dm9sY2Fubzp2b2w/YW5vOmMhO3RyZW5kOnRyZT9kOm4hO29ic3RhY2xlOm9ic3RhY2w/OmUhO3BhcnRpYWw6cGE/dGlhbDpyITt2YWxpZDo/YWxpZDp2ITticmFrZTpiP2FrZTpyITtkdW1wOmR1P3A6bSE7c2lnbmF0dXJlOnNpZz9hdHVyZTpuITtzbGlwOj9saXA6cyE7d2hhdHNvZXZlcjp3aGF0c29lP2VyOnYhO2xpdGVyOmw/dGVyOmkhO21haW50YWluOm1haW50P2luOmEhO2F3ZnVsOmF3Zj9sOnUhO2RlYnQ6ZGU/dDpiITtyZXZlbnVlOnJlP2VudWU6diE7d2VhbHRoeTp3ZWFsdGg/OnkhO2V4YWdnZXJhdGU6ZXhhZ2dlcmF0PzplITtzdXNwaWNpb246c3VzcGk/aW9uOmMhO3JlbGVhc2U6cmVsZT9zZTphITtzcHVyOnNwP3I6dSE7bGljZW5zZTpsaWM/bnNlOmUhO2dhc29saW5lOmdhcz9saW5lOm8hO2dhbGxlcnk6Z2E/bGVyeTpsITtzdGFibGU6cz9hYmxlOnQhO2dsb3J5Omdsbz95OnIhO25ha2VkOm5ha2U/OmQhO3ZhZ3VlOnZhP3VlOmchO2ludGVyZmVyZTppbnRlcmZlcj86ZSE7dHJhbnNwbGFudDp0cmFuc3A/YW50OmwhO3RlbmQ6dGU/ZDpuITt0cmVhdHk6dHJlP3R5OmEhO3dhbmRlcjp3P25kZXI6YSE7YXZlbnVlOmF2ZW51PzplITtxdWl0Oj91aXQ6cSE7bmF2aWdhdGlvbjpuP3ZpZ2F0aW9uOmEhO3ByaW5jaXBhbDpwP2luY2lwYWw6ciE7aW5zdXJlOmk/c3VyZTpuITtwcm9taW5lbnQ6cHJvbWluZW4/OnQhO2ZhdGlndWU6Zj90aWd1ZTphITt2aXJ1czp2aXI/czp1ITtjb21wYXJhYmxlOmNvbXBhcmE/bGU6YiE7cmVnaW9uOnJlZ2k/bjpvITt0dWl0aW9uOnR1aXRpbz86biE7ZGF0YTpkYXQ/OmEhO2hhc3RlOmhhc3Q/OmUhO2tub3Q6P25vdDprITt1bHRpbWF0ZTo/bHRpbWF0ZTp1ITtuZWdsZWN0Om5lP2xlY3Q6ZyE7c25hcDpzbj9wOmEhO3pvbmU6em8/ZTpuITtmZXJ0aWxpemVyOmY/cnRpbGl6ZXI6ZSE7bWlzdDptaT90OnMhO3NldmVyZTpzP3ZlcmU6ZSE7bGlhYmxlOmw/YWJsZTppITtpc3N1ZTppcz91ZTpzITtleHRyYW9yZGluYXJ5OmV4dHJhb3JkaW5hP3k6ciE7dHJlbWJsZTp0cj9tYmxlOmUhO2VjaG86ZWM/bzpoITtob3JyaWJsZTpob3I/aWJsZTpyITtnZWFyOmc/YXI6ZSE7Y29uc2VudDpjbz9zZW50Om4hO2Zyb3duOmY/b3duOnIhO2V2YWx1YXRlOmV2YWx1P3RlOmEhO21vdGl2YXRlOm1vdGl2YXQ/OmUhOzo/OnVuZGVmaW5lZA==");
dc=dc.split("!;");
zhyg=dc.length-2;//最后一个单词
xs1z="";
dct=new Array();
threads.start(function(){
sxt();
});
function sxt(){
xs1z="";
dct=xdc().split(":");
xs1z=dct[1]+"\n";
xs1(xs1z);
dct[3]=fy(dct[0]);
xs1z+=dct[3];
xs1(xs1z);
}
function xs1(str){
ui.run(()=>{
ui.text1.setText(str);});
}
function xdc(){
var tmp=random(0,zhyg);
var tmp2=dc[tmp];
dc[tmp]=dc[zhyg];
dc[zhyg]=tmp2;
zhyg--;
return dc[zhyg+1];
}



function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}

function fy(str){
str=java.net.URLEncoder.encode(str,"GBK");
var url="http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i="+str;
return http.get(url).body.json().translateResult[0][0].tgt;
}

threads.start(function(){
time=new Date().getTime();
while(true){
    sleep(100);
time2=600-(new Date().getTime()-time)/1000;
if(time2>0){
timef=parseInt(time2/60);
timem=parseInt(time2%60);
timez=pf(timef,2)+":"+pf(timem,2);
ui.run(()=>{ui.sysj.text(timez+"")});
}else{
alert("恭喜你完成本次答题，获得分数为\n"+zf);
time=new Date().getTime();
}

}
});

function qc(str,h){
str=str.split("\n");
tmp=new Array;
j=0;
for(i=str.length-h;i<str.length;i++){
    tmp[j]=str[i];
    j++;
 }
return tmp.join("\n");
}


function pf(num, length) {
        return (Array(length).join('0') + num).slice(-length);
}



