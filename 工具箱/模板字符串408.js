var name = 'jake'
var age = '18'
parseTemplate = (str) => {
  var reg = /\$\{.+?\}/g
  var r = str.match(reg)
  var variable;
  var newStr;
  for (var i = 0; i < r.length; i++) {
    variable = r[i].replace(/[${}]/g, '')
    newStr = str.replace(r[i], global[variable])
    str = newStr
  }
  return str
}
str = "im ${name}, my age is ${age}"
newStr = parseTemplate(str)
log(newStr)
