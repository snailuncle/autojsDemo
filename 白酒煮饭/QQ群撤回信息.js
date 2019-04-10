auto();
// console.show();
/**
 * 此脚本是QQ群管理员恶搞群成员的.
 * MyName是执行者的群名片.非群管理执行此脚本无效果.
 * 不修改名字 连自己的信息也撤回
 */
var MyName = '短发';

for (0; 1; 0) {
    var name = id('chat_item_nick_name');
    var massage = id('chat_item_content_layout');

    if (massage.find().empty() != true) {
        for (var i = massage.find().size() - 1; i > massage.find().size() - 2; i--) {

            if (i <= massage.find().size() - 2 || i <= -1) {
                break;
            }

            var getName = name.untilFind().get(i).text();
            if (getName == MyName) { //==撤回自己说的话,!= 撤回别人说话的(需要管理员权限)
                massage.find().get(i).longClick();
                sleep(300);
                if (text('撤回').find().empty() != true) {
                    text('撤回').findOne().click();
                    sleep(700);

                    if (id('dialogRightBtn').text('确定').find().empty() != true) {
                        id('dialogRightBtn').text('确定').findOne().click();
                        sleep(300);
                    }
                } else {
                    KeyCode('KEYCODE_BACK');
                    sleep(300);
                }
            }
            i = i - 1;
        }
    }
    sleep(500);
}