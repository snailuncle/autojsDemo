function queue(name, tasks) {
    this.tasks = tasks.map(t => files.path(t));;
    this.name = name;
    events.broadcast.on("queue." + name + ".next", this.next.bind(this));
}

queue.prototype.next = function(pre) {
    let tasks = this.tasks;
    var preTask = pre >= 0 ? tasks[pre] : null;
    if (preTask) {
        log("%s运行结束", preTask);
    }
    if (pre >= tasks.length - 1) {
        toastLog(this.name + "全部任务运行结束");
        exit();
        return;
    }
    let task = tasks[pre + 1];
    var name = this.name;
    log("准备运行队列%s下一个任务: ", name, task);
    engines.execScriptFile(task, {
        arguments: {
            queue: name,
            order: pre + 1
        }
    });
}


queue.prototype.run = function() {
    this.next(-1);
    setInterval(() => {}, 1000);
}

queue.onTaskStart = function() {
    var args = engines.myEngine().execArgv;
    //log(args);
    var name = args.queue;
    var order = args.order;
    log("运行队列%s的任务: %s", name, engines.myEngine().source);
    events.on("exit", function() {
        events.broadcast.emit("queue." + name + ".next",
            order);
    });
}

module.exports = queue;