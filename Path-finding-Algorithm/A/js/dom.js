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
			}
		},






		init : function(){
			this.creatLi();
		}
	}
	DomControl.init();
})();
