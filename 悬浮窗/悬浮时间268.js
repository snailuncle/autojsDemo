var window = floaty.rawWindow(
    <vertical bg="#88008800">
        <text id="text" textSize="20sp"/>
    </vertical>

);

window.setTouchable(false);
window.setPosition(100,100);



setInterval(() => {
    ui.run(() => {
        window.text.setText(String(getTime()));
    });

}, 50);

function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = TT(date.getMonth() + 1);
    var day = TT(date.getDate());
    var hour = TT(date.getHours());
    var minute = TT(date.getMinutes());
    var second = TT(date.getSeconds());
    var millisecond = TT(date.getMilliseconds());
    return year + "/" + month + "/" + day + "--" + hour + ":" + minute + ":" + second;

    function TT(s) {
        if (s < 10) {
            s = "0" + s;
        };
        return s;
    };
};