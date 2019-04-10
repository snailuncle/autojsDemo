/**
 * 说明:
 *      请自行从百度官方申请自己的API,地址:
 *          https://ai.baidu.com/tech/ocr/general
 *      创建应用,获取APIKey和SecretKey, 获取后,自行填写到 获取Token 的部分中.
 *      百度ocr的请求频率有限制,请合理调整延迟时间.
 * 
 *      脚本只适合 安卓7.0或者已经root的手机使用.
 */

auto.waitFor();
setScreenMetrics(1080, 1920)

//获取token
var url_getToken = 'https://aip.baidubce.com/oauth/2.0/token';
var Token_html = http.post(url_getToken,{
    'grant_type'    : 'client_credentials', //固定值
    'client_id'     : '', //填写你的 APIKey
    'client_secret' : '', //填写你的 SecretKey
});
var Token = Token_html.body.json().access_token;
// log(Token);

//获取截图权限
while(true) {
    var request = requestScreenCapture();
    if (request) {
        break;
    } else {
        var Exit = confirm("未授予截图权限!", "没有截图权限,程序无法运行,是否要退出?");
        if (Exit) {
            exit();
        }
    }
}

// sleep(4500);
while(true) {
    var img = captureScreen();
    var img_Question = images.clip(img,20,740,1050-20,960-740);
    var img_Answer = images.clip(img,20,980,1040-20,1150-980);

    var img_Question_Base64 = images.toBase64(img_Question,format='png',quality=100);
    var img_Answer_Base64 = images.toBase64(img_Answer,format='png',quality=100);
    var img_Question_Base64ToUrlencode = encodeURI(img_Question_Base64);
    var img_Answer_Base64ToUrlencode = encodeURI(img_Answer_Base64);
    try {
        var ocr_post_url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic';
        var Ocr_Question_Html = http.post(ocr_post_url, {
            'access_token' : Token,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'image'        : img_Question_Base64ToUrlencode
        
        });
        var operation = Ocr_Question_Html.body.json();
        log(operation);
        if (operation.words_result_num == 0) {throw 'err'}
        if (operation.error_code != undefined) {throw 'err1'}
            operation = operation.words_result[0].words;
    
        sleep(300);
        var Ocr_Answer_Html = http.post(ocr_post_url, {
            'access_token' : Token,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'image'        : img_Answer_Base64ToUrlencode
        
        });
        var result_str = Ocr_Answer_Html.body.json();
        log(result_str);
        if (result_str.words_result_num == 0) {throw 'err'}
        if (result_str.error_code != undefined) {throw 'err1'}        
            result_str = result_str.words_result[0].words;
        var result = result_str.replace(/[^-|^0-9]/ig,"");
    } catch (e) {
        sleep(200);
        continue;
    }
    log(operation + '=' + result);
    var operation_result = eval(operation);
    if (operation_result == result) {
        log('true');
        press(280,1660,5);
    } else {
        log('false');
        press(800,1660,5);
    }
    sleep(200);
}