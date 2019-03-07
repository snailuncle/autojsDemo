/**
 * 将汉字转换为全拼
 * @param src
 * @return
 */
function getPinYin(src) {
  var sd = files.getSdcardPath()
  var jarPath = files.join(sd, 'pinyin4j-2.5.0.jar')
  runtime.loadJar(jarPath)
  importClass(net.sourceforge.pinyin4j.PinyinHelper);
  importClass(net.sourceforge.pinyin4j.format.HanyuPinyinCaseType);
  importClass(net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat);
  importClass(net.sourceforge.pinyin4j.format.HanyuPinyinToneType);
  importClass(net.sourceforge.pinyin4j.format.HanyuPinyinVCharType);
  importClass(net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination);
  importClass(java.io.UnsupportedEncodingException);
  var src = new java.lang.String(src)
  var hz = null;
  hz = src.toCharArray(); //该方法的作用是返回一个字符数组，该字符数组中存放了当前字符串中的所有字符
  var py = new Array(hz.length); //该数组用来存储
  //设置汉子拼音输出的格式
  var format = new HanyuPinyinOutputFormat();
  format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
  format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
  format.setVCharType(HanyuPinyinVCharType.WITH_V);
  var pys = ""; //存放拼音字符串
  var len = hz.length;
  try {
    for (var i = 0; i < len; i++) {
      //先判断是否为汉字字符
      if ((java.lang.Character.toString(hz[i])).match(/[\u4e00-\u9fa5]+/)) {
        //将汉字的几种全拼都存到py数组中
        py = PinyinHelper.toHanyuPinyinStringArray(hz[i], format);
        //取出改汉字全拼的第一种读音，并存放到字符串pys后
        pys += py[0];
      } else {
        //如果不是汉字字符，间接取出字符并连接到 pys 后
        pys += java.lang.Character.toString(hz[i]);
      }
    }
  } catch (e) {
    log(e)
    log(e.stack)
  }
  return pys;
}
r = getPinYin("中国梦ChainDream2018")
log(r)
