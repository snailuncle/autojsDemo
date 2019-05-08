/**
 * 作者: 四阿哥
 */
'ui';
var uiConfigPath = './uiConfig.js'
if (files.exists(uiConfigPath)) {} else {
  files.write(uiConfigPath, '{}')
}
ui.layout(
  <vertical id='parent'>
    <button  id='but' text='myButton' bg='#ff00ff'></button>
    <button  id='getViewProps' text='获取myButton属性' ></button>
    <button  id='setViewProps' text='设置myButton属性' ></button>
    <button  id='changeButtonBg' text='改变myButton背景颜色' ></button>
    <button  id='changeButtonText' text='改变myButton文字' ></button>
    <text id='viewProps' ></text>
  </vertical>
)
ui.post(
  function(){
      setViewProps('but', ['text', 'bg'], uiConfigPath)
  }
)
ui.getViewProps.on('click', function () {
  var result = getViewProps('but', ['text', 'id', 'bg'], uiConfigPath)
  ui.viewProps.setText(result)
})
ui.setViewProps.on('click', function () {
  setViewProps('but', ['text', 'bg'], uiConfigPath)
})
ui.changeButtonBg.on('click', function () {
  ui.but.setBackgroundColor(rndColor())
})
function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}
ui.changeButtonText.on('click', function () {
  ui.but.setText('文字已经改变'+random(1000,9999))
})
function getViewProps(viewId, propNames, uiConfigPath) {
  var propNames = propNames || []
  var uiConfigContent = files.read(uiConfigPath)
  uiConfigContent = JSON.parse(uiConfigContent)
  var viewConfig = {}
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i]
    var propValue = getViewProp(viewId, propName)
    viewConfig[viewId] = viewConfig[viewId] || {}
    viewConfig[viewId][propName] = propValue
  }
  Object.assign(uiConfigContent, viewConfig)
  files.write(uiConfigPath, JSON.stringify(uiConfigContent))
  return JSON.stringify(uiConfigContent)
}

function setViewProps(viewId, propNames, uiConfigPath) {
  try{
    var propNames = propNames || []
    var uiConfigContent = files.read(uiConfigPath)
    uiConfigContent = JSON.parse(uiConfigContent)
    viewConfig = uiConfigContent[viewId]
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i]
      setViewProp(viewId, propName, viewConfig)
    }
  }catch(e){

  }
}

function getViewProp(viewId, propName) {
  var propName = propName || ''
  var view = ui[viewId]
  switch (propName) {
    case 'text':
      return view.getText();
    case 'id':
      return view.getId();
    case 'bg':
      var r = view.getBackground().getColor()
      r = colors.toString(r)
      return r;
  }
}

function setViewProp(viewId, propName, viewConfig) {
  var propName = propName || ''
  var view = ui[viewId]
  var propValue = viewConfig[propName]
  switch (propName) {
    case 'text':
      return view.setText(propValue)
    case 'bg':
      return view.setBackgroundColor(colors.parseColor(propValue));
  }
}
