var 已经存在的日志arr=[]
var 显示几行日志=6
var 已经存在的日志长度限制=100
_log=log;
var window=floaty.rawWindow(
  <relative id='main' layout_width="match_parent" layout_height="wrap_content" >
    <linear layout_width="match_parent" layout_height="wrap_content" background='#ff000000'  >
      <button id="计时" background='#ffff0000' layout_width="0pt" layout_height="match_parent"  layout_weight='1' gravity="center" textSize="13dp" textColor="white" style="Widget/AppCompat.Button.Borderless" text='第一块'
      />
      <button id="记录app"  background='#ff00ff00' layout_width="0pt" layout_height="match_parent"  layout_weight='1' gravity="center" textSize="13dp" textColor="white" style="Widget/AppCompat.Button.Borderless" text='第二块'
      />
      <text id="日志"  background='#ff0000ff' layout_width="0pt" layout_height="wrap_content"  layout_weight='4' gravity="center" size="13dp" color="white" text='第三块'
      />
    </linear>
  </relative>
);




w=Math.floor(device.width)
h=Math.floor(device.height/5)
window.setSize(w,h)
window.setPosition(0,device.height/2)








var 计时函数=function (){
  var count=0
  return function (){
    ui.run(
      ()=>{window.计时.text(s_to_hs(count)+'')}
    )
    return count++;
  }
}()

//计时
var id=setInterval(计时函数,1000)
var 二十分钟=20*60*1000
setTimeout(function(){
  clearInterval(id);
}, 二十分钟);

//移动窗口
window.main.setOnTouchListener(
  function (view,event){
    switch (event.getAction()){
      case event.ACTION_DOWN:
        x=event.getRawX()
        y=event.getRawY()
        windowX=window.getX()
        windowY=window.getY()
        return true
      case event.ACTION_MOVE:
      //移动手指调整悬浮窗位置
       window.setPosition(windowX+(event.getRawX()-x),windowY+(event.getRawY()-y))
    }
    return true
  }
)

//记录app
window.记录app.on(
  'click',()=>{alert('点击了记录app')}
)

//日志
for(let i=0;i<10;i++){
  log(i)
  sleep(1000)
}

function 已经存在的日志strLength(已经存在的日志arr){
  var 已经存在的日志str=已经存在的日志arr.join('\n')
  return 已经存在的日志str.length
}
function 已经存在的日志长度超过标准了吗(已经存在的日志arr){
  var result1=已经存在的日志strLength(已经存在的日志arr)>已经存在的日志长度限制 ? true:false
  var result2=已经存在的日志arr.length > 显示几行日志 ? true:false
  return result1 || result2
}
function 已经存在的日志arrToStr(已经存在的日志arr){
  var result=已经存在的日志arr.join('\n')
  return result
}
function log(){
  var s=''
  for(let i=0;i<arguments.length;i++){
    s+=''+arguments[i]+' '
  }
  if(已经存在的日志长度超过标准了吗(已经存在的日志arr)){
    已经存在的日志arr.shift()
  }
  已经存在的日志arr.push(s)
  var 要打印的内容=已经存在的日志arrToStr(已经存在的日志arr)
  // alert(要打印的内容)
  ui.run(()=>{
    window.日志.text(要打印的内容);
  })
}



function s_to_hs(s){
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  var h;
  h  =   Math.floor(s/60);
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  s  =   s%60;
  //将变量转换为字符串
  h    +=    '';
  s    +=    '';
  //如果只有一位数，前面增加一个0
  h  =   (h.length==1)?'0'+h:h;
  s  =   (s.length==1)?'0'+s:s;
  return h+':'+s;
}
