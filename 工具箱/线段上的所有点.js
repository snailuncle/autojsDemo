log(getLinePoints([0.9,1,5,5.5]));




function getLinePoints(xyAry) {
    //xyary=[x1,y1,x2,y2];
    let x1 = xyAry[0];
    let y1 = xyAry[1];
    let x2 = xyAry[2];
    let y2 = xyAry[3];
    //kx+b=y;求k,b
    let k = (y2 - y1) / (x2 - x1);
    let b = y1 - k * x1;
    //~~~~~~~~~~~~
    let x1_ = Math.floor(x1);
    let x2_ = Math.floor(x2);
    let fx = (x2_ - x1_) / Math.abs(x2_ - x1_);
    let pointsAry = new Array;
    for (let ix = x1_; ix != x2_+fx; ix += fx) {
        let iy = Math.floor(k * ix + b);
        if (pointsAry.length) {
            if (pointsAry[pointsAry.length - 2] != ix - 1 || pointsAry[pointsAry.length - 1] != iy) {
                pointsAry.push(ix - 1, iy);
            };
        };
        pointsAry.push(ix, iy);
    };
    return pointsAry;
};
