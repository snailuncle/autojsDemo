/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  bmob用户表的增删改查
 */
var config = {
  appId: '',
  restKey: ''
}
var isLog = true

function myLog() {
  if (isLog) {
    log.apply(this, Array.prototype.slice.call(arguments))
  }
}
var appId = config.appId
var restKey = config.restKey
// 测试开始==========================================================
userlist = [{
    name: 'name1',
    password: 'password1',
    data: 'data1'
  },
  {
    name: 'name2',
    password: 'password2',
    data: 'data2'
  },
  {
    name: 'name3',
    password: 'password3',
    data: 'data3'
  }
]
// 注册3个用户
for (var i = 0; i < userlist.length; i++) {
  var user = userlist[i]
  var username = user.name
  var password = user.password
  var postdata = user.data
  var result = 用户注册并上传数据(username, password, postdata)
  log(result)
}
var username = userlist[0].name
var password = userlist[0].password
var postdata = userlist[0].data
log(username, password, postdata)
// 登录user1
var result = 用户登录(username, password)
log(util.format('用户登录结果=%s', result))
var result = 获取用户的objectIdAndSessionToken(username, password)
log(util.format('获取用户的objectIdAndSessionToken=%s', result))
var objectId = result.objectId
var sessionToken = result.sessionToken
log('当前使用的变量键值对=')
log('username=' + username)
log('password=' + password)
log('postdata=' + postdata)
log('objectId=' + objectId)
log('sessionToken=' + sessionToken)
var result = 查询用户名是否存在(username)
log(util.format('查询用户名是否存在=%s', result))
var result = 获取当前用户信息(objectId)
log(util.format('获取当前用户信息=%s', result))
var result = 改动一个用户已经有的数据(objectId, sessionToken, {
  "data": "data1666666666666"
})
log(util.format('改动一个用户已经有的数据=%s', result))
var result = 删除用户(objectId, sessionToken)
log(util.format('删除用户=%s', result))
// 测试结束==========================================================
// POST	用户注册、使用手机号注册登录、第三方注册登录
function 用户注册并上传数据(username, password, postdata) {
  var postdata = postdata || ''
  var url = 'https://api2.bmob.cn/1/users'
  url = encodeURI(url)
  var options = {}
  options.contentType = "application/json";
  options.method = 'POST';
  options.headers = {
    "X-Bmob-Application-Id": appId,
    "X-Bmob-REST-API-Key": restKey,
    "Content-Type": "application/json"
  }
  var data = {
    "username": username,
    "password": password,
    "data": postdata
  }
  options.body = JSON.stringify(data)
  var r = http.request(url, options, null).body.json()
  // 202  用户名已存在
  if (r && r.createdAt) {
    myLog('用户注册并上传数据成功')
    myLog(r)
    return true
  } else {
    return false
  }
}
// GET	登录
function 用户登录(username, password) {
  var url = util.format('https://api2.bmob.cn/1/login?username=%s&password=%s', username, password)
  url = encodeURI(url)
  var r = http.get(url, {
    headers: {
      "X-Bmob-Application-Id": appId,
      "X-Bmob-REST-API-Key": restKey,
      "Content-Type": "application/json"
    }
  }).body.json()
  myLog(r)
  if (r && r.createdAt && r.username === username) {
    myLog('用户登录成功')
    return r
  } else {
    myLog('用户登录失败')
    return false
  }
}
// 获取用户的 objectId + sessionToken
function 获取用户的objectIdAndSessionToken(username, password) {
  var result = 用户登录(username, password)
  if (result) {
    var objectId = result.objectId
    var sessionToken = result.sessionToken
    var info = {
      objectId: objectId,
      sessionToken: sessionToken
    }
    return info
  }
}

function 查询用户名是否存在(username) {
  var url = util.format('https://api2.bmob.cn/1/users?where={"username":"%s"}', username)
  myLog('查询用户名是否存在url', url)
  url = encodeURI(url)
  var r = http.get(url, {
    headers: {
      "X-Bmob-Application-Id": appId,
      "X-Bmob-REST-API-Key": restKey,
      "Content-Type": "application/json"
    }
  }).body.json()
  if (r.results && r.results.length > 0 && r.results[0].username === username) {
    myLog('用户名已存在')
    return true
  } else {
    myLog('用户名不存在')
    return false
  }
}
// GET	获取当前用户、查询用户
function 获取当前用户信息(objectId) {
  var url = 'https://api2.bmob.cn/1/users/' + objectId
  myLog('获取当前用户信息url', url)
  url = encodeURI(url)
  var r = http.get(url, {
    headers: {
      "X-Bmob-Application-Id": appId,
      "X-Bmob-REST-API-Key": restKey,
      "Content-Type": "application/json"
    }
  }).body.json()
  // myLog(r)
  if (r && r.objectId === objectId) {
    myLog('获取当前用户信息成功')
    return true
  } else {
    myLog('获取当前用户信息失败')
    return false
  }
}
// 为了改动一个用户已经有的数据，需要对这个用户的URL发送一个HTTP PUT请求，任何你没有指定的key会保持不变，所以你可以只改动用户信息中的一部分，username和password可以更改，但是新的username不能重复。
function 改动一个用户已经有的数据(objectId, sessionToken, 要修改的数据键值对_也就是一个json对象) {
  var postdata = postdata || ''
  var url = 'https://api2.bmob.cn/1/users/' + objectId
  url = encodeURI(url)
  var options = {}
  options.contentType = "application/json";
  options.method = 'PUT';
  options.headers = {
    "X-Bmob-Application-Id": appId,
    "X-Bmob-REST-API-Key": restKey,
    "Content-Type": "application/json",
    "X-Bmob-Session-Token": sessionToken
  }
  options.body = JSON.stringify(要修改的数据键值对_也就是一个json对象)
  var r = http.request(url, options, null).body.json()
  if (r && r.updatedAt) {
    myLog('改动一个用户已经有的数据成功')
    myLog(r)
    return true
  } else {
    return false
  }
}
// 删除用户
function 删除用户(objectId, sessionToken) {
  var postdata = postdata || ''
  var url = 'https://api2.bmob.cn/1/users/' + objectId
  url = encodeURI(url)
  var options = {}
  options.contentType = "application/json";
  options.method = 'DELETE';
  options.headers = {
    "X-Bmob-Application-Id": appId,
    "X-Bmob-REST-API-Key": restKey,
    "Content-Type": "application/json",
    "X-Bmob-Session-Token": sessionToken
  }
  var r = http.request(url, options, null).body.json()
  if (r && r.msg && r.msg === 'ok') {
    myLog('删除用户成功')
    myLog(r)
    return true
  } else {
    return false
  }
}
