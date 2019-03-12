
var Event = {
  // 通过on接口监听事件eventName
  // 如果事件eventName被触发，则执行callback回调函数
  eventNameArr:[],
  on: function (eventName, callback) {
      //你的代码
      this.eventNameArr.push(
        {
          eventOner:this,
          eventName:eventName,
          callback:callback
        }
      )
  },
  // 触发事件 eventName
  emit: function (eventName) {
    // log(this)
      var arrTemp=[]
      for(let i=1;i<arguments.length;i++){
        arrTemp.push(arguments[i])
      }
      //你的代码
      this.eventNameArr.map(
        (eventOn)=>{
          if(eventOn.eventName == eventName && eventOn.eventOner == this){
            eventOn.callback.apply(null,arrTemp)
          }
        }
      )
  }
};
// 测试1
Event.on('test', function (result) {
    console.log(result);
});
Event.on('test', function () {
    console.log('test');
});
Event.emit('test', 'hello world'); // 输出 'hello world' 和 'test'
// 测试2
var person1 = {};
var person2 = {};
Object.assign(person1, Event);
Object.assign(person2, Event);
// log('Event=')
// log(Event)
// log('person1=')
// log(person1)
// log('person2=')
// log(person2)
person1.on('call1', function () {
    console.log('person1');
});
person2.on('call2', function () {
    console.log('person2');
});
log('person测试开始')
person1.emit('call1'); // 输出 'person1'
person1.emit('call2'); // 没有输出
person2.emit('call1'); // 没有输出
person2.emit('call2'); // 输出 'person2'
log('person测试结束')
// log(person1)
// log(person2)
