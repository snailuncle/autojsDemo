"ui";
var storage = storages.create("setting");
var date = '1231111111111111'
ui.layout(
  <vertical>
    <input id="date" text="{{date}}" />
    <button id="ok" text="开始" />
  </vertical>
);

auto();
ui.ok.click(function() {
  threads.start(function() {
    date = ui.date.text();
    log(date);
    storage.put("date", date);
    log(storage.get("date"));
  });
});
