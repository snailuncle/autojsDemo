//importClass(android.content.Intent);
importClass(android.speech.RecognizerIntent)

intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
//intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
// intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "开始语音识别");
// app.startActivityForResult(intent, VOICE_RECOGNITION_REQUEST_CODE);
intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH); //本地识别程序

intent = new Intent(RecognizerIntent.ACTION_WEB_SEARCH); //网络识别程序
app.startActivity(intent);
