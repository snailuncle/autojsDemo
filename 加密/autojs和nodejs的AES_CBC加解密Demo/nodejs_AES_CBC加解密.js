/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  nodejs_AES_CBC加解密,autojs_AES_CBC加解密
 */
const crypto = require('crypto');
var iv = new Buffer('0000000000000000'); // 16位
var encrypt = function (data, key) {
  var decodeKey = crypto.createHash('sha256').update(key, 'utf-8').digest();
  var cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);
  return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
};
var decrypt = function (data, key) {
  var encodeKey = crypto.createHash('sha256').update(key, 'utf-8').digest();
  var cipher = crypto.createDecipheriv('aes-256-cbc', encodeKey, iv);
  return cipher.update(data, 'base64', 'utf8') + cipher.final('utf8');
};
var data = '我是要加密的数据'
var key = 'key';
var cipher = encrypt(data, key);
var decipher = decrypt(cipher, key);
console.log(cipher);
console.log(decipher);
