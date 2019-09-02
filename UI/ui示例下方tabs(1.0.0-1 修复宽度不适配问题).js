/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2019-06-07 13:18:41
 * @Version: 1.0.0-1
 * @LastEditors: 大柒
 * @LastEditTime: 2019-06-11 20:33:37
 * @Description: 修复屏幕切换方向时 tabs 宽度错误
 */
"ui";

//tabs 数据
var tabs_data = {
    //tabs 背景
    bg: "#ffffff",
    selectColor: {
        //当前页面选中颜色
        on: "#00ffff",
        //当前页面未选中颜色
        off: "#999999"
    },
    //图标大小
    srcSize: 24,
    //字体大小
    textSize: 12,
    //动画缩放比例 未加入动画效果
    zoom: 1.2,
    //是否显示指示器小横条
    tabs_h: true,
    //tabs 按钮数据
    data: [
        ["第一页", "@drawable/ic_clear_black_48dp"],
        ["第二页", "@drawable/ic_perm_identity_black_48dp"],
        ["第三页", "@drawable/ic_assignment_black_48dp"],
        ["第四页", "@drawable/ic_settings_black_48dp"],
    ],
}

//tabs按钮 布局视图信息
var tabs_view = []
//tabs按钮 当前选中按钮
var selectView = 0;

//自定义控件 tabs按钮
var Tabs_btn_layout = function () {
    //继承ui.Widget
    util.extend(Tabs_btn_layout, ui.Widget);
    function Tabs_btn_layout() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性data ,定义控件的每个参数 传入值为整数
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            //获取当前控件的参数值 tabs_data.data[value] 赋值到arr数组
            arr = tabs_data.data[value]
            //设定 _text控件文本
            view._text.setText(arr[0])
            //设定 _src控件图片
            view._src.attr("src", arr[1])
            //把当前控件信息集合到tabs_view数组里面
            tabs_view[tabs_view.length] = view
            //如果当前控件为初始值 则设定控件颜色为选中颜色 selectView==value==0 
            if (value == selectView) {
                view._src.attr("tint", tabs_data.selectColor.on)
                view._text.setTextColor(colors.parseColor(tabs_data.selectColor.on))
            }
        });
    }
    Tabs_btn_layout.prototype.render = function () {
        return (
            //1.0.0-1 修改 w="*" 参数 屏幕方向发生变化时 宽度自适配
            <vertical id="_bg" w="*" bg="{{tabs_data.bg}}" padding="0 10" gravity="center" >
                <img w="{{tabs_data.srcSize}}" id="_src" tint="{{tabs_data.selectColor.off}}" />
                <text w="auto" id="_text" textSize="{{tabs_data.textSize}}" textColor="{{tabs_data.selectColor.off}}" />
            </vertical>
        )
    }
    ui.registerWidget("tabs_btn-layout", Tabs_btn_layout);
    return Tabs_btn_layout;
}()

//自定义控件 tabs
var Tabs_layout = function () {
    util.extend(Tabs_layout, ui.Widget);
    function Tabs_layout() {
        ui.Widget.call(this);
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            //遍历 tabs_data.data数组 
            for (var i = 0; i < tabs_data.data.length; i++) {
                time = i
                //1.0.0-1 增加 layout_weight="1"参数 屏幕方向发生变化时 宽度自适配
                ui.inflate(<tabs_btn-layout data="{{time}}" layout_weight="1" />, view._tabs, true)
            }
            //根据tabs_h值设置 _color颜色
            tabs_data.tabs_h ? _color = tabs_data.selectColor.on : _color = "#00000000";
            view.tabs.selectedTabIndicatorColor = colors.parseColor(_color);//设置tabs指示器颜色
        });
    }
    Tabs_layout.prototype.render = function () {
        return (
            <card w="*" h="auto" cardElevation="5" foreground="?selectableItemBackground">
                <horizontal id="_tabs" />
                <tabs id="tabs" />
            </card>
        )
    }
    ui.registerWidget("tabs-layout", Tabs_layout);
    return Tabs_layout;
}()

ui.layout(
    <frame>
        <vertical>
            <appbar w="*" h="auto">
                <toolbar id="toolbar" title="{{tabs_data.data[0][0]}}" />
            </appbar>
            <viewpager w="*" id="viewpager" layout_alignParentBottom="true" >
                <frame >
                    <text text="第一页内容" textColor="black" textSize="16sp" />
                </frame>
                <frame>
                    <text text="第二页内容" textColor="red" textSize="16sp" />
                </frame>
                <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp" />
                </frame>
                <frame>
                    <text text="第四页内容" textColor="green" textSize="16sp" />
                </frame>
            </viewpager>
        </vertical>
        <tabs-layout data="" layout_gravity="bottom" />
    </frame>
)

ui.tabs.setupWithViewPager(ui.viewpager);//绑定ViewPager到指示器

//页面更改侦听器
ui.viewpager.setOnPageChangeListener({
    //已选定页面发生改变时触发
    onPageSelected: function (index) {
        log("上次选中" + tabs_view[selectView]._text.text())
        //设置selectView上次页面 图案和字体颜色为未选中颜色 tabs_data.selectColor.off
        tabs_view[selectView]._src.attr("tint", tabs_data.selectColor.off)
        tabs_view[selectView]._text.setTextColor(colors.parseColor(tabs_data.selectColor.off))
        //设置当前页面 图案和字体颜色为选中颜色 tabs_data.selectColor.on
        tabs_view[index]._src.attr("tint", tabs_data.selectColor.on)
        tabs_view[index]._text.setTextColor(colors.parseColor(tabs_data.selectColor.on))
        //更改标题 title 内容
        ui.toolbar.setTitle(tabs_view[index]._text.text())
        //设置当前页面为 index
        selectView = index
    }
})

