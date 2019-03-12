"ui";

showLoginUI();
ui.statusBarColor("#000000")

//显示登录界面
function showLoginUI() {
    ui.layout(
        <frame>
            <vertical h="auto" align="center" margin="0 50">
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">用户名</text>
                    <input id="name" w="*" h="40"/>
                </linear>
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">密码</text>
                    <input id="password" w="*" h="40"/>
                </linear>
                <linear gravity="center">
                    <button id="login" text="登录"/>
                    <button id="register" text="注册"/>
                </linear>
            </vertical>
        </frame>
    );

    ui.login.on("click", () => {
        threads.start(function() {
            //dialogs.alert("您输入的用户名为" + ui.name.text() + " 密码为" + ui.password.text());
            Login();
        })
    })
    ui.register.on("click", () => showRegisterUI());
}

//显示注册界面
function showRegisterUI() {
    ui.layout(
        <frame>
            <vertical h="auto" align="center" margin="0 50">
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">用户名</text>
                    <input id="setName" w="*" h="40"/>
                </linear>
                <linear>
                    <text w="56" gravity="center" color="#111111" size="16">密码</text>
                    <input id="setPassword" w="*" h="40" password="true"/>
                </linear>
               //
                <linear gravity="center">
                    <button id="join">确定</button>
                    <button id="cancel">取消</button>
                </linear>
            </vertical>
        </frame>
    );
    ui.cancel.on("click", () => showLoginUI());
    ui.join.on("click", () =>{
        threads.start(function() {
            //在新线程执行的代码
            Registered();
        });
    });
}

function Login() {
    var name = ui.name.text();
    var password = ui.password.text();
    var h = http.get("http://loveformeet.cn/test/hi?user_name=" + name + "&password=" + password).body.string();
    toast(h+"\n登录成功");
}

function Registered() {
    var name = ui.setName.text();
    var password = ui.setPassword.text();
    var h = http.get("http://loveformeet.cn/test/set?setuser=" + name + "&setpassword=" + password).body.string();
    log(h)
    toast("注册成功")
}