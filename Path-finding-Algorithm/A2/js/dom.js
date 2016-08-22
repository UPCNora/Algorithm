(function(){
	// 创建 li
	var DomControl  = {
		domP : document.querySelector('#mainbody ul'),
		liNum : 300,	
		listNum : 30,
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
		cur : null,		// 当前对象
		start : null,	// 起点对象
		end : null,		// 终点对象

		// 创建 allLiArr 数组内部数据
		allLiArrBuilds : function(){
			var arrAllNum = DomControl.liNum,
				domP = document.querySelector('#mainbody ul'),
				arrListNum =  DomControl.listNum;
			for(var i = 0;i < arrListNum;i++){
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
			this.end = this.allLiArr[domA];
			for(var i = 0;i < domWallArr.length;i++){
				this.wallArr.push(this.allLiArr[domWallArr[i]]);
			};
		}

		// 寻找四周的对象
		findObj : function(dome){
			var arrAllNum = DomControl.liNum,
				domP = document.querySelector('#mainbody ul'),
				arrListNum =  DomControl.listNum;
			var position = dome.position;

			// 获取可能的四周的index值
			var num1 = position[0] * arrAllNum + position[1] - 1,
				num2 = position[0] * arrAllNum + position[1] + 1,
				num3 = (position[0] - 1) * arrAllNum + position[1],
				num4 = (position[0] + 1) * arrAllNum + position[1];	

			var aroundArr = [];  // 储存有效的值

			// 取消边缘等特殊情况
			if(this.allLiArr[num1].position[0] === position[0]){
				aroundArr.push(this.allLiArr[num1]);
			};
			if(this.allLiArr[num2].position[0] === position[0]){
				aroundArr.push(this.allLiArr[num2]);
			};
			if(this.allLiArr[num3].position[1] === position[1]){
				aroundArr.push(this.allLiArr[num1]);
			};
			if(this.allLiArr[num4].position[1] === position[1]){
				aroundArr.push(this.allLiArr[num2]);
			};

			return aroundArr;
		},

		// 创建 A* 算法循环
		doAlgorthm = function(){
			
			this.openArr.push(this.start);

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
							item.G = that.
						}
					}
				})
				
			}while()
		},

		// 找回路径
		findWay : function(){

		}

		// 启动算法 决定顺序呢
		init : function(domA,domB,domWallArr){
			/* domA 和 domB 接受 数字 
			*  domWallArr 接受包含数个数字的数组
			*/

			this.allLiArrBuilds();
			this.setPoint(domA,domB,domWallArr);
			this.doAlgorthm();
		}
	}
	Algorithm.allLiArrBuilds();
})();
