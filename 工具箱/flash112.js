var single = (function () {
  var unique;

  function getInstance() {
    if (unique === undefined) {
      unique = new Flash();
    }
    return unique;
  }
  return {
    getInstance: getInstance
  }
})();

function Flash() {}
Flash.prototype.update = function (content, x, y, color, t) {
  this.content = content || '未传入参数'
  this.x = x || random(100, 300)
  this.y = y || random(100, 900)
  this.color = color || -2278181
  this.t = t || 2000
}
Flash.prototype.show = function () {
  var window = floaty.rawWindow(
    <card cardBackgroundColor="#aa00FF00" cardCornerRadius="18dp">
      <text id="text" size="30dp"  layout_width="wrap_content"  layout_height="wrap_content"layout_gravity="center" gravity="center" paddingLeft="10" paddingRight="10" paddingTop="10" paddingBottom="10" >123</text>
    </card>
  );
  window.text.setText(this.content);
  window.text.setBackgroundColor(this.color);
  window.setPosition(this.x, this.y);
  setTimeout(() => {
    window.close();
  }, this.t);
}

function flash(content, x, y, color, t) {
  var content = content.toString()
  var f = single.getInstance()
  f.update(content, x, y, color, t)
  f.show()
}
for (let i = 0; i < 10; i++) {
  var color = colors.rgb(random(0, 255), random(0, 255), random(0, 255))
  flash(i * i * i * i * i + "", 300, 200 + i * 150, color, (i + 1) * 1000);
}
flash('hello world')
flash('Are you ok?')
flash('我很好')
flash('you are beautiful')
