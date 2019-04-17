app.startActivity({
  action: "android.intent.action.VIEW",
  packageName: "com.miui.gallery",
  className: "com.miui.gallery.activity.ExternalPhotoPageActivity",
  data: app.parseUri("file:///storage/emulated/0/DCIM/Screenshots/Screenshot_2019-04-10-10-33-44-041_org.autojs.autojspro.png"),
  type: "image/png",
  flags: ["grant_read_uri_permission","grant_write_uri_permission"],
});
