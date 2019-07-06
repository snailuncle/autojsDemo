importClass(android.icu.util.Calendar);
importClass(android.provider.CalendarContract);
importClass(android.provider.CalendarContract.Calendars);
importClass(android.os.Debug.InstructionCount);
importClass(android.net.Uri);
importClass(android.database.Cursor);
importClass(android.content.ContentValues);

//轮子地址
//http://blog.csdn.net/zhaoshuyu111/article/details/53195142?ref=myread

var title = "测试"
var description = "啧啧啧啧"
var CALANDER_EVENT_URL = "content://com.android.calendar/events";

//url
var CALANDER_URL = "content://com.android.calendar/calendars/";
//查询现有账号
var userCursor = context.getContentResolver().query(Uri.parse(CALANDER_URL), null, null, null, null);
userCursor.moveToFirst();
//取id
var calid = userCursor.getInt(userCursor.getColumnIndex(CalendarContract.Calendars._ID));
var event = new ContentValues();
event.put("title", title);
event.put("description", description);
// 插入账户的id
event.put("calendar_id", calid.toString());


var mCalendar = Calendar.getInstance();
var start = mCalendar.getTime().getTime();
var end = mCalendar.getTime().getTime();
event.put(CalendarContract.Events.DTSTART, start.toString());
event.put(CalendarContract.Events.DTEND, end.toString());




event.put(CalendarContract.Events.EVENT_TIMEZONE, "Asia/Shanghai"); //这个是时区，必须有，
//添加事件
context.getContentResolver().insert(Uri.parse(CALANDER_EVENT_URL), event);