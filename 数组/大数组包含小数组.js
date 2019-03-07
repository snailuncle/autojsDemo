function bigArrContainsSmallArr(bigArr, smallArr) {
  //对于重复的元素采用计数的方式对比
  var bigArrObj = {}
  var smallArrObj = {}
  for (let i = 0; i < bigArr.length; i++) {
    var has = bigArrObj.hasOwnProperty(bigArr[i])
    if (has) {
      bigArrObj[bigArr[i]]++;
    } else {
      bigArrObj[bigArr[i]] = 1
    }
  }
  for (let i = 0; i < smallArr.length; i++) {
    var has = smallArrObj.hasOwnProperty(smallArr[i])
    if (has) {
      smallArrObj[smallArr[i]]++;
    } else {
      smallArrObj[smallArr[i]] = 1
    }
  }
  for (var k in smallArrObj) {
    if (bigArrObj.hasOwnProperty(k) && bigArrObj[k] >= smallArrObj[k]) {} else {
      return false
    }
  }
  return true
}

var bigArr=[1,2,3,4,11]
var smallArr=[1,1,2,3,4,11]
var r=bigArrContainsSmallArr(bigArr, smallArr)
log(r)
