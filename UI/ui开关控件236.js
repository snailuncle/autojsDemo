"ui";
ui.layout(
   <vertical padding="100" gravity="center">   
    <Switch id="kaiguan" gravity="center" w="150" h="200"/>
    </vertical>
);


ui.run(function(){
ui.kaiguan.setChecked(false);
ui.kaiguan.setShowText(true);
ui.kaiguan.getThumbTextPadding();
//ui.kaiguan.setTrackResource(0);
ui.kaiguan.setSwitchPadding(5);
ui.kaiguan.setSplitTrack(true);
//ui.kaiguan.setTextOff();
ui.kaiguan.toggle();
ui.kaiguan.setSwitchMinWidth(50);
//ui.kaiguan.setThumbTintList("#123456")
});
/*
Switch(Context context)
构造一个默认样式的新Switch。
Switch(Context context, AttributeSet attrs)
构造一个默认样式的新Switch，其请求指定的样式属性覆盖。
Switch(Context context, AttributeSet attrs, int defStyleAttr)
构造一个由指定的主题属性决定的默认样式的新Switch，其请求指定的样式属性覆盖。
Switch(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)
构造一个由指定的主题属性或样式资源决定的默认样式的新Switch，其请求指定的样式属性覆盖。

Public方法
void draw(Canvas c)
手动将此视图 (及其所有子项) 渲染到指定的Canvas。
void drawableHotspotChanged(float x, float y)
每当视图热点发生改变时，调用此方法，并需要传播到由视图管理的drawable或子视图。
CharSequence getAccessibilityClassName()
返回此对象的类名，用于辅助功能目的。
int getCompoundPaddingLeft()
返回视图左内边距（padding）的大小，如果有左边Drawable的话，则加上它的空间。
int getCompoundPaddingRight()
返回视图右内边距（padding）的大小，如果有右边Drawable的话，则加上它的空间。
boolean getShowText()
boolean getSplitTrack()
返回轨道是否应该被滑块分割。
int getSwitchMinWidth()
获取视图的最小宽度（以像素为单位）。
int getSwitchPadding()
设置switch和关联文字之间的水平内边距（padding)。
CharSequence getTextOff()
返回按钮未选中时显示的文本。
CharSequence getTextOn()
返回按钮选中时显示的文本。
Drawable getThumbDrawable()
获取switch滑块的drawable ——这是一个可以按下并且在轨道内拖动的小块。
int getThumbTextPadding()
获取switch文本的水平内边距（padding）。
ColorStateList getThumbTintList()
PorterDuff.Mode getThumbTintMode()
Drawable getTrackDrawable()
获取轨道的drawable，其用于switch内部。
ColorStateList getTrackTintList()
PorterDuff.Mode getTrackTintMode()
void jumpDrawablesToCurrentState()
在与此视图关联的所有drawable对象上，调用Drawable.jumpToCurrentState()。
void onMeasure(int widthMeasureSpec, int heightMeasureSpec)
测量视图，它的内容决定测量得到宽度和高度。
void onProvideAutoFillStructure(ViewStructure structure, int flags)
当从一个视图中获取辅助结构时调用, 作为auto-fill请求的一部分。
void onProvideStructure(ViewStructure structure)
当从一个视图中获取辅助结构时调用, 作为Activity.onProvideAssistData的一部分。
boolean onTouchEvent(MotionEvent ev)
实现此方法，以处理触摸屏的MotionEvent。
void setChecked(boolean checked)
改变按钮的选中状态。
void setShowText(boolean showText)
设置是否显示打开/关闭文本。
void setSplitTrack(boolean splitTrack)
设置轨道是否应该被滑块分割。
void setSwitchMinWidth(int pixels)
设置switch控件的最小宽度（以像素为单位）。
void setSwitchPadding(int pixels)
设置开关和关联文字之间的水平内边距（padding)。
void setSwitchTextAppearance(Context context, int resid)
设置指定TextAppearance资源中的switch控件的文本颜色，大小，样式，提示文本颜色和高亮颜色。
void setSwitchTypeface(Typeface tf)
设置文本应该显示在开关上的字体。
void setSwitchTypeface(Typeface tf, int style)
设置在switch上显示的文字的字体和样式，如果你所提供的字体中没有所有的字形，那么将开启Paint中合成的黑体和斜体字形。
void setTextOff(CharSequence textOff)
设置按钮未选中时显示的文本。
void setTextOn(CharSequence textOn)
设置按钮被选中状态下的显示文本。
void setThumbDrawable(Drawable thumb)
设置switch滑块的drawable ——这是一个可以按下并且在轨道内拖动的小块。
void setThumbResource(int resId)
设置switch滑块的drawable ——这是一个可以按下并且在轨道内拖动的小块。
void setThumbTextPadding(int pixels)
设置switch文本的水平内边距（padding）。
void setThumbTintList(ColorStateList tint)
滑块drawable的tint。
void setThumbTintMode(PorterDuff.Mode tintMode)
设置混合模式，用于由setThumbTintList(ColorStateList)指定的滑块drawable的着色。
void setTrackDrawable(Drawable track)
设置轨道的drawable，其用于switch内部。
void setTrackResource(int resId)
设置轨道的drawable，其用于switch内部。
void setTrackTintList(ColorStateList tint)
用于滑轨drawable的tint。
void setTrackTintMode(PorterDuff.Mode tintMode)
设置混合模式，用于由setTrackTintList(ColorStateList)指定的轨道drawable的着色。
void toggle()
将视图的选中状态更改为与当前状态相反的状态。
保护方法
void drawableStateChanged()
每当视图状态发生变化时, 都会调用此方法, 从而影响所显示的drawable的状态。
int[] onCreateDrawableState(int extraSpace)
生成此视图的新Drawable状态。
void onDraw(Canvas canvas)
实现此方法以完成绘制。
void onLayout(boolean changed, int left, int top, int right, int bottom)
当此视图分配大小和位置给它的每个子项时，从布局中调用。
boolean verifyDrawable(Drawable who)
如果你的视图子类要显示自己的drawable对象，则应该重载此方法，并为自己正在显示的任何drawable返回true。

*/

