/*/
作者：微信公众号逸痕
编辑日期：2021年3月27日
宣言：“求求帮我逸痕，点点公众号文章中的广告！”
注释：写在微信公众号文章！
声明：
任何人，修改代码后，只可以添加修改者。
打包入其他项目，必须在关于里面再一次明显署名作者！
以及宣言：“求求帮我逸痕，点点公众号文章中的广告！”
修改者：无
编辑日期：无
……
/*/

/*/
问题来源Q群
a > b > c > d > e >f
a为1000，f为1，bcde四个为随机数
邻数相差5以上，这个算法怎么写
/*/

toastLog(Random(1, 1000, 5, 6));

function Random(Min, Max, Span, Quantity) {
    Span++, quantity--;
    if (Max - Min - Span * Quantity - 1 < 0) {
        throw new Error("\nSorry!\nMax+Min<(Span+1)*quantity-1");
    };
    var v = [Min];
    var RANDOM = Min;
    for (i = 0; i < Quantity; i++) {
        var MEAN = (Max - RANDOM - Span * (Quantity - i)) / (Quantity - i - 1);
        RANDOM += Math.floor(Math.random() * MEAN);
        RANDOM += RANDOM - v[i] > Span - 1 ? 0 : Span - 1;
        v[i + 1] = RANDOM;
    };
    v[Quantity] = Max;
    return v;
};
