// 负责手机短信
var 悬控移动和点击=require('./悬控移动和点击.js')
var 多线程控制悬浮窗=require('./多线程控制悬浮窗.js')

var 接码窗口=floaty.window(

<vertical bg='#FFB6C1'>
  <text textSize='30sp' textStyle='bold|italic' textColor='#DA70D6' gravity="center">项目-接码</text>
  <TableLayout>
    <TableRow>
      <text layout_weight="1">手机号码</text>
      <text id='phone' layout_weight="1" bg='#D8BFD8'></text>
      <button id='copyPhone' layout_weight="1">复制手机</button>
    </TableRow>
    <TableRow>
      <text layout_weight="1">短信</text>
      <text id='sms' layout_weight="1" bg='#D8BFD8'></text>
      <button id='copySms' layout_weight="1">复制短信</button>
    </TableRow>
  </TableLayout>
  <horizontal weightSum="10" bg='#888888'>
    <button id='随机号码' layout_width="0dp" layout_weight="3">随机号码</button>
    <button id='移动' layout_width="0dp" layout_weight="2">移动</button>
    <button id='隐藏' layout_width="0dp" layout_weight="2">隐藏</button>
    <button id='指定号码' layout_width="0dp" layout_weight="3">指定号码</button>
  </horizontal>
</vertical>

)

接码窗口.隐藏.click(
  function(){
    多线程控制悬浮窗.隐藏或显示("接码窗口",接码窗口)
  }
)


悬控移动和点击(接码窗口,'接码窗口的移动按钮',接码窗口.移动)


// setInterval(
//   ()=>{},3000
// )

module.exports=接码窗口
