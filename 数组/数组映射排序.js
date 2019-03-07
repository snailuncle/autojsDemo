// 此脚本使用场景
// 有个数组问题大伙帮个忙呗，举个栗子，我有两个变量，a数组里有5 9 3 8这4个数值，b数组有0 6 2 3这4个数值，a和b数组是对应的，我想把a数组的值从大到小排序，把a结果为9 8 5 3 ，同时b的结果也为 6 3 0 2另外b不需要从大到小排序，只要对应a的位子，如何处理？
// a可重复,  b不会重复



//b是一个不会重复的数组,不重复的话,就当key
// b 是 key   a 是 value
function bind2Arr(a,b){
  var obj={}
  for(var i=0;i<a.length;i++){
    var key=b[i]
    var value=a[i]
    obj[key]=value
  }
  return obj
}

//对象变成数组,方便排序
function obj2Arr(obj){
  var arr=[]
  for(var k in obj){
    var objTemp={}
    objTemp[k]=obj[k]
    var element=objTemp
    arr.push(element)
  }
  return arr
}

// 按照对象的值大小排序对象 由大到小
function sortObj(objArr) {
  objArr.sort(sequence)
  return objArr
}
function sequence(a, b) {
  if (getObjValue(a) > getObjValue(b)) {
    return -1;
  } else if (getObjValue(a) < getObjValue(b)) {
    return 1
  } else {
    return 0;
  }
}

function getObjValue(obj){
  for(var k in obj){
    return obj[k]
  }
}
function getObjKey(obj){
  for(var k in obj){
    return k
  }
}

//把对象数组变成两个数组
function restoreArr(objArr){
  var a=[]
  var b=[]
  for(var i=0;i<objArr.length;i++){
    a.push(getObjValue(objArr[i]))
    b.push(getObjKey(objArr[i]))
  }
  return {
    a:a,
    b:b
  }
}

var a = [5, 9, 3, 8]
var b = [0, 6, 2, 3]

var obj=bind2Arr(a,b)
var arr=obj2Arr(obj)
arr=sortObj(arr)
var result=restoreArr(arr)
log(result.a)
log(result.b)
