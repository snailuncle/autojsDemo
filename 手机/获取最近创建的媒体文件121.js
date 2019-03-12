MediaStore = android.provider.MediaStore;


//测试1
//getVideosInfo();
//测试2
var a = getPhotosInfo(10);
//测试3
//getAudiosInfo(10);
log(a);




//获取设备上所有的音频信息
function getAudiosInfo(maxAmount) {
    let Ary = new Array;
    let contentResolver = context.getContentResolver();
    let audioColumns = [
        MediaStore.Audio.Media._ID,
        MediaStore.Audio.Media.DATA,
        MediaStore.Audio.Media.TITLE,
        MediaStore.Audio.Media.MIME_TYPE
    ];
    let cursor = contentResolver.query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, audioColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    for (let i = 0; i < maxAmount; i++) {
        cursor.moveToPrevious();
        let ob = {};
        ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
        ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.MIME_TYPE));
        Ary.push(ob);
    }
    return Ary;
}



//获取设备上所有的视频信息
function getVideosInfo(maxAmount) {
    let Ary = new Array;
    let contentResolver = context.getContentResolver();
    let videoColumns = [
        MediaStore.Video.Media._ID,
        MediaStore.Video.Media.DATA,
        MediaStore.Video.Media.TITLE,
        MediaStore.Video.Media.MIME_TYPE
    ];
    let cursor = contentResolver.query(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, videoColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    for (let i = 0; i < maxAmount; i++) {
        cursor.moveToPrevious();
        var ob = {};
        ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.TITLE));
        ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.MIME_TYPE));
        Ary.push(ob);
    }
    return Ary;
}

//获取设备上所有的照片信息
function getPhotosInfo(maxAmount) {
    let Ary = new Array;
    let contentResolver = context.getContentResolver();
    let photoColumns = [
        MediaStore.Images.Media._ID,
        MediaStore.Images.Media.DATA,
        MediaStore.Images.Media.TITLE,
        MediaStore.Images.Media.MIME_TYPE,
        MediaStore.Images.Media.SIZE,
        MediaStore.Images.Media.ORIENTATION
    ];
    let cursor = contentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, photoColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    for (let i = 0; i < maxAmount; i++) {
        cursor.moveToPrevious();
        var ob = {};
        ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.TITLE));
        ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE));
        ob.size = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE));
        Ary.push(ob);

    }
    return Ary;
}