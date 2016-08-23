(function(){
	// 创建 li
	var DomControl  = {
		domP : document.querySelector('#mainbody ul'),
		liNum : 300,	
		listNum : 20,
		creatLi : function(){
			// 创建140个li
			for(var i = 0;i < this.liNum;i++){
				this.domP.innerHTML += "<li></li>";
			}
			this.domLi = document.querySelectorAll('#mainbody ul li');
		}
	}
	DomControl.creatLi();

	// A* 寻路算法
	var Algorithm = {
		allLiArr : [], 	// 储存全部 信息 的数组
		openArr : [],	// 算法的 open 数组
		closeArr : [],	// 算法的 close 数组
		wallArr : [],	// 墙
		pathArr : [],	// 储存路径
		cur : null,		// 当前对象
		start : null,	// 起点对象
		end : null,		// 终点对象

		// 创建 allLiArr 数组内部数据
		allLiArrBuilds : function(){
			var arrAllNum = DomControl.liNum,
				domP = document.querySelector('#mainbody ul li'),
				arrListNum =  DomControl.listNum;
			for(var i = 0;i < arrAllNum;i++){
				var newObj  = {};
				newObj.index = i;		// 该对象序列号
				newObj.position = [parseInt(i/arrListNum),i%arrListNum]; // 该对象位置 以二维数组储存
				newObj.dom = domP[i];
				newObj.parentLi = null; 	// 该对象在A*算法的父节点 用以找回路径
				this.allLiArr.push(newObj); 	// 填充入数组 allLiArr
				newObj = null;				// 回收变量newObj
			}
		},

		// 获取起止点以及墙
		setPoint : function(domA,domB,domWallArr){
			this.start = this.allLiArr[domA];
			this.end = this.allLiArr[domB];
			for(var i = 0;i < domWallArr.length;i++){
				this.wallArr.push(this.allLiArr[domWallArr[i]]);
			};
		},

		// 寻找四周的对象
		findObj : function(dome){
			var arrAllNum = DomControl.liNum,
				domP = document.querySelector('#mainbody ul li'),
				arrListNum =  DomControl.listNum;
			var position = dome.position;
			console.log(dome);
			// 获取可能的四周的index值
			var num1 = position[0] * arrListNum + position[1] - 1,
				num2 = position[0] * arrListNum + position[1] + 1,
				num4 = (position[0] + 1) * arrListNum + position[1];	

				if(position[0] - 1 > 0){
					var	num3 = (position[0] - 1) * arrListNum + position[1];
				};

			var aroundArr = [];  // 储存有效的值

			// 取消边缘等特殊情况
			if(num1 > 0){
				if(this.allLiArr[num1].position[0] === position[0]){
					aroundArr.push(this.allLiArr[num1]);
				};
			}
			if(num2 < DomControl.liNum-1){
				if(this.allLiArr[num2].position[0] === position[0]){
					aroundArr.push(this.allLiArr[num2]);
				}
			};
			if(num3 > 0 ){
				if(this.allLiArr[num3].position[1] === position[1]){
					aroundArr.push(this.allLiArr[num3]);
				}
			};
			if(num4 < DomControl.liNum-1){
				if(this.allLiArr[num4].position[1] === position[1]){
					aroundArr.push(this.allLiArr[num4]);
				}
			};

			return aroundArr;
		},

		// 创建 A* 算法循环
		doAlgorthm : function(){
			console.log(this.start);
			this.openArr.push(this.start);
			this.start.F = 0;
			this.start.G = 0;
			this.start.H = this.magnitude(this.start.position[0],this.end.position[0]) + this.magnitude(this.start.position[1],this.end.position[1]); 

			do{
				// openArr 排序 选择F最小的点作为当前点 this.cur
				this.openArr.sort(function(item1,item2){
					return item1.F - item2.F;
				});
				this.cur = this.openArr[0];
				// 当前点放入 closeArr , 从openArr 删除	
				this.closeArr.push(this.cur);
				this.openArr.shift();
				// 找到当前点的相邻点
				var aroundArr = this.findObj(this.cur);
				var that = this; // 储存当前指针
				// 对于每一个相邻点进行判断
				aroundArr.forEach(function(item){
					var offSet = ( that.closeArr.every(function(item1){
						return item !== item1;
					}) && that.wallArr.every(function(item2){
						return item !== item2;
					}) );	
					// 排除周围点是墙或位于closeArr中
					if(offSet){
						// 如果不位于openArr中 加入,设置父节点并计算FGH值
						if(that.openArr.every(function(item3){
							return item3 !== item;
						})){
							item.G = this.magnitude(item.position[0],that.start.position[0]) + this.magnitude(item.position[1],that.start.position[1]);
							item.H = this.magnitude(item.position[0],that.end.position[0]) + this.magnitude(item.position[1],that.end.position[1]);

							item.F = item.G + item.H;
							item.parentLi = that.cur;
							this.openArr.push(item);
							console.log(this.end);
						}else{
							item.G1 = this.magnitude(item.position[0],that.cur.position[0]) + this.magnitude(item.position[1],that.cur.position[1]) + that.cur.G;
							if(item.G1 < item.G){
								item.G = item.G1;
								item.F = item.G + item.H;
								item.parentLi = that.cur;
							}
						}
					}
				}.bind(this));		
			}while(this.openArr.every(function(item){
				return item !== this.end;
			}.bind(this)) && this.openArr.length > 0);
		},

		// 找回路径
		findWay : function(){
			// 无法到达指定路径的情况
			if(this.openArr.length === 0 ){
				alert('没有符合条件的路径');
			}else{
				var wayPath = this.end;
				do{
					console.log(1); // 测试用防止死循环
					this.pathArr.push(wayPath.index);
					wayPath = wayPath.parentLi;
				}while(wayPath !== this.start && this.openArr.length > 0);
				this.pathArr.push(this.start.index);
			}
		},

		// 相减并求绝对值
		magnitude : function(num1,num2){
			if(num1 - num2 > 0){
				return num1 - num2;
			}else if(num1 - num2 < 0){
				return num2 - num1;
			}else{
				return 0;
			}
		},

		// 重置
		reset : function(){
			this.allLiArr = []; 	// 储存全部 信息 的数组
			this.openArr = [];	// 算法的 open 数组
			this.closeArr = [];	// 算法的 close 数组
			this.wallArr = [];	// 墙
			this.pathArr = [];	// 储存路径
			this.cur = null;		// 当前对象
			this.start = null;	// 起点对象
			this.end = null;		// 终点对象
		},

		// 启动算法 决定顺序呢
		init : function(domA,domB,domWallArr){
			/* domA 和 domB 接受 数字 
			*  domWallArr 接受包含数个数字的数组
			*/

			this.allLiArrBuilds();
			this.setPoint(domA,domB,domWallArr);
			this.doAlgorthm();
			this.findWay();
		}
	}

	// Dom操作 及事件响应

	var HandleOn = {
		btnArr : document.querySelectorAll('.btn a'),		// 所有的 Btn
		liDom : DomControl.domLi,	// 	所有的 Li
		domA : null,	// 向算法传递的起点
		domB : null,	// 向算法传递的终点
		domWallArr : [],	// 墙数组	

		// 设置起止点，终点，或者墙
		setPoint : function(num,domIndex){
			switch(num){
				case 0 :
					this.domA = domIndex;
					var x = document.querySelectorAll('.startcss');
					var i = 0;
					for(;i < x.length; i++){
						var c = x[i].className;
					    x[i].className = c.replace('startcss', '');
					    c = null;
					}
					var c =this.liDom[domIndex].className;
       				this.liDom[domIndex].className = c + 'startcss';
					c = null;
					i = null;
					x = null;
					break;
				case 1 :
					this.domB = domIndex;
					var x = document.querySelectorAll('.endcss');
					var i = 0;
					for(;i < x.length; i++){
						var c = x[i].className;
					    x[i].className = c.replace('endcss', '');
					    c = null;
					}
					var c =this.liDom[domIndex].className;
       				this.liDom[domIndex].className = c + 'endcss';
					c = null;
					i = null;
					x = null;
					break;
				case 2 :
					var x = this.domWallArr.every(function(item){
						return item !== domIndex;
					});
					if(x){
						this.domWallArr.push(domIndex);
					}else{
						this.domWallArr = this.domWallArr.filter(function(item){
							return item !== domIndex;
						});
					};
					var c = this.liDom[domIndex].className;
					if(c !== null && c.indexOf('wallcss') !== -1){
						this.liDom[domIndex].className = c.replace('wallcss', '');
	  				}else{
						this.liDom[domIndex].className += c.replace(c, 'wallcss');
  					}
					c = null;
					x = null;
					break;
			}
		} ,

		// 开始寻找路径
		startInit : function(){
			// 判断 并向算法发送参数
			if(this.domA === null){
				alert("请设置起点");
			}else if(this.domB === null){
				alert("请设置终点");
			}else{
				Algorithm.init(this.domA,this.domB,this.domWallArr);
			}
			// alert(Algorithm.pathArr);
			// 显示路径
			var x = Algorithm.pathArr;
			var i = 0;
			for(;i < x.length;i++){
				this.liDom[Algorithm.pathArr[i]].className = 'pathcss';
			}

		},

		// 重置事件
		reset : function(){
			Algorithm.reset();
			this.offSet = 0;
			this.domA = null;
			this.domB = null;
			this.domWallArr = []; 

			var x = this.liDom;
			var i = 0;
			for(;i < x.length; i++){
				var c = x[i].className;
				if(c != null){
			        x[i].className = c.replace( c ,'');
  				}
			}
			c = null;
			i = null;
			x = null;
		},

		// 事件
		handler : function(){
			var	offSet = 0;	// 判断调用函数的开关
			var i = 0;
			for (; i < this.btnArr.length; i++) {
				this.btnArr[i].index = i;
				if(i < 3){
					this.btnArr[i].addEventListener('click',function(){
						offSet = this.index;
					});
				}else if( i === 3){
					this.btnArr[i].addEventListener('click',function(){
						this.startInit();
					}.bind(this));
				}else if( i === 4){
					this.btnArr[i].addEventListener('click',function(){
						this.reset();
					}.bind(this));
				};
			}
			i = null;
			var i = 0,
				setH = this.setPoint.bind(this);
			for (var i = 0; i < this.liDom.length; i++) {
				this.liDom[i].index = i;
				this.liDom[i].addEventListener('click',function(){
						setH(offSet,this.index);
				});
			};

		}
	}

	HandleOn.handler();
})();
