auto.waitFor()

console.show()

lastPackage = currentPackage()

log(lastPackage)

sender = 'fenfende' // thread = threads.start(listen);

while (true) {

    pakage = currentPackage()

    if (pakage == "com.tencent.mm") {

        app = '微信'

        wechat()

    } else

    if (pakage == "com.tencent.mobileqq") {

        if (pakage != lastPackage) {

            app = 'QQ'

            thread = threads.start(listen);

        }

        if (desc('群资料卡').findOne(200)) {

            sender = qq(sender)

        }

    } else {

        app = pakage

    }

    if (pakage != lastPackage) {

        if (lastPackage == "com.tencent.mobileqq") {

            sender = 'fenfende'

            threads.shutDownAll()

        }

        log(app)

        lastPackage = pakage

    }

    sleep(200)

}

function wechat() {

    elements = id('aq5').find()

    if (!elements.empty()) { // log(elements.length)

        t = 1

        for (var j = elements.length - 1; j >= 0; j--) {

            try {

                text = elements[j].parent().child(1).text() // log(text)

            } catch (error) {

                if (!Math.round(Math.random() * 2)) {

                    sleep(Math.random() * 1000 + 500)

                }

                clickpos(elements[j], 0, 0)

                while (click('正在加载') && t % 10) {

                    sleep(200);

                    t++

                };

                clickpos(id("cyf").findOne(200), 0, 0)

                t++

                while (click('正在加载') && t % 10) {

                    sleep(200);

                    t++

                }; // group = id("k3").textEndsWith(')').findOne(500)

                while (!id("jy").findOne(500)) {

                    back()

                    if (id('b5o').findOne(200)) {

                        home()

                        break

                    } else

                    if (currentPackage() != "com.tencent.mm") {

                        break

                    }

                }

            }

        }

    }

}

function qq(sender) {

    // elements = depth(11).className('android.widget.RelativeLayout').id('name').find() // elements = textEndsWith('红包').find()

    t = 1

    elements = className('android.widget.RelativeLayout').id("chat_item_content_layout").find()

    if (!elements.empty()) { //log(elements)

        for (j = elements.length - 1; j >= 0; j--) {

            try {

                layout = elements[j]

                rec = layout.bounds()

                // if (layout.child(1).text().indexOf('包') != -1) {

                if (rec.width() > 420 && rec.height() > 570) {

                    senders = id('chat_item_nick_name').findOne().text()

                    if (senders != sender) {

                        log(rec, j, '发送者: ', senders) //sleep( Math.random()*1000+500 )

                        clickpos(layout, 0, 0)

                        key = className("android.widget.TextView").id('name').depth(9).drawingOrder(3).findOne(200)

                        if (key) {

                            log('红包口令: ', key.text())

                            setText(key.text())

                            if (!clicktxt('发送', 0)) {

                                clickpos(id("fun_btn").findOne(200), 0, 0)

                            }

                        }

                        if (click('QQ支付') && t % 10) {

                            sleep(300);

                            t++

                        }

                        // 返回

                        while (!desc('群资料卡').findOne(200)) {

                            sleep(100)

                            back()

                            if (id('conversation_head').findOne(200)) {

                                clickpos(id('icon').findOne(200), 0, 0)

                                break

                            } else

                            if (currentPackage() != "com.tencent.mobileqq") {

                                break

                            }

                        };

                        sender = senders

                    }

                } // toast(result)

            } catch (error) {

                log('QQ出错： ', error);

                continue

            }

        }

    }

    return sender

}

function clicktxt(str, i) {

    ret = click(str, i)

    sleep(200)

    return ret

}

function clickpos(point, check_x, check_y) { // console.info(point.text())

    if (point) {

        i = 10

        x = point.bounds().centerX() + check_x;

        y = point.bounds().centerY() + check_y;

        //此处的数值需要根据屏幕标题栏适当修改

        if (y < 210) {

            y = 220

        }

        if (y > 1880) {

            y = 1870

        }

        while (!click(x, y, x, y) && i) {

            i--

        }

        sleep(200)

        return true

    }

    return false

}

function listen() {

    cnt = 0

    info = ''

    while (true) {

        msg = id("msgbox").depth(10).findOne(300)

        if (msg) {

            if (info != msg.text()) {

                info = msg.text()

                log(info)

            }

            if (info.indexOf("红包]") != -1) {

                clickpos(msg, 0, 0)

                log("有一个红包，哈哈")

            }

            if (info.indexOf("[新春") != -1) {

                clickpos(msg, 0, 0)

                log("福袋")

            }

        } else {

            if (cnt++ % 100 == 0) {

                log("等红包")

            } else if (cnt > 10000) {

                cnt = 0

                if (sender != 'fenfende') {

                    sender = 'fenfende'

                }

            }

        }

        sleep(150)

    }

}
