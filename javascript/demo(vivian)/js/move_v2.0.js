function getStyle(obj,attr){
	if (obj.currentStyle) {
		//针对 IE
		return obj.currentStyle[attr];
	}else{
		//针对 Firefox
		return getComputedStyle(obj,false)[attr];
	}
}
// function startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)
function startMove(obj, json, fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//假设 所有运动已达到目标值
		for(var attr in json){
			var iTarget = json[attr];

			//1.取当前的值
			var icur = 0;
			if (attr == 'opacity') {
				icur =  Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{
				icur = parseInt(getStyle(obj, attr));
			}
			// console.log(icur);
			//2.算速度
			var speed = (iTarget-icur)/8;
			speed = speed >0 ?Math.ceil(speed):Math.floor(speed);

			//3.检测停止
			if(icur != iTarget){
				flag = false;
			}
			if (attr == 'opacity') {
				obj.style.filter = 'alpha:(opacity:'+icur+speed+')';
				obj.style.opacity = (icur + speed)/100;
			}else{
				obj.style[attr] = icur + speed + 'px';
			}
		}
		//console.log(flag);
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	},30);
}