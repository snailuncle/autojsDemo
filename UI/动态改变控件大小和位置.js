"ui";

ui.layout(
    <vertical>
        <button id="test" text="测试按钮" margin="0" w="400px" h="160px" />
        <button id="changeSize" text="改变[测试按钮]的大小" />
        <button id="changeMargin" text="改变[测试按钮]的位置" />
        <button id="reset" text="重置" />
    </vertical>
);

//importClass(android.widget.LinearLayout.LayoutParams);
//importClass(android.view.ViewGroup.MarginLayoutParams);


ui.changeSize.click(function() {
    toast("改变按钮大小");
    setSize(ui.test,200,80);
    //LayoutParams(width,height) 宽度，高度为整数 单位:px
//    var params = new android.widget.LinearLayout.LayoutParams(200, 80);
//    ui.test.setLayoutParams(params);
});
ui.changeMargin.click(function() {
    toast("改变按钮位置");
    setMargins(ui.test,10,10,10,10);
//    var margin = new android.view.ViewGroup.MarginLayoutParams(ui.test.getLayoutParams());
//    //setMargins(left,top,right,bottom);
//    margin.setMargins(10, margin.topMargin, 10 + margin.width, margin.bottomMargin);
//    var layoutParams = new android.widget.LinearLayout.LayoutParams(margin);
//    ui.test.setLayoutParams(layoutParams);
});

ui.reset.click(function(){
    toast("重置按钮大小和位置");
    setSize(ui.test,400,160);
    setMargins(ui.test,0,0,0,0);
//    var params = new android.widget.LinearLayout.LayoutParams(200, 80);
//    ui.test.setLayoutParams(params);
    })

 function setSize(view,width,height){
     //LayoutParams(width,height) 宽度，高度为整数 单位:px
     var params = new android.widget.LinearLayout.LayoutParams(width, height);
     view.setLayoutParams(params);
     }

 function setMargins(view,left,top,right,bottom){
     var margin = new android.view.ViewGroup.MarginLayoutParams(view.getLayoutParams());
    //setMargins(left,top,right,bottom);
    margin.setMargins(left, top, right,bottom);
    var layoutParams = new android.widget.LinearLayout.LayoutParams(margin);
    view.setLayoutParams(layoutParams);
     }
