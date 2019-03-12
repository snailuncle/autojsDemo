var window = floaty.rawWindow(
  <canvas id = "board"
  h = "{{device.height}}"
  w = "{{device.width}}"
  />
);
window.setTouchable(false);
setInterval(() => {}, 3000)
paint = new Paint()
paint.setStrokeWidth(5);
paint.setColor(-28707)
paint.setStyle(Paint.Style.STROKE);
window.board.on("draw", function (canvas) {
  canvas.drawRect(0,0,300,300,paint)
});

