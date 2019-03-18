/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   ui.inflate的例子
 */
'ui';
var 太阳号=ui.inflate(
<frame><vertical id='ONE_PIECE'></vertical></frame>
);
var 路飞=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='路飞'></button>,太阳号.ONE_PIECE,true);
var 索隆=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='索隆'></button>,太阳号.ONE_PIECE,true);
var 娜美=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='娜美'></button>,太阳号.ONE_PIECE,true);
var 乌索普=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='乌索普'></button>,太阳号.ONE_PIECE,true);
var 山治=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='山治'></button>,太阳号.ONE_PIECE,true);
var 乔巴=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='乔巴'></button>,太阳号.ONE_PIECE);
var 罗宾=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='罗宾'></button>,太阳号.ONE_PIECE);
var 弗兰奇=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='弗兰奇'></button>,太阳号.ONE_PIECE);
var 布鲁克=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='布鲁克'></button>,太阳号.ONE_PIECE);
var 甚平=ui.inflate(<button textColor="{{colors.toString(rndColor())}}" text='甚平'></button>,太阳号.ONE_PIECE);
var url='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552935062068&di=920ee6c4d142d4f6d08d249ee713f298&imgtype=0&src=http%3A%2F%2Fimg.361games.com%2Ffile%2F2016%2F05%2Fz3zevuhrjc2.jpg'
var 合影=ui.inflate(<img w="*"h="*"url="{{url}}" />,太阳号.ONE_PIECE);
var 船员s=[乔巴,罗宾,弗兰奇,布鲁克,甚平,合影]
ui.run(function(){
  threads.start(
    function(){
      船员s.map((船员)=>{
        sleep(1000)
        ui.run(
          function(){
            太阳号.ONE_PIECE.addView(船员)
          }
        )
      })
    }
  )

})
ui.setContentView(太阳号)

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

