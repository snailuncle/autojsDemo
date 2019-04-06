"ui";

var storage=storages.create("data");//创建一个用于存储欢迎页是否已经展示过的本地存储
storage.clear();//删除这个本地存储的数据（用于调试，保证每次运行都显示欢迎页）
function start(){//启动函数
    storage.put("Welcome","true");//记录欢迎页已经启动过
    // !!看这里 下一行 ★★★★★
    engines.execScriptFile("main.js");//运行主脚本
}
if(storage.get("Welcome")=="true"){//若欢迎页已经启动过，则直接运行启动函数
    start();
    exit();
}

/*
    欢迎页
    Date: 2019-04-06
    QQ: 32552732
    E-Mail: new-age@outlook.com
*/

//activity.window.addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);//设置状态栏透明
activity.window.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);//设置全屏

function Color(color){
    return android.graphics.Color.parseColor(color);
}
function GradientDrawable(orientation,color){
    var colors=[];
    color.forEach(color=>colors.push(Color(color)));
    return new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation[orientation],colors);
}

ui.layout(
    <relative>
        <viewpager id="viewpager">
            <relative>
                <vertical w="*" h="*" id="firstpage" gravity="center">
                    <text text="欢迎使用" textSize="45sp" textColor="#FFFFFF" gravity="center"/>
                    <text text="滑动屏幕来了解更多信息" marginTop="10" textSize="15sp" textColor="#A0FFFFFF" gravity="center"/>
                </vertical>
                <text id="skip" text="单击此处以跳过" marginBottom="100" textSize="13sp" textColor="#30FFFFFF" gravity="center" layout_alignParentBottom="true" layout_centerHorizontal="true"/>
            </relative>
            <vertical id="page1" gravity="center">
                <text text="简洁" textSize="45sp" textColor="#FFFFFF" gravity="center"/>
                <text text="简约 优雅" marginTop="10" textSize="15sp" textColor="#A0FFFFFF" gravity="center"/>
            </vertical>
            <vertical id="page2" gravity="center">
                <text text="便捷" textSize="45sp" textColor="#FFFFFF" gravity="center"/>
                <text text="简单 易用" marginTop="10" textSize="15sp" textColor="#A0FFFFFF" gravity="center"/>
            </vertical>
            <vertical id="permissionpage" gravity="center">
                <text text="需要授权" textSize="45sp" textColor="#FFFFFF" gravity="center"/>
                <text id="permission" text="单击此处进行授权" marginTop="10" textSize="15sp" textColor="#A0FFFFFF" gravity="center"/>
            </vertical>
            <vertical id="startpage" gravity="center">
                <text text="现在开始" textSize="45sp" textColor="#FFFFFF" gravity="center"/>
                <text text="单击下方按钮开始使用" marginTop="10" textSize="15sp" textColor="#A0FFFFFF" gravity="center"/>
                <card id="start" cardBackgroundColor="#ECEFF1" w="60" h="60" cardCornerRadius="30" marginTop="50" gravity="center">
                    <img w="30" h="30" src="drawable/ic_collapsed"/>
                </card>
            </vertical>
        </viewpager>
        <tabs id="tabs" marginBottom="50" w="80" h="2" bg="#50AAAAAA" layout_alignParentBottom="true" layout_centerHorizontal="true" visibility="gone"/>
    </relative>
);

ui.viewpager.overScrollMode=android.view.View.OVER_SCROLL_NEVER;//删除滑动到底时的边缘阴影

ui.tabs.setupWithViewPager(ui.viewpager);//绑定ViewPager到指示器
ui.tabs.selectedTabIndicatorColor=Color("#FFFFFF");//设置tabs指示器颜色
ui.tabs.selectedTabIndicatorHeight=ui.tabs.layoutParams.height;//设置指示器高度与tabs同高

//为页面设置渐变色背景
ui.firstpage.backgroundDrawable=GradientDrawable("TL_BR",["#81C784","#2E7D32","#2E7D32"]);
ui.page1.backgroundDrawable=GradientDrawable("TL_BR",["#4FC3F7","#0277BD","#0277BD"]);
ui.page2.backgroundDrawable=GradientDrawable("TL_BR",["#FFF176","#F9A825","#F9A825"]);
ui.permissionpage.backgroundDrawable=GradientDrawable("TL_BR",["#80DEEA","#0097A7","#0097A7"]);
ui.startpage.backgroundDrawable=GradientDrawable("TL_BR",["#CFD8DC","#78909C","#78909C"]);

ui.skip.click(()=>ui.viewpager.currentItem=ui.viewpager.childCount-1);//点击跳过则跳转到最后一页

permissionpage=ui.viewpager.childCount-1-1;//授权页下标（启动页前一页）（启动页固定最后一页）

ui.permission.click(()=>{
    if(!getMissingPermission()){//点击检查授权，已获得授权则跳转到下一页
        ui.permission.setText("已获得授权");
        setTimeout(()=>{
            ui.viewpager.currentItem=ui.viewpager.currentItem+1;
        },500);
    }else{
        ui.permission.setText("单击此处检查授权");
        getPermission(getMissingPermission());
    }
});

ui.viewpager.setOnPageChangeListener({
    onPageSelected:function(index){
        if(index==ui.viewpager.childCount-1&&getMissingPermission()){//未授权则在打开启动页时跳转到授权页
            setTimeout(()=>{
                ui.viewpager.currentItem=permissionpage;
            },0);
        }else if(index==permissionpage){//打开授权页时自动检查授权以更正提示内容
            if(!getMissingPermission())
                ui.permission.setText("已获得授权");
            else
                ui.permission.setText("单击此处进行授权");
        }
        if(index==ui.viewpager.childCount-1||index==0){//控制首页和末页不显示指示器
            ui.tabs.visibility=android.view.View.GONE;
        }else{
            ui.tabs.visibility=android.view.View.VISIBLE;
        }
    }
});

ui.start.click(()=>{
    if(getMissingPermission()){//点击启动按钮时检查授权，未授权则跳转到授权页
        ui.viewpager.currentItem=permissionpage;
    }else{
        start();
        ui.finish();
    }
});

function getMissingPermission(){//获取缺失权限列表
    var result=[];
    if(auto.service==null)result.push("accessibility");//检查无障碍服务
    return result.length>0?result:null;
}

function getPermission(permission){//根据缺失权限列表，申请授权，每次只进行一种权限的申请
    if(permission.indexOf("accessibility")>-1){
        toast("请找到并启用此应用的无障碍服务");
        try{auto()}catch(e){};
        return;
    }
    toast("未知权限，请自行授权\n"+permission);
}







