//check browser version
var ns4=document.layers;
var ns6=document.getElementById && !document.all;
var ns= ns4 || ns6;
var ie = document.all;

var bg, man;
var blocks = [];
//alert(bg.id);
var BRICK_NUM = 20;
var BG_HEIGHT = 2000;
var BG_WIDTH = 800;
var BRICK_HEIGHT = 10;
var BRICK_WIDTH = 100;
var MAN_HEIGHT = 106;
var MAN_WIDTH = 80;
var MAN_INITIAL_SPEED =4;
var man_speed = MAN_INITIAL_SPEED;
var MAN_HORIZONTAL_SPEED=2;
var bg_speed = -2;
var GRAVITY_SPEED=0.9;
var man_stop_status=false;
var direction=1;  //1 means right and -1 means left
var HORIZONTAL_MOVE_SPEED=2;
function init() {

  window.addEvent(document,'keydown',keyboard_check);
  //alert(Math.random()*20);
  bg = document.getElementById("bg");
  man = document.getElementById("man");
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

  setInterval(timer_elasped, 200);
  //setInterval(keyboard_check, 500);
}
function keyboard_check(e) {
  
  //2013-04-10 basilwang we can control direction only when stop
  if(!man_stop_status)
    return;
  if (!e) e = window.event;
  var code;
  if (ie) code = e.keyCode;
  else if (ns) code = e.which;
  else {
    alert("unknown browser");
    return;
  }

  switch (code) {
    case 37:
      direction=-1;
      console.log("you pressed left arrow.");
     break;
    case 39:
      direction=1;
      console.log("you pressed right arrow.");
      break;
  }
  var int_left = parseInt(man.style.left);
  int_left = isNaN(int_left) ? 0 : parseInt(int_left);

  int_left += MAN_HORIZONTAL_SPEED*direction;
  man.style.left = int_left + "px";
}
function timer_elasped() {
  if(!man_stop_status)
  {
       man_speed+=GRAVITY_SPEED;
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

function collpase_check_core(point, dimension) {
  return (point.y > dimension.top && point.y < dimension.bottom && point.x > dimension.left && point.x < dimension.right)

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
  var man_left_bottom = {
    x: man_left,
    y: parseInt(man.style.top) + MAN_HEIGHT
  };
  var man_right_bottom = {
    x: man_left + MAN_WIDTH,
    y: parseInt(man.style.top) + MAN_HEIGHT
  };

  console.log(man_left_bottom);
  console.log(man_right_bottom);
  var is_collpased=false;

  for (var i = 0; i < BRICK_NUM; i++) {

    //console.log("the bg top is " + bg.style.top);
    //console.log("the first brick top is "+ (parseInt(blocks[i].style.top)+parseInt(bg.style.top)) );
    var brick_top = (parseInt(blocks[i].style.top) + parseInt(bg.style.top));
    var brick_left = parseInt(blocks[i].style.left);
    var brick_dimension = {
      top: brick_top,
      left: brick_left,
      right: brick_left + BRICK_WIDTH,
      bottom: brick_top + BRICK_HEIGHT
    };
    //console.log(brick_dimension);
    if (
    collpase_check_core(man_left_bottom, brick_dimension) || collpase_check_core(man_right_bottom, brick_dimension)) {
      console.log(brick_dimension);
      man_speed = bg_speed;
      man_stop_status=true;
      is_collpased=true;
    }


  }
  if(!is_collpased)
  {
     man_stop_status=false;
     man_speed=MAN_INITIAL_SPEED;
  }


}
window.addEvent =function(element,event,fn){
  if(element.addEventListener)
  {
    element.addEventListener(event,fn,false);
    
  }
  else if(element.attachEvent){
     element.attachEvent("on"+event, function(){ fn.call(element) });
     
   }
}