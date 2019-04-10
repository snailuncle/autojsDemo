'ui';
ui.layout(
    <frame>
        <vertical>
            <button id='control' text='显示' >
            </button>
            <fab
            id='fab'
            layout_width='wrap_content'
            layout_height='wrap_content'
            note="右下角"
            layout_gravity='bottom|right'
            note="margin"
            layout_margin='3dp'
            note="背景色"
            backgroundTint='#33ff00f0'
            note="控制小白球的大小,值越大,白球越小"
            elevation='6dp'
            src="@drawable/ic_stars_black_48dp"
            color='#FAAB1A'
            >
        </fab>
    </vertical>
    </frame>
)
var fabView = ui.fab
fabView.setOnClickListener(
    function(view) {
        toastLog('你点击了fab')
    }
)
ui.control.click(
    function() {
        if (fabView.isShown()) {
            fabView.hide()
        } else {
            fabView.show()
        }
    }
)
var obj = fabView
// getAttr(obj)
// exit()
function getAttr(obj) {
    var attrs = []
    for (var k in obj) {
        attrs.push(k)
    }
    attrs.sort()
    log(attrs)
    return attrs
}