var path=module.id.substring(0,module.id.lastIndexOf("/"))
const JT=files.read(path+"/simple.txt");
const FT=files.read(path+"/complex.txt");

var JFConverter={};

JFConverter.J2F=function(str){
   var ret="";
   for(var i of str){
      var index=JT.indexOf(i);
      if(index==-1)ret+=i;
      else ret+=FT[index];
   }
   return ret;
}

JFConverter.F2J=function(str){
   var ret="";
   for(var i of str){
      var index=FT.indexOf(i);
      if(index==-1)ret+=i;
      else ret+=JT[index];
   }
   return ret;
}

module.exports = JFConverter;
