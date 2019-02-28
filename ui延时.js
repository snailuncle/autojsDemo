"ui";
ui.layout(
    <vertical>
        <button text="灰太狼数羊"/>
        <button id='num' text="第0只羊"/>
    </vertical>
);
threads.start(
  function () {
    main()
  }
)

function main() {
  for (let i = 0; i < 100; i++) {
    ui.run(
      () => {
        ui.num.setText(util.format('第%d只羊', i))
      }
    )
    sleep(1000)
  }
}
