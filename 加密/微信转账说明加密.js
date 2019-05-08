// 这个字符串里有bmob的 objectId,脚本序号,日期
// objectId 10位,脚本序号 4位,日期 4位 , 一共18位
// 63b724fc4c10070428  这是18位
// 微信转账留言最长20位
// 剩下两位
// 一个密钥   一个循环次数
var 微信转账说明 = '63b724fc4c10070428'
var 多个加密结果 = []
for (var i = 0; i < 10; i++) {
  var r = 加密(微信转账说明)
  多个加密结果.push(r)
}
log(多个加密结果)

function 加密(明文) {
  var 密钥 = random(1, 9)
  var 循环次数 = random(1, 9)
  var 密文 = []
  var 明文 = 明文.split('')
  // log(util.format('密钥=%s, 循环次数=%s', 密钥, 循环次数))
  for (var i = 0; i < 循环次数; i++) {
    明文.map(
      (字符) => {
        var 移位后的字符 = 指定字符后面的第n个字符(字符, 密钥)
        密文.push(移位后的字符)
      }
    )
    var 最后一位字符 = 密文.splice(-1, 1)
    密文.unshift(最后一位字符[0])
    明文 = 密文
    if (i >= (循环次数 - 1)) {
      break
    }
    密文 = []
  }
  密文 = 密文.join('')
  密文 = 密文 + 密钥 + 循环次数
  return 密文
}

function 指定字符后面的第n个字符(指定字符, n) {
  var lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  var num = '0123456789';
  var allChars = lowerCaseLetters + num
  allChars = allChars + allChars
  var 指定字符首次出现的位置 = allChars.indexOf(指定字符)
  var result = allChars.charAt(指定字符首次出现的位置 + n)
  return result
}
