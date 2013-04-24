function Man(id, x, y, width, height, speed,hori_speed) {
	this._width = width;
	this._height = height;
	this._manDom = document.getElementById(id);
	this._speed = speed || 10;
	this._hori_speed=hori_speed || 2;
	this._isalive = true;
	this._man_status = "dropping_0";
	this._x = x;
	this._y = y;

	window.addEvent(document, "keydown", this.keyboard_check());
}
Man.prototype = (function() {
	//Man的内部函数
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		_keyboard_check: function(e) {
			/*
            //2013-04-10 basilwang we can control direction only when stop
            if (!man_stop_status) return;
            */
			if (!e) e = window.event;
			var code= e.keyCode;
			var direction;
			switch (code) {
				case 37:
					direction = -1;
					//man_status = "left_1";
					console.log("you pressed left arrow.");
					break;
				case 39:
					direction = 1;
					//man_status = "right_1";
					console.log("you pressed right arrow.");
					break;
			}
            this._x+= this._hori_speed * direction;
		},
		keyboard_check:function(){
                        var self=this;
	                    return function()
	                    {
	                    	 self._keyboard_check.call(self);
	                    }
	          },
		collapse: function(brick) {
			var absX = Math.abs(this.getCenterX() - brick.getCenterX());
			var absY = Math.abs(this.getCenterY() - brick.getCenterY());
			var compareX = parseInt(this._width / 2) + parseInt(brick.getWidth() / 2);
			var compareY = parseInt(this._height / 2) + parseInt(brick.getHeight() / 2);
			console.log("absX is " + absX + " absY is " + absY);
			console.log("absX < compareX(" + compareX + ") is " + (absX < compareX));
			console.log("absY < compareY(" + compareY + ") is " + (absY < compareY));
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
		getWidth: function() {
			return this._width;
		},
		getIsalive: function() {
			return this._isalive;
		},
		setIsalive: function(isalive) {
			this._isalive = isalive;
		},
		setSpeed: function(speed) {
			this._speed = speed;
		},
		getCenterX: function() {
			return this._x + parseInt(this._width / 2);
		},
		getCenterY: function() {
			return this._y + parseInt(this._height / 2);
		}



	}
})();