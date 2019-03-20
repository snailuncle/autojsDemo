/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  自定义toast
 */
var count = function () {
  var count = 6
  return function () {
    return count++;
  }
}()

function thread(text, count) {
  threads.start(
    function () {
      for (let i = 0; i < 100; i++) {
        toastAt(text, 366, count * 100)
        sleep(20)
      }
    }
  )
}

function toastAt(msg, x, y) {
  ui.run(() => toastAt0(msg, x, y));
}

function toastAt0(msg, x, y) {
  importClass(android.widget.Toast);
  importClass(android.view.Gravity);
  importClass(android.widget.TextView)
  var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
  toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
  var child = new TextView(context);
  child.setWidth(300);
  child.setHeight(100);
  child.setTextSize(20);
  child.setTextColor(colors.parseColor("#ff00f0"))
  child.setText(msg);
  child.setBackgroundColor(rndColor())
  child.setTextColor(rndColor())
  child.setGravity(1);
  log(child)
  log(toast.setView(child))
  toast.show();
}

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
thread('马', count())
thread('冬', count())
thread('梅', count())
