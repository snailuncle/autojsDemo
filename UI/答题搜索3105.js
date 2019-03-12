/**
 * 以下是5.1寸手机适配，其它尺寸自行修改
 * x值为答题框左上角橫坐标
 * y值为答题框左上角纵坐标
 * w值为答题框宽度
 * h值为答题框高度
 */
var box = {
  "default": { "title": "默认", "x": 60, "y": 380, "w": 1000, "h": 1000 },
  "fkdj": { "title": "疯狂夺金", "x": 60, "y": 380, "w": 1000, "h": 1000 },
  "dtcj": { "title": "点题成金", "x": 60, "y": 380, "w": 1000, "h": 820 },
  "jdzb": { "title": "京东直播", "x": 60, "y": 300, "w": 1000, "h": 900 },
  "hjsm": { "title": "黄金十秒", "x": 60, "y": 400, "w": 1000, "h": 700 },
}

var key = "default";
auto();
requestScreenCapture();
xuanfuchuang()



function xuanfuchuang() {
  w = floaty.window(
    <frame id="action" bg="#90251911" w="*" h="200" padding="2">
      <linear w="340" h="200">
        <vertical gravity="left" padding="-1">
          <button id="Bmin" text="小化" w="40" h="40" textSize="8sp" />
          <button id="tuichu" text="退出" w="40" h="40" textSize="8sp" />
          <button id="fanhui" text="切换" w="40" h="40" textSize="8sp" />
          <button id="yunxin" text="截图搜索" w="40" h="80" textSize="8sp" />
        </vertical>
        <vertical padding="0">
          <ScrollView h="85" w="*">
            <vertical>
              <text id="question" bg="#50251911" color="#ffffffff" textSize="10sp">搜索结果仅供参考，是通过搜索引擎简单查找，没有高级算法准确率无法保障，尤其是包含否定词的问题可能要反向看结果。</text>
              <text id="baidu" bg="#50251911" color="#ffffffff" textSize="10sp"></text>
              <text id="sogou" bg="#50251921" color="#ffffffff" textSize="10sp"></text>
              <text id="s360" bg="#50251931" color="#ffffffff" textSize="10sp"></text>
              <text id="uc" bg="#50251931" color="#ffffffff" textSize="10sp"></text>
            </vertical>
          </ScrollView>
          <vertical w="260" h="*" padding="-15">
            <webview id="aa" w="255" h="*" margin="16" />
          </vertical>
        </vertical>

      </linear>
    </frame>
  );
  setInterval(() => { }, 1000);

  w.setPosition(5, 1220)
  w.fanhui.click(() => {
    threads.start(function () {
      key = select();
      ui.run(function () {
        w.question.setText(box[key].title);
      });
    });
  });
  w.yunxin.click(() => {
    threads.start(function () {
      shitu()
    });
  });

  w.tuichu.click(() => {
    toast("退出");
    w.close();
    exit()
  });

  var x = 0, y = 0;//记录按键被按下时的触摸坐标
  var windowX, windowY;//记录按键被按下时的悬浮窗位置
  var downTime;//记录按键被按下的时间以便判断长按等动作
  ui.run(function () {
    windowWidth = w.getWidth();
    windowHeight = w.getHeight();
  }
  );
  w.Bmin.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_DOWN:
        x = event.getRawX();
        y = event.getRawY();
        windowX = w.getX();
        windowY = w.getY();

        return true;
      case event.ACTION_MOVE:
        //移动手指时调整悬浮窗位置
        w.setPosition(windowX + (event.getRawX() - x),
          windowY + (event.getRawY() - y));

        return true;
      case event.ACTION_UP:
        //手指弹起时如果偏移很小则判断为点击
        if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
          if (w.Bmin.text() == "小化") {
            w.Bmin.setText("大化");
            w.setSize(190, 190);
          } else {
            w.Bmin.setText("小化");
            w.setSize(windowWidth, windowHeight);
          }
        }
        return true;
    }
    return true;
  });
}


function select() { //菜单
  var list = [];
  var key = [];
  for (let i in box) {
    list.push(box[i].title)
    key.push(i)
  }
  let i = dialogs.select("请选择答题窗位置大小：", list);
  if (i == -1) {
    return key[0];
  }
  return key[i]
}

function shitu() {
  threads.start(function () {
    path = "/sdcard/ucjt.png";
    img = captureScreen();
    aa = images.clip(img, box[key].x, box[key].y, box[key].w, box[key].h);
    images.saveImage(aa, path);
    toast("截图");
    str = getQuestion();
    log(str);
    daan = []
    题目 = str.title
    daan[0] = str.a
    daan[1] = str.b
    daan[2] = str.c
    log(str)
    qs = util.format("题目：%s\n选项：a.%s b.%s c.%s", str.title, str.a, str.b, str.c)
    ui.run(function () {
      w.question.setText(qs);
    });
   // setClip("答题题目" + 题目)
    显示 = []
    引擎 = ["百度", "搜狗", "360", "UC"]
    搜索网址 = []
    搜索网址[0] = "www.baidu.com/s?word=" + 题目
    搜索网址[1] = "https://www.sogou.com/web?query=" + 题目
    搜索网址[2] = "http://m.so.com/s?q=" + 题目
    搜索网址[3] = "http://so.m.sm.cn/s?q=" + 题目
    for (var a = 0; a < 4; a++) {
      threads.start(function () {
        搜索(搜索网址[a], 引擎[a])
      });
      sleep(100)
    }
    ui.run(function () {
      settings = w.aa.getSettings()
      settings.setSupportZoom(true);
      settings.setUseWideViewPort(true);

      settings.setTextZoom(40); //设置字体
      w.aa.loadUrl("http://www.baidu.com/s?word=" + 题目);//设置网址

    });
  });
}













function 搜索(网址, 引擎) {
  var 答案 = 引擎 + ":";
  var 参考答案 = " | 参考:";
  var 网页 = http.get(网址);
  var 网页内容 = 网页.body.string()

  var zjda = cuxiancishu(网页内容, "最佳答案", 100)
  if (zjda) {
    答案 += "最佳:"
    var list1 = [];
    for (var a = 0; a < 3; a++) {
      var 选项计数 = cuxiancishu(zjda.join(""), daan[a]).length
      if (选项计数) {
        list1.push([选项计数, daan[a]]);
      }
    }
    list1.sort(function (x, y) {
      return y[0] - x[0];
    });
    for (var v of list1) {
      答案 += "<font color='#00ff00'>" + v[1] + "</font>" + v[0] + ">"
    }
  }

  var list2 = [];
  for (var a = 0; a < 3; a++) {
    var 选项计数 = cuxiancishu(网页内容, daan[a]).length
    if (选项计数) {
      list2.push([选项计数, daan[a]]);
    }
  }
  list2.sort(function (x, y) {
    return y[0] - x[0];
  });
  for (var v of list2) {
    参考答案 += "<font color='#00ff00'>" + v[1] + "</font>" + v[0] + ">"
  }
  log(答案 + 参考答案)
  显示答案(引擎, 答案 + 参考答案)
  return 答案 + 参考答案
}

function 显示答案(引擎, 答案) {
  ui.run(function () {
    if (引擎 == "百度") {
      w.baidu.setText(android.text.Html.fromHtml(答案))
    } else if (引擎 == "搜狗") {
      w.sogou.setText(android.text.Html.fromHtml(答案))
    } else if (引擎 == "360") {
      w.s360.setText(android.text.Html.fromHtml(答案))
    } else if (引擎 == "UC") {
      w.uc.setText(android.text.Html.fromHtml(答案))
    }
  });
}

function cuxiancishu(str, ci, zishu) {
  if (!zishu) {
    zishu = ci.length
  }
  var a = 0
  var g = 0
  var daan = []
  do {
    a = str.indexOf(ci, a + 1);
    if (a > -1) {
      daan[g] = str.substr(a, zishu)
      g++
    }
  } while (a > -1)
  if (daan.length == 0) {
    return false
  } else {
    return daan
  }
}

/**
 * 获得题目
 */
function getQuestion() {
  //var json = sogouOCR(path);
 // var arr = json.result
/*  c = arr.pop().content;
  b = arr.pop().content;
  a = arr.pop().content;
  var title = "";
  var x;
  for (x in arr) {
    title += arr[x].content;
  }
*/
  var j=id("tv_question_content").findOne(3000).text();
  var d=id("tv_option_text").className("android.widget.TextView")
  var a=d.findOnce(0).text()
  var b=d.findOnce(1).text()
  var c=d.findOnce(2).text()
  return { "title": j, "a": a, "b": b, "c": c, }

}

/**
 * 文字过滤
 */
function filter(text) {
  text = text.replace(/(^\d+\.)/, '');//过滤
  text = text.replace(/(^[ABC]+[、\.]+)/, '');//过滤标题序号
  text = text.replace(/(\n)/g, '');//过滤换行
  return text;
}

/**
 * 文字识别
 */
function sogouOCR(path) {
  var url = "http://pic.sogou.com/pic/upload_pic.jsp";
  var res = http.postMultipart(url, {
    "file": open(path),
  });
  var url = res.body.string();
  //var url = "http://img01.sogoucdn.com/app/a/100520146/c58b3e1590c5af817bd5fdcb4633b973"
  res = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + url);
  return res.body.json();
}