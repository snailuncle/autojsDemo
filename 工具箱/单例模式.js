function Dog(name) {
  this.name = name
  this.birth = new Date()
}
var single = (function () {
  var unique;

  function getInstance() {
    if (unique === undefined) {
      unique = new Dog('snoopy');
    }
    return unique;
  }
  return {
    getInstance: getInstance
  }
})();
var dog1 = single.getInstance()
console.log('dog1.birth=', dog1.birth)
sleep(2000)
var dog2 = single.getInstance()
console.log('dog2.birth=', dog2.birth)
if (dog1.birth === dog1.birth) {
  log(true)
} else {
  log(false)
}
