function Scene(id, width, height, man) {
	this._width = width;
	this._height = height;
	this._sceneDom = document.getElementById(id);
	this._man = man;
	this._bricks = [];

}
Scene.prototype = (function() {
	var _generate_bricks = function() {

	};
	var _is_larger_than=function(a,b){
        return a>b;
	};
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		draw: function() {
			this._sceneDom.style.width = this._width + "px";
			this._sceneDom.style.height = this._height + "px";
		},
		heartbeat: function() {
            
            if(_is_larger_than(this._man.getY(),this._height-this._man.getHeight()))
            {
            	this.man.setIsalive(false);
            }         

			if (this._man.getIsalive()) {
				this._man.move();
				this._man.draw();
				/*
           for(var i=0;i<bricks.length;i++)
           {
           	 this.bricks[i].move();
           	 this.bricks[i].draw();
           }
           */
				setTimeout(this.heartbeat.bind(this), 60);
			}
			else
			{
				clearTimeout(this.heartbeat);
			}
		},
		start: function() {
			this.draw();
			this.bricks = _generate_bricks();
			this.heartbeat();

		}
	}
})();