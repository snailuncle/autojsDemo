/**
 * 作者:   家
 * QQ:    203118908
 * 功能:  RSA的加密例子
 */
importClass(java.security.MessageDigest);
importClass(java.security.Key)
importClass(java.security.KeyFactory)
importClass(java.security.KeyPair)
importClass(java.security.KeyPairGenerator)
importClass(java.security.PrivateKey)
importClass(java.security.PublicKey)
importClass(java.security.Signature)
importClass(java.security.interfaces.RSAPrivateKey)
importClass(java.security.interfaces.RSAPublicKey)
importClass(java.security.spec.PKCS8EncodedKeySpec)
importClass(java.security.spec.X509EncodedKeySpec)
importClass(java.util.HashMap)
importClass(java.util.Map)
importClass(javax.crypto.Cipher)
importClass(android.util.Base64)
const KEY_ALGORITHM = "RSA";
const SIGNATURE_ALGORITHM = "MD5withRSA";
const PUBLIC_KEY = "RSAPublicKey";
const PRIVATE_KEY = "RSAPrivateKey";
// // 密钥只能有一行,不能有空格和换行符
// var privateKey = files.read('./privateKey.js')
// var publicKey = files.read('./publicKey.js')
// privateKey = oneLine(privateKey)
// privateKey = privateKey.replace('-----BEGIN RSA PRIVATE KEY-----', '')
// privateKey = privateKey.replace('-----END RSA PRIVATE KEY-----', '')
// publicKey = oneLine(publicKey)
// publicKey = publicKey.replace('-----BEGIN PUBLIC KEY-----', '')
// publicKey = publicKey.replace('-----END PUBLIC KEY-----', '')
// log('privateKey=')
// log(privateKey)
// log('publicKey=')
// log(publicKey)
//-----------------------------------------------------
// 这是我们要加密的数据
var data = 'abc123'
//---------------------------------------------------
data = new java.lang.String(data)
data = data.getBytes()
// 首先初始化密钥
var keyMap = initKey()
log('这是初始化密钥')
log(keyMap)
// 获取公钥和私钥
var publicKey = getPublicKey(keyMap)
publicKey = oneLine(publicKey)
log('这是公钥')
log(publicKey)
var privateKey = getPrivateKey(keyMap)
privateKey = oneLine(privateKey)
log('这是私钥')
log(privateKey)
// 公钥加密 返回的是byte[]
var r = encryptByPublicKey(data, publicKey)
log('这是公钥加密过的数据')
log(r)
// 邮件里面放加密过的数据和签名
var mail = {
  data: r
}
var mySign = sign(mail.data, privateKey)
mail.sign = mySign
// 对邮件做一次消息摘要
mailString = JSON.stringify(mail)
log('发件人做的信息摘要md5=')
var myMd5 = md5(mailString)
log(myMd5)
mail.md5 = myMd5
log('发送的邮件内容=')
mail = JSON.stringify(mail)
log(mail)
//---------------发送邮件对方--------------------------------------------------
// 收到了邮件mail
log('收到的邮件内容=')
log(mail)
mail = JSON.parse(mail)
mailMd5 = mail.md5
delete mail.md5
// 接收方对邮件做一次消息摘要
mailString = JSON.stringify(mail)
log('接收方做的信息摘要md5=')
var myReceiveMd5 = md5(mailString)
log(myReceiveMd5)
var isMd5Right = (mailMd5 === myReceiveMd5)
log('收到的邮件中的md5=')
log(mailMd5)
if (isMd5Right) {
  log("消息摘要md5正确")
  // 开始验证签名
  // 提取未解密的data和sign验证签名
  var data = mail.data
  var sign = mail.sign
  var isPassed = verify(data, publicKey, sign)
  if (isPassed) {
    log('签名验证结果->正确')
    log("此数据时由甲方传来且数据没有被篡改")
    // 解密正文
    data = decryptByPrivateKey(data, privateKey)
    log('这是私钥解密过的数据')
    r = new java.lang.String(data)
    log(r)
  } else {
    log('签名验证结果->错误')
    log('数据可能被篡改了')
  }
} else {
  log('消息摘要md5错误')
}

function md5(string) {
  return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)
}
/**
 * 初始化密钥
 *
 * @return  Map<String, Object>
 * @throws Exception
 */
function initKey() {
  keyPairGen = KeyPairGenerator.getInstance(KEY_ALGORITHM);
  keyPairGen.initialize(1024);
  keyPair = keyPairGen.generateKeyPair();
  // 公钥
  publicKey = keyPair.getPublic();
  // 私钥
  privateKey = keyPair.getPrivate();
  keyMap = new HashMap(2); //  Map<String, Object>
  keyMap.put(PUBLIC_KEY, publicKey);
  keyMap.put(PRIVATE_KEY, privateKey);
  return keyMap;
}
/**
 * 取得私钥
 *
 * @param keyMap  Map<String, Object>
 * @return  String
 * @throws Exception
 */
function getPrivateKey(keyMap) {
  key = keyMap.get(PRIVATE_KEY);
  return encryptBASE64(key.getEncoded());
}
/**
 * 取得公钥
 *
 * @param keyMap  Map<String, Object>
 * @return  String
 * @throws Exception
 */
function getPublicKey(keyMap) {
  key = keyMap.get(PUBLIC_KEY);
  return encryptBASE64(key.getEncoded());
}

function oneLine(s) {
  var str = s.replace(/[\r\n]/g, "");
  return str.trim()
}
/**
 * BASE64加密
 *
 * @param key  byte[]
 * @return  String
 * @throws Exception
 */
function encryptBASE64(r) {
  var r = Base64.encodeToString(r, Base64.NO_WRAP);
  return r
}
/**
 * BASE64解密
 *
 * @param key  String
 * @return byte[]
 * @throws Exception
 */
function decryptBASE64(r) {
  var r = Base64.decode(r, Base64.NO_WRAP)
  return r
}
/**
 * 用私钥对信息生成数字签名
 *
 * @param data
 *            加密数据
 * @param privateKey
 *            私钥
 *
 * @return   String
 * @throws Exception
 */
function sign(data, privateKey) {
  // 解密由base64编码的私钥
  var keyBytes = decryptBASE64(privateKey);
  // 构造PKCS8EncodedKeySpec对象
  var pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);
  // KEY_ALGORITHM 指定的加密算法
  var keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
  // 取私钥匙对象
  var priKey = keyFactory.generatePrivate(pkcs8KeySpec);
  // 用私钥对信息生成数字签名
  var signature = Signature.getInstance(SIGNATURE_ALGORITHM);
  signature.initSign(priKey);
  signature.update(data);
  return encryptBASE64(signature.sign());
}
/**
 * 校验数字签名
 *
 * @param data byte[]
 *            加密数据
 * @param publicKey   String
 *            公钥
 * @param sign  String
 *            数字签名
 *
 * @return 校验成功返回true 失败返回false
 * @throws Exception
 *
 */
function verify(data, publicKey, sign) {
  // 解密由base64编码的公钥
  var keyBytes = decryptBASE64(publicKey); // byte[]
  // 构造X509EncodedKeySpec对象
  var keySpec = new X509EncodedKeySpec(keyBytes);
  // KEY_ALGORITHM 指定的加密算法
  var keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
  // 取公钥匙对象
  var pubKey = keyFactory.generatePublic(keySpec);
  var signature = Signature.getInstance(SIGNATURE_ALGORITHM);
  signature.initVerify(pubKey);
  signature.update(data);
  // 验证签名是否正常
  return signature.verify(decryptBASE64(sign));
}
/**
 * 加密<br>
 * 用公钥加密
 *
 * @param data  byte[]
 * @param key   String
 * @return   byte[]
 * @throws Exception
 */
function encryptByPublicKey(data, key) {
  // 对公钥解密
  var keyBytes = decryptBASE64(key);
  // 取得公钥
  var x509KeySpec = new X509EncodedKeySpec(keyBytes);
  var keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
  var publicKey = keyFactory.generatePublic(x509KeySpec);
  // 对数据加密
  var cipher = Cipher.getInstance(keyFactory.getAlgorithm());
  cipher.init(Cipher.ENCRYPT_MODE, publicKey);
  return cipher.doFinal(data);
}
/**
 * 解密<br>
 * 用公钥解密
 *
 * @param data  byte[]
 * @param key  String
 * @return   byte[]
 * @throws Exception
 */
function decryptByPublicKey(data, key) {
  // 对密钥解密
  var keyBytes = decryptBASE64(key);
  // 取得公钥
  var x509KeySpec = new X509EncodedKeySpec(keyBytes);
  var keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
  var publicKey = keyFactory.generatePublic(x509KeySpec);
  // 对数据解密
  var cipher = Cipher.getInstance(keyFactory.getAlgorithm());
  cipher.init(Cipher.DECRYPT_MODE, publicKey);
  return cipher.doFinal(data);
}
/**
 * 加密<br>
 * 用私钥加密
 *
 * @param data  byte[]
 * @param key   String
 * @return  byte[]
 * @throws Exception
 */
function encryptByPrivateKey(data, key) {
  // 对密钥解密
  var keyBytes = decryptBASE64(key);
  // 取得私钥
  var pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);
  var keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
  var privateKey = keyFactory.generatePrivate(pkcs8KeySpec);
  // 对数据加密
  var cipher = Cipher.getInstance(keyFactory.getAlgorithm());
  cipher.init(Cipher.ENCRYPT_MODE, privateKey);
  return cipher.doFinal(data);
}
/**
 * 解密<br>
 * 用私钥解密
 *
 * @param data  byte[]
 * @param key   String
 * @return  byte[]
 * @throws Exception
 */
function decryptByPrivateKey(data, key) {
  // 对密钥解密
  var keyBytes = decryptBASE64(key);
  // 取得私钥
  var pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);
  var keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
  var privateKey = keyFactory.generatePrivate(pkcs8KeySpec);
  // 对数据解密
  var cipher = Cipher.getInstance(keyFactory.getAlgorithm());
  cipher.init(Cipher.DECRYPT_MODE, privateKey);
  return cipher.doFinal(data);
}
