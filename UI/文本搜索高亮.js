"ui";
importClass(android.text.Html);

ui.layout(
    <vertical padding="16">
        <text textSize="40sp">大字</text>
        <text textSize="12sp">小字</text>
        <text textStyle="bold" textColor="black">加粗</text>
        <text textStyle="italic">斜体</text>
        <text textColor="#00ff00">原谅色</text>
        <text id="xxx" margin="8">Android是一种基于Linux的自由及开放源代码的操作系统，主要使用于移动设备，如智能手机和平板电脑，由Google公司和开放手机联盟领导及开发。尚未有统一中文名称，中国大陆地区较多人使用“安卓”或“安致”。Android操作系统最初由Andy Rubin开发，主要支持手机。2005年8月由Google收购注资。2007年11月，Google与84家硬件制造商、软件开发商及电信营运商组建开放手机联盟共同研发改良Android系统。</text>
        <text maxLines="1" ellipsize="end" margin="8">Android是一种基于Linux的自由及开放源代码的操作系统，主要使用于移动设备，如智能手机和平板电脑，由Google公司和开放手机联盟领导及开发。尚未有统一中文名称，中国大陆地区较多人使用“安卓”或“安致”。Android操作系统最初由Andy Rubin开发，主要支持手机。2005年8月由Google收购注资。2007年11月，Google与84家硬件制造商、软件开发商及电信营运商组建开放手机联盟共同研发改良Android系统。</text>
        <text maxLines="2" ellipsize="end" margin="8">Android是一种基于Linux的自由及开放源代码的操作系统，主要使用于移动设备，如智能手机和平板电脑，由Google公司和开放手机联盟领导及开发。尚未有统一中文名称，中国大陆地区较多人使用“安卓”或“安致”。Android操作系统最初由Andy Rubin开发，主要支持手机。2005年8月由Google收购注资。2007年11月，Google与84家硬件制造商、软件开发商及电信营运商组建开放手机联盟共同研发改良Android系统。</text>
        <text w="*" gravity="center" textSize="20sp">居中</text>
        <text autoLink="all">自动超链接网址www.baidu.com, 邮箱 123@qq.com等</text>
    </vertical>
);

importPackage(android.text);
importPackage(android.text.style);

function highlightText(text, start, length, color) {
    if (!(typeof(text) == 'object' && text.getClass().getName() == 'android.text.SpannableStringBuilder')) {
        text = new SpannableStringBuilder(text);
    }
    text.setSpan(new ForegroundColorSpan(colors.parseColor(color)), start, start + length, Spannable.SPAN_INCLUSIVE_INCLUSIVE);
    return text;
}

function highlightView(view, start, length, color) {
    view.setText(highlightText(view.text(), start, length, color));
}

function markSearch(view, keywords, color) {
    let textStr = view.text();
    let text = textStr;
    let i = -1;
    while (i < textStr.length - 1) {
        i = textStr.indexOf(keywords, i + 1);
        if (i >= 0) {
            text = highlightText(text, i, keywords.length, color);
        } else {
            break;
        }
    }
    view.setText(text);
    return text;
}

markSearch(ui.xxx, "Android", "#ffee00");
