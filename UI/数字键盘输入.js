toastLog(numberInput());

function numberInput() {
    var result = threads.disposable();
    var keyboard = [
        "7",
        "8",
        "9",
        "4",
        "5",
        "6",
        "1",
        "2",
        "3",
        ".",
        "0",
        "DEL"
    ];
    var view = ui.inflate(
        <vertical>
            <text id="input" margin="8" h="40" textColor="black" textSize="18" />
            <grid id="keyboard" spanCount="3">
                <button id="btn" text="{{this}}" />
            </grid>
        </vertical>
    );
    view.keyboard.setDataSource(keyboard);
    view.keyboard.on("item_bind", function (itemView, itemHolder) {
        itemView.btn.on("click", function () {
            let text = itemHolder.item;
            onKeyPressed(text);
        });
    });
    function onKeyPressed(key) {
        if (key == "DEL") {
            var text = view.input.getText();
            if (text.length() > 0) {
                view.input.setText(text.substring(0, text.length() - 1));
            }
            return;
        }
        view.input.append(key);
    }
    dialogs.build({
        title: "请输入数字",
        customView: view,
        positive: "确定",
        negative: "取消"
    }).on("positive", () => {
        result.setAndNotify(String(view.input.getText()));
    }).on("negative", () => {
        result.setAndNotify(null);
    }).show();
    return result.blockedGet();
}
