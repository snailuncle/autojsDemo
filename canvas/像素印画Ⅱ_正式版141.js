/*
*调用库已加密，版权所有，切勿解密！
*未加密代码在底部！
*作者:鄢主晴伊
*QQ:815821214
*WX:RunJavaScript
*/

/**
 * Decrypted by ProjectXero
 * Only for learning code
 */
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Feis={
String:java.lang.String,
StringBuilder:java.lang.StringBuilder,
Path:android.graphics.Path,
Rect:android.graphics.Rect,
RectF:android.graphics.RectF,
Paint:android.graphics.Paint,
Bitmap:android.graphics.Bitmap,
Canvas:android.graphics.Canvas,
Camera:android.graphics.Camera,
Matrix:android.graphics.Matrix,
Color:android.graphics.Color,
Drawable:android.graphics.drawable.Drawable,
ColorDrawable:android.graphics.drawable.ColorDrawable,
BitmapDrawable:android.graphics.drawable.BitmapDrawable,
GradientDrawable:android.graphics.drawable.GradientDrawable,
BitmapFactory:android.graphics.BitmapFactory,
File:java.io.File,
Array:java.lang.reflect.Array,
System:java.lang.System,
TextView:android.widget.TextView,
EditText:android.widget.EditText,
SeekBar:android.widget.SeekBar,
LinearLayout:android.widget.LinearLayout,
ImageView:android.widget.ImageView,
ListView:android.widget.ListView,
PopupWindow:android.widget.PopupWindow,
RelativeLayout:android.widget.RelativeLayout,
FrameLayout:android.widget.FrameLayout,
Gravity:android.view.Gravity,
View:android.view.View,
rootView:function(){return ctx.getWindow().getDecorView()}
};
Feis.displayMetrics=new android.util.DisplayMetrics();
ctx.getWindowManager().getDefaultDisplay().getMetrics(Feis.displayMetrics);
Feis.屏宽=Feis.displayMetrics.widthPixels;
Feis.屏高=Feis.displayMetrics.heightPixels;

function setTheme(m){
var theme=(m==1?android.R.style.Theme_Light_Panel:
(m==2?android.R.style.Theme_DeviceDefault_Dialog_Alert:
(m==3?android.R.style.Theme_Holo_Dialog_NoActionBar:
(m==4?android.R.style.Theme_Translucent_NoTitleBar:android.R.style.Theme_Material_Light))));
if(android.os.Build.VERSION.SDK>=21&&(m!=0||m!=null)){
ctx.setTheme(theme);}}
//setTheme(2);

var JavaArray={
STRING:new java.lang.String(""),
create:function(cla,length){
 var c=cla.getClass();
 if(c.isArray()){c=c.getComponentType()};
 return Feis.Array.newInstance(c,length);},
newInt:function(length){
 return Feis.Array.newInstance(java.lang.Integer.TYPE,length);},
newFloat:function(length){
 return Feis.Array.newInstance(java.lang.Float.TYPE,length);},
newByte:function(length){
 return Feis.Array.newInstance(java.lang.Byte.TYPE,length);},
newDouble:function(length){
return Feis.Array.newInstance(java.lang.Double.TYPE,length);},
set:function(arr,index,vel){
Feis.Array.set(arr,index,vel);},
get:function(arr,index){
return Feis.Array.get(arr,index);},
isArray:function(arr){return arr!=null?(arr.getClass().isArray()):false;},
splice:function(arr,a,b,arr2){
if(!this.isArray(arr))return null;
var al=arr.length;
if(this.isArray(arr2)){
var bl=arr2.length,cl=(al+bl)-b;
var array=this.create(arr,cl);
if(a<=al&&a>=0&&b<=al&&b>=0&&a+b<al){
Feis.System.arraycopy(arr,0,array,0,a);
Feis.System.arraycopy(arr2,0,array,a,bl);
Feis.System.arraycopy(arr,a+b,array,a+bl,al-(a+b));
return array;}
}else{var bl=(al-b);
var array=this.create(arr,bl);
if(a<=al&&a>=0&&b<=al&&b>=0){
Feis.System.arraycopy(arr,0,array,0,a); 
if(arr2!=null)this.set(array,a,arr2);
Feis.System.arraycopy(arr,a+b,array,a,al-(a+b));
return array;}}},
push:function(arr,obj){
if(!this.isArray(arr))return null;
var leng=arr.length;
if(!this.isArray(obj)){
var array=this.create(arr,leng+1);
Feis.System.arraycopy(arr,0,array,0,leng);
this.set(array,leng,obj); 
return array;}else{return this.concat(arr,obj);}},
concat:function(a,b){
if(!this.isArray(a)||!this.isArray(a))return null;
var al=a.length,bl=b.length;
var array=this.create(a,al+bl);
Feis.System.arraycopy(a,0,array,0,al);
Feis.System.arraycopy(b,0,array,al,bl);
return array;} }

Feis.线程=function(run,is){
var t=new java.lang.Thread(function(){try{
if(is)android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);run(t);}catch(e){Feis.报错(e);}});t.start();};

Feis.UiT=function(Run){
ctx.runOnUiThread(function(){try{Run();}catch(e){Feis.报错(e);};});};

Feis.newTick=function(run,ms,t){
if(t==undefined){t=0;}
Feis.UiT(function(){new android.os.Handler().postDelayed(function(){ t++;
if(run(t)){Feis.newTick(run,ms,t);}},ms);});};

Feis.setTick=function(tick,run){
var time=1000/tick;
var T=new java.lang.Thread(new java.lang.Runnable(){
run:function(){android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
while(true){
try{T.sleep(time);if(run())break;}catch(e){Feis.报错(e);break;} } }});T.start();}

Feis.Color_alpha=function(color,alpha){
var rgb=Feis.Color_toARGB(color);
return Feis.Color.argb(alpha,rgb[1],rgb[2],rgb[3]);
}
Feis.Color_toARGB=function(color){
return [Feis.Color.alpha(color),Feis.Color.red(color),Feis.Color.green(color),Feis.Color.blue(color)];
}
Feis.Color_toHSV=function(color){
var hsv=new Feis.Array.newInstance(java.lang.Float.TYPE,3);
Feis.Color.colorToHSV(color,hsv);return hsv;
}
Feis.Color_toHex=function(color,t){
 var out=(t==null?"0x":t);
 var a=(color>>>24).toString(16),
r=((color>>16)&0xFF).toString(16),
g=((color>>8)&0xFF).toString(16),
b=(color&0xFF).toString(16);
 out+=(a.length==1?"0"+a:a)+(r.length==1?"0"+r:r)+
(g.length==1?"0"+g:g)+(b.length==1?"0"+b:b);
return out;
}
Feis.Color_argbToHex=function(rgb,t){
 var leng=rgb.length;var c16=(t==null?"0x":t);
 for(var i=0;i<leng;i++){var hex=rgb[i].toString(16);
 c16+=(hex.length==1?"0"+hex:hex);} return c16;
}
Feis.Color_argbToHSV=function(r,g,b){
var hsv=new Feis.Array.newInstance(java.lang.Float.TYPE,3);
Feis.Color.RGBToHSV(r,g,b,hsv);return hsv;
}
Feis.Color_hexToARGB=function(hex){
return Feis.Color_toARGB(parseInt(hex));
}
Feis.Color_hex=function(hex){
if(hex instanceof String){
hex="#"+hex.substr(2)
return Feis.Color.parseColor(hex);
}else{return (new java.lang.Long(hex).intValue());}
}
Feis.Color_toHSV=function(color){
return Feis.Color_toHSV(parseColor(color));
}
Feis.Color_hsv=function(h,s,v,a){
return Feis.Color.HSVToColor((a==null?255:a),[h,s,v]);
}
Feis.Color_toRGB=function(h,s,v){
var color=Feis.Color.HSVToColor([h,s,v]);
return [Feis.Color.red(color),Feis.Color.green(color),Feis.Color.blue(color)];
}
Feis.Color_hsvToHex=function(h,s,v){
return Feis.Color_toHex(Feis.Color_hsv(h,s,v));
}
Feis.recolor=function(color){
return Feis.Color.argb(Feis.Color.alpha(color),255-Feis.Color.red(color),255-Feis.Color.green(color),255-Feis.Color.blue(color));
}
Feis.getAlpha=function(color){return Feis.Color.alpha(color);}
Feis.getRed=function(color){return Feis.Color.red(color);}
Feis.getGreen=function(color){return Feis.Color.green(color);}
Feis.getBlue=function(color){return Feis.Color.blue(color);}

Feis.getImages=function(){
var paths=[];var cursor=ctx.getContentResolver().query(
android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI,null,null,null,null);
while(cursor.moveToNext()){
var data=cursor.getBlob(cursor.getColumnIndex(android.provider.MediaStore.Images.Media.DATA));
var str=new Feis.String(data,0,data.length-1,"utf-8");
paths.push(String(str));}return paths;}

Feis.getSdcardBitmap=function(path){
return new Feis.BitmapFactory.decodeFile(path);}

Feis.getSdcardDrawable=function(path){
return new Feis.BitmapDrawable(Feis.getSdcardBitmap(path));}

Feis.getScaleSize=function(w,h,size){
if(w<=h){h=Math.floor((size/w)*h);w=size;}else if(w>h){w=Math.floor((size/h)*w);h=size;}
return [w,h];}

Feis.getImageFileSize=function(path){
var opts=new Feis.BitmapFactory.Options();
opts.inJustDecodeBounds=true;
Feis.BitmapFactory.decodeFile(path,opts);
return [opts.outWidth,opts.outHeight,opts];}

Feis.saveBmp=function(bmp,path){
bmp.compress(path.indexOf(".jpg")!=-1?Feis.Bitmap.CompressFormat.JPEG:Feis.Bitmap.CompressFormat.PNG,100,new java.io.FileOutputStream(new java.io.File(path)));}

Feis.loadBitmap=function(path,size){
var opts=new Feis.BitmapFactory.Options();
opts.inJustDecodeBounds=true;//仅读取信息，不读取到内存中
Feis.BitmapFactory.decodeFile(path,opts);
var w=opts.outWidth,h=opts.outHeight;
var wh=Feis.getScaleSize(w,h,size);//缩放
var sx=w/wh[0],sy=h/wh[1],scale=1;//计算采样率;
scale=(sx>sy?sx:sy)||1;//采样率依照最大方向
opts.inJustDecodeBounds=false;//读取到内存中
opts.inSampleSize=scale;//设置采样率
return Feis.BitmapFactory.decodeFile(path,opts);}

Feis.drawToBmp=function(draw,w,h){
if(w==null){w=draw.getIntrinsicWidth(); h=draw.getIntrinsicHeight();}
if(draw instanceof Feis.BitmapDrawable){
return w==null?draw.getBitmap():Feis.Bitmap.createScaledBitmap(draw.getBitmap(),w,h,false);}
var gb=Feis.Bitmap;
var config=(draw.getOpacity()!=android.graphics.PixelFormat.OPAQUE?gb.Config.ARGB_8888:gb.Config.RGB_565);
var bmp=gb.createBitmap(w,h,config);
draw.setBounds(0,0,w<1?256:w,h<1?256:h);
draw.draw(new Feis.Canvas(bmp)); 
return bmp;}

Feis.jb=function(arr,arr2,f,s,w,h){
if(!(arr instanceof Array)){arr=[arr,arr,arr];}
if(!(arr2 instanceof Array)){arr2=[arr2,arr2,arr2,arr2];}
if(arr2==null){arr2=[10,10,10,10];}
var jb=null,type=null;
if(f=="上下"||f==null){jb=
Feis.GradientDrawable.Orientation.TOP_BOTTOM;}
if(f=="左右"){jb=Feis.GradientDrawable.Orientation.LEFT_RIGHT;}
if(f=="右上"){jb=Feis.GradientDrawable.Orientation.BL_TR;}
if(f=="右下"){jb=Feis.GradientDrawable.Orientation.TL_BR;}
var dra=new Feis.GradientDrawable(jb,arr);
if(s==0||s==null){
type=Feis.GradientDrawable.LINEAR_GRADIENT;}
if(s==1){type=Feis.GradientDrawable.RADIAL_GRADIENT;}
if(s==2){type=Feis.GradientDrawable.SWEEP_GRADIENT;}
dra.setGradientType(type);
Feis.setCornerRadii(dra,arr2[0],arr2[1],arr2[2],arr2[3]);
if(w!=null&&h!=null)dra.setSize(w,h);
return dra;}
Feis.setCornerRadii=function(dra,左上,右上,左下,右下){
var arr=[左上,左上,右上,右上,
左下,左下,右下,右下];
dra.setCornerRadii(arr);}

Feis.toBlur=function(bmp,size,radius){
if(android.os.Build.VERSION.SDK<19){return bmp;}
radius=((radius==null||radius==0)?25:25*(radius*0.01));
var width=Math.round(bmp.getWidth()*(size*0.01)),
height=Math.round(bmp.getHeight()*(size*0.01));
var bitmap=Feis.Bitmap.createScaledBitmap(bmp,width,height,false);
var r=android.renderscript;
var rs=r.RenderScript.create(ctx);
var input=r.Allocation.createFromBitmap(rs,bitmap,r.Allocation.MipmapControl.MIPMAP_NONE,r.Allocation.USAGE_SCRIPT);
var output=r.Allocation.createTyped(rs,input.getType());
var overlayAlloc=r.Allocation.createFromBitmap(rs,bitmap); 
var script=r.ScriptIntrinsicBlur.create(rs,overlayAlloc.getElement());
script.setRadius(radius);script.setInput(input);
script.forEach(output);output.copyTo(bitmap);
return bitmap;}

Feis.copyBmp=function(bmp){return bmp.copy(bmp.getConfig(),true);}
Feis.bmpToDraw=function(bmp){return new Feis.BitmapDrawable(bmp);}

Feis.绘画=function(width,height){
var gr=android.graphics;
var bitmap=(height!=null?Feis.Bitmap.createBitmap(width,height,Feis.Bitmap.Config.ARGB_8888):
width.copy(Feis.Bitmap.Config.ARGB_8888,true));
width=bitmap.getWidth();height=bitmap.getHeight()
var pt=new Feis.Paint();
var cv=new Feis.Canvas();
var save=[];save.push(Feis.copyBmp(bitmap));
var index=1;
cv.setBitmap(bitmap);
this.白=Feis.ys(255,255,255,255);this.黑=Feis.ys(0,0,0,0);
this.灰=Feis.ys(255,130,130,130);this.红=Feis.ys(255,255,0,0);
this.绿=Feis.ys(255,0,255,0);this.蓝=Feis.ys(255,0,0,255);
this.黄=Feis.ys(255,255,255,0);this.Color=gr.Color;
this.新建=function(w,h,isout,is){
cv=new Feis.Canvas();
bitmap=null;if(is)pt.reset();
bitmap=(h!=null?Feis.Bitmap.createBitmap(w,h,Feis.Bitmap.Config.ARGB_8888):
w.copy(gr.Bitmap.Config.ARGB_8888,true));w=null;
width=bitmap.getWidth();height=bitmap.getHeight();
cv.setBitmap(bitmap);if(isout)return bitmap;}
this.画笔=function(color,type,h,size,is){
if(is)pt.reset();
pt.setStyle(type==0?Feis.Paint.Style.STROKE:type==1?Feis.Paint.Style.FILL:Feis.Paint.Style.FILL_AND_STROKE);
pt.setAntiAlias(true);pt.setFilterBitmap(true); 
pt.setColor(color);
if(h!=null)pt.setStrokeWidth(h);
if(size!=null)pt.setTextSize(size);};
this.实心画笔=function(color,is,h){
if(is)pt.reset();pt.setStyle(Feis.Paint.Style.FILL);
pt.setAntiAlias(true);pt.setFilterBitmap(true); 
pt.setColor(color);if(h!=null)pt.setStrokeWidth(h);};
this.空心画笔=function(color,is,h){
if(is)pt.reset();pt.setStyle(Feis.Paint.Style.STROKE);
pt.setAntiAlias(true);pt.setFilterBitmap(true);
pt.setColor(color);if(h!=null)pt.setStrokeWidth(h);};
this.橡皮擦=function(color,h){
pt.reset();if(color==null){pt.setAlpha(0);}else{pt.setColor(color);}
pt.setXfermode(new gr.PorterDuffXfermode(gr.PorterDuff.Mode.CLEAR))//Mode.DST_IN));
pt.setAntiAlias(true);pt.setDither(true);
pt.setStyle(Feis.Paint.Style.STROKE);
pt.setStrokeJoin(Feis.Paint.Join.ROUND);
if(h!=null)pt.setStrokeWidth(h);}
var cacheOut=function(bmp){
var canvas=new Feis.Canvas();
canvas.setBitmap(bmp);return canvas;}
this.连接形状=function(tp){
pt.setStrokeJoin(tp==0?Feis.Paint.Join.ROUND:tp==2?Feis.Paint.Join.MITER:Feis.Paint.Join.BEVEL);}
this.画笔阴影=function(角度,x,y,color){pt.setShadowLayer(角度,x,y,color);};
this.画笔渐变=function(l,t,r,b,arr){
pt.setShader(new gr.LinearGradient(l,t,r,b,arr,null,gr.Shader.TileMode.REPEAT)); };
this.字体倾斜=function(skew){pt.setTextSkewX(skew);}
this.字体缩放=function(scale){pt.setTextScaleX(scale);}
this.画笔字体=function(path,mode){
if(!(new Feis.File(path).exists()))return null;
if(mode==null||mode==0){pt.setTypeface(android.graphics.Typeface.createFromFile(path));
}else if(mode==1){pt.setTypeface(android.graphics.Typeface.createFromAsset(ctx.getAssets(),path));}}
this.画笔渐变=function(sx,sy,ex,ey,colors,pos,mode,rotate){
var tm=android.graphics.Shader.TileMode;
var m=(mode==1?tm.CLAMP:mode==2?tm.REPEAT:tm.MIRROR);
if(pos==null){pos=[];for(var i in colors){pos.push(i/colors.length);}}
var lg=new android.graphics.LinearGradient(sx,sy,ex,ey,colors,pos,m);
if(rotate!=null){var matrix=new Feis.Matrix();
lg.getLocalMatrix(matrix);matrix.setRotate(rotate,ex/2,ey/3);
lg.setLocalMatrix(matrix);}pt.setShader(lg);return lg; }
this.画笔过滤=function(m){
pt.setXfermode(m==null?null:Feis.滤镜(null,m));}
this.路径圆弧效果=function(r,isout){
 var effect=new android.graphics.CornerPathEffect(r);
 if(!isout){pt.setPathEffect(effect);}else{return effect;}}
this.路径虚线效果=function(间距数组,偏移,isout){
 var effect=new android.graphics.DashPathEffect(间距数组,偏移);
 if(!isout){pt.setPathEffect(effect);}else{return effect;}}
this.路径离散效果=function(长度,距离,isout){
 var effect=new android.graphics.DiscretePathEffect(长度,距离);
 if(!isout){pt.setPathEffect(effect);}else{return effect;}}
this.路径形状效果=function(形状路径,间距,偏移,转角样式,isout){
 var PathDash=android.graphics.PathDashPathEffect;
 var tp=(转角样式==0?PathDash.Style.ROTATE:转角样式==1?PathDash.Style.MORPH:PathDash.Style.TRANSLATE);
 var effect=new PathDash(形状路径,35,0,tp)
 if(!isout){pt.setPathEffect(effect);}else{return effect;}}
this.相交路径效果=function(效果1,效果2,isout){
 var effect=new android.graphics.ComposePathEffect(效果1,效果2);
 if(!isout){pt.setPathEffect(effect);}else{return effect;}}
this.重叠路径效果=function(效果1,效果2,isout){
 var effect=new android.graphics.SumPathEffect(效果1,效果2);
 if(!isout){pt.setPathEffect(effect);}else{return effect;}}
this.模糊效果=function(blur,m){
m=(m==0?gr.BlurMaskFilter.Blur.SOLID:(m==1?gr.BlurMaskFilter.Blur.INNER:
(m==2?gr.BlurMaskFilter.Blur.NORMAL:(m==3?gr.BlurMaskFilter.Blur.OUTER:
gr.BlurMaskFilter.Blur.SOLID))));
pt.setMaskFilter(new gr.BlurMaskFilter(blur,m));};
this.浮雕效果=function(x,y,z,亮度,反射,模糊){
pt.setMaskFilter(new gr.EmbossMaskFilter([x,y,z],亮度,反射,模糊));};
this.绘制圆角矩形=function(l,t,r,b,round1,round2,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawRoundRect(new gr.RectF(l,t,r,b),round1,round2,pt);
if(isout)return bimp;}
this.绘制颜色=function(颜色,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawColor(颜色);if(isout)return bimp;}
this.绘制矩形=function(l,t,r,b,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawRect(l,t,r,b,pt);if(isout)return bimp;}
this.绘制圆形=function(x,y,r,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawCircle(x,y,r,pt);if(isout)return bimp;}
this.绘制直线=function(l,t,r,b,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawLine(l,t,r,b,pt);if(isout)return bimp;}
this.绘制弧线=function(l,t,r,b,from,to,is,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawArc(new gr.RectF(l,t,r,b),from,to,((is==null||is==false)?false:true),pt);//is为空心时是否闭线
if(isout)return bimp;}
this.绘制椭圆=function(l,t,r,b,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawOval(new gr.RectF(l,t,r,b),pt);if(isout)return bimp;}
this.绘制小点=function(x,y,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawPoint(x,y,pt);if(isout)return bimp;}
this.绘制图片=function(bmp,x,y,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawBitmap(bmp,x,y,pt);if(isout)return bimp;}
this.绘制路径=function(arr,is,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
var path=new gr.Path();
path.moveTo(arr[0],arr[1]);
for(var i=2;i<arr.length;i+=2){
path.lineTo(arr[i],arr[i+1]);}
if(is)path.close();画布.drawPath(path,pt);
if(isout)return bimp;}
this.onDraw=function(run){run(pt,cv);}
this.绘制贝塞尔曲线=function(arr,is,r,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
var path=new gr.Path();path.moveTo(arr[0],arr[1]);
for(var i=2;i<arr.length;i+=r?6:4){
if(r==null||r==false){path.quadTo(arr[i],arr[i+1],arr[i+2],arr[i+3]);}
if(r){path.rCubicTo(arr[i],arr[i+1],arr[i+2],arr[i+3],arr[i+4],arr[i+5]);}}
if(is)path.close();画布.drawPath(path,pt);
if(isout)return bimp;}
this.绘制图片=function(bmp,rect,rectf,isout){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);}else{画布=cv;}
画布.drawBitmap(bmp,rect,rectf,pt);if(isout)return bimp;}
this.文本大小=function(size){pt.setTextSize(size);}
this.绘制文本=function(文本,x,y,isout,isrect,fx){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);if(isrect!=null)画布.drawRect(x,y-size,x+size*文本.length(),y+size/5,pt);}else{画布=cv;}
if(fx!=null)pt.setTextAlign(fx==0?Feis.Paint.Align.RIGHT:fx==1?Feis.Paint.Align.LEFT:gr.Paint.Align.CENTER);
画布.drawText(文本,x,y,pt);
if(isout)return bimp;}
this.绘制多行文本=function(str,x,y,isout,isrect,fx){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);if(isrect!=null)画布.drawRect(x,y-size,x+size*文本.length(),y+size/5,pt);}else{画布=cv;}
if(fx!=null)pt.setTextAlign(fx==0?Feis.Paint.Align.RIGHT:fx==1?Feis.Paint.Align.LEFT:gr.Paint.Align.CENTER);
var lines=str.split("\n");
var txtSize=-pt.ascent()+pt.descent();
if(pt.getStyle()==Feis.Paint.Style.FILL_AND_STROKE||pt.getStyle()==Feis.Paint.Style.STROKE){
txtSize+=pt.getStrokeWidth();}
var lineSpace=txtSize*0.1; 
for(var i=0; i<lines.length;++i){
画布.drawText(lines[i], x,y+(txtSize+lineSpace)*i,pt);}
if(isout)return bimp;}
this.绘制曲线文本=function(str,size,arr,x,y,is,isout,fx){
var 画布,bimp;if(isout){bimp=Feis.copyBmp(bitmap);画布=cacheOut(bimp);if(isrect!=null)画布.drawRect(x,y-size,x+size*文本.length(),y+size/5,pt);}else{画布=cv;}
if(fx!=null)pt.setTextAlign(fx==0?gr.Paint.Align.RIGHT:fx==1?gr.Paint.Align.LEFT:Feis.Paint.Align.CENTER);
var path=new Feis.Path();path.moveTo(arr[0],arr[1]);
for(var i=2;i<arr.length;i+=4){path.quadTo(arr[i],arr[i+1],arr[i+2],arr[i+3]);}
if(is)path.close();pt.setTextSize(size);
画布.drawTextOnPath(str,path,x,y,pt);
if(isout)return bimp;}
this.镜像=function(x,y,isout){
var b=Feis.绘图.镜像(bitmap,x,y);
if(isout){return b;}else{this.新建(b);} }
this.旋转=function(r,isout){
var b=Feis.绘图.旋转(bitmap,r);
if(isout){return b;}else{this.新建(b);}}
this.倾斜=function(x,y,isout){var b=Feis.绘图.倾斜(bitmap,x,y);
 if(isout){return b;}else{this.新建(b);}}
this.缩放=function(w,h,isout){
var b=Feis.Bitmap.createScaledBitmap(bitmap,w,h,false)
if(isout){return b;}else{this.新建(b);}}
this.解析=function(b){
if(b==null)b=bitmap;
var arr=JavaArray.newInt(width*height);
try{
b.getPixels(arr,0,b.getWidth(),0,0,b.getWidth(),b.getHeight());
}catch(e){Feis.tz("",String(e));}
return arr;}
this.平移=function(x,y){cv.translate(x,y)};
this.保存=function(){if(index<save.length-1)save.splice(index+1);
save.push(Feis.copyBmp(bitmap));if(save.length>20)save.shift();index=save.length;}
this.撤销=function(){if(index==save.length)index-=1;if(index>0)index-=1;this.新建(save[index]);}
this.重做=function(){if(index<save.length-1){index+=1;this.新建(save[index]);}}
this.撤销索引=function(){return index;}
this.撤销长度=function(){return save.length;}
this.另存=function(path){
bitmap.compress(String(path).indexOf(".jpg")!=-1?Feis.Bitmap.CompressFormat.JPEG:Feis.Bitmap.CompressFormat.PNG,100,new java.io.FileOutputStream(path));}
this.清屏=function(){
 var pt=new Feis.Paint();
 pt.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.CLEAR));
cv.drawPaint(pt); }
this.getWidth=function(){return width;}
this.getHeight=function(){return height;}
this.getBitmap=function(is){return is?Feis.copyBmp(bitmap):bitmap;}
this.onDraw=function(run){run(cv);}
this.getPaint=function(){return pt;}
this.setPaint=function(paint){pt=paint;}
this.getCanvas=function(){return cv;}
this.setCanvas=function(canvas){cv=canvas;}
this.getDrawable=function(){return new Feis.BitmapDrawable(bitmap);} }

Feis.绘图=function(bitmap,w,h){
var matrix=new Feis.Matrix(); 
if(bitmap==null&&w!=null&&h!=null){bitmap=Feis.Bitmap.createBitmap(w,h,Feis.Bitmap.Config.ARGB_8888);}
var bmp=bitmap.copy(Feis.Bitmap.Config.ARGB_8888,true);
var W=bitmap.getWidth(),H=bitmap.getHeight();
this.reset=function(){bmp=bitmap.copy(Feis.Bitmap.Config.ARGB_8888,true);}
this.旋转=function(rotate,is,isout){
if(is)matrix.reset();matrix.setRotate(rotate,W/2,H/2);
if(isout){return Feis.Bitmap.createBitmap(bmp,0,0,W,H,matrix,true);
}else{bmp=Feis.Bitmap.createBitmap(bmp,0,0,W,H,matrix,true);}}
this.缩放=function(w,h,isout){
if(isout){return Feis.Bitmap.createScaledBitmap(bmp,w,h,false);
}else{bmp=Feis.Bitmap.createScaledBitmap(bmp,w,h,false);}}
this.镜像=function(x,y,is,isout){
if(is)matrix.reset();
matrix.postScale(x>=0?1:-1,y>=0?1:-1);
if(isout){return Feis.Bitmap.createBitmap(bmp,0,0,W,H,matrix,true);
}else{bmp=Feis.Bitmap.createBitmap(bmp,0,0,W,H,matrix,true);}}
this.裁剪=function(x,y,w,h,isout){
if(isout){return Feis.Bitmap.createBitmap(bmp,x,y,w,h,null,true);
}else{bmp=Feis.Bitmap.createBitmap(bmp,x,y,w,h,null,true);}}
this.解析=function(b){
if(b==null)b=bmp;
var arr=JavaArray.newInt(W*H);
b.getPixels(arr,0,W,0,0,W,H);return arr;}
this.getBitmap=function(is){is?Feis.copyBmp(bmp):bmp;}
this.getDrawable=function(){return new Feis.BitmapDrawable(bmp);} }

Feis.绘画.画布=function(bmp){return new Feis.Canvas(bmp);}
Feis.绘画.文本高度=function(pt){
var txtSize=-pt.ascent()+pt.descent();
if(pt.getStyle()==Feis.Paint.Style.FILL_AND_STROKE||pt.getStyle()==Feis.Paint.Style.STROKE){txtSize+=pt.getStrokeWidth();}
var lineSpace=txtSize*0.1,out=0; 
for(var i=0; i<lines.length;++i){out=(txtSize+lineSpace)*i}
return out;
}
Feis.绘画.清屏=function(canvas){
 var pt=new Feis.Paint();
 pt.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.CLEAR));
 canvas.drawPaint(pt); }
Feis.绘画.画笔=function(color,tp,h,size,pd){
 var pt=new Feis.Paint();
 pt.setStyle((tp==0||tp==null)?Feis.Paint.Style.STROKE:tp==1?Feis.Paint.Style.FILL:Feis.Paint.Style.FILL_AND_STROKE);
 pt.setAntiAlias(true);pt.setFilterBitmap(true); pt.setColor(color);
 if(pd){pt.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.CLEAR));pt.setDither(true);
 pt.setStrokeJoin(Feis.Paint.Join.ROUND);}
 if(h!=null)pt.setStrokeWidth(h);
if(size!=null)pt.setTextSize(size);return pt;}
Feis.绘画.获取文本矩形=function(paint,str){
 var bounds=new Feis.Rect();
 paint.getTextBounds(str,0,str.length,bounds);
return bounds;}
Feis.绘画.文本宽度=function(paint,str){return paint.measureText(str);}
Feis.绘画.文本间距=function(paint){
 var m=paint.getFontMetrics();//getFontMetricsInt()
 this.顶部=m.top;this.底部=m.bottom;
 this.字上=m.ascent;this.字下=m.descent;
 this.行距=m.leading;}
Feis.绘画.字符解析=function(p,str){
var arr=str.split("\n");
var max=0;
this.length=arr.length;
var txtSize=(-p.ascent()+p.descent());
if(p.getStyle()!=Feis.Paint.Style.FILL){
txtSize+=p.getStrokeWidth();}
this.lineSpace=txtSize*0.1; 
this.space=this.lineSpace*0.5;
this.lineHeight=txtSize;
for(var i in arr){
if(max<Feis.绘画.文本宽度(p,arr[i]))max=Feis.绘画.文本宽度(p,arr[i]);}
this.width=(max+this.lineSpace)+this.space;
this.height=(txtSize+this.lineSpace)*arr.length+this.lineSpace;}
Feis.绘图.缩放=function(bmp,w,h){
return Feis.Bitmap.createScaledBitmap(bmp,w,h,false);}
Feis.绘图.裁剪=function(bmp,x,y,w,h,is){
return Feis.Bitmap.createBitmap(bmp,x,y,(is!=null?(w-x):w),(is!=null?(h-y):h),new Feis.Matrix(),true);}
Feis.绘图.旋转=function(bmp,rotate){
 var matrix=new Feis.Matrix(); 
 var w=bmp.getWidth(),h=bmp.getHeight();
 matrix.setRotate(rotate);
return Feis.Bitmap.createBitmap(bmp,0,0,w,h,matrix,true);}
Feis.绘图.倾斜=function(bmp,x,y){
 var matrix=new Feis.Matrix(); 
 matrix.postSkew(x,y);
return Feis.Bitmap.createBitmap(bmp,0,0,bmp.getWidth(),bmp.getHeight(),matrix,true);}
Feis.绘图.镜像=function(bmp,x,y){
 var matrix=new Feis.Matrix();
matrix.postScale(x>=0?1:-1,y>=0?1:-1);
return Feis.Bitmap.createBitmap(bmp,0,0,bmp.getWidth(),bmp.getHeight(),matrix,true);}

Feis.getWallpaper=function(isBmp){
var A=android.app.WallpaperManager.getInstance(ctx);
return ((!isBmp)?A.getDrawable():Feis.drawToBmp(A.getDrawable()));}

Feis.ts=function(i,s){
Feis.UiT(function(){(new android.widget.Toast.makeText(ctx,String(i),(s==null?0:s))).show();});}

Feis.tz=function(A,B){
Feis.UiT(function(){
var toast= new android.app.AlertDialog.Builder(ctx);
toast.setTitle(String(A));
toast.setMessage(String(B));
toast.show();});; }

Feis.ys=function(A,B,C,D,E){
var color=Feis.Color.argb(A,B,C,D);
return (E!=undefined?new android.graphics.drawable.ColorDrawable(color):color);}

Feis.zzz=function(B){
return ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate((B==null?18:B))}

Feis.setViewFont=function(view,path){
view.setTypeface(android.graphics.Typeface.createFromFile(path));}

Feis.jz=function(x,y,W,H,is,fill){
if(W==undefined&&H==undefined){W=x;H=y;x=0;y=0;}
else if(W!=undefined&&H==undefined){is=W;W=A;H=B;A=0;B=0;}
var h=0,w=Feis.dp(0,W),Y=0;
if(is){h=Feis.dp(1,H);
Y=fill!=null?Math.round((Feis.dp(1,fill)-h)*(y*0.001)):Feis.dp(3,y);
}else{h=Feis.dp(3,H);Y=Feis.dp(3,y);}
var L=Feis.LinearLayout.LayoutParams;
var wrap=L.WRAP_CONTENT,fill=L.FILL_PARENT,match=L.MATCH_PARENT;
switch(W){case -3:w=wrap;break;case -1:w=fill;break;case -2:w=match;break;}
switch(H){case -3:h=wrap;break;case -1:h=fill;break;case -2:h=match;break;}
var CS=new Feis.LinearLayout.LayoutParams(w,h);
CS.setMargins(Feis.dp(0,x),Y,0,0);return CS;}

Feis.jzr=function(A,B,W,H,is){
if(W==undefined&&H==undefined){W=A;H=B;A=0;B=0;}
else if(W!=undefined&&H==undefined){is=W;W=A;H=B;A=0;B=0;}
var h=0,w=Feis.dp(0,W);
if(is){h=Feis.dp(1,H);}else{h=Feis.dp(3,H);}
var R=Feis.RelativeLayout.LayoutParams;
var wrap=R.WRAP_CONTENT,fill=R.FILL_PARENT,match=R.MATCH_PARENT;
switch(W){case -3:w=wrap;break;case -1:w=fill;break;case -2:w=match;break;}
switch(H){case -3:h=wrap;break;case -1:h=fill;break;case -2:h=match;break;}
var CS=new Feis.RelativeLayout.LayoutParams(w,h);
CS.setMargins(Feis.dp(0,A),Feis.dp(3,B),0,0);return CS; }

Feis.dip=function(pixels){
return android.util.TypedValue.applyDimension(
android.util.TypedValue.COMPLEX_UNIT_DIP,1,ctx.getResources().getDisplayMetrics())*pixels;}

Feis.getGravity=function(B){
var G=Feis.Gravity;
var t=G.TOP,b=G.BOTTOM,l=G.LEFT,r=G.RIGHT,c=G.CENTER,x=c;
switch(B){case "上": x=t;break;case "下": x=b;break;
case "左": x=l;break;case "右": x=r;break;
case "上左":x=t|l;break;case "上右":x=t|r;break;
case "下左":x=b|l;break;case "下右":x=b|r;break;
case "上中":x=t|c;break;case "下中":x=b|c;break;
case "左中":x=l|c;break;case "右中":x=r|c;break;
case "居中":x=c;break;} return x;}

Feis.fontColor=function(text){
var colors=[[" "," &nbsp;"],["\n","<br/>"],["§l","</b><b>"],
["§m","</del><del>"],["§n","</ins><ins>"],["§o","</i><i>"],
["§r","</font></b></del></ins></i>"],["§0","</font><font color=#000000>"],
["§1","</font><font color=#0000AA>"],["§2","</font><font color=#00AA00>"],
["§3","</font><font color=#00AAAA>"],["§4","</font><font color=#AA0000>"],
["§5","</font><font color=#AA00AA>"],["§6","</font><font color=#FFAA00>"],
["§7","</font><font color=#cccccc>"],["§8","</font><font color=#555555>"],
["§9","</font><font color=#5555FF>"],["§a","</font><font color=#55FF55>"],
["§b","</font><font color=#55FFFF>"],["§c","</font><font color=#FF5555>"],
["§d","</font><font color=#FF55FF>"],["§e","</font><font color=#FFFF55>"],
["§f","</font><font color=#FFFFFF>"]];
for(var e in colors){
text=text.split(colors[e][0]).join(colors[e][1]);};
return android.text.Html.fromHtml(text);}

Feis.移动动画=function(view,x1,x2,y1,y2,time,type){
var anim=android.view.animation;
var tp=((type==null||type==0)?anim.Animation.RELATIVE_TO_SELF:type==1?anim.Animation.RELATIVE_TO_PARENT:anim.Animation.ABSOLUTE);
var dh=new anim.TranslateAnimation(tp,x1*0.01,tp,x2*0.01,tp,y1*0.01,tp,y2*0.01);
dh.setDuration(time);if(view!=null)view.startAnimation(dh);return dh;}

Feis.旋转动画=function(view,A,B,x,y,time,type){
var anim=android.view.animation;
var tp=((type==null||type==0)?anim.Animation.RELATIVE_TO_SELF:type==1?anim.Animation.RELATIVE_TO_PARENT:anim.Animation.ABSOLUTE);
var dh=new anim.RotateAnimation(A,B,tp,x*0.01,tp,y*0.01);
dh.setDuration(time);dh.setFillAfter(true);
if(view!=null)view.startAnimation(dh);return dh;}

Feis.淡入动画=function(view,A,B,time){
var dh=new android.view.animation.AlphaAnimation(A*0.01,B*0.01);
dh.setDuration(time);if(view!=null)view.startAnimation(dh);return dh;}

Feis.收缩动画=function(view,x1,x2,y1,y2,x,y,time,type){
var anim=android.view.animation;
var tp=((type==null||type==0)?anim.Animation.RELATIVE_TO_SELF:type==1?anim.Animation.RELATIVE_TO_PARENT:anim.Animation.ABSOLUTE);
var dh=new anim.ScaleAnimation(x1*0.01,x2*0.01,y1*0.01,y2*0.01,tp,x*0.01,tp,y*0.01);
dh.setDuration(time);if(view!=null)view.startAnimation(dh);return dh;}

Feis.缩放动画=function(view,In,out,time,type){
return Feis.收缩动画(view,In,out,In,out,50,50,time,type);}

Feis.水平动画=function(view,In,out,time,type){
return Feis.移动动画(view,In,out,0,0,time,type);}

Feis.垂直动画=function(view,In,out,time,type){
return Feis.移动动画(view,0,0,In,out,time,type);}

Feis.动画监听=function(动画,run,sum){
if(sum==undefined){sum=0;}
动画.setAnimationListener(new android.view.animation.Animation.AnimationListener({
onAnimationEnd:function(v){run(sum+=1,run);return true;}}));}

Feis.设置动画=function(view,anim){view.startAnimation(anim);}

Feis.创建动画=function(view){
var anim=android.view.animation;
var type_0=anim.Animation.RELATIVE_To_SELF,type_1=anim.Animation.RELATIVE_To_PARENT;
var array=[];var set=new anim.AnimationSet(true);
var TRANSLATE=function(x1,x2,y1,y2,time,type){
 type=((type==null||type==0)?type_0:type_1);
 var dh=new anim.TranslateAnimation(type,x1*0.01,type,x2*0.01,type,y1*0.01,type,y2*0.01);
 dh.setDuration(time);array.push(dh);set.addAnimation(dh);}
var SCALE=function(x1,x2,y1,y2,x,y,time,type){
 type=((type==null||type==0)?type_0:type_1);
 var dh=new anim.ScaleAnimation(x1*0.01,x2*0.01,y1*0.01,y2*0.01,type,x*0.01,type,y*0.01);
 dh.setDuration(time);array.push(dh);set.addAnimation(dh);}
this.缩放=function(In,out,x,y,time,type){
 var len=arguments.length;var is=(len==4||len==3);
return SCALE(In,out,In,out,is?50:arguments[2],is?50:arguments[3],
 is?arguments[2]:arguments[4],is?arguments[3]:arguments[5]);}
this.水平=function(In,out,time,type){
 return TRANSLATE(In,out,0,0,time,type);}
this.垂直=function(In,out,time,type){
 return TRANSLATE(0,0,In,out,time,type);}
this.淡入=function(In,out,time){
 var dh=new anim.AlphaAnimation(In*0.01,out*0.01);
 dh.setDuration(time);array.push(dh);set.addAnimation(dh);}
this.旋转=function(A,B,x,y,time,type){
 type=((type==null||type==0)?type_0:type_1);
 var dh=new anim.RotateAnimation(A,B,type,x*0.01,type,y*0.01);
 dh.setDuration(time);dh.setFillAfter(true);array.push(dh);
 set.addAnimation(dh);}
this.监听器=function(a,run,sum){
 sum=(sum==null?0:sum);
 a.setAnimationListener(new anim.Animation.AnimationListener({
 onAnimationEnd:function(a){run(sum+=1,run);return true;}}));}
var play=function(a){view.startAnimation(a);return a;}
this.顺序播放=function(run_){
 this.监听器(play(array[0]),function(id,run){
 if(id<array.length){this.监听器(play(array[id]),run,id);}
 if(run_!=null){run_(id,view);} });}
this.同步播放=function(run_){
 this.监听器(play(set),function(id){if(run_!=null)run_(id,view);});}
}

Feis.dp=function(A,B){
var G=0,E=0,F=0,out=0;
if(Feis.屏宽<1||Feis.屏高<1){
var dView=ctx.getWindow().getDecorView();
Feis.屏宽=dView.getWidth();Feis.屏高=dView.getHeight();}
E=Feis.屏宽*(B*0.001); F=Feis.屏高*(B*0.001); G=E-F;
switch(A){case 0:out=(G>=0?E:F);break; 
case 1:out=(G>=0?F+G:E-G);break;
case 2:out=(G>=0?E:F);break; 
case 3:out=(G>=0?F:E);break;}
return Math.round(out);}

Feis.wh=function(win,B,C){
var wh=Feis.dp();
return Math.round(B==0?(wh[0]-win.getWidth())*(C*0.001):
(wh[1]-win.getHeight())*(C*0.001));}

Feis.makeMenu=function(win,la,type){
var JD=null,SP=null;
var ML=new Feis.RelativeLayout(ctx);
if(type==0){JD=new android.widget.ScrollView(ctx);
JD.setLayoutParams(Feis.jz(0,0,-1,-1));
JD.addView(la);ML.addView(JD);}
if(type==1){JD=new android.widget.HorizontalScrollView(ctx);
JD.setLayoutParams(Feis.jz(0,0,-1,-1));
JD.addView(la);ML.addView(JD);}
if(type==2){JD=new android.widget.ScrollView(ctx);
SP=new android.widget.HorizontalScrollView(ctx);
JD.setLayoutParams(Feis.jz(0,0,-1,-1));
SP.setLayoutParams(Feis.jz(0,0,-1,-1));
SP.addView(la);JD.addView(SP);ML.addView(JD);}
win.setContentView(ML);return [ML,JD,SP];}

Feis.addScroll=function(la,type,jg){
var JD=null,SP=null;
var layout=Feis.addLayout();
if(type==0||type==null){JD=new android.widget.ScrollView(ctx);
JD.setFillViewport(true);if(jg!=null)JD.setLayoutParams(jg);
JD.addView(layout);}
if(type==1){JD=new android.widget.HorizontalScrollView(ctx);
JD.setFillViewport(true);if(jg!=null)JD.setLayoutParams(jg);
JD.addView(layout);}
if(type==2){JD=new android.widget.ScrollView(ctx);
SP=new android.widget.HorizontalScrollView(ctx);
JD.setFillViewport(true);SP.setFillViewport(true);
if(jg!=null)JD.setLayoutParams(jg);
SP.addView(layout);JD.addView(SP);}
la.addView(JD);return [layout,JD,SP];}

Feis.窗口移动=function(view,win,is,run,m){
var long=(!is?true:false);
var X=Feis.屏宽;Y=Feis.屏高;
switch(m){case 0:X=Y=0;break;case 1:Y=0;break;case 3:;break;case 2:X=0;break;default:Y=0;}
if(is)Feis.长按监听(view,function(v){long=true;return true;});
Feis.触摸监听(view,function(e,a){ if(long){
var w=view.getMeasuredWidth()/2,h=view.getMeasuredHeight()/2;
var x=(X>1?X-(e.getRawX()+w):e.getRawX()-w);
var y=(Y>1?Y-(e.getRawY()+h):e.getRawY()-h);
if(run!=null)run(x,y,e);win.update(x,y,-1,-1);}
if(a==android.view.MotionEvent.ACTION_UP&&is){long=false;}
return true;});}

Feis.窗口拖动=function(win,view){
var X=Feis.屏宽,Y=Feis.屏高;var 开关=false;
this.对齐模式=function(m){
switch(m){case 0:X=Y=0;break;
case 1:Y=0;break;case 3:;break;
case 2:X=0;break;default:Y=0;} }
this.对齐模式(null);
this.设置开关=function(off){开关=off;}
this.触摸拖动=function(run){
Feis.触摸监听(view,function(e,a){ 
var w=view.getMeasuredWidth()/2,h=view.getMeasuredHeight()/2;
var x=(X>1?X-(e.getRawX()+w):e.getRawX()-w);
var y=(Y>1?Y-(e.getRawY()+h):e.getRawY()-h);
if(run!=null)run(x,y,e);win.update(x,y,-1,-1);
return true;}); }
this.长按拖动=function(run){var long=false;
Feis.长按监听(view,function(v){long=true;return true;});
Feis.触摸监听(view,function(e,a){
if(long){var w=view.getMeasuredWidth()/2,h=view.getMeasuredHeight()/2;
var x=(X>1?X-(e.getRawX()+w):e.getRawX()-w);
var y=(Y>1?Y-(e.getRawY()+h):e.getRawY()-h);
if(run!=null)run(x,y,e);win.update(x,y,-1,-1);}
if(a==android.view.MotionEvent.ACTION_UP){long=false;}
return true;}); }
this.开关拖动=function(run,run2){
Feis.触摸监听(view,function(e,a){ 
if(开关){var w=view.getMeasuredWidth()/2,h=view.getMeasuredHeight()/2;
var x=(X>1?X-(e.getRawX()+w):e.getRawX()-w);
var y=(Y>1?Y-(e.getRawY()+h):e.getRawY()-h);
if(run!=null)run(x,y,e);win.update(x,y,-1,-1);}
if(a==android.view.MotionEvent.ACTION_UP&&开关){if(run2!=null)run2();开关=false;return false;}
return true;}); }
this.点击监听=function(run){Feis.点击监听(view,function(v){if(!开关)run(v);});}
this.长按监听=function(run){Feis.长按监听(view,function(v){if(!开关){return run(v);}else{return false;}});} }

Feis.setShowHide=function(view,m){
if(m==-1){return view.getVisibility();}
view.post(function(){view.setVisibility((m==0?Feis.View.GONE:
(m==1?Feis.View.VISIBLE:Feis.View.INVISIBLE))); });}

Feis.addWindow2=function(dra,x,y,w,h,focus,touch,view){
var la=Feis.addLayout();
var win=new Feis.PopupWindow(la); 
win.setFocusable(focus==null?false:focus);
win.setTouchable(touch==null?true:touch);
var mla=Feis.makeMenu(win,la,0);
win.setBackgroundDrawable(dra);
win.setWidth(w);win.setHeight(h);
if(view==null){win.showAtLocation(ctx.getWindow().getDecorView(),
Feis.Gravity.RIGHT|Feis.Gravity.TOP,x,y);
}else if(view!=null){win.showAsDropDown(view.getParent(),x,y);}
return [win,la,mla[0],mla[1],mla[2]];}

Feis.窗口按键监听=function(pop,run){
pop.setOnKeyListener(function(){run();});}

Feis.updataLayout=function(v,w,h){
var p=v.getLayoutParams();
p.height=h;
p.width=w;
v.requestLayout();}

Feis.窗口坐标=function(x,y,w,h,等比){
var X轴=Y轴=W=H=0;
var 宽度=Feis.屏宽, 高度=Feis.屏高, 高宽差值=宽度-高度;
if(高宽差值>=0){W=宽度*(w*0.001);H=高度*(h*0.001);
if(等比){H+=(宽度*(h*0.001)-H);}
X轴=(宽度-W)*(x*0.001);Y轴=(高度-H)*(y*0.001);}
if(高宽差值<0){W=宽度*(h*0.001);H=高度*(w*0.001);
if(等比){W=H;H=(宽度*(h*0.001))+(高度*(h*0.001)-W);}
X轴=(高度-W)*(y*0.001);Y轴=(宽度-H)*(x*0.001);
X轴=高度-(高度-Y轴);Y轴=(高度-W)*(y*0.001);}
return [W,H,X轴,Y轴];}

Feis.addLayout=function(layout,C,jz){
var la=new Feis.LinearLayout(ctx);
la.setOrientation(C==null?1:C);
if(jz!=null){la.setLayoutParams(jz);}
if(layout!=null){layout.addView(la);}
return la;}

Feis.addRayout=function(layout){
var la=new Feis.RelativeLayout(ctx);
if(layout!=null){layout.addView(la);}
return la;}

Feis.addFayout=function(la){
var layout=new Feis.FrameLayout(ctx);
if(la!=null){la.addView(layout);}
return layout;}

Feis.根路径=function(路径){
return String(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+路径);}

Feis.保存文本=function(path,data){try{
var file=new Feis.File(path);
if(!file.exists()){file.getParentFile().mkdirs();}
var wr=new java.io.FileWriter(file);
wr.write(data);wr.close();
}catch(e){Feis.tz("保存文本",file+""+e);}}

Feis.读取文本=function(path){
var file=new Feis.File(path);
if(file.isFile()){var out=[];var line="";
var ins=new java.io.InputStreamReader(
new java.io.FileInputStream(file),"UTF-8");
var buff=new java.io.BufferedReader(ins);
while((line=buff.readLine())!=null){out.push(line);}
ins.close();return out.join("\n");
}else{return null;}}

Feis.文件管理=function(path){
this.文件=function(path){return new Feis.File(path)}
this.当前=this.文件(path);
this.列表=[];
this.获取列表=function(){
 var list=this.当前.listFiles();
 var f=[],d=[];
 for(var i in list){
 if(!list[i].isHidden()){
 if(list[i].isDirectory())d.push(list[i]);
 else if(list[i].isFile())f.push(list[i]); } }
 d.sort();f.sort();this.列表=d.concat(f);return this.列表;}
this.新建目录=function(name){new Feis.File(当前,name).mkdirs();}
this.上级=function(){
 var file=(new Feis.File(this.当前).getParentFile());
 if(this.当前!="/"){this.当前=file;}else{Feis.ts("已经是根目录.");}}
this.获取大小=function(file){return android.text.format.Formatter.formatFileSize(ctx,file.length());}
this.获取日期=function(file){var formatter=new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
return formatter.format(file.lastModified());}
this.扩展名称=function(file){var name=file.getName();return name.substr(name.lastIndexOf("."));}}

Feis.jsonData=function(data){
if(typeof(data)=="string"){
return JSON.parse(data);
}else{
return JSON.stringify(data);
}
}

Feis.触摸监听=function(view,run){
 view.setClickable(true);
 view.setOnTouchListener(new Feis.View.OnTouchListener(){
 onTouch:function(v,e){return (!run(e,e.getAction())); }});}

Feis.点击监听=function(view,run){
 view.setOnClickListener(new Feis.View.OnClickListener({
 onClick:function(v){try{run(v);}catch(e){Feis.报错(e);};}}));}

Feis.长按监听=function(view,run){
 view.setOnLongClickListener(new Feis.View.OnLongClickListener({
 onLongClick:function(v,t){try{return run(v,t);}catch(e){Feis.报错(e);return true;};}}));}

Feis.进度监听=function(view,run){
 view.setOnSeekBarChangeListener(new Feis.SeekBar.OnSeekBarChangeListener({
 onProgressChanged:function(v,p,is){try{run(p,is);}catch(e){Feis.报错(e);};}}));}

Feis.输入监听=function(edit,run){
 edit.addTextChangedListener(new android.text.TextWatcher({
 beforeTextChanged:function(CharSequence,start,count,after){run(2,CharSequence,start,count,after);},
 onTextChanged:function(CharSequence,start,before,count){run(1,CharSequence,start,before,count);},
 afterTextChanged:function(Editable){run(0,edit.getText().toString()); }}));}

Feis.列表点击监听=function(list,run){
list.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener(){
onItemClick:function(av,v,id,p){try{run(av,v,id,p);}catch(e){Feis.报错(e);};}});}
Feis.列表滚动监听=function(list,run){
list.setOnScrollListener(new android.widget.AbsListView.OnScrollListener(){
onScroll:function(lv,int0,int1,int2){try{run(lv,int0,int1,int2);}catch(e){Feis.报错(e);};},
onScrollStateChanged:function(lv,int){try{run(lv,int);}catch(e){Feis.报错(e);};}});}

Feis.报错=function(er){
var e=er.name;A="";
if(e.equalsIgnoreCase("SyntaxError")){A="语法错误(检查变量或符号)";}
if(e.equalsIgnoreCase("ReferenceError")){A="赋值错误或变量、函数不存在";}
if(e.equalsIgnoreCase("RangeError")){A="某数值无效";}
if(e.equalsIgnoreCase("TypeError")){A="参数不是预期类型";}
if(e.equalsIgnoreCase("EvalError")){A="eval执行出错";}
Feis.tz(e,"类型:"+A+"\n原因:"+er.message+"\n位置:"+er.stack);}

Feis.滤镜=function(color,id){try{
var xg=null;var P=android.graphics.PorterDuff.Mode;
switch(id){case 0:xg=P.CLEAR;//所绘制不会提交到画布上。
;break;case 1:xg=P.SRC;//绘制源图像
;break;case 2:xg=P.DST;//绘制目标图片
;break;case 3:xg=P.SRC_OVER;//在源图像顶部绘制
;break;case 4:xg=P.DST_OVER;//在目标图像顶部绘制
;break;case 5:xg=P.SRC_IN;//两层相交的地方绘制源图像
;break;case 6:xg=P.DST_IN;//两层相交的地方绘制目标图像
;break;case 7:xg=P.SRC_OUT;//两层不相交的地方绘制源图像
;break;case 8:xg=P.DST_OUT;//两层不相交的地方绘制目标图像
;break;case 9:xg=P.SRC_ATOP;//取下层非交集部分与上层交集部分
;break;case 10:xg=P.DST_ATOP;//取上层非交集部分与下层交集部分
;break;case 11:xg=P.XOR;//变暗
;break;case 12:xg=P.DARKEN;//调亮
;break;case 13:xg=P.LIGHTEN;//用于颜色滤镜
;break;case 14:xg=P.SCREEN;
;break;default: xg=P.MULTIPLY;}
if(color!=null){return new android.graphics.PorterDuffColorFilter(color,xg);
}else{return new android.graphics.PorterDuffXfermode(xg);}
}catch(e){Feis.报错(e);}}

Feis.随机颜色=function(m,透明){
if(透明==undefined){透明=255;}
if(m==0){return Feis.Color.argb(透明,Feis.随机(0,255),Feis.随机(0,255),Feis.随机(0,255));}
if(m==1){return new android.graphics.drawable.ColorDrawable(
Feis.Color.argb(透明,Feis.随机(0,255),Feis.随机(0,255),Feis.随机(0,255)));} }

Feis.随机=function(min,max){
return Math.round(Math.random()*(max-min))+min;}

Feis.铃声=function(A,is){
var a=(A==0?android.media.RingtoneManager.TYPE_RINGTONE:A==1?android.media.RingtoneManager.TYPE_ALARM:A==2?android.media.RingtoneManager.TYPE_ALL:android.media.RingtoneManager.TYPE_NOTIFICATION);
var mp=new android.media.MediaPlayer();
mp.setDataSource(ctx,android.media.RingtoneManager.getDefaultUri(a));
if(is)mp.setLooping(true);
mp.prepare();mp.start();return mp;}

Feis.Print=function(str,t,bg){
var time=(t==null?4000:t);
var content=(str==null?"":str);
var start=Feis.垂直动画(null,-100,0,400);
var end=Feis.淡入动画(null,100,0,1000);
var 背景=bg==null?Feis.ys(200,59,59,59):bg;
this.弹出动画=function(anim){start=anim;}
this.隐藏动画=function(anim){end=anim;}
this.背景颜色=function(color){背景=color;}
this.时间=function(ms){time=ms;}
this.显示=function(str,x,y){
Feis.UiT(function(){
 var win=Feis.addWindow2(Feis.ys(0,0,0,0,-1),0,0,Feis.屏宽,Feis.屏高,false,false);
 var la=Feis.addLayout(win[1]);
 var tv=Feis.JSONTextView({文本:Feis.fontColor(str==null?content:str),宽度:Feis.dip(300),高度:-1,左边距:x==null?Feis.dip(0):x,上边距:y==null?Feis.dip(0):y,位置重心:Feis.getGravity("居中"),文本大小:16,
文本颜色:Feis.ys(255,255,255,255),背景绘图:Feis.jb(背景,[0,0,Feis.dip(10),Feis.dip(10)]),文本重心:Feis.getGravity("居中"),布局:la});
 Feis.设置动画(tv,start);
 Feis.动画监听(start,function(t,run){
if(t==1){Feis.动画监听(Feis.淡入动画(tv,100,100,time),run,t);}
if(t==2){Feis.设置动画(tv,end);Feis.动画监听(end,run,t);}
if(t==3){win[0].dismiss();}
 },0); }); } }

Feis.文字统计=function(str){
var line=str.split("\n");return [line.length,str.length];}

Feis.分享图片=function(标题,path){ 
var intent=new android.content.Intent();
intent.setAction("android.intent.action.SEND");
intent.setType("image/*"); /**/
intent.putExtra(android.content.Intent.EXTRA_TEXT,标题);
intent.putExtra(android.content.Intent.EXTRA_STREAM, android.net.Uri.fromFile(new Feis.File(file)));
ctx.startActivity(intent);
}

Feis.BaseAdapter=function(arr,run){
var data=arr.slice(0);var listener=run;
var mDataSetObservable=new android.database.DataSetObservable();
var ad=new android.widget.ListAdapter(){
 hasStableIds:function(){return false;},
 registerDataSetObserver:function(observer){
mDataSetObservable.registerObserver(observer);},
 unregisterDataSetObserver:function(observer){
mDataSetObservable.unregisterObserver(observer);},
 notifyDataSetChanged:function(){
mDataSetObservable.notifyChanged();},
 notifyDataSetInvalidated:function(){
mDataSetObservable.notifyInvalidated();},
 areAllItemsEnabled:function(){return true;},
 getDropDownView:function(pos,convertView,parent){
return this.getView(pos,convertView,parent);},
 getItemViewType:function(pos){return 0;},
 getViewTypeCount:function(){return 1;},
 getView:function(pos,cv,parent){
return listener(pos,cv,parent,data[pos]);},
 getCount:function(){return data.length;},
 getItem:function(pos){return data[pos];},
 getItemId:function(pos){return pos;},
 isEnabled:function(pos){return true;},
 isEmpty:function(){return this.getCount()==0;} };
this.update=function(array){
data=array.slice(0);
mDataSetObservable.notifyChanged();}
this.delete=function(index){
data.splice(index,1);
mDataSetObservable.notifyChanged();}
this.get=function(index){return data[index];}
this.getAdapter=function(){return ad;}
this.setContentView=function(run){listener=run;} 
}

Feis.viewShow=function(v,m){
v.setVisibility(m==1?Feis.View.VISIBLE:m==0?
Feis.View.GONE:Feis.View.INVISIBLE);}

Number.prototype.doString=function(){
return String((this<10&&this>=0)?"0"+this:this);}

Number.prototype.abs=function(){
return (this.valueOf()<0?-this.valueOf():this.valueOf());}

Number.prototype.int=function(){
return new java.lang.Long(this).intValue();}

String.prototype.isEmpty=function(def){
var is=(this==null||this=="");
if(def==null){return is;}else{return (is?def:this);} }

String.prototype.isNumber=function(def){
var is=(this*1==this&&this.indexOf(" ")==-1&&this!="");
if(def==null){return is;}else{return (is?def:this);} }

Feis.isEmpty=function(vel,def){
if(def==null){return (vel==null);}else{return (vel==null?def:vel);} }

Feis.copy=function(arr){
return arr.slice(0);}

function 相对方位(rx,ry,tx,ty){
var a=Math.atan((ty-ry)/(tx-rx))*180/Math.PI;
return a<0?a+360:a;
}
function 面向(){
return [-Math.sin(getYaw()/180*Math.PI),
-Math.tan(getPitch()/180*Math.PI),
Math.cos(getYaw()/180*Math.PI)];}

Feis.seekbarColor=function(sb,color){
sb.getProgressDrawable().setColorFilter(Feis.滤镜(color));}

Feis.JSONTextView=function(json,lp){
var tv=new Feis.TextView(ctx);
if(json.文本!=null)tv.setText(json.文本);
if(json.文本颜色!=null)tv.setTextColor(json.文本颜色);
if(json.背景颜色!=null)tv.setBackgroundColor(json.背景颜色);
if(json.背景绘图!=null)tv.setBackgroundDrawable(json.背景绘图);
if(json.文本重心!=null)tv.setGravity(json.文本重心);

if(json.文本大小!=null)tv.setTextSize(json.文本大小);
if(json.旋转!=null)tv.setRotation(json.旋转);
tv.setLayoutParams(Feis.JSONParams(json,lp));
if(json.单行!=null)tv.setSingleLine(json.单行);
if(json.阴影!=null)Feis.setElevation(tv,json.阴影,json.阴影);
if(json.监听!=null)Feis.点击监听(tv,function(v){json.监听(v);});
if(json.长按!=null)Feis.长按监听(tv,function(v){return json.长按(v);});
if(json.触摸!=null)Feis.触摸监听(img,function(e,a){return json.触摸(e,a);});
if(json.布局!=null)json.布局.addView(tv);
return tv;
}
Feis.JSONEditText=function(json){
var edit=new Feis.EditText(ctx);
if(json.提示!=null)edit.setHint(json.提示);
if(json.提示颜色!=null)edit.setHintColor(json.提示颜色);
if(json.输入数字)edit.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
edit.setFocusable(true);
edit.setFocusableInTouchMode(true);
if(json.文本!=null)edit.setText(json.文本);
if(json.文本颜色!=null)edit.setTextColor(json.文本颜色);
if(json.背景颜色!=null)edit.setBackgroundColor(json.背景颜色);
if(json.背景绘图!=null)edit.setBackgroundDrawable(json.背景绘图);
if(json.文本重心!=null)edit.setGravity(json.文本重心);
if(json.文本大小!=null)edit.setTextSize(json.文本大小);
if(json.旋转!=null)edit.setRotation(json.旋转);
edit.setLayoutParams(Feis.JSONParams(json));
if(json.单行!=null)edit.setSingleLine(json.单行);
if(json.阴影!=null)Feis.setElevation(edit,json.阴影,json.阴影);
if(json.布局!=null)json.布局.addView(edit);
return edit;
}
Feis.JSONSeekBar=function(json){
var sb=new Feis.SeekBar(ctx);
if(json.最大进度!=null)sb.setMax(json.最大进度);
if(json.进度!=null)sb.setProgress(json.进度);
if(json.进度颜色)sb.getProgressDrawable().setColorFilter(Feis.滤镜(json.进度颜色));
if(json.背景颜色!=null)sb.setBackgroundColor(json.背景颜色);
if(json.背景绘图!=null)sb.setBackgroundDrawable(json.背景绘图);
if(json.阴影!=null)Feis.setElevation(sb,json.阴影,json.阴影);
if(json.旋转!=null)sb.setRotation(json.旋转);
sb.setLayoutParams(Feis.JSONParams(json));
if(json.监听!=null)Feis.进度监听(sb,function(p,is){json.监听(p,is);});
if(json.布局!=null)json.布局.addView(sb);
return sb;
};
Feis.JSONParams=function(json,lp){
var LinearLayout=android.widget.LinearLayout;
if(lp==null)lp=new LinearLayout.LayoutParams(0,0);
var getWH=function(str){
if(str==-1)return LinearLayout.LayoutParams.WRAP_CONTENT;
else if(str==-2)return LinearLayout.LayoutParams.MATCH_PARENT;
else {return str;} }
lp.width=getWH(json.宽度);lp.height=getWH(json.高度);
if(json.位置重心!=null)lp.gravity=json.位置重心;
if(json.上边距!=null)lp.topMargin=json.上边距;
if(json.右边距!=null)lp.rightMargin=json.右边距;
if(json.左边距!=null)lp.leftMargin=json.左边距;
if(json.下边距!=null)lp.bottomMargin=json.下边距;
return lp;
}
Feis.JSONImageView=function(json){
var img=new android.widget.ImageView(ctx);
if(json.位图!=null)img.setImageBitmap(json.位图);
if(json.背景颜色!=null)img.setBackgroundColor(json.背景颜色);
if(json.背景绘图!=null)img.setBackgroundDrawable(json.背景绘图);
img.setLayoutParams(Feis.JSONParams(json));
if(json.旋转!=null)img.setRotation(json.旋转);
if(json.阴影!=null)Feis.setElevation(img,json.阴影,json.阴影);
if(json.监听!=null)Feis.点击监听(img,function(v){json.监听(v);});
if(json.触摸!=null)Feis.触摸监听(img,function(e,a){return json.触摸(e,a);});
if(json.长按!=null)Feis.长按监听(img,function(v){return json.长按(v);});
if(json.布局!=null)json.布局.addView(img);
return img;
}
Feis.JSONListView=function(json){
var list=new android.widget.ListView(ctx);
if(json.适配器!=null)list.setAdapter(json.适配器);
list.setLayoutParams(Feis.JSONParams(json));
if(json.背景颜色!=null)list.setBackgroundColor(json.背景颜色);
if(json.背景绘图!=null)list.setBackgroundDrawable(json.背景绘图);
if(json.间隙绘图!=null)list.setDivider(json.间隙绘图);
if(json.间隙高度!=null)list.setDividerHeight(json.间隙高度);
if(json.阴影!=null)Feis.setElevation(list,json.阴影,json.阴影);
if(json.布局)json.布局.addView(list);
return list;
}
Feis.getEditText=function(title,run,text,hint){
Feis.UiT(function(){
var noDismiss=function(DialogInterface,b){
try{var field=DialogInterface.getClass().getSuperclass().getDeclaredField("mShowing");
field.setAccessible(true);field.set(DialogInterface,b);
if(b)DialogInterface.dismiss();}catch(e){Feis.报错(e);} }
var toast=new android.app.AlertDialog.Builder(ctx);
toast.setTitle(String(title));
var edit=new Feis.EditText(ctx);
edit.setHint(hint==null?"此处输入内容…":hint);
if(text!=null)edit.setText(text);
edit.setFocusable(true);
edit.setFocusableInTouchMode(true);
edit.addTextChangedListener(new android.text.TextWatcher(){
beforeTextChanged:function(charSequence,start,count,after){},
onTextChanged:function(charSequence,start,before,count){},
afterTextChanged:function(editable){if(run!=null)run(edit.getText().toString(),true);}});
toast.setView(edit);
toast.setNeutralButton(lang("复制","Copy",配置.语言),new android.content.DialogInterface.OnClickListener(){
onClick:function(DialogInterface,i){
noDismiss(DialogInterface,false);Feis.ts("已复制到剪贴板.");
Feis.setCilp(edit.getText().toString());}});
toast.setNegativeButton(lang("取消","Cancel",配置.语言),new android.content.DialogInterface.OnClickListener(){
onClick:function(DialogInterface,i){
noDismiss(DialogInterface,true);}});
toast.setPositiveButton(lang("确认","Ok",配置.语言),new android.content.DialogInterface.OnClickListener(){
onClick:function(DialogInterface,i){
var t=edit.getText().toString()
if(run!=null&&!t.isEmpty())run(t);
noDismiss(DialogInterface,t.isEmpty()?false:true);}});
toast.setCancelable(false);
toast.show();}); }

Feis.工具={
判断圆内:function(x,y,px,py,pr){return (Math.sqrt((px-x)*(px-x)+(py-y)*(py-y))<=pr);},
矩形:function(){
var rect=[];this.左=0;this.上=0;this.右=0;this.下=0,this.宽=0;this.高=0,w=0,h=0;
this.设定=function(l,t,r,b){this.左=l;this.上=t;this.右=r;this.下=b; this.宽=(this.右-this.左);this.高=(this.下-this.上);}
this.设定矩形=function(rect){this.左=rect.l;this.上=rect.t;this.右=rect.r;this.下=rect.b; this.宽=(this.右-this.左);this.高=(this.下-this.上);}
this.断空=function(){return this.左>=this.右||this.上>=this.下;}
this.宽度=function(){return this.宽;}
this.高度=function(){return this.高;}
this.获取水平居中=function(){return (this.左+this.右)*0.5;}
this.获取垂直居中=function(){return (this.上+this.下)*0.5;}
this.重置=function(){this.左=this.上=this.右=this.下=0; this.宽=(this.右-this.左);this.高=(this.下-this.上);}
this.位移标记=function(x,y){rect=[];rect.push(x-this.左);rect.push(y-this.上);rect.push(this.右-x);rect.push(this.下-y);}
this.标记位移=function(x,y){this.左=x-rect[0];this.上=y-rect[1];this.右=x+rect[2];this.下=y+rect[3];}
this.居中位移=function(x,y){var w=this.宽,h=this.高;this.左=x-w/2;this.上=y-h/2;this.右=x+w/2;this.下=y+h/2;}
this.位移=function(l,t){this.右+=l-this.左;this.下+=t-this.上;this.左=l;this.上=t;}
this.在内=function(x,y){return (this.左<x&&this.右>x&&this.上<y&&this.下>y);}
this.在矩形内=function(l,t,r,b){return (this.左>=l&&this.上>=t&&this.右<=r&&this.下<=b);}
this.缩放=function(scale){if(scale!=1){this.左*=scale;this.上*=scale;this.右*=scale;this.下*=scale; this.宽=(this.右-this.左);this.高=(this.下-this.上);}}
this.禁止越界=function(l,t,r,b){
 if(this.左<l){this.左=l; this.右=this.左+this.宽;}
if(this.上<t){this.上=t;this.下=this.上+this.高;}
 if(this.右>r){this.右=r; this.左=this.右-this.宽;}
if(this.下>b){this.下=b;this.上=this.下-this.高;}}
this.临时缓存=function(){w=this.宽;h=this.高;}
this.临时缩放=function(x,y){var rw=w*0.5,rh=h*0.5;
this.左=(this.左+rw)-x*0.5;this.上=(this.上+rh)-y*0.5;this.右=this.左+x,this.下=this.上+y;
}
this.右下=function(w,h){
if(w>this.左&&h>this.上){this.右=w;this.下=h;this.宽=(this.右-this.左);this.高=(this.下-this.上);}}
this.左上=function(x,y){this.左=x;this.上=y;this.宽=(this.右-this.左);this.高=(this.下-this.上);}
this.导出矩形=function(){return new Feis.RectF(this.左,this.上,this.右,this.下);}
},
路径解析:function(list){
var PathDir=function(){
 this.Name;this.Path;this.ListPath=[];
 this.toString=function(){return this.Path;}
 this.getName=function(){return this.Name;}
 this.getPath=function(){return this.Path;}
 this.list=function(){return this.ListPath;}
 this.length=function(){return this.ListPath.length;} 
 this.review=function(){return this.ListPath[0];} }
this.listFiles=function(){
 var dir=[],pd=[];
 for(var i in list){
 if(this.isFile(list[i])){
 var path=this.getParent(list[i]);
 var index=dir.indexOf(path);
 if(index==-1){dir.push(path);
 var p=new PathDir();
 p.Name=this.getName(path);
 p.ListPath.push(list[i]);
 p.Path=path;pd.push(p);
 }else{pd[index].ListPath.push(list[i]);}
 }else{
 if(dir.indexOf(list[i])==-1){dir.push(list[i]);
 var p=new PathDir();
 p.Name=this.getName(list[i]);
 p.Path=list[i];pd.push(p);}}
 } dir=[]; return pd;}
this.getParent=function(path){
 var length=path.length;
 if(length==1)return path
 if(path.charAt(length-1)=="/"){
 path=path.substring(0,length-2);}
 return path.substring(0,path.lastIndexOf("/")+1);}
this.getName=function(path){
 var length=path.length;
 if(length==1)return path
 if(path.charAt(length-1)=="/"){
 path=path.substring(0,length-1);}
 return path.substring(path.lastIndexOf("/")+1);}
this.isFile=function(path){return (path.charAt(path.length-1)!="/");}
this.isDirectory=function(path){return !(this.isFile(path));}
this.isHidden=function(path){return (this.getName(path).charAt(0)==".");}
},
路径名称:function(path){
 var length=path.length;
 if(length==1)return path
 if(path.charAt(length-1)=="/"){
 path=path.substring(0,length-1);}
 return path.substring(path.lastIndexOf("/")+1);},
画圆角度:function(i){
return [-Math.sin(i/180*Math.PI),Math.cos(i/180*Math.PI)];},
getTextWidth:function(paint,str){
var width=0;
if(str!=null&&str.length>0){
var widths=JavaArray.newFloat(str.length);
paint.getTextWidths(content,widths);
for(var i in str){width+=Math.ceil(widths[i]);} }
return width;},
索引二转一:function(y,x,w){return x*w+y;},
索引一转二:function(i,w,h){
var x=Math.floor((i/h)%w), y=i%h;
return [x,y];},
近值匹配:function(arr, num){
var leng=arr.length,r=leng*0.5,index=-1;
if(leng%2==1) r=Math.ceil(leng*0.5);
var ret=arr[0];
if(leng==1)return [ret,0];
var dis=Math.abs(ret-num);
for(var i=1;i<=r;i++){
var d=Math.abs(arr[i]-num);
if(d<=dis){dis=d;ret=arr[i];index=i;}
if((r+i)<leng){
var d2=Math.abs(arr[i+r]-num);
if(d2<=dis){dis=d2;index=i+r;ret=arr[index];} } } 
return [ret,index];},
}
Feis.getImageViewXY=function(bw,bh,vw,vh,x,y){
 if(bw>=bh){var b=vh/(vw/bw)-bh;
 return [(bw/vw)*x, bh/(vh-b*0.5)*y];
 }else if(bh>bw){var b=vw/(vh/bh)-bw;
 return [bw/(vw-b*0.5)*x,(bh/vh)*y];}
}
Feis.NewLock=function(){
var lock=new java.util.concurrent.locks.ReentrantLock();
this.synchronized=function(run){lock.lock();
try{return run(lock);}finally{lock.unlock();}} 
} 

Feis.FastView=function(la){
var tv=new android.view.TextureView(ctx);
var isrun=false;
var lock=new Feis.NewLock();
var thread;var TICK=30,w=0,h=0;
this.setTick=function(v){TICK=1000/v;}
this.setLayoutParams=function(p){tv.setLayoutParams(p);w=p.width;h=p.height;}
this.show=function(layout){if(layout!=null)la=layout;la.addView(tv);}
this.draw=function(run){var canvas=tv.lockCanvas();run(canvas,tv);tv.unlockCanvasAndPost(canvas);}
var onDraw=function(run){
 tv.setSurfaceTextureListener(new android.view.TextureView.SurfaceTextureListener(){
 onSurfaceTextureAvailable:function(surface,width,height){
 try{isrun=true;
var 帧=30,计=0;差=0,始=new Date();
thread=new java.lang.Thread(function(){
while(isrun){var start=new Date();
lock.synchronized(function(){var canvas=tv.lockCanvas();run(canvas,w,h,帧);tv.unlockCanvasAndPost(canvas);
差=new Date()-始;
if(差<=1000){计+=1;}else{帧=计;计=1;始=new Date();} });
var update=(new Date()-start);
while(update<=TICK&&isrun){update=(new Date()-start);thread.yield();}
}});thread.start();
 }catch(e){Feis.报错(e);} },
 onSurfaceTextureSizeChanged:function(surface,width,height){},
 onSurfaceTextureDestroyed:function(surface){isrun=false; },
 onSurfaceTextureUpdated:function(surface){} });}
this.stopDraw=function(){isrun=false;var sp=true;
 while(sp){try{thread.join();}catch(e){ }sp=false;}}
this.startDraw=function(run){if(run!=null){onDraw(run);}}
this.getView=function(){return tv;}
this.dismiss=function(){this.stopDraw();
tv.setSurfaceTextureListener(null);
Feis.UiT(function(){la.removeView(tv);});}
}

Feis.setElevation=function(view,e,t){
if(android.os.Build.VERSION.SDK>20){
view.setElevation(e);
view.setTranslationZ(t);} }

function lang(zh,en,mode){
if(mode==0){
var locale=ctx.getResources().getConfiguration().locale;
var language=locale.getLanguage();
if(language.endsWith("zh")){return zh;}else{return en;}
}else if(mode==1){return zh;
}else if(mode==2){return en;}else{return en;} 
}

Feis.画笔=function(p){
var paint=(p==null?new Feis.Paint():p);
this.样式=function(type){
paint.setStyle(type==0?Feis.Paint.Style.STROKE:type==1?Feis.Paint.Style.FILL:Feis.Paint.Style.FILL_AND_STROKE);
}
this.重置=function(){paint.reset();}
this.平滑=function(){
paint.setAntiAlias(true);
paint.setFilterBitmap(true); 
}
this.颜色=function(color){paint.setColor(color);}
this.笔画宽度=function(w){paint.setStrokeWidth(w);}
this.字体大小=function(size){paint.setTextSize(size);}
this.实心画笔=function(color,is){this.平滑();
if(is)paint.reset();paint.setStyle(Feis.Paint.Style.FILL);
paint.setColor(color);};
this.空心画笔=function(color,is,h){this.平滑();
if(is)paint.reset();paint.setStyle(Feis.Paint.Style.STROKE);
paint.setColor(color);if(h!=null)paint.setStrokeWidth(h);}
this.橡皮擦=function(h){
paint.reset();paint.setAlpha(0);
paint.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.CLEAR));
paint.setAntiAlias(true);paint.setDither(true);
this.样式(0);paint.setStrokeJoin(Feis.Paint.Join.ROUND);
if(h!=null)paint.setStrokeWidth(h);
}
this.连接形状=function(tp){
paint.setStrokeJoin(tp==0?Feis.Paint.Join.ROUND:tp==2?Feis.Paint.Join.MITER:Feis.Paint.Join.BEVEL);
}
this.阴影=function(角度,x,y,color){
paint.setShadowLayer(角度,x,y,color);
};
this.渐变=function(l,t,r,b,arr){
paint.setShader(new android.graphics.LinearGradient(l,t,r,b,arr,null,android.graphics.Shader.TileMode.REPEAT)); 
};
this.字体倾斜=function(skew){paint.setTextSkewX(skew);}
this.字体缩放=function(scale){paint.setTextScaleX(scale);}
this.字体=function(path,mode){
if(!(new Feis.File(path).exists()))return null;
if(mode==null||mode==0){paint.setTypeface(android.graphics.Typeface.createFromFile(path));
}else if(mode==1){paint.setTypeface(android.graphics.Typeface.createFromAsset(ctx.getAssets(),path));}}
this.渐变=function(sx,sy,ex,ey,colors,pos,mode,rotate){
var tm=android.graphics.Shader.TileMode;
var m=(mode==1?tm.CLAMP:mode==2?tm.REPEAT:tm.MIRROR);
if(pos==null){pos=[];for(var i in colors){pos.push(i/colors.length);}}
var lg=new android.graphics.LinearGradient(sx,sy,ex,ey,colors,pos,m);
if(rotate!=null){var matrix=new Feis.Matrix();
lg.getLocalMatrix(matrix);matrix.setRotate(rotate,ex/2,ey/3);
lg.setLocalMatrix(matrix);}paint.setShader(lg);return lg; 
}
this.滤镜=function(m){
paint.setXfermode(m==null?null:Feis.滤镜(null,m));
}
this.路径圆弧效果=function(r,isout){
 var effect=new android.graphics.CornerPathEffect(r);
 if(!isout){paint.setPathEffect(effect);}else{return effect;}
}
this.路径虚线效果=function(间距数组,偏移,isout){
 var effect=new android.graphics.DashPathEffect(间距数组,偏移);
 if(!isout){paint.setPathEffect(effect);}else{return effect;}
}
this.路径离散效果=function(长度,距离,isout){
 var effect=new android.graphics.DiscretePathEffect(长度,距离);
 if(!isout){paont.setPathEffect(effect);}else{return effect;}
}
this.路径形状效果=function(形状路径,间距,偏移,转角样式,isout){
 var PathDash=android.graphics.PathDashPathEffect;
 var tp=(转角样式==0?PathDash.Style.ROTATE:转角样式==1?PathDash.Style.MORPH:PathDash.Style.TRANSLATE);
 var effect=new PathDash(形状路径,35,0,tp)
 if(!isout){paint.setPathEffect(effect);}else{return effect;}
}
this.相交路径效果=function(效果1,效果2,isout){
 var effect=new android.graphics.ComposePathEffect(效果1,效果2);
 if(!isout){paint.setPathEffect(effect);}else{return effect;}
}
this.重叠路径效果=function(效果1,效果2,isout){
 var effect=new android.graphics.SumPathEffect(效果1,效果2);
 if(!isout){paint.setPathEffect(effect);}else{return effect;}
}
this.模糊=function(blur,m){
m=(m==0?android.graphics.BlurMaskFilter.Blur.SOLID:
(m==1?android.graphics.BlurMaskFilter.Blur.INNER:
(m==2?android.graphics.BlurMaskFilter.Blur.NORMAL:
(m==3?android.graphics.BlurMaskFilter.Blur.OUTER:
android.graphics.BlurMaskFilter.Blur.SOLID))));
paint.setMaskFilter(new android.graphics.BlurMaskFilter(blur,m));
}
this.浮雕=function(x,y,z,亮度,反射,模糊){
paint.setMaskFilter(new android.graphics.EmbossMaskFilter([x,y,z],亮度,反射,模糊));
}
this.getPaint=function(){return paint;}
}

Feis.sp=function(spVal){
return android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_SP,spVal,ctx.getResources().getDisplayMetrics());
}

function ppp(str){
new Feis.Print().显示(str);
}

function qq聊天界面(qq){
var url="mqqwpa://im/chat?chat_type=wpa&uin="+qq+"&version=1";
 ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url)));
}

function toRGB(R,G,B,colors){
var index=0;
var c=colors[0];
var start=Math.sqrt(Math.pow(R-c.r,2)+Math.pow(G-c.g,2)+Math.pow(B-c.b,2));
for(var i in colors){
 var obj=colors[i];
 var dist=Math.sqrt(Math.pow(R-obj.r,2)+Math.pow(G-obj.g,2)+Math.pow(B-obj.b,2));
 if(dist<start){index=i;start=dist;}
}
return colors[index];
}
/* Decrypted Part End */

//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～

function 圆形进度(){
var 路径=new Feis.Path();
var 画笔=Feis.绘画.画笔(Feis.Color.RED,2,5);
var 底色=Feis.ys(255,255,0,0),
面色=Feis.ys(255,0,0,255);
var 进程=0,
阶级=10,
变化粗细=5,
固定粗细=3;
this.setLineWidth=function(b,t){
 固定粗细=b;
 变化粗细=t;
}
this.setLineCount=function(n){
 阶级=Math.floor(360/n);
}
this.onDraw=function(画布,x,y,min,max){
 进程+=阶级;
 进程%=360;
 for(var i=0;i<360;i+=阶级){
var sx=-Math.sin(i/180*Math.PI);
var cy=Math.cos(i/180*Math.PI);
路径.reset();
路径.moveTo(x+min*sx,y+min*cy);
路径.lineTo(x+max*sx,y+max*cy);
if(i<=进程&&i>进程-360){
画笔.setStrokeWidth(变化粗细);
if(进程<阶级){
 底色=面色;
 面色=Feis.随机颜色(0,255);
}
画笔.setColor(面色)
}else{
画笔.setColor(底色);
画笔.setStrokeWidth(固定粗细);
}
画布.drawPath(路径,画笔);
}
} 
}

//～～～～～～～～～

function 方块动画(w){
var 格子数=8,
格子宽=0,
间隙=0,
格子=0,
进度=0,
停留=50;
var 颜色=头像正面; 
var 阶级=5,
滞留=0;
var 数组=[];
var update=function(c){
 格子数=c;
 格子宽=w/(格子数+2);
 间隙=(格子宽*2)/(格子数+1);
}
update(格子数);
var 矩形=new Feis.工具.矩形();
矩形.设定(0,0,格子宽,格子宽);
矩形.临时缓存();
this.setCount=function(c){
 update(c);
}
this.setTime=function(s){
 停留=s;
}
this.setLevel=function(l){
 阶级=l;
}
this.setColors=function(arr){
 颜色=arr;
}
this.setListColors=function(arr){
 数组=arr;
};
this.draw=function(cv){
矩形.设定(0,0,格子宽,格子宽);
进度+=阶级;
if(进度>格子宽){
 格子+=1;
 进度=0;
}
if(格子>格子数*格子数+停留){
 滞留+=1;
 if(滞留>=格子数*格子数){
格子=0;
滞留=0;
if(数组.length>0)颜色=数组[Feis.随机(0,数组.length-1)];
 } 
}
for(var i=滞留;i<格子&&i<格子数*格子数;i++){
 var f=Feis.工具.索引一转二(i,格子数,格子数);
 var x=f[0],y=f[1];
 矩形.位移(间隙+(间隙+格子宽)*y,间隙+(间隙+格子宽)*x);
 if(i==格子-1)矩形.临时缩放(进度,进度);
 cv.drawRect(矩形.左,矩形.上,矩形.右,矩形.下,Feis.绘画.画笔(Feis.Color_hex(颜色[i]),2,0));
}
cv.drawRect(0,0,w,w,Feis.绘画.画笔(Feis.ys(255,0,255,220),0,1))
}
}

var 头像正面=[
0x88f2f2f2,0xffa387b3,0xffff9ec0,0xff867893,0xff81758c,0xff81758c,0xffa387b3,0x88f2f2f2,
0xff81758c,0xffa387b3,0xfff2f2f2,0xffff9ec0,0xff81758c,0xff81758c,0xffa387b3,0xff81758c,
0xffff9ec0,0xfff2f2f2,0xff81758c,0xffa387b3,0xff81758c,0xff81758c,0xffa387b3,0xff81758a,
0xff81758c,0xffff9ec0,0xff927ea0,0xffa387b3,0xff81758c,0xff81758c,0xffa387b3,0xff81758c,
0xff81758c,0xffa387b3,0xff1f1b19,0xffa387b3,0xff8e7b9a,0xff1f1b19,0xffa387b3,0xff81758c,
0xff85759c,0xffebe3ed,0xff1f1b19,0xffffead7,0xff8e7b9a,
0xff1f1b19,0xffebe3ed,0xff85759c,
0xff81758c,0xfffbf3ed,0xff554a43,0xffffead7,0xffffead7,
0xff554a43,0xfffbf3ed,0xff81758c,
0x6081758c,0xff877893,0xffffddbe,0xffffead7,0xffffead7,
0xffffddbe,0xff877893,0x6081758c
];

var 头像背面=[
0xffffffff,0xffffffff,0xff81758c,0xff867893,0xff81758c,0xff81758c,0xffffffff,0xffffffff,
0xffffffff,0xffff004d,0xff8c7b9a,0xff917ea0,0xff867893,0xff8c7b9a,0xffff004d,0xffffffff,
0xff8e7b9a,0xff9d84ad,0xff8c7b9a,0xff9781a6,0xff967893,0xff8c7b9a,0xff9d84ad,0xff8e7b9a,
0xff877893,0xff750026,0xff750026,0xffa387b3,0xff877893,0xff750026,0xff750026,0xff877893,
0xff750026,0xfff2f2f2,0xff00a7ff,0xffffead7,0xff877893,0xff00a7ff,0xfff2f2f2,0xff750026,
0xff750026,0xfff2f2f2,0xff00a7ff,0xffffead7,0xffffead7,0xff00a7ff,0xfff2f2f2,0xff750026,
0xff877893,0xffffb5d4,0xffffb5d4,0xffffead7,0xffffead7,0xffffb5d4,0xffffb5d4,0xff877893,
0xff8e758c,0xff8c7b9a,0xffffead7,0xffffead7,0xffffead7,0xffffead7,0xff8c7b9a,0xff8e758c
];

var 苦力怕头=[
0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,
0xff1d9400,0xff121212,0xff121212,0xff1d9400,0xff1d9400,0xff121212,0xff121212,0xff1d9400,
0xff1d9400,0xff121212,0xff121212,0xff1d9400,0xff1d9400,0xff121212,0xff121212,0xff1d9400,
0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,
0xff1d9400,0xff1d9400,0xff1d9400,0xff121212,0xff121212,0xff1d9400,0xff1d9400,
0xff1d9400,0xff1d9400,0xff1d9400,0xff121212,0xff121212,0xff121212,0xff121212,0xff1d9400,0xff1d9400,
0xff1d9400,0xff1d9400,0xff121212,0xff1d9400,0xff1d9400,0xff121212,0xff1d9400,0xff1d9400,
0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400,0xff1d9400
];

var 史蒂夫头=[
0xff2f200b,0xff2f200b,0xff2f200b,0xff2f200b,0xff2f200b,0xff2f200b,0xff2f200b,0xff2f200b,
0xff2f200b,0xff2f200b,0xff291e0c,0xff33240f,0xff402b10,0xff3e2a12,0xff2b1e0d,0xff342510,
0xff2f200b,0xffb58a6a,0xffbb8e71,0xffc49671,0xffa2745d,0xffbc8174,0xffac7758,0xff342510,
0xffa97d64,0xffb2846c,0xffa07d64,0xffad806b,0xff9b735a,0xffb98972,0xff9b6a4a,0xff9b6a4a,
0xffb2846c,0xffffffff,0xff513c87,0xffb47b67,0xffb98972,0xff513c87,0xffffffff,0xffb2846c,
0xff9a6344,0xffb37b62,0xffb68372,0xff69402e,0xff69402e,0xffbe896a,0xffa06a46,0xff805332,
0xff8f5d42,0xff965f40,0xff764234,0xff764234,0xff764234,0xff764234,0xff8f5e3d,0xff805238,
0xff6e442b,0xff6e442b,0xff805238,0xff805238,0xff7a4e33,0xff82543a,0xff82543a,0xff7a4e33
];

var 骷髅头像=[
0xff636563,0xff636163,0xff636563,0xff5a595a,0xff525152,0xff525552,0xff5a5d5a,0xff636163,
0xff636163,0xff5a5d5a,0xff636163,0xff6b696b,0xff737573,0xff737173,0xff636163,0xff5a595a,
0xff636163,0xff7b797b,0xff7b7d7b,0xff848184,0xff7b7d7b,0xff7b7d7b,0xff737173,0xff6b696b,
0xff737173,0xff7b797b,0xff737173,0xff737573,0xff6b696b,0xff7b7d7b,0xff6b696b,0xff6b696b,
0xff7b797b,0xff312d31,0xff312d31,0xff7b797b,0xff7b7d7b,0xff312d31,0xff312d31,0xff737173,
0xff6b696b,0xff737573,0xff7b797b,0xff525152,0xff525152,0xff7b7d7b,0xff6b696b,0xff5a595a,
0xff636163,0xff292d29,0xff292d29,0xff292d29,0xff292d29,0xff292d29,0xff292d29,0xff5a595a,
0xff4a4d4a,0xff524d52,0xff525152,0xff525552,0xff5a595a,0xff525152,0xff5a5d5a,0xff525152
];

var xxxxx=[
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,
0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff ,0xff 
];

var 主题=[
{
 zh_name:"粉色主题",
 en_name:"Pink theme",
 data:{
线条类型:0,
标题圆角:0,
标题圆角1:0,
标题背色:Feis.Color_hex(0xFFFC787B),
标题背色2:Feis.Color_hex(0xFFFC787B),
标题文色:Feis.ys(255,255,255,255),
提示颜色:Feis.ys(255,0,0,0),
标题阴影:7,
按键圆角:5,
按键圆角1:10,
按键圆角2:15,
按键背色:Feis.Color_hex(0xFFFA8F91),
按键背色2:Feis.Color_hex(0xFFFA8F91),
按键文色:Feis.ys(255,255,255,255),
按键阴影:7,
背景线数:12,
背景线条:Feis.ys(255,0,0,0),
背景颜色:Feis.ys(255,240,240,240),
编辑线数:18,
编辑线条:Feis.ys(255,255,255,255),
编辑背色:Feis.ys(255,150,150,150)
 }
},
{
 zh_name:"科幻主题",
 en_name:"Science theme",
 data:{
线条类型:0,
标题圆角:0,
标题圆角1:0,
标题背色:Feis.ys(100,0,0,0),
标题背色2:Feis.ys(100,0,0,0),
标题文色:Feis.ys(255,0,200,210),
提示颜色:Feis.ys(255,255,255,0),
标题阴影:7,
按键圆角:5,
按键圆角1:10,
按键圆角2:15,
按键背色:Feis.ys(100,0,200,210),
按键背色2:Feis.ys(100,0,200,210),
按键文色:Feis.ys(255,255,255,0),
按键阴影:7,
背景线数:30,
背景线条:Feis.ys(255,0,200,210),
背景颜色:Feis.ys(120,0,0,0),
编辑线数:80,
编辑线条:Feis.ys(255,0,200,210),
编辑背色:Feis.ys(180,0,0,0)
 }
},
 {
 zh_name:"卡其色主题",
 en_name:"Khaki theme",
 data:{
 线条类型:2,
标题圆角:5,
标题圆角1:0,
标题背色:Feis.Color_hex(0xFFF5C48A),
标题背色2:Feis.Color_hex(0xFFF5C48A),
标题文色:Feis.Color_hex(0xFFAA5A00),
提示颜色:Feis.ys(255,0,0,0),
标题阴影:2,
按键圆角:4,
按键圆角1:6,
按键圆角2:8,
按键背色:Feis.Color_hex(0xFFFFEA96),
按键背色2:Feis.Color_hex(0xFFFFEA96),
按键文色:Feis.Color_hex(0xFF5A4800),
按键阴影:7,
背景线数:5,
背景线条:Feis.Color_hex(0xFF5E0000),
背景颜色:Feis.Color_hex(0xFFF8DB67),
编辑线数:10,
编辑线条:Feis.Color_hex(0xFED69600),
编辑背色:Feis.Color_hex(0xFE695D41)
 }
},
 {
 zh_name:"缤纷主题",
 en_name:"Profusion theme",
 data:{
线条类型:3,
标题圆角:8,
标题圆角1:2,
标题背色:[Feis.Color_hex(0xFF73FF00),
Feis.Color_hex(0xFFFFF300),
Feis.Color_hex(0xFF0080FF),
Feis.Color_hex(0xFFFF0000)
],
标题背色2:Feis.Color_hex(0xFFFFF300),
标题文色:Feis.Color_hex(0xFFFF0000),
提示颜色:Feis.ys(255,200,0,0),
标题阴影:4,
按键圆角:6,
按键圆角1:8,
按键圆角2:12,
按键背色:[Feis.Color_hex(0xFFC8DD6A),
Feis.Color_hex(0xFFDD6D6A),
Feis.Color_hex(0xFF6ADD9C)
],
按键背色2:Feis.Color_hex(0xFFC8DD6A),
按键文色:Feis.Color_hex(0xFFFFFFFF),
按键阴影:5,
背景线数:1,
背景线条:Feis.Color_hex(0xFE00FFEA),
背景颜色:[Feis.Color_hex(0xFF86003C),
Feis.Color_hex(0xFF006786),
Feis.Color_hex(0xFF864A00),
Feis.Color_hex(0xFF758600)
],
编辑线数:2,
编辑线条:Feis.Color_hex(0xFE0005FF),
编辑背色:[Feis.Color_hex(0xFF580700),
Feis.Color_hex(0xFF415800),
Feis.Color_hex(0xFF00581D),
Feis.Color_hex(0xFF004A58),
Feis.Color_hex(0xFF200058),
Feis.Color_hex(0xFF580053),
Feis.Color_hex(0xFF580014)
]
 }
},
{
 zh_name:"QQ蓝",
 en_name:"Bule theme",
 data:{
线条类型:4,
标题圆角:2,
标题圆角1:0,
标题阴影:2,
标题背色:[
Feis.Color_hex(0xFF26C5FD),
Feis.Color_hex(0xFF4E8EFE),
],
标题背色2:Feis.Color_hex(0xFF25C4FD),
标题文色:Feis.Color_hex(0xffeeeeee),
提示颜色:Feis.ys(255,0,0,0),
按键圆角:2,
按键圆角1:4,
按键圆角2:6,
按键阴影:7,
按键背色:Feis.Color_hex(0xFFFFFFFF),
按键背色2:Feis.Color_hex(0xFFFFFFFF),
按键文色:Feis.Color_hex(0xFF000000),
背景线数:10,
背景线条:Feis.Color_hex(0xFFDEDFE0),
背景颜色:Feis.Color_hex(0xFFFFFFFF),
编辑线数:15,
编辑线条:Feis.Color_hex(0xFFDEDFE0),
编辑背色:Feis.Color_hex(0xFFF9F9FB)
 }
},
 {
 zh_name:"小黑主题",
 en_name:"Enderdragon",
 data:{
线条类型:1,
标题圆角:4,
标题圆角1:0,
标题背色:Feis.ys(255,0,0,0),
标题背色2:Feis.ys(255,0,0,0),
标题文色:Feis.ys(255,213,0,255),
提示颜色:Feis.ys(255,255,0,255),
标题阴影:7,
按键圆角:3,
按键圆角1:5,
按键圆角2:8,
按键背色:Feis.ys(255,59,59,59),
按键背色2:Feis.ys(255,59,59,59),
按键文色:Feis.ys(255,255,0,255),
按键阴影:7,
背景线数:5,
背景线条:Feis.ys(255,255,0,255),
背景颜色:[Feis.ys(255,59,59,59),
Feis.ys(255,0,0,0)],
编辑线数:10,
编辑线条:Feis.ys(255,255,0,255),
编辑背色:[Feis.ys(255,95,95,95),
Feis.ys(255,0,0,0)]
 }
},
{
 zh_name:"壁纸主题",
 en_name:"Wallpaper",
 data:{
线条类型:0,
标题圆角:2,
标题圆角1:2,
标题背色:Feis.ys(200,200,200,200),
标题背色2:Feis.ys(200,200,200,200),
标题文色:Feis.ys(255,0,0,0),
提示颜色:Feis.ys(255,255,255,0),
标题阴影:7,
按键圆角:10,
按键圆角1:20,
按键圆角2:30,
按键背色:Feis.ys(120,200,200,200),
按键背色2:Feis.ys(120,200,200,200),
按键文色:Feis.ys(255,0,0,0),
按键阴影:7,
背景线数:0,
背景线条:Feis.ys(255,255,0,255),
背景颜色:null,
编辑线数:0,
编辑线条:Feis.ys(255,255,0,255),
编辑背色:null
 }
},
{
 zh_name:"夜间主题",
 en_name:"Night theme",
 data:{
线条类型:4,
标题圆角:2,
标题圆角1:0,
标题背色:Feis.ys(255,18,42,80),
标题背色2:Feis.ys(255,18,42,80),
标题文色:Feis.ys(255,118,153,186),
提示颜色:Feis.ys(255,255,255,255),
标题阴影:7,
按键圆角:0,
按键圆角1:0,
按键圆角2:0,
按键背色:Feis.ys(255,24,50,87),
按键背色2:Feis.ys(255,24,50,87),
按键文色:Feis.ys(255,118,153,186),
按键阴影:7,
背景线数:50,
背景线条:Feis.ys(255,48,74,102),
背景颜色:Feis.ys(250,10,24,45),
编辑线数:25,
编辑线条:Feis.ys(255,167,196,226),
编辑背色:Feis.ys(250,5,28,61)
 }
},
{
 zh_name:"深海主题",
 en_name:"Deep sea theme",
 data:{
线条类型:4,
标题圆角:10,
标题圆角1:0,
标题背色:[Feis.ys(250,0,31,76),
Feis.ys(250,0,103,255)],
标题背色2:Feis.ys(250,0,0,96),
标题文色:Feis.ys(255,255,255,255),
提示颜色:Feis.ys(255,200,200,200),
标题阴影:7,
按键圆角:40,
按键圆角1:30,
按键圆角2:20,
按键背色:[Feis.ys(150,0,0,64),
Feis.ys(150,0,0,255)],
按键背色2:Feis.ys(150,0,0,110),
按键文色:Feis.ys(255,200,200,200),
按键阴影:7,
背景线数:50,
背景线条:Feis.ys(255,170,0,70),
背景颜色:[
Feis.ys(255,0,0,224),
Feis.ys(255,0,0,192),
Feis.ys(255,0,0,160),
Feis.ys(255,0,0,128),
Feis.ys(255,0,0,96),
Feis.ys(255,0,0,64),
Feis.ys(255,0,0,32),
Feis.ys(255,0,0,0)],
编辑线数:20,
编辑线条:Feis.ys(255,170,0,70),
编辑背色:[Feis.ys(255,0,0,224),
Feis.ys(255,0,0,192),
Feis.ys(255,0,0,160),
Feis.ys(255,0,0,128),
Feis.ys(255,0,0,96),
Feis.ys(255,0,0,64),
Feis.ys(255,0,0,32),
Feis.ys(255,0,0,0)]
 }
}
];

var 壁纸;
var 获取壁纸=function(){
if(壁纸==null){
var bz=Feis.toBlur(Feis.getWallpaper(true),40,100);
壁纸=Feis.bmpToDraw(bz);
}
return 壁纸;
}

Feis.newFileList=function(path){
var file=new Feis.File(path);
if(file.isFile()){
 file.getParentFile().mkdirs();
}else{
 file.mkdirs();
}
}

//～～～～～～～～～～～～～～～～～～～～～～

var 历史目录=Feis.根路径("/games/印画/历史");
var 配置目录=Feis.根路径("/games/印画/配置");
var 配置文件=配置目录+"/setting.dat";

var 当前绘画;
var 当前高度=0;
var 当前宽度=0;
var 当前像素;
var 当前主题;
var 当前模式=1;
var 放置方向=0;
var 放置状态=0;
var 当前色系;
var 版本="Reset 2.0.5";
var 像素;
var 放置记录=[];

var 模式名称=["玻璃","泥沙","混泥土","羊毛","黏土","彩色方块","杂色方块","所有方块","草地染色"];
var 模式名称2=["Glass block","Cement powder","Concrete block","Wool block","Clay block","Colors block","Noise color","All block","Grass dyed"];
var 语言名称=["Language(Auto)",">English<",">简体中文<"];

var 配置={
语言:0,
主题:3,
线程:1,
位置x:Feis.dp(1,800),
位置y:Feis.dp(3,200),
}

Feis.newFileList(历史目录);
Feis.newFileList(配置目录);
ppp(lang("§4提示:§7长按§e头像§7可选择菜单","§eI'm sorry! §7Because the authors do not understand §bEnglish§7, so all the words are §amachine translation",配置.语言));

if(!(new Feis.File(配置文件).exists())){
数据存储();
}else{
数据恢复();
}
var 当前主题=主题[配置.主题].data;

function 数据恢复(){
var 设置数据=Feis.读取文本(配置文件);
if(设置数据!=null)
配置=Feis.jsonData(设置数据);
else 
数据存储();
}

function 数据存储(){
Feis.保存文本(配置文件,Feis.jsonData(配置));
}

//～～～～～～～～～～～～～～～～～～～～～

function getTimeString(){
return new java.text.SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
}

function Orientation(xz){
var x=0,z=0,m=0;
var f=(getYaw()%360+360)%360;
if(f>=315||f<45){x=-1;z=1;m=0}//西
if(f>=45&&f<135){x=-1;z=-1;m=1}//北
if(f>=135&&f<225){x=1;z=-1;m=2}//东
if(f>=225&&f<315){x=1;z=1;m=3}//南
if(xz==0){return x}
if(xz==1){return z}
if(xz==2){return m}
}

function GrassPaint(x,y,z,color){
if(color.indexOf("0xff")!=-1){
 Level.setTile(x,y,z,0);
 Level.setTile(x,y,z,2,0);
 Level.setGrassColor(x,z,color);
}
}

//～～～～～～～～～～～～～～～～～～

function GrassPaintDraw(x,y,z){
var m=Orientation(2);
像素=Feis.copy(当前像素);
放置记录=[];
var h=当前高度,w=当前宽度
for(var i=0;i<当前像素.length;i++){
 var f=Feis.工具.索引一转二(i,h,w);
 var px=f[0],pz=f[1];
放置状态更新(pz,px,像素[i],i);
if(放置状态==0){
 放置状态关闭();
 ppp(lang("§e放置取消","§eDraw cancel",配置.语言));
 break;
}
染色放置(x,y,z,px,pz,m,i)
}
放置状态=0;
放置状态关闭();
ppp(lang("§e绘制结束","§eDraw complete...",配置.语言));
}

//～～～～～～～～～～～～～～～～～～～

function BlockPaintDraw(x,y,z){
var m=Orientation(2);
像素=Feis.copy(当前像素);
放置记录=[];
var h=当前高度,w=当前宽度;
for(var i=0;i<像素.length;i++){
 var f=Feis.工具.索引一转二(i,h,w);
 var px=f[0],pz=f[1];
放置状态更新(pz,px,像素[i],i);
if(放置状态==0){
 放置状态关闭();
 ppp(lang("§e放置取消","§eDraw cancel",配置.语言));
 break;
}
if(放置方向==0){
水平放置(x,y,z,px,pz,m,i);
}else if(放置方向==1){
垂直放置(x,y,z,px,pz,m,i);
}
 }
放置状态=0;
放置状态关闭();
ppp(lang("§e绘制结束","§eDraw complete...",配置.语言));
}

//～～～～～～～～～～～～～～～～～～～～～

function GrassPaintDraw2(x,y,z){
var m=Orientation(2);
像素=Feis.copy(当前像素);
放置记录=[];
var h=当前高度,w=当前宽度;
var length=Math.floor(像素.length/2);
var count1=0,count2=1;
ppp(lang("§e开始绘制...","§eStart drawing...",配置.语言)+x+","+y+","+z);
Feis.线程(function(){
for(var i=0;i<length;i++,count1++){
 var f=Feis.工具.索引一转二(i,h,w);
 var px=f[0],pz=f[1];
放置状态更新(pz,px,像素[i],count1+count2);
if(放置状态==0){
 放置状态关闭();
 ppp(lang("§e放置取消","§eDraw cancel",配置.语言));
 break;
}
染色放置(x,y,z,px,pz,m,i);
if((count1+count2)==像素.length){
 放置状态=0;放置状态关闭();
 ppp(lang("§e绘制结束","§eDraw complete...",配置.语言));}
}
});
Feis.线程(function(){
for(var j=像素.length-1;j>=length;j--,count2++){
 var f=Feis.工具.索引一转二(j,h,w);
 var px=f[0],pz=f[1];
放置状态更新(pz,px,像素[j],count1+count2);
if(放置状态==0){
 放置状态关闭();
 ppp(lang("§e放置取消","§eDraw cancel",配置.语言));
 break;
}
染色放置(x,y,z,px,pz,m,j);
if((count1+count2)==像素.length){
 放置状态=0;放置状态关闭();
 ppp(lang("§e绘制结束","§eDraw complete...",配置.语言));}
}
});
}


function BlockPaintDraw2(x,y,z){
var m=Orientation(2);
像素=Feis.copy(当前像素);
放置记录=[];
var h=当前高度,w=当前宽度;
var length=Math.floor(像素.length/2);
var count1=0,count2=1;
ppp(lang("§e开始绘制...","§eStart drawing...",配置.语言)+x+","+y+","+z);
Feis.线程(function(){
for(var i=0;i<length;i++,count1++){
 var f=Feis.工具.索引一转二(i,h,w);
 var px=f[0],pz=f[1];
放置状态更新(pz,px,像素[i],count1+count2);
if(放置状态==0){
 放置状态关闭();
 ppp(lang("§e放置取消","§eDraw cancel",配置.语言));
 break;
}
if(放置方向==0){
水平放置(x,y,z,px,pz,m,i);
}else if(放置方向==1){
垂直放置(x,y,z,px,pz,m,i);
}
if((count1+count2)==像素.length){
放置状态=0;放置状态关闭();
ppp(lang("§e绘制结束","§eDraw complete...",配置.语言));}
}
});
Feis.线程(function(){
for(var j=像素.length-1;j>=length;j--,count2++){
 var f=Feis.工具.索引一转二(j,h,w);
 var px=f[0],pz=f[1];
放置状态更新(pz,px,像素[j],count1+count2);
if(放置状态==0){
 放置状态关闭();
 ppp(lang("§e放置取消","§eDraw cancel",配置.语言));
 break;
}
if(放置方向==0){
水平放置(x,y,z,px,pz,m,j);
}else if(放置方向==1){
垂直放置(x,y,z,px,pz,m,j);
}
if((count1+count2)==像素.length){
放置状态=0;放置状态关闭();
ppp(lang("§e绘制结束","§eDraw complete...",配置.语言));}
}
});
}

//～～～～～～～～～～～～～～～～～～～～～～

function 水平放置(x,y,z,px,pz,m,i){
if(m==0){x-=px;z+=pz;}//西
else if(m==1){x-=pz;z-=px;}//北
else if(m==3){z+=px;x+=pz;}//东
else if(m==2){z-=pz;x+=px;}//南
if(Feis.getAlpha(像素[i])>40){
var c=Feis.Color_toARGB(像素[i]);
var bc=toRGB(c[1],c[2],c[3],当前色系);
放置录制(x,y,z);
setTile(x,y,z,bc.id,bc.da);
}
}

function 垂直放置(x,y,z,px,pz,m,i){
if(m==0)z+=px;
else if(m==1)x-=px;
else if(m==2)z-=px;
else if(m==3)x+=px;
if(Feis.getAlpha(像素[i])>40){
var c=Feis.Color_toARGB(像素[i]);
var bc=toRGB(c[1],c[2],c[3],当前色系);
放置录制(x,y+pz,z);
setTile(x,y+pz,z,bc.id,bc.da);
}
}

function 染色放置(x,y,z,px,pz,m,i){
if(m==0){x-=px;z+=pz;}//西
else if(m==1){x-=pz;z-=px;}//北
else if(m==3){z+=px;x+=pz;}//东
else if(m==2){z-=pz;x+=px;}//南
if(Feis.getAlpha(像素[i])>40){
放置录制(x,y,z);
GrassPaint(x,y,z,Feis.Color_toHex(像素[i]));
}
}


function 放置录制(x,y,z){
放置记录.push([x,y,z,Level.getTile(x,y,z),Level.getData(x,y,z)]);
}

function 放置恢复(){
ppp(lang("§e恢复中...","§eRecovery...",配置.语言));
Feis.线程(function(){
for(var i in 放置记录){
var d=放置记录[i];
Level.setTile(d[0],d[1],d[2],d[3],d[4]);
}
放置记录=[];
ppp(lang("§e恢复结束","§eRecovery complete",配置.语言));
});
}


//～～～～～～～～～～～～～～～～～～～～～

function useItem(x,y,z,手持,被点,面,手持特值,被点特值){
if(手持==267&&当前像素!=null&&放置状态==0){
放置状态=1;
放置状态窗口();
if(配置.线程==0){
 ppp(lang("§e开始绘制...","§eStart drawing...",配置.语言)+x+","+y+","+z);
 try{
  if(当前模式==方块色系.length){
  GrassPaintDraw(x,y,z);
  }else{
  BlockPaintDraw(x,y,z);}
  }catch(e){Feis.报错(e);}

}else if(配置.线程==1){
ppp(lang("§e开始绘制...","§eStart drawing...",配置.语言)+x+","+y+","+z);
Feis.线程(function(){
 try{
  if(当前模式==方块色系.length){
  GrassPaintDraw(x,y,z);
  }else{
  BlockPaintDraw(x,y,z);}
 }catch(e){Feis.报错(e);}
 });
 
}else if(配置.线程==2){
 try{
  if(当前模式==方块色系.length){
  GrassPaintDraw2(x,y,z);
  }else{
  BlockPaintDraw2(x,y,z);}
 }catch(e){Feis.报错(e);}
}
}
}

function newLevel(){
ppp(lang("§e欢迎使用§b像素印画Ⅱ","§eWelcome to use §bPixelsPrinterⅡ",配置.语言));
}

//～～～～～～～～～～～～～～～～～～～～～

var 状态窗口;
var 状态视图;
var 状态位图;
var 状态文本;

function 放置状态窗口(){
Feis.UiT(function(){
var winArray=Feis.addWindow2(Feis.ys(0,0,0,0,0),
 Feis.dp(0,1000),Feis.dp(3,2),Feis.dip(120),Feis.dip(140),false,false);
 状态窗口=winArray[0];
 var layout=winArray[1];
 try{
 状态位图=Feis.Bitmap.createBitmap(当前宽度,当前高度,Feis.Bitmap.Config.ARGB_8888);
状态视图=Feis.JSONImageView({
位图:状态位图,
宽度:Feis.dip(120),
高度:Feis.dip(120),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(Feis.ys(0,0,0,0),Feis.dip(0)),
旋转:270,
布局:layout,
阴影:当前主题.按键阴影,
});

 状态文本=Feis.JSONTextView({
文本:"0%",
宽度:Feis.dip(60),
高度:Feis.dip(20),
文本大小:10,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.提示颜色,
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(4)),
文本重心:Feis.getGravity("居中"),
布局:layout,
});

}catch(e){Feis.报错(e);}
});
}

function 放置状态关闭(){
Feis.UiT(function(){
if(状态窗口!=null){
状态窗口.dismiss();
状态窗口=null;
}
});
}

function 放置状态更新(x,y,color,porg){
Feis.线程(function(){
var leng=当前宽度*当前高度;
if(状态窗口!=null&&状态视图!=null){
状态位图.setPixel(x,y,color);
Feis.UiT(function(){
状态文本.setText((porg*100/leng).toFixed()+"%");
状态视图.setImageBitmap(状态位图);
});
}
});
}

//～～～～～～～～～～～～～～～～～～～～～

var 信息窗口;
var 信息视图;
var 信息文本;
当前信息窗口();

function 当前信息窗口(){
Feis.UiT(function(){
 var winArray=Feis.addWindow2(Feis.ys(0,0,0,0,0),
 Feis.dp(0,1000),Feis.dp(3,420),Feis.dip(60),Feis.dip(90),false,false);
 信息窗口=winArray[0];
 var layout=winArray[1];
 try{
信息视图=Feis.JSONImageView({
宽度:Feis.dip(60),
高度:Feis.dip(60),
位置重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
});

 信息文本=Feis.JSONTextView({
文本:"",
宽度:Feis.dip(60),
高度:Feis.dip(28),
文本大小:7,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.提示颜色,
背景绘图:Feis.jb(Feis.ys(10,0,0,0),Feis.dip(4)),
文本重心:Feis.getGravity("居中"),
布局:layout,
});

}catch(e){Feis.报错(e);}
});
}

function 信息统计更新(){
Feis.线程(function(){
var size=0;
for(var i=0;i<当前像素.length;i++){
 if(Feis.getAlpha(当前像素[i])>40)size+=1;
 }
信息窗口更新(size);
});
}

function 信息窗口更新(num){
Feis.UiT(function(){
信息视图.setImageBitmap(当前绘画.getBitmap(true));
信息文本.setText(当前宽度+"x"+当前高度+"\nblocks:"+num);
信息文本.setTextColor(当前主题.提示颜色);
});
}


//～～～～～～～～～～～～～～～～～～～～～


function 铺图选项(w,h,x,y){
Feis.UiT(function(){
 try{
var pw=Feis.dip(160),ph=Feis.dip(235);
 if(x<=pw){x=x+w;}else{x-=pw;}
 if(y>=Feis.屏高-ph){y=y-ph;}else{y+=(w/2);}
var winArray=Feis.addWindow2(
当前主题.背景颜色==null?获取壁纸():
画线(pw,ph,当前主题.背景线数,当前主题.背景线条,当前主题.背景颜色,当前主题.线条类型),x,y,pw,ph,true,true);
var win=winArray[0];
var layout=winArray[1];

var la0=Feis.addLayout(layout,0);
 la0.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:Feis.dip(45),
上边距:Feis.dip(6),
位置重心:Feis.getGravity("居中")
})
 );
 
Feis.JSONTextView({
文本:lang("编辑图像","Edit image",配置.语言),
宽度:Feis.dip(75),
高度:Feis.dip(35),
上边距:Feis.dip(2),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:la0,
阴影:当前主题.按键阴影,
监听:function(v){
编辑菜单(当前绘画);
//useItem(0,0,0,267);
}
});

Feis.JSONTextView({
文本:lang("重选图片","Reselect lmage",配置.语言),
宽度:Feis.dip(75),
高度:Feis.dip(35),
左边距:Feis.dip(2),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:la0,
阴影:当前主题.按键阴影,
监听:function(v){
 if(主页窗口==null)主页();
}
});

var tv2=Feis.JSONTextView({
文本:lang("模式:"+模式名称[当前模式],"Mode:"+模式名称2[当前模式],配置.语言),
宽度:Feis.dip(154),
高度:Feis.dip(35),
上边距:Feis.dip(2),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
监听:function(v){
if(放置状态==0){
 当前模式+=1;
 if(当前模式>方块色系.length){
 当前模式=0;
 }
 if(当前模式<方块色系.length){
 当前色系=方块色系[当前模式];
 }
 tv2.setText(lang("模式:"+模式名称[当前模式],"Mode:"+模式名称2[当前模式],配置.语言));
 }else{
 ppp(lang("§e放置中，稍后再试...","§e Drawing，Please wait a moment...",配置.语言));
 }
}
});

var tv3=Feis.JSONTextView({
文本:lang(
"线程:"+(配置.线程==0?"关闭":配置.线程==1?"单线程":"双线程"),
"Thread:"+(配置.线程==0?"off":配置.线程==1?"single":"double"),配置.语言),
宽度:Feis.dip(154),
高度:Feis.dip(35),
上边距:Feis.dip(2),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
监听:function(v){
if(放置状态==0){
if(配置.线程==0){
 配置.线程=1;
}else if(配置.线程==1){
 配置.线程=2;
ppp(lang("§e双线程容易崩溃，速度慢","§eDouble thread is easy to collapse, slow speed",配置.语言));
}else if(配置.线程==2){
 配置.线程=0;
 ppp(lang("§e关闭线程后，图像最好不超过100*100","§e Close thread after. image size don't beyond 100*100",配置.语言));
}
 tv3.setText(lang(
"线程:"+(配置.线程==0?"关闭":配置.线程==1?"单线程":"双线程"),
"Thread:"+(配置.线程==0?"off":配置.线程==1?"single":"double"),配置.语言));
 数据存储();
  }else{
 ppp(lang("§e放置中，稍后再试...","§e Drawing.，Please wait a moment..",配置.语言));
 }
}
});

Feis.JSONTextView({
文本:lang("如果放置方块闪退请关闭线程！","Set block exception. please close thread!",配置.语言),
宽度:Feis.dip(154),
高度:Feis.dip(20),
文本大小:8,
文本颜色:当前主题.提示颜色,
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(Feis.ys(0,255,255,255),Feis.dip(2)),
文本重心:Feis.getGravity("居中"),
布局:layout,
});

var tv4=Feis.JSONTextView({
文本:lang("方向:"+(放置方向==0?"水平":"垂直"),"Orientation:"+(放置方向==0?"level":"vertical"),配置.语言),
宽度:Feis.dip(154),
高度:Feis.dip(35),
上边距:Feis.dip(2),
下边距:Feis.dip(2),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
监听:function(v){
if(放置状态==0){
 if(放置方向==0)
 放置方向=1;
 else if(放置方向==1)
 放置方向=0;
 tv4.setText(lang("方向:"+(放置方向==0?"水平":"垂直"),"Orientation:"+(放置方向==0?"level":"vertical"),配置.语言));
 }else{
 ppp(lang("§e放置中，稍后再试...","§e Drawing.，Please wait a moment..",配置.语言));
 }
}
});

var la1=Feis.addLayout(layout,0);
 la1.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:Feis.dip(45),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中")
})
 );

var tv5=Feis.JSONTextView({
文本:lang("放置终止","Place block stop",配置.语言),
宽度:Feis.dip(75),
高度:Feis.dip(35),
上边距:Feis.dip(2),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(v){
 if(放置状态==1)
 放置状态=0;
 else {
 ppp(lang("当前未曾放置","The current has not placed",配置.语言));
 }
}
});

var tv6=Feis.JSONTextView({
文本:lang("撤销放置","Undo place",配置.语言),
宽度:Feis.dip(75),
高度:Feis.dip(35),
上边距:Feis.dip(2),
左边距:Feis.dip(2),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(v){
 if(放置状态==0){
  if(放置记录.length>0){
   放置恢复();
  }else{
   ppp(lang("§e没有放置记录..","§e No place record..",配置.语言));
  }
 }else{
  ppp(lang("§e放置中，稍后再试...","§e Drawing.，Please wait a moment..",配置.语言));
 }
}
});

 }catch(e){Feis.报错(e);}
});
}



快捷方式();

function 快捷方式(){
Feis.UiT(function(){
var w=Feis.dip(55),
h=Feis.dip(55);
 var winArray=Feis.addWindow2(Feis.ys(0,0,0,0,0),
 配置.位置x,配置.位置y,w,h,false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
var fla=Feis.addLayout(layout);
var fv=new Feis.FastView(fla);
 fv.show();
 fv.setTick(15);
 fv.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(54),
高度:Feis.dip(54)
})
 );
var f=new 方块动画(Feis.dip(54));
 f.setLevel(10);
 f.setColors(头像正面);
 f.setListColors([头像正面,头像背面,史蒂夫头,苦力怕头,骷髅头像]);

fv.startDraw(function(cv,w,h,t){
try{
 Feis.绘画.清屏(cv);
 f.draw(cv);
}catch(e){Feis.报错(e);fv.stopDraw();}
});

var move=new Feis.窗口拖动(win,fv.getView());
 move.开关拖动(function(x,y,e){
配置.位置x=x;
配置.位置y=y;
 },function(){
ppp(lang("§e头像§7位置设置完成！","§eHead portrait §7Position has been fixed",配置.语言));
数据存储();
}
);

move.点击监听(function(v){
//if(主页窗口==null)主页();
if(当前像素!=null||当前绘画!=null){
 铺图选项(w,h,配置.位置x,配置.位置y);
}else{
if(主页窗口==null)主页();
 ppp(lang("§e当前还没有选择或已编辑的图片，长按“头像”可以打开菜单","§eThere are no selected or edited pictures at the moment. Open menu by long press \"head image\"",配置.语言));
}
});

move.长按监听(function(v){
快捷选项(w,h,配置.位置x,配置.位置y,move);
return true;
});
}catch(e){Feis.报错(e);}
});
}

//～～～～～～～～～～～～～～～～～～～～～～

function 主题预览(){
Feis.UiT(function(){
 var pw=Feis.dip(300),
ph=Feis.dip(400);
 var winArray=Feis.addWindow2(
 画背景(Feis.dip(300),Feis.dip(400))
 ,Feis.dp(1,500)-pw/2,Feis.dp(3,500)-ph/2,pw,ph,false,true);
 var win=winArray[0];
 var layout=winArray[1];
try{
var tv=Feis.JSONTextView({
文本:lang("🔙选择主题","🔙Select theme️",配置.语言),
宽度:Feis.dip(300),
高度:Feis.dip(40),
位置重心:Feis.getGravity("居中"),
文本大小:16,
文本颜色:当前主题.标题文色,
背景绘图:
Feis.jb(当前主题.标题背色,
[Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角),Feis.dip(当前主题.标题圆角)]),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.标题阴影,
监听:function(v){
win.dismiss();
}
});

var ad=new Feis.BaseAdapter(主题,function(pos,convertView,parent,obj){
try{
var la=Feis.addLayout(null,1);

var la0=Feis.addLayout(la,1);
 la0.setBackgroundDrawable(
 obj.data.背景颜色==null?获取壁纸():
 画线(Feis.dip(294),Feis.dip(100),
obj.data.背景线数,
obj.data.背景线条,
obj.data.背景颜色,
obj.data.线条类型));
 la0.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(294),
高度:Feis.dip(200),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中")
})
 );
 
var tv0=Feis.JSONTextView({
 文本:lang(obj.zh_name,obj.en_name,配置.语言),
 宽度:Feis.dip(290),
 高度:Feis.dip(30),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:15,
 文本颜色:obj.data.标题文色,
 背景绘图:
 Feis.jb(obj.data.标题背色,
 [Feis.dip(obj.data.标题圆角1),Feis.dip(obj.data.标题圆角1),Feis.dip(obj.data.标题圆角),Feis.dip(obj.data.标题圆角)]),
 文本重心:Feis.getGravity("居中"),
 阴影:obj.data.标题阴影,
 布局:la0
});

var tvb0=Feis.JSONTextView({
 文本:配置.主题!=pos?lang("☐选择","☐Select",配置.语言):lang("☑使用中","☑Used",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 上边距:Feis.dip(50),
 位置重心:Feis.getGravity("居中"),
 文本大小:15,
 文本颜色:obj.data.按键文色,
 背景绘图:
 Feis.jb(obj.data.按键背色,
 Feis.dip(obj.data.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:obj.data.按键阴影,
 监听:function(v){
 当前主题=主题[配置.主题=pos].data;
 数据存储();
 tv.setTextColor(当前主题.标题文色);
 tv.setBackgroundDrawable(Feis.jb(当前主题.标题背色,[Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角),Feis.dip(当前主题.标题圆角)]));
 ad.update(主题);
 //win.dismiss();
 }
});
return la;
}catch(e){Feis.报错(e)}
 });

var list=Feis.JSONListView({
适配器:ad.getAdapter(),
宽度:-2,
高度:Feis.dip(310),
上边距:Feis.dip(2),
背景颜色:Feis.ys(0,255,255,255),
间隙高度:Feis.dip(3),
位置重心:Feis.getGravity("居中"),
布局:layout
});

}catch(e){Feis.报错(e)}
 });
 ppp(lang("§e点击标题可以关闭窗口","§eClick title close window",配置.语言));
}

//～～～～～～～～～～～～～～～～～～～～～～

function 关于(){
Feis.UiT(function(){
 var mp=Feis.铃声(1,true);
 var wx=Feis.dp(1,500),
wy=Feis.dp(3,10),
w=Feis.dip(300),
h=Feis.dp(3,980);
 var winArray=Feis.addWindow2(
 当前主题.背景颜色==null?获取壁纸():
 画线(500,1000,当前主题.背景线数,当前主题.背景线条,当前主题.背景颜色,当前主题.线条类型),wx-w/2,wy ,w,h,false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
var tv0=Feis.JSONTextView({
文本:lang("关于","About",配置.语言),
宽度:Feis.dip(296),
高度:Feis.dip(35),
左边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,[Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角),Feis.dip(当前主题.标题圆角)]),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.标题阴影,
监听:function(v){
 mp.stop();
 fv.dismiss();
 win.dismiss();
}
});

var fla=Feis.addLayout(layout);
var fv=new Feis.FastView(fla);
 fv.show();
 fv.setTick(30);
 fv.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(80),
高度:Feis.dip(80),
位置重心:Feis.getGravity("居中"),
上边距:Feis.dip(18)
})
 );
var f=new 方块动画(Feis.dip(80));
 f.setLevel(5);
 f.setListColors([头像正面,头像背面]);
fv.startDraw(function(cv,w,h,t){
try{
 //Feis.绘画.清屏(cv);
 cv.drawColor(Feis.ys(255,220,220,220));
 f.draw(cv);
}catch(e){Feis.报错(e);fv.stopDraw();}
});

var la=Feis.addLayout(layout,1);
 la.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(170),
高度:Feis.dip(200),
位置重心:Feis.getGravity("居中")
})
 );

var tv1=Feis.JSONTextView({
文本:lang("名称: 像素印画Ⅱ","Name: PixelsPrinterⅡ",配置.语言),
宽度:Feis.dip(160),
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(18),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(5)),
文本重心:Feis.getGravity("居中"),
位置重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){}
});
Feis.水平动画(tv1,-100,0,200);

var tv2=Feis.JSONTextView({
文本:lang("制作: 鄢主晴伊","Editor: @feis",配置.语言),
宽度:Feis.dip(160),
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(15),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(5)),
文本重心:Feis.getGravity("居中"),
位置重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
ppp("§eQQ815821214")
}
});
Feis.水平动画(tv2,100,0,300);

var tv3=Feis.JSONTextView({
文本:lang("赞助: 点击添加QQ","Add OICQ",配置.语言),
宽度:Feis.dip(160),
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(15),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(5)),
文本重心:Feis.getGravity("居中"),
位置重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
qq聊天界面(815821214);
}
});
Feis.水平动画(tv3,-100,0,400);

var tv4=Feis.JSONTextView({
文本:版本,
宽度:Feis.dip(160),
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(15),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(5)),
文本重心:Feis.getGravity("居中"),
位置重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
 mp.stop();
 fv.dismiss();
 win.dismiss();
}
});
Feis.水平动画(tv4,100,0,500);
 }catch(e){Feis.报错(e);}
});
}


function 快捷选项(w,h,x,y,move){
Feis.UiT(function(){
 try{
var pw=Feis.dip(100),
 ph=Feis.dip(200);
 if(x<=pw){x=x+w;}else{x-=pw;}
 if(y>=Feis.屏高-ph){y=y-ph;}else{y+=(w/2);}

 var winArray=Feis.addWindow2(
 当前主题.背景颜色==null?获取壁纸():
 画线(200,500,当前主题.背景线数,当前主题.背景线条,当前主题.背景颜色,当前主题.线条类型),x,y,pw,ph,true,true);
 var win=winArray[0];
 var layout=winArray[1];

 var la=Feis.addLayout(layout,1);
la.setLayoutParams(
 Feis.JSONParams({
宽度:Feis.dip(100),
高度:Feis.dip(200),
位置重心:Feis.getGravity("居中")
 })
);

var tv0=Feis.JSONTextView({
文本:lang("打开","Open",配置.语言),
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(5),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
 if(主页窗口==null)主页();
 win.dismiss();
}
});

var tv1=Feis.JSONTextView({
文本:lang("相册","Albums",配置.语言),
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(2),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
图片选择器(true,function(path){
var size=Feis.getImageFileSize(path);
var s=(size[0]>size[1]?size[0]:size[1]);
if(s>500){
 尺寸选择(path,function(bmp){
 编辑菜单(new Feis.绘画(bmp)); 
});
}else{
 编辑菜单(new Feis.绘画(Feis.getSdcardBitmap(path)));
}
win.dismiss();
 });
}
});

var tv2=Feis.JSONTextView({
文本:lang("主题","Themes",配置.语言),
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(2),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
主题预览();
win.dismiss();
}
});

var tv3=Feis.JSONTextView({
文本:lang("移动","Move",配置.语言),
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(2),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
 move.设置开关(true);
 ppp(lang("§7请拖动§e头像§7快捷方式进行移动","§7Please drag the §eHead portrait shortcut §7to move",配置.语言));
 win.dismiss();
}
});

var tv4=Feis.JSONTextView({
文本:语言名称[配置.语言],
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(2),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
if(配置.语言==0){
配置.语言=1;
}else if(配置.语言==1){
配置.语言=2;
}else if(配置.语言==2){
配置.语言=0;
}
tv0.setText(lang("打开","Open",配置.语言));
tv1.setText(lang("相册","Albums",配置.语言));
tv2.setText(lang("主题","Themes",配置.语言));
tv3.setText(lang("移动","Move",配置.语言));
tv4.setText(语言名称[配置.语言]);
tv5.setText(lang("关于","About",配置.语言));
数据存储();
}
});

var tv5=Feis.JSONTextView({
文本:lang("关于","About",配置.语言),
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(2),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(v){
 关于();
}
});

 }catch(e){Feis.报错(e);}
});
}

//～～～～～～～～～～～～～～～～～～～～～～

function 快速列表(title,arr,run){
Feis.UiT(function(){
 try{
var pw=Feis.dip(100),
 ph=Feis.dp(3,800);
var winArray=Feis.addWindow2(Feis.jb(Feis.ys(220,95,95,95),Feis.dip(5)),Feis.dp(0,820),Feis.dp(3,100),pw,ph,true,true);
var win=winArray[0];
var layout=winArray[1];
var tv=Feis.JSONTextView({
文本:title,
宽度:Feis.dip(100),
高度:Feis.dip(35),
上边距:0,
文本大小:11,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
文本重心:Feis.getGravity("居中"),
布局:layout,
监听:function(v){
win.dismiss();
}
});

var ad=new Feis.BaseAdapter(arr,function(pos,convertView,parent,obj){
try{
 var la=Feis.addLayout(null,0);
la.setLayoutParams(
 Feis.JSONParams({
宽度:-1,
高度:-1,
左边距:Feis.dip(0),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中")
 })
);
 var tv0=Feis.JSONTextView({
文本:obj.toString(),
宽度:Feis.dip(90),
高度:Feis.dip(30),
左边距:Feis.dip(5),
上边距:Feis.dip(0),
文本大小:11,
文本颜色:当前主题.按键文色,背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la
 });
 return la
}catch(e){Feis.报错(e)} 
});
var list=Feis.JSONListView({
适配器:ad.getAdapter(),
宽度:pw,
高度:ph-Feis.dip(40),
左边距:Feis.dip(0),
上边距:Feis.dip(2),
背景颜色:Feis.ys(60,255,255,255),
间隙高度:Feis.dip(3),
布局:layout
});
Feis.列表点击监听(list,function(av,v,id,p){
run(arr[id]);
win.dismiss();
}); 
 }catch(e){Feis.报错(e);}
});
}

//～～～～～～～～～～～～～～～～～～～～～～

function 尺寸选择(path,run){
Feis.UiT(function(){
 try{
var pw=Feis.dip(300),
 ph=Feis.dip(220);
var bmp=Feis.loadBitmap(path,100);
var winArray=Feis.addWindow2(Feis.BitmapDrawable(Feis.toBlur(bmp,80,100))/*图像图标()*/,Feis.dp(1,500)-pw/2,Feis.dp(3,500)-ph/2,pw,ph,false,true);
var win=winArray[0];
var layout=winArray[1];

var tv0=Feis.JSONTextView({
文本:lang("请选择操作"," Select",配置.语言),
宽度:Feis.dip(296),
高度:Feis.dip(35),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角)),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.标题阴影,
监听:function(v){
win.dismiss();
}
});

var la=Feis.addLayout(layout,0);
 la.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:Feis.dip(90),
上边距:Feis.dip(40),
位置重心:Feis.getGravity("居中")
})
 );

var tv1=Feis.JSONTextView({
文本:lang("原图","Original",配置.语言),
宽度:Feis.dip(80),
高度:Feis.dip(80),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(){
 if(run!=null)run(Feis.getSdcardBitmap(path)); 
 win.dismiss();
}
});

var tv2=Feis.JSONTextView({
文本:lang("最快","Fast",配置.语言),
宽度:Feis.dip(80),
高度:Feis.dip(80),
左边距:Feis.dip(12),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(){
 if(run!=null)run(Feis.loadBitmap(path,120));
 win.dismiss();
}
});

var tv3=Feis.JSONTextView({
文本:lang("最佳","Best",配置.语言),
宽度:Feis.dip(80),
高度:Feis.dip(80),
左边距:Feis.dip(12),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(){
 if(run!=null)run(Feis.loadBitmap(path,256));
 win.dismiss();
}
});
 }catch(e){print(e)}
});
}

//～～～～～～～～～～～～～～～～～～～～～～～


var 画笔设置={
画笔颜色:Feis.ys(255,255,0,0),
画笔类型:1,
画笔粗细:2,
画笔模式:0,
橡皮大小:30,
矩形圆角:0
};


function 添加绘画(画,run){
Feis.UiT(function(){
 var width=画.getWidth(),
height=画.getHeight();
 var w=width,
h=height,
x=0,
y=0,
过程=0;
 var 面画=new Feis.绘画(w,h);
面画.绘制颜色(Feis.ys(0,0,0,0));
 var 路径=[];
 var 预览=new 悬浮预览();
 var mode=0,
r=Math.max(w,h)/20;
 var 矩形=new Feis.工具.矩形();
 var bitmap=null;

 var 更新画笔=function(a){
if(画笔设置.画笔类型==0){
面画.实心画笔(画笔设置.画笔颜色,true,画笔设置.画笔粗细);
}else{
面画.空心画笔(画笔设置.画笔颜色,true,画笔设置.画笔粗细);
}

if(画笔设置.画笔模式==0){
面画.绘制贝塞尔曲线(路径)
return 面画.getBitmap();
}else if(画笔设置.画笔模式==1){
面画.橡皮擦(null,画笔设置.橡皮大小);
面画.绘制贝塞尔曲线(路径);
面画.空心画笔(当前主题.按键背色2,true,3);
return 面画.绘制圆形(x,y,画笔设置.橡皮大小/2,true);
}else if(画笔设置.画笔模式==2){
if(过程==0){
if(a==0){矩形.设定(x,y,x,y);}
if(a==2){矩形.右下(x,y);}
if(a==1){过程=1;} 
}else if(过程==1){
if(a==0){
 if(矩形.在内(x,y))mode=1;
 if(Feis.工具.判断圆内(x,y,矩形.右+r,矩形.下+r,r))
mode=2;
 if(Feis.工具.判断圆内(x,y,矩形.右+r,矩形.上-r,r))
mode=3;
 矩形.位移标记(x,y);
}else if(a==2){
 if(mode==1)
矩形.标记位移(x,y);
 if(mode==2)
矩形.右下(x-r,y-r);
}else if(a==1){
 mode=0;
}
}
var b=面画.绘制圆角矩形(矩形.左,矩形.上,矩形.右,矩形.下,画笔设置.矩形圆角,画笔设置.矩形圆角,true);
var p=Feis.绘画.画笔(Feis.Color_alpha(当前主题.按键背色2,180),1,1);
p.setTextSize(r-r/4);
var 画布=Feis.绘画.画布(b);
画布.drawCircle(矩形.右+r,矩形.下+r,r,p);
画布.drawCircle(矩形.右+r,矩形.上-r,r,p);
if(mode==1&&a==2){
画布.drawText(lang("位置:","Coord size:",配置.语言)+Math.floor(矩形.左)+","+Math.floor(矩形.上),r,r,p);
}
if((mode==2||过程==0)&&a==2){
画布.drawText(lang("画布:","Canvas size:",配置.语言)+w+"*"+h+lang(" 矩形:"," Rect size:",配置.语言)+Math.floor(矩形.宽度())+"*"+Math.floor(矩形.高度()),r,r,p);
}
if(mode==3&&a==2){
p.setColor(Feis.ys(255,255,100,0));
画布.drawRoundRect(x-r,矩形.上-r*2,矩形.右+r,矩形.上,r/2,r/2,p);
p.setColor(Feis.Color_alpha(当前主题.按键背色2,180));
画布.drawCircle(x,矩形.上-r,r,p);
画笔设置.矩形圆角=Math.floor((矩形.右+r)-x);
画笔设置.矩形圆角=(画笔设置.矩形圆角<0?0:画笔设置.矩形圆角);
画布.drawText(lang("圆角:","Rounded corners size:",配置.语言)+画笔设置.矩形圆角,r,r,p); 
}
 return b;
}
if(画笔设置.画笔模式==3){
 if(a==0){
if(矩形.在内(x,y))mode=1;
if(Feis.工具.判断圆内(x,y,矩形.右,矩形.下,r))
mode=2;
矩形.位移标记(x,y);
//面画.空心画笔(当前主题.按键背色,true,3);
 }
 if(a==2){
if(mode==1)矩形.标记位移(x,y);
if(mode==2&&x<w&&y<h)矩形.右下(x,y); 
矩形.禁止越界(0,0,w,h);
 }else if(a==1)
mode=0;
var b=面画.绘制图片(bitmap,new Feis.Rect(0,0,bitmap.getWidth(),bitmap.getHeight()),new Feis.RectF(矩形.左,矩形.上,矩形.右,矩形.下),true);

var p=Feis.绘画.画笔(Feis.Color_alpha(当前主题.按键背色2,180),1,1);
var 画布=Feis.绘画.画布(b);
p.setTextSize(r-r/4);
画布.drawCircle(矩形.右,矩形.下,r,p);
if(mode==1&&a==2){
 画布.drawText(lang("位置:","Coord size:",配置.语言)+Math.floor(矩形.左)+","+Math.floor(矩形.上),r,r,p);}
if(mode==2&&a==2){
 画布.drawText(lang("画布:","Canvas size:",配置.语言)+w+"*"+h+lang(" 矩形:"," Rect size:",配置.语言)+Math.floor(矩形.宽度())+"*"+Math.floor(矩形.高度()),r,r,p);
}
return b;
 }
}

 var 绘制刷新=function(isout,a){
return 画.绘制图片(更新画笔(a),0,0,!isout);
 }
 var 获取刷新=function(isout){
return 画.绘制图片(面画.getBitmap(),0,0,!isout);
 }

 var winArray=Feis.addWindow2(
 当前主题.编辑背色==null?获取壁纸():
 画线(1400,800,当前主题.编辑线数,当前主题.编辑线条,当前主题.编辑背色,当前主题.线条类型),Feis.dp(1,10),Feis.dp(3,10),Feis.dip(600),Feis.dp(3,980),false,true);
 var win=winArray[0];
 var layout=winArray[1];
try{
var la=Feis.addLayout(layout,0);
la.setLayoutParams(
Feis.JSONParams({
 宽度:-2,
 高度:-2,
 位置重心:Feis.getGravity("居中")
})
);

 var la_l=Feis.addLayout(Feis.addScroll(la,0,
Feis.JSONParams({
宽度:Feis.dip(320),
高度:Feis.dp(3,978),
位置重心:Feis.getGravity("居中")
}))[0]);

la_l.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:-1,
 位置重心:Feis.getGravity("居中")
})
);


var img=Feis.JSONImageView({
 位图:画.getBitmap(),
 宽度:Feis.dip(280),
 高度:Feis.dip(280),
 上边距:Feis.dip(12),
 位置重心:Feis.getGravity("居中"),
 背景绘图:画背景(Feis.dip(300),Feis.dip(300)),
 布局:la_l,
 阴影:当前主题.按键阴影
});
Feis.触摸监听(img,function(e,a){ 
 var xy=Feis.getImageViewXY(w,h,img.getWidth(),img.getHeight(),e.getX(),e.getY());
 x=xy[0];
 y=xy[1];
 var bmp=null;
 if(画笔设置.画笔模式<2){
if(a==0){
路径.push(x,y);
}
if(a==2){
路径.push(x,y);
路径.push(x,y);
img.setImageBitmap(bmp=绘制刷新());
}
if(a==1){
路径=[];
面画.保存();
tv3.setText(lang("撤销:","Undo:",配置.语言)+(面画.撤销索引()-1));
tv4.setText(lang("重做:","Redo:",配置.语言)+(面画.撤销长度()-面画.撤销索引()));
}
 }
 if(画笔设置.画笔模式>=2){
img.setImageBitmap(bmp=绘制刷新(null,a));
 }
/*if(画笔设置.画笔模式==3){
img.setImageBitmap(bmp=更新画笔(a));
}*/
预览.updateImage(bmp,x,y,Feis.dp(1,1000),Feis.dp(3,y>(h/2)?100:600),a);
return true;
 }); 
 var tv=Feis.JSONTextView({
文本:lang("触摸绘画","Drag paint",配置.语言),
宽度:Feis.dip(280),
高度:Feis.dip(30),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.提示颜色,
背景绘图:Feis.jb(Feis.ys(0,100,200,255),Feis.dip(10)),
文本重心:Feis.getGravity("居中"),
布局:la_l
 });

 var la_r=Feis.addScroll(la,0,
Feis.JSONParams({
宽度:Feis.dip(256),
高度:Feis.dp(3,970),
位置重心:Feis.getGravity("居中")
}))[0];

var la_r0=Feis.addLayout(la_r,0);
la_r0.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 上边距:Feis.dip(12),
 位置重心:Feis.getGravity("居中")
})
);

var tv0=Feis.JSONTextView({
 文本:lang("画笔颜色:","Brush color:",配置.语言)+Feis.Color_toHex(画笔设置.画笔颜色),
 宽度:Feis.dip(120),
 高度:Feis.dip(35),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:Feis.recolor(画笔设置.画笔颜色),
 背景绘图:Feis.jb(画笔设置.画笔颜色,Feis.dip(0)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r0,
 阴影:当前主题.按键阴影,
 监听:function(){
颜色选择器(画笔设置.画笔颜色,function(color){
画笔设置.画笔颜色=color;
tv0.setText(lang("画笔颜色:","Brush color:",配置.语言)+Feis.Color_toHex(画笔设置.画笔颜色));
tv0.setTextColor(Feis.Color_alpha(Feis.recolor(画笔设置.画笔颜色),255));
tv0.setBackgroundColor(画笔设置.画笔颜色);
img.setImageBitmap(获取刷新());
 });
}
});

var tv1=Feis.JSONTextView({
 文本:画笔设置.画笔类型==1?lang("空心","Stroke",配置.语言):lang("实心","Fill",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 左边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r0,
 阴影:当前主题.按键阴影,
 监听:function(){
画笔设置.画笔类型=(画笔设置.画笔类型==0?1:0);
tv1.setText(画笔设置.画笔类型==1?lang("空心","Stroke",配置.语言):lang("实心","Fill",配置.语言));
if(画笔设置.画笔模式>1)
img.setImageBitmap(绘制刷新(null,0));
//img.setImageBitmap(获取刷新());
 }
});

var tv2=Feis.JSONTextView({
 文本:画笔设置.画笔模式==0?lang("笔刷","Brush",配置.语言):lang("橡皮","Eraser",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 左边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r0,
 阴影:当前主题.按键阴影,
 监听:function(){
移除部件(画笔设置.画笔模式,function(){
按键染色();
});
画笔设置.画笔模式=(画笔设置.画笔模式==0?1:0);
tv2.setText(画笔设置.画笔模式==0?lang("笔刷","Brush",配置.语言):lang("橡皮","Eraser",配置.语言));
if(画笔设置.画笔模式==0)
img.setImageBitmap(获取刷新());
 }
});

var la_r1=Feis.addLayout(la_r,0);
la_r1.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中")
})
);

var tv3=Feis.JSONTextView({
 文本:lang("撤销:0","Undo:0",配置.语言),
 宽度:Feis.dip(79),
 高度:Feis.dip(40),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r1,
 阴影:当前主题.按键阴影,
 监听:function(){
面画.撤销();
tv3.setText(lang("撤销:","Undo:",配置.语言)+面画.撤销索引());
tv4.setText(lang("重做:","Redo:",配置.语言)+(面画.撤销长度()-面画.撤销索引()-1));
img.setImageBitmap(获取刷新());
 }
});

var tv4=Feis.JSONTextView({
 文本:lang("重做:0","Redo:0",配置.语言),
 宽度:Feis.dip(79),
 高度:Feis.dip(40),
 左边距:Feis.dip(1), 
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r1,
 阴影:当前主题.按键阴影,
 监听:function(){
面画.重做()
tv4.setText(lang("重做:","Redo:",配置.语言)+(面画.撤销长度()-面画.撤销索引()-1));
tv3.setText(lang("撤销:","Undo:",配置.语言)+面画.撤销索引());
img.setImageBitmap(获取刷新());
 }
});

var tv5=Feis.JSONTextView({
 文本:lang("原始","Original",配置.语言),
 宽度:Feis.dip(80),
 高度:Feis.dip(40),
 左边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r1,
 阴影:当前主题.按键阴影,
 监听:function(){
ppp(lang("长按恢复原始状态","Long press to restore the original state",配置.语言));
 }
});
Feis.长按监听(tv5,function(v,t){
 面画.橡皮擦(null,1);面画.实心画笔(画笔设置.画笔颜色,false);
 面画.绘制矩形(0,0,w,h);img.setImageBitmap(获取刷新());
return true;
});

var tv6=Feis.JSONTextView({
 文本:lang(" 笔刷半径:"," Brush radius:",配置.语言)+画笔设置.画笔粗细,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb=Feis.JSONSeekBar({
 进度:画笔设置.画笔粗细,
 最大进度:w/6,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
画笔设置.画笔粗细=p
tv6.setText(lang(" 笔刷半径:"," Brush radius:",配置.语言)+画笔设置.画笔粗细);
if(画笔设置.画笔模式>1)img.setImageBitmap(绘制刷新(null,0));
//img.setImageBitmap(获取刷新());
 }
});

var tv7=Feis.JSONTextView({
 文本:lang(" 橡皮半径:"," Eraser radius:",配置.语言)+画笔设置.橡皮大小,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb0=Feis.JSONSeekBar({
 进度:画笔设置.橡皮大小,
 最大进度:w/4,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
画笔设置.橡皮大小=p,
tv7.setText(lang(" 橡皮半径:"," Brush radius:",配置.语言)+画笔设置.橡皮大小);
if(画笔设置.画笔模式>1)img.setImageBitmap(绘制刷新(null,0));
//img.setImageBitmap(获取刷新());
 }
});

var la_r2=Feis.addLayout(la_r,0);
la_r2.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中")
})
);

var 笔刷监听=function(view,id){
 Feis.点击监听(view,function(v){
if(id==2){
ppp(lang("\n§7触摸图像，设置矩形的§e起点§7，拖动松开为§e终点\n","Touch the image sets the starting point of the rectangle, loosen to a destination",配置.语言));
移除部件(3,function(){
 添加部件(2,function(){ }); 
});
}
if(id==3){
移除部件(2,function(){
 图片选择器(true,function(obj){
var se=Feis.getImageFileSize(obj);
var s=(se[0]>se[1]?se[0]:se[1]);
if(s>800){
尺寸选择(obj,function(bmp){
 编辑图像(new Feis.绘画(bmp),function(th){
bitmap=th.getBitmap();
矩形.设定(w/10,h/10,w-w/10,h-h/10);
img.setImageBitmap(绘制刷新(null,0)); 
 });
});
}else{
编辑图像(new Feis.绘画(Feis.getSdcardBitmap(obj)),function(th){
 bitmap=th.getBitmap();
 矩形.设定(w/10,h/10,w-w/10,h-h/10);
 img.setImageBitmap(绘制刷新(null,0)); 
});
}
添加部件(3,function(){ }); 
 });
});
}
画笔设置.画笔模式=id;
按键染色(v);
 });
}
var tv8=Feis.JSONTextView({
 文本:lang("矩形","Rect",配置.语言),
 宽度:Feis.dip(119),
 高度:Feis.dip(35),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r2,
 阴影:当前主题.按键阴影
});
笔刷监听(tv8,2);

var tv9=Feis.JSONTextView({
 文本:lang("图像","Image",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(35),
 左边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r2,
 阴影:当前主题.按键阴影
});
笔刷监听(tv9,3);

var 按键染色=function(v){
 tv8.setBackgroundDrawable(Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)));
 tv9.setBackgroundDrawable(Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)));
 if(v!=null)v.setBackgroundDrawable(Feis.jb(Feis.recolor(当前主题.按键背色2),Feis.dip(当前主题.按键圆角)));
}

var la_r3=Feis.addLayout(la_r,0);
la_r3.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:-1,
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中")
})
);

var tv_0,
tv_1;
var 移除部件=function(id,run){
 if(tv_1==null||tv_0==null||画笔设置.画笔模式!=id){
run();
return ;
 }
 Feis.动画监听(id==2?Feis.水平动画(tv_1,0,-100,200):Feis.水平动画(tv_0,0,100,200),function(){
Feis.viewShow(id==2?tv_1:tv_0,8);
Feis.动画监听(Feis.垂直动画(la_r3,0,-100,300),function(){
la_r3.removeAllViews();
if(run!=null)run();
});
 });
}
var 添加部件=function(id,run){
 la_r3.removeAllViews();
 矩形.重置();
 过程=0;
 img.setImageBitmap(获取刷新());
 
 tv_0=Feis.JSONTextView({
文本:lang("重置","Reset",配置.语言),
宽度:Feis.dip(117),
高度:Feis.dip(35),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(Feis.recolor(当前主题.按键背色2),Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la_r3,
阴影:当前主题.按键阴影,
监听:function(){
Feis.动画监听(Feis.淡入动画(tv_0,100,0,500),function(){
 if(id==2){
矩形.重置();
过程=0;
img.setImageBitmap(获取刷新());
Feis.淡入动画(tv_0,0,100,400);
 }
 if(id==3){
矩形.重置();
过程=0;
img.setImageBitmap(获取刷新());
Feis.淡入动画(tv_0,0,100,400);
 }
});
}
 });
 
 tv_1=Feis.JSONTextView({
文本:lang("确认","Ok",配置.语言),
宽度:Feis.dip(117),
高度:Feis.dip(35),
左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(Feis.recolor(当前主题.按键背色2),Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la_r3,
阴影:当前主题.按键阴影,
监听:function(){ 
if(id==2){
 面画.绘制圆角矩形(矩形.左,矩形.上,矩形.右,矩形.下,画笔设置.矩形圆角,画笔设置.矩形圆角);
 矩形.重置();
 过程=0;
 img.setImageBitmap(获取刷新());
}
if(id==3){
 面画.绘制图片(bitmap,new Feis.Rect(0,0,bitmap.getWidth(),bitmap.getHeight()),new Feis.RectF(矩形.左,矩形.上,矩形.右,矩形.下));
 img.setImageBitmap(获取刷新());
}
移除部件(id,function(){按键染色();});
画笔设置.画笔模式=0;
面画.保存();
tv3.setText(lang("撤销:","Undo:",配置.语言)+(面画.撤销索引()-1));
tv4.setText(lang("重做:","Redo:",配置.语言)+(面画.撤销长度()-面画.撤销索引()));
}
 });
 
 Feis.viewShow(id==2?tv_1:tv_0,8);
 Feis.动画监听(Feis.垂直动画(la_r3,-100,0,400,0),function(){
if(id==2){
Feis.viewShow(tv_1,1);
Feis.水平动画(tv_1,-100,0,500);
}else{
Feis.viewShow(tv_0,1);
Feis.水平动画(tv_0,100,0,500);
}
 });
}

var la_r4=Feis.addLayout(la_r,0);
la_r4.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(60),
 上边距:Feis.dip(8),
 位置重心:Feis.getGravity("居中")
})
);

var tv16=Feis.JSONTextView({
 文本:lang("取消","Cancel",配置.语言),
 宽度:Feis.dip(119),
 高度:Feis.dip(48),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r4,
 阴影:当前主题.按键阴影,
 监听:function(){
win.dismiss();
 }
});

var tv17=Feis.JSONTextView({
 文本:lang("确认","Ok",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(48),
 左边距:Feis.dip(1),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r4,
 阴影:当前主题.按键阴影,
 监听:function(){
获取刷新(true);
run();
win.dismiss();
 }
});
}catch(e){Feis.报错(e)}
 });
}

//～～～～～～～～～～～～～～～～～～～～～～

function 悬浮预览(){
var win=null,
img=null;
this.show=function(x,y){
 Feis.UiT(function(){
var winArray=Feis.addWindow2(Feis.ys(255,0,255,255,-1),x,y,Feis.dip(120),Feis.dip(120),false,true);
win=winArray[0];
var layout=winArray[1];
img=Feis.JSONImageView({
位图:null,
宽度:Feis.dip(110),
高度:Feis.dip(110),
上边距:Feis.dip(5),
左边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
背景绘图:画背景(Feis.dip(110),Feis.dip(110)),
布局:layout
});
 });
}

this.updateImage=function(bmp,x,y,px,py,a){
 if(a==0){this.open(px,py);}
 if(bmp!=null&&a==2){
Feis.UiT(function(){
var p=0,
w=bmp.getWidth(),
h=bmp.getHeight();
if(w-h>=0){
 p=w/4;
 p=p>h?h:p;
}else{
 p=h/4;
 p=p>w?w:p;
}
x=x-p/2; 
y=y-p/2; 
x=(x<0?0:x>w-p?w-p:x); 
y=(y<0?0:y>h-p?h-p:y);
if(win!=null)win.update(px,py,-1,-1);
if(img!=null)
 img.setImageBitmap(Feis.绘图.裁剪(bmp,x,y,p,p));
});
 }
 if(a==1)this.dismiss();
}

this.dismiss=function(){
 if(win!=null){
win.dismiss();
win=null;
 }
}

this.open=function(x,y){
 if(win==null)this.show(x==null?0:x,y==null?0:y);
}
}


//～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～

var 主页窗口=null;

function 主页(){
Feis.UiT(function(){
 var winArray=Feis.addWindow2(
 当前主题.背景颜色==null?获取壁纸():
 画线(800,900,当前主题.背景线数,当前主题.背景线条,当前主题.背景颜色,当前主题.线条类型),Feis.dp(1,10),Feis.dp(3,10),Feis.dip(300),Feis.dp(3,980),false,true);
 主页窗口=winArray[0];
 var layout=winArray[1];
 try{
首页(layout);
 }catch(e){Feis.报错(e)}
});
}

//～～～～～～～～～～～～～

function 首页(la){
la.removeAllViews()
var tv=Feis.JSONTextView({
 文本:lang("你想做什么","What do you want to do?",配置.语言),
 宽度:Feis.dip(296),
 高度:Feis.dip(45),
 上边距:0,
 文本大小:14,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,[Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角),Feis.dip(当前主题.标题圆角)]),
 文本重心:Feis.getGravity("居中"),
 位置重心:Feis.getGravity("居中"),
 布局:la,
 阴影:当前主题.标题阴影,
 监听:function(v){
主页窗口.dismiss();
主页窗口=null;
}
});

var la0=Feis.addLayout(la,1);
la0.setLayoutParams(
Feis.JSONParams({
 宽度:Feis.dip(120),
 高度:Feis.dip(285),
 位置重心:Feis.getGravity("居中")
})
);

var tv1=Feis.JSONTextView({
 文本:lang("创建图像","Create an image",配置.语言),
 宽度:Feis.dip(110),
 高度:Feis.dip(35),
 上边距:Feis.dip(20),
 位置重心:Feis.getGravity("居中"),
 文本大小:12,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
创建图像(la);
 }
});

var tv2=Feis.JSONTextView({
 文本:lang("相册选择","Form albums",配置.语言),
 宽度:Feis.dip(110),
 高度:Feis.dip(35),
 上边距:Feis.dip(20),
 位置重心:Feis.getGravity("居中"),
 文本大小:12,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
图片选择器(true,function(path){
var size=Feis.getImageFileSize(path);
var s=(size[0]>size[1]?size[0]:size[1]);
if(s>500){
 尺寸选择(path,function(bmp){
 编辑菜单(new Feis.绘画(bmp)); 
});
}else{
编辑菜单(new Feis.绘画(Feis.getSdcardBitmap(path)));
}
主页窗口.dismiss();
主页窗口=null;
 });
}
});

var tv3=Feis.JSONTextView({
 文本:lang("文件选择","Form files",配置.语言),
 宽度:Feis.dip(110),
 高度:Feis.dip(35),
 上边距:Feis.dip(20),
 位置重心:Feis.getGravity("居中"),
 文本大小:12,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
文件选择器(null,function(p){
var size=Feis.getImageFileSize(p);
var s=(size[0]>size[1]?size[0]:size[1]);
if(s>500){
 尺寸选择(p,function(bmp){
编辑菜单(new Feis.绘画(bmp)); 
 });
}else{
 编辑菜单(new Feis.绘画(Feis.getSdcardBitmap(path)));
}
主页窗口.dismiss();
主页窗口=null;
},[".png",".jpg",".jpeg"]);
 }
});

var tv4=Feis.JSONTextView({
 文本:lang("历史印画","Print history",配置.语言),
 宽度:Feis.dip(110),
 高度:Feis.dip(35),
 上边距:Feis.dip(20),
 位置重心:Feis.getGravity("居中"),
 文本大小:12,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,阴影:
 当前主题.按键阴影,
 监听:function(){
文件选择器(历史目录,function(p){
编辑菜单(new Feis.绘画(Feis.getSdcardBitmap(p)));
主页窗口.dismiss();
主页窗口=null;
},[".png",".jpg",".jpeg"]);
 }
});

var tv5=Feis.JSONTextView({
 文本:lang("什么也不做！","Don't do anything",配置.语言),
 宽度:Feis.dip(110),
 高度:Feis.dip(35),
 上边距:Feis.dip(20),
 位置重心:Feis.getGravity("居中"),
 文本大小:12,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
主页窗口.dismiss();
主页窗口=null;
 }
});
}

//～～～～～～～～～～～～

function 创建图像(la){
try{
 la.removeAllViews()
 var w=200,
h=200;
 var color=Feis.ys(255,200,200,200);
 var 图=new Feis.绘画(w,h);
图.绘制颜色(color);
 var 更新颜色=function(){
图.新建(w,h);
图.绘制颜色(color);
 }
 
 var tv=Feis.JSONTextView({
文本:lang("🔙创建图像的宽高","🔙Create images high and wide",配置.语言),
宽度:Feis.dip(292),
高度:Feis.dip(45),
上边距:0,
文本大小:15,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,[Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角),Feis.dip(当前主题.标题圆角)]),
文本重心:Feis.getGravity("居中"),
位置重心:Feis.getGravity("居中"),
布局:la,
阴影:当前主题.标题阴影,
监听:function(v){
首页(la);
}
 });
 
 var img=Feis.JSONImageView({
位图:图.getBitmap(),
宽度:Feis.dip(130),
高度:Feis.dip(130),
上边距:Feis.dip(8),
位置重心:Feis.getGravity("居中"),
背景绘图:画背景(Feis.dip(120),Feis.dip(120)),
布局:la,
阴影:当前主题.按键阴影,
监听:function(){
颜色选择器(color,function(c){
 color=c;
 tv0.setText(Feis.Color_toHex(color));
 tv0.setTextColor(Feis.Color_alpha(Feis.recolor(color),255));
 tv0.setBackgroundDrawable(Feis.jb(color,Feis.dip(5)));
 更新颜色();
 img.setImageBitmap(图.getBitmap());
});
}
 });
 
 var tv=Feis.JSONTextView({
文本:lang("尺寸:","Size:",配置.语言)+w+"*"+h,
宽度:Feis.dip(120),
高度:Feis.dip(15),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.提示颜色,
背景绘图:Feis.jb(Feis.ys(20,100,200,255),Feis.dip(10)),
文本重心:Feis.getGravity("居中"),
布局:la
 });
 
 var jsb=Feis.JSONSeekBar({
进度:w,
最大进度:620,
进度颜色:Feis.ys(255,255,100,150),
宽度:Feis.dip(280),
高度:Feis.dip(30),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(p,is){
w=p+100;
img.setImageBitmap(图.缩放(w,h,true));
tv.setText(lang("尺寸:","size:",配置.语言)+w.doString()+"*"+h.doString());
}
 });
 
 var jsb2=Feis.JSONSeekBar({
进度:h,
最大进度:620,
进度颜色:Feis.ys(255,255,100,150),
宽度:Feis.dip(280),
高度:Feis.dip(30),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(p,is){
h=p+100;
img.setImageBitmap(图.缩放(w,h,true));
tv.setText(lang("尺寸:","size:",配置.语言)+w.doString()+"*"+h.doString());
}
 });
 
 
 var la1=Feis.addLayout(la,0);
la1.setLayoutParams(
 Feis.JSONParams({
宽度:Feis.dip(280),
高度:Feis.dip(52),
上边距:Feis.dip(10),
位置重心:Feis.getGravity("居中")
 })
);

 var tv0=Feis.JSONTextView({
文本:Feis.Color_toHex(color),
宽度:Feis.dip(100),
高度:Feis.dip(38),
上边距:Feis.dip(2),
左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:Feis.recolor(color),
背景绘图:Feis.jb(color,Feis.dip(1)),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(){
颜色选择器(color,function(c){
 color=c;
 tv0.setText(Feis.Color_toHex(color));
 tv0.setTextColor(Feis.Color_alpha(Feis.recolor(color),255));
 tv0.setBackgroundDrawable(Feis.jb(color,Feis.dip(5)));
 更新颜色();
 img.setImageBitmap(图.getBitmap());
});
}
 });


 var tv1=Feis.JSONTextView({
文本:lang("取消","Cancel",配置.语言),
宽度:Feis.dip(85),
高度:Feis.dip(38),
上边距:Feis.dip(2),
左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(){
首页(la);
}
 });
 
 var tv2=Feis.JSONTextView({
文本:lang("创建","Create",配置.语言),
宽度:Feis.dip(85),
高度:Feis.dip(38),
上边距:Feis.dip(2),
左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(){
图.缩放(w,h);
编辑菜单(图);
首页(la);
}
 });
}catch(e){Feis.报错(e)}
}

//～～～～～～～～～～～

function 编辑菜单(画){
 var 关窗限定=0;
var width=画.getWidth(),
height=画.getHeight();
var w=width,
h=height,
size=50,
x=w/2,
y=h/2;
Feis.UiT(function(){
 var winArray=Feis.addWindow2(
 当前主题.编辑背色==null?获取壁纸():
 画线(1400,800,当前主题.编辑线数,当前主题.编辑线条,当前主题.编辑背色,当前主题.线条类型),Feis.dp(1,10),Feis.dp(3,10),Feis.dip(600),Feis.dp(3,980),false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
var la=Feis.addLayout(layout,0);
la.setLayoutParams(
Feis.JSONParams({
 宽度:-2,
 高度:-2,
 位置重心:Feis.getGravity("居中")
})
);

var la_l=Feis.addLayout(la,1);
 la_l.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(320),
高度:-2,
位置重心:Feis.getGravity("居中")
})
 );

var img=Feis.JSONImageView({
位图:画.getBitmap(),
宽度:Feis.dip(300),
高度:Feis.dip(300),
上边距:Feis.dip(12),
位置重心:Feis.getGravity("居中"),
背景绘图:画背景(Feis.dip(300),Feis.dip(300)),
布局:la_l
});

var tv=Feis.JSONTextView({
文本:lang("尺寸: ","Size: ",配置.语言)+w+"x"+h,
宽度:Feis.dip(280),
高度:Feis.dip(30),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.提示颜色,
背景绘图:Feis.jb(Feis.ys(0,100,200,255),Feis.dip(10)),
文本重心:Feis.getGravity("居中"),
布局:la_l
});

var la_r=Feis.addLayout(la,1);
 la_r.setLayoutParams(
Feis.JSONParams({
宽度:-2,
高度:-2,
位置重心:Feis.getGravity("居中")
})
 );

var la_r1=Feis.addLayout(Feis.addScroll(la_r,0,
Feis.JSONParams({
 宽度:-2,
 高度:Feis.dp(3,900),
 上边距:Feis.dip(12),
 位置重心:Feis.getGravity("居中")
}))[0]);
la_r1.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:-2,
位置重心:Feis.getGravity("居中")
})
 );

var tv0=Feis.JSONTextView({
文本:lang("文本","Text",配置.语言),
宽度:Feis.dip(200),
高度:Feis.dip(40),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角1)),
文本重心:Feis.getGravity("居中"),
布局:la_r1,
阴影:当前主题.按键阴影,
监听:function(){
 Feis.getEditText(lang("请输入文本","Input text",配置.语言),function(str,is){
if(!is&&!str.isEmpty()){
添加文本(画,str,function(){
 img.setImageBitmap(画.getBitmap());
});
}
 });
}
});
 
var tv1=Feis.JSONTextView({
文本:lang("绘画","Paint",配置.语言),
宽度:Feis.dip(200),
高度:Feis.dip(40),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角1)),
文本重心:Feis.getGravity("居中"),
布局:la_r1,
阴影:当前主题.按键阴影,
监听:function(){
 添加绘画(画,function(){
img.setImageBitmap(画.getBitmap());
 });
}
});

var tv2=Feis.JSONTextView({
文本:lang("编辑","Edit",配置.语言),
宽度:Feis.dip(200),
高度:Feis.dip(40),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角1)),
文本重心:Feis.getGravity("居中"),
布局:la_r1,
阴影:当前主题.按键阴影,
监听:function(){
 关窗限定=1;
 编辑图像(画,function(h){
 if(h!=null){
画=h;
width=画.getWidth(),
height=画.getHeight();
w=width,
h=height,
tv.setText(lang("尺寸: ","Size: ",配置.语言)+w+"x"+h);
img.setImageBitmap(画.getBitmap());
}
关窗限定=0;
 });
}
});

var tv3=Feis.JSONTextView({
文本:lang("分享","Share",配置.语言),
宽度:Feis.dip(200),
高度:Feis.dip(40),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角1)),
文本重心:Feis.getGravity("居中"),
布局:la_r1,
阴影:当前主题.按键阴影,
监听:function(){
 ppp(lang("§e加载中...","§eLoading...",配置.语言));
var p=配置目录+"/像素印画(编辑).png";
var file=new Feis.File(p);
if(file.exists())file.delete()
 画.另存(p);
 var intent=new android.content.Intent();
//intent.setComponent(new android.content.ComponentName("com.tencent.mm","com.tencent.mm.ui.tools.ShareImgUI"));
intent.setAction("android.intent.action.SEND");
intent.setType("image/*"); /**/
intent.putExtra(android.content.Intent.EXTRA_TEXT,"分享");
intent.putExtra(android.content.Intent.EXTRA_STREAM, android.net.Uri.fromFile(new Feis.File(p)));
ctx.startActivity(intent);
}
});

var tv16=Feis.JSONTextView({
文本:lang("另存","Save",配置.语言),
宽度:Feis.dip(200),
高度:Feis.dip(40),
上边距:Feis.dip(15),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la_r1,
阴影:当前主题.按键阴影,
监听:function(){
 try{
ppp(lang("仅保存为.jpg/.png",".jg/.png",配置.语言));
Feis.getEditText(lang("输入图片名称","Input image name",配置.语言),function(str,is){
if(!is&&str!=""){
 文件选择器(null,function(file){
var p=file.getPath();
if(str.indexOf(".png")==-1)str+=".png";
if(new java.io.File(p+"/"+str).exists()){
return ;
ppp(lang("文件已存在","File existsed",配置.语言));
}
画.另存(p+"/"+str);
Feis.ts(lang("图像已保存到:","Saved image do:",配置.语言)+p+"/"+str); 
 },"目录");
}
});
 }catch(e){Feis.报错(e);}
}
});

var la_r3=Feis.addLayout(la_r1,0);
 la_r3.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:Feis.dip(70),
上边距:Feis.dip(10),
位置重心:Feis.getGravity("居中")
})
 );
 
var tv16=Feis.JSONTextView({
文本:lang("取消","Cancel",配置.语言),
宽度:Feis.dip(99),
高度:Feis.dip(58),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:14,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la_r3,
阴影:当前主题.按键阴影,
监听:function(){
if(关窗限定==0){
win.dismiss();
}else{
ppp(lang("请先关闭上层窗口","Please first close top window ",配置.语言));
}
 }
});

var tv17=Feis.JSONTextView({
文本:lang("确认","Ok",配置.语言),
宽度:Feis.dip(99),
高度:Feis.dip(58),
左边距:Feis.dip(2),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:14,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la_r3,
阴影:当前主题.按键阴影,
监听:function(){
if(关窗限定==0){
 当前绘画=画;
 var bp=画.旋转(90,true)
 当前像素=画.解析(bp);
 当前宽度=bp.getWidth();
 当前高度=bp.getHeight();
 当前绘画.另存(历史目录+"/"+getTimeString()+".png");
 信息统计更新();
 if(当前模式<方块色系.length&&当前色系==null)当前色系=方块色系[当前模式];
 win.dismiss();
 ppp(lang("铁剑点地即可打印","Iron sword click on the block…",配置.语言)); 
 }else{
 ppp(lang("请先关闭上层窗口","Please first close top window",配置.语言));
 }
}
});
 }catch(e){Feis.报错(e)}
});
}

//～～～～～～～～～～～～～～～～～～～～～～～

var 文本设置={
画笔颜色:Feis.ys(255,255,0,0),
画笔颜色2:Feis.ys(255,0,0,255),
颜色角度:0,
背景颜色:Feis.ys(0,120,120,120),
背景颜色2:Feis.ys(0,120,120,120),
背景角度:0,
画笔类型:0,
画笔粗细:1,
边距x:0,
边距y:0,
字体倾斜:0,
字体角度:0,
字体缩放:0,
字体路径:"/system/fonts/DroidSansChinese.ttf"
};


function 添加文本(画,str,run){
Feis.UiT(function(){
 var w=画.getWidth(),
h=画.getHeight(),
size=40,
x=w/2,
y=h/2;
 var 矩形=new Feis.工具.矩形();
矩形.设定(x,y,w,h);
 var 画笔=new Feis.绘画.画笔(Feis.ys(255,255,0,0),0,1,size);
 var 解析=new Feis.绘画.字符解析(画笔,str);
 var 宽度=解析.width;
 var 高度=解析.height;
 var 行高=解析.lineHeight;
 var 阴影模糊=2;
 var 阴影偏移x=2;
 var 阴影偏移y=2;
 var 阴影颜色=Feis.ys(0,255,255,255);

 var 画文=new Feis.绘画(宽度,高度);
画文.绘制颜色(Feis.ys(0,0,0,0));

 var 更新画笔=function(isout){
画文.文本大小(size);
画文.画笔字体(文本设置.字体路径);
画文.字体缩放(文本设置.字体缩放);
解析=new Feis.绘画.字符解析(画文.getPaint(),str);
宽度=解析.width;
高度=解析.height;
行高=解析.lineHeight;
宽度+=文本设置.边距x;
高度+=文本设置.边距y;
画文.新建(宽度,高度);
画文.绘制颜色(Feis.ys(0,0,0,0));
画文.实心画笔(文本设置.背景颜色,false);
if(文本设置.背景颜色!=文本设置.背景颜色2)
画文.画笔渐变(0,0,宽度,高度,[文本设置.背景颜色,文本设置.背景颜色,文本设置.背景颜色,文本设置.背景颜色2,文本设置.背景颜色2,文本设置.背景颜色2],null,1,文本设置.背景角度);
画文.绘制矩形(0,0,宽度,高度);
if(!isout){
画文.onDraw(function(c){
 c.drawRect(0,0,宽度,高度,new Feis.绘画.画笔(Feis.ys(255,255,0,0),0,3,size)); 
});
}
if(文本设置.画笔类型==0){
 画文.空心画笔(文本设置.画笔颜色,true,文本设置.画笔粗细);
}else{
 画文.实心画笔(文本设置.画笔颜色,true,文本设置.画笔粗细);
}
if(文本设置.画笔颜色!=文本设置.画笔颜色2)
 画文.画笔渐变(0,0,宽度,行高,[文本设置.画笔颜色,文本设置.画笔颜色,文本设置.画笔颜色,文本设置.画笔颜色,文本设置.画笔颜色,文本设置.画笔颜色2,文本设置.画笔颜色2,文本设置.画笔颜色2,文本设置.画笔颜色2,文本设置.画笔颜色2],null,2,文本设置.颜色角度);
画文.文本大小(size);
画文.画笔字体(文本设置.字体路径);
画文.字体缩放(文本设置.字体缩放);
if(Feis.getAlpha(阴影颜色)>10)
 画文.画笔阴影(阴影模糊,阴影偏移x,阴影偏移y,阴影颜色);
 return Feis.绘图.旋转(Feis.绘图.倾斜(画文.绘制多行文本(str,解析.space,行高-解析.lineSpace,true),文本设置.字体倾斜,0),文本设置.字体角度);
 }

 var 绘制刷新=function(isout,is){
return 画.绘制图片(更新画笔(isout),矩形.左,矩形.上,!is);
 }

 var winArray=Feis.addWindow2(
 当前主题.编辑背色==null?获取壁纸():
 画线(1400,800,当前主题.编辑线数,当前主题.编辑线条,当前主题.编辑背色,当前主题.线条类型),Feis.dp(1,10),Feis.dp(3,10),Feis.dip(600),Feis.dp(3,980),false,true);
 var win=winArray[0];
 var layout=winArray[1];
try{
var la=Feis.addLayout(layout,0);
la.setLayoutParams(
Feis.JSONParams({
 宽度:-2,
 高度:-2,
 位置重心:Feis.getGravity("居中")
})
);

var la_l=Feis.addScroll(la,0,
 Feis.JSONParams({
 宽度:Feis.dip(320),
 高度:Feis.dp(3,978),
 位置重心:Feis.getGravity("居中")
 }))[0];

var img=Feis.JSONImageView({
 位图:绘制刷新(),
 宽度:Feis.dip(280),
 高度:Feis.dip(280),
 上边距:Feis.dip(10),
 位置重心:Feis.getGravity("居中"),
 背景绘图:画背景(Feis.dip(300),Feis.dip(300)),
 布局:la_l,
 触摸:function(e,a){
var xy=Feis.getImageViewXY(w,h,img.getWidth(),img.getHeight(),e.getX(),e.getY());
x=xy[0];
y=xy[1];
if(a==0)矩形.位移标记(x,y);
if(a==2){矩形.标记位移(x,y);
img.setImageBitmap(绘制刷新());
}
return true;
 }
}); 

var tv=Feis.JSONTextView({
 文本:lang("请触摸文字移动到想要的位置","Drag the text setting position",配置.语言),
 宽度:Feis.dip(280),
 高度:Feis.dip(30),
 上边距:Feis.dip(5),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.提示颜色,
 背景绘图:Feis.jb(Feis.ys(0,100,200,255),Feis.dip(10)),
 文本重心:Feis.getGravity("居中"),
 布局:la_l
});

var la_r=Feis.addLayout(Feis.addScroll(la,0,
 Feis.JSONParams({
宽度:-2,
高度:Feis.dp(3,970),
位置重心:Feis.getGravity("居中")
 }))[0]);
 
la_r.setLayoutParams(
Feis.JSONParams({
 宽度:-2,
 高度:-1,
 位置重心:Feis.getGravity("居中")
})
);
 
var la_r0=Feis.addLayout(la_r,0);
la_r0.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 位置重心:Feis.getGravity("居中"),
 上边距:Feis.dip(10)
})
);

var tv0=Feis.JSONTextView({
 文本:str,
 宽度:Feis.dip(178),
 高度:Feis.dip(35),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r0,
 阴影:当前主题.按键阴影,
 监听:function(){
Feis.getEditText(lang("请输入文本","Input text",配置.语言),function(string,is){
if(!is&&!string.isEmpty()){
 str=string;tv0.setText(str);
 img.setImageBitmap(绘制刷新()); 
}
},str);
 }
});

var tv00=Feis.JSONTextView({
 文本:文本设置.画笔类型==0?lang("空心","Stroke",配置.语言):lang("实心","Fill",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 左边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r0,
 阴影:当前主题.按键阴影,
 监听:function(){
文本设置.画笔类型=(文本设置.画笔类型==0?1:0);
tv00.setText(文本设置.画笔类型==0?lang("空心","Stroke",配置.语言):lang("实心","Fill",配置.语言));
img.setImageBitmap(绘制刷新());
 }
});

var la_r1=Feis.addLayout(la_r,0);
la_r1.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中")
})
);

var tv1=Feis.JSONTextView({
 文本:lang("字体颜色:\n","Text color:\n",配置.语言)+Feis.Color_toHex(文本设置.画笔颜色),
 宽度:Feis.dip(98),
 高度:Feis.dip(40),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:Feis.recolor(文本设置.画笔颜色),
 背景绘图:Feis.jb(文本设置.画笔颜色,Feis.dip(0)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r1,
 阴影:当前主题.按键阴影,
 监听:function(){
颜色选择器(文本设置.画笔颜色,function(color){
文本设置.画笔颜色=color;
tv1.setText(lang("字体颜色:\n","Text color:\n",配置.语言)+Feis.Color_toHex(文本设置.画笔颜色));
tv1.setTextColor(Feis.Color_alpha(Feis.recolor(文本设置.画笔颜色),255));
tv1.setBackgroundColor(文本设置.画笔颜色);
img.setImageBitmap(绘制刷新());
});
 }
});

var tv2=Feis.JSONTextView({
 文本:lang("字体颜色2:\n","Text color2:\n",配置.语言)+Feis.Color_toHex(文本设置.画笔颜色2),
 宽度:Feis.dip(98),
 高度:Feis.dip(40),
 左边距:Feis.dip(1),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:Feis.recolor(文本设置.画笔颜色2),
 背景绘图:Feis.jb(文本设置.画笔颜色2,Feis.dip(0)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r1,
 阴影:当前主题.按键阴影,
 监听:function(){
颜色选择器(文本设置.画笔颜色2,function(color){
文本设置.画笔颜色2=color;
tv2.setText(lang("字体颜色2:\n","Text color2:\n",配置.语言)+Feis.Color_toHex(文本设置.画笔颜色2));
tv2.setTextColor(Feis.Color_alpha(Feis.recolor(文本设置.画笔颜色2),255));
tv2.setBackgroundColor(文本设置.画笔颜色2);
img.setImageBitmap(绘制刷新());
});
 }
});

var tv3=Feis.JSONTextView({
 文本:lang("同色","With",配置.语言),
 宽度:Feis.dip(40),
 高度:Feis.dip(40),
 左边距:Feis.dip(1),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r1,
 阴影:当前主题.按键阴影,
 监听:function(){
文本设置.画笔颜色2=文本设置.画笔颜色;
tv2.setText(lang("字体颜色2:\n","Text color2:\n",配置.语言)+Feis.Color_toHex(文本设置.画笔颜色2));
tv2.setTextColor(Feis.Color_alpha(Feis.recolor(文本设置.画笔颜色2),255));
tv2.setBackgroundColor(文本设置.画笔颜色2);
img.setImageBitmap(绘制刷新());
 }
});

var tv4=Feis.JSONTextView({
 文本:lang("渐变角度:","Gradient angle:",配置.语言)+文本设置.颜色角度,
 宽度:Feis.dip(240),
 高度:Feis.dip(22),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb=Feis.JSONSeekBar({
 进度:文本设置.颜色角度,
 最大进度:360,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.颜色角度=p;
tv4.setText(lang("渐变角度:","Gradient angle:",配置.语言)+文本设置.颜色角度);
img.setImageBitmap(绘制刷新());
 }
});

var la_r2=Feis.addLayout(la_r,0);
la_r2.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
})
);

var tv5=Feis.JSONTextView({
 文本:lang("背景颜色:\n","Background color:\n",配置.语言)+Feis.Color_toHex(文本设置.背景颜色),
 宽度:Feis.dip(98),
 高度:Feis.dip(40),
 边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:Feis.Color_alpha(Feis.recolor(文本设置.背景颜色),255),
 背景绘图:Feis.jb(文本设置.背景颜色,Feis.dip(0)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r2,
 阴影:当前主题.按键阴影,
 监听:function(){
颜色选择器(文本设置.背景颜色,function(color){
文本设置.背景颜色=color;
tv5.setText(lang("背景颜色;\n","Background color:\n",配置.语言)+Feis.Color_toHex(文本设置.背景颜色));
tv5.setTextColor(Feis.Color_alpha(Feis.recolor(文本设置.背景颜色),255));
tv5.setBackgroundColor(文本设置.背景颜色);
img.setImageBitmap(绘制刷新());
});
 }
});

var tv6=Feis.JSONTextView({
 文本:lang("背景颜色2:\n","Background color2:\n",配置.语言)+Feis.Color_toHex(文本设置.背景颜色2),
 宽度:Feis.dip(98),
 高度:Feis.dip(40),
 左边距:Feis.dip(1),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:Feis.Color_alpha(Feis.recolor(文本设置.背景颜色2),255),
 背景绘图:Feis.jb(文本设置.背景颜色2,Feis.dip(0)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r2,
 阴影:当前主题.按键阴影,
 监听:function(){
颜色选择器(文本设置.背景颜色2,function(color){
文本设置.背景颜色2=color;
tv6.setText(lang("背景颜色2:\n","background color2:\n",配置.语言)+Feis.Color_toHex(文本设置.背景颜色2));
tv6.setTextColor(Feis.Color_alpha(Feis.recolor(文本设置.背景颜色2),255));
tv6.setBackgroundColor(文本设置.背景颜色2);
img.setImageBitmap(绘制刷新());
});
 }
});

var tv7=Feis.JSONTextView({
 文本:lang("同色","With",配置.语言),
 宽度:Feis.dip(40),
 高度:Feis.dip(40),
 左边距:Feis.dip(1),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r2,
 阴影:当前主题.按键阴影,
 监听:function(){
文本设置.背景颜色2=文本设置.背景颜色;
tv6.setText(lang("背景颜色:2\n","Background color2:\n",配置.语言)+Feis.Color_toHex(文本设置.背景颜色2));
tv6.setTextColor(Feis.Color_alpha(Feis.recolor(文本设置.背景颜色2),255));
tv6.setBackgroundColor(文本设置.背景颜色2);
img.setImageBitmap(绘制刷新());
 }
});

var tv8=Feis.JSONTextView({
 文本:lang(" 渐变角度:"," Gradient angle:",配置.语言)+文本设置.背景角度,
 宽度:Feis.dip(240),
 高度:Feis.dip(22),
 左边距:Feis.dip(0),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb1=Feis.JSONSeekBar({
 进度:文本设置.背景角度,
 最大进度:360,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 监听:function(p,is){
文本设置.背景角度=p;
tv8.setText(lang(" 渐变角度:"," Gradient angle:",配置.语言)+文本设置.背景角度);
img.setImageBitmap(绘制刷新());
 }
});

var tv9=Feis.JSONTextView({
 文本:lang(" 文本大小:"," Text size:",配置.语言)+size,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 左边距:Feis.dip(0),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb2=Feis.JSONSeekBar({
 进度:size,
 最大进度:w,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
size=p>1?p:2;
tv9.setText(lang(" 字体大小:"," Text size:",配置.语言)+size);
img.setImageBitmap(绘制刷新());
 }
});

var tv10=Feis.JSONTextView({
 文本:lang(" 字体粗细:"," Text stroke:",配置.语言)+文本设置.画笔粗细,宽度:Feis.dip(240),
 高度:Feis.dip(25),
 左边距:Feis.dip(0),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb3=Feis.JSONSeekBar({
 进度:文本设置.画笔粗细,
 最大进度:20,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.画笔粗细=p;
tv10.setText(lang(" 字体粗细:"," Text stroke:",配置.语言)+文本设置.画笔粗细);
img.setImageBitmap(绘制刷新());
 }
});

var tv11=Feis.JSONTextView({
 文本:lang(" 水平缩放:"," Scale-X:",配置.语言)+文本设置.字体缩放,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb4=Feis.JSONSeekBar({
 进度:文本设置.字体缩放,
 最大进度:20,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.字体缩放=p;
tv11.setText(lang(" 水平缩放:"," Scale-X:",配置.语言)+文本设置.字体缩放);
img.setImageBitmap(绘制刷新());
 }
});

var tv12=Feis.JSONTextView({
 文本:lang(" 水平边距:"," Margin-X:",配置.语言)+文本设置.边距x,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb5=Feis.JSONSeekBar({
 进度:文本设置.边距x,
 最大进度:w,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.边距x=p;
tv12.setText(lang(" 水平边距:"," Margin-X:",配置.语言)+文本设置.边距x);
img.setImageBitmap(绘制刷新());
 }
});

var tv13=Feis.JSONTextView({
 文本:lang(" 垂直边距:"," Margin-Y:",配置.语言)+文本设置.边距y,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb6=Feis.JSONSeekBar({
 进度:文本设置.边距y,
 最大进度:h,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.边距y=p;
tv13.setText(lang(" 垂直边距:"," Margin-Y:",配置.语言)+文本设置.边距y);
img.setImageBitmap(绘制刷新());
 }
});

var tv14=Feis.JSONTextView({
 文本:lang(" 字体倾斜:"," Text skew:",配置.语言)+文本设置.字体倾斜.toFixed(2),
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb7=Feis.JSONSeekBar({
 进度:文本设置.字体倾斜+10,
 最大进度:20,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.字体倾斜=(p*0.1)-1;
img.setImageBitmap(绘制刷新());
tv14.setText(lang(" 字体倾斜:"," Text skew:",配置.语言)+文本设置.字体倾斜.toFixed(2));
 }
});

var tv15=Feis.JSONTextView({
 文本:lang(" 旋转:"," Rotate:",配置.语言)+文本设置.字体角度,
 宽度:Feis.dip(240),
 高度:Feis.dip(25),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("左中"),
 布局:la_r,
 阴影:当前主题.按键阴影
});

var jsb8=Feis.JSONSeekBar({
 进度:文本设置.字体角度,
 最大进度:360,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(240),
 高度:Feis.dip(30),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
文本设置.字体角度=p;
tv15.setText(lang(" 旋转:"," Rotate:",配置.语言)+文本设置.字体角度);
img.setImageBitmap(绘制刷新());
 }
});

var tv16=Feis.JSONTextView({
 文本:lang("当前字体:\n","Font:\n",配置.语言)+(文本设置.字体路径).substr((文本设置.字体路径).lastIndexOf("/")),
 宽度:Feis.dip(240),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(0)),文本重心:Feis.getGravity("居中"),
 布局:la_r,
 阴影:当前主题.按键阴影,
 监听:function(){
文件选择器(null,function(file){
文本设置.字体路径=file.getPath();
tv16.setText(lang("当前字体:\n","Font:\n",配置.语言)+(文本设置.字体路径).substr((文本设置.字体路径).lastIndexOf("/")));
img.setImageBitmap(绘制刷新()); 
},".ttf");
 }
});

var la_r3=Feis.addLayout(la_r,0);
la_r3.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(45),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中")
})
);

var tv17=Feis.JSONTextView({
 文本:lang("阴影颜色:\n","Text color:\n",配置.语言)+Feis.Color_toHex(阴影颜色),
 宽度:Feis.dip(198),
 高度:Feis.dip(35),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:Feis.recolor(文本设置.画笔颜色),
 背景绘图:Feis.jb(文本设置.画笔颜色,Feis.dip(0)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r3,
 阴影:当前主题.按键阴影,
 监听:function(){
颜色选择器(阴影颜色,function(color){
阴影颜色=color;
tv17.setText(lang("阴影颜色:\n","Shadow color:\n",配置.语言)+Feis.Color_toHex(阴影颜色));
tv17.setTextColor(Feis.Color_alpha(Feis.recolor(阴影颜色),255));
tv17.setBackgroundColor(阴影颜色);
if(Feis.getAlpha(阴影颜色)>10&&la_r4.getChildCount()==0){
 阴影选项卡(la_r4);
 ppp(lang("\n§7只有文本的颜色相同，阴影的颜色才能生效\n","Only text color is the same, the shadow color to be effective",配置.语言)); 
}
img.setImageBitmap(绘制刷新());
});
 }
});

var tv18=Feis.JSONTextView({
 文本:lang("关闭","Close",配置.语言),
 宽度:Feis.dip(40),
 高度:Feis.dip(35),
 左边距:Feis.dip(1),
 上边距:Feis.dip(1),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r3,
 阴影:当前主题.按键阴影,
 监听:function(){
阴影颜色=Feis.Color_alpha(阴影颜色,0);
tv17.setText(lang("阴影颜色:\n","Shadow color2:\n",配置.语言)+Feis.Color_toHex(阴影颜色));
tv17.setTextColor(Feis.Color_alpha(Feis.recolor(阴影颜色),255));
tv17.setBackgroundColor(阴影颜色);
关闭阴影选项卡();
img.setImageBitmap(绘制刷新());
 }
});

var la_r4=Feis.addLayout(la_r,1);
la_r4.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:-1,
 位置重心:Feis.getGravity("居中")
})
);

var 关闭阴影选项卡=function(){
 la_r4.removeAllViews();
}

var 阴影选项卡=function(la){
 var tv19=Feis.JSONTextView({
文本:lang(" 阴影模糊:"," Shadow blur:",配置.语言)+阴影模糊.toFixed(1),
宽度:Feis.dip(220),
高度:Feis.dip(25),
位置重心:11,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
文本重心:Feis.getGravity("左中"),
布局:la
 });
 
 var jsb9=Feis.JSONSeekBar({
进度:阴影模糊*10,
最大进度:300,
进度颜色:Feis.ys(255,255,100,150),
宽度:Feis.dip(220),
高度:Feis.dip(30),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
布局:la,
阴影:当前主题.按键阴影,
监听:function(p,is){
阴影模糊=p*0.1+0.1;
tv19.setText(lang(" 阴影模糊:"," Shadow blur:",配置.语言)+阴影模糊.toFixed(1));
img.setImageBitmap(绘制刷新());
}
 });
 
 var tv20=Feis.JSONTextView({
文本:lang(" 阴影水平偏移:"," Shadow offset-X:",配置.语言)+阴影偏移x.toFixed(1),
宽度:Feis.dip(220),
高度:Feis.dip(25),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
文本重心:Feis.getGravity("左中"),
布局:la
 });
 
 var jsb10=Feis.JSONSeekBar({
进度:(阴影偏移x+20)*10,
最大进度:400,
进度颜色:Feis.ys(255,255,100,150),
宽度:Feis.dip(220),
高度:Feis.dip(30),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
布局:la,
监听:function(p,is){
阴影偏移x=p*0.1-20;
tv20.setText(lang(" 阴影水平偏移:"," Shadow offset-X:",配置.语言)+阴影偏移x.toFixed(1));
img.setImageBitmap(绘制刷新());
}
 });
 
 var tv21=Feis.JSONTextView({
文本:lang(" 阴影垂直偏移:"," Shadow offset-Y:",配置.语言)+阴影偏移y.toFixed(1),
宽度:Feis.dip(220),
高度:Feis.dip(25),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
文本重心:Feis.getGravity("左中"),
布局:la
 });
 
 var jsb11=Feis.JSONSeekBar({
进度:(阴影偏移y+20)*10,
最大进度:400,
进度颜色:Feis.ys(255,255,100,150),
宽度:Feis.dip(220),
高度:Feis.dip(30),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
布局:la,
监听:function(p,is){
阴影偏移y=p*0.1-20;
tv21.setText(lang(" 阴影垂直偏移:"," Shadow offset-Y:",配置.语言)+阴影偏移y.toFixed(1));
img.setImageBitmap(绘制刷新());
}
 });
}

var la_r6=Feis.addLayout(la_r,0);
la_r6.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:Feis.dip(52),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中")
})
 );
 
var tv25=Feis.JSONTextView({
 文本:lang("取消","Cancel",配置.语言),
 宽度:Feis.dip(118),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r6,
 阴影:当前主题.按键阴影,
 监听:function(){
win.dismiss();
 }
});

var tv26=Feis.JSONTextView({
 文本:lang("确认","Ok",配置.语言),
 宽度:Feis.dip(118),
 高度:Feis.dip(40),
 左边距:Feis.dip(1),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la_r6,
 阴影:当前主题.按键阴影,
 监听:function(){
绘制刷新(true,true);
run();
win.dismiss();
 }
});
}catch(e){Feis.报错(e)}
 });
}

//～～～～～～～～～～～～～～～～～～～～～～～

function 编辑图像(画,run){
Feis.UiT(function(){
 var pw=Feis.dip(300),
ph=Feis.dp(3,980);
 var w=画.getWidth(),
h=画.getHeight();
 var x=w/2,
y=h/2,
mode=0,
r=Math.max(w,h)/20;
 var 预览=new 悬浮预览();
 var 矩形=new Feis.工具.矩形();
矩形.设定(w/10,h/10,w-w/10,h-h/10);
 var 当前模式=1;
 var 画图=new Feis.绘画(画.getBitmap());
画图.空心画笔(当前主题.按键背色2,true,3);

 var 属性刷新=function(){
w=画图.getWidth();
h=画图.getHeight();
x=w/2;
y=h/2;
r=Math.max(w,h)/20;
矩形.设定(w/10,h/10,w-w/10,h-h/10);
 }

 var 更新画笔=function(a){
if(当前模式==1){
if(a==0){
 if(矩形.在内(x,y))mode=1;
 if(Feis.工具.判断圆内(x,y,矩形.右,矩形.下,r))mode=2;
 矩形.位移标记(x,y);
 画图.空心画笔(当前主题.按键背色2,true,3);
}
if(a==2){
 if(mode==1)矩形.标记位移(x,y);
 if(mode==2&&x<w&&y<h)矩形.右下(x,y); 
 矩形.禁止越界(0,0,w,h);
}
if(a==1)mode=0;
var b=画图.绘制矩形(矩形.左,矩形.上,矩形.右,矩形.下,true);
var p=Feis.绘画.画笔(Feis.Color_alpha(当前主题.按键背色2,180),1,1);
var 画布=Feis.绘画.画布(b);
p.setTextSize(r-r/4);
画布.drawCircle(矩形.右,矩形.下,r,p);
if(mode==1&&a==2){
画布.drawText(lang("位置:","Coord size:",配置.语言)+Math.floor(矩形.左)+","+Math.floor(矩形.上),r,r,p);
}
if(mode==2&&a==2){
画布.drawText(lang("画布:","Canvas size:",配置.语言)+w+"*"+h+lang(" 矩形:"," Rect size:",配置.语言)+Math.floor(矩形.宽度())+"*"+Math.floor(矩形.高度()),r,r,p);}
return b;
}
return 画图.getBitmap();
 }
 
 var 绘制刷新=function(isout,a){
return 更新画笔(a);
 }

 var winArray=Feis.addWindow2(
 当前主题.编辑背色==null?获取壁纸():
 画线(500,800,当前主题.编辑线数,当前主题.编辑线条,当前主题.编辑背色,当前主题.线条类型),Feis.dp(1,500)-pw/2,Feis.dp(3,10),pw,ph,false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
var img=Feis.JSONImageView({
位图:画.getBitmap(),
宽度:Feis.dip(250),
高度:Feis.dip(250),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
背景绘图:画背景(Feis.dip(300),Feis.dip(300)),
布局:layout,
触摸:function(e,a){ 
 var xy=Feis.getImageViewXY(w,h,img.getWidth(),img.getHeight(),e.getX(),e.getY());
 x=xy[0];
 y=xy[1];
 img.setImageBitmap(绘制刷新(true,a));
 return true;
}
}); 

var sa=Feis.addScroll(layout,0,
Feis.JSONParams({
 宽度:-2,
 高度:Feis.dp(3,980)-Feis.dip(257),
 左边距:Feis.dip(0),
 上边距:Feis.dip(0),
 位置重心:Feis.getGravity("居中")
}))[0];

var la=Feis.addLayout(sa,1);

var 操作菜单=function(){
la.removeAllViews();
var la0=Feis.addLayout(la,0);
la0.setLayoutParams(
Feis.JSONParams({
 宽度:Feis.dip(250),
 高度:Feis.dip(42),
 位置重心:Feis.getGravity("居中")
})
);

var tv0=Feis.JSONTextView({
文本:lang("裁剪","Cut",配置.语言),
宽度:Feis.dip(80),
高度:Feis.dip(35),
左边距:Feis.dip(2),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la0,
阴影:当前主题.按键阴影,
监听:function(){
 当前模式=1;
 img.setImageBitmap(绘制刷新(true,0));
 裁剪操作();
}
});

var tv1=Feis.JSONTextView({
文本:lang("翻转","Rotate",配置.语言),
宽度:Feis.dip(80),
高度:Feis.dip(35),
左边距:Feis.dip(2),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la0,
阴影:当前主题.按键阴影,
监听:function(){
 当前模式=2;
 镜像操作();
}
});

var tv2=Feis.JSONTextView({
文本:lang("缩放","Scale",配置.语言),
宽度:Feis.dip(80),
高度:Feis.dip(35),
左边距:Feis.dip(2),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la0,
阴影:当前主题.按键阴影,
监听:function(){
 当前模式=3
 缩放操作();
}
});

var la1=Feis.addLayout(la,0);
 la1.setLayoutParams(
Feis.JSONParams({
宽度:-1,
高度:Feis.dip(48),
左边距:Feis.dip(0),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中")
})
 );

var tv3=Feis.JSONTextView({
文本:lang("取消编辑","Edit cancel",配置.语言),
宽度:Feis.dip(120),
高度:Feis.dip(40),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(){
if(run!=null)run(null);
 win.dismiss();
}
});

var tv4=Feis.JSONTextView({
文本:lang("编辑完成","Edit complete",配置.语言),
宽度:Feis.dip(120),
高度:Feis.dip(40),
左边距:Feis.dip(3),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
文本重心:Feis.getGravity("居中"),
布局:la1,
阴影:当前主题.按键阴影,
监听:function(){
 if(run!=null)run(画图);
 win.dismiss();
}
});
}

//～～～～～～～～～～～～

操作菜单();

var 裁剪操作=function(){
la.removeAllViews();
var la1=Feis.addLayout(la,1);
la1.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(96),
 位置重心:Feis.getGravity("居中")
})
);

var tv3=Feis.JSONTextView({
 文本:lang("取消裁剪","Cut cancel",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la1,
 阴影:当前主题.按键阴影,
 监听:function(){
当前模式=0;
操作菜单();
img.setImageBitmap(画图.getBitmap());
 }
});

var tv4=Feis.JSONTextView({
 文本:lang("确认裁剪","Confirm cut",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 左边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la1,
 阴影:当前主题.按键阴影,
 监听:function(){
当前模式=0;
操作菜单();
img.setImageBitmap(画图.新建(Feis.绘图.裁剪(画图.getBitmap(),矩形.左,矩形.上,矩形.宽,矩形.高),null,true));
属性刷新();
 }
});
}

//～～～～～～～～～～～～～

var 镜像操作=function(){
la.removeAllViews();
var 新画=new Feis.绘画(画图.getBitmap());
var la0=Feis.addLayout(la,0);
la0.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(48),
 位置重心:Feis.getGravity("居中")
})
 );
 
var tv0=Feis.JSONTextView({
 文本:lang("左90","Left 90",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
新画.旋转(270);
img.setImageBitmap(新画.getBitmap());
 }
});

var tv1=Feis.JSONTextView({
 文本:lang("右90","Roght 90",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 左边距:Feis.dip(2),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
新画.旋转(90);
img.setImageBitmap(新画.getBitmap());
 }
});

var tv2=Feis.JSONTextView({
 文本:lang("垂直","Vertical",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 左边距:Feis.dip(2),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
新画.镜像(1,-1);
img.setImageBitmap(新画.getBitmap());
 }
});

var tv2=Feis.JSONTextView({
 文本:lang("水平","Horizontal",配置.语言),
 宽度:Feis.dip(60),
 高度:Feis.dip(35),
 左边距:Feis.dip(2),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
新画.镜像(-1,1);
img.setImageBitmap(新画.getBitmap());
 }
});

var la1=Feis.addLayout(la,0);
la1.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(52),
 位置重心:Feis.getGravity("居中")
})
);

var tv3=Feis.JSONTextView({
 文本:lang("取消"," Cancel",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la1,
 阴影:当前主题.按键阴影,
 监听:function(){
当前模式=0;
操作菜单()
 }
});

var tv4=Feis.JSONTextView({
 文本:lang("完成","Complete",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 左边距:Feis.dip(3),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la1,
 阴影:当前主题.按键阴影,
 监听:function(){
当前模式=0;
画图=新画;
操作菜单();
 }
});
}

//～～～～～～～～～～～～

var 缩放操作=function(){
la.removeAllViews();
var w=画图.getWidth(),
h=画图.getHeight(),
scale=0;

var la0=Feis.addLayout(la,0);
la0.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(52),
 位置重心:Feis.getGravity("居中")
})
);

var tv0=Feis.JSONTextView({
 文本:lang("尺寸:\n","Size:\n",配置.语言)+w+"x"+h,
 宽度:Feis.dip(60),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.标题文色,
 背景绘图:Feis.jb(当前主题.标题背色,Feis.dip(当前主题.标题圆角1)),
 文本重心:Feis.getGravity("居中"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(){
快速列表(lang("推荐尺寸(1~3)","Suitable size(1~3)",配置.语言),[144,177,200,232,256,320,360,480,800],function(obj){
scale=obj;
var wh=Feis.getScaleSize(w,h,scale);
if(scale>250){
 tv0.setTextColor(Feis.ys(255,255,0,0));
}else if(scale<=250&&scale>=160){
 tv0.setTextColor(Feis.ys(255,0,255,0));
}else if(scale<160){
 tv0.setTextColor(Feis.ys(255,255,255,0));
}
tv0.setText(lang("尺寸:\n","Size:\n",配置.语言)+wh[0]+"x"+wh[1]);
jsb.setProgress(scale);
img.setImageBitmap(画图.缩放(wh[0],wh[1],true));
});
 }
});

var jsb=Feis.JSONSeekBar({
 进度:w>h?w:h,
 最大进度:w>h?w:h,
 进度颜色:Feis.ys(255,255,100,150),
 宽度:Feis.dip(188),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 左边距:Feis.dip(1),
 位置重心:Feis.getGravity("左中"),
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角),"左右"),
 布局:la0,
 阴影:当前主题.按键阴影,
 监听:function(p,is){
scale=p>0?p:1;
var wh=Feis.getScaleSize(w,h,scale);
if(scale>250){
tv0.setTextColor(Feis.ys(255,255,0,0));
}else if(scale<=256&&scale>=160){
tv0.setTextColor(Feis.ys(255,0,255,0));
}else if(scale<160){
tv0.setTextColor(Feis.ys(255,255,255,0));
}
tv0.setText(lang("尺寸:\n","Size:\n",配置.语言)+wh[0]+"x"+wh[1]);
img.setImageBitmap(画图.缩放(wh[0],wh[1],true));
 }
});

var la1=Feis.addLayout(la,0);
la1.setLayoutParams(
Feis.JSONParams({
 宽度:-1,
 高度:Feis.dip(50),
 位置重心:Feis.getGravity("居中")
})
);

var tv3=Feis.JSONTextView({
 文本:lang("取消缩放","Scale cancel",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la1,
 阴影:当前主题.按键阴影,
 监听:function(){
当前模式=0;
操作菜单();
img.setImageBitmap(画图.getBitmap());
 }
});

var tv4=Feis.JSONTextView({
 文本:lang("确认缩放","Confirm Scale",配置.语言),
 宽度:Feis.dip(120),
 高度:Feis.dip(40),
 左边距:Feis.dip(3),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:11,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la1,
 阴影:当前主题.按键阴影,
 监听:function(){
当前模式=0;
操作菜单();
var wh=Feis.getScaleSize(w,h,scale);
画图.缩放(wh[0],wh[1]);
img.setImageBitmap(画图.getBitmap());
属性刷新();
 }
});
}
}catch(e){Feis.报错(e)}
});
}

//～～～～～～～～～～～～～～～～～～～～～～～～

function 颜色选择器(col,run){
var colors=[
Feis.ys(255,0,0,255),
Feis.ys(255,255,0,0),
Feis.ys(255,255,100,150),
Feis.ys(255,255,255,0),
Feis.ys(255,0,255,0),
Feis.ys(255,0,255,255),
Feis.ys(255,150,100,255),
Feis.ys(255,0,0,255),
Feis.Color_hex(0xffffffff),
Feis.Color_hex(0xff000000)
];

var 渐变=function(color){
 return [
Feis.Color_hex(0xffffffff),
color,Feis.Color_hex(0xff000000)
 ];
}

Feis.UiT(function(){
 var winArray=Feis.addWindow2(
 当前主题.背景颜色==null?获取壁纸():
 Feis.jb(当前主题.背景颜色,0),Feis.dp(1,10),Feis.dp(3,10),Feis.dip(450),Feis.dp(3,980),false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
col=(col==null?Feis.Color_hex(0xffffffff):col);
var color=col,
 A=Feis.getAlpha(col);
var w1=Feis.dip(350),
 h1=Feis.dip(100),
 x1=w1/2,
 y1=h1/2;
 var w0=w1,
 h0=h1/4,
 x0=w0/2,
 y0=h0/2;
 
var 画布0=new Feis.绘画(Feis.drawToBmp(Feis.jb(colors,0,"左右",0,w0,h0)));
 画布0.空心画笔(Feis.recolor(color),false,5);
var 画布1=new Feis.绘画(Feis.drawToBmp(Feis.jb(渐变(color),0,"左右",0,w1,h1)));
 画布1.空心画笔(Feis.recolor(color),false,5);

var tv=Feis.JSONTextView({
文本:lang("🔙颜色提取器","🔙Color extractor",配置.语言),
宽度:Feis.dip(430),
高度:Feis.dip(35),
上边距:Feis.dip(5),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:Feis.ys(255,0,0,0),
背景绘图:Feis.jb(Feis.ys(250,255,100,150),[0,0,Feis.dip(10),Feis.dip(10)]),
文本重心:Feis.getGravity("居中"),
布局:layout,
监听:function(v){
win.dismiss();
}
});
var img0=Feis.JSONImageView({
 位图:画布0.绘制圆形(x0,y0,h0/2,true),
 宽度:Feis.dip(350),
 高度:Feis.dip(25),
 上边距:Feis.dip(10),
 位置重心:Feis.getGravity("居中"),
 背景绘图:Feis.jb(Feis.ys(255,150,200,255),Feis.dip(5)),
 布局:layout,
 触摸:function(e,a){ 
var px=Math.round(e.getX()),
 py=Math.round(e.getY());
if(px>0&&px<w0)x0=px;
var c=画布0.getBitmap().getPixel(x0,y0);
画布1.新建(Feis.drawToBmp(Feis.jb(渐变(c),0,"左右",0,w1,h1)));
var c=Feis.recolor(Feis.Color_alpha(c,255));
画布0.空心画笔(c,true,5);
img0.setImageBitmap(画布0.绘制圆形(x0,y0,h0/2,true));
画布1.空心画笔(c,true,5);
img1.setImageBitmap(画布1.绘制圆形(x1,y1,35,true));
var c=updateColor(画布1,x1,y1);
画布1.空心画笔(c,true,5);
img1.setImageBitmap(画布1.绘制圆形(x1,y1,35,true));
return true;
 }
});

 var img1=Feis.JSONImageView({
位图:画布1.绘制圆形(x1,y1,35,true),
宽度:Feis.dip(350),
高度:Feis.dip(100),
上边距:Feis.dip(20),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(Feis.ys(255,150,200,255),Feis.dip(5)),
布局:layout,
触摸:function(e,a){ 
var px=Math.round(e.getX()),
py=Math.round(e.getY())
if(px>0&&px<w1)x1=px;
if(py>0&&py<h1)y1=py;
var c=updateColor(画布1,x1,y1);
画布1.空心画笔(c,true,5);
img1.setImageBitmap(画布1.绘制圆形(x1,y1,35,true));
return true;
}
 });
 
 var jsb=Feis.JSONSeekBar({
进度:A,
最大进度:255,
进度颜色:Feis.ys(255,255,100,150),
宽度:Feis.dip(350),
高度:Feis.dip(30),
上边距:Feis.dip(20),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb([Feis.Color_alpha(col,0),Feis.Color_alpha(col,255)],Feis.dip(15),"左右"),
布局:layout,
监听:function(p,is){
A=p;
jsb.setBackgroundDrawable(Feis.jb([Feis.Color_alpha(color,0),Feis.Color_alpha(color,255)],Feis.dip(15),"左右"));
updateColor();
}
 });
 
var la=Feis.addLayout(layout,0);
la.setLayoutParams(
Feis.JSONParams({
 宽度:Feis.dip(300),
 高度:Feis.dip(55),
 上边距:Feis.dip(20),
 位置重心:Feis.getGravity("居中")
})
);

var tv2=Feis.JSONTextView({
文本:lang("原色:","Original color:\n",配置.语言)+Feis.Color_toHex(col),
宽度:Feis.dip(110),
高度:Feis.dip(50),
左边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:15,
文本颜色:Feis.recolor(col),
背景颜色:col,
文本重心:Feis.getGravity("居中"),
布局:la,
监听:function(){
 color=col;updateColor();
}
});

var tv3=Feis.JSONTextView({
 文本:lang("当前:","New color\n",配置.语言)+Feis.Color_toHex(col),
 宽度:Feis.dip(110),
 高度:Feis.dip(50),
 左边距:Feis.dip(5),
 位置重心:Feis.getGravity("居中"),
 文本大小:15,
 文本颜色:Feis.recolor(col),
 背景颜色:col,
 文本重心:Feis.getGravity("居中"),
 布局:la,
 监听:function(){
if(run!=null)run(color);
win.dismiss();
 }
});

Feis.JSONTextView({
 文本:lang("取消","Cancel",配置.语言),
 宽度:Feis.dip(70),
 高度:Feis.dip(50),
 左边距:Feis.dip(5),
 位置重心:Feis.getGravity("居中"),
 文本大小:15,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(当前主题.按键圆角)),
 文本重心:Feis.getGravity("居中"),
 布局:la,
 监听:function(){
win.dismiss();
 }
});

var updateColor=function(画布,x,y){
 if(画布!=null&&x!=null&&y!=null){
color=画布.getBitmap().getPixel(x,y);
 }
 color=Feis.Color_alpha(color,A);
 tv3.setText(lang("当前:","New color\n",配置.语言)+Feis.Color_toHex(color));
 tv3.setBackgroundColor(color);
 jsb.setBackgroundDrawable(Feis.jb([Feis.Color_alpha(color,0),Feis.Color_alpha(color,255)],Feis.dip(15),"左右"));
 var c=Feis.recolor(Feis.Color_alpha(color,255));
 //Feis.seekbarColor(jsb,c);
 tv3.setTextColor(c);
 return c;
}

}catch(e){Feis.报错(e)} 
 });
}

//～～～～～～～～～～～～～～～～～～～～～

var 图标适配器=function(){
this.文件=文件图标();
this.目录=目录图标();
this.图像=图像图标();
var 文本=文本图标(),
压缩=压缩图标(),
字体=字体图标();
var 音频=音频图标(),
视频=视频图标();
this.key=[".txt",".js",".java",".zip",".jar",".rar",
".ttf",".ttc",".mp3",".ogg",".mp4",".3gp"];
this.indexOf=function(str){
 return this.get(this.key.indexOf(str));
}

this.get=function(pos){
 if(pos==-1)return this.文件;
 return [文本,文本,文本,压缩,压缩,压缩,字体,字体,音频,音频,视频,视频][pos];
}
}

var 图标适配=null;

//～～～～～～～～～～～～～～

function 文件处理(ad,fm,file){
Feis.UiT(function(){
 try{
var pw=Feis.dip(160),
 ph=Feis.dip(100);
var winArray=Feis.addWindow2(
当前主题.背景颜色==null?获取壁纸():
画线(pw,ph,当前主题.背景线数,当前主题.背景线条,当前主题.背景颜色,当前主题.线条类型)
,Feis.dp(0,500)-pw/2,Feis.dp(3,500)-ph/2,pw,ph,true,true);
var win=winArray[0];
var layout=winArray[1];

var tv=Feis.JSONTextView({
文本:lang("文件处理","File operate",配置.语言),
宽度:Feis.dip(154),
高度:Feis.dip(32),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(当前主题.标题背色,[Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角1),Feis.dip(当前主题.标题圆角),Feis.dip(当前主题.标题圆角)]),
文本重心:Feis.getGravity("居中"),
布局:layout
});

var tv0=Feis.JSONTextView({
文本:lang("删除","Delete",配置.语言),
宽度:Feis.dip(150),
高度:Feis.dip(35),
上边距:Feis.dip(10),
下边距:Feis.dip(10),
文本大小:11,
位置重心:Feis.getGravity("居中"),
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
监听:function(v){
if(new Feis.File(file).delete()){
ad.update(fm.获取列表());
win.dismiss();
}
}
});

 }catch(e){Feis.报错(e);}
});
}




function 文件选择器(path,run,type){
Feis.UiT(function(){
 var 文管=new Feis.文件管理(path==null?Feis.根路径(""):path);
 if(图标适配==null)图标适配=new 图标适配器();
 var winArray=Feis.addWindow2(Feis.ys(255,224,225,185,-1),Feis.dp(1,200),Feis.dp(3,10),Feis.dip(300),Feis.dp(3,980),false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
var la=Feis.addLayout(layout,0);
 la.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(290),
高度:Feis.dip(38),
左边距:Feis.dip(5),
上边距:Feis.dip(1)
})
 );
 la.setBackgroundDrawable(Feis.jb(当前主题.标题背色,Feis.dip(5)));
 Feis.setElevation(la,当前主题.标题阴影,当前主题.标题阴影);

var tv=Feis.JSONTextView({
文本:lang("文件管理","Files manage",配置.语言),
宽度:Feis.dip(217),
高度:Feis.dip(34),
左边距:Feis.dip(1),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:14,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(Feis.ys(100,255,255,255),[Feis.dip(5),0,0,Feis.dip(5)]),
文本重心:Feis.getGravity("居中"),
布局:la
});

var tv0=Feis.JSONTextView({
文本:lang("取消","Cancel",配置.语言),
宽度:Feis.dip(70),
高度:Feis.dip(34),
左边距:Feis.dip(1),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(Feis.ys(100,255,255,255),[0,Feis.dip(5),Feis.dip(5),0]),
文本重心:Feis.getGravity("居中"),
布局:la,
监听:function(){
 win.dismiss();
}
});

var tv1=Feis.JSONTextView({
文本:lang("返回上一级目录","Up",配置.语言),
宽度:Feis.dip(280),
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,Feis.dip(5)),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
监听:function(){
 文管.上级();
 ad.update(文管.获取列表());
}
});

var ad=new Feis.BaseAdapter(文管.获取列表(),function(pos,convertView,parent,obj){
try{
 var e=文管.扩展名称(obj)
 var 图标=obj.isDirectory()?图标适配.目录:图标适配.indexOf(e);
 if([".jpg",".png",".jpeg",".gif"].indexOf(e)!=-1){
var la=Feis.addLayout(null,1);
var img=Feis.JSONImageView({
位图:图标适配.图像,
宽度:Feis.dip(200),
高度:Feis.dip(200),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
布局:la,
监听:function(){
 if(type.indexOf(e)!=-1){
if(run!=null)run(obj);
win.dismiss();
 }else if(type=="文件"&&obj.isFile()){
if(run!=null)run(obj);
win.dismiss();
 }else if(type=="目录"&&obj.isDirectory()){
if(run!=null)run(obj);
win.dismiss();
 }else if(type==null){
if(run!=null)run(obj);
win.dismiss();
 }else{
var msg=((type instanceof Array)?type.join(" or "):type);
ppp(lang("请选择一个… ","Please select a… ",配置.语言)+msg);
 }
},
长按:function(v){
文件处理(ad,文管,obj);
return true;
}
});

Feis.JSONTextView({
文本:""+obj.getName(),
宽度:Feis.dip(200),
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
文本重心:Feis.getGravity("居中"),
布局:la
});

Feis.JSONTextView({
文本:""+文管.获取日期(obj)+""+文管.获取大小(obj),
宽度:Feis.dip(200),
高度:Feis.dip(10),
左边距:Feis.dip(0),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:9,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
文本重心:Feis.getGravity("居中"),
布局:la
});

Feis.线程(function(){
var bmp=Feis.loadBitmap(obj.getPath(),100);
if(img!=null)img.post(function(){
 img.setImageBitmap(bmp);
});
});

Feis.缩放动画(la,0,100,500);
 return la;
 }
 
 var la=Feis.addLayout(null,0);
 Feis.JSONImageView({
位图:图标,宽度:Feis.dip(40),
高度:Feis.dip(40),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
布局:la
 });
 
 var la0=Feis.addLayout(la,1);
la0.setLayoutParams(
 Feis.JSONParams({
宽度:Feis.dip(200),
高度:Feis.dip(40),
左边距:Feis.dip(0),
上边距:Feis.dip(0)
 })
);

 var tv=Feis.JSONTextView({
文本:""+obj.getName(),
宽度:-2,
高度:Feis.dip(30),
左边距:Feis.dip(0),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
文本重心:Feis.getGravity("左中"),
布局:la0
 });
 
 if(e.equalsIgnoreCase(".ttf"))
Feis.setViewFont(tv,obj.getPath());

 Feis.JSONTextView({
文本:obj.isFile()?(""+文管.获取日期(obj)+""+文管.获取大小(obj)):"",
宽度:-2,
高度:Feis.dip(10),
左边距:Feis.dip(0),
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:9,
文本颜色:Feis.ys(255,0,0,0),
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
文本重心:Feis.getGravity("左中"),
布局:la0
 });
 
 Feis.点击监听(
Feis.JSONTextView({
文本:lang("选中","Choose",配置.语言),
宽度:Feis.dip(60),
高度:Feis.dip(40),
左边距:1,
上边距:Feis.dip(0),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(Feis.ys(40,0,0,0),Feis.dip(0)),
文本重心:Feis.getGravity("居中"),
布局:la
}),function(){ 
if(type.indexOf(e)!=-1){
 if(run!=null)run(obj);
 win.dismiss();
}else if(type=="文件"&&obj.isFile()){
 if(run!=null)run(obj);
 win.dismiss();
}else if(type=="目录"&&obj.isDirectory()){
 if(run!=null)run(obj);
 win.dismiss();
}else if(type==null){
 if(run!=null)run(obj);
 win.dismiss();
}else{
 var msg=((type instanceof Array)?type.join(" or "):type);
 ppp(lang("请选择一个… ","Please select a… ",配置.语言)+msg);
}
});

Feis.水平动画(la,100,0,200);
 return la;
}catch(e){Feis.报错(e)} 
});

var list=Feis.JSONListView({
适配器:ad.getAdapter(),
宽度:-2,
高度:Feis.dp(3,980)-Feis.dip(74),
左边距:Feis.dip(0),
上边距:Feis.dip(2),
背景颜色:Feis.ys(100,255,255,255),
间隙高度:Feis.dip(2),
布局:layout,
位置重心:Feis.getGravity("居中")
});
Feis.列表点击监听(list,function(av,v,id,p){
var file=ad.get(id);
if(file.isDirectory()){
 文管.当前=file;ad.update(文管.获取列表());
}
}); 

 }catch(e){Feis.报错(e)} 
});
}
//～～～～～～～～～～～～～～～～～～～～～～
var 相册解析;
var 相册列表;

function 图片选择器(is,run){
var it=0;
Feis.UiT(function(){
 var 无图,透明图层;
 var 目录=[];
 var 模式=0,
 记录位置=0;
 
 var get=function(list){
var 图像=[];
for(var i=0;i<list.length;i+=2)
图像.push([list[i],list[i+1]]);
return 图像;
 }
 
 var winArray=Feis.addWindow2(
 当前主题.背景颜色==null?获取壁纸():
 画线(500,900,当前主题.背景线数,当前主题.背景线条,当前主题.背景颜色,当前主题.线条类型),Feis.dp(1,200),Feis.dp(3,10),Feis.dip(300),Feis.dp(3,980),false,true);
 var win=winArray[0];
 var layout=winArray[1];
 try{
//layout.removeAllViews()
var la=Feis.addLayout(layout,0);
 la.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(300),
高度:Feis.dip(40),
左边距:Feis.dip(0),
上边距:Feis.dip(0)
})
 );
la.setBackgroundDrawable(Feis.jb(当前主题.标题背色,当前主题.标题圆角));
Feis.setElevation(la,当前主题.标题阴影,当前主题.标题阴影);

var tv=Feis.JSONTextView({
文本:lang("选择相册","Choose photo albums",配置.语言),
宽度:Feis.dip(228),
高度:Feis.dip(35),
左边距:Feis.dip(1),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(Feis.ys(0,0,0,0),当前主题.标题圆角),
文本重心:Feis.getGravity("居中"),
布局:la
});

var tv0=Feis.JSONTextView({
文本:lang("返回","Back",配置.语言),
宽度:Feis.dip(70),
高度:Feis.dip(35),
左边距:Feis.dip(1),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:13,
文本颜色:当前主题.标题文色,
背景绘图:Feis.jb(Feis.ys(0,0,0,0),当前主题.标题圆角),
文本重心:Feis.getGravity("居中"),
布局:la,
监听:function(){
if(fv!=null)fv.dismiss();
if(it==1){
win.dismiss();
}else{
ppp(lang("加载中...无法关闭！","Loading...",配置.语言));
}
}
});

var tv1=Feis.JSONTextView({
文本:lang("返回相册列表","Back albums list",配置.语言),
宽度:Feis.dip(300),
高度:Feis.dip(35),
左边距:Feis.dip(0),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:11,
文本颜色:Feis.ys(255,0,0,0),背景绘图:Feis.jb(Feis.ys(180,255,255,255),Feis.dip(5)),
文本重心:Feis.getGravity("居中"),
布局:layout,
阴影:当前主题.按键阴影,
监听:function(){
 Feis.viewShow(tv1,0);
 控件高度(0);
 tv.setText(lang("选择相册","Choose photo albums",配置.语言));
 模式=0;ad.update(目录);
 list.smoothScrollToPositionFromTop(记录位置,0);
}
});

Feis.viewShow(tv1,0);

var ad=new Feis.BaseAdapter(目录,function(pos,convertView,parent,obj){
try{
 if(模式==0){
var la=Feis.addLayout(null,0);
la.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(300),
高度:Feis.dip(172),
位置重心:Feis.getGravity("居中")
})
 );
var la_l=Feis.addLayout(la,1);
 la_l.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(148),
高度:Feis.dip(172),
位置重心:Feis.getGravity("居中")
})
 );
 la_l.setBackgroundDrawable(Feis.jb(当前主题.标题背色,当前主题.按键圆角2));
 
Feis.水平动画(la_l,-100,0,500);
var img=Feis.JSONImageView({
位图:无图,
宽度:Feis.dip(140),
高度:Feis.dip(140),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
背景绘图:透明图层,
布局:la_l
});
Feis.点击监听(img,function(){
记录位置=pos;
Feis.viewShow(tv1,1);
控件高度(1);
tv.setText(lang("相册:","Albums:",配置.语言)+" "+obj[0].getName());
 模式=1;
 ad.update(get(obj[0].list()));//list.smoothScrollToPositionFromTop(0,0)
 });
 
 var la_l2=Feis.addLayout(la_l,0);
la_l2.setLayoutParams(
 Feis.JSONParams({
宽度:-1,
高度:-1,
位置重心:Feis.getGravity("居中")
})
);

Feis.JSONTextView({
 文本:""+obj[0].getName(),
 宽度:Feis.dip(100),
 高度:Feis.dip(25),
 上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:12,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,0),
文本重心:Feis.getGravity("居中"),
布局:la_l2
 });
 
 Feis.JSONTextView({
文本:""+obj[0].length()+" P",
宽度:Feis.dip(40),
高度:Feis.dip(25),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:9,
文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,0),
 文本重心:Feis.getGravity("居中"),
 布局:la_l2
});

if(obj[1]!=null){
 var la_r=Feis.addLayout(la,1);
la_r.setLayoutParams(
 Feis.JSONParams({
宽度:Feis.dip(148),
高度:Feis.dip(172),
左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中")
 })
);
la_r.setBackgroundDrawable(Feis.jb(当前主题.标题背色,当前主题.按键圆角2));

 Feis.水平动画(la_r,100,0,500);
 
 var img2=Feis.JSONImageView({
位图:无图,
宽度:Feis.dip(140),
高度:Feis.dip(140),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
背景绘图:透明图层,
布局:la_r,
监听:function(){
记录位置=pos
Feis.viewShow(tv1,1);
控件高度(1);
tv.setText(lang("相册:","Albums:",配置.语言)+" "+obj[0].getName());
模式=1;
ad.update(get(obj[1].list()));
//list.smoothScrollToPositionFromTop(0,0);
}
 });

 var la_r2=Feis.addLayout(la_r,0);
la_r2.setLayoutParams(
 Feis.JSONParams({
 宽度:-1,
 高度:-1,
 位置重心:Feis.getGravity("居中")
})
);

 Feis.JSONTextView({
文本:""+obj[1].getName(),
宽度:Feis.dip(100),
高度:Feis.dip(25),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:12,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:la_r2
 });
 
 Feis.JSONTextView({
文本:""+obj[1].length()+" P",
宽度:Feis.dip(40),
高度:Feis.dip(25),
上边距:Feis.dip(1),
位置重心:Feis.getGravity("居中"),
文本大小:9,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,当前主题.按键圆角),
文本重心:Feis.getGravity("居中"),
布局:la_r2
 });
}

Feis.线程(function(){
 var bmp=Feis.loadBitmap(obj[0].review(),50);
 if(img!=null)img.post(function(){
img.setImageBitmap(bmp);
});
});

if(obj[1]!=null)
 Feis.线程(function(){
var bmp2=Feis.loadBitmap(obj[1].review(),100)
if(img2!=null)img2.post(function(){
img2.setImageBitmap(bmp2);
});
 });
return la;

}else if(模式==1){
 var la=Feis.addLayout(null,0);
 var la_l=Feis.addLayout(la,1);
la_l.setLayoutParams(
 Feis.JSONParams({
宽度:Feis.dip(148),
高度:Feis.dip(170),
//左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中")
 })
);
la_l.setBackgroundDrawable(Feis.jb(当前主题.标题背色,当前主题.按键圆角2)); 

Feis.缩放动画(la_l,0,100,500);

var fa_l=Feis.addFayout(la_l);
var img=Feis.JSONImageView({
 位图:无图,
 宽度:Feis.dip(140),
 高度:Feis.dip(140),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
背景绘图:透明图层,
布局:Feis.addLayout(fa_l),
监听:function(){
run(obj[0]);
Feis.newTick(function(){
if(is)win.dismiss();
img=null;
img2=null;
},800);
},
 });
 
 Feis.JSONTextView({
文本:""+Feis.getImageFileSize(obj[0]).join("x"),
宽度:Feis.dip(140),
高度:Feis.dip(15),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:9,
文本颜色:当前主题.按键文色,
背景绘图:Feis.ys(60,0,0,0,-1),
文本重心:Feis.getGravity("居中"),
布局:Feis.addLayout(fa_l)
 });
 
 Feis.JSONTextView({
文本:""+Feis.工具.路径名称(obj[0]),
宽度:Feis.dip(140),
高度:Feis.dip(25),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:12,
文本颜色:当前主题.按键文色,
背景绘图:Feis.jb(当前主题.按键背色,0),
文本重心:Feis.getGravity("居中"),
布局:la_l,
单行:true
 });
 
if(obj[1]!=null){
 var la_r=Feis.addLayout(la,1);
la_r.setLayoutParams(
 Feis.JSONParams({
宽度:Feis.dip(148),
高度:Feis.dip(170),
左边距:Feis.dip(2),
位置重心:Feis.getGravity("居中")
 })
);
la_r.setBackgroundDrawable(Feis.jb(当前主题.标题背色,当前主题.按键圆角2));
Feis.缩放动画(la_r,0,100,500);

var fa_r=Feis.addFayout(la_r);
var img2=Feis.JSONImageView({
 位图:无图,
 宽度:Feis.dip(140),
 高度:Feis.dip(140),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 背景绘图:透明图层,
 布局:Feis.addLayout(fa_r) 
});

Feis.点击监听(img2,function(){
 run(obj[1]);
 Feis.newTick(function(){
if(is)win.dismiss();
img=null;
img2=null;
 },800);
});

Feis.JSONTextView({
文本:""+Feis.getImageFileSize(obj[1]).join("x"),
宽度:Feis.dip(140),
高度:Feis.dip(15),
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中"),
文本大小:9,
文本颜色:当前主题.按键文色,
背景绘图:Feis.ys(60,0,0,0,-1),
文本重心:Feis.getGravity("居中"),
布局:Feis.addLayout(fa_r)
 });
 
 Feis.JSONTextView({
 文本:""+Feis.工具.路径名称(obj[1]),
 宽度:Feis.dip(140),
 高度:Feis.dip(25),
 上边距:Feis.dip(2),
 位置重心:Feis.getGravity("居中"),
 文本大小:12,
 文本颜色:当前主题.按键文色,
 背景绘图:Feis.jb(当前主题.按键背色,0),
 文本重心:Feis.getGravity("居中"),
 布局:la_r,
 单行:true
});
}

Feis.线程(function(){
var bmp=Feis.loadBitmap(obj[0],100);
if(img!=null)img.post(function(){
 img.setImageBitmap(bmp);
 });
});

if(obj[1]!=null)Feis.线程(function(){
var bmp2=Feis.loadBitmap(obj[1],100);
if(img2!=null)img2.post(function(){
 img2.setImageBitmap(bmp2);
 });
});
 return la;
}
}catch(e){Feis.报错(e)} 
 });
 
 Feis.线程(function(){
try{
无图=图像图标()
透明图层=画背景(300,300);
if(相册解析==null){
 相册解析=new Feis.工具.路径解析(Feis.getImages());
 相册列表=相册解析.listFiles();
}

for(var i=0;i<相册列表.length;i+=2){
 目录.push([相册列表[i],相册列表[i+1]]);
 }
Feis.UiT(function(){
if(ad!=null)ad.update(目录);
if(fv!=null){fv.dismiss();}
if(fa!=null)fa.removeView(fla);
});
it=1;
}catch(e){Feis.报错(e);}
 });

 var ma=Feis.addFayout(layout);
ma.setLayoutParams(
 Feis.JSONParams({
宽度:-2,
高度:-1,
上边距:Feis.dip(2),
位置重心:Feis.getGravity("居中")
 })
);

 var fa=Feis.addFayout(ma);
 
var list=Feis.JSONListView({
适配器:ad.getAdapter(),
宽度:-2,
高度:Feis.dp(3,980)-Feis.dip(48),
上边距:Feis.dip(2),
背景颜色:Feis.ys(0,255,255,255),
间隙高度:Feis.dip(3),
位置重心:Feis.getGravity("居中"),
布局:fa
});
//Feis.列表点击监听(list,function(av,v,id,p){ });

var fla=Feis.addLayout(fa);
var fv=new Feis.FastView(fla);
 fv.show();
 fv.setTick(30);
var 进度=new 圆形进度();
 进度.setLineCount(35);
 进度.setLineWidth(8,16);
fv.setLayoutParams(
Feis.JSONParams({
宽度:Feis.dip(300),
高度:Feis.dip(300)
})
 );
 fv.startDraw(function(cv,w,h,t){
try{
w=w*0.5;
h=h*0.5;
cv.drawColor(Feis.ys(255,255,255,255));
进度.onDraw(cv,w,h,w/3,w/2);
}catch(e){Feis.报错(e);fv.stopDraw();}
 });
 
 var 控件高度=function(m){
var p=list.getLayoutParams();
p.height=Feis.dp(3,980)-Feis.dip(m==0?44:82);
list.setLayoutParams(p);
 }
}catch(e){Feis.报错(e)}
});
}

//～～～～～～～～～～～～～～～～～～～～～～

function 画线(w,h,num,line,bg,mode){
mode=(mode==null?0:mode);
var ht=new Feis.绘画(w,h);
ht.空心画笔(line!=null?line:ht.Color.argb(100,100,100,100),false,1);
ht.绘制图片(Feis.drawToBmp(Feis.jb(bg!=null?bg:ht.Color.rgb(240,240,240),0),w,h),0,0,false);
for(var i=0;i<num;i++){
 var x=Feis.随机(1,w),y=Feis.随机(1,h);
 if(mode==0)ht.绘制矩形(x,y,Feis.随机(x,w),Feis.随机(y,h));
 if(mode==1){
 var px=Feis.随机(x,w),py=Feis.随机(y,h),
round=Feis.随机(0,(px-x)/2)
 ht.绘制圆角矩形(x,y,px,py,round,round);
 }
 if(mode==2)ht.绘制圆形(x,y,Feis.随机(0,h/2));
 if(mode==3)ht.绘制椭圆(x,y,Feis.随机(x,w),Feis.随机(y,h));
 if(mode==4)ht.绘制贝塞尔曲线(
 [Feis.随机(x,w),Feis.随机(y,h),
 Feis.随机(x,w),Feis.随机(y,h),
 Feis.随机(x,w),Feis.随机(y,h),
 Feis.随机(x,w),Feis.随机(y,h),Feis.随机(x,w),Feis.随机(y,h)],true,false)
}
return ht.getDrawable();
}

function 画背景(w,h,line,bg){
var ht=new Feis.绘画(w,h);
ht.实心画笔(line!=null?line:ht.Color.argb(200,100,100,100),false,5);
ht.绘制颜色(bg!=null?bg:ht.Color.argb(180,255,255,255));
for(var i=0;i<w*2;i+=15){ht.绘制直线(i,0,i-w,h) }
return ht.getDrawable();
}

function 目录图标(){
var h=new Feis.绘画(100,100);
h.实心画笔(Feis.ys(255,255,255,100),false,2);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,2,-2,Feis.ys(255,0,0,0));
h.绘制圆角矩形(10,20,60,50,10,10)
h.绘制圆角矩形(10,30,90,90,10,10)
return h.getBitmap();
}

function 文件图标(){
var h=new Feis.绘画(100,100);
h.实心画笔(Feis.ys(255,100,200,200),false,2);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,2,-2,Feis.ys(255,0,0,0));
h.绘制圆角矩形(10,10,90,90,10,10)
h.实心画笔(Feis.ys(255,0,255,255),false,2);
h.绘制圆角矩形(20,20,80,80,5,5)
return h.getBitmap();
}

function 文本图标(){
var h=new Feis.绘画(100,100);
h.实心画笔(Feis.ys(255,60,130,210),false,2);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,2,-2,Feis.ys(255,0,0,0));
h.绘制圆角矩形(15,10,85,90,10,10)
h.实心画笔(Feis.ys(255,255,255,255),true,2);
h.绘制圆角矩形(25,20,75,80,5,5)
h.实心画笔(Feis.ys(255,60,130,210),false,1);
h.文本大小(35);
h.绘制文本("txt",30,55);
return h.getBitmap();
}

function 字体图标(){
var h=new Feis.绘画(100,100);
h.实心画笔(Feis.ys(255,60,130,210),false,2);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,2,-2,Feis.ys(255,0,0,0));
h.绘制圆角矩形(15,10,85,90,10,10)
h.实心画笔(Feis.ys(255,255,100,150),true,2);
h.绘制圆形(45,65,20);
h.实心画笔(Feis.ys(255,255,255,255),false,2);
h.文本大小(35);
h.绘制文本("T",55,50);
h.文本大小(20);
h.绘制文本("T",48,50);
return h.getBitmap();
}

function 压缩图标(){
var h=new Feis.绘画(100,100);
h.绘制颜色(Feis.ys(0,0,0,0));
h.实心画笔(Feis.ys(255,200,50,200),false,2);
h.画笔阴影(2,2,-2,Feis.ys(255,0,0,0));
h.绘制圆角矩形(10,15,90,40,5,5);
h.实心画笔(Feis.ys(255,255,150,0),false,2);
h.绘制圆角矩形(10,40,90,65,5,5);
h.实心画笔(Feis.ys(255,50,200,200),false,2);
h.绘制圆角矩形(10,65,90,90,5,5);
h.实心画笔(Feis.ys(255,230,230,0),false,2);
h.画笔阴影(2,2,-2,Feis.ys(200,0,0,0));
h.绘制圆角矩形(40,15,60,90,2,2);
h.空心画笔(Feis.ys(255,200,200,0),false,5);
h.绘制圆角矩形(38,40,62,65,5,5);
return h.getBitmap();
}

function 音频图标(){
var h=new Feis.绘画(100,100);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,2,-2,Feis.ys(255,0,0,0));
h.实心画笔(Feis.ys(155,0,255,255),false,2);
h.绘制圆角矩形(10,10,90,90,10,10)
h.实心画笔(Feis.ys(255,0,255,0),false,3);
h.绘制直线(55,68,55,30);
h.绘制贝塞尔曲线([55,30, 90,45,80,65, 67,75,75,70, 75,48,55,52]);
h.绘制椭圆(25,80,55,60);
return h.getBitmap();
}

function 视频图标(){
var h=new Feis.绘画(100,100);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,4,-4,Feis.ys(200,0,0,0));
h.实心画笔(Feis.ys(155,0,255,255),false,2);
h.绘制圆角矩形(10,10,90,90,10,10)
h.实心画笔(Feis.ys(255,230,230,230),false,3);
h.绘制圆形(50,50,30);
h.实心画笔(Feis.ys(255,0,160,160),true);
h.绘制圆形(50,30,6);h.绘制圆形(50,70,6);
h.绘制圆形(30,50,6);h.绘制圆形(70,50,6);
h.绘制圆形(35,35,6);h.绘制圆形(65,35,6);
h.绘制圆形(35,65,6);h.绘制圆形(65,65,6);
h.实心画笔(Feis.ys(255,180,180,180));
h.绘制圆形(50,50,5);
return h.getBitmap();
}

function 图像图标(){
var h=new Feis.绘画(500,500);
h.绘制颜色(Feis.ys(0,0,0,0));
h.画笔阴影(2,4,-4,Feis.ys(200,0,0,0));
h.实心画笔(Feis.ys(155,120,120,120),false,2);
h.绘制圆角矩形(20,20,480,480,20,20)
h.空心画笔(Feis.ys(255,230,230,230),false,3);
h.文本大小(100);
h.绘制文本("加载中…",50,280);
return h.getBitmap();
}

function 立方体(画布){
var 画笔=Feis.绘画.画笔(Feis.ys(255,255,0,0),0,1);
var 相机=new Feis.Camera();
var 矩阵=new Feis.Matrix();
相机.setLocation(0,1,6);
var 角度=[0,90,180,270];
this.旋转=function(y,bmp){
 var 高度=bmp[0].getWidth();
 var 直径=高度/2;
 for(var i=0;i<4;i++){
var r=(y+角度[i])%360;
if(r>100&&r<260){
相机.save();
矩阵.reset();
相机.rotateY(r);
相机.rotateX(0);
相机.translate(直径,0,-直径);
相机.getMatrix(矩阵);
相机.restore();
矩阵.preTranslate(-高度,-高度);
矩阵.postTranslate(450,450);//2d平移画布
画布.drawBitmap(bmp[i],矩阵,画笔);
}
 }
}
}

function 滚动方块(画布){
var 画笔=Feis.绘画.画笔(Feis.ys(255,255,0,0),0,1);
var 相机=new Feis.Camera();
var 矩阵=new Feis.Matrix();
相机.setLocation(0,1,28);
var 角度=[0,90,180,270];
this.旋转=function(y,bmp){
 var 高度=bmp.getWidth();
 var 直径=高度/2;
 for(var i=0;i<4;i++){
var r=(y+角度[i])%360;
if(r>270||r<80){
相机.save();
矩阵.reset();
相机.rotateY(0);
相机.rotateX(r);
相机.translate(0,-直径,直径);
相机.getMatrix(矩阵);
相机.restore();
矩阵.preTranslate(-高度,-高度);
矩阵.postTranslate(高度,0);//2d平移画布
画布.drawBitmap(bmp,矩阵,画笔);
}
 }
}
}


var 方块色系=[
[//玻璃
{id:241,da:0,r:220,g:220,b:220},
{id:241,da:1,r:206,g:162,b:115},
{id:241,da:2,r:189,g:133,b:206},
{id:241,da:3,r:148,g:174,b:206},
{id:241,da:4,r:222,g:219,b:140},
{id:241,da:5,r:156,g:198,b:99},
{id:241,da:6,r:222,g:162,b:181},
{id:241,da:7,r:140,g:140,b:140},
{id:241,da:8,r:180,g:180,b:180},
{id:241,da:9,r:140,g:166,b:206},
{id:241,da:10,r:165,g:130,b:190},
{id:241,da:11,r:123,g:133,b:190},
{id:241,da:12,r:148,g:133,b:115},
{id:241,da:13,r:115,g:120,b:82},
{id:241,da:14,r:173,g:121,b:115},
{id:241,da:15,r:105,g:105,b:105}
],

[//泥沙
{id:237,da:0,r:220,g:220,b:220},
{id:237,da:1,r:255,g:160,b:70},
{id:237,da:2,r:255,g:90,b:255},
{id:237,da:3,r:100,g:185,b:255},
{id:237,da:4,r:250,g:240,b:0},
{id:237,da:5,r:20,g:255,b:0},
{id:237,da:6,r:255,g:150,b:220},
{id:237,da:7,r:75,g:80,b:85},
{id:237,da:8,r:148,g:148,b:148},
{id:237,da:9,r:0,g:150,b:240},
{id:237,da:10,r:190,g:45,b:255},
{id:237,da:11,r:25,g:50,b:245},
{id:237,da:12,r:110,g:45,b:0},
{id:237,da:13,r:40,g:80,b:0},
{id:237,da:14,r:250,g:35,b:30},
{id:237,da:15,r:20,g:20,b:20}
],

[//混泥土
{id:236,da:0,r:200,g:200,b:200},
{id:236,da:1,r:214,g:93,b:0},
{id:236,da:2,r:156,g:45,b:148},
{id:236,da:3,r:33,g:125,b:181},
{id:236,da:4,r:222,g:162,b:16},
{id:236,da:5,r:82,g:154,b:16},
{id:236,da:6,r:197,g:97,b:140},
{id:236,da:7,r:49,g:53,b:58},
{id:236,da:8,r:115,g:117,b:107},
{id:236,da:9,r:25,g:109,b:123},
{id:236,da:10,r:90,g:28,b:140},
{id:236,da:11,r:41,g:45,b:132},
{id:236,da:12,r:90,g:57,b:25},
{id:236,da:13,r:66,g:85,b:33},
{id:236,da:14,r:132,g:28,b:33},
{id:236,da:15,r:0,g:8,b:8}
],

[//羊毛
{id:35,da:0,r:214,g:218,b:219},
{id:35,da:1,r:223,g:108,b:17},
{id:35,da:2,r:180,g:40,b:220},
{id:35,da:3,r:55,g:164,b:203},
{id:35,da:4,r:231,g:184,b:36},
{id:35,da:5,r:100,g:168,b:21},
{id:35,da:6,r:221,g:126,b:156},
{id:35,da:7,r:57,g:62,b:65},
{id:35,da:8,r:129,g:129,b:121},
{id:35,da:9,r:18,g:125,b:133},
{id:35,da:10,r:111,g:137,b:158},
{id:35,da:11,r:48,g:53,b:145},
{id:35,da:12,r:106,g:67,b:38},
{id:35,da:13,r:79,g:101,b:26},
{id:35,da:14,r:148,g:35,b:31},
{id:35,da:15,r:19,g:21,b:24}
],

[//黏土
{id:159,da:0,r:192,g:163,b:148},
{id:159,da:1,r:148,g:77,b:34},
{id:159,da:2,r:137,g:80,b:100},
{id:159,da:3,r:95,g:107,b:48},
{id:159,da:4,r:170,g:121,b:32},
{id:159,da:5,r:69,g:76,b:38},
{id:159,da:6,r:147,g:71,b:72},
{id:159,da:7,r:123,g:101,b:90},
{id:159,da:8,r:52,g:38,b:33},
{id:159,da:9,r:79,g:83,b:83},
{id:159,da:10,r:109,g:64,b:79},
{id:159,da:11,r:67,g:54,b:83},
{id:159,da:12,r:70,g:47,b:33},
{id:159,da:13,r:70,g:76,b:39},
{id:159,da:14,r:131,g:55,b:42},
{id:159,da:15,r:33,g:20,b:14}
],

[//彩色方块
{id:237,da:0,r:220,g:220,b:220},
{id:237,da:1,r:255,g:160,b:70},
{id:237,da:2,r:255,g:90,b:255},
{id:237,da:3,r:100,g:185,b:255},
{id:237,da:4,r:250,g:240,b:0},
{id:237,da:5,r:20,g:255,b:0},
{id:237,da:6,r:255,g:150,b:220},
{id:237,da:7,r:75,g:80,b:85},
{id:237,da:8,r:148,g:148,b:148},
{id:237,da:9,r:0,g:150,b:240},
{id:237,da:10,r:190,g:45,b:255},
{id:237,da:11,r:25,g:50,b:245},
{id:237,da:12,r:110,g:45,b:0},
{id:237,da:13,r:40,g:80,b:0},
{id:237,da:14,r:250,g:35,b:30},
{id:237,da:15,r:20,g:20,b:20},
{id:236,da:0,r:200,g:200,b:200},
{id:236,da:1,r:214,g:93,b:0},
{id:236,da:2,r:156,g:45,b:148},
{id:236,da:3,r:33,g:125,b:181},
{id:236,da:4,r:222,g:162,b:16},
{id:236,da:5,r:82,g:154,b:16},
{id:236,da:6,r:197,g:97,b:140},
{id:236,da:7,r:49,g:53,b:58},
{id:236,da:8,r:115,g:117,b:107},
{id:236,da:9,r:25,g:109,b:123},
{id:236,da:10,r:90,g:28,b:140},
{id:236,da:11,r:41,g:45,b:132},
{id:236,da:12,r:90,g:57,b:25},
{id:236,da:13,r:66,g:85,b:33},
{id:236,da:14,r:132,g:28,b:33},
{id:236,da:15,r:0,g:8,b:8},
{id:35,da:0,r:214,g:218,b:219},
{id:35,da:1,r:223,g:108,b:17},
{id:35,da:2,r:180,g:40,b:220},
{id:35,da:3,r:55,g:164,b:203},
{id:35,da:4,r:231,g:184,b:36},
{id:35,da:5,r:100,g:168,b:21},
{id:35,da:6,r:221,g:126,b:156},
{id:35,da:7,r:57,g:62,b:65},
{id:35,da:8,r:129,g:129,b:121},
{id:35,da:9,r:18,g:125,b:133},
{id:35,da:10,r:111,g:137,b:158},
{id:35,da:11,r:48,g:53,b:145},
{id:35,da:12,r:106,g:67,b:38},
{id:35,da:13,r:79,g:101,b:26},
{id:35,da:14,r:148,g:35,b:31},
{id:35,da:15,r:19,g:21,b:24},
{id:159,da:0,r:192,g:163,b:148},
{id:159,da:1,r:148,g:77,b:34},
{id:159,da:2,r:137,g:80,b:100},
{id:159,da:3,r:95,g:107,b:48},
{id:159,da:4,r:170,g:121,b:32},
{id:159,da:5,r:69,g:76,b:38},
{id:159,da:6,r:147,g:71,b:72},
{id:159,da:7,r:123,g:101,b:90},
{id:159,da:8,r:52,g:38,b:33},
{id:159,da:9,r:79,g:83,b:83},
{id:159,da:10,r:109,g:64,b:79},
{id:159,da:11,r:67,g:54,b:83},
{id:159,da:12,r:70,g:47,b:33},
{id:159,da:13,r:70,g:76,b:39},
{id:159,da:14,r:131,g:55,b:42},
{id:159,da:15,r:33,g:20,b:14}
],

[//杂色方块
{id:1,da:1,r:139,g:105,b:51},
{id:79,da:0,r:103,g:126,b:161},
{id:174,da:0,r:146,g:171,b:217},
{id:49,da:0,r:19,g:17,b:28},
{id:88,da:0,r:77,g:58,b:46},
{id:87,da:0,r:100,g:52,b:52},
{id:213,da:0,r:112,g:53,b:24},
{id:121,da:0,r:200,g:202,b:149},
{id:12,da:1,r:157,g:82,b:31},
{id:216,da:0,r:169,g:164,b:139},
{id:165,da:0,r:95,g:155,b:81},
{id:41,da:0,r:235,g:230,b:71},
{id:173,da:0,r:19,g:19,b:19},
{id:42,da:0,r:212,g:212,b:212},
{id:133,da:0,r:74,g:204,b:110},
{id:201,da:0,r:150,g:110,b:151},
{id:12,da:0,r:204,g:197,b:150},
{id:24,da:0,r:199,g:192,b:145},
{id:5,da:0,r:142,g:116,b:71},
{id:5,da:1,r:94,g:71,b:42},
{id:5,da:2,r:180,g:165,b:114},
{id:22,da:0,r:33,g:62,b:134},
{id:57,da:0,r:111,g:208,b:205},
{id:152,da:0,r:134,g:20,b:7},
{id:1,da:6,r:121,g:121,b:121},
{id:5,da:3,r:141,g:101,b:70},
{id:5,da:4,r:156,g:84,b:46},
{id:5,da:5,r:55,g:35,b:16},
{id:2,da:0,r:72,g:94,b:39},
{id:3,da:0,r:124,g:88,b:61},
{id:3,da:1,r:111,g:80,b:57},
{id:1,da:4,r:173,g:173,b:173},
{id:243,da:0,r:78,g:54,b:27},
{id:110,da:0,r:95,g:87,b:92},
{id:1,da:1,r:142,g:106,b:92},
{id:1,da:3,r:168,g:168,b:170},
{id:1,da:5,r:123,g:124,b:125},
{id:1,da:2,r:148,g:105,b:89}
],

[//所有方块
{id:1,da:1,r:139,g:105,b:51},
{id:79,da:0,r:103,g:126,b:161},
{id:174,da:0,r:146,g:171,b:217},
{id:49,da:0,r:19,g:17,b:28},
{id:88,da:0,r:77,g:58,b:46},
{id:87,da:0,r:100,g:52,b:52},
{id:213,da:0,r:112,g:53,b:24},
{id:121,da:0,r:200,g:202,b:149},
{id:12,da:1,r:157,g:82,b:31},
{id:216,da:0,r:169,g:164,b:139},
{id:165,da:0,r:95,g:155,b:81},
{id:41,da:0,r:235,g:230,b:71},
{id:173,da:0,r:19,g:19,b:19},
{id:42,da:0,r:212,g:212,b:212},
{id:133,da:0,r:74,g:204,b:110},
{id:201,da:0,r:150,g:110,b:151},
{id:12,da:0,r:204,g:197,b:150},
{id:24,da:0,r:199,g:192,b:145},
{id:5,da:0,r:142,g:116,b:71},
{id:5,da:1,r:94,g:71,b:42},
{id:5,da:2,r:180,g:165,b:114},
{id:22,da:0,r:33,g:62,b:134},
{id:57,da:0,r:111,g:208,b:205},
{id:152,da:0,r:134,g:20,b:7},
{id:1,da:6,r:121,g:121,b:121},
{id:5,da:3,r:141,g:101,b:70},
{id:5,da:4,r:156,g:84,b:46},
{id:5,da:5,r:55,g:35,b:16},
{id:2,da:0,r:72,g:94,b:39},
{id:3,da:0,r:124,g:88,b:61},
{id:3,da:1,r:111,g:80,b:57},
{id:1,da:4,r:173,g:173,b:173},
{id:243,da:0,r:78,g:54,b:27},
{id:110,da:0,r:95,g:87,b:92},
{id:1,da:1,r:142,g:106,b:92},
{id:1,da:3,r:168,g:168,b:170},
{id:1,da:5,r:123,g:124,b:125},
{id:1,da:2,r:148,g:105,b:89},
{id:237,da:0,r:220,g:220,b:220},
{id:237,da:1,r:255,g:160,b:70},
{id:237,da:2,r:255,g:90,b:255},
{id:237,da:3,r:100,g:185,b:255},
{id:237,da:4,r:250,g:240,b:0},
{id:237,da:5,r:20,g:255,b:0},
{id:237,da:6,r:255,g:150,b:220},
{id:237,da:7,r:75,g:80,b:85},
{id:237,da:8,r:148,g:148,b:148},
{id:237,da:9,r:0,g:150,b:240},
{id:237,da:10,r:190,g:45,b:255},
{id:237,da:11,r:25,g:50,b:245},
{id:237,da:12,r:110,g:45,b:0},
{id:237,da:13,r:40,g:80,b:0},
{id:237,da:14,r:250,g:35,b:30},
{id:237,da:15,r:20,g:20,b:20},
{id:236,da:0,r:200,g:200,b:200},
{id:236,da:1,r:214,g:93,b:0},
{id:236,da:2,r:156,g:45,b:148},
{id:236,da:3,r:33,g:125,b:181},
{id:236,da:4,r:222,g:162,b:16},
{id:236,da:5,r:82,g:154,b:16},
{id:236,da:6,r:197,g:97,b:140},
{id:236,da:7,r:49,g:53,b:58},
{id:236,da:8,r:115,g:117,b:107},
{id:236,da:9,r:25,g:109,b:123},
{id:236,da:10,r:90,g:28,b:140},
{id:236,da:11,r:41,g:45,b:132},
{id:236,da:12,r:90,g:57,b:25},
{id:236,da:13,r:66,g:85,b:33},
{id:236,da:14,r:132,g:28,b:33},
{id:236,da:15,r:0,g:8,b:8},
{id:35,da:0,r:214,g:218,b:219},
{id:35,da:1,r:223,g:108,b:17},
{id:35,da:2,r:180,g:40,b:220},
{id:35,da:3,r:55,g:164,b:203},
{id:35,da:4,r:231,g:184,b:36},
{id:35,da:5,r:100,g:168,b:21},
{id:35,da:6,r:221,g:126,b:156},
{id:35,da:7,r:57,g:62,b:65},
{id:35,da:8,r:129,g:129,b:121},
{id:35,da:9,r:18,g:125,b:133},
{id:35,da:10,r:111,g:137,b:158},
{id:35,da:11,r:48,g:53,b:145},
{id:35,da:12,r:106,g:67,b:38},
{id:35,da:13,r:79,g:101,b:26},
{id:35,da:14,r:148,g:35,b:31},
{id:35,da:15,r:19,g:21,b:24},
{id:159,da:0,r:192,g:163,b:148},
{id:159,da:1,r:148,g:77,b:34},
{id:159,da:2,r:137,g:80,b:100},
{id:159,da:3,r:95,g:107,b:48},
{id:159,da:4,r:170,g:121,b:32},
{id:159,da:5,r:69,g:76,b:38},
{id:159,da:6,r:147,g:71,b:72},
{id:159,da:7,r:123,g:101,b:90},
{id:159,da:8,r:52,g:38,b:33},
{id:159,da:9,r:79,g:83,b:83},
{id:159,da:10,r:109,g:64,b:79},
{id:159,da:11,r:67,g:54,b:83},
{id:159,da:12,r:70,g:47,b:33},
{id:159,da:13,r:70,g:76,b:39},
{id:159,da:14,r:131,g:55,b:42},
{id:159,da:15,r:33,g:20,b:14}
]
];

