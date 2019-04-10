"ui";
var str = {
    gameStart: "开始游戏",
    gameContinue: "继续游戏",
    gameAbout: "关于游戏",
    personMsg: "角色信息",
    personBag: "角色背包",
    equipForge: "装备强化",
    equipEnchatment: "装备附魔",
    gameShop: "游戏商店",
    buyInfo: "购买商品将消耗费用",
    buyInsuff: "购买失败!费用不足",
    endlessTower: "无尽之塔",
    towerDown: "下一层",
    towerBottom: "当前已经是最底层!",
    towerUp: "上一层",
    towerOver: "当前已经到达顶层!",
    towerCount: "当前层数",
    meetEnemy: "遇到了下面的敌人,请准备战斗!",
    remainHp: " 剩余生命值:",
    saveProgress: "保存记录",
    loadProgress: "读取记录",
    plotTask: "剧情任务",
    other: "其他",
    tother: "other",
    back: "返回",
    ok: "迷之确定",
    no: "我再想想",
    cancel: "迷之取消",
    success: "成功",
    victory: "战斗胜利",
    lvUp: "恭喜升级,当前等级",
    failed: "战斗失利",
    action: "请出招",
    defeat: "失败",
    ndo: "你已重伤,无法继续",
    useItem: "是否使用物品",
    info: "详细信息",
    use: "使用",
    change: "更换",
    gain: "获得",
    fight: "战斗",
    lost: "失去",
    forge: "强化",
    item: "物品",
    titem: "item",
    equip: "装备",
    tequip: "equip",
    weapon: "武器",
    tweapon: "weapon",
    armor: "护甲",
    tarmor: "armor",
    danger: "附加伤害",
    mdanger: "造成伤害",
    all: "全部",
    tall: "all",
    prop: "道具",
    jew: "饰品",
    tjew: "jew",
    skill: "技能",
    study: "学习技能成功",
    studied: "已经存在的技能",
    forget: "成功遗忘技能",
    player: "玩家",
    lv: "等级",
    exp: "经验",
    next: "下一级需要经验",
    hp: "生命值",
    maxhp: "最大生命值",
    mp: "魔法值",
    maxmp: "最大魔法值",
    atk: "物理攻击力",
    matk: "魔法攻击力",
    def: "物理防御力",
    mdef: "魔法防御力",
    hit: "命中率",
    eva: "闪避率",
    cri: "暴击率",
    catk: "暴击伤害加深",
    spd: "出手速度",
    drop: "掉落",
    ps: " P.s",
    buy: "购买",
    sell: "出售",
    price: "价格",
    gold: "游戏币",
    insuff: "不足!",
    canyou: "是否继续",
    forgeFailed: "强化失败,费用不足!",
    forgeGold: "强化将使用费用",
    more: "更多功能正在研究中……",
    aboutTitle: "@你是光,你是电,你是唯一的傻叉",
    aboutMsg: "书山有路勤为径，学海无涯回头是岸",
    quotations: ["作为一个程序员，郁闷的事情是，面对一个代码块，却不敢去修改。更糟糕的是，这个代码块还是自己写的",
        "优秀的判断力来自经验，但经验来自于错误的判断",
        "理论’是你知道是这样，但它却不好用。‘实践’是它很好用，但你不知道是为什么。程序员将理论和实践结合到一起：既不好用，也不知道是为什么",
        "优秀的代码是它自己最好的文档。当你考虑要添加一个注释时，问问自己，“如何能改进这段代码，以让它不需要注释？”"
    ]
};
var gdata = {
    item: new Array({
        name: "金疮药",
        desc: "常见的疗伤药物",
        hp: 100,
        price: 200
    }, {
        name: "参丸",
        desc: "词条来自:<重装机兵>",
        hp: 200,
        price: 500
    }, {
        name: "苹果冻",
        desc: "词条来自>传说系列",
        hp: 500,
        price: 1000
    }, {
        name: "灵芝",
        desc: "吃完大补元气，哦吼吼吼",
        hp: 1200,
        price: 2000
    }, {
        name: "还魂丹",
        desc: "死了就吃不了了，只要没死便不会死",
        hp: 9999,
        price: 9000
    }),
    jew: new Array({
        name: "铁片",
        desc: "一块废弃的铁片！",
        maxmp: 0,
        eva: 0,
        spd: 0
    }, {
        name: "耳钉",
        desc: "中小学生最爱",
        maxmp: 100,
        eva: 0,
        spd: 0,
        price: 200
    }, {
        name: "红领巾",
        desc: "我们是共产主义接班人～ 预备,唱！",
        maxmp: 200,
        eva: 5,
        spd: 5,
        price: 600
    }, {
        name: "黛绮丝的眼泪",
        desc: "莫名其妙的想起这个名字,emmm应该在哪里看见过",
        maxmp: 400,
        eva: 10,
        spd: 10,
        price: 2000
    }),
    armor: new Array({
        name: "烂布衣",
        desc: "不知道哪里捡的烂衣服",
        hp: 0,
        def: 0,
        mdef: 0
    }, {
        name: "布衣",
        desc: "上等的布料做完衣服后剩下的边角料做的衣服！",
        maxhp: 50,
        def: 10,
        mdef: 0,
        price: 200
    }, {
        name: "铁甲",
        desc: "基本刀枪不入，就是这玩意儿很沉",
        maxhp: 150,
        def: 20,
        mdef: 0,
        price: 800
    }, {
        name: "银袍金甲",
        desc: "银制披风，金制护甲，华丽无比",
        maxhp: 400,
        def: 60,
        mdef: 20,
        price: 2000
    }, {
        name: "克利柯的战衣",
        desc: "克利柯是谁，我也不知道应该是个很厉害的勇士吧",
        maxhp: 700,
        def: 100,
        mdef: 50,
        price: 5000
    }, {
        name: "很厉害的护甲",
        desc: "顾名思义，它很厉害！",
        maxhp: 1200,
        def: 200,
        mdef: 100,
        price: 20000
    }, {
        name: "绝对防御",
        desc: "emmm...",
        maxhp: 9999,
        def: 999,
        mdef: 999,
        price: 99999
    }),
    weapon: new Array({
        name: "赤手空拳",
        desc: "胆小的怕拳头硬的，拳头硬怕不要命的。",
        atk: 0,
        matk: 0,
        hit: 0,
        cri: 0,
        catk: 0
    }, {
        name: "桃木剑",
        desc: "木头做的剑，你可以用来吓唬小孩子。",
        atk: 10,
        matk: 0,
        hit: 0,
        cri: 0,
        catk: 0,
        price: 200
    }, {
        name: "精钢剑",
        desc: "是精钢打造！不是钢筋打造！",
        atk: 100,
        matk: 0,
        hit: 0,
        cri: 5,
        catk: 10,
        price: 900
    }, {
        name: "彩虹剑",
        desc: "遇上彩虹吃定彩...不好意思念错台词了，这个不能吃！",
        atk: 300,
        matk: 100,
        hit: 10,
        cri: 10,
        catk: 0,
        price: 2000
    }, {
        name: "魔神剑",
        desc: "剑身被魔气缠绕的剑，闪耀着令人窒息的寒光。",
        atk: 550,
        matk: 350,
        hit: 10,
        cri: 10,
        catk: 0,
        price: 8000
    }, {
        name: "诸神黄昏",
        desc: "好像是FF9里面的一把武器，时间太长记不清了。",
        atk: 800,
        matk: 600,
        hit: 20,
        cri: 0,
        catk: 0,
        price: 20000
    }, {
        name: "永恒终结",
        desc: "永恒传说最终Boss的特殊大招的名字,需要主角发动极光次元壁对抗",
        atk: 1350,
        matk: 1350,
        hit: 0,
        cri: 30,
        catk: 50,
        price: 45999
    }, {
        name: "重塑",
        desc: "你将毁灭世界，然后重塑世界。(鲁殿无敌)",
        atk: 1550,
        matk: 1650,
        hit: 100,
        cri: 100,
        catk: 0,
        price: 99999
    }),
    skill: new Array({
        name: "普通攻击",
        desc: "使用普通攻击",
        atk: 1,
        danger: 0,
        mp: 0
    }, {
        name: "烈焰斩",
        desc: "斩出一到烈焰造成伤害",
        matk: 1,
        danger: 100,
        mp: 35
    }, {
        name: "狂风烈焰斩",
        desc: "在狂风中斩出一到烈焰造成伤害，搞不好还把自己伤到",
        matk: 1.3,
        danger: 300,
        mp: 65
    }, {
        name: "月牙天冲",
        desc: "你说啥玩意儿?",
        matk: 1.5,
        danger: 800,
        mp: 150
    }, {
        name: "凤凰天驱",
        desc: "腾空而起，像火凤凰一样冲击敌人造成巨大伤害",
        matk: 3,
        danger: 1000,
        mp: 350
    }, {
        name: "绯凰绝炎冲",
        desc: "凤凰天驱的奥义版造成的伤害更高了,词条来自 ps永恒传说",
        matk: 5,
        danger: 3000,
        mp: 500
    }, {
        name: "灵魂吞噬",
        desc: "吞噬战场灵魂",
        matk: 10,
        danger: 9999,
        mp: 999
    }),
    enemy: new Array({
        lv: 3,
        name: "黑蚂蚁",
        desc: "就是黑色的蚂蚁呀",
        hp: 200,
        mp: 200,
        atk: 60,
        def: 0,
        matk: 60,
        mdef: 0,
        hit: 100,
        eva: 0,
        cri: 0,
        catk: 0,
        spd: 90,
        exp: 18,
        gold: 25,
        skill: [],
        drop: [
            [
                100,
                "item",
                1
            ],
            [
                15,
                "weapon",
                1
            ]
        ]
    }, {
        lv: 5,
        name: "行军蚁",
        desc: "就是成群的黑色的蚂蚁呀",
        hp: 2000,
        mp: 200,
        atk: 400,
        def: 50,
        matk: 240,
        mdef: 50,
        hit: 100,
        eva: 0,
        cri: 0,
        catk: 0,
        spd: 90,
        exp: 310,
        gold: 300,
        skill: [],
        drop: [
            [
                10,
                "weapon",
                1
            ]
        ]
    }, {
        lv: 8,
        name: "巨蚁",
        desc: "就是巨大的黑色的蚂蚁呀",
        hp: 5200,
        mp: 1200,
        atk: 960,
        def: 300,
        matk: 960,
        mdef: 300,
        hit: 100,
        eva: 0,
        cri: 20,
        catk: 0,
        spd: 90,
        exp: 1800,
        gold: 2500,
        skill: [],
        drop: [
            [
                20,
                "item",
                2
            ],
            [
                10,
                "weapon",
                2
            ]
        ]
    }, {
        lv: 13,
        name: "好战怨灵",
        desc: "就是好战的黑色的蚂..怨灵呀",
        hp: 10000,
        mp: 2000,
        atk: 1600,
        def: 900,
        matk: 1960,
        mdef: 1000,
        hit: 120,
        eva: 0,
        cri: 0,
        catk: 0,
        spd: 110,
        exp: 3580,
        gold: 3600,
        skill: [
            [1, 20],
            [3, 30]
        ],
        drop: [
            [
                20,
                "item",
                3
            ],
            [
                5,
                "weapon",
                3
            ]
        ]
    }, {
        lv: 18,
        name: "魔化阿达",
        desc: "哎呀呀呀，彩虹城堡的魔界战士阿达你怎么了",
        hp: 20000,
        mp: 12000,
        atk: 6000,
        def: 4000,
        matk: 6400,
        mdef: 5100,
        hit: 200,
        eva: 0,
        cri: 30,
        catk: 0,
        spd: 120,
        exp: 24000,
        gold: 30000,
        skill: [
            [3, 50],
            [4, 40]
        ],
        drop: [
            [
                20,
                "weapon",
                4
            ],
            [
                15,
                "armor",
                3
            ]
        ]
    }, {
        lv: 25,
        name: "作者",
        desc: "哼！虫子、连让我打发时间的价值都没有！",
        hp: 99999,
        mp: 99999,
        atk: 99999,
        def: 99999,
        matk: 99999,
        mdef: 99999,
        hit: 999,
        eva: 999,
        cri: 100,
        catk: 999,
        spd: 190,
        exp: 1,
        gold: 1,
        skill: [
            [5, 80],
            [6, 80]
        ],
        drop: [
            [
                100,
                "item",
                4
            ],
            [
                100,
                "weapon",
                5
            ],
            [
                100,
                "weapon",
                6
            ]
        ]
    })
};
const btnStyle = "Widget.AppCompat.Button.Borderless.Colored";
const savePath = "/sdcard/game.save";
const COLOR_GREEN = "#008000";
const COLOR_WHITE = "#FFFFFF";
const titleTextSize = 20;
const towerMax = 15;
const imgW = images.fromBase64("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");
const maxPcs = 999;
var equips = ["weapon", "armor", "jew"];
var noDanger = ["price", "danger", "mp"];
//可用的道具类型
var types = {
    all: "all",
    equip: "equip",
    weapon: "weapon",
    armor: "armor",
    jew: "jew",
    other: "other",
    item: "item"
};
var kind = [types.weapon, types.item, types.armor, types.jew];
var sellAdvice = 1000;
//记录战斗信息
var fightmsg = "";
var eid = 0;
var enemy = null;
var fight = false;
var towerCount = 1;
var bag = {
    bagn: [{
            type: "weapon",
            id: 1,
            pcs: 1

        },
        {
            type: "armor",
            id: 1,
            pcs: 1

        },
        {
            type: "jew",
            id: 1,
            pcs: 1

        },
        {
            type: "item",
            id: 1,
            pcs: 7

        }, {
            type: "item",
            id: 2,
            pcs: 2

        },
    ]
}.bagn;
var player = {
    lv: 1,
    gold: 1000,
    exp: 0,
    next: 100,
    hp: 5000,
    maxhp: 100,
    mp: 0,
    maxmp: 100,
    atk: 35,
    matk: 5,
    def: 15,
    mdef: 0,
    hit: 80,
    eva: 0,
    cri: 10,
    catk: 150,
    spd: 92,
    equip: [{
        type: "weapon",
        id: 3
    }, {
        type: "armor",
        id: 3
    }, {
        type: "jew",
        id: 1
    }],
    skill: [0, 1],
    gup: {
        maxhp: 50,
        maxmp: 50,
        atk: 8,
        matk: 3,
        def: 5,
        mdef: 1,
        hit: 1,
        eva: 0,
        cri: 0,
        catk: 0,
        spd: 2
    }
};
var playerI;
var playerB; //(o)
var towerCount = 1;
var forgelv = {
    weapon: 0,
    armor: 0,
    jew: 0
};
init();
main();
var refThread = threads.start(function() {
    setInterval(function() {
        ref4all()
    }, 200);
});
//属性联动刷新
function ref4all() {
    ref4Exp();
    ref4Attr();
    ref4Item();
    ref4Equip();
    player.hp = player.hp > player.maxhp ? player.maxhp : player.hp;
    player.mp = player.mp > player.maxmp ? player.maxmp : player.mp;

}
//装备属性刷新
function ref4Equip() {
    var evalAttr = function(equip, type) {
        Object.keys(equip).forEach(function(key) {
            var value = equip[key];
            if (typeof value === "number" && player[key]) {
                //强化效果
                var add = getForgeEffect(type, value);
                //log("value>"+value+"|type>"+type+"|lv>"+forgelv[type]+"|add>"+add+"|player>"+player[key]);
                player[key] += (value + add);
            }
        });
    }

    Object.keys(player.equip).forEach(function(i) {
        let e = player.equip[i];
        evalAttr(gdata[e.type][e.id], e.type);
    });
}
//刷新经验值(升级规则)
function ref4Exp() {
    player.next = player.lv * 55 + parseInt(player.lv / 3 * 100);
    if (player.exp >= player.next) {
        player.lv += 1;
        player.exp -= player.next;
        ref4Exp();
        alertDialog(str.lvUp + player.lv);
    }
}
//道具加成
function ref4Item() {
    Object.keys(playerI.gup).forEach(function(attr) {
        player[attr] += playerI.gup[attr];
    });
}
//刷新属性(成长规则计算)(基础属性)
//可以作为属性刷新功能(基础属性)
function ref4Attr() {
    var lv = player.lv;
    Object.keys(playerB.gup).forEach(function(attr) {
        player[attr] = playerB[attr] + playerB.gup[attr] * lv;
    });
}
//商店(出售价格低于一定值(可设置)的道具)
function gameShop() {
    var xml =
        <vertical>
        {title(str.gameShop)}
        {gridLayoutBtn("sell_list",1)}
        {showBackBtn()}
        
    </vertical>
    ui.layout(xml);
    ui.back.click(() => home());
    ui.sell_list.setDataSource(commodityList());
    ui.sell_list.on("item_bind", function(itemView, itemHolder) {
        itemView.name.on("click", function() {
            msg4GdataDialog(gdata[itemHolder.item.type][itemHolder.item.id]);
        });
        itemView.btn.on("click", function() {
            let item = itemHolder.item;
            alertDialogE(str.buy + item.name, str.buyInfo + item.val, str.buy, str.no)
                .on("positive", function() {
                    buy(item.type, item.id, 1);
                })
                .show();
        });
    });
}

//生成可以购买商品列表
function commodityList() {
    var commoditylists = [];
    kind.forEach(function(type) {
        for (var i in gdata[type]) {
            let item = gdata[type][i];
            if (item.price && item.price <= sellAdvice) {
                commoditylists.push({
                    name: item.name,
                    val: item.price,
                    type: type,
                    id: i,
                    bname: str.buy
                });
            }
        }
    });
    return commoditylists;
}
//买卖
function buy(type, id, pcs) {
    var commodity = gdata[type][id];
    if (commodity.price * pcs <= player.gold) {
        player.gold -= commodity.price * pcs;
        gain(type, id, pcs);
        alertDialog(str.buy + str.success);
    } else {
        alertDialog(str.buyInsuff);
    }
}

function sell(type, id, pcs) {

}
//无尽之塔
function endlessTower(count) {
    count = count || towerCount;
    getEnemy(count);
    ui.layout(
        <vertical>
            <vertical align="center">
                {title(str.endlessTower)}
                <text w="auto" align="center" text={str.towerCount+" "+count}/>
            </vertical>
            <vertical w="auto" align="center">
                <text text={str.meetEnemy} />
                <vertical>
                    {gridLayout("enemys",1)}
                    {fightmsg}
                </vertical>
                <linear>
                    <button id="down" text={str.towerDown} style={btnStyle}/>
                    <button id="fight" text={str.fight} style={btnStyle}/>
                    <button id="up" text={str.towerUp} style={btnStyle}/>
                </linear>
            </vertical>
            {showBackBtn()}
        </vertical>);
    //添加事件(可优hua
    ui.enemys.setDataSource([{
        name: enemy.name,
        val: str.remainHp + enemy.hp
    }]);
    ui.enemys.on("item_bind", function(itemView, itemHolder) {
        itemView.name.on("click", function() {
            msg4GdataDialog(gdata.enemy[eid]);
        });
    });

    ui.down.click(() => {
        if (count == 1) {
            alertDialog(str.towerBottom);
            return;
        }
        fight = false;
        fightmsg = "";
        endlessTower(--towerCount);
    });
    ui.up.click(() => {
        if (count >= towerMax) {
            alertDialog(str.towerOver);
            return;
        }
        fight = false;
        fightmsg = "";
        endlessTower(++towerCount);
    });
    ui.fight.click(() => {
        if (player.hp <= 0) {
            alertDialogE(str.ndo, str.useItem)
                .on("positive", function() {
                    personBag(types.item);
                }).show();
            return;
        }
        dialogs.singleChoice(str.action,
                skill2Arr(player.skill))
            .then(i => {
                fightmsg = pro4fight(player.skill[i]);
                fight = true;
                if (enemy.hp <= 0) { //胜利
                    var msg = battleFinish(enemy);
                    dialogs.alert(str.victory, msg).then(() => {
                        fight = false;
                        fightmsg = "";
                        endlessTower(count);
                    });
                } else if (player.hp <= 0) { //失败
                    dialogs.alert(str.failed, "").then(
                        () => {
                            fight = false;
                            fightmsg = "";
                            endlessTower(count);
                        }
                    );
                }
                endlessTower(count);
            })
    });
    ui.back.click(() => home());
}

function getEnemy(lv) {
    if (!fight) {
        eid = parseInt(lv / 3);
        enemy = JSON.parse(JSON.stringify(gdata.enemy[eid]))
        fight = true;
    }
}

function skill2Arr(arr) {
    var arrs = [];
    for (var i in arr) {
        var skill = gdata.skill[arr[i]]
        arrs.push(skill.name + " " + skill.mp);
    }
    return arrs;
}

function battleFinish(enemy) {
    var dropmsg = str.gain + ":\n";
    player.exp += enemy.exp;
    player.gold += enemy.gold;
    dropmsg += (str.exp + enemy.exp + "\n" + str.gold + enemy.gold + "\n");
    if (enemy.drop.length > 0) {
        for (var i in enemy.drop) {
            var obj = enemy.drop[i];
            if (obj[0] >= parseInt(Math.random() * 100)) {
                gain(obj[1], obj[2], 1);
                dropmsg += (getNameBytid(obj[1], obj[2]) + "\n");
            }
        }
    }
    return dropmsg;
}
//计算伤害(优化版)
function danger4skill(sprite, skillid) {
    var skill = gdata.skill[skillid];
    var base = 0;
    Object.keys(skill).forEach(function(key) {
        if (noDanger.indexOf(key) == -1 && typeof skill[key] === "number") {
            base += Math.ceil(skill[key] * sprite[key]);
        }
    });
    var danger = parseInt(random() * sprite.atk + skill.danger);
    return base + danger;
}
//行动返回本次伤害(未加入命中暴击等分歧)
function playerAction(skillid) {
    var danger = danger4skill(player, skillid);
    var finalDanger = danger - enemy.mdef;
    finalDanger = finalDanger <= 0 ? 1 : finalDanger;
    if (enemy.hp > finalDanger)
        enemy.hp -= finalDanger;
    else
        enemy.hp = 0;
    return {
        type: skillid,
        danger: finalDanger,
        dead: enemy.hp == 0
    };
}

function enemyAction() {
    var skillid = 0;
    if (enemy.skill.length > 0) {
        for (var i in enemy.skill) {
            if (enemy.skill[i][1] > Math.random() * 100) {
                skillid = enemy.skill[i][0];
                break;
            }
        }
    }
    var finalDanger = 0;
    var danger = danger4skill(enemy, skillid);
    finalDanger = danger - player.mdef;
    finalDanger = finalDanger <= 0 ? 1 : finalDanger;
    if (player.hp > finalDanger)
        player.hp -= finalDanger;
    else
        player.hp = 0;
    return {
        type: skillid,
        danger: finalDanger,
        dead: player.hp == 0
    };
}
//战斗流程//直接生成xml
function pro4fight(skillid) {
    var xml = "<vertical w='auto' align='center' >";
    if (player.spd > enemy.spd) {
        var result = playerAction(skillid);
        xml += "<text text='" + str.player + str.use + "[" + gdata.skill[result.type].name + "]" + str.mdanger + "," + enemy.name + str.hp + "-" + result.danger + "' />";
        if (result.dead) {
            return new XML(xml + "</vertical>");
        }
        var result0 = enemyAction();
        xml += "<text text='" + enemy.name + str.use + "[" + gdata.skill[result0.type].name + "]" + str.mdanger + "," + str.player + str.hp + "-" + result0.danger + "' />";
        return new XML(xml + "</vertical>");
    } else {
        var result0 = enemyAction();
        xml += "<text text='" + enemy.name + str.use + "[" + gdata.skill[result0.type].name + "]" + str.mdanger + "," + str.player + str.hp + "-" + result0.danger + "' />";
        if (result0.dead) {
            return new XML(xml + "</vertical>")
        };
        var result = playerAction(skillid);
        xml += "<text text='" + str.player + str.use + "[" + gdata.skill[result.type].name + "]" + str.mdanger + "," + enemy.name + str.hp + "-" + result.danger + "' />";
        return new XML(xml + "</vertical>");
    }
}

function equipForge() {
    var xml =
        <vertical>
        {title(str.equipForge)}
        {gridLayoutBtn("list",1)}
        {title(str.equipEnchatment)}
        {showBackBtn()}
    </vertical>
    ui.layout(xml);
    ui.back.click(() => home());
    var lists = [];
    Object.keys(forgelv).forEach(function(key) {
        lists.push({
            name: str[key],
            val: forgelv[key],
            bname: str.forge,
            type: key
        });
    });
    ui.list.setDataSource(lists);
    ui.list.on("item_bind", function(itemView, itemHolder) {
        itemView.list.on("click", function() {
            alertDialog(str[itemHolder.item.type] + str.forge + str.info, str.forge + str.lv + itemHolder.item.val);
        });

        itemView.btn.on("click", function() {
            doForgeEquip(itemHolder.item.type);
        })
    });
}
//获取强化效果
function getForgeEffect(type, value) {
    return parseInt(forgelv[type] / 100 * 5 * value);
}
//强化计算规则包含
function doForgeEquip(type) {
    var gold = forgelv[type] * 200 + 150 + parseInt(forgelv[type] / 3 * 450);
    if (gold > player.gold) {
        alertDialog(str.forgeFailed);
        return;
    }
    alertDialogE(str[type] + str.forge, str.forgeGold + gold + str.canyou, str.forge, str.no)
        .on("positive", () => {
            player.gold -= gold;
            forgelv[type]++;
            equipForge();
        })
        .show();
}

function personBag(type) {
    type = type || types.all;
    var xml =
        <vertical>
        {title(str.personBag)}
        {showBagMenuByTypes(type)}
        {gridLayout("item_list",2)}
        {showBackBtn()}
    </vertical>
    ui.layout(xml);
    ui.back.click(() => home());
    Object.keys(types).forEach(function(key) {
        let t = types[key];
        ui[t].click(function(type) {
            return function() {
                personBag(type)
            };
        }(t));
    });
    var lists = [];
    bag.forEach(function(item) {
        if (item.type == type || type == types.all) {
            lists.push({
                name: gdata[item.type][item.id].name,
                val: item.pcs,
                type: item.type,
                id: item.id
            });
        }
    });
    ui.item_list.setDataSource(lists);
    ui.item_list.on("item_bind", function(itemView, itemHolder) {
        itemView.item_list.on("click", function() {
            let it = itemHolder.item;
            let positive = equips.indexOf(it.type) > -1 ? str.change : it.type == types.item ? str.use : null;
            alertDialogE(it.name, msg4Gdata2Str(gdata[it.type][it.id]), positive)
                .on("positive", () => {
                    if (it.type == types.item)
                        useItem(it.id);
                    else if (equips.indexOf(it.type) > -1)
                        changeEquip(it.type, it.id);
                    personBag(type);
                }).show();
        });
    });
}

function personMsg() {
    var xml =
        <vertical>
        {title(str.personMsg)}
        {gridLayout("attr_list",2)}
        {title(str.equip)}
        {gridLayoutBtn("equip",1)}
        {title(str.skill)}
        {gridLayout("skill_list",2)}
        {showBackBtn()}
    </vertical>;
    ui.layout(xml);
    ui.back.click(() => home());
    var skills = new Array();
    player.skill.forEach(function(key) {
        if (typeof key === "number") {
            skills.push({
                name: gdata.skill[key].name,
                val: gdata.skill[key].mp,
                id: key
            });
        }
    });
    ui.skill_list.setDataSource(skills);
    ui.skill_list.on("item_bind", function(itemView, itemHolder) {
        itemView.name.on("click", function() {
            msg4GdataDialog(gdata.skill[itemHolder.item.id]);
        });
    });

    var equips = new Array();
    player.equip.forEach(function(equip) {
        equips.push({
            name: str[equip.type],
            bname: str.change,
            val: gdata[equip.type][equip.id].name,
            type: equip.type,
            id: equip.id
        });
    })
    ui.equip.setDataSource(equips);
    ui.equip.on("item_bind", function(itemView, itemHolder) {
        itemView.btn.on("click", function() {
            personBag(itemHolder.item.type);
        });
        itemView.val.on("click", function() {
            msg4GdataDialogBytid(itemHolder.item.type, itemHolder.item.id);
        });
    });

    var attrs = new Array();
    Object.keys(player).forEach(function(key) {
        if (typeof player[key] === "number") {
            attrs.push({
                name: str[key],
                val: player[key]
            });
        }
    });
    ui.attr_list.setDataSource(attrs);
    ui.attr_list.on("item_bind", function(itemView, itemHolder) {
        itemView.attr_list.on("click", function() {
            //此处可以加入详解
            alertDialog(itemHolder.item.name);
        });
    });

}

function saveProgress() {
    save();
}

function other() {
    alertDialog(str.more, str.quotations[parseInt(random() * 4)]);
}
//游戏首页
function home() {
    var xml =
        <frame>
        <grid id="home_menu" spanCount="2" align="center" w="auto" h="auto">
            <button id="menu" text="{{menu}}" style="Widget.AppCompat.Button.Borderless.Colored"/>
        </grid>
    </frame>;
    ui.layout(xml);
    ui.home_menu.setDataSource([{
        menu: str.personMsg,
        fun: "personMsg()"
    }, {
        menu: str.personBag,
        fun: "personBag()"
    }, {
        menu: str.equipForge,
        fun: "equipForge()"
    }, {
        menu: str.endlessTower,
        fun: "endlessTower()"
    }, {
        menu: str.gameShop,
        fun: "gameShop()"
    }, {
        menu: str.saveProgress,
        fun: "saveProgress()"
    }, {
        menu: str.other,
        fun: "other()"
    }]);
    ui.home_menu.on("item_bind", function(itemView, itemHolder) {
        itemView.menu.on("click", function() {
            eval(itemHolder.item.fun);
        });
    });
}

function continues() {
    if (load()) {
        home();
    }

}

function about() {
    alertDialog(str.gameAbout, str.aboutTitle + "\n" + str.aboutMsg);
}

function init() {
    playerB = JSON.parse(JSON.stringify(player));
    playerI = JSON.parse(JSON.stringify(player));
    Object.keys(playerI.gup).forEach(function(attr) {
        playerI.gup[attr] = 0;
    });
}

function drawTitle() {

}
//游戏主菜单界面
function main() {
    var xml =
        <frame>
        <vertical bg="#FFFFFF">
            <canvas id="canva" h="80dp" margin="50dp" />
        </vertical>
        <list id="main_menu" align="center" w="auto" h="auto">
            <vertical>
                <button id="menu" text="{{menu}}" style="Widget.AppCompat.Button.Borderless.Colored"/>
            </vertical>
        </list>
    </frame>;
    ui.layout(xml);
    ui.main_menu.setDataSource([{
        menu: str.gameStart,
        fun: "home()"
    }, {
        menu: str.gameContinue,
        fun: "continues()"
    }, {
        menu: str.gameAbout,
        fun: "about()"
    }]);
    ui.main_menu.on("item_bind", function(itemView, itemHolder) {
        itemView.menu.on("click", function() {
            eval(itemHolder.item.fun);
        });
    });
    var x = -60;
    var y = -140;
    ui.canva.on("draw", function(canva) {
        if (x < 150) x += 35;
        if (y < 70) y += 25;
        canva.drawImage(imgW, x, y, new Paint());
    });
}
//使用获得丢失换装
function useItem(id) {
    if (player.hp >= player.maxhp) return;
    lost(types.item, id, 1);
    player.hp += gdata.item[id].hp;
    player.hp = player.hp > player.maxhp ? player.maxhp : player.hp;
    alertDialog(str.use + str.success);
}

function gain(type, id, pcs) {
    for (var i = 0; i < bag.length; i++) {
        if (bag[i].type == type && bag[i].id == id) {
            bag[i].pcs += pcs;
            if (bag[i].pcs > maxPcs) {
                bag[i].pcs = maxPcs
            };
            return;
        }
    }
    bag.push({
        type: type,
        id: id,
        pcs: pcs
    });
}

function lost(type, id, pcs) {
    for (var i = 0; i < bag.length; i++) {
        if (bag[i].type == type && bag[i].id == id) {
            if (bag[i].pcs < pcs) return false;
            bag[i].pcs -= pcs;
            if (bag[i].pcs <= 0) {
                bag.splice(i, 1);
            }
            return;
        }
    }
}

function changeEquip(type, id) {
    player.equip.forEach(function(equip) {
        if (equip.type == type) {
            if (equip.id > 0)
                gain(type, equip.id, 1);
            lost(type, id, 1);
            equip.id = id;
            alertDialog(str.change + str.success);
            return;
        }
    });
}
//技能的增减
function learnSkillById(skillid) {
    player.skill.forEach(v => {
        if (skillid == v) {
            alertDialog(str.studied);
            return;
        }
    });
    player.skill.push(skillid);
    alertDialog(str.study);
}

function learnskillbyname(name) {

}

function forgetSkillById(skillid) {
    player.skill.forEach(v => {
        if (skillid == v) {
            player.skill.splice(v, 1);
            alertDialog(str.forget);
            return;
        }
    });
    alertDialog(str.forgetdefeat);
}

function forgetskillbyname(name) {

}
//数据调用函数
function getNameBytid(type, id) {
    return gdata[type][id].name;
}
//分析数据的函数
//将数据详细信息弹出
function msg4GdataDialog(data) {
    alertDialog(data.name + str.info, msg4Gdata2Str(data));
}

function msg4GdataDialogBytid(type, id) {
    msg4GdataDialog(gdata[type][id]);
}
//将数据详细信息已格式化的字符串返回
function msg4Gdata2Str(data) {
    var dropmsg = "";
    var skillmsg = "";
    if (data.drop && data.drop.length > 0) {
        dropmsg += str.drop + "\n";
        for (var i in data.drop) {
            var jlv = data.drop[i][0];
            var type = data.drop[i][1];
            var id = data.drop[i][2];
            dropmsg += (jlv + "%" + str.drop + getNameBytid(type, id) + "\n");

        }
    }
    if (data.skill && data.skill.length > 0) {
        skillmsg += str.use + str.skill + "\n";
        for (var i in data.skill) {
            var skil = gdata.skill[data.skill[i][0]];
            skillmsg += skil.name + " ";
        }
    }
    let content = "\n";
    Object.keys(data).forEach(function(key) {
        content += data[key] > 0 ? str[key] + "  " + data[key] + "\n" : "";
    });
    return content += (dropmsg + skillmsg + "\n" + str.ps + "\n" + data.desc);
}
//自定义一下dialog
function alertDialog(title, content) {
    dialogs.build({
        title: title,
        content: content || "",
        titleColor: COLOR_GREEN,
        contentColor: COLOR_GREEN
    }).show()
}

function alertDialogE(title, content, pbtn, nbtn) {
    return dialogs.build({
        title: title,
        content: content || "",
        positive: pbtn || str.ok,
        negative: nbtn || str.cancel,
        positiveColor: COLOR_GREEN,
        negativeColor: COLOR_GREEN,
        titleColor: COLOR_GREEN,
        contentColor: COLOR_GREEN
    });
}
//存取数据操作
function save() {
    var object4game = {
        player: player,
        playerI: playerI,
        bag: bag,
        towerCount: towerCount,
        forgelv: forgelv
    };
    log(JSON.stringify(object4game));
    var data = escape(JSON.stringify(object4game));
    try {
        var file = open(savePath, "w");
        file.write(data);
        file.close();
        alertDialog(str.saveProgress + str.success);
    } catch (e) {
        alertDialog(str.saveProgress + str.defeat + e);
    }
}

function load() {
    try {
        if (files.exists(savePath)) {
            var data = files.read(savePath);
            var object4game = JSON.parse(unescape(data));
            log(object4game);
            player = object4game.player;
            mbag = object4game.bag;
            playerI = object4game.playerI;
            towerCount = object4game.towerCount;
            forgelv = object4game.forgelv;
            alertDialog(str.loadProgress + str.success);
            return true;
        } else {
            alertDialog(str.loadProgress + str.defeat);
            return false;
        }
    } catch (e) {
        alertDialog(str.loadProgress + str.defeat + e);
        return false;
    }
}
//生成xml的函数
function gridLayout(id, span) {
    return <grid id={id} spanCount={span} w="auto" h="auto" align="center">
    <linear id={id} margin="0 4 16 4">
        <text id="name" text="{{name}}" color={COLOR_GREEN} minWidth="80dp"/>
        <text id="val" w="*" text="{{val}}" gravity="right" minWidth="40dp"/>
    </linear>
</grid>;
}

function gridLayoutBtn(id, span) {
    return <grid id={id} spanCount={span} w="auto" h="auto" align="center">
    <linear id={id}  w="auto">
        <text id="name" text="{{name}}" color={COLOR_GREEN} marginRight="16" minWidth="80dp"/>
        <text id="val"  text="{{val}}"  minWidth="40dp"/>
        <button id="btn"  text="{{bname}}" style="Widget.AppCompat.Button.Borderless.Colored"/>;
    </linear>
</grid>;
}

function showBackBtn() {
    return <fab id="back" w="auto" h="auto" tint={COLOR_GREEN} src="@drawable/ic_subdirectory_arrow_right_black_48dp" text={str.back} align="bottom|right" />
}

function title(text) {
    return <linear w="*" marginButton="15" pading="15" bg={COLOR_GREEN}>
    <text w="*" text={text} textSize={titleTextSize} gravity="center"/>
</linear>;
}
//type为需要高亮的类型
function showBagMenuByTypes(type) {
    var xml = "<linear w='auto' align='center'>";
    Object.keys(types).forEach(function(key) {
        let t = types[key];
        let c = t == type ? "color='" + COLOR_WHITE + "' bg='" + COLOR_GREEN + "'" : "";
        xml += "<text id='" + t + "' text='" + str[t] + "' w='auto' padding='10 5 10 5' " + c + "/>";
    });
    return new XML(xml + "</linear>")
}