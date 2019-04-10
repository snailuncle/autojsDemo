function toasts(text, time) {
    text = text || null;
    time = time || 2500;
    if (isNaN(time)) return;
    let arr = engines.all(),
        run = false;
    for (i in arr) {
        if (files.getName(arr[i].getSource()) == "toast.js") {
            run = true;
            break;
        }
    }
    if (!run) {
        let tex = "var t = toasts();\nevents.broadcast.on(\"toast\", (arr) => {\nif (arr.length != 2) return;\nlet time = new Number(arr[1][1]),text = arr[1][0];\nif(isNaN(time)) time = 5000;\nif(!text) return;\nt(text, time);});\nsetInterval(() => {}, 10000);\nfunction toasts() {\nvar th = \"\",Y = device.width / 4,X = Y,x = Y * 2;\nvar flo = floaty.rawWindow(\n<frame gravity=\"center\" bg=\"#00000000\">\n<text id=\"message\"  bg=\"#70000000\" textColor=\"#ffffff\" textSize=\"18sp\" gravity=\"center\" w=\"auto\" padding=\"1\"/>\n</frame>);\nflo.setTouchable(false);\nflo.setSize(0, 0);\nreturn doflo;\nfunction doflo(mes, time) {\nmes = \" \" + mes.toString().split(\"\\n\").join(\" \\n \") + \" \";\nif (th != \"\") {\nth.interrupt();\nth = \"\";}\nui.run(function() {\nflo.message.setText(mes);});\nflo.setPosition(X, Y);\nflo.setSize(x, -2);\nth = threads.start(function() {\nsleep(time);\nui.run(function() {\nflo.message.setText(\"\");});\nflo.setSize(0, 0);\nth = \"\";});}}";
        engines.execScript("toast", tex);
        sleep(500);
    }
    events.broadcast.emit("toast", [[engines.myEngine(),[text, time]]]);
}
toast("🈶🈚️🈸🈺🈷✴️")