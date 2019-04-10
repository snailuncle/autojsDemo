var ddd = new Date();
var str = util.format("%d年%d月%d日", ddd.getFullYear(), ddd.getMonth() + 1, ddd.getDate());
ssr = util.format("%d", ddd.getDay());
var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
var mynum = weekday[ssr];
i = getWeekOfYear();
o = i - 9;
alert("😀今天是" + str + "\n" + mynum + "\n今年第" + i + "周\n本学期第" + o + "周");


function getWeekOfYear() { 
    var today = new Date(); 
    var firstDay = new Date(today.getFullYear(), 0, 1); 
    var dayOfWeek = firstDay.getDay();  
    var spendDay = 1; 
    if (dayOfWeek != 0) {  
        spendDay = 7 - dayOfWeek + 1; 
    } 
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay); 
    var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000); 
    var result = Math.ceil(d / 7); 
    return result + 1;
};