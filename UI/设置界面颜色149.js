"ui";

ui.layout(
    <vertical padding="16">
        <text padding="10 20 30 40" bg="#ff0000" id="col"  w="auto" h="auto" gravity="center" textSize="20sp" textColor="#30ff0000">需一美貌男子，精壮</text>
    </vertical>
);


ui.col.click(() => {
    startChange();
});

transparency = 20;
function startChange() {
    downloadId = setInterval(() => {
        transparency++;
        if (transparency > 255) {
            clearInterval(downloadId);
            return;
        }
        colnum="#"+(transparency.toString(16))+"0000FF";
        log(colnum);
     //   toast(colnum);
        
        
        ui.col.text(transparency.toString(16));
        ui.col.setTextColor(colors.parseColor(colnum))


        colnum2="#"+(transparency.toString(16))+"FF6633"

        ui.col.setBackgroundColor(colors.parseColor(colnum2));


    }, 8);
}
