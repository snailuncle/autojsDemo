importClass(android.content.pm.PackageManager)
installed = context.getPackageManager().getPackageInfo(context.getPackag‌​eName(), 0).firstInstallTime
log(installed)
