var myUrl='https://www.baidu.com'
var client=new OkHttpClient()
var request=new Request.Builder()
  .url(myUrl)
  .get()
  .build()

client.newCall(request).enqueue(new Callback(
  {
    onFailure:function(call,err){
      log(err)
    },
    onResponse:function(call,res){
      log(res.body().string())
    }
  }
))
