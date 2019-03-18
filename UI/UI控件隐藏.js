"ui";
ui.layout(
  <frame weightSum="1" gravity='center'>
  <vertical  id='main' layout_width="wrap_content"  layout_height="wrap_content"  gravity="center" layout_weight="0.5"
  >
    <text id='but'  layout_width="{{device.width/2}}px"  layout_height="wrap_content"  textSize='20'  bg='#ffff00'  >生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒生僻字大佬真棒</text>
  </vertical>

  </frame>
)
var view = ui.main
function scrollX(view, x) {
  view.scrollTo(x, 0)
}
var num = function () {
  var count = 0
  return function () {
    return count++;
  }
}()
var intervalId;
var fn = () => {
  var n=num()
  scrollX(view, n)
  var width=view.getWidth()
  if(n>width/3*2){
    clearInterval(intervalId)
  }
}
setTimeout(() => {
  intervalId=setInterval(
    fn, 3
  )
}, 1000);

