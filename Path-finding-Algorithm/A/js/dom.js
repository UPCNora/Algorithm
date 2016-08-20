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
				this.domLi[i].position.push(i + 1,parseInt(i / 14 + 1),(i % 14 + 1));
				/* 
					thi
				 */
			}
		},






		init : function(){
			this.creatLi();
		}
	}
	DomControl.init();
})();
