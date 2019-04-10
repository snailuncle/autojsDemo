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
ui.bz.click(function(){
ui.bzxs.text(dct[0]);
});

ui.anq.click(()=>{dj("q");});ui.anw.click(()=>{dj("w");});ui.ane.click(()=>{dj("e");});ui.anr.click(()=>{dj("r");});ui.ant.click(()=>{dj("t");});ui.any.click(()=>{dj("y");});ui.anu.click(()=>{dj("u");});ui.ani.click(()=>{dj("i");});ui.ano.click(()=>{dj("o");});ui.anp.click(()=>{dj("p");});
ui.ana.click(()=>{dj("a");});ui.ans.click(()=>{dj("s");});ui.and.click(()=>{dj("d");});ui.anf.click(()=>{dj("f");});ui.ang.click(()=>{dj("g");});ui.anh.click(()=>{dj("h");});ui.anj.click(()=>{dj("j");});ui.ank.click(()=>{dj("k");});ui.anl.click(()=>{dj("l");});
ui.anz.click(()=>{dj("z");});ui.anx.click(()=>{dj("x");});ui.anc.click(()=>{dj("c");});ui.anv.click(()=>{dj("v");});ui.anb.click(()=>{dj("b");});ui.ann.click(()=>{dj("n");});ui.anm.click(()=>{dj("m");});
zf=0;
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

dc=b64("77u/c2ltdWxhdGU677u/c2ltP2xhdGU6dSE7a2lkbmFwOmtpZG5hPzpwITthY3F1YWludDphY3F1YWk/dDpuITtyZW1haW5kZXI6cmVtYWluZGU/OnIhO2NvbXBpbGU6Y29tcGlsPzplITtyaXR1YWw6cmk/dWFsOnQhO2NvbnRlbmQ6Y29udGVuPzpkITtzcG9uc29yOnNwP25zb3I6byE7Y29tcGFjdDpjb20/YWN0OnAhO2p1bms6anVuPzprITtpbnRlcm1pdHRlbnQ6aW50ZXJtaXR0P250OmUhO2xlZ2l0aW1hdGU6bGVnP3RpbWF0ZTppITtwcm9iZTo/cm9iZTpwITtibGF6ZTpibGE/ZTp6ITthdHRlbmRhbnQ6YXR0P25kYW50OmUhO3NvYmVyOj9vYmVyOnMhO2FkaGVyZSB0bzphZGhlcj8gdG86ZSE7ZnJhZ21lbnQ6ZnJhZ21lP3Q6biE7Y29udGFtaW5hdGU6Y29udGFtaT9hdGU6biE7dmljaW5pdHk6dmljaW5pdD86eSE7c3VidGxlOnN1Yj9sZTp0ITttYXR1cmU6bWF0dT9lOnIhO3ByZWRvbWluYW50Oj9yZWRvbWluYW50OnAhO2ltbXVuZTppbT91bmU6bSE7ZXhwbG9pdDpleHA/b2l0OmwhO2ludHVpdGlvbjppP3R1aXRpb246biE7ZW1ib2R5OmU/Ym9keTptITtkZXNjZW5kYW50OmRlc2NlP2RhbnQ6biE7ZHVwbGljYXRlOmR1cGxpY2E/ZTp0ITthZHZlcnNlOmFkdmU/c2U6ciE7c3VibWl0IHRvOnN1Ym1pPyB0bzp0ITtwYXRlbnQ6cGF0ZT90Om4hO211bHRpcGx5Om11bHRpcD95OmwhO2Fic3VyZDphYnM/cmQ6dSE7YWRkaWN0Oj9kZGljdDphITttYWludGVuYW5jZTptYWk/dGVuYW5jZTpuITtnZW51aW5lOmc/bnVpbmU6ZSE7cmVzdG9yZTpyZXM/b3JlOnQhO2Rpc2Nlcm46ZGlzY2VyPzpuITtzdGVlcDo/dGVlcDpzITtzZW50aW1lbnQ6c2VudGk/ZW50Om0hO2ludGVydmVuZTppbnRlcnZlP2U6biE7dGVtcGVyYW1lbnQ6P2VtcGVyYW1lbnQ6dCE7c2F2YWdlOj9hdmFnZTpzITtzY29wZTpzY29wPzplITtyZXNvcnQgdG86cmVzb3J0IHQ/Om8hO3Rvc3M6P29zczp0ITtkaXNwb3NlIG9mOmRpc3Bvc2U/b2Y6ICE7cHJlc3RpZ2U6cHJlc3RpZz86ZSE7aG9sbG93Omg/bGxvdzpvITthY2Nlc3NpYmxlOmFjYz9zc2libGU6ZSE7ZXZva2U6ZXY/a2U6byE7cHJvZmljaWVuY3k6cHJvZmljaWVuP3k6YyE7aW5oZXJlbnQ6aW5oZXJlbj86dCE7dHJhbnNpdDp0cmE/c2l0Om4hO3ByZXk6cHJlPzp5ITtlbmRlYXZvcjplbmRlYT9vcjp2ITtlbGFib3JhdGU6P2xhYm9yYXRlOmUhO2NyaXRlcmlvbjpjcml0ZXJpP246byE7d3JpbmtsZTo/cmlua2xlOnchO3ByZXZhbGVudDo/cmV2YWxlbnQ6cCE7aW5jaWRlbmNlOmluYz9kZW5jZTppITtjb252ZXk6Y29udj95OmUhO2NvcmRpYWw6Yz9yZGlhbDpvITtkcmFzdGljOmRyYT90aWM6cyE7aW1wZXJhdGl2ZTppbXA/cmF0aXZlOmUhO3VwaG9sZDp1P2hvbGQ6cCE7aGFyYm9yOmhhcmJvPzpyITtvdmVyd2hlbG06b3ZlP3doZWxtOnIhO2hhbXBlcjpoYT9wZXI6bSE7cHJlbWlzZTpwcj9taXNlOmUhO3Jlc2VtYmxhbmNlOnJlc2VtYmxhP2NlOm4hO3ZlbnQ6P2VudDp2ITtzY2FuZGFsOnNjP25kYWw6YSE7ZnVyaW91czpmdXI/b3VzOmkhO2RvbWluYXRlOj9vbWluYXRlOmQhO3Byb3ZvY2F0aXZlOnByP3ZvY2F0aXZlOm8hO2NvbXBsaW1lbnQ6Y29tcGw/bWVudDppITthcnJheTphcnI/eTphITthcnJvZ2FudDphcnJvP2FudDpnITtoYXVsOmhhP2w6dSE7aGF1bnQ6aGF1P3Q6biE7ZXhwaXJlOmV4cGlyPzplITtzd2luZzpzd2k/ZzpuITthc3N1cmFuY2U6YT9zdXJhbmNlOnMhO2luZGlnbmFudDppbmRpZ24/bnQ6YSE7cHJvZm91bmQ6cHJvZj91bmQ6byE7ZmVhc2libGU6ZmU/c2libGU6YSE7Y3luaWNhbDpjP25pY2FsOnkhO29iZWRpZW50Om9iP2RpZW50OmUhO2NvbmZpbmU6Yz9uZmluZTpvITtwYXZlOnBhP2U6diE7ZnVybmlzaDpmdT9uaXNoOnIhO3RyYW5zaXRpb246dHJhbnNpP2lvbjp0ITt0cmlnZ2VyOnRyaWc/ZXI6ZyE7bWFzazptP3NrOmEhO2lycml0YXRlOmlycmk/YXRlOnQhO2NvbnZlcnQ6Yz9udmVydDpvITtleHRlcm5hbDpleD9lcm5hbDp0ITtmYWJyaWNhdGU6ZmFicmk/YXRlOmMhO2dsaXR0ZXI6Z2xpdHRlPzpyITt0YXJpZmY6dGFyaWY/OmYhO3JldmVsYXRpb246cmV2P2xhdGlvbjplITtoaW5kZXI6aGluP2VyOmQhO2luc3RpbmN0OmluP3RpbmN0OnMhO3Byb2xvbmc6cHJvbD9uZzpvITtpbmNlbnRpdmU6aW5jZW50aT9lOnYhO2NvbnRyaXZlOmNvbnRyaXY/OmUhO2Fib2xpc2g6YWJvbD9zaDppITticm93c2U6YnJvP3NlOnchO2FwcGVhbDphcHBlP2w6YSE7aW50cmluc2ljOmludHJpbj9pYzpzITthbGxvY2F0ZTphbGxvP2F0ZTpjITtkZWZlbmRhbnQ6ZGVmZT9kYW50Om4hO3ZhcmlhdGlvbjp2YXJpYT9pb246dCE7cmVmdXRlOnJlZnU/ZTp0ITtjcnVkZTpjcnU/ZTpkITtkZXNjZW5kOmQ/c2NlbmQ6ZSE7cGF0cmlvdGljOnBhP3Jpb3RpYzp0ITtyb3Q6P290OnIhO2NvbnRlbXB0OmNvbnRlbT90OnAhO2hhcm5lc3M6aGFybj9zczplITtyZWFzc3VyZTpyZWE/c3VyZTpzITtjb25zZXJ2ZTpjb25zZXI/ZTp2ITtjb25zZW5zdXM6Y29uc2VuP3VzOnMhO3NwZWN0YXRvcjpzcD9jdGF0b3I6ZSE7cHVibGljaXR5OnA/YmxpY2l0eTp1ITtyZXRvcnQ6cmV0P3J0Om8hO2ludGltYXRlOj9udGltYXRlOmkhO3BsZWRnZTpwP2VkZ2U6bCE7cmVtZWR5Oj9lbWVkeTpyITt3YXJmYXJlOndhP2ZhcmU6ciE7YW1wbGlmeTphbXBsaWY/OnkhO2NvbXBvbmVudDpjb20/b25lbnQ6cCE7ZGVkdWNlOmQ/ZHVjZTplITtkaXN0b3J0OmRpc3RvP3Q6ciE7YWJub3JtYWw6YWJub3I/YWw6bSE7ZGltOmRpPzptITtzZW5zaWJsZTpzZW5zaWI/ZTpsITtkb2N1bWVudDpkb2N1P2VudDptITtjb21tdXRlOmNvP211dGU6bSE7ZGVzdGlueTpkZXN0aT95Om4hO3JldW5pb246P2V1bmlvbjpyITtjYXRlciB0bzpjYT9lciB0bzp0ITt2ZXJnZTo/ZXJnZTp2ITtwcmVjZWRlOnA/ZWNlZGU6ciE7cHJlc2NyaXB0aW9uOnA/ZXNjcmlwdGlvbjpyITtzaW11bHRhbmVvdXNseTpzaW11bHRhbmVvP3NseTp1ITtzZWVtaW5nbHk6c2VlP2luZ2x5Om0hO3N0dW1ibGU6c3R1bWI/ZTpsITtub3VyaXNoOm5vdXJpP2g6cyE7bW9iaWxpemU6bW9iP2xpemU6aSE7aW50ZWxsaWdpYmxlOmludGVsP2lnaWJsZTpsITt5aWVsZDp5aWVsPzpkITthbGxlZ2U6YWxsP2dlOmUhO3NoaWVsZDpzaGllP2Q6bCE7d3JldGNoZWQ6d3JldGNoZT86ZCE7ZXBpZGVtaWM6ZT9pZGVtaWM6cCE7YnJlZWQ6P3JlZWQ6YiE7cGFydGljaXBhbnQ6cGFydGljaT9hbnQ6cCE7ZnJhZ2lsZTpmcmFnaWw/OmUhO2RpbWluaXNoOmRpbWluP3NoOmkhO2JvdW5jZTpib3VuYz86ZSE7YmFsZDpiP2xkOmEhO2xpYWJsZSB0bzpsaT9ibGUgdG86YSE7YWNrbm93bGVkZ2U6YWNrbm93bGU/Z2U6ZCE7aWduaXRlOmlnP2l0ZTpuITthY2NlbGVyYXRlOmFjY2VsZXJhdD86ZSE7YWdncmF2YXRlOj9nZ3JhdmF0ZTphITtpbml0aWF0ZTppP2l0aWF0ZTpuITtlc3NlbmNlOmVzc2VuYz86ZSE7bGFiZWw6bGFiP2w6ZSE7cHJldmFpbCBvdmVyOnByZXZhaWwgP3ZlcjpvITt1bmRlcmx5aW5nOnVuZGVybD9pbmc6eSE7YnJ1dGFsOmI/dXRhbDpyITtvcmllbnQ6b3JpZW4/OnQhO2V4dHJhdmFnYW50OmV4dHJhdmFnYT90Om4hO3N0cml2ZTpzdHI/dmU6aSE7Y29pbmNpZGVuY2U6Y29pbmM/ZGVuY2U6aSE7amVvcGFyZGl6ZTpqZW9wYXJkaT9lOnohO3JpdmFsOnJpP2FsOnYhO2hhbmRpY2FwOj9hbmRpY2FwOmghO2ludGltaWRhdGU6aW50aW1pZGF0PzplITttZWRpYXRlOm1lZGlhdD86ZSE7aW1hZ2luYXJ5OmltYWc/bmFyeTppITtjb3VudGVycGFydDpjb3U/dGVycGFydDpuITtub3RhYmxlOm5vdD9ibGU6YSE7c3VwcHJlc3M6cz9wcHJlc3M6dSE7cG9uZGVyOj9vbmRlcjpwITttYXJnaW5hbDptYXJnP25hbDppITtiaWFzOmJpP3M6YSE7Y29uY2Vzc2lvbjo/b25jZXNzaW9uOmMhO3RyaXZpYWw6dHJpP2lhbDp2ITtjb25zaXN0ZW50OmNvbj9pc3RlbnQ6cyE7ZXhwZWRpdGlvbjpleHBlZD90aW9uOmkhO2ZvcmdlOmZvP2dlOnIhO3NjYXR0ZXI6c2NhP3Rlcjp0ITtwcmVjZWRlbnQ6cHJlY2VkP250OmUhO21pZ3JhdGU6bWlncj90ZTphITtjb21wbGVtZW50OmNvbXBsZW1lP3Q6biE7YWNjZXNzb3J5OmFjYz9zc29yeTplITtjb252ZXJnZTpjb252ZXI/ZTpnITtwcm9taW5lbnQ6cHJvbT9uZW50OmkhO2ZhY2lsaXRhdGU6ZmFjaWxpdD90ZTphITtpbnRyaWNhdGU6aW4/cmljYXRlOnQhO2NvbnNwaWN1b3VzOj9vbnNwaWN1b3VzOmMhO2NvbnN0aXR1dGU6P29uc3RpdHV0ZTpjITtoaWdobGlnaHQ6aGlnaD9pZ2h0OmwhO2FkZHJlc3M6P2RkcmVzczphITtib25kOmJvP2Q6biE7dGVudGF0aXZlOnRlbnRhdGl2PzplITtpbnRlZ3JpdHk6aW50ZWc/aXR5OnIhO2FjcXVpcmU6YWNxdT9yZTppITtzaGlmdDpzP2lmdDpoITtiZXdpbGRlcjpiZXdpbGRlPzpyITtkb29tOmQ/b206byE7b2Zmc2V0Oj9mZnNldDpvITtyaXA6cj9wOmkhO2NvbXBseSB3aXRoOmNvbT9seSB3aXRoOnAhO2RldGVyaW9yYXRlOmQ/dGVyaW9yYXRlOmUhO2Zsb3VyaXNoOmZsbz9yaXNoOnUhO3ByaW9yaXR5OnByaW9yP3R5OmkhO2ludGVncmFsOmludD9ncmFsOmUhO2Rpc3Bvc2l0aW9uOmRpc3Bvcz90aW9uOmkhO2JsZWFrOmJsZT9rOmEhO3Jlc3VtZTpyZXN1P2U6bSE7ZGVsaWJlcmF0ZTpkZWxpYj9yYXRlOmUhO2Zvcm11bGF0ZTpmb3JtdWw/dGU6YSE7cmV0cmlldmU6cmV0P2lldmU6ciE7dGVzdGlmeTp0P3N0aWZ5OmUhO21hc2N1bGluZTo/YXNjdWxpbmU6bSE7b2Rvcjo/ZG9yOm8hO2xpdGVyYWxseTpsaXQ/cmFsbHk6ZSE7ZGVwcml2ZTpkZXByP3ZlOmkhO2NsaW5nIHRvOmNsaW4/IHRvOmchO2JsdW5kZXI6Ymx1bj9lcjpkITtjb25zb2xpZGF0ZTpjb25zP2xpZGF0ZTpvITtzaGF0dGVyOnM/YXR0ZXI6aCE7Y29uZmlkZW50aWFsOmNvbmZpZGVudGk/bDphITt0ZXh0dXJlOnRleHQ/cmU6dSE7YmV0cmF5OmJlP3JheTp0ITtjb250ZW1wbGF0ZTpjb250ZW1wbGF0PzplITt0aHJpdmU6P2hyaXZlOnQhO2FuYWxvZ3k6YT9hbG9neTpuITtkaWxlbW1hOmRpbD9tbWE6ZSE7Z2xhbW91cjpnbGFtP3VyOm8hO2FjY29tbW9kYXRlOmFjP29tbW9kYXRlOmMhO3Byb21wdDo/cm9tcHQ6cCE7dHVtYmxlOj91bWJsZTp0ITtlbGljaXQ6ZWxpYz90OmkhO2ZsdWN0dWF0ZTpmP3VjdHVhdGU6bCE7aW1wbGljaXQ6aW1wbGk/aXQ6YyE7c2V2ZXJlOnNldmVyPzplITtsaW5nZXI6bGluP2VyOmchO3RyYWl0OnRyP2l0OmEhO29ic2N1cmU6bz9zY3VyZTpiITtkZWZlY3Q6ZGVmZWM/OnQhO3RyYW5zYWN0aW9uOnRyP25zYWN0aW9uOmEhO3NwZWN0YWNsZTpzcGU/dGFjbGU6YyE7Y29sbGlkZTpjb2xsP2RlOmkhO3NuZWFrOnM/ZWFrOm4hO2ltcGV0dXM6aW1wZXQ/czp1ITtlcnVwdDplP3VwdDpyITthbGVydDphbGVyPzp0ITthdXRoZW50aWM6YXU/aGVudGljOnQhO3N1cGVydmlzZTpzdXBlcnZpcz86ZSE7dG94aWM6dG94aT86YyE7Y29ycnVwdDpjP3JydXB0Om8hO2RvbmF0ZTpkb25hdD86ZSE7cmVzdHJhaW50OnJlc3RyP2ludDphITtlbG9xdWVudDplbG9xdWU/dDpuITthc3BpcmF0aW9uOj9zcGlyYXRpb246YSE7dHJhbnNwbGFudDp0cmFuc3BsP250OmEhO2NvbGxhYm9yYXRpb246Y29sbD9ib3JhdGlvbjphITtlbGltaW5hdGU6ZT9pbWluYXRlOmwhO3ZlcnNhdGlsZTp2ZXJzYT9pbGU6dCE7ZWxhcHNlOmVsP3BzZTphITtmZWVibGU6ZmVlP2xlOmIhO2NvbmZvcm0gdG86Y29uZm9yPyB0bzptITttYWduaWZ5Om1hZ24/Znk6aSE7ZGVkaWNhdGU6ZGVkaWM/dGU6YSE7c3BlY3VsYXRlOnM/ZWN1bGF0ZTpwITtsaWJlcmFsOmxpYj9yYWw6ZSE7aW52YXJpYWJseTo/bnZhcmlhYmx5OmkhO2RlZ3JhZGU6ZGVncmE/ZTpkITthYnJ1cHQ6YWJydXA/OnQhO2NvbXB1bHNvcnk6Y29tcD9sc29yeTp1ITt0cmFuc2llbnQ6dHJhbnNpP250OmUhO3N0cmF5OnN0cj95OmEhO3JlY29uY2lsZTpyZT9vbmNpbGU6YyE7cmVmcmFpbiBmcm9tOnJlZnI/aW4gZnJvbTphITtlbGlnaWJsZTplbD9naWJsZTppITtkZWdlbmVyYXRlOmRlZ2U/ZXJhdGU6biE7c3Vic3RhbnRpYWw6c3Vicz9hbnRpYWw6dCE7cGVydGluZW50OnBlP3RpbmVudDpyITtzdXN0YWluOj91c3RhaW46cyE7bm90b3Jpb3VzOm5vdG8/aW91czpyITtwZXJjZWl2ZTpwZXI/ZWl2ZTpjITtzdWJtZXJnZTpzdWJtP3JnZTplITtmbGV4aWJsZTo/bGV4aWJsZTpmITthc3NhdWx0OmFzc2E/bHQ6dSE7Y29udHJhZGljdDpjbz90cmFkaWN0Om4hO3N1YnNjcmliZSB0bzpzdWI/Y3JpYmUgdG86cyE7b3ZlcmFsbDo/dmVyYWxsOm8hO3N0YWJpbGl0eTpzdGFiaT9pdHk6bCE7dnVsbmVyYWJsZTp2dWxuZT9hYmxlOnIhO3Byb3NwZXJpdHk6cHJvc3Blcml0Pzp5ITtzdXBwbGVtZW50OnM/cHBsZW1lbnQ6dSE7Y29tbWVuY2U6P29tbWVuY2U6YyE7cmVzZW50OnJlc2VuPzp0ITtuYWl2ZTo/YWl2ZTpuITtpZGVudGlmeSB3aXRoOmlkZW4/aWZ5IHdpdGg6dCE7YXBwbGF1ZDphcD9sYXVkOnAhO3BhdHJvbDpwYT9yb2w6dCE7c3RpbXVsdXM6c3RpP3VsdXM6bSE7cGVybWVhdGU6cD9ybWVhdGU6ZSE7cHJlYWNoOj9yZWFjaDpwITtkaXp6eTpkaXo/eTp6ITtkaXN0cmVzczpkaXN0cmU/czpzITt1bmRlcmVzdGltYXRlOj9uZGVyZXN0aW1hdGU6dSE7ZGlzYXN0cm91czpkaXNhc3Q/b3VzOnIhO2luaXRpYXRpdmU6aW5pP2lhdGl2ZTp0ITt0aW1pZDp0aW1pPzpkITtpbXB1bHNlOmltcD9sc2U6dSE7ZmFzY2luYXRlOj9hc2NpbmF0ZTpmITtjb25zZXF1ZW50OmNvbnNlcT9lbnQ6dSE7aWxsdXNpb246aWxsP3Npb246dSE7ZGl2ZXJ0OmRpdmVyPzp0ITtjb25zdWx0YW50OmNvbnN1bHQ/bnQ6YSE7c3RhZ2dlcjpzdGFnP2VyOmchO3NjcmFwZTpzYz9hcGU6ciE7Ymxpbms6Ymxpbj86ayE7cHJlY2x1ZGU6cHJlY2w/ZGU6dSE7Z3JvcGU6Z3JvP2U6cCE7aW5ncmVkaWVudDppbmdyP2RpZW50OmUhO2NhbXBhaWduOmM/bXBhaWduOmEhO3RvbGVyYW50Oj9vbGVyYW50OnQhO2F2ZXJ0OmF2ZXI/OnQhO2V4dGluZ3Vpc2g6ZXh0aW5nP2lzaDp1ITtibHVudGx5Oj9sdW50bHk6YiE7cmlnb3JvdXM6cmlnb3JvdT86cyE7bmVnbGlnaWJsZTpuZWc/aWdpYmxlOmwhO2FwdDo/cHQ6YSE7cGVycGV0dWFsOnBlcnA/dHVhbDplITtzdGF0aW9uYXJ5OnN0YXRpbz9hcnk6biE7bGl0dGVyOmxpP3Rlcjp0ITtzY3J1dGlueTo/Y3J1dGlueTpzITticmliZTpicmk/ZTpiITtzdHJpa2luZzpzdHI/a2luZzppITtzdWJzaWR5OnN1P3NpZHk6YiE7YXNjZW5kOmFzP2VuZDpjITtkaXNjYXJkOmRpP2NhcmQ6cyE7ZXhwZWw6ZT9wZWw6eCE7cmVwZWw6cmVwP2w6ZSE7bWFuaWZlc3Q6bWFuaWZlP3Q6cyE7dHVyYnVsZW50OnQ/cmJ1bGVudDp1ITtzdWNjZXNzb3I6c3VjY2Vzc28/OnIhO3Jlc3BlY3RpdmU6cmVzcGVjP2l2ZTp0ITtjb250cm92ZXJzaWFsOmNvP3Ryb3ZlcnNpYWw6biE7Y2Vhc2U6Y2VhP2U6cyE7dGFuZ2xlIHdpdGg6dGFuZ2xlIHdpdD86aCE7cmFuZG9tOnI/bmRvbTphITttb3RpdmF0ZTptb3RpP2F0ZTp2ITt0ZWFzZTp0P2FzZTplITtzdW1tb246c3VtbW8/Om4hO3N0cmFpZ2h0Zm9yd2FyZDpzdHI/aWdodGZvcndhcmQ6YSE7cHJvbmUgdG86cHJvP2UgdG86biE7Z2xvb215Omdsb29tPzp5ITtjYXRlZ29yeTpjYXRlZ28/eTpyITtjb2xsYXBzZTo/b2xsYXBzZTpjITtpbmZlY3Rpb3VzOmluZmVjdGlvP3M6dSE7Y2F1dGlvbjo/YXV0aW9uOmMhO2NvbmZyb250Oj9vbmZyb250OmMhO2hhemFyZDpoP3phcmQ6YSE7bW9kZXJhdGU6bW9kZT9hdGU6ciE7c2FmZWd1YXJkOnM/ZmVndWFyZDphITttZXJnZTptZXJnPzplITt1bml2ZXJzYWw6dW5pP2Vyc2FsOnYhO2FzY3JpYmU6YXM/cmliZTpjITtjb3p5OmNvej86eSE7aW50ZW5zaWZ5OmluP2Vuc2lmeTp0ITt1dGlsaXplOnV0aWxpP2U6eiE7cGFyYWRveDo/YXJhZG94OnAhO3N0dWJib3JuOj90dWJib3JuOnMhO2RlZnk6ZGVmPzp5ITtjb21wZW5zYXRlOmNvbXA/bnNhdGU6ZSE7c29sZTpzbz9lOmwhO3dhcnJhbnQ6d2FycmE/dDpuITtzdGVyZW90eXBlOnN0ZXJlb3R5cD86ZSE7ZXhwbGljaXQ6ZXhwbGk/aXQ6YyE7dmlzYTo/aXNhOnYhO2luZ2VuaW91czo/bmdlbmlvdXM6aSE7Z29zc2lwOmdvP3NpcDpzITtyZXByb2FjaDpyZXByb2E/aDpjITtqdXN0aWZ5Omp1c3Q/Znk6aSE7YnVtcCBpbnRvOmJ1bXAgaW4/bzp0ITtyZWxldmFudDpyZWw/dmFudDplITtyZWFwOnJlP3A6YSE7cHJvbWlzaW5nOnByb21pc2luPzpnITt2dWxnYXI6P3VsZ2FyOnYhO3VuZGVybWluZTp1bmRlcm0/bmU6aSE7ZHJhaW46ZHJhaT86biE7ZGlzcGVyc2U6ZGlzcGVyP2U6cyE7ZXRlcm5hbDpldGVyP2FsOm4hO2RpZ25pdHk6ZGlnbj90eTppITtwcm9wZWw6cHJvcD9sOmUhO3JvYnVzdDpyP2J1c3Q6byE7ZWxpdGU6P2xpdGU6ZSE7dG93OnRvPzp3ITtjaXJjdWxhdGlvbjpjaXJjdT9hdGlvbjpsITtleGFnZ2VyYXRlOmV4YWdnZXJhP2U6dCE7aGFybW9ueTpoYT9tb255OnIhO3VuZGVyZ286dW5kP3JnbzplITtpbW1lcnNlOmk/bWVyc2U6bSE7Y29uZmVzczpjb24/ZXNzOmYhO2ludmFsaWQ6aT92YWxpZDpuITthbWJpZ3VvdXM6YW1iaWd1b3U/OnMhO3Zpc3VhbGl6ZTp2aXN1YWxpP2U6eiE7aW5pdGlhdGU6aT9pdGlhdGU6biE7c3Vib3JkaW5hdGU6c3U/b3JkaW5hdGU6YiE7aW1wYXJ0OmltP2FydDpwITtkZWZpY2llbmN5OmRlZmk/aWVuY3k6YyE7c3VmZmljaWVudDpzdWZmaWNpZT90Om4hO3BsZWFkOnA/ZWFkOmwhO2FwcGxpY2FibGU6YXBwbGljYT9sZTpiITtlbmVyZ2V0aWM6ZW5lcmdldD9jOmkhO21hc3NpdmU6P2Fzc2l2ZTptITtkaXNwYXRjaDpkP3NwYXRjaDppITt2aXJ0dWFsbHk6dmlydD9hbGx5OnUhO2VsZXZhdGU6ZWxldmE/ZTp0ITtyZWN0aWZ5Oj9lY3RpZnk6ciE7b3B0aW11bTpvcHQ/bXVtOmkhO3Rlcm1pbmF0ZTp0ZT9taW5hdGU6ciE7Z3JpZWY6Zz9pZWY6ciE7aW5kdWxnZTppbmR1bD9lOmchO2RldmlhdGUgZnJvbTpkZXZpYXRlIGY/b206ciE7bGlhYmlsaXR5OmxpYWJpP2l0eTpsITtwcmVkZWNlc3NvcjpwcmU/ZWNlc3NvcjpkITtzcG9udGFuZW91czpzcG9udGFuZT91czpvITtmYWNldDpmYT9ldDpjITtzY2VudDpzP2VudDpjITt3ZWFyeTp3P2FyeTplITtjYXN1YWx0eTpjP3N1YWx0eTphITtob21vZ2VuZW91czpobz9vZ2VuZW91czptITtob3NwaXRhbGl0eTpob3NwaXRhP2l0eTpsITtiYXJyZW46YmE/cmVuOnIhO2FsbGV2aWF0ZTphbGxldj9hdGU6aSE7c2tlcHRpY2FsOj9rZXB0aWNhbDpzITtkaXNndWlzZTpkaXNnP2lzZTp1ITtjdXJiOmN1P2I6ciE7aG9zdGlsZTpob3N0aWw/OmUhO3VuYW5pbW91czp1bmFuaW0/dXM6byE7dGhyZXNob2xkOnRocj9zaG9sZDplITthc3N1bXB0aW9uOmFzcz9tcHRpb246dSE7c3BlY2lmaWNhdGlvbnM6c3BlY2lmaT9hdGlvbnM6YyE7cmV2aXZlOnI/dml2ZTplITtwb3J0cmF5OnA/cnRyYXk6byE7aW5kdWNlOmluZHU/ZTpjITtyZXNpc3RhbnQ6cmVzaXM/YW50OnQhO3NsYWNrOnNsYWM/OmshO2ZlcnRpbGU6ZmVyP2lsZTp0ITtkZXN0cnVjdGl2ZTpkZT90cnVjdGl2ZTpzITtkZXRlY3Q6ZGV0P2N0OmUhO2Fzc2Vzczphc3Nlcz86cyE7Y2Fwc3VsZTpjYXBzdT9lOmwhO25vcm06bm8/bTpyITtzZXRiYWNrOnNldGJhYz86ayE7dGVtcHQ6dGU/cHQ6bSE7Ymx1cjpibD9yOnUhO2NhcnZlOmM/cnZlOmEhO3N0YXJ0bGU6cz9hcnRsZTp0ITtkcmF3YmFjazpkP2F3YmFjazpyITtkYXp6bGU6P2F6emxlOmQhO2Fub255bW91czphbm9uP21vdXM6eSE7aG9pc3Q6P29pc3Q6aCE7YWZmZWN0aW9uOmE/ZmVjdGlvbjpmITtwcm9zcGVjdGl2ZTpwcm9zP2VjdGl2ZTpwITtjb25jZWl2ZSBvZjpjP25jZWl2ZSBvZjpvITtwdW5jdHVhbDpwdW5jP3VhbDp0ITtkZXByZXNzOmRlcHJlP3M6cyE7ZGl2ZXJzZTpkaXY/cnNlOmUhO2NvbXBhdGlibGU6Y28/cGF0aWJsZTptITtjaGVyaXNoOmNoZXJpP2g6cyE7Y2xpbWF4OmNsaW0/eDphITtleHBlcnRpc2U6ZXhwZXI/aXNlOnQhO2xhdW5jaDo/YXVuY2g6bCE7cmVja2xlc3M6cmVja2w/c3M6ZSE7ZGlzYWJsZTo/aXNhYmxlOmQhO2Fzc2VydDphcz9lcnQ6cyE7Y2hhb3M6Y2g/b3M6YSE7dHJpdW1waDp0cj91bXBoOmkhO2Nocm9uaWM6Y2hyb24/YzppITtmbGF3OmY/YXc6bCE7bGVnZW5kOj9lZ2VuZDpsITs6Pzp1bmRlZmluZWQ=");
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



