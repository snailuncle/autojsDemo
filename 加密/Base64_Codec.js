/**
 * 作者: 冰风冰封冰峰
 * 功能: string bytes base64  互转
 */


let encodeBase64 = str => bytesToBase64String(uft8StringToBytes(str));
let decodeBase64 = str => bytesToUtf8String(stringToBase64Bytes(str));

// samples //
console.log(encodeBase64("今天是个好day!")); // -> "5LuK5aSp5piv5Liq5aW9ZGF5IQ=="
console.log(decodeBase64("5LuK5aSp5piv5Liq5aW9ZGF5IQ==")); // -> "今天是个好day!"
console.log(decodeBase64(encodeBase64("今天是个好day!"))); // -> "今天是个好day!"
console.log(encodeBase64(encodeBase64("今天是个好day!"))); // -> "NUx1SzVhU3A1cGl2NUxpcTVhVzlaR0Y1SVE9PQ=="
console.log(decodeBase64(decodeBase64("NUx1SzVhU3A1cGl2NUxpcTVhVzlaR0Y1SVE9PQ=="))); // -> "今天是个好day!"

/**
 * @returns {Array}
 * @param {string} str
 */
function stringToBase64Bytes(str) {
    let bytes = android.util.Base64.decode(str, 0),
        bytes_arr = [];

    bytes.forEach(value => bytes_arr.push(value));

    bytes_arr.forEach((value, index) => {
        if (bytes_arr[index] < 0) bytes_arr[index] += 256;
    });

    return bytes_arr;
}

/**
 * @returns {Array}
 * @param str
 */
function uft8StringToBytes(str) {
    let code = encodeURI(str),
        bytes = [];

    for (let i = 0, len = code.length; i < len; i++) {
        bytes.push(code.charAt(i) === "%" ? parseInt(code.charAt(++i) + code.charAt(++i), 16) - 256 : code.charCodeAt(i));
    }

    return bytes;
}

/**
 * @returns {string}
 * @param bytes_arr
 */
function bytesToBase64String(bytes_arr) {
    let str = android.util.Base64.encodeToString(bytes_arr, 0);
    return str.slice(0, -(str.length % 4));
}

/**
 * @returns {string}
 * @param bytes_arr
 */
function bytesToUtf8String(bytes_arr) {
    let URIEncodedStr = "";
    bytes_arr.forEach(value => URIEncodedStr += "%" + value.toString(16));
    return decodeURIComponent(URIEncodedStr);
}
