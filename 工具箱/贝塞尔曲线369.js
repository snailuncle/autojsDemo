"auto";


/*
 cp在此是四個元素的陣列:
 cp[0]為起始點，或上圖中的P0
 cp[1]為第一個控制點，或上圖中的P1
 cp[2]為第二個控制點，或上圖中的P2
 cp[3]為結束點，或上圖中的P3
 t為參數值，0 <= t <= 1
*/
function PointOnCubicBezier( cp, t )
{
    var   ax, bx, cx;
    var   ay, by, cy;
    var   tSquared, tCubed;
    var	  result ,result_x,result_y;

    /*計算多項式係數*/

    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    /*計算位於參數值t的曲線點*/

    tSquared = t * t;
    tCubed = tSquared * t;
    result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    result={x:result_x,y:result_y};
    return result;
}

/*
 ComputeBezier以控制點cp所產生的曲線點，填入Point2D結構的陣列。
 呼叫者必須分配足夠的記憶體以供輸出結果，其為<sizeof(Point2D) numberOfPoints>
*/

function ComputeBezier( cp, numberOfPoints, curve )
{
    var   dt;
    var   i;

    dt = 1.0 / ( numberOfPoints - 1 );

    for( i = 0; i < numberOfPoints; i++)
        curve[i] = PointOnCubicBezier( cp, i*dt );

}


var cp=[
    {x:194, y:405},  {x:735, y:876},  {x:537, y:1383},  {x:846, y:1666}
];
var numberOfPoints=100;
var curve=[];

ComputeBezier( cp, numberOfPoints, curve );//列表  对象

var i=0;
var ra = new RootAutomator();
//让"手指1"点击位置(100, 100)
ra.touchDown(194, 405);
//让"手指2"点击位置(200, 200);


setInterval(function (){
    var j = (i<100)?i:(199-i);
    xx=curve[j].x
    yy=Math.abs(100-curve[j].y)
    log(xx,yy)
    ra.touchMove(xx,yy);
    if(++i==200)i=0;
}, 10);
