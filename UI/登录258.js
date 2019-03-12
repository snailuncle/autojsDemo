"ui";
var 背景颜色 = "#dddddd"
var 字号 = "13"
var 字体颜色 = "#dd000000"
var 账号 = {
    "123456789": "123456789"
}
ui.statusBarColor(背景颜色)
ui.layout(
    <ScrollView id="bg" bg="{{背景颜色}}">
    <frame>
        <vertical padding="10 10 10">
            <text size="{{字号*5}}sp" paddingTop="60" paddingLeft="40" color="{{字体颜色}}">登录</text>
            <text id="t1" size="{{字号*2}}sp" color="{{字体颜色}}" marginTop="50" paddingLeft="35"/>
            <input id="ID" w="*" marginRight="30" marginLeft="30" singleLine="true" hint="账号" textColorHint="{{字体颜色}}"/>
            <text id="t2" size="{{字号*2}}sp" color="{{字体颜色}}" marginTop="10" paddingLeft="35"/>
            <input id="Password" w="*" marginRight="30" marginLeft="30" singleLine="true" hint="密码" textColorHint="{{字体颜色}}" password="true"/>
            
            <checkbox id="isRemember" text="记住密码" marginLeft="30"/>
            <button id="Login" style="Widget.AppCompat.Button.Colored" h="{{字号*11}}px" size="{{字号*2}}sp" marginTop="20" marginRight="30" marginLeft="30">登录</button>
            
            <horizontal paddingLeft="40" paddingTop="10">
                <text id="Forget" size="{{字号*1+4}}sp" color="#00aadd">忘记密码</text>
                <text id="Register" size="{{字号*1+4}}sp" color="#00aadd" marginLeft="30">注册账号</text>
            </horizontal>
        </vertical>
    </frame>
    </ScrollView>
)
ui.ID.on("touch", () => {
    ui.t1.setText("账号")
    ui.ID.setHint("")
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("密码")
    }
})

ui.Password.on("touch", () => {
    ui.t2.setText("密码")
    ui.Password.setHint("")
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("账号")
    }
})

ui.bg.on("touch", () => {
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("密码")
    }
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("账号")
    }

})

ui.Login.on("click", () => {
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("密码")
    }
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("账号")
    }
})

ui.Login.on("click", () => {
    if (ui.ID.getText() != "") {
        if (ui.Password.getText() != "") {
            if (ui.Password.getText() == 账号[ui.ID.getText()]) {
                toast("正在登录")
                threads.start(function(){
                var date = new Date();
                var seperator1 = "_";
                var seperator2 = "_";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                    "_" + date.getHours() + seperator2 + date.getMinutes() +
                    seperator2 + date.getSeconds();
                var login_info = {
                    ID: ui.ID.getText(),
                    Password: ui.Password.getText(),
                    currentdate: currentdate
                }
                    })
            } else {
                dialogs.alert("输入的账号或密码有误，请重试", "", () => {})
            }
        } else {
            ui.Password.setError("请输入密码")
        }
    } else {
        ui.ID.setError("请输入账号")
    }
})