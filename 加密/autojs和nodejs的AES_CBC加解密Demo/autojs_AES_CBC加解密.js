/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  nodejs_AES_CBC加解密,autojs_AES_CBC加解密
 */
importClass("java.security.SecureRandom");
importClass("java.security.MessageDigest");
importClass("javax.crypto.spec.DESKeySpec");
importClass("javax.crypto.SecretKeyFactory");
importClass("javax.crypto.Cipher");
importClass("java.security.NoSuchAlgorithmException");
importClass("javax.crypto.KeyGenerator");
importClass("javax.crypto.SecretKey");
importClass("javax.crypto.spec.SecretKeySpec");
importClass("javax.crypto.KeyGenerator");
importClass("javax.crypto.spec.IvParameterSpec");
var config = {
  iv: "0000000000000000",
  bm: "UTF-8",
  dataPassword: 'key',
  cleartext: '我是要加密的数据'
}
for (var k in config) {
  var v = config[k]
  config[k] = new java.lang.String(v)
}

function decrypt(encrypted, seed) {
  var keyb = seed.getBytes(config.bm); // 	byte[]
  var md = MessageDigest.getInstance("SHA-256");
  var thedigest = md.digest(keyb); // byte[]
  var skey = new SecretKeySpec(thedigest, "AES");
  var dcipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
  dcipher.init(Cipher.DECRYPT_MODE, skey, new IvParameterSpec(config.iv.getBytes()));
  var clearbyte = dcipher.doFinal(base64Decode(encrypted));
  return new java.lang.String(clearbyte);
}

function encrypt(content, key) {
  var content = new java.lang.String(content)
  var input = content.getBytes(config.bm); // byte[]
  var md = MessageDigest.getInstance("SHA-256");
  var thedigest = md.digest(key.getBytes("utf-8")); // byte[]
  var skc = new SecretKeySpec(thedigest, "AES");
  var cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
  cipher.init(Cipher.ENCRYPT_MODE, skc, new IvParameterSpec(config.iv.getBytes()));
  var cipherText = util.java.array('byte', cipher.getOutputSize(input.length)); // byte[]
  var  ctLength = cipher.update(input, 0, input.length, cipherText, 0); // int
  ctLength += cipher.doFinal(cipherText, ctLength);
  var result = base64Encode(cipherText);
  return result;
}

function base64Encode(r) {
  var r = android.util.Base64.encodeToString(r, 0);
  return r
}

function base64Decode(r) {
  var r = android.util.Base64.decode(r, 0)
  return r
}
var data = config.cleartext;
var key = config.dataPassword;
var cipher = encrypt(data, key);
var decipher = decrypt(cipher, key);
log(cipher);
log(decipher);
