"ui";
    ui.layout(
        <frame>
            <vertical>
                <text gravity="center" color="#ff6600" size="30dp">试听</text>
                
                <img marginTop="20" layout_gravity="center" src="@drawable/ic_music_note_black_48dp" w="400" h="400" tint="white" bg="#ff6600"/>
                
                <seekbar progress="0" id="p"paddingLeft="20" paddingRight="20" marginTop="10"/>
                
                <horizontal gravity="center" layout_gravity="center" marginTop="10">
                <frame marginRight="30">
                    <img src="#ff6600" w="40" h="40" circle="true" gravity="center" layout_gravity="center"/>
                    <img id="快退" src="@drawable/ic_fast_rewind_black_48dp" gravity="center" w="40" h="40" tint="white" layout_gravity="center"/>
                </frame>
                <frame>
                    <img src="#ff6600" w="50" h="50" circle="true" gravity="center" layout_gravity="center"/>
                    <img id="暂停播放" src="@drawable/ic_pause_black_48dp" layout_gravity="center" w="50" h="50" tint="white"/>
                </frame>
                <frame marginLeft="30">
                    <img src="#ff6600" w="40" h="40" circle="true" layout_gravity="center"/>
                    <img id="快进" src="@drawable/ic_fast_forward_black_48dp" layout_gravity="center" w="40" h="40" tint="white"/>
                </frame>
                </horizontal>
            </vertical>
        </frame>
        )

var isPrepared = false;
var Duration = 0;
var mp = new android.media.MediaPlayer; //新建一个的实例
//准备好的回调函数。
mp.setOnPreparedListener(function() {
    isPrepared = true;
});





ui.p.setOnSeekBarChangeListener({
    onProgressChanged: function(seekBar, progress, fromUser) {
        //SeekBar 滑动时的回调函数，其中 fromUser 为 true 时是手动调节
        if (isPrepared && fromUser) {
            if (mp.isPlaying()) {
                mp.pause(); //暂停        
                ui.run(() => {
                   // ui.but_start_pause.setText(String("◇"));
                });
            };
            var S = parseFloat(progress / seekBar.getMax());
            mp.seekTo(Math.floor(S * Duration));
        };
    },
    onStartTrackingTouch: function(seekBar) {
        //SeekBar 开始滑动的的回调函数
        if (isPrepared && mp.isPlaying()) {
            mp.pause(); //暂停        
            ui.run(() => {
   //             ui.but_start_pause.setText(String("◇"));
            });
        };
    },
    onStopTrackingTouch: function(seekBar) {
        //SeekBar 停止滑动的回调函数
        if (isPrepared && !mp.isPlaying()) {
            mp.start(); //播放    
            ui.run(() => {
 //               ui.but_start_pause.setText(String("□"));
            });
        };
    }
});


ui.暂停播放.click(function() {
        if (isPrepared) {//是否已经载入音乐文件并准备就绪？
            if (!mp.isPlaying()) {
                mp.start(); //播放    
                ui.run(() => {
                    //ui.暂停播放.
                });
            } else {
                mp.pause(); //暂停        
                ui.run(() => {
                    ui.暂停播放.setSource("@drawable/ic_pause_black_48dp")
                });
            };
        } else {
            PlayMusic("","///sdcard/music.mp3");
        };
});

ui.快退.click(function() {
    if (musicFiles.length) {
        CurrentMusic--;
        CurrentMusic = (0 <= CurrentMusic && CurrentMusic < musicFiles.length) ? CurrentMusic : (0 <= CurrentMusic ? 0 : musicFiles.length - 1);
        //PlayMusic(musicFiles[CurrentMusic].name, musicFiles[CurrentMusic].path);
    };
});

ui.快进.click(function() {
    if (musicFiles.length) {
        CurrentMusic++;
        CurrentMusic = (0 <= CurrentMusic && CurrentMusic < musicFiles.length) ? CurrentMusic : (0 <= CurrentMusic ? 0 : musicFiles.length - 1);
        //PlayMusic(musicFiles[CurrentMusic].name, musicFiles[CurrentMusic].path);
    };
});

setInterval(() => {
    if (isPrepared) {
        var CP = parseInt(mp.getCurrentPosition());
        ui.run(() => {
            //ui.CurrentDuration.setText(String(SecondToMinute(Math.floor(CP / 1000))));
            ui.p.setProgress(Math.floor(CP / Duration * ui.p.getMax()));
        });
    };
}, 100);

function PlayMusic(name, path) {
    mp.reset(); //将mp对象重置到刚创建的状态
    mp.setDataSource("///sdcard/playmusic/music.mp3"); //设置要播放文件的路径//"/sdcard/qqmusic/song/菲儿 - 大悲咒 (神曲版) [mqms].m4a"
    mp.prepare(); //播放 准备完成，开始播放前要调用
    mp.start();

    Duration = mp.getDuration();
    ui.run(() => {
     //   ui.music_name.setText(String(name));
        //ui.Duration.setText(String(SecondToMinute(Math.floor(Duration / 1000))));
    });
};
function SecondToMinute(second) {
    var minute = Math.floor(second / 60);
    second = second % 60;
    return minute + ":" + (second < 10 ? "0" + second : second);
};