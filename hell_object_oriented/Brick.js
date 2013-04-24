function Brick(x, y, type) {
	this._type = type || "normal";
	this._brickDom = document.createElement("img");
	this._brickDom.style.zIndex=100;
	this._brickDom.style.position="absolute";
	switch (type) {
		case "normal":
			this._brickDom.src="normal_brick.png";
		    this._width = 100;
	        this._height = 10;
			break;
		default:
			this._brickDom.src="normal_brick.png";
		    this._width = 100;
	        this._height = 10;
	}

	this._speed = 0;
	this._isalive = true;

	this._x = x;
	this._y = y;
	this._center_x = x + parseInt(this._width / 2);
	this._center_y = y + parseInt(this._height / 2);
}
Brick.prototype = (function() {
	//Man的内部函数
	var _move = function() {


	};
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		move: function() {

				this._y  -= this._speed ;



		},
		draw: function() {
			this._brickDom.style.width = this._width + "px";
			this._brickDom.style.height = this._height + "px";
			this._brickDom.style.top = this._y + "px";
			this._brickDom.style.left = this._x + "px";
		},
		getY: function() {
			return this._y;
		},
		getHeight: function() {
			return this._height;
		},
		getIsalive: function() {
			return this._isalive;
		},
		setIsalive: function(isalive) {
			this._isalive = isalive;
		},
		setX:function(x){
        	this._x=x;
        },
        setY:function(y){
        	this._y=y;
        },
        setSpeed:function(speed)
        {
        	this._speed=speed;
        },
        getBrickDom:function()
        {
        	return this._brickDom;
        }

	}
})();