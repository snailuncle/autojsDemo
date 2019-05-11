/**
 * 作者: 家
 * QQ:  203118908
 * 功能: autojs_AES_CBC加解密
 *
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
}
for (var k in config) {
  var v = config[k]
  config[k] = new java.lang.String(v)
}

function javaEncrypt(clearText, privateKey) {
  var clearText = new java.lang.String(clearText)
  var input = clearText.getBytes(config.bm); // byte[]
  var md = MessageDigest.getInstance("SHA-256");
  var thedigest = md.digest(privateKey.getBytes("utf-8")); // byte[]
  var skc = new SecretKeySpec(thedigest, "AES");
  var cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
  cipher.init(Cipher.ENCRYPT_MODE, skc, new IvParameterSpec(config.iv.getBytes()));
  var cipherText = util.java.array('byte', cipher.getOutputSize(input.length)); // byte[]
  var ctLength = cipher.update(input, 0, input.length, cipherText, 0); // int
  ctLength += cipher.doFinal(cipherText, ctLength);
  var result = base64Encode(cipherText);
  return result;
}

function javaDecrypt(ciphertext, privateKey) {
  var keyb = privateKey.getBytes(config.bm); // byte[]
  var md = MessageDigest.getInstance("SHA-256");
  var thedigest = md.digest(keyb); // byte[]
  var skey = new SecretKeySpec(thedigest, "AES");
  var dcipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
  dcipher.init(Cipher.DECRYPT_MODE, skey, new IvParameterSpec(config.iv.getBytes()));
  var clearbyte = dcipher.doFinal(base64Decode(ciphertext));
  return new java.lang.String(clearbyte);
}

function base64Encode(r) {
  var r = android.util.Base64.encodeToString(r, 0);
  return r
}

function base64Decode(r) {
  var r = android.util.Base64.decode(r, 0)
  return r
}

function encrypt(clearText) {
  var rndHundredNumbers;
  var firstThreeFigures;
  var privateKeyLength;
  while (!privateKeyLength || privateKeyLength < 1) {
    rndHundredNumbers = rndString(100, true)
    firstThreeFigures = rndHundredNumbers.slice(0, 3)
    privateKeyLength = parseInt(firstThreeFigures.slice(0, 1)) + parseInt(firstThreeFigures.slice(1, 2)) + parseInt(firstThreeFigures.slice(2, 3))
  }
  var rndPrivateKeyLength = rndString(privateKeyLength)
  var privateKey = new java.lang.String(rndPrivateKeyLength)
  var clearText = new java.lang.String(clearText)
  var encryptResult = javaEncrypt(clearText, privateKey)
  var result = rndHundredNumbers + rndPrivateKeyLength + encryptResult
  return result
}

function decrypt(ciphertext) {
  var info = splitCiphertextAndPassword(ciphertext)
  var privateKey = info.privateKey
  var ciphertext = info.ciphertext
  privateKey = new java.lang.String(privateKey)
  ciphertext = new java.lang.String(ciphertext)
  return javaDecrypt(ciphertext, privateKey).toString()
}

function rndString(PassLength, pureNumber) {
  var pureNumber = pureNumber || false
  var PassLength = PassLength || 100
  var str = 'abcdefghijklmnopqrstuvwxyz';
  var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var NUM = '0123456789'
  var text;
  if (pureNumber) {
    text = NUM.split('')
  } else {
    text = str.split('').concat(STR.split('')).concat(NUM.split(''))
  }
  var pw = '';
  for (var i = 0; i < PassLength; i++) {
    var strpos = random(0, text.length - 1);
    pw += text[strpos].charAt(random(0, text[strpos].length - 1));
  }
  return pw;
}

function splitCiphertextAndPassword(ciphertext) {
  var firstThreeFigures = ciphertext.slice(0, 3)
  var keyLength = parseInt(firstThreeFigures.slice(0, 1)) + parseInt(firstThreeFigures.slice(1, 2)) + parseInt(firstThreeFigures.slice(2, 3))
  var privateKey = ciphertext.slice(100, 100 + keyLength)
  var ciphertext = ciphertext.slice(100 + keyLength)
  var result = {
    privateKey: privateKey,
    ciphertext: ciphertext
  }
  return result
}
var clearText = '作者: 家'
var ciphertext = encrypt(clearText)
log(ciphertext)
var clearText = decrypt(ciphertext)
log(clearText)
