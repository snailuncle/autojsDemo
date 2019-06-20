"ui";
auto();
//是否按下音量下键
isKeyDown();
mainUI();

function mainUI(){
    ui.layout(
        <frame>
            <vertical>
                <text text="二维码生成" textSize="30sp" textColor="#000000" marginTop="20" gravity="center"/>
                <horizontal gravity="center">
                    <text text="文字内容:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp"/>
                    <input id="textContent" textSize="20sp" hint="想要输入的文本内容"  marginTop="10" w="200dp"/>
                </horizontal>
                <horizontal gravity="center">
                    <text text="背景颜色:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp"/>
                    <input id="backgroundColor" textSize="20sp" hint="默认白色(十六进制)"  marginTop="10" w="200dp" text="000000"/>
                </horizontal>
                <horizontal gravity="center">
                    <text text="尺寸大小:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp" />
                    <input id="size" textSize="20sp" hint="尺寸大小（像素）"  marginTop="10" w="200dp" text="400"/>
                </horizontal>
                <horizontal gravity="center">
                    <text text="边距大小:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp"/>
                    <input id="marginSize" textSize="20sp" hint="边距大小（像素）"  marginTop="10" w="200dp" text="50"/>
                </horizontal>
                <button id="sure" text="确认" w="160dp" h="auto" style="Widget.AppCompat.Button.Colored" layout_gravity="center" marginTop="40dp"/>
            </vertical>
        </frame>
    );
    ui.sure.click(()=>{
        if(ui.textContent.text().length==0||ui.backgroundColor.text().length==0||ui.size.text().length==0||ui.marginSize.text().length==0){
            //只要有一个填的空是空的话
            toast("生成失败，请填写所有需要填写的信息。");
        }else{
            //网络请求图片然后保存到本地
            //这里用的是type1，返回的是base64encode编码的字符串,type2返回的就是图片png格式
            threads.start(function(){
                var url="http://apis.juhe.cn/qrcode/api?key=684e3d257f6034ebdfd80a2bbeddeb18&type=2&fgcolor="+ui.backgroundColor.text()+"&w="+ui.size.text()+"&m="+ui.marginSize.text()+"&text="+ui.textContent.text();
                var img=images.load(url);
                if(img!=null){
                    toast("网络请求成功");
                    //提示一下是不是要生成？
                    //在根目录下创建一个文件夹“THBELIEFScript二维码”
                    files.create("/sdcard/THBELIEFScript二维码/");
                    images.save(img,"/sdcard/THBELIEFScript二维码/"+ui.textContent.text()+".png","png",100);
                    toast("该二维码图片保存在"+"/sdcard/THBELIEFScript二维码/"+ui.textContent.text()+".png");
                    log("该二维码图片保存在"+"/sdcard/THBELIEFScript二维码/"+ui.textContent.text()+".png");    
                }else{//网络请求失败
                    toast("网络请求失败!");
                };
            });
        }
    });
    
}
function storeImage(){
    
}
function isKeyDown(){
    //监听音量下键是否按下，退出脚本
    threads.start(function(){
        events.setKeyInterceptionEnabled("volume_down",true);
        //监听按键
        events.observeKey();
        events.onKeyDown("volume_down", function(event){
            toast("已关闭二维码生成脚本！");
            engines.myEngine().forceStop();
        });
    });
}