console.show();




log(最大公约数(12,10));
log(最大公约数(12,10,8));
log(最大公约数(12,15));
log(最大公约数(14,15,7));





function 最大公约数() {
    if (arguments.length >= 2) {
        let num = arguments[0];
        for (let i = 1; i < arguments.length; i++) {

            let m = gcd(num, arguments[i]);
            if (Math.abs(m) == 1) {
                return m;
            } else {
                num = m;
            };
        };
        return num;
    };

    function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
};

