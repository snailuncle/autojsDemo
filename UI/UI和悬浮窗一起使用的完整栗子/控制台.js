
// 控制台负责悬浮窗的隐藏和显示
// 控制台有两个控制区域
// 接码悬浮窗  +  浏览器悬浮窗

var 控制台,悬控移动和点击,多线程控制悬浮窗,接码窗口;
悬控移动和点击=require('./悬控移动和点击.js')
多线程控制悬浮窗=require('./多线程控制悬浮窗.js')


    控制台=floaty.window(
    <vertical bg='#FFB6C1' gravity="center" >
      <TableLayout layout_width="match_parent" layout_height="match_parent" stretchColumns="1" gravity="center">

        <TableRow>
          <vertical gravity="center">
            <horizontal>
              <button id='隐藏或显示' layout_weight="1">隐藏或显示接码窗口</button>
            </horizontal>
          </vertical>
        </TableRow>
        <TableRow>
        <horizontal>
          <button id='移动' layout_weight="1">移动</button>
          <button id='关闭' layout_weight="1">关闭</button>
        </horizontal>
        </TableRow>
      </TableLayout>
    </vertical>
    )






// function kill(pid){
//   android.os.Process.killProcess(pid)
// }

控制台.关闭.click(
  function(){
    // var myPid=android.os.Process.myPid()
    // kill(myPid)
    // 控制台.close()
    floaty.closeAll()
  }
)
控制台.隐藏或显示.click(
  function(){
    log('点击了控制台的隐藏或显示按钮')
    log('开始加载接码窗口')

    if(!接码窗口){
      var thread=threads.start(
        function(){
          log('多线程中开始加载模块')
          接码窗口=require('./接码窗口.js')
          log('多线程中结束加载模块')
        }
      )
      log('接码窗口=')
      log(接码窗口)
    }
    log('结束加载接码窗口')

    var 是否加载过一次悬浮窗=false

    var intervalId=setInterval(
      function(){
        if(!是否加载过一次悬浮窗){
          if(接码窗口){
            是否加载过一次悬浮窗=true
            多线程控制悬浮窗.隐藏或显示("接码窗口",接码窗口)

          }
        }
      },100
    )


    setTimeout(
      function(){
        clearInterval(intervalId);
      },2000
    )




  }
)

悬控移动和点击(控制台,'控制台的移动按钮',控制台.移动)


setInterval(() => {}, 3000)









module.exports=控制台
