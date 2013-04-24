function Brick(x,y,width,height,speed,type)
{
  this._width=width;
  this._height=height;
  this._type=type||"normal" ;
  switch(type)
  {
    case "normal":
        this._brickDom=document.getElementById("normal_brick");
        break;
    default:
        this._brickDom=document.getElementById("normal_brick");
  }


  this._speed=speed;
  this._isalive=true;

  this._x=x;
  this._y=y;
  this._center_x=x+parseInt(width/2);
  this._center_y=y+parseInt(height/2);
}
Brick.prototype=(function()
{
	//Man的内部函数
    var _move=function(){


    };
	//王华杰 不能在此处应用this
	//alert(this.title+" in closure");
	return {
		move:function()
		{
           var int_top = parseInt(this._brickDom.style.top);
			int_top = isNaN(int_top) ? 0 : parseInt(int_top);
			int_top += this._speed;
			//console.log("object_to_move " + this.manDom.id + "'s offsetParent is " + this.manDom.offsetParent);
			//console.log("object_to_move " + this.manDom.id + "'s top is " + this.manDom.style.top);
			this._y = int_top;
		},
		draw:function()
		{
			this._brickDom.style.width = this._width + "px";
			this._brickDom.style.height = this._height + "px";
			this._brickDom.style.top = this._y + "px";
			this._brickDom.style.left = this._x + "px";
		}
	}
})();