(function(){
var DomControl  = {
		domP : document.querySelector('#mainbody ul'),
		
		creatLi : function(){
			// 创建140个li 并使其具有表示位置的数组
			for(var i=0;i<140;i++){
				this.domP.innerHTML += "<li></li>";
			}
			this.domLi = document.querySelectorAll('#mainbody ul li');
			for(var i=0;i<this.domLi.length;i++){
				this.domLi[i].position = [];
				this.domLi[i].position.push(i,parseInt(i / 14),(i % 14));
				this.domLi[i].innerHTML = "" +  this.domLi[i].position[0];
				this.domLi[i].parentDom = null;
			}
		},
		init : function(){
			this.creatLi();
		}
}
DomControl.init();
var algorithm = {
	openArr : [],
	closeArr : [],
	path : [],

	// 设置初始点 和 终点
	setDom : function(domB,domC,domD){
		this.begin = domB;
		this.over = domC;
		this.wall = domD; 
		this.docLiArr = document.querySelectorAll('#mainbody ul li');
		this.openArr.push(domB);
	},
	// 获取周围点 计算F H G
	choseAround : function(){
		var numArr1 = this.cur.position,
			numArr2 = this.over.position,
			aroundArr = [],
			that = this;

		var domLeft = this.docLiArr[numArr1[1]*14 + numArr1[2]-1],
			domRight = this.docLiArr[numArr1[1]*14 + numArr1[2]+1],
			domTop = this.docLiArr[(numArr1[1]-1)*14 + numArr1[2]],
			domBottom = this.docLiArr[(numArr1[1]+1)*14 + numArr1[2]];

		if(!(domLeft && domLeft.position[1] === numArr1[1] )){
			domLeft = null;
		}
		if(!(domRight && domRight.position[1] === numArr1[1] )){
			domRight = null;
		}
		if(!(domTop && domTop.position[2] === numArr1[2] )){
			domTop = null;
		}
		if(!(domBottom && domBottom.position[2] === numArr1[2] )){
			domBottom = null;
		}
		aroundArr.push(domLeft,domRight,domTop,domBottom);
		aroundArr = aroundArr.filter(function(item){
		
			return item !== null;
		});
		// console.log(aroundArr);
		this.aroundArr = aroundArr;
	},
	// 寻路算法
	findWay : function(){
		var that = this;
		do{
			//寻找开启列表中F值最低的格子, 我们称它为当前格. 
			this.openArr.sort(function(value1,value2){
				if(value1.F < value2.F){
					return -1;
				}else if(value2.F < value1.F){
					return 1;
				}else{
					return 0;
				}
			});
			// 把它切换到关闭列表. 
			this.closeArr.push(this.openArr[0]);
			this.cur = this.openArr[0];
			console.log(this.cur);
			this.openArr.shift();
			// 对当前格相邻的4格中的每一个 
			this.choseAround();
			this.aroundArr.forEach(function(item){
				// 它不可通过 || 已经在 "关闭列表" 中
				var offSet = that.closeArr.every(function(item2){
					return item2.position[0] !== item.position[0];
				}) && that.wall.every(function(item4){
					return item4.position[0] !== item.position[0];
				});
				if(offSet){
					var numArr1 = that.cur.position;
						numArr2 = that.over.position;
			
					// 它不在开启列表中 把它添加进 "开启列表‘
					if(that.openArr.every(function(item3){
						return item3.position[0] !== item.position[0];
					})){
						// 计算这些方格的 G, H 和 F 值各是多少
						if(item.position[1] - numArr1[1] > 0){
							item.G = item.position[1] - numArr1[1];
						}else{
							item.G = numArr1[1] - item.position[1];
						}
						if(item.position[2] - numArr1[2] > 0){
							item.G += item.position[2] - numArr1[2];
						}else{
							item.G += numArr1[2] - item.position[2];
						}
						if(item.position[1] - numArr2[1] > 0){
							item.H = item.position[1] - numArr2[1];
						}else{
							item.H = numArr2[1] - item.position[1];
						}
						if(item.position[2] - numArr2[2] > 0){
							item.H += item.position[2] - numArr2[2];
						}else{
							item.H += numArr2[2] - item.position[2];
						}

						item.F = item.H + item.G;
						// 设置它们的 "父方格" 为 当前格
						// 输出路径
						item.parentDom = that.cur;
						// 将它们加入 "开启列表"
						that.openArr.push(item);
					}else{
						// 计算新G值
						item.G1 = that.cur.G;
						if(item.position[2] - that.cur.position[2] > 0){
							item.G1 += item.position[2] - that.cur.position[2];
						}else{
								item.G1 += that.cur.position[2] - item.position[2];
						}
						if(item.position[1] - that.cur.position[1] > 0){
							item.G1 += item.position[1] - that.cur.position[1];
						}else{
							item.G1 += that.cur.position[1] - item.position[1];
						}
						// 如果某个相邻方格已经在 "开启列表" 里
						if(item.G1 < item.G){
							alert(1);
							item.G = item.G1;
							item.F = item.G + item.H;
							item.G1 = null;
							item.parentDom = that.cur;
						}
					}
				}
			});
		}while(this.openArr.every(function(item){return item.position[0]!== this.over.position[0]}.bind(this)));
	},

	// 找回路径
	getPath : function(){
		var newDom = this.over;
		this.path.push(newDom);
		do{
			this.path.push(newDom.parentDom);
			newDom = newDom.parentDom;
		}while(newDom !== this.begin);
		return this.path;
	},

	// init
	init : function(dom1,dom2,domD){
		this.setDom(dom1,dom2,domD);
		this.findWay();
	}
}

var handler = {
		domX : document.querySelectorAll('#mainbody ul li'),
		domD : [],
		offset : 0,
		btnArr : document.querySelectorAll('button'),

		onhandler : function(){
			this.DomB = this.domX[0];
			this.DomC = this.domX[139];
			var that = this;
			var handler = function(){
				switch (that.offset){
					case 0 : 
						that.DomB = this;
						that.showDom();
						break;
					case 1 : 
						that.DomC = this;
						that.showDom();
						break;
					case 2 :
						if(	that.domD.every(function(item){
							return this !== item;
						}.bind(this))){
							that.domD.push(this);
						}else{
							that.domD = that.domD.filter(function(item){
									return item !== this;
							}.bind(this));
						}
						that.showDom();
						break;
				}
			};
			for(var i = 0;i < this.domX.length;i++){
				this.domX[i].addEventListener('click',handler);
			}

			this.btnArr[0].addEventListener('click',function(){this.offset = 0;}.bind(this));
			this.btnArr[1].addEventListener('click',function(){this.offset = 1;}.bind(this));
			this.btnArr[2].addEventListener('click',function(){this.offset = 2;}.bind(this));
			this.btnArr[3].addEventListener('click',function(){
				this.startAlgorithm();
				for(var i = 0;i < this.domX.length;i++){
					this.domX[i].removeEventListener('click',handler);
				}
			}.bind(this));

		},
		showDom : function(){
			if(this.DomB){
				this.DomB.style.backgroundColor = 'green';
			}
			if(this.DomC){
				this.DomC.style.backgroundColor = 'red';
			}
			if(this.domD.length > 0){
				this.domD.forEach(function(item){
					item.style.backgroundColor = "black";
				});
			}
		},
		startAlgorithm : function(){
			algorithm.init(this.DomB,this.DomC,this.domD);
			algorithm.getPath().forEach(function(item){
				item.style.backgroundColor = "blue";
			});		
		},
};
handler.onhandler();
})();
