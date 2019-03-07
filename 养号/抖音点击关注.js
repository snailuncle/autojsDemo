Array.intersect = function () {
  var result = new Array();
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    arguments[i]=arguments[i].uniquelize()
    for (var j = 0; j < arguments[i].length; j++) {
      var str = arguments[i][j];
      if (!obj[str]) {
        obj[str] = 1;
      } else {
        obj[str]++;
        if (obj[str] == arguments.length) {
          result.push(str);
        }
      } //end else
    } //end for j
  } //end for i
  return result;
}
//集合去掉重复
Array.prototype.uniquelize = function () {
  var tmp = {},
    ret = [];
  for (var i = 0, j = this.length; i < j; i++) {
    if (!tmp[this[i]]) {
      tmp[this[i]] = 1;
      ret.push(this[i]);
    }
  }
  return ret;
}
//并集
Array.union = function () {
  var arr = new Array();
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      var str = arguments[i][j];
      if (!obj[str]) {
        obj[str] = 1;
        arr.push(str);
      }
    } //end for j
  } //end for i
  return arr;
}
//2个集合的差集 在arr不存在
Array.prototype.minus = function (arr) {
  var result = new Array();
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = 1;
  }
  for (var j = 0; j < this.length; j++) {
    if (!obj[this[j]]) {
      obj[this[j]] = 1;
      result.push(this[j]);
    }
  }
  return result;
};
// console.log(Array.intersect(["1", "2", "3"], ["2", "3", "4", "5", "6"])); //[2,3]
// console.log([1, 2, 3, 2, 3, 4, 5, 6].uniquelize()); //[1,2,3,4,5,6]
// console.log(Array.union(["1", "2", "3"], ["2", "3", "4", "5", "6"], ["5", "6", "7", "8", "9"]))
// console.log(["2", "3", "4", "5", "6"].minus(["1", "2", "3"]));


// var circle = {};
// circle.交集_并集_差集_去重 = 交集_并集_差集_去重
// module.exports = circle;

var window = floaty.rawWindow(
  <relative id='main' background='#0000ff' paddingLeft="33" paddingRight="33" layout_width="match_parent" layout_height="wrap_content">
  <linear layout_width="match_parent" layout_height="wrap_content">
    <canvas id = "board"
    h = "1"
    w = "1" />
    <text id="计时" size="26" color="white" layout_gravity="left"  layout_weight='2' layout_width="0pt" layout_height="match_parent" gravity='center' background='#ff0000'>计时</text>
    <button id="action" textSize="26" textColor="white" style="Widget/AppCompat.Button.Borderless" text='开始运行' textStyle='bold' layout_gravity="right" layout_weight='4' layout_width="0pt" layout_height="wrap_content" gravity='center'  background='#00ff00'/>
  </linear>
  </relative>
  );
  var thread=null;
  var setIntervalId=null
  window.action.click(() => {
    log('点击了按钮')
    events.removeAllTouchListeners()
    log(window.action.getText())
    if (window.action.getText() == '开始运行') {
      log("window.action.getText() == '开始运行")
      thread = threads.start(function () {
        log('挑战巅峰开始了')
        try {
          挑战巅峰()
        } catch (e) {
          log(e)
        }
      })
      window.action.setText('停止运行');
      setIntervalId=setInterval(fn,1000)
    } else {
      if (thread) {
        log('线程正在运行')
        thread.interrupt();
      }else{
        log('thread')
        log(thread)
      }
      if (setIntervalId) {
        clearInterval(setIntervalId);
        c=0
      }
      window.action.setText('开始运行');
    }
  });
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
function showTime(){
  var s=''
  for(let i=0;i<arguments.length;i++){
    s+=''+arguments[i]+' '
  }
  ui.run(()=>{
    window.计时.text(s);
  })
}
var c=0
var fn=function (){
  return function (){
    showTime(s_to_hs(c));
    return c++;
  }
}()
window.setSize(device.width, 60)
window.setPosition(0, 50)
window.setTouchable(true);
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
setInterval(() => {}, 3000);
function 挑战巅峰(){

  头条粉丝界面自动点击关注()


}

//今日头条



function 获取当前页面信息() {
  const ROOT_NODE_NAME = 'FrameLayout';
  const TIMEOUT_FOR_LOOKUP_NODE = 250;
  // 获取当前应用的包名
  const getCurrentPackage = function getPackageNameOfTheForegroundApplication(timeout) {
    const node = getRootNode(timeout);
    return node !== null ? node.packageName() : currentPackage();
  };
  // 获取 FrameLayout 根节点
  const getRootNode = function getFrameLayoutNode(timeout) {
    return className(ROOT_NODE_NAME).findOne(timeout || TIMEOUT_FOR_LOOKUP_NODE);
  };
  // 获取所有指定节点及其子节点的描述内容和文本内容
  const getAllTextualContent = function getAllDescriptionAndTextUnderNodeRecursively(node) {
    let items = [];
    const getDescAndText = function (node) {
      if (node !== null) {
        items.push(node.desc());
        items.push(node.text());
        for (let len = node.childCount(), i = 0; i < len; i++) {
          getDescAndText(node.child(i));
        }
      }
    };
    getDescAndText(node || getRootNode());
    return items.filter(item => item !== '' && item !== null);
  };
  return {
    getCurrentPackage: getCurrentPackage,
    getAllTextualContent: getAllTextualContent,
  };
}

function 返回当前页面的所有文字列表() {
  var 当前页面信息 = 获取当前页面信息()
  var 当前app = getAppName(当前页面信息.getCurrentPackage())
  // log("当前app=", 当前app)
  var 当前页面所有文字列表 = 当前页面信息.getAllTextualContent()
  // log("当前页面所有文字列表=", 当前页面所有文字列表)
  return 当前页面所有文字列表
}









function 头条粉丝界面自动点击关注(){
  while(1){
    var 滑动前的文字列表=返回当前页面的所有文字列表()
    一次关注的过程()
    从下往上滑动()
    var 滑动后的文字列表=返回当前页面的所有文字列表()
    if(两个数组是否一样(滑动前的文字列表,滑动后的文字列表)){

      log('滑动前后文字一样,说明到底部了')
      alert('全部关注完毕')
      break;
    }

  }

}
function 两个数组是否一样(滑动前的文字列表,滑动后的文字列表){
  if(滑动前的文字列表.toString()==滑动后的文字列表.toString()){
    // log(滑动前的文字列表.toString())
    // log(滑动后的文字列表.toString())
    return true
  }
  return false
}
function 一次关注的过程(){
  var 关注fullId='cb9'
  // var 关注fullId='com.ss.android.article.news:id/cb9'

  var 关注collection=id(关注fullId).find()
  if(关注collection.empty()){
    log('没找到关注列表')
  }else{
    log(关注collection.length)
    var 有效的关注collection=[]
    关注collection.map(
      (关注)=>{
        var bounds = 关注.bounds()
        var left = bounds.left
        var top = bounds.top
        var right = bounds.right
        var bottom = bounds.bottom
        if (left < right && top < bottom && left >= device.width/2 && right <= device.width && top > 100 && bottom < device.height - 100) {
          有效的关注collection.push(关注)
        }
      }
    )
    log(有效的关注collection)
    log(有效的关注collection.length)
    有效的关注collection.map(
      (关注)=>{
        log(关注.bounds())
        if(!关注.selected()){
          clickView(关注)
          // 关注.select()
          sleep(3100)
        }
      }
    )

  }
}

function clickView(view) {
  log(arguments.callee.name + '开始')
  log(view)
  if (view) {
    var x = view.bounds().centerX()
    var y = view.bounds().centerY()
    log('将要点击的坐标 %s,%s', x, y)
    press(x, y, 1)
  } else {
    throw '传入clickView中的view异常'
  }
  log(arguments.callee.name + '结束')
}




function swipeRnd(x1, y1, x2, y2, duration) {
  log(arguments.callee.name + '开始')
  var k = 20
  var x1 = x1 + random(-(k), k)
  var y1 = y1 + random(-(k), k)
  var x2 = x2 + random(-(k), k)
  var y2 = y2 + random(-(k), k)
  var duration = duration + random(-(k), k)
  swipeRnd2(x1, y1, x2, y2, duration)
}

function swipeRnd2(x1, y1, x2, y2, duration) {
  gesture(duration, [x1, y1], [x1 + 60, y1 - 80], [x2, y2])
}

function 从下往上滑动(阅读文章速度) {
  log(arguments.callee.name + '开始')
  var 阅读文章速度 = 阅读文章速度 || 2.5
  var w = device.width
  var h = device.height
  var x1 = Math.floor(w / 5 * 2)
  var y1 = Math.floor(h / 5 * 4)
  var x2 = Math.floor(w / 5 * 1)
  var y2 = Math.floor(h / 5 * 阅读文章速度)
  var duration = 300
  log('滑动参数=', x1, y1, x2, y2, duration)
  swipeRnd(x1, y1, x2, y2, duration)
  log(arguments.callee.name + '结束')
  sleep(3000)
}
