
// 常用属性:
// 排列对齐:
// ①设置组件的排列方式:   orientation=""     vertical(竖直,默认)或者horizontal(水平)
// ②设置组件的对齐方式:   layout_gravity=""   center,left,right,buttom

// 设置布局为几行几列:
// ①设置有多少行: rowCount="4"        //设置网格布局有4行
// ②设置有多少列: columnCount="4"    //设置网格布局有4列

// 设置某个组件位于几行几列
// 注:都是从0开始算的哦！
// ①组件在第几行: layout_row = "1"   //设置组件位于第二行
// ②组件在第几列: layout_column = "2"   //设置该组件位于第三列

// 设置某个组件横跨几行几列:
// ①横跨几行: layout_rowSpan = "2"     //纵向横跨2行
// ②横跨几列: layout_columnSpan = "3"     //横向横跨2列

var w = floaty.rawWindow(
<relative layout_width="match_parent" layout_height="match_parent" >
    <linear layout_width="match_parent" layout_height="match_parent">

        <linear
            layout_width="60pt"
            layout_height="match_parent"
            background="#ff0000"
            orientation="vertical">

            <button
                layout_width="wrap_content"
                layout_height="wrap_content"
                layout_gravity="left"
                text="aa"/>
            <button
                layout_width="wrap_content"
                layout_height="wrap_content"
                layout_gravity="center"
                text="bb"/>
            <button
                layout_width="wrap_content"
                layout_height="wrap_content"
                text="cc"
                layout_gravity="right"/>
        </linear>

        <linear
            layout_width="match_parent"
            layout_height="match_parent"
            orientation="vertical">

            <linear
                layout_width="match_parent"
                layout_height="50pt"
                background="#0000ff"
                orientation="horizontal">
                <button
                    layout_width="wrap_content"
                    layout_height="wrap_content"
                    layout_gravity="top"
                    text="aa"/>
                <button
                    layout_width="wrap_content"
                    layout_height="wrap_content"
                    text="bb"
                    layout_gravity="center" />
                <button
                    layout_width="wrap_content"
                    layout_height="wrap_content"
                    layout_gravity="bottom"
                    text="cc"/>
            </linear>

            <linear
                layout_width="match_parent"
                layout_height="match_parent"
                background="#00ff00"
                orientation="horizontal">

                <button
                    layout_width="0pt"
                    layout_height="wrap_content"
                    layout_weight="1"
                    text="你好"/>

                <button
                    layout_width="0pt"
                    layout_height="wrap_content"
                    layout_weight="1"
                    text="Android"/>

                <button
                    layout_width="0pt"
                    layout_height="wrap_content"
                    layout_weight="1"
                    text="iOS"/>
            </linear>
        </linear>
    </linear>
</relative>
);
w.setSize(1080, 1920)
sleep(1000)
setTimeout(()=>{
  w.close();
}, 3300);




// {/* <relative layout_width="match_parent" layout_height="match_parent" >
//     <linear layout_width="match_parent" layout_height="match_parent">

//         <linear
//             layout_width="60pt"
//             layout_height="match_parent"
//             background="#ff0000"
//             orientation="vertical">
//         </linear>

//         <linear
//             layout_width="match_parent"
//             layout_height="match_parent"
//             orientation="vertical">

//             <linear
//                 layout_width="match_parent"
//                 layout_height="50pt"
//                 background="#0000ff"
//                 orientation="horizontal">
//             </linear>

//             <linear
//                 layout_width="match_parent"
//                 layout_height="match_parent"
//                 background="#00ff00"
//                 orientation="horizontal">
//             </linear>
//         </linear>
//     </linear>
// </relative> */}
