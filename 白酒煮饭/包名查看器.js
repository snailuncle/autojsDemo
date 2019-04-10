"ui";

ui.layout(
    <frame>
    <vertical bg="#ff0000">
        <list id="list">
           
              <linear>  
                <text id="yym" textSize="12sp" h="20" w="100" bg="#000000" textColor="#ffffff" margin="0 1 1 0" text="{{yym}}"/>
                <text id="yybm" textSize="12sp" h="20"  w="260" textColor="#ffffff00" bg="#666666"  text="包名:{{yybm}}"/>
              </linear>
              
          
        </list>
    </vertical>
    </frame>
);


threads.start(function() {
    var items = new Array();
    var qb = context.getPackageManager();
    var lb = qb.getInstalledPackages(0);
    var xt = new Array();
    var yh = new Array();
    var i0 = 0;
    var i1 = 0;
    for (i = 0; i < lb.size(); i++) {
        var yy = lb.get(i)
        if ((yy.applicationInfo.flags & yy.applicationInfo.FLAG_SYSTEM) <= 0) {
            yh[i1] = yy;
            i1++;
        } else {
            xt[i0] = yy;
            i0++;
        }
    }
    for (i = 0; i < yh.length; i++) {
        items[i] = {
            yym: "",
            yybm: ""
        };
        var yyxx = yh[i].applicationInfo;
        items[i].yym = qb.getApplicationLabel(yyxx);
        items[i].yybm = yyxx.packageName;
    }
    for (j = 0; j < xt.length; j++) {
        k = j + yh.length;
        items[k] = {
            yym: "",
            yybm: ""
        };
        yyxx = xt[j].applicationInfo;
        items[k].yym = qb.getApplicationLabel(yyxx);
        items[k].yybm = yyxx.packageName;
    }
    log(items);
    ui.run(function() {
        ui.list.setDataSource(items);
    });
});



ui.list.on("item_click", function(i, item, itemView, listView) {
    toast(i.yym + "包名已复制:" + i.yybm);
    setClip(i.yybm);
});