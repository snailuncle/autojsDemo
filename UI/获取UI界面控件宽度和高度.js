
'ui';
var marginSize = '100'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
ui.layout(
  <vertical>
    <frame margin= '{{myMargin}}' >
      <frame>
        <canvas id='board'></canvas>
      </frame>
    </frame>
  </vertical>
)
vto = ui.board.getViewTreeObserver();
var hasMeasured = false;
vto.addOnPreDrawListener(new android.view.ViewTreeObserver.OnPreDrawListener({
  onPreDraw: function () {
    if (hasMeasured == false) {
      // left1 = ui.board.getMeasuredLeft();
      height1 = ui.board.getMeasuredHeight();
      width1 = ui.board.getMeasuredWidth();
      //获取到宽度和高度后，可用于计算
      // log("left1::" + left1);
      log("height::" + height1);
      log("width::" + width1);
      hasMeasured = true;
    }
    return true;
  }
}));
