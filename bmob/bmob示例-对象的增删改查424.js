const Bmob = (function(){
    function Bmob(url, appId, restKey){
        this.baseUrl = url;
        this.appId = appId;
        this.restKey = restKey;
    }
    Bmob.prototype.makeRequest = function(method, url, json, callback) {
        url = this.baseUrl + url;
        var options = {};
        options.contentType = "application/json";
        options.method = method;
        if(json){
            options.body = JSON.stringify(json);
        }
        options.headers = {
            "X-Bmob-Application-Id": this.appId,
            "X-Bmob-REST-API-Key": this.restKey,
            "Content-Type": "application/json"
        }
        return http.request(url, options, callback);
    }

    Bmob.prototype.timestamp = function(){
        return this.makeRequest("GET", "/timestamp", null).body.json();
    }
    Bmob.prototype.createObject = function(className, data){
        return this.makeRequest("POST", "/classes/" + className, data).body.json();
    }
    Bmob.prototype.getObjects = function(className){
        return this.makeRequest("GET", "/classes/" + className).body.json();
    }
    Bmob.prototype.getObject = function(className, id){
        return this.makeRequest("GET", "/classes/" + className + "/" + id).body.json();
    }
    Bmob.prototype.updateObject = function(className, data){
        return this.makeRequest("PUT", "/classes/" + className + "/" + data.objectId, data).body.json();
    }
    Bmob.prototype.deleteObject = function(className, data){
        var id = typeof(data) == "string" ? data : data.objectId;
        return this.makeRequest("DELETE", "/classes/" + className + "/" + id).body.json();
    }
    return Bmob;
})();

/**
 * Bomb
 * 需要APPID和REST ID
 * 参见http://doc.bmob.cn/data/restful/
 */

 const APPID = null;
 const REST_ID = null;

 if(!APPID || !REST_ID){
    alert("需要注册Bmob并填入app id和rest id");
    app.openUrl("http://doc.bmob.cn/data/restful/");
    exit();
 }

var bmob = new Bmob("https://api2.bmob.cn/1", APPID, REST_ID);
log(bmob.timestamp());
let item1 = {
    "a": 1,
    "b": 2
};
let item2 = {
    "a": 3,
    "c": 4
};
let createResult = bmob.createObject("Item", item1);
log("create item 1: ", createResult);
Object.assign(item1, createResult);
log("item 1: ", item1);
Object.assign(item2, bmob.createObject("Item", item2));
log("item 2 created: ", item2);
log("get all items: ", bmob.getObjects("Item"));
log("get item by id %s: ", item1.objectId, bmob.getObject(item1.objectId));
log("delete item 1:", bmob.deleteObject("Item", item1));
log("get all items: ", bmob.getObjects("Item"));
item2.a = 100;
Object.assign(item2, bmob.updateObject("Item", item2));
log("item2 updated: ", bmob);
log("get all items: ", bmob.getObjects("Item"));