
uid=`cat /data/system/packages.list | grep com.sohu.inputmethod.sogou | busybox awk '{print $2}'`
iptables -t filter -A OUTPUT -m owner --uid-owner=$uid -j DROP

以上是android iptables 屏蔽某个app网络访问的内容，
