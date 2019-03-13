//1竖屏 2横屏

function getScreenDirection() {
    importPackage(android.content);
    return context.getResources().getConfiguration().orientation;
}