
//继承至ui.Widget
util.extend(spinnerLayout, ui.Widget);
ui.registerWidget("spinner-layout", spinnerLayout);
//return spinnerLayout;

setTimeout(() => {}, 5000);
//setInterval(() => {}, 100);



var window = floaty.rawWindow(
    <scroll id="scrollView">
        <vertical bg="#888888" >
            <horizontal>
                <text text="类型"/>
                <spinner-layout id="type_sp" entries="选项1|选项2|选项3"/>
            </horizontal>
            <horizontal>
                <text text="延时"/>
                <input id="delay_input"/>
                <spinner-layout id="delay_sp" entries="选项1|选项2|选项3"/>
            </horizontal>
            
        </vertical>
    </scroll>
);

window.type_sp.widget.setSelection(2);

window.setPosition(100, 100);

    /*
    ui.ok.on("click", ()=>{
    var i = ui.sp1.getSelectedItemPosition();
    var j = ui.sp2.getSelectedItemPosition();
    toast("您的选择是选项" + (i + 1) + "和选项" + (j + 4));
});

ui.select3.on("click", ()=>{
    ui.sp1.setSelection(2);
});
    */





function spinnerLayout() {
    ui.Widget.call(this);
    this.ary = [];
    this.index = 0;
    this.defineAttr("entries", (view, attr, value, defineSetter) => {
        this.ary = String(value).split("|");
        if (this.ary.length) {
            view._text.setText(this.ary[0]);
        };
    });
    this.render = function() {
        return (
            <text id="_text" margin="4"/>
        );
    };
    this.onViewCreated = function(view) {
        view.on("click", () => {
            if (this.ary.length) {
                threads.start(new java.lang.Runnable(() => {
                    var i = dialogs.select(null, this.ary);
                    if (i + 1) {
                        ui.run(() => {
                            view.setText(this.ary[i]);
                        });
                        this.index = i;
                    };
                }));
            };
        });
    };
    this.getSelectedItemPosition = function() {
        return this.index;
    };
    this.setSelection = function(i) {
        //log(this);
        this.view.setText(this.ary[i]);
        this.index = i;
    };

};



function XmlToView(xml) {
    // runtime.ui.layoutInflater.setContext(context);
    return runtime.ui.layoutInflater.inflate(xml.toXMLString().toString(), null, true);
};