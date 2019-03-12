"ui";
ui.layout(
    <frame>
          <text id="t1">这是第一个界面,点击切换到第二个界面</text>
    </frame>
    )
function 第二个界面(){
    ui.layout(
    <frame>
          <text id="t1">这是第二个界面,点击退出</text>
    </frame>
    )
ui.t1.on("click",()=>{
    ui.finish()
    })
    }
    ui.t1.on("click",()=>{
        第二个界面()
        })