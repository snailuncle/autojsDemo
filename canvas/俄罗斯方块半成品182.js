"ui";
ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
        <horizontal >
            <button id="zy" text="左移"/>
            <button id="yy" text="右移"/>
            <button id="bh" text="变换" layout_weight="1"/>
        </horizontal>
    </vertical>

);
//方块宽度
const BLOCK_WIDTH = 40;
//游戏区域宽高
const GAME_BOARD_HEIGHT = 30;
const GAME_BOARD_WIDTH = 17;

const COLOR = colors.parseColor("#03a9f4");
const WALL_COLOR = colors.parseColor("#607d8b");

var r;
var fk=new Array();
var pk=29;
var bh=0;

var arr=new Array();
for(var i=0;i<=31;i++){
    arr[i]=new Array();
    for(var n=0;n<=17;n++){   
    if(i==31){
        arr[i][n]=1;
        }else{    
    arr[i][n]=0;
    }
    }}

randoms();
  function randoms(){
    fk=0;
    bh=0;
r=random(1,5);
switch(r){
    case 1:
    fk=[{x:8,y:1},{x:7,y:2},{x:8,y:2},{x:9,y:2}];
    return true;
    case 2:
    fk=[{x:7,y:1},{x:8,y:1},{x:7,y:2},{x:8,y:2}];
    return true;
    case 3:
    fk=[{x:8,y:1},{x:8,y:2},{x:9,y:2},{x:9,y:3}];
    return true;
    case 4:
    fk=[{x:8,y:1},{x:8,y:2},{x:8,y:3},{x:9,y:3}];
    return true;
    case 5:
    fk=[{x:8,y:1},{x:8,y:2},{x:8,y:3},{x:8,y:4}];
    return true;
    }
}    

var paint = new Paint();
ui.canvas.on("draw", function(canvas) {
     //计算坐标偏移，使的游戏区域绘制在画面的水平居中位置
    var offset = {
        x: (canvas.getWidth() - (GAME_BOARD_WIDTH + 2) * BLOCK_WIDTH) / 2,
        y: 100
    };
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    paint.setColor(WALL_COLOR);
    for(var i = 0; i <= GAME_BOARD_WIDTH + 1; i++){
        //上围墙
        drawBlock(canvas, paint, i, 0);
        //下围墙
        drawBlock(canvas, paint, i, GAME_BOARD_HEIGHT + 1);
    }
    for(var i = 0; i <= GAME_BOARD_HEIGHT + 1; i++){
        //左围墙
        drawBlock(canvas, paint, 0, i);
        //右围墙
        drawBlock(canvas, paint, GAME_BOARD_WIDTH + 1, i);
    }
    //绘制方块
    paint.setColor(COLOR);
    for(var i = 0; i < fk.length; i++){
        drawBlock(canvas, paint, fk[i].x, fk[i].y);
    }
    
     for(var a=0;a<arr.length;a++){          
        for(var b=0;b<arr[a].length;b++){
            if(arr[a][b]==1&&b<18&&a<31){
      canvas.drawRect(0+40*b, 0+40*a, 40*b+40, 40*a+40, paint);
      }
      }}    
     });
     
  ui.zy.on("click", function() { 
  ui.run(()=>{
     for(var i = 0; i < 4; i++){
   fk[i].x--;
      }
      for(var i = 0; i < 4; i++){
       if(arr[fk[i].y][fk[i].x-1]==1){
                 for(var i = 0; i < 4; i++){
                 fk[i].x++;
                }
                 }
      }
       zy();
     });});
  ui.yy.on("click", function() {
      ui.run(()=>{   
     for(var i = 0; i < 4; i++){
        fk[i].x++;
    } 
    for(var i = 0; i < 4; i++){
        
       if(arr[fk[i].y][fk[i].x+1]==1){
                 for(var i = 0; i < 4; i++){
                 fk[i].x--;
                }
                 }
      }   
    zy();  
     });});  
   ui.bh.on("click",function(){
      switch(r){
          case 1:          
          if(bh==0){
          fk[0].x++;fk[0].y++;
          fk[1].x++;fk[1].y--;
          fk[3].x--;fk[3].y++;
          bh++;
          }else if(bh==1){
              fk[0].x--;fk[0].y++;
          fk[1].x++;fk[1].y++;
          fk[3].x--;fk[3].y--;
              bh++;
              }else if(bh==2){
                  fk[0].x--;fk[0].y--;
          fk[1].x--;fk[1].y++;
          fk[3].x++;fk[3].y--;
                  bh++;
                  }else if(bh==3){
                     fk[0].x++;fk[0].y--;
          fk[1].x--;fk[1].y--;
          fk[3].x++;fk[3].y++;
                      bh=0;                      
                      }
                      zy();       
          return true;
          case 2:         
          return true;
          case 3:
          if(bh==0){
              fk[0].x++;fk[0].y++;
              fk[2].x--;fk[2].y++;
              fk[3].x-=2;
              bh++;
              }else if(bh==1){
                  fk[0].x--;fk[0].y--;
                  fk[2].x++;fk[2].y--;
                  fk[3].x+=2;
                  bh=0;
                  }
                  zy();
          return true;
          case 4:
          if(bh==0){
               fk[0].x++;fk[0].y++;
               fk[2].x--;fk[2].y--;
               fk[3].x-=2
              bh++;
              }else if(bh==1){
                  fk[3].x+=2;fk[3].y-=2;
                  fk[2].x+=2;
                  fk[0].x-=2;
                  bh++;
                  }else if(bh==2){
                      fk[0].x++;fk[0].y--;
                      fk[2].x--;fk[2].y++;
                      fk[3].y+=2;
                      bh=0;
                      } 
                      zy();        
          return true;
          case 5:
          if(bh==0){
              fk[0].x--;fk[0].y++;
              fk[2].x++;fk[2].y--;
              fk[3].x+=2;fk[3].y-=2;
                bh++;
                  }else if(bh==1){
                      fk[0].x++;fk[0].y--;
              fk[2].x--;fk[2].y++;
              fk[3].x-=2;fk[3].y+=2;
                      bh=0;
          }
          zy();
          return true;          
          }
       });  




    threads.start(
    function() {
        setInterval(() => {
            
            for(var a=0;a<arr.length;a++){
        for(var b=0;b<arr[a].length;b++){
         for(var i = 0; i < 4; i++){
           if(arr[fk[i].y+1][fk[i].x]==1){
               for(var i = 0; i < 4; i++){
               arr[fk[i].y][fk[i].x]=1;
               }
               randoms();
   }}
      }}
     
            
       
       for(var i = 0; i < 4; i++){
           fk[i].y++;
           }
        }, 800);
    });
  
 
 
 

 function zy(){        
         for(var i = 0; i < 4; i++){
      if(fk[i].x<=0){
         for(var o = 0; o < 4; o++){
             fk[o].x++;
             }
             }else if(fk[i].x>=18){
                 for(var o = 0; o < 4; o++){
             fk[o].x--;
             }}            
                 }                
                 }
 
 

function drawBlock(canvas, paint, x, y){
    x *= BLOCK_WIDTH;
    y *= BLOCK_WIDTH;
    canvas.drawRect(x, y, x + BLOCK_WIDTH, y + BLOCK_WIDTH, paint);
}












