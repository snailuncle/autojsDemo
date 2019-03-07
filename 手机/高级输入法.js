var window = floaty.window(
  <text id="text"/>
);

for (var i = 0; i < 50; i++) {
  ui.run(() => {
      imm = window.text.getContext().getSystemService(context.INPUT_METHOD_SERVICE);
      imm.toggleSoftInput(0, android.view.inputmethod.InputMethodManager.SHOW_FORCED);
  });
  sleep(100);
};
