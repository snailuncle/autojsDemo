/**
 * vscode下按住 ctrl键 点击函数名,可快速跳转到该函数源码处
 */


// const root = require("./modules/ex_by_root");
const user = require("./modules/ex_by_user");
// if(user.zip("/sdcard/脚本/")) {
//     log("压缩完成");
// }


// Array.prototype.uniq = function() {
//     var arr = [];
//     var flag = true;
//     this.forEach(function(item) {
//         if (item !== item) {
//             flag && arr.indexOf(item) === -1 ? arr.push(item) : ""
//             flag = false
//         } else {
//             arr.indexOf(item) === -1 ? arr.push(item) : ""
//         }
//     })
//     return arr;
// }

// const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
// const filterUnique = arr => arr.filter(i => arr.indexOf(i) !== arr.lastIndexOf(i))


log("是否安装busybox: "+user.isBusyboxAvailable()); //判断是否安装 busybox
log("设备是否root: "+user.isRootAvailable());    //判断设备是否root
