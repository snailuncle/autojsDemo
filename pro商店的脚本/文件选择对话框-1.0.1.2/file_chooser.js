function getParentDir(dir) {
    return new java.io.File(dir).parent;
}

function FileChooser(options) {
    // 当前文件列表数据
    this.data = [];
    // 当前被选中的位置
    this.selectedPos = -1;
    this.options = options;
    this.view = this.renderView();
}

FileChooser.prototype.renderView = function () {
    let view = ui.inflate(this.xml);
    view.fileList.on("item_bind", (itemView, itemHolder) => {
        // 绑定勾选框的勾选事件
        itemView.checkbox.on("check", (checked) => {
            let position = itemHolder.position;
            if (checked) {
                this.selectFile(position);
            } else {
                this.unselectFile(position);
            }
        });
    });
    view.fileList.on("item_click", (item, i, itemView) => {
        // 返回上一级
        if (item.fileName == '..') {
            this.up();
            return;
        }
        // 如果是文件夹被点击，则进入该文件夹
        if (item.isDir) {
            this.setCurrentDir(files.join(this.currentDir, item.fileName));
        } else {
            // 否则是文件被点击，则切换勾选框状态
            itemView.checkbox.toggle();
        }
    });
    return view;
}

FileChooser.prototype.xml = (
    <vertical>
        <list id="fileList">
            <horizontal w="*">
                <checkbox id="checkbox" visibility="{{this.checkable ? 'visible' : 'gone'}}" checked="{{this.checked}}" />
                <img src="@drawable/{{this.icon}}" w="40dp" h="40dp" scaleType="fitXY" tint="{{this.tint}}" />
                <text text="{{this.fileName}}" h="*" textSize="16sp" textColor="#373737" marginLeft="8dp"
                    gravity="center" maxLines="1" ellipsize="end" />
            </horizontal>
        </list>
    </vertical>
);

// 勾选文件(夹)
FileChooser.prototype.selectFile = function (position) {
    let adapter = this.view.fileList.adapter;
    // 获取之前被选中的位置
    let oldSelectedPos = this.selectedPos;
    // 因为是单选，勾选一个文件时要把之前勾选的文件取消掉
    // 如果大于0，说明之前有被选中的文件(夹)
    if (oldSelectedPos >= 0) {
        // 取消他的选中状态
        this.data[oldSelectedPos].checked = false;
        // 通知这一项更新
        adapter.notifyItemChanged(oldSelectedPos);
    };
    // 设置当前被选中的位置
    this.selectedPos = position;
}

// 取消勾选文件(夹)
FileChooser.prototype.unselectFile = function (position) {
    if (this.selectedPos == position) {
        this.selectedPos = -1;
    }
}

FileChooser.prototype.listFiles = function (dir) {
    let options = this.options;
    let list = Array.prototype.map.call(files.listDir(dir), (name) => {
        // 文件的绝对路径
        let absPath = files.join(dir, name);
        // 该文件是否是文件夹
        let isDir = files.isDir(absPath);
        //是否可勾选
        let checkable;
        if (isDir) {
            checkable = options.canChooseDir;
        } else {
            checkable = options.canChooseFile;
        }
        return {
            fileName: name,
            checkable: checkable,
            // 图标
            icon: isDir ? "ic_folder_black_48dp" :
                "ic_insert_drive_file_black_48dp",
            // 图标颜色
            tint: isDir ? "#ffca28" : "#e0e0e0",
            checked: false,
            isDir: isDir
        }
    })
        // 排序
        .sort(this.comparator());
    // 如果还有上一级，则在文件列表最前面加上".."用于返回上一级
    if (getParentDir(this.currentDir) != null) {
        list.splice(0, 0, {
            fileName: '..',
            checkable: false,
            icon: "ic_folder_black_48dp",
            tint: '#ffca28',
            checked: false,
            isDir: true
        })
    }
    return list;
}

FileChooser.prototype.comparator = function () {
    return (lhs, rhs) => {
        if (lhs.isDir !== rhs.isDir) {
            return rhs.isDir - lhs.isDir;
        }
        return lhs.fileName.localeCompare(rhs.fileName);
    }
}

// 设置当前文件夹
FileChooser.prototype.setCurrentDir = function (dir) {
    this.currentDir = dir;
    this.data = this.listFiles(dir);
    this.view.fileList.setDataSource(this.data);
}

FileChooser.prototype.getSelectedFile = function () {
    if (this.selectedPos == -1) {
        return null;
    }
    return files.join(this.currentDir, this.data[this.selectedPos].fileName);
}

//返回上一级
FileChooser.prototype.up = function () {
    let parent = getParentDir(this.currentDir);
    if (parent == null) {
        return;
    }
    this.setCurrentDir(parent);
}

module.exports = FileChooser;