"ui";

ui.layout(
    <frame id='爷爷'>
        <vertical   descendantFocusability="blocksDescendants" >
            <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
                关于Auto.js的用户调查
            </text>
            <ScrollView id='scrollParent'>
                <vertical id='verticalParent'    focusable="true"   focusableInTouchMode="true">
                    <text textSize="16sp" margin="8">1. 您的年龄是?</text>
                    <input text="18" inputType="number" margin="0 16"/>
                    <text textSize="16sp" margin="8">2. 您用过其他类似软件(脚本精灵，按键精灵等)吗?</text>
                    <radiogroup margin="0 16">
                        <radio text="没有用过"/>
                        <radio text="用过"/>
                        <radio text="用过，感觉不好用"/>
                        <radio text="没有Root权限无法使用"/>
                    </radiogroup>
                    <text textSize="16sp" margin="8">3. 您使用Auto.js通常用于做什么?(多选)</text>
                    <checkbox text="游戏辅助" marginLeft="16"/>
                    <checkbox text="点赞" marginLeft="16"/>
                    <checkbox text="日常生活工作辅助" marginLeft="16"/>
                    <checkbox text="练习编程" marginLeft="16"/>
                    <checkbox text="自动化测试" marginLeft="16"/>
                    <linear>
                        <checkbox text="其他" marginLeft="16"/>
                        <input w="*" margin="0 16"/>
                    </linear>
                    <text textSize="16sp" margin="8">4. 您更喜欢以下哪个图标?</text>
                    <radiogroup margin="0 16">
                        <radio/>
                        <img w="100" h="100" margin="0 16" src="http://www.autojs.org/assets/uploads/profile/3-profileavatar.png"/>
                        <radio/>
                        <img w="100" h="100" margin="0 16" src="http://www.autojs.org/assets/uploads/files/1511945512596-autojs_logo.png"/>
                    </radiogroup>
                    <text textSize="16sp" margin="8">5. 您是什么时候开始使用Auto.js的呢?</text>
                    <datepicker margin="4 16" datePickerMode="spinner"/>
                    <text textSize="16sp" margin="8">6. 您用过下面这个Auto.js的论坛吗?</text>
                    <webview id="webview" h="300" margin="0 16"/>
                    <radiogroup marginLeft="16" marginTop="16">
                        <radio text="没有用过"/>
                        <radio text="用过"/>
                        <radio text="用过，感觉不好用"/>
                    </radiogroup>
                    <linear gravity="center">
                        <button margin="16">提交</button>
                        <button margin="16">放弃</button>
                    </linear>
                </vertical>
            </ScrollView>
        </vertical>
    </frame>
)

ui.webview.loadUrl("https://www.baidu.com");

var myVerticalParent, sonViewList;


var num = function() {
    var count = 0
    return function() {
        return count++;
    }
}()


    threads.start(
        function() {
            sleep(500);

        myVerticalParent = ui.verticalParent

        sonViewList = getAllChildViews(myVerticalParent)
        log(sonViewList.length)
            //sleep(500);

            sonViewList.forEach(
                (view) => {
                    if (view) {
                        try {
                          //打个时间差,
                          // 展示view小时需要时间,定2秒
                          // 这个时候scroll是静止的,位置肯定不会错
                          // scroll的滑动控制在一秒钟之内
                          // 虽然使用了多线程,但是在下一个多线程开始之前
                          // 这个多线程已经完了
                          hideView(view)
                          threads.start(
                            function(){
                              scrollToViewTop(view)
                            }
                          )
                            sleep(2000);
                        } catch (e) {
                            log(e)
                        }

                    }
                }
            )



        }
    )






/**
 * 获取传入指定视图下的所有子视图
 *
 * @param view
 * @return
 */
function getAllChildViews(view) {
    var allChildViews = []
    if (view != null && view instanceof android.view.ViewGroup) {
        var vp = view;
        for (var i = 0; i < vp.getChildCount(); i++) {
            var viewChild = vp.getChildAt(i);
            // 添加视图
            allChildViews.push(viewChild);
            // 方法递归
            // allChildViews=getAllChildViews(viewChild).concat(allChildViews);
        }
    }
    return allChildViews;
}

function 在屏幕下边(view){
  var y=view.y
  if(y>device.height/2){
    log('在屏幕下面')
    return true
  }
  log('在屏幕上面')
  return false
}

var 滚动栏次数=function(){
  var count=1
  return function(){
    return count++;
  }
}()

function 把view移到屏幕上方(view){



  // var scrollView = ui.scrollParent
  // var y=device.height/2
  // log('y=',y)
  // log('执行移动到屏幕上方的动作')



    // scrollView.smoothScrollTo(0, y*滚动栏次数());




    // var scrollView = ui.scrollParent
    // var 耗时=1000
    // var scrollPosition=scrollView.y
    // log('scrollPosition-->y=',scrollPosition)
    // var viewPosition=view.y
    // log('viewPosition-->y=',viewPosition)

    // // var viewPosition=view.getTop()
    // var dis=device.height/2
    // // var dis=viewPosition
    // // var dis=viewPosition-scrollPosition
    // var speed=dis/100

    // speed=Math.floor(speed)
    // log('speed-->y=',speed)
    // for(var i=0;i<100;i++){
    //   var y=scrollPosition-speed*i
    //   // scrollView.setY(y);
    //   scrollView.scrollTo(0, y);
    //   sleep(3)
    // }


    var scrollView = ui.scrollParent
    var 耗时=1000
    var scrollPosition=scrollView.y
    var viewPosition=view.getTop()
    var dis=viewPosition-scrollPosition
    var speed=dis/100
    speed=Math.floor(speed)
    for(var i=0;i<100;i++){
      var y=scrollPosition+speed*i
      scrollView.smoothScrollTo(0, y);
      // sleep(300)
      // scrollView.scrollTo(0, y);
      // sleep(300)
      // scrollView.scrollTo(0, y);
      // sleep(300)
      // scrollView.scrollTo(0, y);
      // sleep(300)
      // scrollView.scrollTo(0, y);
      // sleep(300)

      sleep(3)
    }
















}

function scrollToViewTop(view) {

  log(view.y)
  //判断view在屏幕中的位置

  if(在屏幕下边(view)){
    把view移到屏幕上方(view)
  }



    // var scrollView = ui.scrollParent
    // var 耗时=1000
    // var scrollPosition=scrollView.y
    // var viewPosition=view.getTop()
    // var dis=viewPosition-scrollPosition
    // var speed=dis/100
    // speed=Math.floor(speed)
    // for(var i=0;i<100;i++){
    //   var y=scrollPosition+speed*i
    //   scrollView.scrollTo(0, y);
    //   sleep(3)
    // }


    // scrollView.scrollTo(0, view.getTop());
}


function hideView(view) {
  ui.run(
    function(){

      view.setBackgroundColor(colors.parseColor('#ff0000'))
    }
  )
    // var view = ui.scrollParent
    function scrollX(view, x) {
        view.scrollTo(x, 0)
    }
    var num = function() {
        var count = 0
        return function() {
            return count+=5;
        }
    }()
    do{
        var n = num()
        scrollX(view, n)
        var width = view.getWidth()
        sleep(6);
    }while(n < width / 3 * 2);



}
