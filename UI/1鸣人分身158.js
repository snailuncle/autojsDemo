"ui";

ui.layout(
    <frame>
        <list id="list">
            <vertical>
                <text id="name" textSize="16sp" textColor="#000000" text="姓名: {{name}}"/>
                <text id="age" textSize="16sp" textColor="#000000" text="年龄: {{age}}岁"/>
                <button id="deleteItem"  text="分身6个"/>
            </vertical>
        </list>
    </frame>
);

var items = [
    {name: "鸣人", age: 18}
];

ui.list.setDataSource(items);


ui.list.on("item_click", function( item, i, itemView, listView){
    toast("被点击的人名字为: " + item.name + "，年龄为: " + item.age);
});

ui.list.on('item_bind',function(itemView,itemHolder){
  itemView.deleteItem.on('click',function(){
    // let item=itemHolder.item
    // toast('被删除的人名字为: '+item.name+',年龄为: '+item.age)
    // items.splice(itemHolder.position,1)
    let 按钮文本=ui.deleteItem.text()
    if(按钮文本=='分身6个'){
      for(let i=0;i<6;i++){
        items.push({name: "鸣人分身"+(i+1), age: 18})
      }
      ui.deleteItem.setText('删除分身')
    }else if(按钮文本=='删除分身'){
      items = [
        {name: "鸣人", age: 18}
      ];
      ui.list.setDataSource(items);
      ui.deleteItem.setText('分身6个')
    }
  })
})
