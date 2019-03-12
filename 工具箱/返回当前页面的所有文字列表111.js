function 获取当前页面信息() {
  const ROOT_NODE_NAME = 'FrameLayout';
  const TIMEOUT_FOR_LOOKUP_NODE = 250;
  // 获取当前应用的包名
  const getCurrentPackage = function getPackageNameOfTheForegroundApplication(timeout) {
    const node = getRootNode(timeout);
    return node !== null ? node.packageName() : currentPackage();
  };
  // 获取 FrameLayout 根节点
  const getRootNode = function getFrameLayoutNode(timeout) {
    return className(ROOT_NODE_NAME).findOne(timeout || TIMEOUT_FOR_LOOKUP_NODE);
  };
  // 获取所有指定节点及其子节点的描述内容和文本内容
  const getAllTextualContent = function getAllDescriptionAndTextUnderNodeRecursively(node) {
    let items = [];
    const getDescAndText = function (node) {
      if (node !== null) {
        items.push(node.desc());
        items.push(node.text());
        for (let len = node.childCount(), i = 0; i < len; i++) {
          getDescAndText(node.child(i));
        }
      }
    };
    getDescAndText(node || getRootNode());
    return items.filter(item => item !== '' && item !== null);
  };
  return {
    getCurrentPackage: getCurrentPackage,
    getAllTextualContent: getAllTextualContent,
  };
}

function 返回当前页面的所有文字列表() {
  var 当前页面信息 = 获取当前页面信息()
  var 当前app = getAppName(当前页面信息.getCurrentPackage())
  log("当前app=", 当前app)
  var 当前页面所有文字列表 = 当前页面信息.getAllTextualContent()
  log("当前页面所有文字列表=", 当前页面所有文字列表)
  return 当前页面所有文字列表
}


var circle = {};
circle.返回当前页面的所有文字列表 = 返回当前页面的所有文字列表
module.exports = circle;
