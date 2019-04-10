"ui";
ui.statusBarColor("#000000")
var kg, kg2, u = 1,op = 0;
var stg = storages.create("user");
var zh = stg.get("list", {see: "",name: "",pass: ""});
main();
function main(){
    if (zh.see == "1") {
        denru(true,zh.name,zh.pass);
    }else if (zh.see == "2") {
        jiemian();
    }else{
        denru();
    }   
}
    
function denru(t,n,p){
ui.layout(
    <vertical bg="#708090">
        <vertical h="auto" align="center" marginTop="100">
            <img layout_gravity="center" src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg" w="70" h="70" circle="true"/>
        </vertical>
        <card w="*" h="250" margin="20" cardCornerRadius="15dp" cardBackgroundColor="#b0c4de"
        cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
        <vertical>
            <linear margin="0 40 0 0">
                <img w="30" h="30" src="@drawable/ic_person_black_48dp"/>
                <input id="name" w="*" h="40" hint="用户名/邮箱/手机号" inputType="textVisiblePassword"/>
            </linear>
            <linear>
                <img w="30" h="30" src="@drawable/ic_https_black_48dp"/>
                <input id="password" hint="密码" w="*" h="40" inputType="textPassword"/>
            </linear>
            <linear gravity="center">
                <checkbox id="cb1" text="记住密码"/>
                <checkbox id="cb2" text="自动登入"/>
            </linear>
            <linear gravity="center">
                <horizontal>
                    <button id="login" w="250" h="*" text="登录" size="16" style="Widget.AppCompat.Button.Colored"/>
                </horizontal>
            </linear>
            <linear gravity="center">
                <text w="106" gravity="center" color="#111111" size="16">还没有账号？</text>
                <text id="register" w="auto" h="auto" size="16" text="注册" paddingRight="15"/>
                <text id="reg" w="auto" h="auto" size="16" paddingLeft="10" text="忘记密码"/>
            </linear>
        </vertical>
    </card>
    </vertical>
);

if (t) {ui.name.setText(n);ui.password.setText(p);ui.cb1.setChecked(t);}

ui.login.on("click", () => {
    threads.start(function() {
        if (!ui.name.text()) {
            toast("您还没有输入用户名!");
            return;
        }
        if (!ui.password.text()) {
            toast("还没有输入密码呢");
            return;
        }
        var str = JSON.parse(http.get("https://www.apiopen.top/login?key=c0d2433c951a7bceff831e382124dea5&phone=" + ui.name.text() + "&passwd=" + ui.password.text()).body.string());
        if (str.code !== 200) {
            toast(str.msg);
            return;
        } else {
            if (op == 1) {
                stg.put("list", {see: "1",name: ui.name.text(),pass: ui.password.text()});
                toast("登入" + str.msg);
                jiemian();
            } else if (op == 2) {
                stg.put("list", {see: "2",name: ui.name.text(),pass: ui.password.text()});
                toast("登入" + str.msg);
                jiemian();
            } else {
                storages.remove("user");
                toast("登入" + str.msg);
                jiemian();
            }
        }
    })
});

ui.emitter.on("back_pressed", e => {
    if (!kg) {
        kg = true;
        toast("再按一次退出");
        setTimeout(() => {
            kg = false;
        }, 250);
        e.consumed = true;
    } else {
        e.consumed = false;
    };
});

ui.register.on("click", () => {
    zhuce();
});

ui.reg.on("click", () => {
    dialogs.confirm(null, "抱歉，暂时没有找回密码功能，是否重新注册一个新账号?", (a) => {
        if (a) {
            zhuce();
        }
    })
});

ui.cb1.on("check", (checked) => {
    if (checked) {
        op = 1;
    } else {
        op = 0;
        u = 0;
        ui.cb2.setChecked(false);
    }
});

ui.cb2.on("check", (checked) => {
    if (checked) {
        ui.cb1.setChecked(true);
        op = 2;
        u = 1;
    } else {
        if (u) {
            op = 1;
        }
    }
});
}

function zhuce(){
ui.layout(
    <vertical bg="#708090">
        <card w="*" h="250" margin="20 180 20 20" cardCornerRadius="15dp" cardBackgroundColor="#b0c4de"
        cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
        <vertical>
            <vertical h="auto" align="center" margin="5 30 5 5">
                <linear>
                    <img w="30" h="30" src="@drawable/ic_person_black_48dp"/>
                    <input id="name" w="*" h="40" hint="输入用户名" inputType="textVisiblePassword" />
                </linear>
                <linear>
                    <img w="30" h="30" src="@drawable/ic_https_black_48dp"/>
                    <input id="password" hint="输入密码" w="*" h="40" inputType="textPassword"/>
                </linear>
                <linear>
                    <img w="30" h="30" src="@drawable/ic_https_black_48dp"/>
                    <input id="password2" hint="再次输入密码" w="*" h="40" inputType="textPassword"/>
                </linear>
                <linear gravity="center">
                    <horizontal>
                        <button id="login" w="250" h="*" text="立即注册" size="16" style="Widget.AppCompat.Button.Colored"/>
                    </horizontal>
                </linear>
            </vertical>
        </vertical>
    </card>
    </vertical>
);
ui.emitter.on("back_pressed", e => {
    if (!kg2) {
        kg2 = true;
        denru();
        setTimeout(() => {
            kg2 = false;
        }, 1000);
        e.consumed = true;
    } else {
        e.consumed = false;
    };
});
ui.login.on("click", () => {
    threads.start(function() {
        if (!ui.name.text()) {
            toast("您还没有输入用户名!");
            return;
        }
        if (!ui.password.text() && !ui.password2.text()) {
            toast("还没有输入密码呢");
            return;
        }
        if (ui.password.text() !== ui.password2.text()) {
            toast("您输入的两次密码不一样");
        } else {
            var str = JSON.parse(http.get("https://www.apiopen.top/createUser?key=c0d2433c951a7bceff831e382124dea5&phone=" + ui.name.text() + "&passwd=" + ui.password.text()).body.string());
            if (str.code !== 200) {
                toast(str.msg);
            } else {
                id = JSON.parse(http.get("https://www.apiopen.top/findStatistics?appKey=c0d2433c951a7bceff831e382124dea5").body.string()).data.length;
                http.get("https://www.apiopen.top/addStatistics?appKey=c0d2433c951a7bceff831e382124dea5&type=" + ui.name.text() + "_" + ui.password.text() + "&typeId=" + id + "&count=1").body.string();
                dialogs.confirm("注册" + str.msg, "您是第" + id + "位的注册成功的会员!\n您的户名为：" + ui.name.text() + "\n密码为：" + ui.password.text() + "\n是否马上去登入?", (a) => {
                    if (a) {
                        denru();
                    } else {
                        ui.finish();
                    }
                })
            }
        }
    });
});
}

function jiemian(){
    ui.run(()=>{
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="示例"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <text text="第一页内容" textColor="black" textSize="16sp"/>
                </frame>
                <frame>
                    <text text="第二页内容" textColor="red" textSize="16sp"/>
                </frame>
                <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp"/>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="#009688"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置");
    menu.add("关于");
});

//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["标签一", "标签二", "标签三"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "选项一",
      icon: "@drawable/ic_android_black_48dp"
  },
  {
      title: "选项二",
      icon: "@drawable/ic_settings_black_48dp"
  },
  {
      title: "选项三",
      icon: "@drawable/ic_favorite_black_48dp"
  },
  {
      title: "注销登入",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  },
  {
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);
ui.emitter.on("back_pressed", e => {
    if (!kg) {
        kg = true;
        toast("再按一次退出");
        setTimeout(() => {
            kg = false;
        }, 250);
        e.consumed = true;
    } else {
        e.consumed = false;
    };
});

ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
            ui.finish();
            break;
        case "注销登入":
            storages.remove("user");
            ui.finish();
    }
});})
}