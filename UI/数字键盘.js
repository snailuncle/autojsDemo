"ui";

ui.layout(
    <vertical>
        <text id="input" margin="8" h="40" textColor="black" textSize="18"/>
        <grid id="keyboard" spanCount="3">
            <button id="btn" text="{{this}}"/>
        </grid>
    </vertical>
);

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
    "DEL",
    "0",
    "完成"
];


ui.keyboard.setDataSource(keyboard);

ui.keyboard.on("item_bind", function(itemView, itemHolder) {
    itemView.btn.on("click", function() {
        let text = itemHolder.item;
        onKeyPressed(text);
    });
});


function onInputComplete(text){
    toastLog(text);
    ui.finish();
}

function onKeyPressed(key) {
    if (key == "完成") {
       onInputComplete(String(ui.input.getText()));
       return;
    }
    if (key == "DEL") {
       var text = ui.input.getText();
       if(text.length() > 0){
           ui.input.setText(text.substring(0, text.length() - 1));
       }
       return;
    }
    ui.input.append(key);
}
