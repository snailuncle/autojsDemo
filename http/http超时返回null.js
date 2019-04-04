(function () {
  let request = http.request;
  // 覆盖http关键函数request，其他http返回最终会调用这个函数
  http.request = function () {
      try {
          // 捕捉所有异常
          return request.apply(http, arguments);
      } catch (e) {
          // 出现异常返回null
          console.error(e);
          return null;
      }
  }
})();

//设置超时为10秒
http.__okhttp__.setTimeout(10000);
// 获取一个不存在的网站，应该会Timeout （或者把网络断开）
console.log(http.get("https://www.google.com.hk"));
toast("程序结束");
