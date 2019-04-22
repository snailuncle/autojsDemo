/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  遍历查找指定类型的子控件
 */
'ui';
ui.layout(
  <vertical id='parent'>
    <img src='file://./paycoadsfsdde.png'></img>
    <vertical id='me'>
      <button id='but'>123</button>
      <button>456</button>
      <button>789</button>
      <text text='111' textSize='100sp'></text>
      <text text='222' textSize='100sp'></text>
      <vertical>
        <text text='333' textSize='100sp'></text>
        <text text='444' textSize='100sp'></text>
      </vertical>
    </vertical>
  </vertical>
)
function 遍历查找指定类型的子控件(parentView, sonType, sonViewArr) {
  // log(view.accessibilityClassName)
  // android.widget.TextView 文本控件
  // android.widget.ImageView 图片控件
  // android.widget.Button 按钮控件
  // android.widget.EditText 输入框控件
  // android.widget.AbsListView 列表控件
  // android.widget.LinearLayout 线性布局
  // android.widget.FrameLayout 帧布局
  // android.widget.RelativeLayout 相对布局
  // android.widget.RelativeLayout 相对布局
  // android.support.v7.widget.RecyclerView 通常也是列表控件
  var sonViewArr = sonViewArr || []
  if (parentView instanceof android.view.ViewGroup) {
    var childCount = parentView.childCount
    if (childCount && childCount > 0) {
      for (var i = 0; i < childCount; i++) {
        var childView = parentView.getChildAt(i)
        var childViewType = childView.accessibilityClassName
        if (childViewType === sonType) {
          sonViewArr.push(childView)
        }
        if (childView instanceof android.view.ViewGroup) {
          return 遍历查找指定类型的子控件(childView, sonType, sonViewArr)
        }
      }
      return sonViewArr
    } else {
      return sonViewArr
    }
  } else {
    return sonViewArr
  }
}
r = 遍历查找指定类型的子控件(ui.parent, 'android.widget.TextView')
log(r)
