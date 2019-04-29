function md5(string) {
  return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
  .digest(java.lang.String(string).getBytes())).toString(16);
}