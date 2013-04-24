function Scene(id, width, height, man) {
	this._width = width;
	this._height = height;
	this._sceneDom = document.getElementById(id);
	this._man = man;
	this._bricks = [];
	this._needGenerateBricks=true;

}
Scene.prototype = (function() {
	var _is_larger_than = function(a, b) {
		return a > b;
	};
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		draw: function() {
			this._sceneDom.style.width = this._width + "px";
			this._sceneDom.style.height = this._height + "px";
		},
		heartbeat: function() {
			//2013-04-24 basilwang 检测小人是否活着
			if (_is_larger_than(this._man.getY(), this._height - this._man.getHeight())) {
				this._man.setIsalive(false);
				//2013-04-24 basilwang 此时不再需要生成砖块了
				this._needGenerateBricks=false;
				clearTimeout(this.heartbeat);
			} else {
				for (var i = 0; i < this._bricks.length; i++) {
					//2013-04-24 basilwang 检测砖块是否从底层重新出现
					if (_is_larger_than(-this._bricks[i].getHeight(),this._bricks[i].getY())) {
						//2013-04-24 basilwang 此时不再需要生成砖块了
						this._needGenerateBricks=false;
						this._bricks[i].setIsalive(false);
						var random_left = Math.random() * this._width;
                        random_left = parseInt(random_left);
                        this._bricks[i].setX(random_left);
                        this._bricks[i].setY(this._height);
						this._bricks[i].setIsalive(true);
					}

					this._bricks[i].move();
					this._bricks[i].draw();
				}
				this._man.move();
				this._man.draw();
				setTimeout(this.heartbeat.bind(this), 60);
			}

		},
		generate_bricks:function()
		{
            //2013-04-24 basilwang 生成砖块，当有一块转移除屏幕时，我们停止生成砖块，该移除的砖块会从底部重新出现
            if(this._needGenerateBricks)
            {

                var random_left = Math.random() * this._width;
                random_left = parseInt(random_left);

               var brick=new Brick(random_left, this._height,"normal");
               brick.setSpeed(20);
               this._bricks[this._bricks.length]=brick;
               this._sceneDom.appendChild(brick.getBrickDom());
               setTimeout(this.generate_bricks.bind(this), 1000);

            }
            else
            {
               clearTimeout(this.generate_bricks);
            }
            
		},
		start: function() {
			this.draw();
			this.generate_bricks();
			this.heartbeat();

		}

	}

})();