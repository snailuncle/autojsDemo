

playRingtone();

function playRingtone() {
    let Uri = android.net.Uri;
    let RingtoneManager = android.media.RingtoneManager;
    let uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
    let rt = RingtoneManager.getRingtone(context, uri);
    rt.play();
}