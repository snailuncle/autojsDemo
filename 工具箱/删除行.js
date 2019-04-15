var path = "/sdcard/脚本/test.txt"
var lineNum = 0
deletedLine(path, lineNum)

function deletedLine(path, lineNum) {
  var file, result;
  file = open(path, "r")
  result = file.readlines()
  file.close();
  var tempArr = Array.prototype.slice.call(result);
  var line = tempArr.splice(lineNum, 1);
  file = open(path, "w")
  result = file.writelines(tempArr)
  file.flush();
  file.close();
  return line;
}
