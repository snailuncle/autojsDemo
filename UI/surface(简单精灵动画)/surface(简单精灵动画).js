"ui";

/*
*    搬运的网上教程修改
*    如有维权请联系作者删除
*    简单的精灵行走动画示例
*
*/
importClass(android.graphics.Color);
importClass(java.lang.System);
importClass(java.io.File);
importClass(java.io.FileInputStream);
importClass(android.graphics.Bitmap);
importClass(android.graphics.BitmapFactory);
var linear = new android.widget.LinearLayout(activity);
var surface = new android.view.SurfaceView(activity);
linear.addView(surface);
activity.setContentView(linear);

//精灵图片

path=files.cwd()+"/1122.png";



//屏幕宽高
SCREEN_WIDTH = device.width;
SCREEN_HEIGHT = device.height;

//获取surface对象
mHolder = surface.getHolder();

//最大帧数 (1000 / 30)

DRAW_INTERVAL = 30;
spriteWidth = 0;
spriteHeight = 0;

//精灵行走速度;
spriteSpeed = 200 * SCREEN_WIDTH / 480 * 0.001;

row = 4;
col = 4;
mDrawThread = null;

deltaTime = 100; 

initResources();
mSprite = new Sprite(spriteAnimations, 0, 0, spriteWidth, spriteHeight, spriteSpeed);



mHolder.addCallback(new android.view.SurfaceHolder.Callback({
    surfaceCreated: function(holder) {
        if (null == mDrawThread) {
            new java.lang.Thread(new java.lang.Runnable({
                run: function() {
                    isRunning = true;                               
                    tickTime = System.currentTimeMillis();
                    while (isRunning) {
                        canvas = null;
                        try {
                            canvas = mHolder.lockCanvas();
                            //设置方向
                            mSprite.setDirection();
                            //更新精灵位置
                            mSprite.updatePosition(deltaTime);
                            //清屏操作
                            canvas.drawColor(android.graphics.Color.BLACK);
                            mSprite.draw(canvas);
                        } catch (e) {
                            log(e);
                        } finally {
                            if (null != mHolder) {
                                mHolder.unlockCanvasAndPost(canvas);
                            }
                        }
                        deltaTime = System.currentTimeMillis() - tickTime;
                        if (deltaTime < DRAW_INTERVAL) {
                            try {
                                sleep(DRAW_INTERVAL - deltaTime);
                            } catch (e) {
                                log(e);
                            }
                        }
                        tickTime = System.currentTimeMillis();
                    }
                }
            })).start();
        }
    },
    surfaceChanged: function(holder, format, width, height) { //改变
    },
    surfaceDestroyed: function(holder) { //销毁
        if (null != mDrawThread) {
//
        }
    }
}));


function initResources() {
    spriteImgs = generateBitmapArray(row, col);
  var src = [150, 150, 150, 150];
    spriteAnimations = new Array();
    for (var i = 0; i < row; i++) {
        spriteImg = spriteImgs[i];        
        spriteAnimation = new FrameAnimation(spriteImg, src, true);
        spriteAnimations[i] = spriteAnimation;
    }
}

function decodeBitmapFromRes() {
    opt = new BitmapFactory.Options();
    opt.inPreferredConfig = Bitmap.Config.RGB_565;
    opt.inPurgeable = true;
    opt.inInputShareable = true;
    fis = new FileInputStream(new File(path)); //文件输入流
    return BitmapFactory.decodeStream(fis, null, opt);
}

function createBitmap(source, row, col, rowTotal, colTotal) {
    bitmap = Bitmap.createBitmap(source,
        (col - 1) * source.getWidth() / colTotal,
        (row - 1) * source.getHeight() / rowTotal, 
        source.getWidth()/ colTotal, 
        source.getHeight() / rowTotal);
    return bitmap;
}


function generateBitmapArray(row, col) {
    source = decodeBitmapFromRes();
    this.spriteWidth = source.getWidth() / col;
    this.spriteHeight = source.getHeight() / row;
    var bitmaps = new Array();
    for (var i = 1; i <= row; i++) {
        bitmaps[i - 1] = new Array();
        for (var j = 1; j <= col; j++) {
            bitmaps[i - 1][j - 1] = createBitmap(source, i, j, row, col);
        }
    }
    if (source != null && !source.isRecycled()) {
        source.recycle();
        source = null;
    }
    return bitmaps;
}



function FrameAnimation(bitmaps,  duration,  repeat) {
    this.bitmaps = bitmaps;    
    this.duration = duration;
    this.repeat = repeat;   
    this.step =  0;
    this.lastBitmapTime =  null;  
    this.nextFrame = function() {
        
              
         // 判断step是否越界            
        if  (this.step >= this.bitmaps.length) {
                         //如果不无限循环             
            if (!this.repeat) {                             
                return  null;                  
            } 
            else  {                            
                this.lastBitmapTime =  null;                        
            }     
        }               
        if  (null  == this.lastBitmapTime) {
                         // 第一次执行
                           this.lastBitmapTime = System.currentTimeMillis();
                                    return  this.bitmaps[this.step =  0];                   
        }

         

                 // 第X次执行              
        this.nowTime = System.currentTimeMillis();               
        if  (this.nowTime - this.lastBitmapTime <= this.duration[this.step]) {
                         // 如果还在duration的时间段内,则继续返回当前Bitmap
                         // 如果duration的值小于0,则表明永远不失效,一般用于背景                        
            return  this.bitmaps[this.step];                    
        }               
        this.lastBitmapTime = this.nowTime;              
        return  this.bitmaps[this.step++]; // 返回下一Bitmap           
    }
}

   //  x;
  //y;
//width;
//height;

     //精灵行走速度

   //speed;

     //精灵当前行走方向

   // direction;

     //精灵四个方向的动画

    // frameAnimations;

 

function Sprite(frameAnimation,  positionX, positionY,  width,  height,  speed) {        
    this.frameAnimations = frameAnimation;            
    this.x = positionX;           
    this.y = positionY;          
    this.width = width;          
    this.height = height;        
    this.speed = speed;
    this.DOWN =  0;     
    this.LEFT =  1;      
    this.RIGHT =  2;     
    this.UP =  3; 
    this.direction;
    this.updatePosition = function(deltaTime) {             
        switch  (this.direction) {           
            case  this.LEFT:
                             //让物体的移动速度不受机器性能的影响,每帧精灵需要移动的距离为：移动速度*时间间隔
                            this.x =  this.x - this.speed * deltaTime;                            
                break;                     
            case  this.DOWN:
                            this.y =  this.y + this.speed * deltaTime;                       
                break;                        
            case  this.RIGHT:
                            this.x =  this.x + this.speed * deltaTime;                           
                break;                    
            case  this.UP:
                            this.y =  this.y - this.speed * deltaTime;                         
                break;                       
        }         
    }

     

        
    /**

         * 根据精灵的当前位置判断是否改变行走方向

         */

       
    this.setDirection = function() {        
        if  (this.x <=  0  && (this.y +  this.height) < SCREEN_HEIGHT) {            
            if  (this.x <  0)                 this.x =  0;        
            this.direction = this.DOWN;        
        } 
        else 
            if  ((this.y +  this.height) >= SCREEN_HEIGHT                 && (this.x +  this.width) < SCREEN_WIDTH) {            
                if  ((this.y +  this.height) > SCREEN_HEIGHT)                 this.y = SCREEN_HEIGHT -  this.height;           
                this.direction = this.RIGHT;        
            } 
        else 
            if  ((this.x +  this.width) >= SCREEN_WIDTH                 &&  this.y >  0) {            
                if  ((this.x +  this.width) > SCREEN_WIDTH)                 this.x = SCREEN_WIDTH -  this.width;      
                this.direction = this.UP;        
            } 
        else  {            
            if  (this.y <  0) {                
            this.y = 0;         
            this.direction = this.LEFT;                
       }
        }    
    }
      
    this.draw = function(canvas) {   
        frameAnimation = this.frameAnimations[this.direction];      
        bitmap = frameAnimation.nextFrame();       
        if  (null  != bitmap) {            
            canvas.drawBitmap(bitmap, this.x, this.y,  null);                  
        }          
    }
}




