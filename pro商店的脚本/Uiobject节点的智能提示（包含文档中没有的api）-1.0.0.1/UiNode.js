var UiNode = /** @class */ (function () {
    /**
     * 构造函数
     * @param uiobject aj的节点信息
     */
    function UiNode(uiobject) {
        this.obj = uiobject;
    }
    /**
     * 创建一个节点类
     * @param uiobject aj的节点信息
     */
    UiNode.create = function (uiobject) {
        if (uiobject == null) {
            return null;
        }
        return new UiNode(uiobject);
    };
    Object.defineProperty(UiNode.prototype, "method", {
        /**
         * 节点的方法
         */
        get: function () {
            return new UiNodeMethod(this.obj);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "text", {
        /**
         * 获得控件的 text
         */
        get: function () {
            var t = this.obj.text();
            if (t == null)
                return "";
            return t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "desc", {
        /**
         * 获得控件的 desc
         */
        get: function () {
            var t = this.obj.desc();
            if (t == null)
                return "";
            return t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "indexInParent", {
        /**
         * 控件在父控件的位置
         */
        get: function () {
            return this.obj.indexInParent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "childCount", {
        /**获得控件的子集数量 */
        get: function () {
            var count = this.obj.childCount();
            if (count == null) {
                return 0;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "drawingOrder", {
        /**
         * 返回控件在父控件中的绘制次序。该函数在安卓7.0及以上才有效，7.0以下版本调用会返回0。
         */
        get: function () {
            return this.obj.drawingOrder();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "id", {
        /**
         * 获取控件的id，如果一个控件没有id，则返回 ""
         */
        get: function () {
            var id = this.obj.id();
            if (id == null)
                return "";
            return id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "className", {
        /**
         * 返回控件的className(类名)
         */
        get: function () {
            var claszz = this.obj.className();
            if (claszz == null)
                return "";
            return claszz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "packageName", {
        /**
         * 返回控件所在的包名
         */
        get: function () {
            var pkgName = this.obj.packageName();
            if (pkgName == null)
                return "";
            return pkgName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "depth", {
        /**
         * 返回控件的布局深度
         */
        get: function () {
            var depth = this.obj.depth();
            if (depth == null)
                return "";
            return depth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "accessibilityFocus", {
        /**
         * 获取此节点是否为可访问性焦点。
         */
        get: function () {
            return this.obj.accessibilityFocus();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "checkable", {
        /**
         * 控件是否可勾选
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.checkable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "checked", {
        /**
         * 控件是否可已勾选。
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.checked();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "focusable", {
        /**
         * 控件是否可以聚焦
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.focusable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "focused", {
        /**
         * 控件是否已聚焦
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.focused();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "visibleToUser", {
        /**
         * 控件对用户是否可见
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.visibleToUser();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "accessibilityFocused", {
        /**
         *
         */
        get: function () {
            return this.obj.accessibilityFocused();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "selected", {
        /**
         * 控件是否被选中
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.selected();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "clickable", {
        /**
         * 控件是否可点击.
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.clickable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "longClickable", {
        /**
         * 控件是否可长按
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.longClickable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "enabled", {
        /**
         * 控件是否已启用
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.enabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "password", {
        /**
         * 控件是否是密码框
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.password();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiNode.prototype, "scrollable", {
        /**
         * 控件是否可滑动
         * @return 返回true 或 false
         */
        get: function () {
            return this.obj.scrollable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 返回 aj节点信息
     */
    UiNode.prototype.getObj = function () {
        return this.obj;
    };
    /**
     * 回收节点
     */
    UiNode.prototype.recycle = function () {
        this.obj.recycle();
    };
    return UiNode;
}());
exports.UiNode = UiNode;
var UiNodeMethod = /** @class */ (function () {
    /**
     * 构造函数
     * @param uiobject aj的节点信息
     */
    function UiNodeMethod(uiobject) {
        this.obj = uiobject;
    }
    /**
     * 点击该控件，并返回是否点击成功。
     */
    UiNodeMethod.prototype.click = function () {
        return this.obj.click();
    };
    /**
     * 点击并且按下坐标
     */
    UiNodeMethod.prototype.ClickAndGesture = function () {
        if (this.obj.clickable()) {
            return this.obj.click();
        }
        else {
            var bounds = this.obj.bounds();
            var x = bounds.centerX();
            var y = bounds.centerY();
            return click(x, y);
        }
    };
    /**
     * 长按该控件，并返回是否点击成功。
     */
    UiNodeMethod.prototype.longClick = function () {
        return this.obj.longClick();
    };
    /**
     * 查找节点父级
     */
    UiNodeMethod.prototype.parent = function () {
        var nodel = this.obj.parent();
        if (nodel == null)
            return null;
        return new UiNode(nodel);
    };
    /**
     * 查找子集
     * @param index
     */
    UiNodeMethod.prototype.child = function (index) {
        var nodel = this.obj.child(index);
        if (nodel == null)
            return null;
        return new UiNode(nodel);
    };
    /**
     * 返回该控件的所有子控件组成的控件集合
     */
    UiNodeMethod.prototype.children = function () {
        var nodels = new Array();
        this.obj.children().forEach(function (child) {
            if (child == null)
                return;
            var c = new UiNode(child);
            nodels.push(c);
        });
        return nodels;
    };
    /**
     * 返回控件在屏幕上的范围，其值是一个Rect对象
     */
    UiNodeMethod.prototype.bounds = function () {
        var r = this.obj.bounds();
        return new Rect(r);
    };
    /**
     * 返回控件在父控件中的范围，其值是一个Rect对象。
     */
    UiNodeMethod.prototype.boundsInParent = function () {
        var r = this.obj.boundsInParent();
        return new Rect(r);
    };
    /**
     * 设置文本
     * @param {string} text 设置的文本
     */
    UiNodeMethod.prototype.setText = function (text) {
        return this.obj.setText(text);
    };
    /**
     * 设置进度
     * @param value 进度值
     */
    UiNodeMethod.prototype.setProgress = function (value) {
        return this.obj.setProgress(value);
    };
    /**
     * 滚动节点以使指定的集合位置在屏幕上可见的操作。
     * @param {int} row
     * @param {int} column
     */
    UiNodeMethod.prototype.scrollTo = function (row, column) {
        return this.obj.scrollTo(row, column);
    };
    /**
     * 向前滚动节点内容。
     */
    UiNodeMethod.prototype.scrollForward = function () {
        return this.obj.scrollForward();
    };
    /**
     * 向后滚动节点内容。
     */
    UiNodeMethod.prototype.scrollBackward = function () {
        return this.obj.scrollBackward();
    };
    /**
     * 向上滚动节点内容。
     */
    UiNodeMethod.prototype.scrollUp = function () {
        return this.obj.scrollUp();
    };
    /**
     * 向下滚动节点内容。
     */
    UiNodeMethod.prototype.scrollDown = function () {
        return this.obj.scrollDown();
    };
    /**
     * 向左滚动节点内容。
     */
    UiNodeMethod.prototype.scrollLeft = function () {
        return this.obj.scrollLeft();
    };
    /**
     * 向右滚动节点内容的操作。
     */
    UiNodeMethod.prototype.scrollRight = function () {
        return this.obj.scrollRight();
    };
    /**
     * 对节点的内容点击操作。
     */
    UiNodeMethod.prototype.contextClick = function () {
        return this.obj.contextClick();
    };
    /**
     * 查找子集是否包含文本内容
     * @param {string} text 要搜索的子集文本
     * @return 返回找到的节点集合
     */
    UiNodeMethod.prototype.findByText = function (text) {
        var items = this.obj.findByText(text);
        var nodels = new Array();
        for (var index = 0; index < items.length; index++) {
            var element = items[index];
            if (element == null)
                return;
            var c = new UiNode(element);
            nodels.push(c);
        }
        return nodels;
    };
    /**
     * 查找子集是否包含 id
     * @param {string} viewId 要搜索的子集id
     * @return 返回找到的节点集合
     */
    UiNodeMethod.prototype.findByViewId = function (viewId) {
        var items = this.obj.findByViewId(viewId);
        var nodels = new Array();
        for (var index = 0; index < items.length; index++) {
            var element = items[index];
            if (element == null)
                return;
            var c = new UiNode(element);
            nodels.push(c);
        }
        return nodels;
    };
    ;
    /**
     * 清除此节点是否为可访问性焦点。
     */
    UiNodeMethod.prototype.clearAccessibilityFocus = function () {
        return this.obj.clearAccessibilityFocus();
    };
    /**
     * 置入焦点。
     */
    UiNodeMethod.prototype.focus = function () {
        return this.obj.focus();
    };
    /**
     * 清除焦点。
     */
    UiNodeMethod.prototype.clearFocus = function () {
        return this.obj.clearFocus();
    };
    /**
     * 复制.
     */
    UiNodeMethod.prototype.copy = function () {
        return this.obj.copy();
    };
    /**
     * 粘贴。
     */
    UiNodeMethod.prototype.paste = function () {
        return this.obj.paste();
    };
    /**
     * 选择节点
     */
    UiNodeMethod.prototype.select = function () {
        return this.obj.select();
    };
    /**
     * 剪切。
     */
    UiNodeMethod.prototype.cut = function () {
        return this.obj.cut();
    };
    /**
     * 对控件执行折叠操作，并返回是否操作成功。
     */
    UiNodeMethod.prototype.collapse = function () {
        return this.obj.collapse();
    };
    /**
     * 扩展可扩展节点的操作
     */
    UiNodeMethod.prototype.expand = function () {
        return this.obj.expand();
    };
    /**
     * 解雇不允许的节点的行动。
     */
    UiNodeMethod.prototype.dismiss = function () {
        return this.obj.dismiss();
    };
    /** */
    UiNodeMethod.prototype.show = function () {
        return this.obj.show();
    };
    return UiNodeMethod;
}());
var Rect = /** @class */ (function () {
    function Rect(r) {
        /**长方形左边界的x坐标 */
        this.left = r.left;
        /**长方形右边界的x坐标 */
        this.right = r.right;
        /**长方形上边界的y坐标 */
        this.top = r.top;
        /**长方形下边界的y坐标 */
        this.bottom = r.bottom;
        this.r = r;
    }
    Object.defineProperty(Rect.prototype, "centerX", {
        /**
         * 长方形中点x坐标。
         */
        get: function () {
            return this.r.centerX();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "centerY", {
        /**
         * 长方形中点y坐标。
         */
        get: function () {
            return this.r.centerY();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "width", {
        /**
         * 长方形宽度。通常可以作为控件宽度。
         */
        get: function () {
            return this.r.width();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        /**
         * 长方形高度。通常可以作为控件高度。
         */
        get: function () {
            return this.r.height();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "contains", {
        /**
         * 返回是否包含另一个长方形r。包含指的是，长方形r在该长方形的里面(包含边界重叠的情况)。
         */
        get: function () {
            return this.r.contains();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "intersect", {
        /**
         * 返回是否和另一个长方形相交。
         */
        get: function () {
            return this.r.intersect();
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
}());
