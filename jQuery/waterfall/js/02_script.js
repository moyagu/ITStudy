
$(window).on('load',function(){
	waterfall();
	var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
	
	$(window).on('scroll',function(){
		if (checkScrollSlide) {
			$.each(dataInt.data,function(key,value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				//原生js对象 也可以 转换为jQuery对象
				// var oImg = $('<img>').attr('src','images/'+$(value).attr('src'));
				var oImg = $('<img>').attr('src','images/'+value.src);
				oPic.append($(oImg));
			});
			waterfall();
		};
	});
});

function waterfall(){
	var $box = $('#main>div');
	// var w = $box.eq(0).width();// width() 不包括 padding和border
	var w = $box.eq(0).outerWidth();// 包括 padd和border
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');

	var hArr = [];
	$box.each(function(index, el) {
		var h = $box.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH, hArr);
			$(el).css({
				'position': 'absolute',
				'top': minH+'px',
				'left':minHIndex*w+'px'
			});
			hArr[minHIndex]+=$box.eq(index).outerHeight();
		}	
	});
	console.log(hArr);
}


/**
 * [检测是否具备了滚动条 加载数据的 条件]
 * @return {[type]}         [description]
 */
function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}