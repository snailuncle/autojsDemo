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
ui.post(
  function () {
    var view = ui.board
    var rect = new android.graphics.Rect;
    view.getBoundsOnScreen(rect)
    log(rect.left)
    log(rect.top)
    log(rect.centerX())
    log(rect.centerY())
  }
)

