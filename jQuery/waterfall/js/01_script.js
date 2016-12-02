
window.onload =  function (argument) {
	var parent = 'main';
	var box = 'box';

	waterfall(parent, box);//瀑布流定位
	var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
	window.onscroll = function(){
		if (checkScrollSlide(parent,box)) {
			var oParent=document.getElementById(parent);
			//将数据块 渲染到当前页面的 尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);

				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);

				var oImg = document.createElement('img');
				oImg.src = 'images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			};

			waterfall(parent, box);//瀑布流定位
		};
	}
}

function waterfall(parent, box){
	//将main 下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent, box);
	// console.log(oBoxs.length);
	
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW = oBoxs[0].offsetWidth;
	// console.log(oBoxW);
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	// console.log(cols);
	
	//设置main的宽度 cssText 以字符串形式设置样式
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto;';
	
	var hArr = [];//存放每一列高度的数组
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);//取出最小值在数组中的下标索引值

			//给当前图片 绝对定位
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			// oBoxs[i].style.left=oBoxW*index+'px';//当前 最小盒子的 前面几个盒子的总宽度
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';//当前 最小盒子的 left值

			hArr[index]+=oBoxs[i].offsetHeight;//改变当前盒子最小值的高度
		}
	};
	console.log(hArr);
}

/**
 * [根据class 获取元素]
 * @param  {[type]} parent  [description]
 * @param  {[type]} clsName [description]
 * @return {[type]}         [description]
 */
function getByClass (parent, clsName) {
	var boxArr = new Array(),//用来存储获取到的所有class为box的元素
		oElements = parent.getElementsByTagName('*');//获取所有子元素

	for (var i = 0, l = oElements.length; i < l; i++) {
		var oElement = oElements[i];
		if (oElement.className == clsName) {
			boxArr.push(oElement);
		};
	};

	return boxArr;
}

/**
 * [取出 数组中 最小值的 下标索引值]
 * @param  {[type]} arr [description]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function getMinhIndex(arr,val){
	for(var i in arr){
		if (arr[i]==val) {
			return i;
		};
	}
}

/**
 * [检测是否具备了滚动条 加载数据的 条件]
 * @param  {[type]} parent  [description]
 * @param  {[type]} clsName [description]
 * @return {[type]}         [description]
 */
function checkScrollSlide(parent, box){
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	var lastBox = oBoxs[oBoxs.length-1];
	var lastBoxH = lastBox.offsetTop+Math.floor(lastBox.offsetHeight/2);
	//混杂/标准模式下
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

	return (lastBoxH < scrollTop + clientHeight)?true:false;
}