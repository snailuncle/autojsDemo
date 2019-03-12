function minEditDist(sm,sn){
    var m=sm.length+1
    var n=sn.length+1
    var matrix = new Array();
    for ( var i = 0; i < m; i++) {
        matrix[i] = new Array();
        for ( var j = 0; j < n; j++) {
            matrix[i][j] = 0;
        }
    }
    matrix[0][0]=0
    for(let i=1;i<m;i++){
        matrix[i][0] = matrix[i-1][0] + 1
    }
    for(let j=1;j<n;j++){
        matrix[0][j] = matrix[0][j-1]+1
    }
    cost = 0
    for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
            if(sm[i-1]==sn[j-1]){
                cost = 0
            }
            else{
                cost = 1
            }
            matrix[i][j]=Math.min(matrix[i-1][j]+1,matrix[i][j-1]+1,matrix[i-1][j-1]+cost)
        }
    }
    return matrix[m-1][n-1]
}
mindist=minEditDist("126","456")
print(mindist)
