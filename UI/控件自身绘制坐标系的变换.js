"ui";

var SeekBarLayout = (function() {
    util.extend(SeekBarLayout, ui.Widget);

    function SeekBarLayout() {
        ui.Widget.call(this);
        this.defineAttr("text", (view, attr, value, defineSetter) => {
            view._text.setText(String(value));
        });
        this.defineAttr("max", function(view, attr, value, defineSetter) {
            view._Duration.setText(String(value));
            view._Duration_seekbar.setMax(parseInt(value));
        });
        this.defineAttr("sum", (view, attr, value, defineSetter) => {
            view._CurrentDuration.setText(String(value));
            view._Duration_seekbar.setProgress(parseInt(value));
        });
        this.defineAttr("onClick", function(view, attr, value, defineSetter) {
            view._Duration_seekbar.setOnSeekBarChangeListener({
                onProgressChanged: function(seekBar, progress, fromUser) {
                    view._CurrentDuration.setText(String(progress));
                    if (fromUser) {
                        eval(value + "(view._text,progress)");
                    }
                },
                onStartTrackingTouch: function(seekBar) {},
                onStopTrackingTouch: function(seekBar) {
                    //eval(value+"(view._text,progress)");
                }
            });
        });
    };
    SeekBarLayout.prototype.render = function() {
        return (
            <vertical margin="5" >
                            <frame w="*">
                                <text id="_CurrentDuration" w="auto" text="0"margin="10 0 0 0" gravity="center" layout_gravity="left"/>
                            <text id="_text"  w="auto"text="A"gravity="center" layout_gravity="center"/>
                                <text id="_Duration" w="auto" text="0"margin="0 0 10 0" gravity="center" layout_gravity="right"/>
                            </frame>
                                <seekbar id="_Duration_seekbar" layout_weight="1"/>
                        </vertical>
        );
    };
    SeekBarLayout.prototype.getSum = function() {
        return this.view._Duration_seekbar.getProgress();
    };
    ui.registerWidget("seekbar-layout", SeekBarLayout);
    return SeekBarLayout;
})();

var url = "https://www.autojs.org/assets/uploads/files/1540386817060-918021-20160416200702191-185324559.jpg";
var w=device.width;
ui.layout(
    <vertical>
        <frame w="{{w}}px"h="{{w}}px">
            <img w="*"h="*"url="{{url}}" />
            <img id="cd_01" w="300px"h="300px"url="{{url}}" />
        </frame>
        <scroll>
            <vertical bg="#a0a0a0" margin="5">

                <text text="控件相对于父布局的位置的改变" textSize="18"/>
                <seekbar-layout w="*" h="auto" text="setTranslationX" max="{{w}}px" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="setTranslationY" max="{{w}}px" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="setTranslationZ" max="{{w}}px" sum="0" onClick="MyView"/>
                <text text="控件相对于父布局的旋转变化" textSize="18"/>
                <seekbar-layout w="*" h="auto" text="setRotation" max="360" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="setRotationX" max="360" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="setRotationY" max="360" sum="0" onClick="MyView"/>
                <text text="一个还没搞懂的东西" textSize="18"/>
                <seekbar-layout w="*" h="auto" text="setPivotX" max="{{w}}px" sum="150" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="setPivotY" max="{{w}}px" sum="150" onClick="MyView"/>
                <text text="缩放值实际上是小数(当前值/300),懒得改了" textSize="18"/>
                <seekbar-layout w="*" h="auto" text="setScaleX" max="300" sum="100" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="setScaleY" max="300" sum="100" onClick="MyView"/>
                <text text="控件内容坐标的改变" textSize="18"/>
                <seekbar-layout w="*" h="auto" text="scrollX" max="300px" sum="0" onClick="MyView"/>
                <seekbar-layout w="*" h="auto" text="scrollY" max="300px" sum="0" onClick="MyView"/>
            </vertical>

        </scroll>

    </vertical>
);


var imgView = ui.cd_01;

var scrollX = 0,
    scrollY = 0;

function MyView(view, value) {
    //toastLog("asd");
    var fun = String(view.getText());

    if (fun.indexOf("Scale") + 1) {
        value = value / 100;
        eval("imgView." + fun + "(value)");
    } else if (fun.indexOf("scroll") + 1) {
        if (fun.indexOf("X") + 1) {
            scrollX = value;
            eval("imgView.scrollTo(" + value + "," + scrollY + ")");

        } else if (fun.indexOf("Y") + 1) {
            scrollY = value;
            eval("imgView.scrollTo(" + scrollX + "," + value + ")");

        };

    } else {
        eval("imgView." + fun + "(value)");
    };
};
