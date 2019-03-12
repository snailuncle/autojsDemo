var str1 = "aaabbba"
var str2 = " bbbcaaa"
log(find(str1, str2));

function find(str1, str2) {
    //创建存放重复内容的数组
    var all = new Array();
    //字符串转字符数组
    var str_1 = str1.split("");
    var str_2 = str2.split("");
    for (var i = 0; i < str_1.length; i++) {
        for (var l = 0; l < str_2.length; l++) {
            //判断是否重复
            var lo = all.length;
            all[lo] = "";
            //判断之后的字符串是否相同
            for (var k = 0; str_1[i + k] == str_2[l + k]; k++) {
                all[lo] = all[lo] + str_1[i + k];
                //防止数组越界，提前停止循环
                if (i + k == str_1.length-1||i+k==str_2.length-1) {
                    break;
                }
            }
        }
    }
    
    var most = 0;
    var fu = new Array();
    for (var j = 0; j < all.length; j++) {
        //去除空的内容
        if (all[j] != "") {
            //按照大小排序(删除部分小的)
            if (all[j].split("").length >= most) {
                most = all[j].split("").length;
                fu[fu.length] = all[j];
            }
        }
    }
    
    //将不重复内容写到新数组
    var wu=new Array();
    for(var i=0;i<fu.length;i++){
        var c=false;
        for(var l=0;l<wu.length;l++){
            if(fu[i]==wu[l]){
                c=true;
            }
        }
        if(!c){
            wu[wu.length]=fu[i];
        }
    }
   
    //将最长的内容写到新数组
    var ml=new Array();
    //获得最后一个字符串的长度(最长)
    var longest=wu[wu.length-1].split("").length;
    //长度等于最长的内容放到新数组
    for(var i=wu.length-1;i>=0;i--){
        if(wu[i].split("").length==longest){
            ml[ml.length]=wu[i];
        }else{
            //提前结束循环
            break;
        }
    }
    
    return ml
}
