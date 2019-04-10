"ui";
/**
*作者QQ: 941200728
*完成时间: 2019年4月2日 下午2:21:58
*测试机型: polaris
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*2160
 *API: 28
*备注: 用了都会哈哈大笑
**/
ui.statusBarColor("#aa000000");
ui.layout(
<relative bg="#aa000000">
        <text 
            text="光能手电筒" 
            color="#ffffff" 
            margin="20" 
            textSize="20" 
            layout_alignParentLeft="true"
            layout_alignParentTop="true"/>
        <text 
            text="脚本说明" 
            color="#ffffff" 
            margin="20" 
            textSize="15" 
            id="explain"
            background="?attr/selectableItemBackgroundBorderless"
            clickable="true"
            layout_alignParentRight="true"
            layout_alignParentTop="true"/>
        <img 
            src="@drawable/ic_lightbulb_outline_black_48dp" 
            w="150" 
            h="150" 
            tint="white" 
            id="img"
            layout_centerHorizontal="true"
            layout_centerVertical="true"/>
</relative>);
ui.explain.on("click",() => {
    alert("脚本说明","           光能手电筒，有光的时候就会亮。如果没有光的时候会不会亮呢？绝对不亮！那么有什么办法能在没光的时候打开它呢？只需要用另一个手机打开手电筒照射即可打开手电筒。创意来自老子开发，脚本移植作者QQ941200728");
});

importClass(android.hardware.camera2.CameraCharacteristics);
var flash = false;
function setFlash(statues) {
    var mCameraManager = context.getSystemService(context.CAMERA_SERVICE);

    //获取当前手机所有摄像头设备ID
    var ids = mCameraManager.getCameraIdList();

    for each(ida in ids) {
        var c = mCameraManager.getCameraCharacteristics(ida);
        //查询该摄像头组件是否包含闪光灯
        var flashAvailable = c.get(CameraCharacteristics.FLASH_INFO_AVAILABLE);
        var lensFacing = c.get(CameraCharacteristics.LENS_FACING);
        if (flashAvailable != null && flashAvailable && lensFacing != null && lensFacing == CameraCharacteristics.LENS_FACING_BACK) {
            //打开或关闭手电筒
            mCameraManager.setTorchMode(ida, statues);
        }
    }
}
//光线传感器监听

sensors.register("light").on("change", (event, light)=>{
    if(light>200){
        if(!flash){
            setFlash(true);
            ui.run(function(){
                ui.img.attr("tint","yellow");
            });
        }
        flash = true;
    }else{
        if(flash){
            setFlash(false);
            ui.run(function(){
                ui.img.attr("tint","white");
            });
        }
        flash = false;
    }
});
  