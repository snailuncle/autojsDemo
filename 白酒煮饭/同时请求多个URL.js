


/*
 同时（多线程）请求多个URL的函数
 参数:
    urls <Array> URL的数组
*/
function httpMultiGet(urls){
    //保存请求结果
    var result = [];
    //计算已经获取到的结果数量
    var count = threads.atomic();
    //用于等待全部结果的disposable
    var resultDisposable = threads.disposable();

    //HTTP请求的回调函数
    function callbackForUrl(i){
        return function(res, err){
            //如果请求出错
            if(err){
                //则记录错误
                log(err);
                //并重新请求一次，其中arguments.callee表示这个回调函数
                http.get(urls[i], {}, arguments.callee);
            }else{
                //请求成功则保存请求结果
                result[i] = res;
                //把计数器自增1，并判断是否已经获取到所有请求结果
                if(count.incrementAndGet() == urls.length){
                    //是的话则通知结果已经获取
                    resultDisposable.setAndNotify(result);
                }
            }
        }
    }

    //依次调用http.get并使用回调形式（从而可以多线程进行）
    for(var i = 0; i < urls.length; i++){
        http.get(urls[i], {}, callbackForUrl(i));
    }
    //等待所有请求结果
    return resultDisposable.blockedGet();
}


var res = httpMultiGet(["www.baidu.com", "www.autojs.org", "www.qq.com"]);
for(var i = 0; i < res.length; i++){
    log(res[i]);
}