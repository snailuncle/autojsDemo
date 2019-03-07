"ui";
       intent = new Intent();
       importClass(android.content.BroadcastReceiver);
       importClass(android.content.ContextWrapper);
       importClass(android.content.IntentFilter);
       filter = new IntentFilter();
       filter.addAction(Intent.ACTION_BATTERY_CHANGED);
 ui.layout(
     <vertical>
     <button id="button" text="打开广播(电量)" />
     <button id="button1" text="注销广播"/>
     </vertical>

     );
     var a;
     ui.button.on("click",()=>{
     ui.run(function(){
       new ContextWrapper(context).registerReceiver(a=new BroadcastReceiver({
           onReceive: function(context, intent) {
               if (Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
                   //当前电量
                   level = intent.getIntExtra("level", 0);
                   toastLog("当前电量:"+level+"%");

           }
           }

       }), filter)
     }) });

     ui.button1.on("click",()=>{
     ui.run(function(){
         if(a!=null){

     new ContextWrapper(context).unregisterReceiver(a);
     toastLog("已取消(注销广播)");

     a=null;
     }else{
         toastLog("没打开广播呢");
         }
     }) });

      /*
       if(level==18){
                       new ContextWrapper(context).unregisterReceiver(new BroadcastReceiver({
           onReceive: function(context, intent) {
               if (Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
                   //当前电量
                   level = intent.getIntExtra("level", 0);
                   toastLog(level);
               }
               */
