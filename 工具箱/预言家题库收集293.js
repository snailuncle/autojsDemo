/**
 * 说明:
 *      本脚本用于<预言家>APP的题库收集,运行后,请手动答题
 *  无论答对答错,脚本都会记录正确答案到 /sdcard/预言家/QA.txt
 *  中,收集到一定程度请将题库 共享到群中或发送给QQ:289986635,
 *  大家收集的题目.用于整合题库.
 */
auto.waitFor();
importPackage(java.io);
importPackage(java.lang);

const contains = (() =>
Array.prototype.includes
? (arr, value) => arr.includes(value)
: (arr, value) => arr.some(el => el === value)
)();

//创建一些缓存文件用于记录问题与答案
var SD=files.getSdcardPath();
var questionsTmp = SD + '/预言家/QA.txt';
files.createWithDirs(questionsTmp);

var Q = "";
var i = 0;
while (true) {
    var fr = open(questionsTmp, 'r', 'utf-8');
    var QAArry = fr.readlines();
    fr.close();
    
    var A_state = true;
    //等待关卡问题标题出现
    id("tv_question_content").waitFor();
    
    //获取问题
    while(true) {
        var Qn = id("tv_question_content").findOne().text();
        if (Qn != Q) {
            Q = Qn;
            break;
        }
    }
    
    //判断题库中是否存在该问题,存在则自动点击
    if (contains(QAArry, Q)) {
        var trueAnswer = QAArry.indexOf(Q)+1;
        log(QAArry[trueAnswer]);
        var ranWaitTime = random(3000,5000);
        sleep(ranWaitTime);
        clickText(QAArry[trueAnswer]);
        var autoClick = true;
    }
    
    //等待答题结果
    id("tv_notice").waitFor();
    
    if (autoClick) {
        log("自动点击");
        autoClick = false;
    } else {
        log("手动点击");
        if (id("iv_state").find().size() != 1) {
            log("答错了");
            i++;
            log("当前第 " + i + " 次错误!");
            //答错状态下判断正确答案
            var A_state = false;
            var C = 0;
            for (let i = 0; i < 2; i++) {
                var W = id("iv_state").find().get(i).bounds().width();
                if (W > C) {
                    C = W;
                    var A = id("iv_state").find().get(i).parent().child(0).text();
                }
            }
        } else {
            log("答对了");
            //答对状态下提取正确答案
            var A = id("iv_state").findOne().parent().child(0).text();
        }
    
        //将获取到的问题与答案进行记录
        writeTmp(Q);
        writeTmp(A);
        if (!A_state) {
            var choice = confirm("本轮答题结束,还要继续吗?");
            if (!choice) {
                exit();
            }
        }
    }
}

function clickText(a) {
    for (obj_Text = text(a).boundsInside(0, 0, device.width, device.height); obj_Text.find().empty(); ) sleep(1e3);
    X = obj_Text.find().get(0).bounds().centerX(), Y = obj_Text.find().get(0).bounds().centerY(), 
    Deviation = random(-10, 10), X1 = X - Deviation, Y1 = Y - Deviation, click(X1, Y1);
}
function writeTmp(str) {
    try{
        var pw = new PrintWriter(new FileWriter(questionsTmp, true));
        pw.println(str);
        pw.flush();
        pw.close();
    }catch(e){
        log(e);
    }
}