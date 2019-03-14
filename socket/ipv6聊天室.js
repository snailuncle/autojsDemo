"ui";
importClass("java.net.ServerSocket");
importClass("java.net.Socket");
importClass("java.net.InetAddress");
importClass("java.io.DataInputStream");
importClass("java.io.DataOutputStream");


const PORT = 10010;
const LOCALHOST = "::1";

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="聊天室" />
        </appbar>
        <horizontal h="70" gravity="center_vertical">
            <text textSize="14sp" textColor="#999999" text="邀请码: " marginRight="8"/>
            <text id="code" textSize="16sp" textColor="#555555" w="0" layout_weight="1"/>
            <button id="copy" text="复制" style="Widget.AppCompat.Button.Borderless.Colored" />
        </horizontal>
        <list id="messages" w="*" layout_weight="1" h="0" padding="12">
            <horizontal>
                <text textSize="16sp" textColor="#000000" text="{{this}}" />
            </horizontal>
        </list>
        <horizontal>
            <input id="input" layout_weight="1" w="0" />
            <button id="send" text="发送" style="Widget.AppCompat.Button.Colored" />
        </horizontal>
    </vertical>
);

var messages = [];

activity.setSupportActionBar(ui.toolbar);
ui.messages.setDataSource(messages);
ui.send.on("click", () => {
    let msg = {
        content: String(ui.input.text()),
        nickname: nickname
    };
    room.send(msg);
    room.emit("message", msg);
    ui.input.text("");
});
ui.copy.on("click", () => {
    setClip(ui.code.text());
    toast("已复制");
})

let storage = storages.create("org.autojs.autojs.jschat");
var nickname = storage.get("nickname", "");
dialogs.build({
    title: "聊天室",
    positive: "加入房间",
    negative: "创建房间",
    inputHint: "昵称",
    inputPrefill: nickname
}).on("positive", (dialog) => {
    nickname = String(dialog.inputEditText.text);
    storage.put("nickname", nickname);
    joinRoom();
}).on("negative", (dialog) => {
    nickname = String(dialog.inputEditText.text);
    storage.put("nickname", nickname);
    createRoom();
}).show();

var room;
var writeThread = threads.start(function () {
    setInterval(() => { }, 1000);
});

function joinRoom() {
    let code = storage.get("code", "");
    dialogs.rawInput("请输入邀请码", code)
        .then(code => {
            if (!code) {
                ui.finish();
                return;
            }
            ui.code.setText(code);
            storage.put("code", code);
            let ip = codeToIP(code);
            threads.start(function () {
                try{
                    room = RoomMember.joinRoom(ip, PORT);
                    listenRoom(room);
                }catch(e){
                    console.error(e);
                }
            });
        });
}

function createRoom() {
    let ipv6 = getLocalIpV6();
    if (!ipv6) {
        toast("不支持ipv6!");
        ui.finish();
        return;
    }
    ui.code.setText(ipToCode(ipv6));
    room = new RoomHost(PORT);
    listenRoom(room);
}

function listenRoom(room) {
    room.on("message", message => {
        console.log("message: ", message);
        ui.post(() => {
            messages.push(message.nickname + ": " + message.content);
        });
    });
}

function codeToIP(code) {
    let ip = String(java.lang.String(android.util.Base64.decode(code, 2)));
    log("codeToIP: ip = %s, code = %s", ip, code);
    return ip;
}

function ipToCode(ip) {
    let code = android.util.Base64.encodeToString(java.lang.String(ip).getBytes(), 2);
    log("ipToCode: ip = %s, code = %s", ip, code);
    return code;
}

function getLocalIpV6() {
    try {
        for (let en = java.net.NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
            let intf = en.nextElement();
            for (let enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
                let inetAddress = enumIpAddr.nextElement();
                if (!inetAddress.isLoopbackAddress()  && !inetAddress.isLinkLocalAddress() && inetAddress instanceof java.net.Inet6Address) {
                    let ipaddress = inetAddress.getHostAddress().toString();
                    return ipaddress;
                }
            }
        }
    } catch (ex) {
        console.error(ex);
    }
    return null;
}

function RoomHost(port) {
    events.__asEmitter__(this);
    var that = this;
    this.server = new ServerSocket(port, 50, InetAddress.getByName(LOCALHOST));
    this.members = [];
    this.listenThread = threads.start(function () {
        try {
            while (true) {
                let socket = that.server.accept();
                log("client connect: ", socket);
                var member = new RoomMember(socket);
                member.on("message", message => {
                    that.emit("message", message);
                    that.members.forEach(m => {
                        if (member != m) {
                            m.send(message);
                        }
                    });
                });

                that.members.push(member);
            }
        } catch (e) {
            console.log(e);
        }
    });
    events.on("exit", () => {
        this.server.close();
    });
}

RoomHost.prototype.send = function (data) {
    this.members.forEach(member => {
        member.send(data);
    });
    //this.emit("message", data);
}


function RoomMember(socket) {
    this.socket = socket;
    events.__asEmitter__(this);
    this.inputStream = new DataInputStream(socket.getInputStream());
    this.outputStream = new DataOutputStream(socket.getOutputStream());
    var inputStream = this.inputStream;
    this.messageId = 0;
    var that = this;
    this.readThread = threads.start(function () {
        try {
            let str;
            while ((str = inputStream.readUTF()) != null) {
                let json = JSON.parse(str);
                console.log("socket %s receive: ", that.socket.toString(), json);
                if (typeof (json.type) == "string") {
                    that.emit(json.type, json.data);
                }
            }
        } catch (e) {
            console.log(e);
        }

    });
}

RoomMember.prototype.send = function (message) {
    var msg = {};
    Object.assign(msg, message);
    msg.from = this.socket.toString();
    msg.id = this.messageId++;
    var str = JSON.stringify({
        type: "message",
        data: msg
    });
    writeThread.setImmediate(() => {
        this.outputStream.writeUTF(str);
    });
}

RoomMember.joinRoom = function (hostIp, port) {
    var socket = new Socket(hostIp, port);
    let room = new RoomMember(socket);
    toastLog("加入房间成功");
    return room;
}
