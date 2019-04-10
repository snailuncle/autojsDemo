"ui";
ui.layout(
    <vertical padding="16">
        <text id="id" textSize="18sp" text="普通按钮" w="auto"/>
        <button id="click_me" text="点我" w="auto"/>
    </vertical>
);

ui.click_me.on("click", ()=>{
    toastLog(colors.parseColor("#00FF00"));
    ui.id.setTextColor(-16711936);
});