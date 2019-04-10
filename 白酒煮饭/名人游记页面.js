//游记是否打开
auto();
//请求截图
while(!requestScreenCapture()){
  log("请求截图失败");
  sleep(500)
}
sleep(1111)

// 892, 1476 - 966, 1596
// press( 928,  877,  1)
// sleep(1111)
// press( 928,  877,  1)

点击全部游记的爱心()


function 点击全部游记的爱心(){
  //不停的上滑,点击爱心,重复
  while(1){
    点击本页全部爱心()
    上滑()
    sleep(300)
  }

}

function 报警(){
  //震动两秒
  device.vibrate(2000);
  sleep(1000)
  device.vibrate(2000);
  sleep(1000)
  device.vibrate(2000);
  sleep(1000)
  log('红心点不了')
  exit()
}
function 上滑(){
  // 518,  337, 0xe1e1e1
  // 517, 1386, 0xfefefe
  var x1=318
  var y1=1386
  var x2=818
  var y2=337
  var duration=1000
  swipe(x1, y1, x2, y2, duration)
}
//爱心是否点击
// 我关注的爱心rect集合= [ Rect(370, 1281 - 444, 1401), Rect(886, 1281 - 960, 1401) ]
function 点击本页全部爱心(){
  我关注的爱心rect集合=返回当前界面的爱心rect集合()
  for(let i=0;i<我关注的爱心rect集合.length;i++){
    loved=爱心是否已经点击(我关注的爱心rect集合[i])
    if(loved){

    }else{
      let x=我关注的爱心rect集合[i].centerX()
      let y=我关注的爱心rect集合[i].centerY()
      if(游记是否选中()){
        press(x,y,1)
        sleep(1000)
      }else{
        log("虽然找到爱心了,但游记没有选中")
      }
    }
  }
  我关注的爱心rect集合=返回当前界面的爱心rect集合()
  没点的爱心数量=0
  for(let i=0;i<我关注的爱心rect集合.length;i++){
    loved=爱心是否已经点击(我关注的爱心rect集合[i])
    if(loved){

    }else{
      没点的爱心数量++
    }
  }
  if(没点的爱心数量>0){
    for(let i=0;i<2;i++){

      我关注的爱心rect集合=返回当前界面的爱心rect集合()
      for(let i=0;i<我关注的爱心rect集合.length;i++){
        loved=爱心是否已经点击(我关注的爱心rect集合[i])
        if(loved){

        }else{
          let x=我关注的爱心rect集合[i].centerX()
          let y=我关注的爱心rect集合[i].centerY()
          if(游记是否选中()){
            press(x,y,1)
            sleep(1000)
          }else{
            log("虽然找到爱心了,但游记没有选中")
          }
        }
      }
      sleep(2000)
      没点的爱心数量=0
      我关注的爱心rect集合=返回当前界面的爱心rect集合()
      for(let i=0;i<我关注的爱心rect集合.length;i++){
        loved=爱心是否已经点击(我关注的爱心rect集合[i])
        if(loved){

        }else{
          没点的爱心数量++
        }
      }

      if(没点的爱心数量){

      }else{
        return ;
      }


    }
    报警()
    //300爱心和视频差300个像素

  }


}

function 游记是否选中(){

  var w = textMatches(/游记\(\d+\)/).findOne(6000);
  //如果找到控件则点击
  if(w != null){
    log("游记是否选中=")
    w.parent().click()
      return w.selected()
  }else{
      //否则提示没有找到
      log("没有找到游记控件");
      return false
  }
}





function 爱心是否已经点击(爱心rect){
  x=爱心rect.centerX()
  y=爱心rect.centerY()
  爱心点击之后的红色="#ff4e3f"
  //截图
  var img = captureScreen();
  //获取在点(100, 100)的颜色值
  var color = images.pixel(img, x, y);
  //显示该颜色值
  // toast(colors.toString(color));
  isSame=colors.isSimilar(color, 爱心点击之后的红色)
  log(isSame)
  return isSame
}



function 返回当前界面的爱心rect集合(){

  我关注的=[]
  id("like_item_like").find().forEach(function(item){
  //  74爱心宽度
  // 120爱心高度
  爱心宽度=74
  爱心高度=120
  爱心宽高误差=10

  // outputObj(item.bounds())
  // exit()
    if( item.bounds().right-item.bounds().left> 爱心宽度-爱心宽高误差 &&
      item.bounds().right-item.bounds().left<爱心宽度+爱心宽高误差 &&
      item.bounds().bottom-item.bounds().top> 爱心高度-爱心宽高误差 &&
      item.bounds().bottom-item.bounds().top<爱心高度+爱心宽高误差
      ){
        我关注的.push(item.bounds())
      }else{
        // log(item.bounds())
        // log(item.bounds().right-item.bounds().left)
        // log(item.bounds().bottom-item.bounds().top)

      }
      // log("我关注的=",我关注的)

  });
  log("我关注的=",我关注的)
  return 我关注的
}


function outputObj(obj) {
	var description = "";
	for (var i in obj) {
		description += i + " = " + obj[i] + "\n";
	}
	log(description);
}



// [ Rect(0, 1281 - -640, 1401),
//   Rect(0, 1281 - -120, 1401),
//   Rect(0, 2342 - -640, 1920),
//   Rect(0, 2342 - -116, 1920),
//   Rect(370, 1281 - 444, 1401),
//   Rect(886, 1281 - 960, 1401),
//   Rect(366, 2342 - 440, 1920),
//   Rect(886, 2342 - 960, 1920) ]





