
window.addEvent = function(element, event, fn) {
  if (element.addEventListener) {
    element.addEventListener(event, fn, false);

  } else if (element.attachEvent) {
    element.attachEvent("on" + event, function() {
      fn.call(element)
    });

  }
}

function init() {

  var SCENE_WIDTH=500;
  // 2013-05-09 徐灿调整小人出生位置和画布高度
  var man=new Man("man",SCENE_WIDTH/2,100,50,61,5);  
  var scene=new Scene("bg",SCENE_WIDTH,700,man);
  scene.start();


  //man.draw();


}
