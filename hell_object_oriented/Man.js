function Man(id, x, y, width, height, speed) {
	this._width = width;
	this._height = height;
	this._manDom = document.getElementById(id);
	this._speed = speed || 10;
	this._isalive = true;
	this._man_status = "dropping_0";
	this._x = x;
	this._y = y;
	this._center_x = x + parseInt(this._width / 2);
	this._center_y = y + parseInt(this._height / 2);
}
Man.prototype = (function() {
	//Man的内部函数
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		collapse: function(brick) {
			var absX = Math.abs(this._center_x - brick.getCenterX());
			var absY = Math.abs(this._center_y - brick.getCenterY());
			var compareX = parseInt(this._width / 2) + parseInt(brick.getWidth() / 2);
			var compareY = parseInt(this._height / 2) + parseInt(brick.getHeight() / 2);
			if (absX < compareX && absY < compareY) return true;
			else return false;
		},
		move: function() {

			if (!this._isalive) return;
            this._y += this._speed;
		},
		draw: function() {
			this._manDom.style.width = this._width + "px";
			this._manDom.style.height = this._height + "px";
			this._manDom.style.top = this._y + "px";
			this._manDom.style.left = this._x + "px";
		},
		getY: function() {
			return this._y;
		},
		getHeight: function() {
			return this._height;
		},
        getWidth:function(){
            return this._width;
        },
		getIsalive: function() {
			return this._isalive;
		},
		setIsalive: function(isalive) {
			this._isalive = isalive;
		},
        setSpeed:function(speed){
            this._speed=speed;
        }



	}
})();