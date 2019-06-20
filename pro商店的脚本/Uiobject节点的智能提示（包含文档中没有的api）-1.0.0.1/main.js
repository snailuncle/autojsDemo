//示列
var uinode = require("./UiNode").UiNode;

var obj = text("Auto.js Pro").findOne(200);

if(obj!=null){
    var node = uinode.create(obj);

    //获得节点文本
    print(node.text)
    
    //控件是否可见
    print(node.visibleToUser);
    
    //节点的方法，获取控件的宽高
    print(node.method.bounds());
}

