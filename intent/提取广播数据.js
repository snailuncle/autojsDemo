let intent = engines.myEngine().execArgv.intent;
if (intent == null) {
  toastLog("请使用定时任务运行此脚本");
  exit();
}
log("action = ", intent.action);
log("package = ", intent.package);
log("data = ", intent.data);
let extras = intent.extras;
log("extras = ", intent.extras);
if (extras) {
  let str = "{\n";
  let iter = extras.keySet().iterator();
  while (iter.hasNext()) {
    let key = iter.next();
    let value = extras.get(key);
    str += "  " + key + ": " + value;
    str += ", \n";
  }
  str += "}";
  log(str);
}
