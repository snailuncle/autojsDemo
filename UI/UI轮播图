/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2019-06-12 00:35:01
 * @Version: Auto.Js Pro
 * @LastEditors: 大柒
 * @LastEditTime: 2019-06-12 11:14:02
 * @Description: UI轮播图
 * 轮播图原理
 * 因为viewpager并没有提供循环的方法（废话），所以目前能够实现的循环基本都是假循环（这个也是），是以欺骗人的感官来实现，
 * 效果上可能会有一些瑕疵，在切换关键点地方会有一个跳动，如果滑动到位的话，这个跳动可能不明显。
 * 既然要实现循环，也就是说我们从第一张图片向前滑动的时候可以直接看到最后一张图片，同理，从最后一张图片向后滑动时也可以看到第一张图片，
 * 因为我们的图片在边界处只能看到下一张图片的一部分，看不到下下张图片，所以机会来了。
 * 
 * 实践方法
 * 你看到的第一张图片并不是真正的第一张图片，它是第二张图，最后一张图也不是最后一张，是倒数第二张，
 * 我们将第一张图片设置为和倒数第二张图片（你所看到的最后一张）一模一样的图片，最后一张图片业也与“第一张”图片相同，
 * 例: 如果要添加五张图片  那么就会出现右边的布局  0(5)-1-2-3-4-5-6(1) 
 * 第0张图片(0就是1)内容会是第5张图片内容,第6张图片内容会是第1张图片内容,
 * 在滑动的时候进行一个判断，滑动到第0张时，会跳转到“第5张”，滑动到第6张时，会跳转到“第1张”，
 * 跳转时将Viewpager的滑动动画关掉，此时左右滑动，看上去就和循环一般。
 */
"ui";

data = {
    // 图片宽高 一定要设置
    src_w: 750,
    src_h: 366,
    //time 图片切换时间
    time: 5000,
    data: [
        /*
        * {title,src,onClick}
        * title 图片标题 可省略
        * src 图片链接
        * onClick 图片点击触发函数事件  例:onClick="abc" 该图片被点击会触发imgOnClick()函数方法并传递abc字符串
        * 也可以统一触发到一个函数内 自行分辨每个触发事件
        */
        { onClick: "img_1", src: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/67028/29/1545/96494/5cfe240cE56f068b4/6a4e92ba08ccbb9c.jpg!cr_1125x549_0_72!q70.jpg.dpg" },
        { onClick: "img_2", src: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/75071/39/1612/313464/5cff0503E4572701b/b50443d23112a281.jpg!cr_1125x549_0_72!q70.jpg.dpg" },
        { onClick: "img_3", src: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/46150/10/2005/121802/5cfe1d49E36aec0ae/affb9b6f9b54b42e.jpg!cr_1125x549_0_72!q70.jpg.dpg" }
    ],
}

tabs_view = [];
tabs_index = 0;


//轮播图片点击触发事件
var imgOnClick = function (text) {
    arr = data.data
    switch (text) {
        case arr[0].onClick:
            toast("点击第一张图片")
            break;
        case arr[1].onClick:
            toast("点击第二张图片")
            break;
        case arr[2].onClick:
            toast("点击第三张图片")
            break;
    }
}


var imgLayout = function () {
    //继承ui.Widget
    util.extend(imgLayout, ui.Widget);
    function imgLayout() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性data ,定义控件的每个参数 传入值为整数
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            //获取当前控件的参数值 data.data[value] 赋值到arr数组
            let arr = data.data[value]
            //设定 _text控件文本
            arr.title = arr.title || false
            arr.title ? view._text.setText(arr.title) : view._text.attr("visibility", "gone")

            //设定 _src控件图片
            view._src.attr("src", arr.src)
            //设定 自定义点击事件
            this._onClick = "imgOnClick('" + arr.onClick + "')"
        });
    }
    imgLayout.prototype.render = function () {
        return (
            <vertical >
                <card w="*" h="auto" cardCornerRadius="20" margin="10 0"
                    cardElevation="5" foreground="?selectableItemBackground" >
                    <img id="_src" w="*" h="auto" src="#ffffff" layout_gravity="top" scaleType="fitCenter" />
                    <text id="_text" w="*" h="20" text="" textColor="#99ffffff" bg="#80000000" textSize="14" layout_gravity="bottom" gravity="center" />
                </card>
            </vertical>
        )
    }
    imgLayout.prototype.onViewCreated = function (view) {
        view.click(() => {
            eval(this._onClick);
        });
    };
    ui.registerWidget("img-layout", imgLayout);
    return imgLayout;
}()

var TabsLayout = function () {
    util.extend(TabsLayout, ui.Widget);
    function TabsLayout() {
        ui.Widget.call(this);
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            let arr = data.data
            //遍历data.data数组添加对应数量的小白球
            for (let i = 0; i < arr.length; i++) {
                tabs_view[tabs_view.length] = ui.inflate(<text text="●" marginLeft="5" />, view._tabs, true)
            }
            tabs_view[0].setTextColor(colors.parseColor("#ffffff"))
        });
    }
    TabsLayout.prototype.render = function () {
        return (
            <horizontal id="_tabs" w="auto" h="auto" />
        )
    }
    ui.registerWidget("tabs-layout", TabsLayout);
    return TabsLayout;
}()


ui.layout(
    <vertical w="*" h="*" >
        <viewpager marginTop="50" id="viewpager_img" w="*" h="{{view_hei()}}px" >
            //开始先添加一个 倒数第二个图片的页面 不知道为什么的请看说明实践方法
            <img-layout h="auto" data="{{data.data.length-1}}" />

            //再此处添加所有轮播图片信息,照下方复制也可以
            <img-layout data="{{0}}" />
            <img-layout data="{{1}}" />
            <img-layout data="{{2}}" />


            //最后添加一个 第一个图片的页面 不知道为什么的请看说明实践方法
            <img-layout data="{{0}}" />
        </viewpager>
        <tabs-layout marginTop="-30" data="" layout_gravity="center_horizontal" />


        <horizontal w="*" margin="20 50 20 0" >
            <horizontal layout_weight="1" w="*">
                <text text="图片切换时间" />
                <input w="100" id="time" text="{{data.time}}" />
            </horizontal>
            <button layout_weight="1" w="*" id="open" text="开启轮播" />
        </horizontal>
    </vertical>
)

//设定界面为编号1
ui.viewpager_img.currentItem = 1

//页面更改侦听器
ui.viewpager_img.setOnPageChangeListener({
    //已选定页面发生改变时触发
    onPageSelected: function (index) {
        //如果当前页面为第0个页面 (0就是1)
        if (index == 0) {
            index = ui.viewpager_img.childCount - 2
            setTimeout(function () {
                //关闭跳转动画并跳转到倒数第二个页面 false表示关闭动画
                ui.viewpager_img.setCurrentItem(index, false)
            }, 300)
            //如果当前页面为最后一个页面 
        } else if (index == ui.viewpager_img.childCount - 1) {
            index = 1
            setTimeout(function () {
                //关闭跳转动画并跳转到第1个页面(前面还有一个第0个页面) false表示关闭动画
                ui.viewpager_img.setCurrentItem(index, false)
            }, 300)
        }
        //更改小白球显示
        tabs_view[tabs_index].setTextColor(colors.parseColor("#90000000"))
        tabs_index = index - 1
        tabs_view[tabs_index].setTextColor(colors.parseColor("#ffffff"))
        time = 0
    }
})


//轮播等待时间
var time = 0;
//定时器
var id
//open点击事件
ui.open.click(() => {
    if (ui.open.text() == "停止轮播") {
        clearInterval(id);
        ui.open.setText("开启轮播")
        toast("已停止图片轮播")
        return
    }
    data.time = parseInt(ui.time.text())
    if (!data.time > 0) {
        toast("时间错误请检查轮播时间");
        return
    }
    ui.open.setText("停止轮播")
    toast("已开启图片轮播")
    id = setInterval(function () {
        (time + 1) * 1000 >= data.time ? (ui.viewpager_img.currentItem = ui.viewpager_img.currentItem + 1, time = 0) : time++
    }, 1000);
})

function view_hei() {
    _w = device.width / data.src_w
    return parseInt(data.src_h * _w)
}

