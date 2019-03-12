"ui";
ui.layout(
    <vertical>
        <button id="r1"text="rem1"/>
        <button id="r2"text="rem2"/>
        <button id="r3"text="rem3"/>
        <button id="t1"text="tem1"/>
        <button id="t2"text="tem2"/>
        <button id="t3"text="tem3"/>       
        <button id="restart"text="恢复默认值"/>      
    </vertical>
);



files.createWithDirs("/sdcard/ONEKEY/rem.txt");
files.createWithDirs("/sdcard/ONEKEY/tem.txt");

function remwrite() {}

function temwrite() {
    files.write("/sdcard/ONEKEY/tem.txt", text); //这个路劲填入内容
}


var text
ui.r1.on("click", () => {
    events.broadcast.emit("r1", "tt")
    text = "r1";
    files.write("/sdcard/ONEKEY/rem.txt", text); //这个路劲填入内容
})

ui.r2.on("click", () => {
    events.broadcast.emit("r2", "tt")
    text = "r2"; //text内容
    files.write("/sdcard/ONEKEY/rem.txt", text); //这个路劲填入内容

})

ui.r3.on("click", () => {
    events.broadcast.emit("r3", "tt")
    text = "r3"; //text内容
    files.write("/sdcard/ONEKEY/rem.txt", text); //这个路劲填入内容

})



ui.t1.on("click", () => {
    events.broadcast.emit("t1", "tt")
    text = "t1"; //text内容

    files.write("/sdcard/ONEKEY/tem.txt", text)
})


ui.t2.on("click", () => {
    events.broadcast.emit("t2", "tt")
    text = "t2"; //text内容

    files.write("/sdcard/ONEKEY/tem.txt", text)
})

ui.t3.on("click", () => {
    events.broadcast.emit("t3", "tt")

    text = "t3"; //text内容

    files.write("/sdcard/ONEKEY/tem.txt", text)
})

ui.restart.on("click",()=>{
        events.broadcast.emit("t3", "tt")
    events.broadcast.emit("r3", "tt")
files.write("/sdcard/ONEKEY/tem.txt", "re")
files.write("/sdcard/ONEKEY/rem.txt", "re")
    })