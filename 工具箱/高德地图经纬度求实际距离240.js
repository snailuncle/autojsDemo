//访问高德地图获取经纬度
var 起点 = "深圳仁爱医院"
var 终点 = "东莞汽车公寓"
var 起点网页源码 = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + 起点);
起点源码 = 起点网页源码.body.string()//提取经纬度内容
var 终点网页源码 = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + 终点);
终点源码 = 终点网页源码.body.string()//提取经纬度内容
//log("html = " + 起点源码);//调试输出专用，勿删，不用请注释
/*正则匹配经纬度，请勿更改！！！
{"tip":{"category":"[0-9]+","name":"([\s\S]*?)","district":"([\s\S]*?)","ignore_district":"([\s\S]*?)","adcode":"([\s\S]*?)","rank":"([\s\S]*?)","datatype_spec":"([\s\S]*?)","datatype":"([\s\S]*?)","x_entr":"([\s\S]*?)","address":"([\s\S]*?)","y":"([\s\S]*?)","x":"([\s\S]*?)","poiid":"([\s\S]*?)","y_entr":"([\s\S]*?)","id":"([\s\S]*?)","modxy":"([\s\S]*?)","lnglat":"([\s\S]*?)"}}
*/
var 表达式 = '{"tip":{"category":"[0-9]+","name":"([\\s\\S]*?)","district":"([\\s\\S]*?)","ignore_district":"([\\s\\S]*?)","adcode":"([\\s\\S]*?)","rank":"([\\s\\S]*?)","datatype_spec":"([\\s\\S]*?)","datatype":"([\\s\\S]*?)","x_entr":"([\\s\\S]*?)","address":"([\\s\\S]*?)","y":"([\\s\\S]*?)","x":"([\\s\\S]*?)","poiid":"([\\s\\S]*?)","y_entr":"([\\s\\S]*?)","id":"([\\s\\S]*?)","modxy":"([\\s\\S]*?)","lnglat":"([\\s\\S]*?)"}}'//生成正则表达式
//log(表达式)//调试输出专用，勿删，不用请注释
var 匹配结果 = new RegExp(表达式);
var 起点结果集 = 匹配结果.exec(起点源码);
var 匹配结果 = new RegExp(表达式);
var 终点结果集 = 匹配结果.exec(终点源码);
log(起点结果集[2] + "," + 起点结果集[9] + "," + 起点结果集[1] + ",经纬度：" + 起点结果集[16])//调试输出专用，勿删，不用请注释
log(终点结果集[2] + "," + 终点结果集[9] + "," + 终点结果集[1] + ",经纬度：" + 终点结果集[16])//调试输出专用，勿删，不用请注释

/*高德地图经纬度定位地图查看，格式为: position=lng,lat，lng表示经度，lat表示纬度
方法1
uri.amap.com/marker?position=114.041120,22.520104&name=park&src=mypage&coordinate=gaode&callnative=0

方法2
https://ditu.amap.com/regeo?lng=114.041120&lat=22.520104&name=park&src=mypage&callnative=0
*/
var str起点 = 起点结果集[16]
str起点 = str起点.replace(/,/, "&fromY=")
var str终点 = 终点结果集[16]
str终点 = str终点.replace(/,/, "&toY=")
log(str起点)//调试输出专用，勿删，不用请注释
log(str终点)//调试输出专用，勿删，不用请注释
var str路径详情网页源码 = http.get("https://ditu.amap.com/service/autoNavigat?usepoiquery=true&coor_need=true&rendertemplate=1&invoker=plan&engine_version=3&start_types=1&end_types=1&viapoint_types=1&policy2=2&fromX=" + str起点 + "&start_poiname=startpoint&toX=+" + str终点 + "&end_poiname=endpoint&viapoints=&viapoint_poiids=&viapoint_poinames=&viapoint_poitypes=&key=&callback=")
var str路径详情源码 = str路径详情网页源码.body.string()//提取路途内容
//log(str路径详情源码)//调试输出专用，勿删，不用请注释

var str里程表达式 = 'Successful.","distance":"([\\s\\S]*?),([\\s\\S]*?),([\\s\\S]*?)","'
var str里程匹配结果 = new RegExp(str里程表达式);
var 里程结果集 = str里程匹配结果.exec(str路径详情源码);
//log("路线1里程：" + 里程结果集[1] / 1000)//调试输出专用，勿删，不用请注释
//log("路线2里程：" + 里程结果集[2] / 1000)//调试输出专用，勿删，不用请注释
//log("路线3里程：" + 里程结果集[3] / 1000)//调试输出专用，勿删，不用请注释
var str时间表达式 = '","drivetime":"([\\s\\S]*?),([\\s\\S]*?),([\\s\\S]*?)","strategy'
var str时间匹配结果 = new RegExp(str时间表达式);
var 时间结果集 = str时间匹配结果.exec(str路径详情源码);
//log("路线1时间：" + parseInt(时间结果集[1] / 60) + "分钟")//调试输出专用，勿删，不用请注释
//log("路线2时间：" + parseInt(时间结果集[2] / 60) + "分钟")//调试输出专用，勿删，不用请注释
//log("路线3时间：" + parseInt(时间结果集[3] / 60) + "分钟")//调试输出专用，勿删，不用请注释
var str红灯表达式 = '],"traffic_lights":"([\\s\\S]*?)"' //生成正则表达式
//log(str表达式)//调试输出专用，勿删，不用请注释
var str红灯匹配结果 = new RegExp(str红灯表达式, "g");

var 红灯结果集1 = str红灯匹配结果.exec(str路径详情源码);
//log("路线1红灯：" + 红灯结果集1[1])//调试输出专用，勿删，不用请注释
var 红灯结果集2 = str红灯匹配结果.exec(str路径详情源码);
//log("路线2红灯：" + 红灯结果集2[1])//调试输出专用，勿删，不用请注释
var 红灯结果集3 = str红灯匹配结果.exec(str路径详情源码);
//log("路线3红灯：" + 红灯结果集3[1])//调试输出专用，勿删，不用请注释




log("路线1里程：" + parseInt(里程结果集[1] / 1000) + "Km" + "，需要时长：" + parseInt(时间结果集[1] / 60) + "，红灯数量：" + 红灯结果集1[1] + "个")

log("路线2里程：" + parseInt(里程结果集[2] / 1000) + "Km" + "，需要时长：" + parseInt(时间结果集[2] / 60) + "，红灯数量：" + 红灯结果集2[1] + "个")

log("路线3里程：" + parseInt(里程结果集[3] / 1000) + "Km" + "，需要时长：" + parseInt(时间结果集[3] / 60) + "，红灯数量：" + 红灯结果集3[1] + "个")
