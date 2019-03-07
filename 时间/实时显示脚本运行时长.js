console.show()

function main() {
  threads.start(
    function () {
      while (1) {
        runTime();
        sleep(1000)
      }
    }
  )
  setInterval(
    () => {log('把setInterval改成你要做的事情')}, 1000
  )
}
var runTime = function () {
  var startTime = new Date().getTime()
  return function () {
    var endTime = new Date().getTime()
    var spendTime = Math.floor((endTime - startTime)/1000)
    log(util.format('运行了%d秒',spendTime))
  }
}()
main()
