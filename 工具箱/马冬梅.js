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
  var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
  toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
  toast.show();
}
thread('马', count())
thread('冬', count())
thread('梅', count())
