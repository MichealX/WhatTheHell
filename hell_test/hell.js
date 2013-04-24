
var bg, man;
var blocks = [];
//alert(bg.id);
var BRICK_NUM = 20;
var BG_HEIGHT = 2000;
var BG_WIDTH = 800;
var BRICK_HEIGHT = 10;
var BRICK_WIDTH = 100;
var MAN_HEIGHT = 70;
var MAN_WIDTH = 106;
var MAN_INITIAL_SPEED = 5;
var man_speed = MAN_INITIAL_SPEED;
var MAN_HORIZONTAL_SPEED = 5;
var bg_speed = -2;
var GRAVITY_SPEED = 10;
//2013-04-15  basilwang four states
// left  right dropping  stop
var man_status = "dropping_0";
//2013-04-15 status_sprite
var man_sprite_status={
   dropping:["dropping_0","dropping_1"],
   left:["left_0","left_1"],
   right:["right_0","right_1"],
   stop:["stop_0"]
}
var direction = 1; //1 means right and -1 means left
var HORIZONTAL_MOVE_SPEED = 2;
var fps_count;
var frame_start_time = (new Date()).valueOf();

function init() {

  
  //alert(Math.random()*20);
  bg = document.getElementById("bg");
  man = document.getElementById("man");
  window.addEvent(document, "keydown", keyboard_check);
  fps_count = document.getElementById("fps_count");
  //2013-04-08 basilwang have put style.left and style.top here, we can use percentage, but need calculate percentage also later;
  man.style.top = "0px";
  //man.style.left="30%";
  man.style.left = "450px";
  //2013-04-08 basilwang save the position of each brick
  for (var i = 0; i < BRICK_NUM; i++) {

    var top = Math.random() * BG_HEIGHT;
    var left = Math.random() * BG_WIDTH;
    //blocks[blocks.length]={top:top,left:left,height:BRICK_HEIGHT,width:BRICK_WIDTH};
    top = parseInt(top) + "px";
    left = parseInt(left) + "px";


    var snippet = "<div class=\"brick\" style=\"top:" + top + ";left:" + left + "\" ></div>";
    //var snippet="<div class=\"brick\" style=\"top:200px;left:30%\" ></div>";
    //var snippet="<div class=\"brick\" style=\"top:"+top+";left:30%\" ></div>";
    bg.innerHTML += snippet;

  }
  blocks = document.getElementsByClassName("brick");

  setTimeout(timer_elasped, 60);
  setTimeout(sprite_switch,60);
  //setInterval(keyboard_check, 500);
}
/*
  2013-04-15 basilwang change sprite on different state
*/
function sprite_switch()
{
   var fixed_status=get_fixed_status();
   var sprite=man_sprite_status[fixed_status.status];
   var sprite_num=sprite.length;
   if(sprite_num==1)
   {
     man.src="stop_0.png";

   }
   else
   {
    console.log(fixed_status.status + (parseInt(fixed_status.sprite_index)+1)%2  + ".png");
     man.src=fixed_status.status  + "_" +  (parseInt(fixed_status.sprite_index)+1)%2 + ".png";
     man_status=fixed_status.status + "_" + (parseInt(fixed_status.sprite_index)+1)%2;
   }
   setTimeout(sprite_switch,60);
}
function get_fixed_status()
{
   return {
       status:man_status.split("_")[0],
       sprite_index: man_status.split("_")[1]
   } ;

}
function keyboard_check(e) {

  /*
  //2013-04-10 basilwang we can control direction only when stop
  if (!man_stop_status) return;
  */
  if (!e) e = window.event;
  var code;
  code = e.keyCode;
  

  switch (code) {
    case 37:
      direction = -1;
      man_status = "left_1";
      console.log("you pressed left arrow.");
      break;
    case 39:
      direction = 1;
      man_status = "right_1";
      console.log("you pressed right arrow.");
      break;
  }
  var int_left = parseInt(man.style.left);
  int_left = isNaN(int_left) ? 0 : parseInt(int_left);

  int_left += MAN_HORIZONTAL_SPEED * direction;
  man.style.left = int_left + "px";
}

function timer_elasped() {

  if (get_fixed_status().status=="dropping") {
    man_speed += GRAVITY_SPEED;
  }

  //alert(Math.random()*20);

  //2013-04-08 basilwang this doesn't work
  /*
               bg.style.top =bg.style.top - 10;
               alert(bg.style.top);
               */
  //bg.style.top-=10;
  move(bg, bg_speed);
  move(man, man_speed);
  collapse_check();
  var frame_end_time = (new Date()).valueOf();
  //console.log((frame_end_time - frame_start_time));
  //console.log("the current FPS is " + parseInt(1000 / (frame_end_time - frame_start_time)));
  fps_count.innerHTML = "帧数：" + parseInt(1000 / (frame_end_time - frame_start_time));
  frame_start_time = frame_end_time;
  setTimeout(timer_elasped, 60);
}
/*
             2013-04-08 basilwang refactor move function
             params:
                    object_to_move
                    speed  can be negative

*/
function move(object_to_move, speed) {
  var int_top = parseInt(object_to_move.style.top);
  int_top = isNaN(int_top) ? 0 : parseInt(int_top);

  int_top += speed;



  console.log("object_to_move " + object_to_move.id + "'s offsetParent is " + object_to_move.offsetParent);
  console.log("object_to_move " + object_to_move.id + "'s top is " + object_to_move.style.top);
  object_to_move.style.top = int_top + "px";

}
/*
  2013-04-15 basilwang 
  如果两个矩形横向坐标相减的绝对值，小于两个矩形各自宽度一半相加的和，同时两个矩形纵向坐标相减的绝对值，小于两个矩形各自高度一半相加的和，那就说明这两个矩形碰撞了。
*/
function collpase_check_core(obja, objb) {
  var absX = Math.abs(obja.x - objb.x);
  var absY = Math.abs(obja.y - objb.y);
  var compareX = parseInt(MAN_WIDTH / 2) + parseInt(BRICK_WIDTH / 2);
  var compareY = parseInt(MAN_HEIGHT / 2) + parseInt(BRICK_HEIGHT / 2);
  if (absX < compareX && absY < compareY) return true;
  else return false;
}
/*
              2013-04-08 basilwang to see if collapse happen
          */
function collapse_check() {
  /*var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
              console.log("the scrollTop is " + scrollTop);
              */
  console.log("the man top is " + man.style.top);
  console.log("the man left is " + man.style.left);
  var man_left = isNaN(parseInt(man.style.left)) ? 0 : parseInt(man.style.left);
  var man_top = isNaN(parseInt(man.style.top)) ? 0 : parseInt(man.style.top);
  var man_center = {
    x: man_left + parseInt(MAN_WIDTH / 2),
    y: man_top + parseInt(MAN_HEIGHT / 2)
  }
  console.log(man_center);
  var is_collpased = false;

  for (var i = 0; i < BRICK_NUM; i++) {

    //console.log("the bg top is " + bg.style.top);
    //console.log("the first brick top is "+ (parseInt(blocks[i].style.top)+parseInt(bg.style.top)) );
    var brick_top = (parseInt(blocks[i].style.top) + parseInt(bg.style.top));
    var brick_left = parseInt(blocks[i].style.left);
    var brick_center = {
      x: brick_left + parseInt(BRICK_WIDTH / 2),
      y: brick_top + parseInt(BRICK_HEIGHT / 2)
    } 
    //console.log(brick_dimension);
    if (collpase_check_core(man_center, brick_center)) {
      console.log(brick_center);
      man_speed = bg_speed;
      man_status = "stop_1";
      is_collpased = true;
    }


  }
  if (!is_collpased) {
    man_status = "dropping_1";
    man_speed = MAN_INITIAL_SPEED;
  }


}
window.addEvent = function(element, event, fn) {
  if (element.addEventListener) {
    element.addEventListener(event, fn, false);

  } else if (element.attachEvent) {
    element.attachEvent("on" + event, function() {
      fn.call(element)
    });

  }
}