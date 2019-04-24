w=floaty.window(
  <img id="图片" src="file:///sdcard/m.png" w="50" h="100"  radius='30'  scaleType="centerCrop" />
  )
w.图片.click(function () {
  w.图片.attr("w", "100"); //图片显示不正常
  w.图片.attr("cornerRadius", "30"); //没反应
  w.图片.invalidate()
});
setInterval(
  () => {}, 1000
)
