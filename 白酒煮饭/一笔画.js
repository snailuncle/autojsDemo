"auto";

events.setKeyInterceptionEnabled(true);
events.observeKey();
events.onKeyDown("volume_down", function(event){
      toast("运行中");
      engines.execScript("hello world", "main();\n" + main.toString());
});


function main(){
"auto";
images.requestScreenCapture();
setScreenMetrics(1080, 2160);
var sx=114,sy=488,ex=960,ey=1340;
var rown=6,coln=6;
var bw=130,cw=12;
var img=images.captureScreen();
var table=new Array();
var path=new Array();
var start_r,start_c;

for(var i=0;i<rown;i++){
    var tab0=new Array();
    for(var j=0;j<coln;j++){
       if(images.detectsColor(img,"#d0d0d0",sx+(bw+cw)*j+bw/2,sy+bw/2+(bw+cw)*i)){
           tab0[j]=1;
       }else if(images.detectsColor(img,"#ffffff",sx+(bw+cw)*j+bw/2,sy+bw/2+(bw+cw)*i)){
           tab0[j]=0;
       }else{tab0[j]=2;start_r=i;start_c=j;}
    }
    table[i]=tab0;
 }
 
 /*for(var i=0;i<rown;i++){
    for(var j=0;j<coln;j++){
        console.show();
        log(table[i][j]);
       }
 }*/
 
 
 
an(start_r,start_c);

function showw(){
    var swipe_path=new Array();
    var x=start_c*(bw+cw)+sx+bw/2;var y=start_r*(bw+cw)+sy+bw/2;
    swipe_path[0]=[x,y];
    for(var i=0;i<path.length;i++){
        switch(path[i]){
            case 1:x+=(bw+cw);swipe_path[i+1]=[x,y];break;
            case -1:x-=(bw+cw);swipe_path[i+1]=[x,y];break;
            case 2:y+=(bw+cw);swipe_path[i+1]=[x,y];break;
            case -2:y-=(bw+cw);swipe_path[i+1]=[x,y];break;
 
        } 
        } 
        for(var i=0;i<swipe_path.length-1;i++){
            swipe(swipe_path[i][0],swipe_path[i][1],swipe_path[i+1][0],swipe_path[i+1][1],150);
        }
        toast("结束");
}

function an(r,c){
    var dir=arry_1_dir(r,c);
    if(dir.length==0){
         if(!is_table_n1())return false;
         showw();return true;
    }else{
        for(var i=0;i<dir.length;i++){
            switch(dir[i]){
                case -2:
                    table[r-1][c]=2;
                    path[path.length]=-2;
                    if(an(r-1,c)){
                        return true;
                    }else{
                     
                        table[r-1][c]=1;
                        path.pop();
                    }
                    break;
                case 2:
                  
                    table[r+1][c]=2;
                    path[path.length]=2;
                    if(an(r+1,c)){
                        return true;
                    }else{
                       
                        table[r+1][c]=1;
                        path.pop();
                    }
                    break;
                case -1:
                  
                    table[r][c-1]=2;
                    path[path.length]=-1;
                    if(an(r,c-1)){
                        return true;
                    }else{
                        
                        table[r][c-1]=1;
                        path.pop();
                    }
                    break;
               case 1:
                   
                    table[r][c+1]=2;
                    path[path.length]=1;
                    if(an(r,c+1)){
                        return true;
                    }else{
                        
                        table[r][c+1]=1;
                        path.pop();
                    }
                    break;
             
            }
         }
         return false;
    }
    
 }
 
function arry_1_dir(r,c){
    var dir=new Array();
    if(r!=rown-1){if(table[r+1][c]==1)dir[dir.length]=2;}
    if(r!=0){if(table[r-1][c]==1)dir[dir.length]=-2;}
    if(c!=0){if(table[r][c-1]==1)dir[dir.length]=-1;}
    if(c!=coln-1){if(table[r][c+1]==1)dir[dir.length]=1;}
    return dir;
    
 }
 
 function is_table_n1(){
     for(var i=0;i<table.length;i++){
         for(var j=0;j<table[i].length;j++){
             if(table[i][j]==1)return false;
          }
      }
      return true;
 }
 }
