var path = '/data/user/0/com.tencent.mobileqq/guid'
r = readFile(path)
log(r)
writeFile(path, 'dsfsfdsafasfds')
r = readFile(path)
log(r)

function readFile(path) {
  var sh = new Shell(true);
  var tempFile = '/sdcard/temp.txt'
  sh.exec('cat ' + path + '> ' + tempFile)
  sh.exitAndWaitFor()
  return files.read(tempFile)
}

function writeFile(path, content) {
  var tempFile = '/sdcard/temp.txt'
  files.createWithDirs(tempFile)
  files.write(tempFile, content)
  var sh = new Shell(true);
  sh.exec('cat ' + tempFile + ' > ' + path)
  sh.exitAndWaitFor()
}
