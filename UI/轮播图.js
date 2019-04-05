/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  轮播图
 * 备注:　不会设置循环，不会设置图片居中，哪位大神指点下
 */

'ui';
ui.layout(
  <RelativeLayout layout_width="match_parent" layout_height="match_parent" gravity='center'>
    <AdapterViewFlipper  id='flipper' layout_width="match_parent" layout_height="match_parent" flipInterval="10000" loopViews = 'true' layout_alignParentTop="true" autoStart='true' gravity='center'
    />
    <Button    id='prev_btn' layout_width="wrap_content" layout_height="wrap_content" layout_alignParentBottom="true" layout_alignParentLeft="true"
      text="上一个" />
    <Button   id='next_btn'  layout_width="wrap_content" layout_height="wrap_content" layout_alignParentBottom="true" layout_centerHorizontal="true"
      text="下一个" />
    <Button   id='auto_btn'  layout_width="wrap_content" layout_height="wrap_content" layout_alignParentBottom="true" layout_alignParentRight="true"
      text="自动播放" />
  </RelativeLayout>

)
importClass(android.content.Context)
importClass(android.view.View)
importClass(android.view.ViewGroup)
importClass(android.widget.BaseAdapter)
importClass(android.widget.ImageView)
importClass(android.os.Bundle)
// importClass(android.support.v7.app.AppCompatActivity)
importClass(android.view.View)
importClass(android.widget.AdapterViewFlipper)
importClass(android.widget.Button)

function MyFilpperAdapter(context, imageIds) {
  mContext = null;
  mImageIds = null;
  this.mContext = context;
  this.mImageIds = imageIds;
  this.getCount = () => {
    return this.mImageIds.length;
  }
  this.getItem = (position) => {
    return position;
  }
  this.getItemId = (position) => {
    return position;
  }
  // 该方法返回的View代表了每个列表项
  this.getView = (position, convertView, parent) => {
    imageView = null;
    if (null == convertView) {
      log('null == convertView')
      // 创建一个ImageView
      imageView = new ImageView(this.mContext);




      // 设置ImageView的缩放类型
      imageView.setScaleType(ImageView.ScaleType.FIT_XY);
      // 为imageView设置布局参数
      imageView.setLayoutParams(new ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
      convertView = imageView;
    } else {
      log('null !== convertView')
      imageView = convertView;
    }
    // 给ImageView设置图片资源
    imageView.setBackgroundResource(this.mImageIds[position]);
// imageView.setImageResource(resId);宽高完全取决于图片大小
// imageView.setBackgroundResource(resId);// 这样就可以自适应


// WRAP_CONTENT
// FILL_PARENT

layoutParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1)

layoutParams.gravity=android.widget.RelativeLayout.CENTER_IN_PARENT

var maringSize=100
layoutParams.setMargins(maringSize,maringSize,maringSize,maringSize)


function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  log(attrs)
}

imageView.setLayoutParams(layoutParams);









    return imageView;
  }
}
ui.post(
  function () {
    main()
  }, 100
)

function main() {

  mFlipper = null;
  mPrevBtn = null;
  mNextBtn = null;
  mAutoBtn = null;
  mImageIds = [
    '2131230920', '2131230921', '2131230922',
    '2131230920', '2131230921', '2131230922',
  ];
  // 获取界面组件
  // mFlipper = findViewById(R.id.flipper); // AdapterViewFlipper
  // mPrevBtn = findViewById(R.id.prev_btn); // Button
  // mNextBtn = findViewById(R.id.next_btn); // Button
  // mAutoBtn = findViewById(R.id.auto_btn); // Button
  mFlipper = ui.findView('flipper'); // AdapterViewFlipper
  mPrevBtn = ui.findView('prev_btn'); // Button
  mNextBtn = ui.findView('next_btn'); // Button
  mAutoBtn = ui.findView('auto_btn'); // Button



  mFlipper.setFlipInterval(2000)
  mFlipper.startFlipping();
  // 为AdapterViewFlipper设置Adapter
  adapter = new MyFilpperAdapter(context, mImageIds); // MyFilpperAdapter
  mFlipper.setAdapter(adapter);
  ui.prev_btn.on('click', function () {
    // 显示上一个组件
    mFlipper.showPrevious();
    // 停止自动播放
    mFlipper.stopFlipping();
  })
  ui.next_btn.on('click', function () {
    // 显示下一个组件。
    mFlipper.showNext();
    // 停止自动播放
    mFlipper.stopFlipping();
  })
  ui.auto_btn.on('click', function () {
    // 开始自动播放
    mFlipper.setFlipInterval(2000)
    mFlipper.startFlipping();

  })
}
