//制作时间。2019,8,10
//作者。1811588980

//wav音频制作文件生成。

//console.show();



// 我用#CSDN#这个app发现了有技术含量的博客，小伙伴们求同去《android音频编辑之音频转换PCM与WAV》, 一起来围观吧 https://blog.csdn.net/hesong1120/article/details/79043482?utm_source=app

var sampleRate = 30000;
//采样率。
var channels = 1;
//声道数。
var bitNum = 8;
//采样位数。
var byteRate = sampleRate * channels * bitNum / 8;
//比特率。每秒的数据量。
var duration = 5;
//声音总时长,秒
var headData = 44;
//文件头部数据长度


//PCM数据大小
var totalAudioLen = byteRate * duration;

//总大小，由于不包括RIFF和WAV，所以是44 - 8 = 36，在加上PCM文件大小
var totalDataLen = totalAudioLen + 36;




var bytes = util.java.array("byte", totalAudioLen+44);
//创建byte数组。


function toByte(a){
    //强制转换为byte数值
     return (a+128)%256-128;
};

bytes[0] = 'R'.charCodeAt(0); // RIFF
bytes[1] = 'I'.charCodeAt(0);
bytes[2] = 'F'.charCodeAt(0);
bytes[3] = 'F'.charCodeAt(0);
bytes[4] = toByte(totalDataLen & 0xff); //数据大小
bytes[5] = toByte((totalDataLen >> 8) & 0xff);
bytes[6] = toByte((totalDataLen >> 16) & 0xff);
bytes[7] = toByte((totalDataLen >> 24) & 0xff);
bytes[8] = 'W'.charCodeAt(0); //WAVE
bytes[9] = 'A'.charCodeAt(0);
bytes[10] = 'V'.charCodeAt(0);
bytes[11] = 'E'.charCodeAt(0);
//FMT Chunk
bytes[12] = 'f'.charCodeAt(0); // 'fmt '
bytes[13] = 'm'.charCodeAt(0);
bytes[14] = 't'.charCodeAt(0);
bytes[15] = ' '.charCodeAt(0); //过渡字节
//数据大小
bytes[16] = 16; // 4 bytes: size of 'fmt ' chunk
bytes[17] = 0;
bytes[18] = 0;
bytes[19] = 0;
//编码方式 10H为PCM编码格式
bytes[20] = 1; // format = 1
bytes[21] = 0;
//通道数
bytes[22] = channels;
bytes[23] = 0;
//采样率，每个通道的播放速度
bytes[24] = toByte(sampleRate & 0xff);
bytes[25] =toByte((sampleRate >> 8) & 0xff);
bytes[26] = toByte((sampleRate >> 16) & 0xff);
bytes[27] = toByte((sampleRate >> 24) & 0xff);
//音频数据传送速率,采样率*通道数*采样深度/8
bytes[28] = toByte(byteRate & 0xff);
bytes[29] = toByte((byteRate >> 8) & 0xff);
bytes[30] = toByte((byteRate >> 16) & 0xff);
bytes[31] = toByte((byteRate >> 24) & 0xff);
// 确定系统一次要处理多少个这样字节的数据，确定缓冲区，通道数*采样位数
bytes[32] = toByte(channels * 16 / 8);
bytes[33] = 0;
//每个样本的数据位数
bytes[34] = 16;
bytes[35] = 0;
//Data chunk
bytes[36] = 'd'.charCodeAt(0); //data
bytes[37] = 'a'.charCodeAt(0);
bytes[38] = 't'.charCodeAt(0);
bytes[39] = 'a'.charCodeAt(0);
bytes[40] = toByte(totalAudioLen & 0xff);
bytes[41] = toByte((totalAudioLen >> 8) & 0xff);
bytes[42] = toByte((totalAudioLen >> 16) & 0xff);
bytes[43] = toByte((totalAudioLen >> 24) & 0xff);

//文件头数据制作完成。


//～～～～～～～～～～～～～～～～～～
//下面开始声音的制作。

var minHz=20;
var maxHz=1000;
//声音频率。
for (let i = 0; i < totalAudioLen; i++) {

var asd=sampleRate/((maxHz-minHz)/totalAudioLen*i+minHz);
//每一位的数值为  -128~127
    bytes[headData + i] = Math.floor(Math.sin((i%asd)/asd*2*Math.PI) * 126);
};





//保存为字节文件。
files.writeBytes("./生成的音频.wav",bytes);






