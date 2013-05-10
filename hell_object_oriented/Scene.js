function Scene(id, width, height, man) {
	this._width = width;
	this._height = height;
	this._sceneDom = document.getElementById(id);
	this._man = man;
	this._bricks = [];
	this._needGenerateBricks = true;
    // 2013-05-07 徐灿 增加分数
	this._score = 0;
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
		_heartbeat: function() {
			//2013-04-24 basilwang 检测小人是否活着
			//2013-05-06 梁茂秀  增加小人碰到背景上方时死亡
			if (_is_larger_than(this._man.getY(), this._height - this._man.getHeight())
                 || _is_larger_than(0,this._man.getY()-this._man.getHeight())
				) {
				this._man.setIsalive(false);
				this._gallery_collect();
			} else {
                var is_collpased = false;
                this.addScore();
				for (var i = 0; i < this._bricks.length; i++) {
					var _brick=this._bricks[i];
					if ((this._man.getBottomY()<_brick.getBottomY()
					      && this._man.getBottomY() > _brick.getY()
                        )
						&&this._man.collapse(_brick)) {
                        is_collpased = true;
                        //2013-04-26 徐灿 小人碰到类型为1的砖块死亡
                       switch(_brick.getType()){
                        	case 0:;
							case 1:;
							case 2:;
							case 3:;
							case 4:
								this._man.setSpeed(_brick.getSpeed());
								
								break;
							case 5:;
							case 6:
							    //2013-05-03 basilwang 必须返回防止执行setTimeout
								this._man.setIsalive(false);
								this._gallery_collect();
								return;
								break;
							case 7:;
							case 8:
								this._man.setSpeed(_brick.getSpeed());
								
								break;
							case 9:;
							case 10:
								this._man.setSpeed(_brick.getSpeed());
								
								break;
						}

					}
					//2013-04-24 basilwang 检测砖块是否从底层重新出现
					////2013-05-09 徐灿 防止砖块移出画布
					if (_is_larger_than(-_brick.getHeight(), _brick.getY()-this._man.getHeight())) {
						//2013-04-24 basilwang 此时不再需要生成砖块了
						//this._needGenerateBricks = false;
						// 2013-05-07 徐灿 更改砖块产生算法 去掉循环造成的bug
						_brick.setIsalive(false);
						this._bricks.splice(i,1);
						//2013-05-06 梁茂秀 防止砖块超出屏幕
						/*var random_left = Math.random() * (this._width-_brick.getWidth());
						random_left = parseInt(random_left);
						_brick.setX(random_left);
						_brick.setY(this._height);
						_brick.setIsalive(true);
						*/
					}

					_brick.move();
					_brick.draw();
				}
                if (!is_collpased) {
                    this._man.resetSpeed();
                }
				this._man.move();
				this._man.draw();
				setTimeout(this.heartbeat(), 60);
			}

		},
		_gallery_collect:function()
		{
            //2013-04-24 basilwang 此时不再需要生成砖块了
		    this._needGenerateBricks = false;
		    clearTimeout(this.heartbeat);
		    alert("你挂了！！");

		},
		heartbeat: function() {
			var self = this;
			return function() {
				self._heartbeat.call(self);
			}
		},
		_generate_bricks: function() {
			//2013-04-24 basilwang 生成砖块，当有一块转移除屏幕时，我们停止生成砖块，该移除的砖块会从底部重新出现
			if (this._needGenerateBricks) {

				// 2013-05-07 徐灿 去掉方块画布外产生bug 调整方块产生位置
				var random_type = Math.random() * 10;
				random_type = parseInt(random_type);
				var brick = new Brick(0, this._height, random_type);
				//2013-05-06 梁茂秀 防止砖块超出屏幕
				var random_left = Math.random() * (this._width-brick.getWidth());
				random_left = parseInt(random_left);
                brick.setX(random_left);
				brick.setSpeed(-5);
				//2013-05-07 徐灿，应用数组方法
				this._bricks.push(brick);
				//this._bricks[this._bricks.length] = brick;
				this._sceneDom.appendChild(brick.getBrickDom());
				setTimeout(this.generate_bricks(), 1000);

		} else {
			clearTimeout(this.generate_bricks);
		}

	},
	//2013-05-07 徐灿 增加积分函数
	addScore : function(){
		this._score += 1;
		document.getElementById('score').innerHTML = Math.floor(this._score/66);
		if(this._score/66>=100){
			document.getElementById('score').innerHTML = "Hello,Man!"+Math.floor(this._score/66);
		}
		
	},
	generate_bricks: function() {
		var self = this;
		return function() {
			self._generate_bricks.call(self);
		}
	},
	start: function() {
		document.getElementById('startBtn').style.display = 'none';
		document.getElementById('bat').style.display = 'none';
		document.getElementById('man').style.display = 'block';
		document.getElementById('wall').style.display = 'block';
		document.getElementById('thorn').style.display = 'block';

		this.draw();
		(this.generate_bricks())();
		(this.heartbeat())();

	}

}

})();