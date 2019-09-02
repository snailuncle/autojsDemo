"ui";

//时间。2019,8,11
//作者。1811588980
//转载请说明出处。
//8,12,17,21bug修复播放时间断杂音。


importClass(android.media.AudioManager);
importClass(android.media.AudioTrack);
importClass(android.media.AudioFormat);
var SeekBarLayout = (function() {
    util.extend(SeekBarLayout, ui.Widget);

    function SeekBarLayout() {
        ui.Widget.call(this);
        this.Magnification = 1;
        this.Difference = 0;
        this.defineAttr("text", (view, attr, value, defineSetter) => {
            log(1);
            view._text.setText(String(value));
        });
        this.defineAttr("range", (view, attr, value, defineSetter) => {
            log(2);
            value = String(value);
            let ary = String(value).split(" ");
            let ASumStr = ary[0];
            let BSumStr = ary[1];

            let AMinSum = parseFloat(ASumStr);
            let AMaxSum = parseFloat(ASumStr.replace(".", ""));
            let A_M = AMaxSum / AMinSum;

            let BMinSum = parseFloat(BSumStr);
            let BMaxSum = parseFloat(BSumStr.replace(".", ""));
            let B_M = BMaxSum / BMinSum;

            this.Magnification = A_M >= B_M ? A_M : B_M;

            let MinSum = AMinSum <= BMinSum ? AMinSum : BMinSum;
            let MaxSum = AMinSum <= BMinSum ? BMinSum : AMinSum;
            let MinSumStr = AMinSum <= BMinSum ? ASumStr : BSumStr;
            let MaxSumStr = AMinSum <= BMinSum ? BSumStr : ASumStr;

            this.Difference = MinSum;

            view._Duration_Min.setText(MinSumStr);
            view._Duration_Max.setText(MaxSumStr);
            view._Duration_seekbar.setMax(this.Magnification * (MaxSum - MinSum));
        });
        this.defineAttr("sum", (view, attr, value, defineSetter) => {
            log(3);
            let Sum = parseFloat(String(value));
            view._CurrentDuration.setText(String(value));
            let _Sum = this.Magnification * (Sum - this.Difference);
            view._Duration_seekbar.setProgress(_Sum);
        });
        this.defineAttr("onChang", (view, attr, value, defineSetter) => {
            log(4);
            var _myFun = eval(value);
            view._Duration_seekbar.setOnSeekBarChangeListener({
                onProgressChanged: (seekBar, progress, fromUser) => {
                    view._CurrentDuration.setText(String(Math.floor((progress / this.Magnification + this.Difference) * 100) / 100));
                    if (fromUser) {
                        _myFun(view._text, Math.floor(progress / this.Magnification + this.Difference));
                    }
                },
                onStartTrackingTouch: function(seekBar) {},
                onStopTrackingTouch: function(seekBar) {
                    //eval(value+"(view._text,progress)");
                }
            });
        });
    };
    SeekBarLayout.prototype.render = function() {
        return (
            <vertical w="auto" margin="5" >
                            <text id="_text"  w="auto" text="A" textSize="15"gravity="center" layout_gravity="center"/>
                            <frame w="*">
                                <text id="_Duration_Min" w="auto" text="0"margin="10 0 0 0" gravity="center" layout_gravity="left"/>
                                <text id="_CurrentDuration" w="auto" text="0"margin="0 0 0 0" gravity="center" layout_gravity="center"/>
                                <text id="_Duration_Max" w="auto" text="0"margin="0 0 10 0" gravity="center" layout_gravity="right"/>
                            </frame>
                            <seekbar id="_Duration_seekbar" layout_weight="1"/>
                        </vertical>
        );
    };
    SeekBarLayout.prototype.getSum = function() {
        return this.view._Duration_seekbar.getProgress();
    };
    ui.registerWidget("seekbar-layout", SeekBarLayout);
    return SeekBarLayout;
})();


var w = device.width;



ui.layout(
    <vertical w="*"h="auto">
        <text text="调整音波频率按开始和停止" textSize="17" gravity="center"w="*"/>
        <seekbar-layout id="s1" w="*" h="auto" text="微调频率Hz" range="1 2000" sum="1" onChang="setHz1"/>
        <seekbar-layout id="s2" w="*" h="auto" text="粗调频率Hz" range="0 18000" sum="0" onChang="setHz2"/>
        <text id="text" text="" textSize="17" gravity="center"w="*"/>
        <horizontal w="*">
        <button id="start" layout_weight="1" h="auto" text="开始"/>
        <button id="stop"  layout_weight="1" h="auto" text="停止"/>
        </horizontal>
    </vertical>
);



//audioFile = new File(files.path("./生成的音频.wav"));
var isPlay = false;
ui.start.click(function() {
    isPlay = true;
});
ui.stop.click(function() {
    isPlay = false;
});

var Hz1 = 1; 
var Hz2 = 0; 
ui.run(()=>{
    ui.s1.attr("sum",Hz1+"");
    ui.s2.attr("sum",Hz2+"");
    ui.text.setText("实际频率: "+String(Hz1+Hz2));  
});
function setHz1(a, v) {
    Hz1 = v;
    ui.run(()=>{
      ui.text.setText("实际频率: "+String(Hz1+Hz2));  
    });
};
function setHz2(a, v) {
    Hz2 = v;
    ui.run(()=>{
      ui.text.setText("实际频率: "+String(Hz1+Hz2));  
    });
};



var sampleRateInHz  =  192000; 
var channelConfig  =  AudioFormat.CHANNEL_OUT_MONO; 
var audioFormat  =  AudioFormat.ENCODING_PCM_8BIT;
//var channelConfig  =  AudioFormat.CHANNEL_OUT_STEREO; 
//var audioFormat  =  AudioFormat.ENCODING_PCM_16BIT;

 
var bufferSizeInBytes  =  AudioTrack.getMinBufferSize(sampleRateInHz,  channelConfig,  audioFormat); 
var audioTrack  =  new AudioTrack(AudioManager.STREAM_MUSIC,  sampleRateInHz,  channelConfig,  audioFormat,  bufferSizeInBytes,  AudioTrack.MODE_STREAM);
audioTrack.play();

events.on("exit", function() {
    log("结束运行");
    thread.interrupt();
    audioTrack.stop();
    audioTrack.release();

});


function Mbyte(length) {
    return util.java.array("byte", length);
};

var thread =  threads.start(function() {
var Hzz=Hz1+Hz2;
var audioData;
    while (1) {
        if (isPlay) {
            var Hz=Hz1+Hz2;
            if(Hz!=Hzz||!audioData){
                Hzz=Hz;
                audioData  =  new Mbyte(sampleRateInHz/Hz);
                var asd = 2 * Math.PI * ((Hz) / sampleRateInHz);

                for (let i = 0; i < audioData.length; i++) {
                    //每一位的数值为  -128~127
                    audioData[i] = Math.floor(Math.sin(i * asd) * 126);
                };
            };
            audioTrack.write(audioData,  0,  audioData.length);  //play raw audio bytes
        };
    };

});







