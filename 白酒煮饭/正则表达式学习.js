//test方法,测试字符串,符合模式时返回true,否则返回false  
var re = /he/;//最简单的正则表达式,将匹配he这个单词
var str = "he";
print(re.test(str));//true

str = "we";
print(re.test(str));//false
str = "HE";
print(re.test(str));//false,大写,如果要大小写都匹配可以指定i标志(i是ignoreCase或case-insensitive的表示)
re = /he/i;
print(re.test(str));//true
str = "Certainly!He loves her!";
print(re.test(str));//true,只要包含he(HE)就符合,如果要只是he或HE,不能有其它字符,则可使用^和$

re = /^he/i;//脱字符(^)代表字符开始位置  
print(re.test(str));//false,因为he不在str最开始
str = "He is a good boy!";
print(re.test(str));//true,He是字符开始位置,还需要使用$
re = /^he$/i;//$表示字符结束位置
print(re.test(str));//false
str = "He";
print(re.test(str));//true
//当然,这样不能发现正则表达式有多强大,因为我们完全可以在上面的例子中使用==或indexOf
re = /\s/;// \s匹配任何空白字符，包括空格、制表符、换页符等等
str= "user Name";//用户名包含空格
print(re.test(str));//true
str = "user     Name";//用户名包含制表符
print(re.test(str));//true
re=/^[a-z]/i;//[]匹配指定范围内的任意字符,这里将匹配英文字母,不区分大小写
str="variableName";//变量名必须以字母开头
print(re.test(str));//true
str="123abc";  
print(re.test(str));//false 


var osVersion = "Ubuntu 8";//其中的8表示系统主版本号
var re = /^[a-z]+\s+\d+$/i; //+号表示字符至少要出现1次,\s表示空白字符,\d表示一个数字
print(re.test(osVersion));//true,但我们想知道主版本号
//另一个方法exec,返回一个数组,数组的第一个元素为完整的匹配内容
re=/^[a-z]+\s+\d+$/i;
arr = re.exec(osVersion);
print(arr[0]);//将osVersion完整输出,因为整个字符串刚好匹配re
//我只需要取出数字
re=/\d+/;
var arr = re.exec(osVersion);
print(arr[0]);//8


var osVersion = "Ubuntu 8";
//exec返回的数组第1到n元素中包含的是匹配中出现的任意一个子匹配
re=/^[a-z]+\s+(\d+)$/i;//用()来创建子匹配  
arr =re.exec(osVersion);
print(arr[0]);//整个osVersion,也就是正则表达式的完整匹配
print(arr[1]);//8,第一个子匹配,事实也可以这样取出主版本号
print(arr.length);//2
osVersion = "Ubuntu 8.10";//取出主版本号和次版本号
re = /^[a-z]+\s+(\d+)\.(\d+)$/i;//.是正则表达式元字符之一,若要用它的字面意义须转义
arr = re.exec(osVersion);
print(arr[0]);//完整的osVersion
print(arr[1]);//8
print(arr[2]);//10


//replace方法,用于替换字符串
var str ="some money";
print(str.replace("some","much"));//much money
//replace的第一个参数可以为正则表达式  
var re = /\s/;//空白字符
print(str.replace(re,"%"));//some%money  
//在不知道字符串中有多少空白字符时,正则表达式极为方便
str ="some some             \tsome\t\f";
re = /\s+/;
print(str.replace(re,"#"));//但这样只会将第一次出现的一堆空白字符替换掉
//因为一个正则表达式只能进行一次匹配,\s+匹配了第一个空格后就退出了
re = /\s+/g;//g,全局标志,将使正则表达式匹配整个字符串
print(str.replace(re,"@"));//some@some@some@
//另一个与之相似的是split
var str = "a-bd-c";
var arr = str.split("-");//返回["a","bd","c"]
//如果str是用户输入的,他可能输入a-bd-c也可能输入a bd c或a_bd_c,但不会是abdc(这样就说他输错了)
str = "a_db-c";//用户以他喜欢的方式加分隔符s
re=/[^a-z]/i;//前面我们说^表示字符开始,但在[]里它表示一个负字符集
//匹配任何不在指定范围内的任意字符,这里将匹配除字母处的所有字符
arr = str.split(re);//仍返回["a","bd","c"];
//在字符串中查找时我们常用indexOf,与之对应用于正则查找的方法是search
str = "My age is 18.Golden age!";//年龄不是一定的,我们用indexOf不能查找它的位置  
re = /\d+/;
print(str.search(re));//返回查找到的字符串开始下标10
//注意,因为查找本身就是出现第一次就立即返回,所以无需在search时使用g标志
//下面的代码虽然不出错,但g标志是多余的  
re=/\d+/g;
print(str.search(re));//仍然是10



var str = "My name is CJ.Hello everyone!";
var re = /[A-Z]/;//匹配所有大写字母
var arr = str.match(re);//返回数组
print(arr);//数组中只会包含一个M,因为我们没有使用全局匹配
re = /[A-Z]/g;
arr = str.match(re);
print(arr);//M,C,J,H
//从字符串中抽取单词
re = /\b[a-z]*\b/gi;//\b表示单词边界
str = "one two three four";
print(str.match(re));//one,two,three,four


//input 最后用于匹配的字符串（传递给test,exec方法的字符串）
var re = /[A-Z]/;
var str = "Hello,World!!!";
var arr = re.exec(str);
print(RegExp.input);//Hello,World!!!
re.exec("tempstr");
print(RegExp.input);//仍然是Hello,World!!!,因为tempstr不匹配
//lastMatch 最后匹配的字符
re = /[a-z]/g;
str = "hi";
re.test(str);
print(RegExp.lastMatch);//h
re.test(str);
print(RegExp["$&"]);//i  ,$&是lastMatch的短名字，但由于它不是合法变量名，所以要。。
//lastParen 最后匹配的分组
re = /[a-z](\d+)/gi;
str = "Class1 Class2 Class3";
re.test(str);
print(RegExp.lastParen);//1
re.test(str);
print(RegExp["$+"]);//2
//leftContext  返回被查找的字符串中从字符串开始位置到最后匹配之前的位置之间的字符
//rigthContext 返回被搜索的字符串中从最后一个匹配位置开始到字符串结尾之间的字符
re = /[A-Z]/g;
str = "123ABC456";
re.test(str);
print(RegExp.leftContext);//123
print(RegExp.rightContext);//BC456
re.test(str);
print(RegExp["$`"]);//123A
print(RegExp["$'"]);//C456


var str = "?";
//var re = /?/;
//print(re.test(str));//出错，因为？是元字符，必须转义。如果你想查看错误，可以去掉前面的注释。
re = /\?/;
print(re.test(str));//true



var str = "\?";
print(str);//只会输出?
var re = /\?/;//将匹配?
print(re.test(str));//true
//re = new RegExp("\?");//出错,因为这相当于re = /?/
re = new RegExp("\\?");//正确，将匹配？
print(re.test(str));//true



//ASCII方式用十六进制数来表示特殊字符
var re = /^\x43\x4A$/;//将匹配CJ
print(re.test("CJ"));//true
//也可使用八进制方式
re = /^\103\112$/;//将匹配CJ
print(re.test("CJ"));//true
//还可以使用Unicode编码
re =/^\u0043\u004A$/;//使用 Unicode，必须使用u开头，接着是字符编码的四位16进制表现形式
print(re.test("CJ"));



//ASCII方式用十六进制数来表示特殊字符
var re = /^\x43\x4A$/;//将匹配CJ
print(re.test("CJ"));//true
//也可使用八进制方式
re = /^\103\112$/;//将匹配CJ
print(re.test("CJ"));//true
//还可以使用Unicode编码
re =/^\u0043\u004A$/;//使用 Unicode，必须使用u开头，接着是字符编码的四位16进制表现形式
print(re.test("CJ"));




//简单类  
var re = /[abc123]/;//将匹配abc123这6个字符中一个  
//负向类  
re = /[^abc]/;//将匹配除abc之外的一个字符  
//范围类  
re = /[a-b]/;//将匹配小写a-b 26个字母  
re = /[^0-9]/;//将匹配除0-9 10个字符之处的一个字符
//组合类
re = /[a-b0-9A-Z_]/;//将匹配字母，数字和下划线



var str = "abc";  
var re = /\w+/;//将匹配abc  
re = /\w+?/;//将匹配a


re = /abc{2}/;//将匹配abcc  
re = /(abc){2}/;//将匹配abcabc  
//上面的分组都是捕获性分组  
str = "abcabc ###";  
arr = re.exec(str);  
print(arr[1]);//abc  
//非捕获性分组 (?:)  
re = /(?:abc){2}/;  
arr = re.exec(str);  
print(arr[1]);//undefined


re = /^a|bc$/;//将匹配开始位置的a或结束位置的bc  
str ="add";  
print(re.test(str));//true  
re = /^(a|bc)$/;//将匹配a或bc  
str ="bc";  
print(re.test(str));//true


var re = /(A?(B?(C?)))/;  
/*上面的正则表达式将依次产生三个分组 
(A?(B?(C?))) 最外面的 
(B?(C?)) 
(C?)*/  
str = "ABC";  
re.test(str);//反向引用被存储在RegExp对象的静态属性$1—$9中  
print(RegExp.$1+"\n"+RegExp.$2+"\n"+RegExp.$3);  
//反向引用也可以在正则表达式中使用\1 ,\2...这类的形式使用  
re = /\d+(\D)\d+\1\d+/;  
str = "2008-1-1";  
print(re.test(str));//true  
str = "2008-4_3";  
print(re.test(str));//false


re = /(\d)\s(\d)/;  
str = "1234 5678";  
print(str.replace(re,"$2 $1"));//在这个里面$1表示第一个分组1234,$2则表示5678











