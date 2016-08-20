var algorithm = {
	openArr : [],
	closeArr : [],
	
	// 设置初始点 和 终点
	setDom : function(domB,domC){
		this.begin = domB;
		this.begin = domC;
		
	},
	// 获取周围点 计算F H G
	choseAround : function(){
		this.cur  = document.querySelectorAll('#mainbody ul li')[14];
		var docLiArr = document.querySelectorAll('#mainbody ul li'),
			numArr = this.cur.position,
			aroundArr = [];

		var domLeft = docLiArr[numArr[1]*14 + numArr[2]-1],
			domRight = docLiArr[numArr[1]*14 + numArr[2]+1],
			domTop = docLiArr[(numArr[1]-1)*14 + numArr[2]],
			domBottom = docLiArr[(numArr[1]+1)*14 + numArr[2]];
		if(!(domLeft && domLeft.position[1] === numArr[1] )){
			domLeft = null;
		}
		if(!(domRight && domRight.position[1] === numArr[1] )){
			domRight = null;
		}
		if(!(domTop && domTop.position[2] === numArr[2] )){
			domTop = null;
		}
		if(!(domBottom && domBottom.position[2] === numArr[2] )){
			domBottom = null;
		}
		aroundArr.push(domLeft,domRight,domTop,domBottom);
		aroundArr = aroundArr.filter(function(item){
			return item !== null;
		})
		console.log(aroundArr);
	}
}

algorithm.choseAround();
