function Man(id, x, y, width, height, speed) {
	this._width = width;
	this._height = height;
	this._manDom = document.getElementById(id);
	this._speed = speed || 10 ;
	this._isalive = true;
	this._man_status = "dropping_0";
	this._x = x;
	this._y = y;
	//setTimeout(this.move.bind(this), 60);
}
Man.prototype = (function() {
	//Man的内部函数
	var _collpase_check = function() {


	};
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		collpase: function() {
			_collpase_check();
		},
		move: function() {
			
			if(!this._isalive)
				return ;
			var int_top = parseInt(this._manDom.style.top);
			int_top = isNaN(int_top) ? 0 : parseInt(int_top);
			int_top += this._speed;
			//console.log("object_to_move " + this.manDom.id + "'s offsetParent is " + this.manDom.offsetParent);
			//console.log("object_to_move " + this.manDom.id + "'s top is " + this.manDom.style.top);
			this._y = int_top;
		},
		draw:function() {
			this._manDom.style.width = this._width + "px";
			this._manDom.style.height = this._height + "px";
			this._manDom.style.top = this._y + "px";
			this._manDom.style.left = this._x + "px";
	    },
		getY:function(){
			return this._y;
		},
		getHeight:function(){
			return this._height;
		},
		getIsalive:function(){
			return this._isalive;
		},
		setIsalive:function(isalive){
            this._isalive=isalive;
		}



	}
})();