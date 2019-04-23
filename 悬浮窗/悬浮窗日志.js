let w = floaty.rawWindow(
  <vertical bg="#60000000">
      <com.stardust.autojs.core.console.ConsoleView id="ConS" margin="30"/>
  </vertical>
);
w.setSize(-1, -1);
w.setTouchable(false);
ui.run(() => {
  w.ConS.setConsole(org.autojs.autojs.autojs.AutoJs.getInstance().getGlobalConsole());
  w.ConS.findViewById(org.autojs.autojs.R.id.input_container).setVisibility(android.view.View.GONE);
});
threads.start(function() {
  let a = 0;
  while (true) {
      // log(a++);
      sleep(1000);
  };
})
