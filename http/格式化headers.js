// var str = files.read('./data.js')
var str = getClip()
log("\n\n\n"+str + "\n\n\n");
var array = str.split("\n");
var 非空行=[]
var json = {};
array.map(
  (line)=>{
    if(line.length>3 && !(/^(GET|POST).*HTTP\//.test(line))){
      非空行.push(line)
    }
    if(/^(GET|POST).*HTTP\//.test(line)){
      line=line.trim()
      var method=line.match(/[^ ]*(?= )/)[0]
      var url=line.match(/\/[^ ]*(?= )/)[0]
      log(method)
      json.method=method
      json.url=url
    }
  }
)
log(非空行)
for (let i = 0; i < 非空行.length; i++) {
    var kvstr = 非空行[i].split(":");
    var key = kvstr[0].trim();
    var value = kvstr[1].trim();
    json[key] = value;
}
log("\n\n\n==========================================================================================\n\n\n");
log("\n\n\n",json, "\n\n\n");
