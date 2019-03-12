//作者: 家  QQ203118908


//本来打算用iptables-restore用文件形式更新防火墙规则,
//可是iptables-restore出现了bug,2013年就有人提过这个bug
//https://linux.debian.bugs.dist.narkive.com/J0hbJiR6/bug-710379-xtables-addons-common-quota2-module-iptables-save-creates-invalid-record
//又得改,坑爹

//马丹,iptables -D INPUT -lineNumber也有BUG,
//提示 index of deletion too big
//日了够了
//又得改,坑爹
// sudo iptables -D OUTPUT 1 -t nat
//
// uid=`cat /data/system/packages.list | grep com.sohu.inputmethod.sogou | busybox awk '{print $2}'`
// iptables -t filter -A OUTPUT -m owner --uid-owner=$uid -j DROP

// 以上是android iptables 屏蔽某个app网络访问的内容，

function 联网控制(appName) {
  // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
  // -A OUTPUT -m owner --uid-owner 10105 -j DROP
  this.等待shell执行完毕的时间 = 0
  this.防火墙规则路径 = '/sdcard/iptables.txt'
  this.uid路径 = '/sdcard/' + appName + 'uidOwner.txt'
  this.appName = appName
  this.packageName = getPackageName(this.appName)
  this.执行shell = (cmd) => {
    var result = shell(cmd, true);
    console.show();
    log(result);
    if (result.code == 0) {
      toastLog("执行成功");
    } else {
      toastLog("执行失败！请到控制台查看错误信息");
    }
    sleep(this.等待shell执行完毕的时间)
  }
  this.uid = () => {
    var cmd = 'cat /data/system/packages.list | grep ' + this.packageName + ' > ' + this.uid路径
    log('cmd=', cmd)
    this.执行shell(cmd)
    // cat /data/system/packages.list | grep com.tencent.mobileqq > /sdcard/QQuidOwner.txt
    var 包含uid的文本 = files.read('/sdcard/' + appName + 'uidOwner.txt')
    log('包含uid的文本=', 包含uid的文本)
    var uidReg = new RegExp(this.packageName + '\\s*(\\d+)')
    log('uidReg=', uidReg)
    var uid = 包含uid的文本.match(uidReg)[1]
    log(uid)
    return uid
  }
  this.允许联网规则 = 'iptables -t filter -A OUTPUT -m owner --uid-owner ' + this.uid() + ' -j ACCEPT'
  this.禁止联网规则 = 'iptables -t filter -A OUTPUT -m owner --uid-owner ' + this.uid() + ' -j DROP'
  this.允许 = () => {
    this.清空该app的防火墙规则()
    this.将防火墙规则写入系统(this.允许联网规则)
  }
  this.禁止 = () => {
    this.清空该app的防火墙规则()
    this.将防火墙规则写入系统(this.禁止联网规则)
  }

  this.将防火墙规则写入系统 = (防火墙规则) => {
    var cmd = 防火墙规则
    this.执行shell(cmd)
  }
  this.导出防火墙规则 = () => {
    var cmd = 'iptables-save > ' + this.防火墙规则路径
    this.执行shell(cmd)
  }
  this.防火墙规则 = () => {
    this.导出防火墙规则()
    var 防火墙规则 = files.read(this.防火墙规则路径)
    log('防火墙规则=', 防火墙规则)
    return 防火墙规则
  }
  this.清空该app的防火墙规则 = () => {
    var 防火墙规则 = this.防火墙规则()
    // stringObject.replace(regexp/substr,replacement)
    // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
    // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
    // -A OUTPUT -m owner --uid-owner 10105 -j DROP
    // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
    // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
    // 删除之前添加的规则（iptables -A INPUT -s 192.168.1.5 -j DROP）：
    // [root@test ~]# iptables -D INPUT -s 192.168.1.5 -j DROP
    // iptables -t filter -A OUTPUT -m owner --uid-owner=$uid -j DROP
    var 要删除的规则reg = new RegExp('-A (OUT|IN)PUT -m owner --uid-owner ' + this.uid() + ' -j (ACCEPT|DROP)', 'g')
    // 要删除的规则reg= /-A OUTPUT -m owner --uid-owner 10105 -j (ACCEPT|DROP)/
    // -A OUTPUT -m owner --uid-owner 10105 -j (ACCEPT|DROP)
    // iptables -D OUTPUT -m owner --uid-owner 10105 -j ACCEPT
    log('要删除的规则reg=', 要删除的规则reg)
    var new防火墙规则 = 防火墙规则.match(要删除的规则reg, '')
    log('new防火墙规则=', new防火墙规则)
    // new防火墙规则= [
    //   '-A OUTPUT -m owner --uid-owner 10105 -j ACCEPT',
    //   '-A OUTPUT -m owner --uid-owner 10105 -j DROP'
    //               ]
    if(new防火墙规则){
      for (let i = 0; i < new防火墙规则.length; i++) {
        var 规则 = new防火墙规则[i]
        规则 = 规则.replace('-A', '-D')
        var cmd = 'iptables ' + 规则
        this.执行shell(cmd)
      }
    }
    log('清空了指定app的防火墙规则')
  }
}

// var appName = 'QQ'
// var appName = '哔哩哔哩'
var appName = '微信'
var app联网控制 = new 联网控制(appName)
// app联网控制.禁止()
app联网控制.允许()
