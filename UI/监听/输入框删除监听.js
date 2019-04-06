"ui";
importClass(android.text.TextWatcher)
ui.layout(
    <frame>
        <input id='input' w="*" h="100px" id="input" lines="1"/>
    </frame>
)
var myTextWatcher = new TextWatcher({
  onTextChanged:function(CharSequence, start, before, count) {
    toastLog(start)
  }
});
ui.input.addTextChangedListener(myTextWatcher)
setTimeout(function(){
  ui.input.removeTextChangedListener(myTextWatcher)
  toastLog('删掉监听了')
},3000)
