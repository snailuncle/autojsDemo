// 负责手机短信
var 悬控移动和点击=require('./悬控移动和点击.js')
var 多线程控制悬浮窗=require('./多线程控制悬浮窗.js')

var 接码窗口=floaty.window(

<vertical bg='#FFB6C1'>
  <text textSize='30sp' textStyle='bold|italic' textColor='#DA70D6' gravity="center">项目-接码</text>
  <TableLayout>
    <TableRow>
      <text layout_weight="1">手机号码</text>
      <input id="phone"  inputType='number' layout_weight="1" text="" textSize="16sp" focusable="true" bg='#D8BFD8' layout_width="wrap_content"/>
      <button id='copyPhone' layout_weight="1">复制号码</button>
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

接码窗口.随机号码.click(
  function(){
    threads.start(
      function(){
        toastLog('这里写接码平台接码函数,并把收到的手机号码显示到手机号码输入框')
      }
    )
  }
)
接码窗口.指定号码.click(
  function(){
    threads.start(
      function(){
        toastLog('这里写接码平台获取指定号码的函数,并把收到的手机号码显示到手机号码输入框')
      }
    )
  }
)



接码窗口.phone.on("key", function(keyCode, event){
  log('keyCode=',keyCode)
  log('event.getAction() == event.ACTION_DOWN')
  log(event.getAction() == event.ACTION_DOWN)
  log('event.getAction()')
  log(event.getAction())
  log('keyCode == keys.back')
  log(keyCode == keys.back)
  if( keyCode == keys.back){
  // if(event.getAction() == event.ACTION_DOWN && keyCode == keys.back){
    log('满足失去焦点的情况')
    log('接码窗口失去焦点开始')
    接码窗口.disableFocus();
    log('接码窗口失去焦点结束')
      event.consumed = true;
  }
});

接码窗口.phone.on("touch_down", ()=>{
  接码窗口.requestFocus();
  接码窗口.phone.requestFocus();
});



接码窗口.隐藏.click(
  function(){
    多线程控制悬浮窗.隐藏或显示("接码窗口",接码窗口)
  }
)
接码窗口.copyPhone.click(
  function(){
    var 手机号码输入框=接码窗口.phone
    var 手机号码=手机号码输入框.getText().toString()
    setClip(手机号码)
    toastLog('手机号码已复制'+手机号码)
  }
)
接码窗口.copySms.click(
  function(){
    var 短信输入框=接码窗口.sms
    var 短信=短信输入框.getText().toString()
    setClip(短信)
    toastLog('短信已复制'+短信)

  }
)


悬控移动和点击(接码窗口,'接码窗口的移动按钮',接码窗口.移动)


// setInterval(
//   ()=>{},3000
// )

module.exports=接码窗口
