path = '/storage/emulated/0/backups/apps/MD配色参考_1.1.4.apk'
app.startActivity({
  data: "file://" + path,
  type: "application/vnd.android.package-archive",
  action: "VIEW",
  flags: ["grant_read_uri_permission", "grant_write_uri_permission"]
})
