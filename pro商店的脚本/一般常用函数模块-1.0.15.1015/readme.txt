一般情况下用到的两个模块
一个是使用root权限 ex_by_root
一个是使用user权限 ex_by_user

以后有新的 在慢慢完善....

使用方法在函数注释上有

模块函数列表:
    ex_by_root 使用root权限

        enableAbSByRoot()       : 打开无障碍

        enableFlightMode()      : 打开飞行模式

        disableFlightMode()     : 关闭飞行模式

        enableWifi()            : 打开wifi

        disableWifi()           : 关闭wifi

        enableAdbd(port)        : 启动adbd服务 可以指定端口,若不指定则使用默认端口 5555

        disableAdbd()           : 关闭adbd服务

        openUrlByWechat(url)    : 使用微信打开任意url

        openUrlByQQ(url)        : 使用手机QQ打开任意url

        jumpRedPacketsbyQQFriends(friendsaccount, type)  : 跳转到给QQ好友发红包界面
            friendsaccount  qq好友的号码
            type            红包类型 1 为普通红包, 2 为口令红包
        
        jumpRedPacketsbyQQGroup(groupNumber, type)       : 跳转到已加入的QQ群 发红包界面
            groupNumber     群组号码
            type            红包类型 1 为普通红包 2 为拼手气红包 3 为口令红包


    ex_by_user 使用user权限

        getCookieManager()                      : 开启cookie管理

        enableHttpProxy(ip, port)               : 启用http代理
            ip 代理IP的ipv4 地址
            port 代理IP的 端口

        jumpSystemWriteSettings(packageName)    : 跳转到指定包名app的 允许修改系统设置 界面
            packageName app包名

        unzip(zipfilepath, targetpath)          : 解压zip文件
            zipfilepath zip文件的存放路径 文件
            targetpath  要解压到的位置  文件夹

        getListFilePath(i)                      : 获取文件夹(包含子文件夹)所有的文件路径.
            i 要获取的文件夹路径--绝对路径
        
        getPackageVersion(packageName)          : 获取指定应用的版本号
            packageName     app包名

        getScreenDirection()                    : 获取屏幕方向 返回数字1或2 1为竖屏 2为横屏

        checkPermission(packageName, permission): 检查指定app是否拥有某权限
            packageName app包名
            permission  权限名称
        
        checkSelfPermission(permission)         : 检查自身是否开启某权限
            permission  权限名称
        
        setHttpTimeout(time)                    : 设置http请求的超时时间
            time 超时时间

        getMd5(data)                            : 获取MD5
            data    数据内容
        
        pingTest(target, count)                 : 测试与目标网络的ping值,返回最小值 最大值 平均值 平均偏差值
            target 目标网络的域名或者IP
            count  测试次数,次数越大,测试值越准确,但时间会越长
        
        parseStrObjByRegExp(str)                : 将等号字符串转换成json对象

        openUrlByQQ(url)                        : 使用手机QQ打开 qq.com 等腾讯旗下的网址

        Base64()                                : js Base64编码 解码
            encode(input)   编码
            decode(input)   解码
        
        getUid(packageName)                     : 返回指定app的uid

        isBusyboxAvailable()                    : 返回设备是否安装busybox

        isRootAvailable()                       : 返回设备是否root

        zip(srcpath)                            : zip压缩单个文件/文件夹
            srcpath     zip文件绝对路径
        
        unzip(zippath, outzippath)              : zip解压缩文件
            zippath     zip文件的绝对路径
            outzippath  解压 目标文件夹
        
        byte(length)                            : 创建一个byte[] 数组 相当于 java的 new byte[]
            length  长度 int类型
        
        addContact(name, phoneNumber)           : 增加一个联系人到通讯录
            name    姓名
            phoneNumber 手机号码
        
        readContact()                           : 读取全部联系人,返回一个数组, 分隔符----

        clearContact()                          : 清空全部联系人