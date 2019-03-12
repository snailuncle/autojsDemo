 ui.run(function() {
     importPackage(org.autojs.autojs.ui.explorer);
     importPackage(org.autojs.autojs.model.explorer);
     var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
     explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard/脚本"));
     explorerView.setDirectorySpanSize(2);
     var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
         .title("运行脚本")
         .customView(explorerView, false)
         .positiveText("取消")
         .build();
     explorerView.setOnItemOperatedListener(function(file) {
         dialog.dismiss();
     });
     explorerView.setOnItemClickListener(function(view, item) {
         org.autojs.autojs.model.script.Scripts.run(item.toScriptFile())
     });
     com.stardust.app.DialogUtils.showDialog(dialog);
 });