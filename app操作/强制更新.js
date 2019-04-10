
/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  强制更新app
 */
'ui';
var dialog = new android.app.AlertDialog.Builder(activity).setTitle("Tips").setMessage("请更新最新版本!")
  .setNeutralButton("退出", new android.content.DialogInterface
    .OnClickListener({
      onClick: (dialog, which) => {
        exit()
      }
    })
  ).setNegativeButton("更新", new android.content.DialogInterface
    .OnClickListener({
      onClick: (dialog, which) => {
        toastLog('在这里更新app')
      }
    })
  ).show();
dialog.setCanceledOnTouchOutside(false); //点击dialog其它地方dismiss无效
dialog.setCancelable(false); //点击返回键无效
