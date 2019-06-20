// 需要Pro 7.0.3-4以上
requiresAutojsVersion(7000304);

// 将xml渲染为view，这个view将显示在对话框中
let view = ui.inflate(
    <vertical padding="16 0">
        <text>用户名</text>
        <input id="username" />
        <text>密码</text>
        <input id="password"/>
    </vertical>
, null, false);

// 显示对话框
dialogs.build({
    customView: view,
    title: "登录",
    positive: "确定",
    negative: "取消",
    // view高度超过对话框时是否可滑动
    wrapInScrollView: false,
    // 按下按钮时是否自动结束对话框
    autoDismiss: false
}).on("positive", (dialog) => {
    let username = String(view.username.getText())
    let password = String(view.password.getText())
    log(username, password);
    if (username != 'root' && password != '123456') {
        view.password.setError("密码不正确");
    } else {
        dialog.dismiss();
        toast("登录成功");
    }
}).on("negative", (dialog) => {
    dialog.dismiss();
}).show();