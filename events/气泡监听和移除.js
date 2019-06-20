events.observeToast();
events.onToast(function(toast){
    log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
    events.removeAllListeners()
});

// setTimeout(
//   function(){
//     log(events.eventNames())
//     events.removeAllListeners()
//     log('所有监听移除')
//     log(events.eventNames())
//   },3000
// )
