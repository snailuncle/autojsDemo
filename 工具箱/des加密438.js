importClass("java.security.SecureRandom");
importClass("javax.crypto.spec.DESKeySpec");
importClass("javax.crypto.SecretKeyFactory");



/* 加密使用的 key */



toastLog(encryptDES("hello", "cghg"));
log(java.lang.String("cghg").getBytes())
/**
 * DES 加密
 * @param content 待加密内容
 * @param key     加密的密钥
 * @return 加密后的字节数组
 */

function encryptDES(content, key) {
    try {
        let random = new SecureRandom();
        let desKey = new DESKeySpec(java.lang.Byte(key).byteValue());
        let keyFactory = SecretKeyFactory.getInstance("DES");
        let secretKey = keyFactory.generateSecret(desKey);
        // DES 是加密方式, EBC 是工作模式, PKCS5Padding 是填充模式
        let cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, random);
        return cipher.doFinal(content);
    } catch (e) {
        log(e);
    }
    return null;
}

/**
 * DES 解密
 *
 * @param content 待解密内容
 * @param key     解密的密钥
 * @return 解密的数据
 */
function decryptDES(content, key) {
    try {
        random = new SecureRandom();
        desKey = new DESKeySpec(key);
        keyFactory = SecretKeyFactory.getInstance("DES");
        secretKey = keyFactory.generateSecret(desKey);
        cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, random);
        return cipher.doFinal(content);
    } catch (e) {
        log(e);
    }
    return null;
}