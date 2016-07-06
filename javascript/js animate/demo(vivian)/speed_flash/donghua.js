function lis_over(obj, speed, lg, json, fn) {
    obj.timer = null;
    var sp = 10,
        flag = true;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        flag = true;
        for (var sty in json) {
            //样式值处理
            var wd = window.getComputedStyle(obj, false)[sty];
            if (sty == 'opacity') {
                wd = Math.round(parseFloat(wd)*100);
            } else {
                wd = parseInt(wd);
            }
            var speed = (json[sty]-wd)/8;
            speed = speed >0 ?Math.ceil(speed):Math.floor(speed);
            //判断结束
            console.log('sty:'+sty+';wd:'+wd+';sty:'+json[sty]+';speed:'+speed);
            if (wd != json[sty]) {
                flag = false;
                console.log(flag);
            }
            // 速度正负判断
            if (lg != 0) {
                speed = -speed;
            }
            //透明度
            if (sty == 'opacity') {
                obj.style[sty] = (wd + speed) / 100;
            } else {
                obj.style[sty] = wd + speed + "px";
            }
        }
        // console.log(flag);
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 100)
}