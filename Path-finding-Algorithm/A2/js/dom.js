(function(){
	// 创建 li
	var DomControl  = {
		domP : document.querySelector('#mainbody ul'),
		liNum : 300,	
		listNum : 30;
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
		allLi : [], 	// 储存全部 li信息 的数组
		openArr : [],	// 算法的 open 数组
		closeArr : [],	// 算法的 close 数组

		// 完善 allLi 数组信息
		liAll : function(){
			var arrAllNum = DomControl.liNum,
				arrListNum =  DomControl.listNum;
				for(var i = 0;i < arrListNum;i++){
					
				}
		}
	}
})();
