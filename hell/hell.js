var Scene=function(scene_id,level)
{
   this._scene=document.getElementById(scene_id);
   this.blocks=[];
   var top,height,width,left;
   var snippet;
   for(var i=0;i<30;i++)
   {
       top=Math.random()*2000;
       left=Math.random()*800;
       height=10;
       width=100;
       this.blocks[this.blocks.length]={top:top,left:left,height:height,width:width};
       snippet+='<div style="position:relative;background-color:red;border:solid 1px black;width:'+width+'px;height:'+height+'px;top:'+top+'px;left:'+left+'px"></div>'; 
   }
   this._scene.innerHTML+=snippet;

}
Scene.prototype.Scroll=function()
{
   var _scene_closure=this._scene;
   var _scroll_fn= function()
   {
   	    //if(-_scene_closure.style.top<_scene_closure.style.height)
   	    {           
   	    	        var int_top=parseInt(_scene_closure.style.top);
   	    	        int_top = isNaN(int_top)?0:parseInt(int_top);
   	    	        int_top-=10;
   	    	        _scene_closure.style.top=int_top+"px";
   	    }
        setTimeout(_scroll_fn,1000);
   }
   _scroll_fn();

}
var Mario=function(name)
{
   this.element=document.getElementById(name);
   this.element.src="mario_small.png";
   this.element.style.position="absolute";
   this.element.style.top="0px";
   this.element.style.left="300px";

}
Mario.prototype.Drop=function()
{
    var _element=this.element;
   var _drop_fn= function()
   {

        var int_top=parseInt(_element.style.top);
        int_top = isNaN(int_top)?0:parseInt(int_top);
        int_top+=40;
        _element.style.top=int_top+"px";
        setTimeout(_drop_fn,1000);
   }
   _drop_fn();
}
