events.observeToast();
events.once('toast', function () {
  log('bbbbbbbbbbbbbbbb')
})
printObj(events)
function printObj(obj){
  var arr=[]
  for(var k in obj){
    arr.push(k)
  }
  arr.sort()
  log(arr)
  return arr
}
